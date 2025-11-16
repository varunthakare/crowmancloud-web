"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, Eye, EyeOff, Copy, CheckCircle2 } from "lucide-react";
import { getUserProfile, upgradeToPro, updateProfile } from "@/lib/api";

export default function ProfilePage() {
  const { isAuthenticated, user, signOut, ready, token } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    subscription: string;
    expireDate: string;
    fileLimit: string;
    proToken?: string | null;
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [role, setRole] = useState('User');
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const handleUpgradeToPro = async () => {
    if (!token || !ready) return;
    
    try {
      setIsUpgrading(true);
      const tokenType = typeof window !== 'undefined' ? (localStorage.getItem('token_type') || 'Bearer') : 'Bearer';
      const response = await upgradeToPro(token, tokenType);
      
      if (response?.["pro-token"]) {
        setUpgradeSuccess(true);
        // Update profile to reflect PRO status
        const data: any = await getUserProfile(token, tokenType);
        const details = data?.["user-details"] || {};
        setProfile({
          name: String(details?.name || user?.name || ''),
          email: String(details?.email || user?.email || ''),
          subscription: String(details?.subscription || 'STARTER'),
          expireDate: String(details?.expireDate || ''),
          fileLimit: String(details?.["file-limit"] ?? ''),
          proToken: response["pro-token"]
        });
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Failed to upgrade to PRO. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, ready, router]);

  useEffect(() => {
    if (!ready || !isAuthenticated || !token) return;
    const run = async () => {
      try {
        setLoadingProfile(true);
        setProfileError(null);
        const tokenType = typeof window !== 'undefined' ? (localStorage.getItem('token_type') || 'Bearer') : 'Bearer';
        const data: any = await getUserProfile(token, tokenType);
        const details = data?.["user-details"] || {};
        setProfile({
          name: String(details?.name || user?.name || ''),
          email: String(details?.email || user?.email || ''),
          subscription: String(details?.subscription || 'STARTER'),
          expireDate: String(details?.expireDate || ''),
          fileLimit: String(details?.["file-limit"] ?? ''),
          proToken: typeof details?.["PRO token"] === 'string' ? details["PRO token"] : null,
        });
        setRole(String(details?.role || 'User'));
      } catch (e: any) {
        setProfileError(e?.message || 'Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };
    run();
  }, [ready, isAuthenticated, token, user]);

  const handleRoleChange = async (newRole: string) => {
    if (!token || !profile) return;
    try {
      setSavingProfile(true);
      const tokenType = typeof window !== 'undefined' ? (localStorage.getItem('token_type') || 'Bearer') : 'Bearer';
      await updateProfile(token, { role: newRole, name: profile.name }, tokenType);
      setRole(newRole);
      const refreshed: any = await getUserProfile(token, tokenType);
      const d = refreshed?.["user-details"] || {};
      setProfile({
        name: String(d?.name || ''),
        email: String(d?.email || ''),
        subscription: String(d?.subscription || 'STARTER'),
        expireDate: String(d?.expireDate || ''),
        fileLimit: String(d?.["file-limit"] ?? ''),
        proToken: typeof d?.["PRO token"] === 'string' ? d["PRO token"] : null,
      });
    } catch (e) {
      alert('Failed to update role');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveName = async () => {
    if (!token || !profile) return;
    try {
      setSavingProfile(true);
      const nextName = editName.trim() || profile.name;
      const tokenType = typeof window !== 'undefined' ? (localStorage.getItem('token_type') || 'Bearer') : 'Bearer';
      await updateProfile(token, { name: nextName, role }, tokenType);
      const refreshed: any = await getUserProfile(token, tokenType);
      const d = refreshed?.["user-details"] || {};
      setProfile({
        name: String(d?.name || ''),
        email: String(d?.email || ''),
        subscription: String(d?.subscription || 'STARTER'),
        expireDate: String(d?.expireDate || ''),
        fileLimit: String(d?.["file-limit"] ?? ''),
        proToken: typeof d?.["PRO token"] === 'string' ? d["PRO token"] : null,
      });
      setEditingName(false);
      setEditName('');
    } catch (e) {
      alert('Failed to update name');
    } finally {
      setSavingProfile(false);
    }
  };

  const avatarText = (profile?.name || profile?.email || "").slice(0, 1).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!ready ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 animate-pulse">
              <div className="h-6 w-32 bg-white/10 rounded" />
              <div className="mt-3 h-4 w-56 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-5xl font-semibold tracking-tight"
                >
                  Profile
                </motion.h1>
                <p className="mt-3 text-neutral-300">Manage your account details</p>
              </div>

              <div className="mt-10 grid gap-6">
                <section className="rounded-xl border border-white/10 bg-white/5 p-6">
                  {loadingProfile ? (
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                        <div className="h-3 w-48 bg-white/10 rounded animate-pulse" />
                      </div>
                    </div>
                  ) : profile ? (
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-white/10">
                        {avatarText ? (
                          <span className="text-sm font-medium">{avatarText}</span>
                        ) : (
                          <span className="text-sm">👤</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Signed in as</p>
                        <div className="flex items-center gap-2">
                          {editingName ? (
                            <>
                              <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="rounded-md bg-neutral-900 border border-white/10 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                                placeholder={profile.name}
                              />
                              <button onClick={handleSaveName} disabled={savingProfile} className="text-xs rounded-md px-2 py-1 bg-brand-500 hover:bg-brand-400 text-white disabled:opacity-60">Save</button>
                              <button onClick={() => { setEditingName(false); setEditName(''); }} className="text-xs text-neutral-400 hover:text-neutral-200">Cancel</button>
                            </>
                          ) : (
                            <>
                              <p className="font-medium">{profile.name}</p>
                              <button onClick={() => { setEditingName(true); setEditName(profile.name); }} className="text-xs text-neutral-400 hover:text-neutral-200">Edit</button>
                            </>
                          )}
                        </div>
                        {profile.email && <p className="text-sm text-neutral-300">{profile.email}</p>}
                      </div>
                      <div className="ml-auto min-w-[200px]">
                        <label className="block text-xs text-neutral-400">Role</label>
                        <select
                          value={role}
                          onChange={(e) => handleRoleChange(e.target.value)}
                          disabled={savingProfile}
                          className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-60 cursor-pointer appearance-none"
                        >
                          <option value="">Select a role</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="Full-Stack Developer">Full-Stack Developer</option>
                          <option value="Cloud-Readiness Analyst">Cloud-Readiness Analyst</option>
                          <option value="Vulnerability Analyst">Vulnerability Analyst</option>
                          <option value="Security Analyst">Security Analyst</option>
                          <option value="DevSecOps Engineer">DevSecOps Engineer</option>
                          <option value="DevOps Engineer">DevOps Engineer</option>
                          <option value="Cloud Engineer">Cloud Engineer</option>
                          <option value="Cloud Architect">Cloud Architect</option>
                          <option value="CI/CD Pipeline Engineer">CI/CD Pipeline Engineer</option>
                          <option value="Deployment Engineer">Deployment Engineer</option>
                          <option value="Systems Engineer">Systems Engineer</option>
                          <option value="QA Engineer">QA Engineer</option>
                          <option value="Cloud Testing Engineer">Cloud Testing Engineer</option>
                          <option value="Product Manager">Product Manager</option>
                          <option value="Project Manager">Project Manager</option>
                          <option value="Technical Program Manager">Technical Program Manager</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-400">No profile data.</p>
                  )}
                </section>

                <section className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold">Subscription</h2>
                  {loadingProfile ? (
                    <div className="mt-3 space-y-2">
                      <div className="h-4 w-40 bg-white/10 rounded" />
                      <div className="h-4 w-56 bg-white/10 rounded" />
                      <div className="h-4 w-32 bg-white/10 rounded" />
                    </div>
                  ) : profileError ? (
                    <p className="mt-2 text-sm text-red-400">{profileError}</p>
                  ) : profile ? (
                    <div className="mt-2 text-sm text-neutral-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Plan</span>
                        <span className="font-medium">
                          {profile.subscription === 'PRO' ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-300 border border-yellow-500/30">
                              <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                              PRO
                            </span>
                          ) : (
                            profile.subscription
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">File limit</span>
                        <span className="font-medium">{profile.fileLimit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Expires</span>
                        <span className="font-medium">{profile.expireDate}</span>
                      </div>
                      {profile.subscription?.toUpperCase() === 'PRO' ? (
                        <div className="pt-3">
                          <button
                            onClick={() => { setTokenModalOpen(true); setCopied(false); setReveal(false); }}
                            className="group relative inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition shadow-[0_0_15px_-5px] shadow-blue-500/30 ring-1 ring-white/20"
                            style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 60%, #1e40af 100%)' }}
                          >
                            <KeyRound className="h-4 w-4" />
                            <span>Show PRO token</span>
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition"
                              style={{ backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.2) 0%, rgba(30, 64, 175, 0.2) 100%)' }}
                            />
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                        <button
                          onClick={handleUpgradeToPro}
                          disabled={isUpgrading}
                          className="group relative w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition shadow-[0_0_15px_-5px] shadow-blue-500/30 ring-1 ring-white/20"
                          style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 60%, #1e40af 100%)' }}
                        >
                          {isUpgrading ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Upgrading...
                            </>
                          ) : (
                            <>
                              <span>Upgrade to PRO</span>
                              <span className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition" 
                                    style={{ backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.2) 0%, rgba(30, 64, 175, 0.2) 100%)' }} />
                            </>
                          )}
                        </button>
                        {upgradeSuccess && (
                          <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-400">
                            <div className="flex items-center gap-2">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Successfully upgraded to PRO! Your token is now available below.
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-neutral-400">PRO token is available only for PRO subscription.</p>
                      </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-neutral-400">No profile data.</p>
                  )}
                </section>

                <section className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-lg font-semibold">Security</h2>
                  <p className="mt-2 text-sm text-neutral-300">Update your password or sign out of your account.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/contact" className="rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20">Change password</Link>
                    <button onClick={signOut} className="rounded-md px-3 py-1.5 text-sm bg-red-500 hover:bg-red-400 text-white">Sign out</button>
                  </div>
                </section>
              </div>
              {tokenModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setTokenModalOpen(false)} />
                  <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 p-6 shadow-2xl ring-1 ring-yellow-500/10">
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-yellow-500/20">
                          <KeyRound className="h-4 w-4 text-yellow-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">PRO Token</h3>
                          <p className="text-xs text-neutral-400">Keep this token secure. Do not share publicly.</p>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm text-neutral-200">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 break-all select-text">
                            {profile?.proToken
                              ? (
                                reveal
                                  ? profile.proToken
                                  : `${'•'.repeat(Math.min(32, profile.proToken.length))}${profile.proToken.length > 32 ? '...' : ''}`
                                )
                              : 'No token available'}
                          </div>
                          {profile?.proToken && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setReveal((v) => !v)}
                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-white/10 hover:bg-white/20"
                                title={reveal ? 'Hide' : 'Reveal'}
                              >
                                {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span className="hidden sm:inline">{reveal ? 'Hide' : 'Reveal'}</span>
                              </button>
                              <button
                                onClick={async () => { if (profile?.proToken) { await navigator.clipboard.writeText(profile.proToken); setCopied(true); setTimeout(() => setCopied(false), 2000); } }}
                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black"
                                title="Copy token"
                              >
                                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                          onClick={() => setTokenModalOpen(false)}
                          className="rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
