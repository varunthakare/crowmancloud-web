"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "What is CrowmanCloud?",
    a: "CrowmanCloud is an AI-powered developer experience platform that helps you build, deploy, and scale apps faster.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — the Starter plan is free for exploring locally.",
  },
  {
    q: "How many checks do I get per month?",
    a: "Starter includes 7 files check per month. Pro includes 10 checks per month. Team includes 10 checks per month.",
  },
  {
    q: "How many files can be checked?",
    a: "Starter can check up to 25 files per run. Pro and Team support unlimited files per run.",
  },
  {
    q: "What types of checks are available on each plan?",
    a: "Starter includes vulnerability checks only. Pro and Team add cloud provider recommendations and cloud cost estimation on top of vulnerability checks.",
  },
  {
    q: "What is a 'single check' vs 'multi checks'?",
    a: "A single check runs one analysis target at a time. 'Multi checks' lets you run multiple analyses in one session (e.g., vulnerabilities + cloud recommendations). Pro and Team support multi checks; Starter supports single checks only.",
  },
  {
    q: "Do I get offline IDE support?",
    a: "Starter uses the Online IDE. Pro and Team include Offline IDE support for local-first workflows.",
  },
  {
    q: "Does the Team plan include collaboration features?",
    a: "Yes. Team plan adds team collaboration so you can invite members and work together on projects.",
  },
  {
    q: "How do upgrades and downgrades work?",
    a: "You can change plans at any time. Upgrades take effect immediately; downgrades apply from the next billing cycle.",
  },
  {
    q: "How do I get support?",
    a: "All plans include community support. You can also open issues on our GitHub repository for bugs and feature requests.",
  },
  {
    q: "Which frameworks are supported?",
    a: "CrowmanCloud supports modern JavaScript frameworks like Next.js and SvelteKit, along with standard Node.js apps.",
  },
  {
    q: "Can I self-host?",
    a: "Self-hosting options are on our roadmap. In the meantime, you can deploy to our managed cloud.",
  },
  {
    q: "How does billing work?",
    a: "You are billed monthly based on your selected plan. You can downgrade or upgrade at any time from the dashboard.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. You can connect a custom domain and we automatically provision HTTPS certificates.",
  },
  {
    q: "What about data privacy and security?",
    a: "We use industry best practices, including encryption in transit and at rest. Access is scoped by role-based permissions.",
  },
  {
    q: "How long do deployments take?",
    a: "Most deployments complete in under a minute depending on build size and cache hits.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can cancel at any time from billing settings. Your plan remains active until the end of the current cycle.",
  },
  {
    q: "How do I manage environment variables?",
    a: "Add and edit environment variables from the dashboard. Variables are encrypted and scoped to Development, Preview, and Production.",
  },
  {
    q: "Can I view logs and metrics?",
    a: "Yes. Real-time build and runtime logs are available, with request metrics. Advanced observability is coming soon.",
  },
];

function QA({ q, a, idx }: FaqItem & { idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="pb-4 text-neutral-300 text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-center"
          >
            Frequently asked questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 text-neutral-300 text-center"
          >
            Can’t find the answer you’re looking for? {" "}
            <Link href="/community" className="text-brand-300 hover:text-brand-200 underline underline-offset-4">
              Start a thread in our community discussions
            </Link>
            .
          </motion.p>

          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-2 sm:p-4 divide-y divide-white/10">
            {faqs.map((f, i) => (
              <QA key={f.q} q={f.q} a={f.a} idx={i} />
            ))}
          </div>

          {/* CTA to discussions */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-400 text-white transition"
            >
              Ask the community
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
