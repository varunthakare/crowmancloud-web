"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            About CrowmanCloud
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg text-neutral-300 leading-relaxed"
          >
            CrowmanCloud is a developer-focused platform built to simplify cloud deployment. 
            Designed for founders, engineers, and indie developers, it removes DevOps complexity 
            by automatically preparing your project for production.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-semibold text-brand-400">10x</div>
              <div className="text-sm text-neutral-400 mt-1">Faster Deployment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-brand-400">3</div>
              <div className="text-sm text-neutral-400 mt-1">Cloud Providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-brand-400">100%</div>
              <div className="text-sm text-neutral-400 mt-1">Local-First</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}