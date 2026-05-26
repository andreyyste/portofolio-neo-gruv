export interface Project {
  title: string;
  brief: string;
  description: string;
  tags: string[];
  link: string;
  image: {
    src: string;
    alt: string;
  };
}

export const projectsSectionData = {
  headline: {
    prefix: 'SELECTED',
    highlight: 'WORKS',
  },
  buttonText: 'ALL PROJECTS',
  mobileHeadline: {
    prefix: 'COLLECTION',
    highlight: 'ARCHIVES',
  }
};

export const projectsData: Project[] = [
  {
    title: 'Neon Void',
    brief: 'A sensory overload experience for a conceptual fashion brand.',
    description: 'A sensory overload experience for a conceptual fashion brand. We built a fully immersive 3D web experience with WebGL and React Three Fiber to push the boundaries of digital fashion presentation.',
    tags: ['Web Design', '3D'],
    link: '#',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk38x1K-p1rd39Gqw2ZsvVL0bovJzUtBUCG95EL5mJlX74UGwM-pE_87Txodc3enAWdvWEWJw-l-fohl70cXtOTWVx8uYx1fTlHsTk-Aqga76Gk-gTSgZLEwNTK7WVTsPxKjRFHM11SvEoJJTdDJc12CnYPzS_PqpF1_m0Ihw5o-ydjRO57fbEZrWs-5qYf88Em1EQEtsuA6i3Og7JtqZ_HQO9AMjn9oFFRjV8E-Frk0u0AU4no0EcMX9cA4hae6HupwlUu36k-cw',
      alt: 'Neon Void project',
    },
  },
  
  {
    title: 'Rust & Bone',
    brief: 'Branding and visual identity for a brutalist architecture firm.',
    description: 'Branding and visual identity for a brutalist architecture firm. The project involved creating a robust typography system, concrete-inspired color palettes, and a minimalist web presence that reflects their architectural philosophy.',
    tags: ['Branding', 'Identity'],
    link: '#',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8KpkD47eIsZ1nMkk61RbsL0iaKin_PNtkG9F1PQUgY70a7C7Rnsue6orE9DAf-V5lJiKHnns7q6YWYtqY5gIN-sr0p3kX8eBIL0FfZRNPEkluvvFs8ulQ51Vc5wQy0hdEhctSsgWLtJy9wSqIAI-XYSbNCjc2rtoBPA7ewza2ViUAoysprfiTVOOkhtv-0DL_dNhMhLrom9wAAk567EE6NXuqYkgwGBD3i3XFrs4VHkGvc4qt6Zy3o2Qs-FEhHKc1NP16rPvisIY',
      alt: 'Rust & Bone project',
    },
  },
  {
    title: 'Vortex Lab',
    brief: 'An interactive data dashboard with real-time 3D visualizations.',
    description: 'An interactive data dashboard with real-time 3D visualizations. Designed for complex data analysis, this platform leverages web technologies to present high-density data streams in an intuitive and visually striking interface.',
    tags: ['Dashboard', 'WebGL'],
    link: '#',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk38x1K-p1rd39Gqw2ZsvVL0bovJzUtBUCG95EL5mJlX74UGwM-pE_87Txodc3enAWdvWEWJw-l-fohl70cXtOTWVx8uYx1fTlHsTk-Aqga76Gk-gTSgZLEwNTK7WVTsPxKjRFHM11SvEoJJTdDJc12CnYPzS_PqpF1_m0Ihw5o-ydjRO57fbEZrWs-5qYf88Em1EQEtsuA6i3Og7JtqZ_HQO9AMjn9oFFRjV8E-Frk0u0AU4no0EcMX9cA4hae6HupwlUu36k-cw',
      alt: 'Vortex Lab project',
    },
  },
];
