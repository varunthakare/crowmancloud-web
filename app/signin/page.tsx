"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { Github, Mail, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from '@react-oauth/google';
import { loginWithEmailPassword, googleAuthWithCredential, sendOtp, verifyOtp, forgotPassword } from "@/lib/api";

export default function SignInPage() {
  const [showEmail, setShowEmail] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const [forgotStep, setForgotStep] = useState<'none' | 'email' | 'otp' | 'reset'>("none");
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpToken, setFpToken] = useState("");
  const [fpPassword, setFpPassword] = useState("");
  const [fpConfirm, setFpConfirm] = useState("");

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await googleAuthWithCredential(credentialResponse.credential);

      if (!response.ok) {
        let errorMessage = 'Google sign in failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Store tokens if provided in response
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type || 'bearer');
      }
      
      // Redirect to vulnerability page
      router.push("/vulnerability");
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign in was cancelled or failed');
  };

  const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current || loading) return;
    isSubmittingRef.current = true;
    setError(null);
    setLoading(true);
    try {
      if (forgotStep === 'email') {
        if (!fpEmail) throw new Error('Please enter your email');
        const res: any = await sendOtp(fpEmail);
        if (res?.status !== 'success') throw new Error(res?.message || 'Failed to send OTP');
        setForgotStep('otp');
      } else if (forgotStep === 'otp') {
        if (!fpOtp) throw new Error('Please enter the OTP');
        const res: any = await verifyOtp(fpEmail, fpOtp);
        if (res?.status !== 'success' || !res?.token) throw new Error(res?.message || 'Failed to verify OTP');
        setFpToken(String(res.token));
        setForgotStep('reset');
      } else if (forgotStep === 'reset') {
        if (!fpPassword) throw new Error('Please enter a new password');
        if (fpPassword !== fpConfirm) throw new Error('Passwords do not match');
        const res: any = await forgotPassword(fpEmail, fpPassword, fpToken);
        if (res?.status !== 'success') throw new Error(res?.message || 'Failed to update password');
        setForgotStep('none');
        setShowEmail(true);
        setFpEmail("");
        setFpOtp("");
        setFpToken("");
        setFpPassword("");
        setFpConfirm("");
        router.push('/signin');
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current || loading) return; // guard against duplicate submits
    isSubmittingRef.current = true;
    setError(null);
    setLoading(true);
    try {
      const res = await loginWithEmailPassword(email, password);

      if (!res.ok) {
        // Try to parse JSON error and extract a friendly message
        let friendly = res.status === 400 || res.status === 401 ? "Invalid email or password" : `Login failed (${res.status})`;
        try {
          const errBody = await res.json();
          // Common API error shapes: {detail}, {message}, {error}, {errors: [{msg}]}
          if (typeof errBody === "string") friendly = errBody;
          else if (errBody?.detail) friendly = String(errBody.detail);
          else if (errBody?.message) friendly = String(errBody.message);
          else if (errBody?.error) friendly = String(errBody.error);
          else if (Array.isArray(errBody?.errors) && errBody.errors.length) {
            const first = errBody.errors[0];
            friendly = first?.msg || first?.message || JSON.stringify(first);
          }
        } catch (_) {
          // Fallback to text if not JSON
          const text = await res.text();
          if (text) friendly = text;
        }
        throw new Error(friendly);
      }

      const data: { access_token?: string; token?: string; token_type?: string } = await res.json();

      // Support both `access_token` and `token` response shapes
      const accessToken = data.access_token || data.token;

      if (accessToken) {
        // store token for subsequent requests
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("token_type", data.token_type || "bearer");
        }
        router.push("/vulnerability");
      } else {
        throw new Error("No access token returned");
      }
    } catch (err: any) {
      const msg = err?.message || "Unable to sign in";
      setError(msg);
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
            >
              Sign in
            </motion.h1>
            <p className="mt-3 text-neutral-300 text-sm">
              Continue with one of the providers below. We never store your code; authentication is used only for your account.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
            {forgotStep === 'none' ? (
              <>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_black"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    width="300"
                  />
                </div>
                {!showEmail ? (
                  <button
                    onClick={() => setShowEmail(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-white/10 hover:bg-white/20 transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Continue with email</span>
                  </button>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-md border border-white/10 bg-neutral-900 p-4 space-y-3">
                    <div>
                      <label className="block text-xs text-neutral-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs" role="alert">{error}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition ${loading ? 'pointer-events-none' : ''}`}
                      >
                        {loading ? "Signing in..." : "Sign in"}
                      </button>
                      <button type="button" onClick={() => setShowEmail(false)} className="text-xs text-neutral-400 hover:text-neutral-200">Use providers instead</button>
                    </div>
                  </form>
                )}
                <p className="mt-4 text-xs text-neutral-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>By signing in, you agree to our Terms and Privacy Policy.</span>
                </p>
              </>
            ) : (
              <>
                {forgotStep === 'email' && (
                  <form onSubmit={handleForgotSubmit} className="rounded-md border border-white/10 bg-neutral-900 p-4 space-y-3">
                    <div>
                      <label className="block text-xs text-neutral-400">Email</label>
                      <input
                        type="email"
                        name="fpEmail"
                        value={fpEmail}
                        onChange={(e) => setFpEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs" role="alert">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </form>
                )}
                {forgotStep === 'otp' && (
                  <form onSubmit={handleForgotSubmit} className="rounded-md border border-white/10 bg-neutral-900 p-4 space-y-3">
                    <div>
                      <label className="block text-xs text-neutral-400">Enter OTP</label>
                      <input
                        type="text"
                        name="fpOtp"
                        value={fpOtp}
                        onChange={(e) => setFpOtp(e.target.value)}
                        placeholder="6-digit code"
                        required
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs" role="alert">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </form>
                )}
                {forgotStep === 'reset' && (
                  <form onSubmit={handleForgotSubmit} className="rounded-md border border-white/10 bg-neutral-900 p-4 space-y-3">
                    <div>
                      <label className="block text-xs text-neutral-400">New password</label>
                      <input
                        type="password"
                        name="fpPassword"
                        value={fpPassword}
                        onChange={(e) => setFpPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400">Confirm password</label>
                      <input
                        type="password"
                        name="fpConfirm"
                        value={fpConfirm}
                        onChange={(e) => setFpConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="mt-1 w-full rounded-md bg-neutral-950 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs" role="alert">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                    >
                      {loading ? 'Changing...' : 'Change password'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <div className="mt-3 text-center text-sm text-neutral-400">
            <button type="button" onClick={() => setForgotStep('email')} className="underline underline-offset-4">Forgot password?</button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-400">
            Need an account? <a href="/signup" className="underline underline-offset-4">Create one</a>
          </div>

          <div className="mt-8 text-xs text-neutral-500">
            <p>
              To enable real OAuth in production, integrate NextAuth (or your provider of choice) and set the GitHub and Google client credentials. I can wire this up when you are ready.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
