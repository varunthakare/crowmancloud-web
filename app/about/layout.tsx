import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about CrowmanCloud — our mission, values, and the team building an AI-powered pre-deployment platform for faster, safer cloud releases worldwide.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title: 'About CrowmanCloud',
    siteName: 'crowmancloud',
    description:
      'Our mission, values, and story behind CrowmanCloud — the AI-powered pre-deployment platform.',
    images: [{ url: '/img/crowman-sky-diving.jpeg', width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
