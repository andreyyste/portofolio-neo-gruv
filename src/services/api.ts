import { 
    SiteData, 
    Project, 
    Experience, 
    HeroData, 
    AboutData, 
    ContactData, 
    NavigationData, 
    FooterData, 
    ResumeData, 
    SkillItem 
} from '../types';

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
async function fetchWithError<T>(url: string, revalidate: number = 3600): Promise<T> {
    const response = await fetch(url, {
        next: { revalidate } // ISR: cache N detik, lalu revalidate di background
    });
    if (!response.ok) {
        throw new APIError(response.status, `Failed to fetch from ${url}: ${response.statusText}`);
    }
    return await response.json() as T;
}

interface ProjectRaw {
    id: number;
    title: string;
    brief: string;
    description: string;
    tags?: string[];
    coverImage?: string | null;
    featured: boolean;
    hasSourceCode: boolean;
    liveUrl?: string | null;
    source: 'GITHUB' | 'CMS';
    githubRepo?: string | null;
}

interface ExperienceRaw {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    skills?: Array<{ id: number; name: string; experienceId: number }>;
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
        fetchWithError<HeroData>(endpoints.hero, 3600),           // 1 jam
        fetchWithError<AboutData>(endpoints.about, 3600),         // 1 jam
        fetchWithError<ContactData>(endpoints.contact, 3600),     // 1 jam
        fetchWithError<string[]>(endpoints.marquee, 3600),        // 1 jam
        fetchWithError<NavigationData>(endpoints.navigation, 86400), // 24 jam
        fetchWithError<FooterData>(endpoints.footer, 86400),      // 24 jam
        fetchWithError<ResumeData>(endpoints.resume, 3600),       // 1 jam
        fetchWithError<ProjectRaw[]>(endpoints.projects, 1800),   // 30 menit
        fetchWithError<ExperienceRaw[]>(endpoints.experiences, 3600), // 1 jam
        fetchWithError<SkillItem[]>(endpoints.skills, 3600),      // 1 jam
    ]);

    // Transform API structures into our frontend domain models
    const mappedProjects: Project[] = projectsDataRaw.map((p: ProjectRaw) => ({
        title: p.title,
        brief: p.brief,
        description: p.description,
        tags: p.tags || [],
        coverImage: p.coverImage || null,
        featured: p.featured,
        hasSourceCode: p.hasSourceCode,
        liveUrl: p.liveUrl || null,
        source: p.source,
        githubRepo: p.githubRepo || null,
        // Compatibility fallbacks
        link: p.liveUrl || '#',
        image: { src: p.coverImage || '', alt: p.title }
    }));

    const mappedExperiences: Experience[] = experiencesDataRaw.map((e: ExperienceRaw) => ({
        role: e.role,
        company: e.company,
        period: e.period,
        description: e.description,
        skills: e.skills?.map((s: { name: string }) => s.name) || []
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
