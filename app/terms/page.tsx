"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";

export default function TermsPage() {
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
              Terms of Service
            </motion.h1>
            <p className="mt-3 text-neutral-300">Please read these terms carefully before using CrowmanCloud.</p>
          </div>

          {/* Content */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* TOC */}
            <aside className="lg:col-span-1 hidden lg:block">
              <nav className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
                <p className="uppercase tracking-wide text-neutral-400 mb-2">On this page</p>
                <ul className="space-y-2">
                  <li><a className="hover:text-white" href="#use">Use of Service</a></li>
                  <li><a className="hover:text-white" href="#accounts">Accounts</a></li>
                  <li><a className="hover:text-white" href="#liability">Liability</a></li>
                </ul>
              </nav>
            </aside>

            {/* Body */}
            <article className="lg:col-span-3 space-y-6">
              <section className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p>Welcome to CrowmanCloud. By using our services you agree to these terms.</p>
              </section>

              <section id="use" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Use of Service</h2>
                <ul className="mt-3 list-disc list-inside text-neutral-200 text-sm">
                  <li>Do not misuse the service or attempt unauthorised access.</li>
                  <li>Follow applicable laws and respect intellectual property.</li>
                </ul>
              </section>

              <section id="accounts" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Accounts</h2>
                <p className="mt-2 text-sm text-neutral-200">You are responsible for safeguarding your password and for activities under your account.</p>
              </section>

              <section id="liability" className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">Liability</h2>
                <p className="mt-2 text-sm text-neutral-200">Services are provided "as is" without warranties. To the maximum extent permitted by law, CrowmanCloud is not liable for damages.</p>
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
