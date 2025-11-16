"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { submitWaitlistForm } from "@/lib/api";

interface LoggedInWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string;
    userName: string;
    userRole: string;
    token: string;
    tokenType?: string;
}

export default function LoggedInWaitlistModal({ 
    isOpen, 
    onClose, 
    userEmail, 
    userName, 
    userRole,
    token,
    tokenType = 'Bearer'
}: LoggedInWaitlistModalProps) {
    const [message, setMessage] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleJoinWaitlist = async () => {
        setIsJoining(true);
        setError("");
        
        try {
            await submitWaitlistForm({
                name: userName,
                role: userRole || "User",
                email: userEmail,
                message: message || ""
            }, token, tokenType);
            setJoinSuccess(true);

            // Reset form after success
            setTimeout(() => {
                setJoinSuccess(false);
                setMessage("");
                setError("");
                onClose();
            }, 2000);
        } catch (error: any) {
            console.error("Failed to join waitlist:", error);
            
            // Check if the error is about email already being on waitlist
            const errorMessage = error?.message || "";
            if (errorMessage.includes("already in waitlist") || errorMessage.includes("already on waitlist")) {
                setError("You're already on the PRO waitlist. You'll be notified when PRO features are available.");
                // Show success message since they're already on the waitlist
                setTimeout(() => {
                    setJoinSuccess(true);
                    setTimeout(() => {
                        resetModal();
                    }, 2000);
                }, 1000);
            } else {
                setError("Failed to join waitlist. Please try again.");
            }
        } finally {
            setIsJoining(false);
        }
    };

    const resetModal = () => {
        setMessage("");
        setError("");
        setJoinSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={resetModal}
            />

            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/95 to-neutral-950/95 shadow-2xl ring-1 ring-white/5">
                {/* Background Effects */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Join PRO Waitlist</h2>
                            <p className="text-sm text-neutral-400 mt-1">Be the first to access PRO features</p>
                        </div>
                        <button
                            onClick={resetModal}
                            className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
                        <div className="space-y-4">
                            {/* User Info Display */}
                            <div className="p-4 rounded-lg bg-neutral-800/50 border border-white/10">
                                <h3 className="text-sm font-medium text-neutral-300 mb-3">Account Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Name:</span>
                                        <span className="text-white">{userName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Email:</span>
                                        <span className="text-white">{userEmail}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Role:</span>
                                        <span className="text-white">{userRole || "User"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Box */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg bg-neutral-900/50 border border-white/10 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors resize-none scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500"
                                    placeholder="Tell us why you're interested in PRO features..."
                                />
                            </div>

                            {/* Join Waitlist Button */}
                            <button
                                type="button"
                                onClick={handleJoinWaitlist}
                                disabled={isJoining}
                                className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:shadow-none"
                            >
                                {isJoining ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Joining Waitlist...
                                    </>
                                ) : (
                                    "Join Waitlist"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}