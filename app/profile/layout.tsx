import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - CrowmanCloud',
  description: 'Manage your CrowmanCloud account settings, subscription details, security preferences, and access comprehensive profile management features.',
  keywords: ['crowmancloud profile', 'account settings', 'subscription management', 'user profile'],
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}