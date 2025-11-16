export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn("NEXT_PUBLIC_API_URL is not set; API calls will fail.");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, options);
  return res;
}

export async function loginWithEmailPassword(email: string, password: string) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function googleAuthWithCredential(credential: string) {
  return apiFetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
}

export async function registerWithEmailPassword(name: string, email: string, password: string) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
}

export async function sendOtp(email: string) {
  return apiFetchWithJsonResponse(`/api/auth/send-otp/${encodeURIComponent(email)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function verifyOtp(email: string, otp: string) {
  return apiFetchWithJsonResponse(`/api/auth/verify-otp/${encodeURIComponent(email)}/${encodeURIComponent(otp)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function registerWithOtp(name: string, email: string, password: string, token: string, tokenType: string = 'Bearer') {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const authToken = tokenType.toLowerCase() === 'bearer' && !token.startsWith('Bearer ')
    ? `Bearer ${token}`
    : token;

  const headers = new Headers();
  headers.append('Authorization', authToken);
  headers.append('Content-Type', 'application/json');

  return apiFetchWithJsonResponse('/api/auth/register', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password })
  });
}

export async function forgotPassword(email: string, password: string, token: string, tokenType: string = 'Bearer') {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const authToken = tokenType.toLowerCase() === 'bearer' && !token.startsWith('Bearer ')
    ? `Bearer ${token}`
    : token;

  const headers = new Headers();
  headers.append('Authorization', authToken);
  headers.append('Content-Type', 'application/json');

  return apiFetchWithJsonResponse('/api/auth/forgot-password', {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ email, password })
  });
}

export async function apiFetchWithJsonResponse(path: string, options: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);
  
  // Log the complete request details
  console.log('API Request:', {
    method: options.method || 'GET',
    url,
    headers: Object.fromEntries(headers.entries()),
    hasBody: !!options.body
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
      mode: 'cors'
    });
    
    // Log response details
    console.log('API Response:', {
      url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      // Read error body once as text, then try to parse
      const rawText = await response.text();
      let errorData: any = undefined;
      try {
        errorData = rawText ? JSON.parse(rawText) : undefined;
      } catch (_) {
        // not JSON
      }

      const message = (errorData && (errorData.message || errorData.detail)) || rawText || `HTTP error! status: ${response.status}`;

      console.error('API Error Details:', {
        url,
        status: response.status,
        statusText: response.statusText,
        bodyText: rawText,
      });

      // Handle specific status codes
      if (response.status === 403) {
        console.error('403 Forbidden - Possible issues:');
        console.error('- Invalid or expired token');
        console.error('- Missing required permissions/roles');
        console.error('- CSRF token missing or invalid');
        console.error('- CORS misconfiguration');
      }

      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error('Request failed:', {
      error,
      url,
      method: options.method || 'GET'
    });
    throw error;
  }
}

export async function analyzeCode(file: File, token: string, tokenType: string = "Bearer") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("max_lines", "500");

  const headers = new Headers();
  headers.append('Authorization', token);

  try {
    console.log('Sending file for analysis:', {
      fileName: file.name,
      fileSize: file.size,
      headers: Object.fromEntries(headers.entries())
    });

    const res = await apiFetchWithJsonResponse("/api/code/analyze", {
      method: "POST",
      headers,
      body: formData
    });

    const data: any = res;

    const issues = Array.isArray(data?.vulnerabilities)
      ? data.vulnerabilities.map((v: any, idx: number) => ({
          id: String(v?.ruleId ?? idx),
          level: String(v?.severity ?? 'info').toLowerCase(),
          title: String(v?.type ?? 'Issue'),
          package: null,
          specifier: null,
          details: typeof v?.codeSnippet === 'string' ? v.codeSnippet : '',
          description: typeof v?.description === 'string' ? v.description : '',
          remediation: typeof v?.recommendation === 'string' ? v.recommendation : '',
          cve_id: (v?.cveId ? String(v.cveId) : null),
          fixed_in: null,
        }))
      : [];

    const languageGuess = file.name.toLowerCase().endsWith('.java')
      ? 'java'
      : file.name.toLowerCase().endsWith('.py')
      ? 'python'
      : 'unknown';

    const mapped = {
      file_name: data?.fileName ?? file.name,
      language: data?.fileType ?? languageGuess,
      lines_analyzed: typeof data?.linesAnalyzed === 'number' ? data.linesAnalyzed : 0,
      vulnerabilities_found: typeof data?.totalVulnerabilities === 'number' ? data.totalVulnerabilities : issues.length,
      issues,
      analysis_timestamp: data?.scanTimestamp ?? new Date().toISOString(),
      user_limits: data?.userLimits ?? {
        user_id: '',
        limits: {
          max_files_per_user: 0,
          max_lines_per_user: 0,
          files_used: 0,
          lines_used: 0,
          files_remaining: 0,
          lines_remaining: 0,
          reset_date: new Date().toISOString(),
        },
        can_analyze: true,
        limit_message: '',
      },
    };

    return mapped;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze code. Please try again.');
  }
}

export async function getUserProfile(token: string, tokenType: string = "Bearer") {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const authToken = tokenType.toLowerCase() === 'bearer' && !token.startsWith('Bearer ')
    ? `Bearer ${token}`
    : token;

  const headers = new Headers();
  headers.append('Authorization', authToken);

  return apiFetchWithJsonResponse('/api/auth/profile', {
    method: 'GET',
    headers,
  });
}

export async function upgradeToPro(token: string, tokenType: string = "Bearer") {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const authToken = tokenType.toLowerCase() === 'bearer' && !token.startsWith('Bearer ')
    ? `Bearer ${token}`
    : token;

  const headers = new Headers();
  headers.append('Authorization', authToken);
  headers.append('Content-Type', 'application/json');

  return apiFetchWithJsonResponse('/api/auth/buy-pro', {
    method: 'PATCH',
    headers,
  });
}

export async function updateProfile(
  token: string,
  payload: Partial<{ name: string; role: string }>,
  tokenType: string = 'Bearer'
) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const authToken = tokenType.toLowerCase() === 'bearer' && !token.startsWith('Bearer ')
    ? `Bearer ${token}`
    : token;

  const headers = new Headers();
  headers.append('Authorization', authToken);
  headers.append('Content-Type', 'application/json');

  // Build body with only provided fields
  const body: Record<string, any> = {};
  if (typeof payload.name === 'string') body.name = payload.name;
  if (typeof payload.role === 'string') body.role = payload.role;

  return apiFetchWithJsonResponse('/api/auth/update-profile', {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });
}