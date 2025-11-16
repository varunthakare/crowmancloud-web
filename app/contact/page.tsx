"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const faqs = [
    { q: "Is there a free tier?", a: "Yes — the Starter plan is free for exploring locally." },
    { q: "How many checks are in Pro?", a: "Pro includes 10 checks per month and unlimited files per run." },
    { q: "What does Team add?", a: "Team includes collaboration features and the same checks as Pro." },
    { q: "How fast is support?", a: "We respond as quickly as possible; use Discussions or GitHub issues for technical topics." },
  ];

  const contactEmail = "crowmancloud0@gmail.com";
  const subject = "Contact from website";
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  // Open Gmail compose (falls back to Gmail login if not signed in)
  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Contact us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-neutral-300"
            >
              Have questions about CrowmanCloud? Send us a message and we’ll get back to you.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Contact form */}
            <form className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4 md:col-span-2" onSubmit={(e)=>e.preventDefault()}>
              <div>
                <label className="block text-sm text-neutral-300">Your name</label>
                <input
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300">Message</label>
                <textarea
                  rows={8}
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <a href={gmailCompose} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 text-white transition">
                  Send email
                </a>
              </div>
            </form>

            {/* Right: Compact FAQ */}
            <section className="md:col-span-1">
              <h2 className="text-lg font-semibold tracking-tight">Quick FAQs</h2>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 divide-y divide-white/10">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                      onClick={() => setOpen((prev) => (prev === f.q ? null : f.q))}
                      aria-expanded={open === f.q}
                    >
                      <span className="font-medium text-sm">{f.q}</span>
                      <span className="text-neutral-400 text-xs">{open === f.q ? '−' : '+'}</span>
                    </button>
                    {open === f.q && (
                      <div className="px-4 pb-3 text-sm text-neutral-300">{f.a}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-left mt-4">
                <a href="/faq" className="inline-flex rounded-md px-4 py-2 text-sm bg-white/10 hover:bg-white/20 transition">View all FAQs</a>
              </div>
            </section>
          </div>

          <div className="mt-6 text-sm text-neutral-400 text-center">
            Prefer GitHub? Open an issue at {" "}
            <a href="https://github.com/crowmancloud" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 text-brand-300 hover:text-brand-200">github.com/crowmancloud</a>.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
