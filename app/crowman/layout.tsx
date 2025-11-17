import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
  description: 'Crowman (CrowmanCloud) is the ultimate AI-powered cloud developer platform. Automate deployments, analyze repositories, and optimize costs efficiently.',
  keywords: [
    'crowman',
    'crowmancloud',
    'crowman ai',
    'crowman cloud',
    'crowman platform',
    'crowman developer tools',
    'crowman deployment',
    'crowman infrastructure',
    'AI developer platform',
    'cloud automation',
    'deployment automation',
    'infrastructure as code'
  ],
  openGraph: {
    title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
    description: 'Crowman (CrowmanCloud) - The ultimate AI-powered cloud developer platform for automated deployments and infrastructure management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crowman - CrowmanCloud AI-Powered Developer Platform',
    description: 'Crowman (CrowmanCloud) - The ultimate AI-powered cloud developer platform for automated deployments.',
  },
};

export default function CrowmanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}