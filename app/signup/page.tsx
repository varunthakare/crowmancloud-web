"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from '@react-oauth/google';
import { googleSignUp, sendOtp, verifyOtp, registerWithOtp } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "details">("email");
  const [verifyToken, setVerifyToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);
    try {
      const idToken = credentialResponse?.credential;
      if (!idToken) throw new Error('Missing Google idToken');
      const response = await googleSignUp(idToken);

      if (!response.ok) {
        let errorMessage = 'Google sign up failed';
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

      // Store token from backend shape
      const token = data.token || data.access_token;
      if (token) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('token_type', data.token_type || 'bearer');
      }
      
      setSuccess("Account created successfully with Google!");
      
      // Redirect to vulnerability page
      setTimeout(() => {
        router.push("/vulnerability");
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Google sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign up was cancelled or failed');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current || loading) return;
    isSubmittingRef.current = true;
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (step === 'email') {
        if (!email) throw new Error('Please enter your email');
        const res: any = await sendOtp(email);
        if (res?.status !== 'success') throw new Error(res?.message || 'Failed to send OTP');
        setSuccess(res?.message || 'OTP sent successfully');
        setStep('otp');
      } else if (step === 'otp') {
        if (!otp) throw new Error('Please enter the OTP');
        const res: any = await verifyOtp(email, otp);
        if (res?.status !== 'success' || !res?.token) throw new Error(res?.message || 'Failed to verify OTP');
        setVerifyToken(String(res.token));
        setSuccess('OTP verified successfully');
        setStep('details');
      } else {
        if (!name) throw new Error('Please enter your name');
        if (!password) throw new Error('Please enter a password');
        if (password !== confirmPassword) throw new Error('Passwords do not match');
        if (!verifyToken) throw new Error('Missing verification token');
        const res: any = await registerWithOtp(name, email, password, verifyToken);
        if (res?.status !== 'success') throw new Error(res?.message || 'Registration failed');
        setSuccess('User registered successfully');
        setTimeout(() => {
          router.push('/vulnerability');
        }, 800);
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
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
              Create your account
            </motion.h1>
            <p className="mt-3 text-neutral-300 text-sm">
              Join CrowmanCloud to analyze readiness, automate infra, and estimate costs—locally.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
            {step === 'email' && (
              <>
                <div>
                  <label className="block text-sm text-neutral-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm" role="alert" aria-live="polite">{error}</p>
                )}
                {success && (
                  <p className="text-green-400 text-sm">{success}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </>
            )}

            {step === 'otp' && (
              <>
                <div>
                  <label className="block text-sm text-neutral-300">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="6-digit code"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm" role="alert" aria-live="polite">{error}</p>
                )}
                {success && (
                  <p className="text-green-400 text-sm">{success}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </>
            )}

            {step === 'details' && (
              <>
                <div>
                  <label className="block text-sm text-neutral-300">Full name</label>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300">Confirm password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm" role="alert" aria-live="polite">{error}</p>
                )}
                {success && (
                  <p className="text-green-400 text-sm">{success}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </>
            )}

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
              <div className="relative flex justify-center"><span className="bg-neutral-950 px-3 text-xs text-neutral-400">or</span></div>
            </div>

            {/* OAuth */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                size="large"
                text="signup_with"
                shape="rectangular"
                width="300"
              />
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-400">
            Already have an account? <Link href="/signin" className="underline underline-offset-4">Sign in</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
