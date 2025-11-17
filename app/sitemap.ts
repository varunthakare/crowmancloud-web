import type { MetadataRoute } from 'next';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // High priority pages (main product pages)
  const highPriorityRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/vulnerability', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/features', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  // Medium priority pages (important content)
  const mediumPriorityRoutes = [
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/showcase', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/crowman', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/docs', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/community', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/discussions', priority: 0.7, changeFrequency: 'daily' as const },
  ];

  // Standard priority pages (support/utility)
  const standardPriorityRoutes = [
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/updates', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/security-demo', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/status', priority: 0.5, changeFrequency: 'daily' as const },
  ];

  // Lower priority pages (legal/auth)
  const lowPriorityRoutes = [
    { path: '/signin', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/signup', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/profile', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const allRoutes = [
    ...highPriorityRoutes,
    ...mediumPriorityRoutes,
    ...standardPriorityRoutes,
    ...lowPriorityRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
