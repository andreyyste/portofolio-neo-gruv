import { Project, Experience } from '../types';

export interface ProjectRaw {
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

export interface ExperienceRaw {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  skills?: Array<{ id: number; name: string; experienceId: number }>;
}

/**
 * Transforms raw project data from the API into a Project domain model.
 * Handles fallbacks for missing properties and ensures backwards compatibility.
 */
export function mapProject(p: ProjectRaw): Project {
  return {
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
    image: { src: p.coverImage || '', alt: p.title },
  };
}

/**
 * Transforms raw experience data from the API into an Experience domain model.
 * Flattens the nested skills object into a simple string array.
 */
export function mapExperience(e: ExperienceRaw): Experience {
  return {
    role: e.role,
    company: e.company,
    period: e.period,
    description: e.description,
    skills: e.skills?.map((s: { name: string }) => s.name) || [],
  };
}
