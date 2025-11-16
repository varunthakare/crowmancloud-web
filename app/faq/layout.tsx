import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about CrowmanCloud plans, checks, supported frameworks, and security.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    url: '/faq',
    title: 'CrowmanCloud — Frequently Asked Questions',
    siteName: 'crowmancloud',
    description:
      'Find answers about pricing, checks, frameworks, and more for CrowmanCloud.',
    images: [{ url: '/img/crowman-sky-diving.jpeg', width: 1200, height: 630 }],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
