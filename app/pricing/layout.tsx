import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - CrowmanCloud',
  description: 'Simple, predictable pricing for CrowmanCloud. Start free with 7 file scans, upgrade to Pro for unlimited scanning and advanced features.',
  keywords: ['crowmancloud pricing', 'cloud deployment pricing', 'vulnerability scanner pricing', 'pro plan'],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}