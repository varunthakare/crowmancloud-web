import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CrowmanCloud',
  description: 'Read CrowmanCloud Privacy Policy. Learn about our GDPR and India DPDP-friendly data practices, local-first processing, and privacy rights.',
  keywords: ['privacy policy', 'crowmancloud privacy', 'GDPR compliance', 'data protection', 'local-first processing'],
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}