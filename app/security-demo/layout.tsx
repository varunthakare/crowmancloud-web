import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Demo - CrowmanCloud',
  description: 'Interactive security analysis demo showing CrowmanCloud comprehensive vulnerability detection capabilities for Java and Python applications with real-time results.',
  keywords: ['security demo', 'vulnerability scanner demo', 'code analysis demo', 'security testing'],
};

export default function SecurityDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}