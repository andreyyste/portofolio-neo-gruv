export interface Skill {
  name: string;
  color: string;
  text: string;
  delay: string;
  dur: string;
  rotate: string;
  mt: string;
}

export const skillsSectionData = {
  headline: {
    prefix: 'THE ',
    highlight: 'ARSENAL'
  }
};

export const skillsData: Skill[] = [
  { name: 'REACT', color: 'bg-surface', text: 'text-on-surface', delay: '0.1s', dur: '6.5s', rotate: 'rotate-2', mt: '' },
  { name: 'TAILWIND', color: 'bg-theme-yellow', text: 'text-on-surface', delay: '0.8s', dur: '5.8s', rotate: '-rotate-3', mt: 'mt-4 md:mt-12' },
  { name: 'FIGMA', color: 'bg-theme-green', text: 'text-on-surface', delay: '1.5s', dur: '6.2s', rotate: 'rotate-6', mt: '' },
  { name: 'THREE.JS', color: 'bg-theme-red', text: 'text-surface-container-lowest', delay: '0.4s', dur: '7s', rotate: '-rotate-2', mt: 'mt-4 md:mt-12' },
  { name: 'NODE', color: 'bg-on-surface', text: 'text-theme-blue', delay: '2.1s', dur: '5.5s', rotate: '-rotate-1', mt: 'mt-4 md:mt-0' },
  { name: 'GSAP', color: 'bg-surface', text: 'text-on-surface', delay: '1.2s', dur: '6.8s', rotate: 'rotate-3', mt: 'mt-4 md:mt-12' },
  { name: 'WEBGL', color: 'bg-theme-yellow', text: 'text-on-surface', delay: '0.7s', dur: '6.1s', rotate: '-rotate-6', mt: 'mt-4 md:mt-0' },
  { name: 'CSS', color: 'bg-surface', text: 'text-on-surface', delay: '1.9s', dur: '5.9s', rotate: 'rotate-1', mt: 'mt-4 md:mt-12' },
];
