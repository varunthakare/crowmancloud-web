import type { MetadataRoute } from 'next';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/community',
    '/contact',
    '/crowman',
    '/crowmantool',
    '/docs',
    '/faq',
    '/features',
    '/pricing',
    '/privacy',
    '/profile',
    '/showcase',
    '/signin',
    '/signup',
    '/status',
    '/terms',
    '/updates',
    '/vulnerability',
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
