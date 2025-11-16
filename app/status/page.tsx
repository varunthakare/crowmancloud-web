"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";

export default function StatusPage() {
  // Placeholder status items; replace with real checks or embed status API later
  const checks = [
    { name: "Website", status: "Operational" },
    { name: "API", status: "Operational" },
    { name: "Auth", status: "Operational" },
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
              Status
            </motion.h1>
            <p className="mt-3 text-neutral-300">Live view of CrowmanCloud system components.</p>
          </div>

          <div className="mt-10 grid gap-4">
            {checks.map((c) => (
              <div key={c.name} className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                <span className="font-medium">{c.name}</span>
                <span className="text-emerald-400">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
