"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { Rocket, Target, Users2, Shield, Sparkles, Building2, Code, DollarSign, Building } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const principles = [
    { icon: Target, title: "Developer-first", desc: "We start at the command line and finish with a sleek UI. Our obsession: developer experience and measurable productivity." },
    { icon: Shield, title: "Secure by default", desc: "We bake in best-practice defaults, secret hygiene, and deployment guardrails so your team ships with confidence." },
    { icon: Users2, title: "Open & community-driven", desc: "Roadmaps in public. Feedback cycles in weeks, not quarters. We grow with our developer community." },
    { icon: Sparkles, title: "Practical AI", desc: "No flashy gimmicks. Just real code insights, actionable automation, and relevant recommendations." },
  ];

  const audience = [
    { icon: Code, text: "Solo developers & indie makers who want to deploy without DevOps overhead" },
    { icon: Rocket, text: "Startup engineering teams seeking to onboard cloud infrastructure quickly" },
    { icon: DollarSign, text: "SMBs and early-stage companies looking to avoid surprise cloud bills" },
    { icon: Building, text: "Enterprises exploring cloud-migration readiness without exposing proprietary code" }
  ];

  const milestones = [
    { date: "Q1 2025", title: "Private preview launched", desc: "6+ core features (readiness checks, infra automation, cost insights)" },
    { date: "Q2 2025", title: "Public beta rolled out", desc: "Early adopters; introduced pricing plans and advanced cost estimation" },
    { date: "Q3 2025", title: "Collaboration features added", desc: "Multi-environment workflows added for growing teams" },
    { date: "Future", title: "Enterprise expansion", desc: "GPU & ML workload readiness, deeper cloud-platform coverage" },
  ];

  const founders = [
    { name: "Pranit Dhumal", role: "Co-Founder & CEO" },
    { name: "Varun Thakare", role: "Co-Founder & COO" },
    { name: "Shivam Thorat", role: "Co-Founder & CTO" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              About CrowmanCloud – Automating Cloud-Ready Deployment for Developers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="mt-6 text-lg text-neutral-300"
            >
              We believe developers should build confidently — not fight DevOps.
            </motion.p>
          </div>

          {/* Our Mission */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Our Mission
            </motion.h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <p className="text-neutral-300 text-lg leading-relaxed text-center">
                At CrowmanCloud, our mission is to bridge the gap between local development and cloud production.
                We equip developers with actionable insights, automated infrastructure, and clear cost guidance
                before you hit CI/CD.
              </p>
            </div>
          </section>

          {/* Why We Exist */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Why We Exist
            </motion.h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Every app begins locally. But all too often deployment to the cloud becomes a minefield:
                  mis-configs, hidden costs, security surprises. We've been there.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  That's why we built CrowmanCloud: a local-first, AI-powered pre-deployment toolkit that
                  analyzes your code, generates Dockerfiles, CI pipelines, infrastructure templates,
                  recommends AWS/GCP/Azure configurations — and estimates cost — so you can ship faster,
                  securely, and within budget.
                </p>
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Who We Serve
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-md bg-brand-500/20 text-brand-300 p-2 mt-1">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="text-neutral-300">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Core Principles */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Our Core Principles
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, idx) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-md bg-brand-500/20 text-brand-300 p-2">
                      <principle.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{principle.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-300">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Founding Team */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Founding Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <img
                  src="/founders.jpg"
                  alt="CrowmanCloud Founders"
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-center text-xs text-neutral-400">
                  Photo caption (left to right): Pranit Dhumal, Varun Thakare, and Shivam Thorat.
                </p>
              </div>
              <div className="space-y-6">
                {founders.map((founder, idx) => (
                  <motion.div
                    key={founder.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <h3 className="font-semibold text-white">{founder.name}</h3>
                    <p className="text-sm text-brand-300">{founder.role}</p>
                  </motion.div>
                ))}
                <p className="text-neutral-300 text-sm leading-relaxed mt-6">
                  CrowmanCloud began as a side‐project to simplify cloud deployment for developers.
                  Today, it's a full-fledged platform trusted by makers, teams and enterprises alike.
                </p>
              </div>
            </div>
          </section>

          {/* Our Journey & Milestones */}
          <section className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold tracking-tight text-center mb-8"
            >
              Our Journey & Milestones
            </motion.h2>
            <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 flex items-start gap-4"
                >
                  <div className="text-brand-300 text-sm font-medium w-24 shrink-0">{milestone.date}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-neutral-300">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Ready to Get Started */}
          <section className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center rounded-xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-neutral-300 mb-6 text-lg">
                Join thousands of developers who are deploying smarter, faster and with confidence.
              </p>
              <Link
                href="/signin"
                className="inline-flex rounded-md bg-brand-500 hover:bg-brand-400 px-6 py-3 font-medium text-white transition"
              >
                Analyze Your Project Now →
              </Link>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}