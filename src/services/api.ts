import { 
    SiteData, 
    HeroData, 
    AboutData, 
    ContactData, 
    NavigationData, 
    FooterData, 
    ResumeData, 
    SkillItem 
} from '../types';
import { 
    mapProject, 
    mapExperience, 
    ProjectRaw, 
    ExperienceRaw 
} from './mappers';

/**
 * Custom error class for API failures.
 * Captures the HTTP status code and response details.
 */
export class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

/**
 * Generic fetcher with error handling.
 * Integrates Next.js Incremental Static Regeneration (ISR) configuration via next.revalidate.
 * 
 * @param url - The full API URL endpoint
 * @param revalidate - Cache lifetime in seconds (defaults to 3600 / 1 hour)
 */
async function fetchWithError<T>(url: string, revalidate: number = 3600): Promise<T> {
    const response = await fetch(url, {
        next: { 
            revalidate,
            tags: ['site-data']
        }
    });
    if (!response.ok) {
        throw new APIError(response.status, `Failed to fetch from ${url}: ${response.statusText}`);
    }
    return await response.json() as T;
}

// ---- INDIVIDUAL DOMAIN FETCHERS (SRP) ----

export async function fetchHero(baseUrl: string, revalidate = 3600): Promise<HeroData> {
    return fetchWithError<HeroData>(`${baseUrl}/config/hero`, revalidate);
}

export async function fetchAbout(baseUrl: string, revalidate = 3600): Promise<AboutData> {
    return fetchWithError<AboutData>(`${baseUrl}/config/about`, revalidate);
}

export async function fetchContact(baseUrl: string, revalidate = 3600): Promise<ContactData> {
    return fetchWithError<ContactData>(`${baseUrl}/config/contact`, revalidate);
}

export async function fetchMarquee(baseUrl: string, revalidate = 3600): Promise<string[]> {
    return fetchWithError<string[]>(`${baseUrl}/config/marquee`, revalidate);
}

export async function fetchNavigation(baseUrl: string, revalidate = 86400): Promise<NavigationData> {
    return fetchWithError<NavigationData>(`${baseUrl}/config/navigation`, revalidate);
}

export async function fetchFooter(baseUrl: string, revalidate = 86400): Promise<FooterData> {
    return fetchWithError<FooterData>(`${baseUrl}/config/footer`, revalidate);
}

export async function fetchResume(baseUrl: string, revalidate = 3600): Promise<ResumeData> {
    return fetchWithError<ResumeData>(`${baseUrl}/config/resume`, revalidate);
}

export async function fetchProjects(baseUrl: string, revalidate = 1800): Promise<ProjectRaw[]> {
    return fetchWithError<ProjectRaw[]>(`${baseUrl}/portfolio/projects`, revalidate);
}

export async function fetchExperiences(baseUrl: string, revalidate = 3600): Promise<ExperienceRaw[]> {
    return fetchWithError<ExperienceRaw[]>(`${baseUrl}/portfolio/experiences`, revalidate);
}

export async function fetchSkills(baseUrl: string, revalidate = 3600): Promise<SkillItem[]> {
    return fetchWithError<SkillItem[]>(`${baseUrl}/portfolio/skills`, revalidate);
}

/**
 * Orchestrator to fetch all site configurations and portfolio data concurrently.
 * Employs Promise.all for optimized HTTP request parallelism.
 * Transforms API response structures into frontend domain models using mappers (SRP).
 * 
 * @param baseUrl - The backend domain base URL
 * @returns Fully compiled SiteData object for the portfolio page
 */
export async function fetchSiteData(baseUrl: string): Promise<SiteData> {
    // Run all HTTP requests in parallel to avoid waterfalls
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
        fetchHero(baseUrl),
        fetchAbout(baseUrl),
        fetchContact(baseUrl),
        fetchMarquee(baseUrl),
        fetchNavigation(baseUrl),
        fetchFooter(baseUrl),
        fetchResume(baseUrl),
        fetchProjects(baseUrl),
        fetchExperiences(baseUrl),
        fetchSkills(baseUrl),
    ]);

    // Map database/API entities to localized frontend models
    const mappedProjects = projectsDataRaw.map(mapProject);
    const mappedExperiences = experiencesDataRaw.map(mapExperience);

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
