import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, predictable pricing for CrowmanCloud. Start free and upgrade to Pro or Team for advanced analysis and collaboration.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    type: 'website',
    url: '/pricing',
    title: 'CrowmanCloud Pricing',
    siteName: 'crowmancloud',
    description:
      'Choose the plan that fits your workflow. Free Starter, Pro for indie devs, and Team for collaboration.',
    images: [{ url: '/img/crowman-sky-diving.jpeg', width: 1200, height: 630 }],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
