import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore CrowmanCloud features: repo analysis, infrastructure blueprints, cost estimation, and vulnerability checks for cloud‑ready apps.',
  alternates: { canonical: '/features' },
  openGraph: {
    type: 'website',
    url: '/features',
    title: 'CrowmanCloud Features',
    siteName: 'crowmancloud',
    description:
      'All the tools you need before deployment: readiness checks, cost guidance, and secure cloud defaults.',
    images: [{ url: '/img/crowman-sky-diving.jpeg', width: 1200, height: 630 }],
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
