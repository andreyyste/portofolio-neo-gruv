export interface HeroData {
    headline: {
        line1: string;
        line2: string;
        highlight: string;
    };
    tagline: string;
    ctaText: string;
    ctaHref: string;
    heroImage: {
        src: string;
        alt: string;
    };
}

export interface AboutData {
    badge: string;
    portraitLabel: string;
    portraitPlaceholder: string;
    groupImagePlaceholder: string;
    headline: {
        line1: string;
        line2: string;
        highlight: string;
    };
    manifesto: string;
    rules: Array<{
        label: string;
        text: string;
    }>;
}

export interface ContactData {
    headline: {
        line1: string;
        line2: string;
        highlight: string;
    };
    subtitle: string;
    emailDestination: string;
    form: {
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        submitText: string;
    };
}

export interface NavigationItem {
    label: string;
    href: string;
}

export interface NavigationData {
    brandName: string;
    navLinks: NavigationItem[];
    ctaText: string;
}

export interface FooterData {
    brandName: string;
    copyright: string;
    socials: Array<{
        label: string;
        href: string;
        hoverColor: string;
        hoverBorder: string;
    }>;
}

export interface ResumeData {
    versionLabel: string;
    headline: {
        prefix: string;
        highlight: string;
    };
    ctaText: string;
    downloadUrl: string;
}

export interface Project {
    title: string;
    brief: string;
    description: string;
    tags: string[];
    coverImage?: string | null;
    featured: boolean;
    hasSourceCode: boolean;
    liveUrl?: string | null;
    source: 'GITHUB' | 'CMS';
    githubRepo?: string | null;
    // Compatibility fields
    link?: string;
    image?: {
        src: string;
        alt: string;
    };
    isAllProjectsCard?: boolean;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
}

export interface SkillItem {
    name: string;
    color: string;
    text: string;
    rotate?: string;
    mt?: string;
    delay?: string;
    dur?: string;
}

export interface SiteData {
    heroData: HeroData;
    aboutData: AboutData;
    contactData: ContactData;
    marqueeItems: string[];
    navigationData: NavigationData;
    footerData: FooterData;
    resumeData: ResumeData;
    projectsData: Project[];
    experiencesData: Experience[];
    skillsData: SkillItem[];
}
