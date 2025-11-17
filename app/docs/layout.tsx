import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - CrowmanCloud',
  description: 'Complete documentation for CrowmanCloud. Learn how to use our AI-powered cloud deployment platform, comprehensive API guides, and industry best practices.',
  keywords: ['crowmancloud documentation', 'docs', 'api guide', 'tutorials', 'developer guide'],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}