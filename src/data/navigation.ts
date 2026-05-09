export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  hoverColor: string;
  hoverBorder: string;
}

export const navigationData = {
  brandName: 'CREATIVE.RAW',
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
  ] as NavLink[],
  ctaText: "LET'S TALK",
};

export const footerData = {
  brandName: 'CREATIVE.RAW',
  socials: [
    { label: 'Instagram', href: '#', hoverColor: 'hover:text-theme-red', hoverBorder: 'hover:border-theme-red' },
    { label: 'Behance', href: '#', hoverColor: 'hover:text-theme-blue', hoverBorder: 'hover:border-theme-blue' },
    { label: 'Dribbble', href: '#', hoverColor: 'hover:text-theme-green', hoverBorder: 'hover:border-theme-green' },
    { label: 'Email', href: '#', hoverColor: 'hover:text-theme-yellow', hoverBorder: 'hover:border-theme-yellow' },
  ] as SocialLink[],
  copyright: '©2024 NEO-IMPACT STUDIO. BUILT FOR DISRUPTORS.',
};
