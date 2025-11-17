"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyContent() {
  const sections = [
    { id: "overview", title: "1. Overview" },
    { id: "data-collection", title: "2. Data We Collect" },
    { id: "data-usage", title: "3. How We Use Data" },
    { id: "data-sharing", title: "4. Data Sharing" },
    { id: "cookies", title: "5. Cookies" },
    { id: "data-retention", title: "6. Data Retention" },
    { id: "security", title: "7. Security" },
    { id: "user-rights", title: "8. Your Rights" },
    { id: "policy-changes", title: "9. Changes to Policy" },
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
            Privacy Policy
          </h1>
          <p className="text-neutral-300 mb-8">
            Last updated: November 17, 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
              <p className="text-neutral-300 leading-relaxed">
                Your privacy is important to us. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your personal information when using CrowmanCloud.
              </p>
            </section>

            {/* Data Collection */}
            <section id="data-collection">
              <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
              
              <h3 className="text-lg font-medium mb-3 text-neutral-200">a) Automatically Collected Data</h3>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside mb-4">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and general location</li>
                <li>Usage analytics (non-personal, aggregated data)</li>
                <li>Performance and error logs</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 text-neutral-200">b) User-Provided Data</h3>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside mb-4">
                <li>Email address, name, or login credentials (when you sign up)</li>
                <li>Files you choose to upload (if any)</li>
                <li>Feedback, messages, or support inquiries</li>
                <li>Profile information and preferences</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 text-neutral-200">c) Local-First Processing</h3>
              <p className="text-neutral-300 leading-relaxed">
                CrowmanCloud primarily analyses your code locally on your machine. Uploaded files (if any) are processed only to deliver requested functionality and are not stored permanently without your consent.
              </p>
            </section>

            {/* Data Usage */}
            <section id="data-usage">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Data</h2>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>To provide and maintain the service</li>
                <li>To improve features and performance</li>
                <li>To prevent abuse or security issues</li>
                <li>To communicate updates and support</li>
                <li>To comply with legal obligations</li>
                <li>To analyze usage patterns (anonymized data only)</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                We do not sell your personal data. We may share data only with:
              </p>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Trusted infrastructure providers (with appropriate data processing agreements)</li>
                <li>Legal authorities (only when required by law)</li>
                <li>Service providers who assist in platform operations (under strict confidentiality)</li>
              </ul>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Authentication and session management</li>
                <li>Platform functionality and user preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="text-neutral-300 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            {/* Data Retention */}
            <section id="data-retention">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Uploaded files (if any) are deleted after processing unless explicitly stored by you</li>
                <li>Account information is stored as long as your account is active</li>
                <li>Analytics data is retained for up to 2 years in anonymized form</li>
                <li>Legal compliance data is retained as required by applicable laws</li>
              </ul>
            </section>

            {/* Security */}
            <section id="security">
              <h2 className="text-2xl font-semibold mb-4">7. Security</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                We implement industry‑standard security measures to protect your data, including:
              </p>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Encryption in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure development practices</li>
              </ul>
              <p className="text-neutral-300 leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* User Rights */}
            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Under GDPR and India's Digital Personal Data Protection Act, you have the right to:
              </p>
              <ul className="text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
                <li>Request deletion of your personal data</li>
                <li>Access the personal data we store about you</li>
                <li>Update or correct your account details</li>
                <li>Withdraw consent for data processing</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Object to processing of your personal data</li>
              </ul>
              <p className="text-neutral-300 leading-relaxed mt-4">
                To exercise these rights, please contact us through our support channels.
              </p>
            </section>

            {/* Policy Changes */}
            <section id="policy-changes">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
              <p className="text-neutral-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-2">Data Protection Contact</h3>
            <p className="text-neutral-300 text-sm">
              For privacy-related questions or to exercise your rights, please{" "}
              <Link href="/contact" className="text-brand-400 hover:text-brand-300 underline">
                contact us
              </Link>
              . We will respond to your request within 30 days as required by applicable data protection laws.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}