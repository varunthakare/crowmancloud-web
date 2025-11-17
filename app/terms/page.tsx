import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: 'Terms of Service - CrowmanCloud',
  description: 'Read CrowmanCloud Terms of Service. Learn about our local-first approach, code handling policies, and user responsibilities for our cloud deployment platform.',
  keywords: ['terms of service', 'crowmancloud terms', 'cloud deployment terms', 'local-first policy'],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TermsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}