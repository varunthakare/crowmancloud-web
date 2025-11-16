"use client";
import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, LayoutDashboard, BookOpen, Info, Users, Tag, HelpCircle, Mail, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [canPortal, setCanPortal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isTool = pathname?.startsWith('/crowmantool');
  const { isAuthenticated, user, signOut } = useAuth();
  const avatarText = useMemo(() => {
    const n = user?.name || user?.email || '';
    return n ? n.charAt(0).toUpperCase() : '';
  }, [user]);

  useEffect(() => {
    if (!profileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [profileOpen]);

  useEffect(() => {
    // Enable portals only on client to avoid SSR hydration issues
    setCanPortal(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={
        `sticky top-0 z-50 ${
          scrolled ? '' : 'border-b border-white/10 bg-neutral-950/70 backdrop-blur'
        }`
      }
    >
      <div
        className={
          `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${scrolled ? 'my-2' : ''}`
        }
      >
        <div
          className={
            `transition-all duration-300 ${
              scrolled
                ? 'h-14 rounded-full bg-neutral-900/70 backdrop-blur shadow-lg shadow-black/20 px-4 sm:px-6 lg:px-8 flex items-center justify-between'
                : 'h-16 px-0 flex items-center justify-between'
            }`
          }
        >
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="crowmancloud" className="h-6 w-6" />
            <span className="font-semibold tracking-tight">CrowmanCloud</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <Link href={"/features" as Route} className="hover:text-white">Features</Link>
            <Link href={"/showcase" as Route} className="hover:text-white">Showcase</Link>
            <Link href={"/docs" as Route} className="hover:text-white">Docs</Link>
            <Link href={"/about" as Route} className="hover:text-white">About</Link>
            <Link href={"/community" as const} className="hover:text-white">Community</Link>
            <Link href={"/pricing" as const} className="hover:text-white">Pricing</Link>
            <Link href={"/faq" as const} className="hover:text-white">FAQ</Link>
            <Link href={"/contact" as Route} className="hover:text-white">Contact</Link>
          </nav>
          <div className="flex items-center gap-2 relative">
            {!isAuthenticated ? (
              <>
                <Link href={"/signin" as Route} className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 transition">Sign in</Link>
                <Link href={"/signup" as Route} className="hidden sm:inline-flex rounded-md px-3 py-1.5 text-sm bg-brand-500 hover:bg-brand-400 text-white transition">Get started</Link>
              </>
            ) : (
              <div ref={profileRef} className="relative">
                <button onClick={() => setProfileOpen((v)=>!v)} aria-label="Profile" title={user?.email || user?.name || 'Profile'} className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/10 hover:bg-white/20">
                  {avatarText ? <span className="text-xs font-medium">{avatarText}</span> : <User className="h-4 w-4" />}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border border-white/10 bg-neutral-900 shadow-lg py-1 text-sm">
                    <Link href={"/profile" as Route} className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-white/10">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link href={"/vulnerability" as Route} className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-white/10 text-green-400 hover:text-green-300">
                      <Shield className="h-4 w-4" />
                      Check Vulnerability
                    </Link>
                    <button onClick={() => { setProfileOpen(false); setConfirmOpen(true); }} className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-white/10 text-red-400 hover:text-red-300">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Animated hamburger */}
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/5 hover:bg-white/10 transition"
              onClick={() => setOpen((v)=>!v)}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? 'translate-y-1.5 rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur relative overflow-hidden"
          >
            {/* subtle glow */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link onClick={()=>setOpen(false)} href={"/features" as Route} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Features</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">AI assistance, scaffolds</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/showcase" as Route} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Showcase</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Real product shots</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/docs" as Route} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Docs</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Guides & API</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/about" as Route} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">About</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Mission & team</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/community" as const} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Community</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Join the discussion</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/pricing" as const} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Pricing</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Simple & transparent</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/faq" as const} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">FAQ</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Common questions</p>
                </Link>
                <Link onClick={()=>setOpen(false)} href={"/contact" as Route} className="group rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand-300" />
                    <span className="font-medium">Contact</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-300/80">Get in touch</p>
                </Link>
              </div>

              {/* Auth actions */}
              {!isAuthenticated ? (
                <div className="mt-4 flex items-center gap-2">
                  <Link onClick={()=>setOpen(false)} href={"/signin" as Route} className="inline-flex rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 transition">Sign in</Link>
                  <Link onClick={()=>setOpen(false)} href={"/signup" as Route} className="inline-flex rounded-md px-3 py-1.5 text-sm bg-brand-500 hover:bg-brand-400 text-white transition">Get started</Link>
                </div>
              ) : (
                <div className="mt-4 flex items-center">
                  <button onClick={()=>setOpen(false)} aria-label="Profile" className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/10 hover:bg-white/20 mr-2">
                    {avatarText ? <span className="text-xs font-medium">{avatarText}</span> : <User className="h-4 w-4" />}
                  </button>
                  <button onClick={() => { setConfirmOpen(true); setOpen(false); }} className="inline-flex rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-red-400 hover:text-red-300 transition">Sign out</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Logout confirm modal (portal to body to avoid header stacking/positioning) */}
      {confirmOpen && canPortal && createPortal(
        <div className="fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setConfirmOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[81] w-full max-w-sm rounded-lg border border-white/10 bg-neutral-900 p-5 shadow-2xl"
          >
            <h3 className="text-lg font-medium">Sign out?</h3>
            <p className="mt-1 text-sm text-neutral-300">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirmOpen(false)} className="rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20">Cancel</button>
              <button onClick={() => { setConfirmOpen(false); signOut(); window.location.reload(); }} className="rounded-md px-3 py-1.5 text-sm bg-red-500 hover:bg-red-400 text-white">Logout</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
