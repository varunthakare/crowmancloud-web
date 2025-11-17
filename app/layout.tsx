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
    default: 'CrowmanCloud - Deploy Code 10x Faster | Cloud Deployment Tool',
    template: '%s | CrowmanCloud',
  },
  description:
    'Deploy code 10x faster with automated cloud-readiness analysis. CrowmanCloud scans projects, generates configs, and provides accurate cost estimations.',
  keywords: [
    'cloud deployment tool',
    'cloud readiness analyzer',
    'automated DevOps platform',
    'cost estimation AWS GCP Azure',
    'deploy Spring Boot to cloud',
    'cloud architecture generator',
    'code analyzer for cloud',
    'crowmancloud',
    'crowman cloud',
    'crowman',
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
    title: 'CrowmanCloud - Deploy Code 10x Faster | Cloud Deployment Tool',
    description:
      'Deploy code 10x faster with automated cloud-readiness analysis. CrowmanCloud scans projects, generates configs, and provides accurate cost estimations.',
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
    title: 'CrowmanCloud - Deploy Code 10x Faster | Cloud Deployment Tool',
    description:
      'Deploy code 10x faster with automated cloud-readiness analysis. CrowmanCloud scans projects, generates configs, and provides accurate cost estimations.',
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
    description: 'Deploy code 10x faster with automated cloud-readiness analysis. CrowmanCloud scans projects, generates configs, and provides accurate cost estimations.',
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
      'Deploy code 10x faster with automated cloud-readiness analysis. CrowmanCloud scans projects, generates configs, and provides accurate cost estimations.',
    keywords: 'cloud deployment tool, cloud readiness analyzer, automated DevOps platform, cost estimation AWS GCP Azure',
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PTCWG4RR');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q36TQP6D01"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q36TQP6D01');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "u7ejvzmp2u");`}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTCWG4RR"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>

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
