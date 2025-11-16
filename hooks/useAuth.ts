"use client";
import { useEffect, useMemo, useState } from "react";

export type AuthUser = {
  name?: string | null;
  email?: string | null;
};

function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Secure token management utilities
const TokenManager = {
  // Get token from httpOnly cookie via API call
  async getToken(): Promise<string | null> {
    try {
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        return data.token || null;
      }
    } catch (error) {
      console.warn('Failed to get token from secure storage, using localStorage fallback');
    }
    
    // Fallback to localStorage for development/backward compatibility
    return typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  },

  // Set token securely
  async setToken(token: string, tokenType: string = 'Bearer'): Promise<void> {
    try {
      await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, tokenType })
      });
    } catch (error) {
      console.warn('Failed to set token securely, falling back to localStorage');
      // Fallback for development
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", token);
        localStorage.setItem("token_type", tokenType);
      }
    }
  },

  // Clear token securely
  async clearToken(): Promise<void> {
    try {
      await fetch('/api/auth/token', {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (error) {
      console.warn('Failed to clear token securely');
    }
    
    // Also clear localStorage fallback
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
    }
  }
};

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Initial token load with secure method
    const loadToken = async () => {
      const t = await TokenManager.getToken();
      setToken(t);
      if (t) {
        const payload = decodeJwt(t);
        setUser({ name: payload?.name ?? null, email: payload?.email ?? null });
      } else {
        setUser(null);
      }
      setReady(true);
    };

    loadToken();

    // Listen for storage changes (fallback for localStorage)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "access_token") {
        const nt = e.newValue;
        setToken(nt);
        if (nt) {
          const p = decodeJwt(nt);
          setUser({ name: p?.name ?? null, email: p?.email ?? null });
        } else {
          setUser(null);
        }
      }
    };
    
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);

  const isAuthenticated = !!token;

  const clearCookie = (name: string) => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
    } catch {}
  };

  const signOut = async () => {
    await TokenManager.clearToken();
    clearCookie("access_token");
    clearCookie("token_type");
    // trigger auth state change for same tab
    setToken(null);
    setUser(null);
  };

  return { isAuthenticated, token, user, signOut, ready, TokenManager };
}
