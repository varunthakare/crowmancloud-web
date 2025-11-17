import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - CrowmanCloud',
  description: 'Get in touch with the CrowmanCloud team. Ask questions, request features, or get comprehensive support for our cloud deployment platform and services.',
  keywords: ['crowmancloud contact', 'support', 'help', 'customer service', 'get in touch'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}