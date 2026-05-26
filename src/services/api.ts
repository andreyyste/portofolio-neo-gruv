import { SiteData, Project, Experience } from '../types';

/**
 * Custom error class for API failures
 */
export class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

/**
 * Generic fetcher with basic error handling
 */
async function fetchWithError<T>(url: string): Promise<T> {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
        throw new APIError(response.status, `Failed to fetch from ${url}: ${response.statusText}`);
    }
    return await response.json() as T;
}

/**
 * Fetch all site data needed for the portfolio concurrently.
 * Centralizes data fetching logic and error handling (SRP).
 */
export async function fetchSiteData(baseUrl: string): Promise<SiteData> {
    const endpoints = {
        hero: `${baseUrl}/config/hero`,
        about: `${baseUrl}/config/about`,
        contact: `${baseUrl}/config/contact`,
        marquee: `${baseUrl}/config/marquee`,
        navigation: `${baseUrl}/config/navigation`,
        footer: `${baseUrl}/config/footer`,
        resume: `${baseUrl}/config/resume`,
        projects: `${baseUrl}/portfolio/projects`,
        experiences: `${baseUrl}/portfolio/experiences`,
        skills: `${baseUrl}/portfolio/skills`,
    };

    // Use Promise.all to fetch all endpoints concurrently
    const [
        heroData,
        aboutData,
        contactData,
        marqueeItems,
        navigationData,
        footerData,
        resumeData,
        projectsDataRaw,
        experiencesDataRaw,
        skillsData
    ] = await Promise.all([
        fetchWithError<any>(endpoints.hero),
        fetchWithError<any>(endpoints.about),
        fetchWithError<any>(endpoints.contact),
        fetchWithError<string[]>(endpoints.marquee),
        fetchWithError<any>(endpoints.navigation),
        fetchWithError<any>(endpoints.footer),
        fetchWithError<any>(endpoints.resume),
        fetchWithError<any[]>(endpoints.projects),
        fetchWithError<any[]>(endpoints.experiences),
        fetchWithError<any[]>(endpoints.skills),
    ]);

    // Transform API structures into our frontend domain models
    const mappedProjects: Project[] = projectsDataRaw.map((p: any) => ({
        ...p,
        image: { src: p.imageSrc, alt: p.imageAlt },
        tags: p.tags?.map((t: any) => t.name) || []
    }));

    const mappedExperiences: Experience[] = experiencesDataRaw.map((e: any) => ({
        ...e,
        skills: e.skills?.map((s: any) => s.name) || []
    }));

    return {
        heroData,
        aboutData,
        contactData,
        marqueeItems,
        navigationData,
        footerData,
        resumeData,
        projectsData: mappedProjects,
        experiencesData: mappedExperiences,
        skillsData
    };
}
