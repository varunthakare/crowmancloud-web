"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { sendWaitlistOtp, verifyWaitlistOtp, submitWaitlistForm } from "@/lib/api";
import { validateEmail, validateName, validateOTP, validateMessage, validateRole, emailRateLimiter, otpRateLimiter } from "@/lib/validation";

interface ProWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    token?: string;
    tokenType?: string;
}

export default function ProWaitlistModal({ isOpen, onClose, token, tokenType = 'Bearer' }: ProWaitlistModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        message: ""
    });
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);
    const [error, setError] = useState("");
    const [verificationToken, setVerificationToken] = useState("");

    const roles = [
        "Backend Developer",
        "Full-Stack Developer",
        "Cloud-Readiness Analyst",
        "Vulnerability Analyst",
        "Security Analyst",
        "DevSecOps Engineer",
        "DevOps Engineer",
        "Cloud Engineer",
        "Cloud Architect",
        "CI/CD Pipeline Engineer",
        "Deployment Engineer",
        "Systems Engineer",
        "QA Engineer",
        "Cloud Testing Engineer",
        "Product Manager",
        "Project Manager",
        "Technical Program Manager"
    ];

    const handleVerifyEmail = async () => {
        if (!formData.email) return;

        setIsVerifying(true);
        setError("");
        
        try {
            // For non-logged-in users, don't pass token for OTP sending
            await sendWaitlistOtp(formData.email, token, tokenType);
            setShowOtpInput(true);
        } catch (error: any) {
            console.error("Failed to send OTP:", error);
            
            // Check if the error is about email already being on waitlist
            const errorMessage = error?.message || "";
            if (errorMessage.includes("already in waitlist") || errorMessage.includes("already on waitlist")) {
                setError("This email is already on the PRO waitlist. You'll be notified when PRO features are available.");
                // Show success message since they're already on the waitlist
                const showSuccessTimer = setTimeout(() => {
                    setJoinSuccess(true);
                    const resetTimer = setTimeout(() => {
                        resetModal();
                    }, 2000);
                }, 1000);
            } else {
                setError("Failed to send OTP. Please try again.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) return;

        setIsVerifying(true);
        setError("");
        
        try {
            // For non-logged-in users, don't pass auth token for OTP verification
            // The API will return a verification token that we'll use for submission
            const response = await verifyWaitlistOtp(formData.email, otp, token, tokenType);
            
            // Extract the token from the response for non-logged-in users
            if (response?.token) {
                setVerificationToken(response.token);
            }
            
            setIsEmailVerified(true);
            setShowOtpInput(false);
        } catch (error: any) {
            console.error("Failed to verify OTP:", error);
            
            // Check if the error is about email already being on waitlist
            const errorMessage = error?.message || "";
            if (errorMessage.includes("already in waitlist") || errorMessage.includes("already on waitlist")) {
                setError("This email is already on the PRO waitlist. You'll be notified when PRO features are available.");
                // Hide the form since they're already on the waitlist
                const showSuccessTimer = setTimeout(() => {
                    setJoinSuccess(true);
                    const resetTimer = setTimeout(() => {
                        resetModal();
                    }, 2000);
                }, 1000);
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const handleJoinWaitlist = async () => {
        if (!isEmailVerified || !formData.name || !formData.email || !formData.role) return;

        setIsJoining(true);
        setError("");
        
        try {
            // Use verification token from OTP verification for non-logged-in users
            // Or use the passed auth token for logged-in users
            const submitToken = verificationToken || token;
            
            if (!submitToken) {
                setError("Authentication required. Please verify your email first.");
                return;
            }

            await submitWaitlistForm({
                name: formData.name,
                role: formData.role,
                email: formData.email,
                message: formData.message || ""
            }, submitToken, tokenType);
            setJoinSuccess(true);

            // Reset form after success
            const resetFormTimer = setTimeout(() => {
                setJoinSuccess(false);
                setFormData({ name: "", email: "", role: "", message: "" });
                setOtp("");
                setIsEmailVerified(false);
                setShowOtpInput(false);
                setVerificationToken("");
                setError("");
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Failed to join waitlist:", error);
            setError("Failed to join waitlist. Please try again.");
        } finally {
            setIsJoining(false);
        }
    };

    const resetModal = () => {
        setFormData({ name: "", email: "", role: "", message: "" });
        setOtp("");
        setIsEmailVerified(false);
        setShowOtpInput(false);
        setJoinSuccess(false);
        setVerificationToken("");
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={resetModal}
            />

            <div className="relative z-10 w-full max-w-lg max-h-[95vh] sm:max-h-none overflow-y-auto sm:overflow-visible rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/95 to-neutral-950/95 shadow-2xl ring-1 ring-white/5">
                {/* Background Effects */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <div className="flex-1 pr-2">
                            <h2 className="text-lg sm:text-xl font-semibold text-white">Join PRO Waitlist</h2>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Be the first to access PRO features</p>
                        </div>
                        <button
                            onClick={resetModal}
                            className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-3 sm:mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                            {error}
                        </div>
                    )}

                    {joinSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">You're on the list!</h3>
                            <p className="text-sm text-neutral-400">We'll notify you when PRO features are available.</p>
                        </motion.div>
                    ) : (
                        <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-neutral-300 mb-1.5 sm:mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full rounded-lg bg-neutral-900/50 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email Input with Verify Button */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-neutral-300 mb-1.5 sm:mb-2">
                                    Email Address *
                                </label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="flex-1 rounded-lg bg-neutral-900/50 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                        placeholder="Enter your email"
                                        required
                                        disabled={isEmailVerified}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyEmail}
                                        disabled={!formData.email || isVerifying || isEmailVerified}
                                        className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 min-w-[80px] sm:min-w-[100px] justify-center"
                                    >
                                        {isVerifying ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : isEmailVerified ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : (
                                            <Mail className="h-4 w-4" />
                                        )}
                                        <span className="hidden sm:inline">{isEmailVerified ? "Verified" : "Verify"}</span>
                                        <span className="sm:hidden">{isEmailVerified ? "✓" : "Send"}</span>
                                    </button>
                                </div>
                            </div>

                            {/* OTP Input */}
                            <AnimatePresence>
                                {showOtpInput && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-xs sm:text-sm font-medium text-neutral-300 mb-1.5 sm:mb-2">
                                            Enter OTP
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                                                    setOtp(value);
                                                    // Auto-verify when 6 digits are entered
                                                    if (value.length === 6 && !isVerifying) {
                                                        handleVerifyOtp();
                                                    }
                                                }}
                                                className="flex-1 rounded-lg bg-neutral-900/50 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors text-center sm:text-left tracking-widest"
                                                placeholder="Enter 6-digit OTP"
                                                maxLength={6}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                disabled={otp.length !== 6 || isVerifying}
                                                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 min-w-[80px] sm:min-w-[100px] justify-center"
                                            >
                                                {isVerifying ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Verify"
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1">Check your email for the verification code</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-neutral-300 mb-1.5 sm:mb-2">
                                    Role *
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                        className="w-full rounded-lg bg-neutral-900/50 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors appearance-none cursor-pointer scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500"
                                        required
                                    >
                                        <option value="" className="bg-neutral-900">Select your role</option>
                                        {roles.map((role) => (
                                            <option key={role} value={role} className="bg-neutral-900 text-white">
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message Box */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-neutral-300 mb-1.5 sm:mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    rows={3}
                                    className="w-full rounded-lg bg-neutral-900/50 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors resize-none scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500"
                                    placeholder="Tell us why you're interested in PRO features..."
                                />
                            </div>

                            {/* Join Waitlist Button */}
                            <button
                                type="button"
                                onClick={handleJoinWaitlist}
                                disabled={!isEmailVerified || !formData.name || !formData.email || !formData.role || isJoining}
                                className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 text-white text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:shadow-none"
                            >
                                {isJoining ? (
                                    <>
                                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                        <span className="hidden sm:inline">Joining Waitlist...</span>
                                        <span className="sm:hidden">Joining...</span>
                                    </>
                                ) : (
                                    "Join Waitlist"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}