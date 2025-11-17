import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase - Cloud Deployment Platform | CrowmanCloud',
  description: 'See CrowmanCloud in action: automated cloud-readiness analysis, deployment file generation, cost estimation, and security scanning for major cloud providers.',
  keywords: ['cloud deployment showcase', 'automated DevOps demo', 'cost estimation demo', 'cloud readiness analysis', 'deployment automation'],
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}