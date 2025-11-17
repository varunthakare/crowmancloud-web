import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - CrowmanCloud',
  description: 'Join the CrowmanCloud community. Connect with developers worldwide, follow our product roadmap, and stay updated with the latest releases and features.',
  keywords: ['crowmancloud community', 'developer community', 'github', 'discord', 'roadmap'],
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}