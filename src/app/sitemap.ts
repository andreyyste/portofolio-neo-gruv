import { MetadataRoute } from 'next';
import { GithubRepo } from '../types/github';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nre.codes';
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Base static routes
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/source-code`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic routes (repository details)
  let repoRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${apiUrl}/github/repos`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (response.ok) {
      const repos: GithubRepo[] = await response.json();
      repoRoutes = repos.map((repo) => ({
        url: `${siteUrl}/source-code/${repo.githubRepo}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch repositories for sitemap generation:', error);
  }

  return [...staticRoutes, ...repoRoutes];
}
