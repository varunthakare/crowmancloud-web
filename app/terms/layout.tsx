import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - CrowmanCloud',
  description: 'Read CrowmanCloud Terms of Service. Learn about our local-first approach, code handling policies, and user responsibilities for our platform.',
  keywords: ['terms of service', 'crowmancloud terms', 'cloud deployment terms', 'local-first policy'],
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}