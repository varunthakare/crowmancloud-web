import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Cloud, Zap, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
  description: 'Crowman (CrowmanCloud) is the ultimate AI-powered cloud developer platform. Automate deployments, analyze repositories, optimize costs, and secure your infrastructure with Crowman AI technology.',
  keywords: [
    'crowman',
    'crowmancloud',
    'crowman ai',
    'crowman cloud',
    'crowman platform',
    'crowman developer tools',
    'crowman deployment',
    'crowman infrastructure',
    'AI developer platform',
    'cloud automation',
    'deployment automation',
    'infrastructure as code'
  ],
  openGraph: {
    title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
    description: 'Crowman (CrowmanCloud) - The ultimate AI-powered cloud developer platform for automated deployments and infrastructure management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
    description: 'Crowman (CrowmanCloud) - The ultimate AI-powered cloud developer platform for automated deployments.',
  },
};

export default function CrowmanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Crowman</span> AI Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
              CrowmanCloud (Crowman) is the leading AI-powered cloud developer platform. 
              Automate deployments, analyze repositories, optimize costs, and secure your infrastructure 
              with advanced Crowman AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started with Crowman
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/features" 
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Explore Crowman Features
              </Link>
            </div>
          </div>
        </section>

        {/* What is Crowman Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is Crowman?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Crowman (CrowmanCloud) is an innovative AI-powered platform that revolutionizes 
                how developers deploy and manage cloud infrastructure. Our Crowman AI technology 
                provides intelligent automation for the entire development lifecycle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Cloud className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crowman Cloud</h3>
                <p className="text-gray-600">
                  Deploy to AWS, GCP, and Azure with Crowman's intelligent cloud automation
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crowman AI</h3>
                <p className="text-gray-600">
                  AI-powered repository analysis and infrastructure recommendations
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crowman Security</h3>
                <p className="text-gray-600">
                  Advanced vulnerability scanning and security best practices
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crowman Analytics</h3>
                <p className="text-gray-600">
                  Real-time cost optimization and performance monitoring
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Crowman Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Crowman?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                CrowmanCloud (Crowman) stands out as the premier AI-powered developer platform, 
                offering unmatched automation and intelligence for modern cloud development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Crowman Platform Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Crowman AI Analysis:</strong> Intelligent repository scanning and infrastructure recommendations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Crowman Cloud Integration:</strong> Seamless deployment across AWS, GCP, and Azure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Crowman Security:</strong> Advanced vulnerability detection and compliance checking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Crowman Cost Optimization:</strong> Real-time cost analysis and optimization recommendations
                    </span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <img 
                  src="/application.png" 
                  alt="Crowman CrowmanCloud Platform Interface" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Crowman?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who trust CrowmanCloud (Crowman) for their 
              AI-powered cloud development needs. Start your Crowman journey today.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start with Crowman Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
