"use client";
import React, { useState } from 'react';
import { AlertTriangle, Shield, Info, Eye, EyeOff } from 'lucide-react';

interface SecurityIssue {
  id: string;
  level: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  details: string;
  cve_id?: string;
  line?: number;
  code_snippet?: string;
}

interface SecurityAnalysisData {
  file_name: string;
  language: string;
  lines_analyzed: number;
  vulnerabilities_found: number;
  vulnerability_summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
  };
  issues: SecurityIssue[];
  analysis_timestamp: string;
}

const SecurityAnalysis: React.FC<{ data: SecurityAnalysisData }> = ({ data }) => {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'info': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      case 'low':
        return <Shield className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const mockCodeSnippets: { [key: number]: string } = {
    24: `// Line 24 - Weak Cryptography
MessageDigest md = MessageDigest.getInstance("MD5");
byte[] hash = md.digest(password.getBytes());`,
    79: `// Line 79 - Weak Cryptography  
Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, secretKey);`,
    197: `// Line 197 - Weak Cryptography
SecureRandom random = new SecureRandom();
random.setSeed(System.currentTimeMillis());`
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Security Analysis Report</h1>
          <div className="text-sm text-gray-500">
            {new Date(data.analysis_timestamp).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">File</div>
              <div className="font-semibold">{data.file_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Language</div>
              <div className="font-semibold">{data.language}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Lines Analyzed</div>
              <div className="font-semibold">{data.lines_analyzed}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Issues Found</div>
              <div className="font-semibold">{data.vulnerabilities_found}</div>
            </div>
          </div>
        </div>

        {/* Vulnerability Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {Object.entries(data.vulnerability_summary).map(([level, count]) => {
            if (level === 'total') return null;
            return (
              <div key={level} className={`p-3 rounded-lg border ${getSeverityColor(level)}`}>
                <div className="flex items-center gap-2">
                  {getSeverityIcon(level)}
                  <div>
                    <div className="text-xs uppercase font-medium">{level}</div>
                    <div className="text-lg font-bold">{count}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Issues */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Security Issues ({data.vulnerabilities_found} vulnerabilities, 1 info)
        </h2>
        
        {data.issues.map((issue, index) => (
          <div key={issue.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className={`p-4 cursor-pointer ${getSeverityColor(issue.level)}`}
              onClick={() => toggleIssue(issue.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(issue.level)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs uppercase font-medium px-2 py-1 rounded">
                        {issue.level}
                      </span>
                      <span className="font-semibold">{issue.title}</span>
                      {issue.cve_id && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          {issue.cve_id}
                        </span>
                      )}
                      {issue.line ? (
                        <span className="text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded">
                          Line {issue.line}
                        </span>
                      ) : issue.title.includes('CWE-327') ? (
                        <span className="text-xs font-mono bg-red-600 text-white px-2 py-1 rounded">
                          DEBUG: No Line Number
                        </span>
                      ) : null}
                    </div>
                    <div className="text-sm mt-2">{issue.details}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {issue.line && (
                    <span className="text-xs text-gray-500">
                      {expandedIssues.has(issue.id) ? 'Hide Code' : 'Show Code'}
                    </span>
                  )}
                  {expandedIssues.has(issue.id) ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedIssues.has(issue.id) && issue.line && (
              <div className="bg-gray-900 text-gray-100 p-4">
                <div className="mb-2 text-sm text-gray-400">
                  Code at line {issue.line}:
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{mockCodeSnippets[issue.line] || `// Line ${issue.line}\n// Code snippet not available`}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityAnalysis;
