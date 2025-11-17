"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsContent() {
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "use-of-services", title: "3. Use of Services" },
    { id: "code-data-handling", title: "4. Code & Data Handling" },
    { id: "prohibited-activities", title: "5. Prohibited Activities" },
    { id: "intellectual-property", title: "6. Intellectual Property Rights" },
    { id: "service-availability", title: "7. Service Availability" },
    { id: "disclaimer", title: "8. Disclaimer of Warranties" },
    { id: "limitation-liability", title: "9. Limitation of Liability" },
    { id: "termination", title: "10. Termination" },
    { id: "governing-law", title: "11. Governing Law" },
    { id: "updates", title: "12. Updates to Terms" },
  ];

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Side Navigation */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-8">
          <nav className="space-y-1">
            <h3 className="text-sm font-medium text-neutral-300 mb-4">Contents</h3>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-sm text-neutral-400 hover:text-white transition-colors py-1"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-neutral-300 mb-8">
            Last updated: November 17, 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Welcome to CrowmanCloud ("we", "our", "us"). By accessing or using our platform, tools, or services, you agree to these Terms of Service ("Terms"). If you do not agree, do not use CrowmanCloud.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                CrowmanCloud provides code-analysis tools, cloud‑readiness reports, deployment assistance, and related developer utilities ("Services").
              </p>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
              <p className="text-neutral-300 leading-relaxed">
                You must be at least 13 years old and legally able to enter into agreements to use CrowmanCloud.
              </p>
            </section>

            {/* Use of Services */}
            <section id="use-of-services">
              <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>You agree not to misuse the platform.</li>
                <li>You may not attempt to reverse engineer, exploit, or attack our platform.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
              </ul>
            </section>

            {/* Code & Data Handling */}
            <section id="code-data-handling">
              <h2 className="text-2xl font-semibold mb-4">4. Code & Data Handling (Local-First)</h2>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>CrowmanCloud is designed to operate on a local-first model where your code stays on your device unless you explicitly upload anything.</li>
                <li>If you upload any files, you represent that you have rights to use them.</li>
                <li>You retain all ownership of your code.</li>
              </ul>
            </section>

            {/* Prohibited Activities */}
            <section id="prohibited-activities">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
              <p className="text-neutral-300 leading-relaxed mb-2">You may not:</p>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Use CrowmanCloud for illegal or harmful activities.</li>
                <li>Introduce malware or attempt to breach the platform.</li>
                <li>Resell our service without written permission.</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              <p className="text-neutral-300 leading-relaxed">
                All trademarks, logos, and platform content are owned by CrowmanCloud unless stated otherwise. You retain rights to your own code and data.
              </p>
            </section>

            {/* Service Availability */}
            <section id="service-availability">
              <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
              <p className="text-neutral-300 leading-relaxed">
                CrowmanCloud may change, pause, or discontinue features at any time without liability.
              </p>
            </section>

            {/* Disclaimer */}
            <section id="disclaimer">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-neutral-300 leading-relaxed">
                CrowmanCloud is provided on an "as-is" basis. We make no guarantees about accuracy, uptime, or suitability for your project.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation-liability">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-neutral-300 leading-relaxed">
                CrowmanCloud will not be liable for damages such as data loss, incorrect cost estimations, or deployment issues arising from use of the platform.
              </p>
            </section>

            {/* Termination */}
            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <p className="text-neutral-300 leading-relaxed">
                We may suspend or terminate your account if we suspect misuse or violation of these Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-neutral-300 leading-relaxed">
                These Terms will be governed by the applicable laws of India.
              </p>
            </section>

            {/* Updates */}
            <section id="updates">
              <h2 className="text-2xl font-semibold mb-4">12. Updates to Terms</h2>
              <p className="text-neutral-300 leading-relaxed">
                We may update these Terms. Continued use means you accept the changes.
              </p>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-2">Questions?</h3>
            <p className="text-neutral-300 text-sm">
              If you have any questions about these Terms of Service, please{" "}
              <Link href="/contact" className="text-brand-400 hover:text-brand-300 underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}