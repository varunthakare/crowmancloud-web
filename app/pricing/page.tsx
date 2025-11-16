"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      tagline: "For exploring locally",
      features: [
        "7 files check",
        "Only vulnerability checks",
        "Single check",
        "Community support",
        "Online IDE",
      ],
      cta: { label: "Get started", href: "/" as const },
    },
    {
      name: "Pro",
      price: "$19/mo",
      tagline: "For indie devs & small teams",
      features: [
        "10 checks",
        "Vulnerability checks",
        "Cloud provider recommendations",
        "Cloud estimation",
        "Multi checks",
        "Community support",
        "Offline IDE",
      ],
      highlighted: true,
      cta: { label: "Start Pro", href: "/" as const },
    },
    {
      name: "Team",
      price: "$49/mo",
      tagline: "For growing teams",
      features: [
        "10 checks",
        "Vulnerability checks",
        "Cloud provider recommendations",
        "Cloud estimation",
        "Multi checks",
        "Community support",
        "Offline IDE",
        "Team collaboration",
      ],
      cta: { label: "Contact sales", href: "/" as const },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Simple, predictable pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-neutral-300"
            >
              Start free and upgrade as your needs grow. No hidden fees.
            </motion.p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`rounded-xl border border-white/10 p-6 bg-white/5 ${
                  plan.highlighted ? "ring-1 ring-brand-500/40 bg-white/10" : ""
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <div className="text-2xl font-semibold">{plan.price}</div>
                </div>
                <p className="mt-2 text-neutral-300 text-sm">{plan.tagline}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 inline-block" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={plan.cta.href}
                    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
                      plan.highlighted
                        ? "bg-brand-500 hover:bg-brand-400 text-white"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {plan.cta.label}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-center">Compare plans</h2>
            <p className="mt-2 text-neutral-300 text-center">See which plan fits your workflow.</p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/5">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Feature</th>
                    <th className="px-4 py-3 font-medium">Starter</th>
                    <th className="px-4 py-3 font-medium">Pro</th>
                    <th className="px-4 py-3 font-medium">Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { label: "Checks", starter: "2", pro: "10", team: "10" },
                    { label: "Files checked", starter: "25", pro: "Unlimited", team: "Unlimited" },
                    { label: "Vulnerability checks", starter: true, pro: true, team: true },
                    { label: "Cloud provider recommendations", starter: false, pro: true, team: true },
                    { label: "Cloud estimation", starter: false, pro: true, team: true },
                    { label: "Multi checks", starter: false, pro: true, team: true },
                    { label: "Community support", starter: true, pro: true, team: true },
                    { label: "IDE mode", starter: "Online", pro: "Offline", team: "Offline" },
                    { label: "Team collaboration", starter: false, pro: false, team: true },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3 text-neutral-200">{row.label}</td>
                      {[row.starter, row.pro, row.team].map((v, i) => (
                        <td key={i} className="px-4 py-3">
                          {typeof v === "boolean" ? (
                            v ? (
                              <span className="inline-flex items-center gap-2 text-emerald-300">
                                <Check className="h-4 w-4" aria-hidden="true" />
                                <span className="sr-only">Included</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-2 text-neutral-400">
                                <X className="h-4 w-4" aria-hidden="true" />
                                <span className="sr-only">Not included</span>
                              </span>
                            )
                          ) : (
                            <span className="text-neutral-100">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
