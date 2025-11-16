"use client";
import { useEffect, useState } from "react";

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
      console.warn('Failed to get token from secure storage');
    }
    
    return null;
  },

  // Get token type from httpOnly cookie via API call
  async getTokenType(): Promise<string> {
    try {
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        return data.tokenType || 'Bearer';
      }
    } catch (error) {
      console.warn('Failed to get token type from secure storage');
    }
    
    return 'Bearer';
  },

  // Set token securely
  async setToken(token: string, tokenType: string = 'Bearer'): Promise<void> {
    try {
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, tokenType })
      });
      
      if (!response.ok) {
        throw new Error('Failed to store token securely');
      }
    } catch (error) {
      console.error('Failed to set token securely:', error);
      throw error;
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
  }, []);

  const isAuthenticated = !!token;

  const signOut = async () => {
    try {
      await TokenManager.clearToken();
      // trigger auth state change for same tab
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      // Still clear local state even if API call fails
      setToken(null);
      setUser(null);
    }
  };

  const refreshAuth = async () => {
    const t = await TokenManager.getToken();
    setToken(t);
    if (t) {
      const payload = decodeJwt(t);
      setUser({ name: payload?.name ?? null, email: payload?.email ?? null });
    } else {
      setUser(null);
    }
  };

  return { isAuthenticated, token, user, signOut, refreshAuth, ready, TokenManager };
}
