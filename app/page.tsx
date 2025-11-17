import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
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
        <About />
        <ShowcaseSection
          id="showcase-code"
          eyebrow="Cloud deployment tool"
          title="From idea to production 10x faster"
          description="Analyze your repo, auto‑provision cloud essentials, and get cost‑aware deployment guidance — all from a secure, local‑first cloud deployment tool."
          image="/starting-app.svg"
          details={[
            'Automated cloud-readiness analysis for any codebase',
            'Auto-generated Dockerfiles and deployment configs',
            'Real-time cost estimation for AWS, GCP, and Azure',
            'Local-first processing - your code stays secure',
            'Architecture suggestions tailored to your project'
          ]}
          reversed={false}
        />
        <ShowcaseSection
          id="showcase-security"
          eyebrow="Local-first security"
          title="Comprehensive security analysis"
          description="Advanced vulnerability scanning and dependency checks keep your applications secure. Your code stays on your machine - no upload required."
          image="/security-analysis.svg"
          details={[
            'Automated vulnerability scanning for all dependencies',
            'Local-first processing - maximum security and privacy',
            'Comprehensive dependency health monitoring',
            'Security compliance reporting and recommendations',
            'Real-time security analysis without data exposure'
          ]}
          reversed={true}
        />
        <ShowcaseSection
          id="showcase-dependencies"
          eyebrow="Cost estimation"
          title="Accurate cloud cost predictions"
          description="Get precise cost estimation for AWS, GCP, and Azure deployments. Interactive estimates with real-time pricing for compute, storage, and bandwidth."
          image="/dependacy-check.svg"
          details={[
            'Real-time cost estimation for all major cloud providers',
            'Interactive what-if analysis for different instance sizes',
            'Per-service monthly totals and cost breakdowns',
            'Regional pricing comparisons and recommendations',
            'Export cost estimates to JSON/CSV for planning'
          ]}
          reversed={false}
        />
        {/* CTA removed per request */}
      </main>
      <Footer />
    </div>
  );
}
