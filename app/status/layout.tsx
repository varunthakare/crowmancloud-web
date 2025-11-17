import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status - CrowmanCloud',
  description: 'Real-time status of CrowmanCloud services including API, authentication, platform availability, and comprehensive system health monitoring dashboard.',
  keywords: ['crowmancloud status', 'system status', 'service availability', 'uptime'],
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}