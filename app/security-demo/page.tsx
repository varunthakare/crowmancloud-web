import SecurityAnalysis from '@/components/SecurityAnalysis';

const securityData = {
  "file_name": "VulnerableApp.java",
  "language": "Java",
  "lines_analyzed": 267,
  "vulnerabilities_found": 3,
  "vulnerability_summary": {
    "critical": 0,
    "high": 0,
    "medium": 3,
    "low": 0,
    "info": 1,
    "total": 4
  },
  "issues": [
    {
      "id": "local-CWE-327-VulnerableApp.java-24",
      "level": "medium" as const,
      "title": "CWE-327: Weak Cryptography",
      "details": "Use of cryptographically weak algorithms",
      "cve_id": "CWE-327",
      "line": 24
    },
    {
      "id": "local-CWE-327-VulnerableApp.java-79",
      "level": "medium" as const,
      "title": "CWE-327: Weak Cryptography",
      "details": "Use of cryptographically weak algorithms",
      "cve_id": "CWE-327",
      "line": 79
    },
    {
      "id": "local-CWE-327-VulnerableApp.java-197",
      "level": "medium" as const,
      "title": "CWE-327: Weak Cryptography",
      "details": "Use of cryptographically weak algorithms",
      "cve_id": "CWE-327",
      "line": 197
    },
    {
      "id": "local-frameworks-VulnerableApp.java",
      "level": "info" as const,
      "title": "Detected frameworks",
      "details": "Detected Java frameworks: JDBC"
    }
  ],
  "analysis_timestamp": "2025-10-05T16:03:32.325898"
};

export default function SecurityDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SecurityAnalysis data={securityData} />
    </div>
  );
}
