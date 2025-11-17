import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - CrowmanCloud',
  description: 'Sign in to your CrowmanCloud account to access comprehensive vulnerability scanning, cloud deployment tools, and advanced security analysis features.',
  keywords: ['crowmancloud signin', 'login', 'authentication', 'account access'],
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}