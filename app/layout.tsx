import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Analytics from '@/components/Analytics';
import SEOOptimizations from '@/components/SEOOptimizations';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CrowmanCloud - AI-Powered Cloud Developer Platform | Crowman',
    template: '%s | CrowmanCloud - Crowman',
  },
  description:
    'CrowmanCloud (Crowman) is the leading AI-powered pre-deployment platform. Analyze repos, auto-provision cloud infrastructure, get cost-aware guidance, and check vulnerabilities. The ultimate crowman cloud solution for developers.',
  keywords: [
    'crowmancloud',
    'crowman cloud',
    'crowman',
    'crow man cloud',
    'crowmancloud platform',
    'crowman ai',
    'crowmancloud ai',
    'AI developer platform',
    'cloud deployment platform',
    'pre-deployment analysis',
    'infrastructure as code',
    'cost estimation tool',
    'vulnerability scanning',
    'DevOps automation',
    'cloud infrastructure',
    'developer tools',
    'Next.js deployment',
    'AWS deployment',
    'GCP deployment', 
    'Azure deployment',
    'CICD pipeline',
    'cloud cost optimization',
    'security scanning',
    'repo analysis',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'CrowmanCloud',
    title: 'CrowmanCloud - AI-Powered Cloud Developer Platform | Crowman',
    description:
      'CrowmanCloud (Crowman) - Leading AI-powered pre-deployment platform for repo analysis, cloud infrastructure blueprints, cost guidance, and vulnerability checks.',
    images: [
      {
        url: '/img/crowman-sky-diving.jpeg',
        width: 1200,
        height: 630,
        alt: 'CrowmanCloud - Crowman AI-powered cloud developer platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrowmanCloud - AI-Powered Cloud Developer Platform | Crowman',
    description:
      'CrowmanCloud (Crowman) - Analyze repos, auto-provision cloud resources, estimate costs, and check vulnerabilities with our AI-powered platform.',
    images: ['/img/crowman-sky-diving.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.svg' },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'bing': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CrowmanCloud',
    alternateName: ['Crowman', 'Crowman Cloud'],
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description: 'CrowmanCloud (Crowman) - AI-powered cloud developer platform for pre-deployment analysis and infrastructure automation.',
    foundingDate: '2024',
    industry: 'Software Development',
    sameAs: [
      'https://github.com/crowmancloud',
      'https://twitter.com/crowmancloud',
      'https://linkedin.com/company/crowmancloud'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CrowmanCloud',
    alternateName: 'Crowman',
    url: siteUrl,
    description: 'CrowmanCloud (Crowman) - AI-powered pre-deployment platform for developers',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    keywords: 'crowmancloud, crowman, crowman cloud, AI developer platform, cloud deployment'
  };

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CrowmanCloud',
    alternateName: 'Crowman',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description:
      'CrowmanCloud (Crowman) - AI-powered pre-deployment platform for repo analysis, infrastructure blueprints, cost guidance, and vulnerability checks.',
    keywords: 'crowmancloud, crowman, AI deployment, cloud infrastructure, developer tools',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150'
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          {children}
        </GoogleOAuthProvider>
        <Analytics />
        <SEOOptimizations />
        <Script id="ld-organization" type="application/ld+json">
          {JSON.stringify(orgJsonLd)}
        </Script>
        <Script id="ld-website" type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Script id="ld-application" type="application/ld+json">
          {JSON.stringify(appJsonLd)}
        </Script>
      </body>
    </html>
  );
}
