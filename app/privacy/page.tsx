"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Privacy Policy
            </motion.h1>
            <p className="mt-3 text-neutral-300">How CrowmanCloud collects, uses, and protects your information.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* TOC */}
            <aside className="lg:col-span-1 hidden lg:block">
              <nav className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
                <p className="uppercase tracking-wide text-neutral-400 mb-2">On this page</p>
                <ul className="space-y-2">
                  <li><a className="hover:text-white" href="#collection">Data Collection</a></li>
                  <li><a className="hover:text-white" href="#use">How We Use Data</a></li>
                  <li><a className="hover:text-white" href="#security">Security</a></li>
                  <li><a className="hover:text-white" href="#rights">Your Rights</a></li>
                </ul>
              </nav>
            </aside>

            {/* Body */}
            <article className="lg:col-span-3 space-y-6">
              <section className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p>We respect your privacy. This policy explains what information we collect and how we use it.</p>
              </section>

              <section id="collection" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Data Collection</h2>
                <ul className="mt-3 list-disc list-inside text-neutral-200 text-sm">
                  <li>Account data: name and email for authentication and support.</li>
                  <li>Usage data: basic analytics to improve product experience.</li>
                  <li>We do not sell your data.</li>
                </ul>
              </section>

              <section id="use" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">How We Use Data</h2>
                <p className="mt-2 text-sm text-neutral-200">We use your information to provide and improve the service, communicate with you, and ensure security and compliance.</p>
              </section>

              <section id="security" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="mt-2 text-sm text-neutral-200">We implement reasonable administrative, technical, and physical safeguards. Data in transit is protected using HTTPS/TLS.</p>
              </section>

              <section id="rights" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Your Rights</h2>
                <p className="mt-2 text-sm text-neutral-200">You may request access, correction, or deletion of your personal data by contacting us.</p>
                <p className="mt-4 text-neutral-400 text-xs">Last updated: Sep 2025</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
