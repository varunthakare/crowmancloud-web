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

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // initial read
    const t = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    setToken(t);
    if (t) {
      const payload = decodeJwt(t);
      setUser({ name: payload?.name ?? null, email: payload?.email ?? null });
    } else {
      setUser(null);
    }

    // listen for changes from other tabs or sign-in/sign-out flows
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
    window.addEventListener("storage", onStorage);
    setReady(true);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isAuthenticated = !!token;

  const clearCookie = (name: string) => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    } catch {}
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      clearCookie("access_token");
      clearCookie("token_type");
      // trigger auth state change for same tab
      setToken(null);
      setUser(null);
    }
  };

  return { isAuthenticated, token, user, signOut, ready };
}
