'use client';

import { useEffect } from 'react';

export default function SEOOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/favicon.svg',
        '/img/crowman-sky-diving.jpeg',
        '/application.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.svg') || resource.endsWith('.png') || resource.endsWith('.jpeg') ? 'image' : 'fetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Add schema markup for breadcrumbs
    const addBreadcrumbSchema = () => {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'CrowmanCloud',
            item: window.location.origin
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Crowman Platform',
            item: `${window.location.origin}/crowman`
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    };

    // Add FAQ schema for better rich snippets
    const addFAQSchema = () => {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is CrowmanCloud?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CrowmanCloud (Crowman) is an AI-powered pre-deployment platform that analyzes repositories, auto-provisions cloud infrastructure, provides cost-aware guidance, and checks vulnerabilities.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is Crowman?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Crowman is the AI-powered cloud developer platform by CrowmanCloud that automates deployments, analyzes code, and optimizes cloud infrastructure across AWS, GCP, and Azure.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Crowman AI work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Crowman AI analyzes your repository structure, dependencies, and code patterns to automatically generate infrastructure blueprints, estimate costs, and identify security vulnerabilities before deployment.'
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    };

    // Performance optimizations
    const optimizePerformance = () => {
      // Lazy load images
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));

      // Prefetch important pages
      const importantPages = ['/features', '/pricing', '/about', '/crowman'];
      importantPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    addBreadcrumbSchema();
    addFAQSchema();
    optimizePerformance();

    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const trackWebVitals = async () => {
        try {
          const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
          
          onCLS((metric: any) => {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(metric.value * 1000),
              custom_parameter_1: 'crowmancloud_performance',
              custom_parameter_2: 'cls_measurement'
            });
          });

          onINP((metric: any) => {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'INP',
              value: Math.round(metric.value),
              custom_parameter_1: 'crowmancloud_performance',
              custom_parameter_2: 'inp_measurement'
            });
          });

          onFCP((metric: any) => {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(metric.value),
              custom_parameter_1: 'crowmancloud_performance',
              custom_parameter_2: 'fcp_measurement'
            });
          });

          onLCP((metric: any) => {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(metric.value),
              custom_parameter_1: 'crowmancloud_performance',
              custom_parameter_2: 'lcp_measurement'
            });
          });

          onTTFB((metric: any) => {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'TTFB',
              value: Math.round(metric.value),
              custom_parameter_1: 'crowmancloud_performance',
              custom_parameter_2: 'ttfb_measurement'
            });
          });
        } catch (error) {
          console.warn('Web Vitals tracking failed:', error);
        }
      };

      trackWebVitals();
    }
  }, []);

  return null;
}
