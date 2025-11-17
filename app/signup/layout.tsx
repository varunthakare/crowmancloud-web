import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - CrowmanCloud',
  description: 'Create your CrowmanCloud account to start analyzing code security, automating deployments, and optimizing cloud costs with our AI-powered platform.',
  keywords: ['crowmancloud signup', 'create account', 'registration', 'get started'],
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}