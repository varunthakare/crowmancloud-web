"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { Rocket, Target, Users2, Shield, Sparkles, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Developer-first", desc: "Every decision starts from the command line and ends with a delightful UI. We obsess over DX and measurable productivity." },
    { icon: Shield, title: "Secure by default", desc: "Best‑practice defaults, secret hygiene, and guardrails that help teams ship with confidence." },
    { icon: Users2, title: "Open & community-driven", desc: "We grow with our community—roadmaps in public, feedback loops in weeks, not quarters." },
    { icon: Sparkles, title: "Practical AI", desc: "AI where it’s useful: code insights, automation, and recommendations—not gimmicks." },
  ];

  const milestones = [
    { date: "Q1 2025", title: "Private preview", desc: "Early adopters validate the readiness checks and automation pipeline." },
    { date: "Q2 2025", title: "Public beta", desc: "Pricing plans, cost estimation, and performance insights ship to all users." },
    { date: "Q3 2025", title: "Teams & workflows", desc: "Collaboration features and multi‑env workflows for growing teams." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              About CrowmanCloud
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="mt-4 text-neutral-300"
            >
              CrowmanCloud is the AI‑powered pre‑deployment platform that helps developers ship cloud‑ready apps faster.
              We analyze code for readiness, generate infrastructure and CI, provide cloud recommendations, and estimate costs—so you can focus on building.
            </motion.p>
          </div>

          {/* Mission */}
          <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand-500/20 text-brand-300 p-2">
                  <Rocket className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">Our mission</h2>
              </div>
              <p className="mt-3 text-neutral-300 text-sm">
                Close the gap between local development and cloud production.
                We believe developers should get actionable guidance, automation, and cost visibility before CI/CD ever runs.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm text-brand-300">In numbers</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>• 6+ core capabilities shipped in beta</li>
                <li>• Seconds to generate Docker & CI</li>
                <li>• Cost insights before deploy</li>
              </ul>
            </div>
          </section>

          {/* Values */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-center">What we stand for</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-brand-500/20 text-brand-300 p-2">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">{v.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-neutral-300">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Founders */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-center">The founders</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <img
                  src="/founders.jpg"
                  alt="Founders"
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-center text-xs text-neutral-400">
                  Photo caption (right to left): Shivam Thorat, Varun Thakare, and Pranit Dhumal.
                </p>
              </div>
              <div>
                <p className="text-neutral-300 text-sm leading-7">
                  CrowmanCloud began as a small side project. Shivam Thorat, co-founder, wanted to make cloud deployment easier for developers. As more people started using the tool, he brought on two former colleagues Varun Thakare and Pranit Dhumal to help build something bigger. Together, they founded CrowmanCloud.
                </p>
                <p className="text-neutral-300 text-sm leading-7 mt-3">
                  Today, CrowmanCloud has grown into a leading platform for cloud deployment analysis, and the same three founders still guide the company forward.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-center">Our Story</h2>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <p>
                  Every developer has faced this: your app runs fine on your computer, but once you try to deploy it to the cloud, everything starts to break. Configuration problems, security risks, high costs, and compatibility issues make things frustrating.
                </p>
                <p>
                  That’s why we built CrowmanCloud. We’ve been through these same struggles ourselves. As developers and cloud engineers, we saw many teams dealing with the same cloud deployment headaches. Most tools out there were either too complicated or required uploading private code to external servers.
                </p>
                <p>
                  CrowmanCloud is different. It runs completely on your own machine, so your code stays private. It gives you powerful code analysis just like big enterprise tools but in a simple, developer-friendly way. We’re not a typical cloud service. We’re a local-first tool that helps you get cloud-ready without compromising your privacy.
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap/Milestones */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-center">Milestones</h2>
            <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
              {milestones.map((m) => (
                <div key={m.title} className="p-5 flex items-start gap-4">
                  <div className="text-brand-300 text-sm w-28 shrink-0">{m.date}</div>
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-neutral-300 mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="mt-14 text-center">
            <p className="text-neutral-300">We’re building in the open with our community.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a href="/features" className="inline-flex rounded-md px-4 py-2 text-sm bg-white/10 hover:bg-white/20 transition">Explore features</a>
              <a href="/pricing" className="inline-flex rounded-md px-4 py-2 text-sm bg-brand-500 hover:bg-brand-400 text-white transition">Get started</a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
