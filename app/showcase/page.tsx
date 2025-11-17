import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShowcaseSection from '@/components/ShowcaseSection';
import AnimatedBG from '@/components/AnimatedBG';

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              See CrowmanCloud in Action
            </h1>
            <p className="text-lg text-neutral-300">
              Discover how our cloud deployment tool transforms your development workflow with automated analysis and intelligent recommendations.
            </p>
          </div>
        </div>
        
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
          id="showcase-cost"
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
      </main>
      <Footer />
    </div>
  );
}