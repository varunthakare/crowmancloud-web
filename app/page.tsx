import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LogoMarquee from '@/components/LogoMarquee';
import ShowcaseSection from '@/components/ShowcaseSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Features compact hideKeys={['security','multi-env']} />
        <ShowcaseSection
          id="showcase-code"
          eyebrow="Code with confidence"
          title="From idea to production faster"
          description="Analyze your repo, auto‑provision cloud essentials, and get cost‑aware deployment guidance — all from a secure, local‑first app."
          image="/starting-app.svg"
          details={[
            'Multiple AI model options: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo',
            'Advanced Claude models: Claude 3 Sonnet, Claude 3 Haiku',
            'Custom model integration with + Add Custom Model',
            'Docker Compose detection and configuration',
            'Theme customization and personalized setup'
          ]}
          reversed={false}
        />
        <ShowcaseSection
          id="showcase-security"
          eyebrow="Security first"
          title="Comprehensive security analysis"
          description="Advanced vulnerability scanning and dependency checks keep your applications secure. Real-time monitoring and automated security insights."
          image="/security-analysis.svg"
          details={[
            'Automated vulnerability scanning for all dependencies',
            'Real-time security analysis and threat detection',
            'Comprehensive dependency health monitoring',
            'Security compliance reporting and recommendations',
            'Continuous monitoring for new security threats'
          ]}
          reversed={true}
        />
        <ShowcaseSection
          id="showcase-dependencies"
          eyebrow="Dependency management"
          title="Smart dependency monitoring"
          description="Keep your dependencies up-to-date and secure with intelligent monitoring and automated health checks."
          image="/dependacy-check.svg"
          details={[
            'Automated dependency version tracking',
            'License compliance and compatibility checks',
            'Performance impact analysis of updates',
            'Security patch recommendations',
            'Dependency tree visualization and optimization'
          ]}
          reversed={false}
        />
        {/* CTA removed per request */}
      </main>
      <Footer />
    </div>
  );
}
