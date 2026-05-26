export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export const experienceSectionData = {
  headline: {
    prefix: 'WORK',
    highlight: 'HISTORY',
  }
};

export const experienceData: ExperienceItem[] = [
  {
    role: 'Lead Frontend Engineer',
    company: 'Neo-Impact Studio',
    period: '2023 - PRESENT',
    description: 'Spearheaded the development of high-performance web applications using React and WebGL. Established a robust design system based on neo-brutalist principles that increased user engagement by 40%.',
    skills: ['React', 'WebGL', 'TailwindCSS', 'TypeScript'],
  },
  {
    role: 'Senior UI Developer',
    company: 'Digital Void',
    period: '2020 - 2023',
    description: 'Architected scalable frontend solutions for enterprise clients. Mentored junior developers and introduced modern tooling like Vite and Vitest to reduce build times and improve code quality.',
    skills: ['Vue', 'CSS Architecture', 'Vite', 'Figma'],
  },
  {
    role: 'Frontend Web Developer',
    company: 'Creative Syntax',
    period: '2017 - 2020',
    description: 'Developed responsive, accessible, and fast-loading websites for boutique agencies. Specialized in custom CSS animations and micro-interactions.',
    skills: ['HTML5', 'SASS', 'JavaScript', 'GSAP'],
  },
];
