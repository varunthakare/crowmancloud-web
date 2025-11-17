import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import AnimatedBG from '@/components/AnimatedBG';

export const metadata: Metadata = {
  title: 'Features - Cloud Deployment Tool | CrowmanCloud',
  description: 'Explore CrowmanCloud features: cloud-readiness analysis, auto-generated deployment files, cost estimation, local-first security, and architecture suggestions.',
  keywords: ['cloud deployment tool features', 'cloud readiness analyzer', 'automated DevOps platform', 'cost estimation AWS GCP Azure', 'deployment automation'],
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              Complete Cloud Deployment Features
            </h1>
            <p className="text-lg text-neutral-300">
              Everything you need to deploy your code to the cloud 10x faster with automated analysis and intelligent recommendations.
            </p>
          </div>
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
}