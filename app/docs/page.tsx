"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  { id: "overview", title: "Overview" },
  { id: "quickstart", title: "Quickstart" },
  { id: "features", title: "Features" },
  { id: "pricing", title: "Plans & Limits" },
  { id: "faq", title: "FAQ" },
];

export default function DocsPage() {
  const [active, setActive] = useState<string>(tabs[0].id);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`${active === t.id ? 'bg-brand-500 text-white' : 'bg-transparent text-neutral-300 hover:bg-white/10'} rounded-md px-3 py-1.5 text-sm transition`}
              >
                {t.title}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="mt-8 space-y-10">
            {active === 'overview' && (
              <section>
                <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="text-3xl sm:text-4xl font-semibold tracking-tight">CrowmanCloud Documentation</motion.h1>
                <p className="mt-3 text-neutral-300">
                  CrowmanCloud is an AI‑powered pre‑deployment platform that helps you ship cloud‑ready apps faster. It provides readiness checks, infrastructure automation (Docker, CI), cloud recommendations, and cost estimation—without sending your code to the cloud.
                </p>
              </section>
            )}

            {active === 'quickstart' && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">Quickstart</h2>
                <ol className="mt-3 space-y-2 text-neutral-300 list-decimal list-inside">
                  <li>Install the app and open your project.</li>
                  <li>Run a readiness check to identify issues (secrets, env vars, health probes, vulnerable deps).</li>
                  <li>Generate artifacts: Dockerfile, docker‑compose, and CI pipeline.</li>
                  <li>Review cloud recommendations and cost estimates.</li>
                  <li>Commit and ship with confidence.</li>
                </ol>
              </section>
            )}

            {active === 'features' && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <ul className="mt-3 space-y-2 text-neutral-300 list-disc list-inside">
                  <li>Readiness Analysis: detect misconfigurations, secrets, and missing health checks.</li>
                  <li>Infrastructure Automation: generate Dockerfiles and CI pipelines optimized for your stack.</li>
                  <li>Cloud Intelligence: provider‑aware guidance with pros/cons and managed equivalents.</li>
                  <li>Cost Estimation: region‑aware pricing with what‑if sizing.</li>
                  <li>Performance Insights: identify bottlenecks and track improvements.</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-400">See the full feature tour on the <a href="/features" className="underline">Features page</a>.</p>
              </section>
            )}

            {active === 'pricing' && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">Plans & Limits</h2>
                <ul className="mt-3 space-y-2 text-neutral-300 list-disc list-inside">
                  <li>Starter: 7 files check/month, vulnerability checks.</li>
                  <li>Pro: 10 checks/month, unlimited files/run, multi‑checks, offline IDE, cloud recs, cost estimation.</li>
                  <li>Team: 10 checks/month, unlimited files/run, multi‑checks, offline IDE, team collaboration.</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-400">For full details, visit the <a href="/pricing" className="underline">Pricing page</a>.</p>
              </section>
            )}

            {active === 'faq' && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
                <p className="mt-3 text-neutral-300">Common questions are covered on our <a href="/faq" className="underline">FAQ page</a>. If you can’t find an answer, <a href="/contact" className="underline">contact us</a>.</p>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
