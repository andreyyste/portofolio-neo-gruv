import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nre.codes';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/nre-masuk', '/dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
