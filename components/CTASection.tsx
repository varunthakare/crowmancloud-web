"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600 to-purple-600 p-10 text-center"
        >
          <div className="absolute inset-0 opacity-20 bg-grid" />
          <h3 className="relative text-3xl font-semibold tracking-tight">Ready to build with motion?</h3>
          <p className="relative mt-3 text-neutral-100/90">
            Start your journey with crowmancloud today. Free to try, no credit card required.
          </p>
          <div className="relative mt-8 flex justify-center gap-3">
            <Link href="/signup" className="rounded-md bg-white text-neutral-900 px-5 py-3 font-medium transition hover:bg-neutral-100">Create free account</Link>
            <Link href="/contact" className="rounded-md border border-white/30 bg-white/10 text-white px-5 py-3 font-medium transition hover:bg-white/20">Book a demo</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
