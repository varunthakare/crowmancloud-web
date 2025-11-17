import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Discussions - CrowmanCloud',
  description: 'Join the CrowmanCloud community discussions. Share knowledge, ask questions, and connect with developers using our cloud deployment platform worldwide.',
  keywords: ['crowmancloud community', 'discussions', 'developer forum', 'community support', 'knowledge sharing'],
};

export default function DiscussionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}