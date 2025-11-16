"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";

export default function UpdatesPage() {
  const updates = [
    {
      version: "v0.2.0",
      date: "2025-09-18",
      title: "Improved developer experience",
      notes: [
        "Faster analysis engine and reduced memory usage",
        "New login/signup API integration",
        "UI polish, bug fixes, and accessibility improvements",
      ],
    },
    {
      version: "v0.1.0",
      date: "2025-09-10",
      title: "Initial preview",
      notes: [
        "Project scaffolding and baseline UI",
        "Public pages and components",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Updates
            </motion.h1>
            <p className="mt-3 text-neutral-300">Release notes and product announcements.</p>
          </div>

          <div className="mt-10 space-y-6">
            {updates.map((u) => (
              <motion.article
                key={u.version}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{u.version} — {u.title}</h2>
                  <span className="text-xs text-neutral-400">{u.date}</span>
                </div>
                <ul className="mt-3 list-disc list-inside text-sm text-neutral-200">
                  {u.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
