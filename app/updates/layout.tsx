import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Updates - CrowmanCloud',
  description: 'Stay updated with the latest CrowmanCloud releases, features, and improvements. View our comprehensive changelog and product announcements here.',
  keywords: ['crowmancloud updates', 'changelog', 'release notes', 'product announcements', 'new features'],
};

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}