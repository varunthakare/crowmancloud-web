import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: 'Privacy Policy - CrowmanCloud',
  description: 'Read CrowmanCloud Privacy Policy. Learn about our GDPR and India DPDP-friendly data practices, local-first processing, and your privacy rights.',
  keywords: ['privacy policy', 'crowmancloud privacy', 'GDPR compliance', 'data protection', 'local-first processing'],
};

export default function PrivacyPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PrivacyContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}