"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Route } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { Github, Map, Newspaper, MessageCircle, Users } from "lucide-react";

type InternalResource = {
  title: string;
  desc: string;
  icon: any;
  href: Route; // internal app route, uses Next.js typed routes
  cta: string;
};

type ExternalResource = {
  title: string;
  desc: string;
  icon: any;
  href: string; // external link or placeholder
  cta: string;
  external: true;
};

type Resource = InternalResource | ExternalResource;

export default function CommunityPage() {
  const resources: Resource[] = [
    {
      title: "GitHub",
      desc: "Star the repo, file issues, or contribute a pull request.",
      icon: Github,
      href: "https://github.com/crowmancloud",
      external: true,
      cta: "Visit GitHub",
    },
    {
      title: "Roadmap",
      desc: "See what we're building next and vote on upcoming features.",
      icon: Map,
      href: "#",
      external: true,
      cta: "View roadmap",
    },
    {
      title: "Updates",
      desc: "Release notes, engineering posts, and product announcements.",
      icon: Newspaper,
      href: "/updates" as Route,
      cta: "Read updates",
    },
    {
      title: "Discussions",
      desc: "Join community discussions, ask questions, and share knowledge with other developers.",
      icon: Users,
      href: "/discussions" as Route,
      cta: "Join discussions",
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
              Join the CrowmanCloud community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-neutral-300"
            >
              Connect with other developers, follow the roadmap, and keep up with the latest updates.
            </motion.p>

            {/* Chat CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <a href="#" className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm bg-brand-500 hover:bg-brand-400 text-white transition">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Join Discord
              </a>
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {resources.map((item, idx) => {
              const Card = (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className={`w-full max-w-sm h-48 rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col ${"external" in item ? "" : "cursor-pointer hover:bg-white/[0.06]"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-brand-500/20 text-brand-300 p-2">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-neutral-300 flex-1">{item.desc}</p>
                  <div className="mt-auto">
                    {"external" in item ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 transition"
                      >
                        {item.cta}
                      </a>
                    ) : (
                      <span className="inline-flex rounded-md px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 transition cursor-pointer">
                        {item.cta}
                      </span>
                    )}
                  </div>
                </motion.div>
              );

              if ("external" in item) {
                return Card;
              }

              return (
                <Link key={item.title} href={item.href} className="cursor-pointer block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl">
                  {Card}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
