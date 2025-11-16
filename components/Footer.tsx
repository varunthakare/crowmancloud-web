import Link from "next/link";
import { Github, Mail, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="CrowmanCloud" className="h-6 w-6" />
              <span className="font-semibold">CrowmanCloud</span>
            </div>
            <p className="mt-3 text-neutral-400">
              AI‑powered pre‑deployment toolkit: readiness checks, infra automation, cloud recommendations, and cost estimation—locally.
            </p>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <a href="https://github.com/crowmancloud" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20 transition">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/company/crowmancloud" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20 transition">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="https://www.instagram.com/crowmancloud/" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20 transition">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=crowmancloud0@gmail.com" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20 transition">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium">Product</h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li><Link className="hover:text-white" href={"/features" as const}>Features</Link></li>
              <li><Link className="hover:text-white" href={"/showcase" as const}>Showcase</Link></li>
              <li><Link className="hover:text-white" href={"/pricing" as const}>Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium">Company</h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li><Link className="hover:text-white" href={"/about" as const}>About</Link></li>
              <li><Link className="hover:text-white" href={"/contact" as const}>Contact</Link></li>
              <li><Link className="hover:text-white" href={"/faq" as const}>FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium">Resources</h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li><Link className="hover:text-white" href={"/status" as const}>Status</Link></li>
              <li><Link className="hover:text-white" href={"/terms" as const}>Terms</Link></li>
              <li><Link className="hover:text-white" href={"/privacy" as const}>Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p> {year} CrowmanCloud. All rights reserved.</p>
          <p>Built with love for developers.</p>
        </div>
      </div>
    </footer>
  );
}
