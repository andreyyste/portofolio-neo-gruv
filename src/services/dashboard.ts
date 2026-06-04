/**
 * Type-safe API client service for the Portfolio CMS dashboard.
 * Centralizes all CRUD requests targeting /api/proxy/portfolio/*.
 */

export interface ExperienceSkill {
  id: number;
  name: string;
  experienceId: number;
}

export interface ExperienceEntity {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  skills?: ExperienceSkill[];
}

export interface ExperiencePayload {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface ProjectTag {
  id: number;
  name: string;
  projectId: number;
}

export interface ProjectEntity {
  id: number;
  title: string;
  brief: string;
  description: string;
  coverImage?: string | null;
  featured: boolean;
  hasSourceCode: boolean;
  liveUrl?: string | null;
  source: 'GITHUB' | 'CMS';
  githubRepo?: string | null;
  tags?: Array<{ id: number; name: string } | string>;
}

export interface ProjectPayload {
  title: string;
  brief: string;
  description: string;
  liveUrl: string | null;
  githubRepo: string | null;
  coverImage: string | null;
  hasSourceCode: boolean;
  tags: string[];
}

export interface SkillEntity {
  id: number;
  name: string;
  color: string;
  text: string;
  delay: string;
  dur: string;
  rotate: string;
  mt: string;
}

export interface SkillPayload {
  name: string;
  color: string;
  text: string;
  delay: string;
  dur: string;
  rotate: string;
  mt: string;
}

/**
 * Generic fetcher with basic HTTP response validations.
 */
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(' ') : message);
  }

  // Handle empty responses (like 204 No Content or simple deletes)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// ==== EXPERIENCES CRUD ====

export const getExperiences = (): Promise<ExperienceEntity[]> =>
  request<ExperienceEntity[]>('/api/proxy/portfolio/experiences');

export const createExperience = (payload: ExperiencePayload): Promise<ExperienceEntity> =>
  request<ExperienceEntity>('/api/proxy/portfolio/experiences', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateExperience = (id: number, payload: ExperiencePayload): Promise<ExperienceEntity> =>
  request<ExperienceEntity>(`/api/proxy/portfolio/experiences/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const deleteExperience = (id: number): Promise<void> =>
  request<void>(`/api/proxy/portfolio/experiences/${id}`, {
    method: 'DELETE',
  });

// ==== PROJECTS CRUD ====

export const getProjects = (): Promise<ProjectEntity[]> =>
  request<ProjectEntity[]>('/api/proxy/portfolio/projects');

export const createProject = (payload: ProjectPayload): Promise<ProjectEntity> =>
  request<ProjectEntity>('/api/proxy/portfolio/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateProject = (id: number, payload: ProjectPayload): Promise<ProjectEntity> =>
  request<ProjectEntity>(`/api/proxy/portfolio/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const deleteProject = (id: number): Promise<void> =>
  request<void>(`/api/proxy/portfolio/projects/${id}`, {
    method: 'DELETE',
  });

// ==== SKILLS CRUD ====

export const getSkills = (): Promise<SkillEntity[]> =>
  request<SkillEntity[]>('/api/proxy/portfolio/skills');

export const createSkill = (payload: SkillPayload): Promise<SkillEntity> =>
  request<SkillEntity>('/api/proxy/portfolio/skills', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateSkill = (id: number, payload: SkillPayload): Promise<SkillEntity> =>
  request<SkillEntity>(`/api/proxy/portfolio/skills/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const deleteSkill = (id: number): Promise<void> =>
  request<void>(`/api/proxy/portfolio/skills/${id}`, {
    method: 'DELETE',
  });
