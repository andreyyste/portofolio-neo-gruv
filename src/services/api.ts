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
async function fetchWithError<T>(url: string): Promise<T> {
    const response = await fetch(url, { cache: 'no-store' });
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
    link: string;
    githubLink?: string;
    imageSrc: string;
    imageAlt: string;
    tags?: Array<{ id: number; name: string; projectId: number }>;
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
        fetchWithError<HeroData>(endpoints.hero),
        fetchWithError<AboutData>(endpoints.about),
        fetchWithError<ContactData>(endpoints.contact),
        fetchWithError<string[]>(endpoints.marquee),
        fetchWithError<NavigationData>(endpoints.navigation),
        fetchWithError<FooterData>(endpoints.footer),
        fetchWithError<ResumeData>(endpoints.resume),
        fetchWithError<ProjectRaw[]>(endpoints.projects),
        fetchWithError<ExperienceRaw[]>(endpoints.experiences),
        fetchWithError<SkillItem[]>(endpoints.skills),
    ]);

    // Transform API structures into our frontend domain models
    const mappedProjects: Project[] = projectsDataRaw.map((p: ProjectRaw) => ({
        title: p.title,
        brief: p.brief,
        description: p.description,
        link: p.link,
        githubLink: p.githubLink || '',
        image: { src: p.imageSrc, alt: p.imageAlt },
        tags: p.tags?.map((t: { name: string }) => t.name) || []
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
