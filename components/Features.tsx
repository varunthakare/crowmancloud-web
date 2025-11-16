"use client";
import { motion } from 'framer-motion';
import { Sparkles, Settings, Brain, Calculator, BarChart3, Cloud, Shield, Boxes, CheckCircle2 } from 'lucide-react';

const items = [
  {
    icon: Sparkles,
    key: 'readiness',
    title: 'Readiness Analysis',
    desc: "Deep static checks for cloud readiness: detect misconfigured environments, secret leaks, insecure dependencies, missing health checks, and production config gaps—before they reach CI/CD.",
    bullets: [
      'Detect missing env vars and unsafe defaults',
      'Find hardcoded secrets and vulnerable packages',
      'Validate health checks and container liveness',
    ],
  },
  {
    icon: Settings,
    key: 'automation',
    title: 'Infrastructure Automation',
    desc: "Auto-generate Dockerfiles, Compose, CI pipelines, and IaC stubs. We infer ports, start commands, build args, and optimize layers for fast, reproducible builds.",
    bullets: [
      'One‑click Dockerfile with multi‑stage builds',
      'GitHub Actions/CI templates with cache hints',
      'IaC starters for Terraform/Pulumi',
    ],
  },
  {
    icon: Brain,
    key: 'intelligence',
    title: 'Cloud Intelligence',
    desc: "Framework-aware recommendations across AWS, GCP, and Azure with pros/cons, default SKUs, managed equivalents, and migration notes tailored to your stack.",
    bullets: [
      'Service mapping to managed equivalents',
      'Regional guidance and defaults per provider',
      'Security posture recommendations',
    ],
  },
  {
    icon: Calculator,
    key: 'cost',
    title: 'Cost Estimation',
    desc: "Interactive estimates per region and SKU with breakdowns for compute, storage, and bandwidth. Tweak sizes to see real-time cost deltas and monthly totals.",
    bullets: [
      'What‑if analysis for instance sizes',
      'Per‑service monthly totals & trends',
      'Export estimates to JSON/CSV',
    ],
  },
  {
    icon: BarChart3,
    key: 'performance',
    title: 'Performance Insights',
    desc: "Analyze bundle size, cold-start risk, N+1 calls, and blocking operations. Get prioritized fixes and track before/after improvements over time.",
    bullets: [
      'Hotspots and slow‑path detection',
      'Actionable optimization checklist',
      'Baseline vs current comparison',
    ],
  },
  {
    icon: Cloud,
    key: 'cloud-native',
    title: 'Cloud Native',
    desc: "Ship with best-practice defaults: health probes, structured logs, 12‑factor env vars, graceful shutdown, and horizontal-ready config out of the box.",
    bullets: [
      '12‑factor environment management',
      'Structured JSON logging and log ship hints',
      'Readiness/liveness probes pre‑configured',
    ],
  },
  {
    icon: Shield,
    key: 'security',
    title: 'Security Guardrails',
    desc: 'Built‑in checks for common misconfigurations with guidance to remediate quickly.',
    bullets: [
      'OWASP‑aligned linting for configs',
      'Dependency advisories surfaced early',
      'Least‑privilege IAM suggestions',
    ],
  },
  {
    icon: Boxes,
    key: 'multi-env',
    title: 'Multi‑Env Workflows',
    desc: 'Promote confidently across Dev, Preview, and Production with consistent configs.',
    bullets: [
      'Per‑env variables and secrets',
      'Preview deployments for every PR',
      'Drift detection between environments',
    ],
  },
];

type FeaturesProps = {
  compact?: boolean;
  hideKeys?: string[]; // e.g., ['security','multi-env']
};

export default function Features({ compact = false, hideKeys = [] }: FeaturesProps) {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">A Complete Pre-Deployment Toolkit</h2>
          <p className="mt-3 text-neutral-300">CrowmanCloud gives you everything you need to bridge the gap between local development and a successful cloud deployment.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items
            .map((it) => it)
            .filter((it: any) => !hideKeys.includes((it as any).key ?? ''))
            .map((Item, idx) => (
            <motion.div
              key={Item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 h-full flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand-500/20 text-brand-300 p-2">
                  <Item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-medium">{Item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-300">{compact ? Item.desc.slice(0, 110) + (Item.desc.length > 110 ? '…' : '') : Item.desc}</p>
              {!compact && Array.isArray((Item as any).bullets) && (
                <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                  {(Item as any).bullets.map((b: string) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-300 mt-0.5" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
