import React from 'react';
import { ClientEntry } from './ClientEntry';
import { DataProvider } from '../context/DataContext';
import { fetchSiteData } from '../services/api';

export default async function Page() {
    // Determine the base URL for the backend (falls back to local dev URL)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    let siteData;
    try {
        siteData = await fetchSiteData(baseUrl);
    } catch (error) {
        console.warn('Failed to fetch site data during build/render, using fallback:', error);
        siteData = {
            heroData: {
                headline: { line1: 'Neo', line2: 'Brutalist', highlight: 'Portfolio' },
                tagline: 'Developer Portfolio',
                ctaText: 'View Work',
                ctaHref: '#work',
                heroImage: { src: '', alt: 'Hero Image' }
            },
            aboutData: {
                badge: 'About',
                portraitLabel: 'Developer Portrait',
                portraitPlaceholder: '/images/portrait.jpg',
                groupImagePlaceholder: '/images/group.jpg',
                headline: { line1: 'About', line2: 'Myself', highlight: 'Info' },
                manifesto: 'Clean code developer.',
                rules: []
            },
            contactData: {
                headline: { line1: 'Get', line2: 'In Touch', highlight: 'Contact' },
                subtitle: 'Let us build something together.',
                emailDestination: 'admin@neo-gruv.com',
                form: { namePlaceholder: 'Name', emailPlaceholder: 'Email', messagePlaceholder: 'Message', submitText: 'Send' }
            },
            marqueeItems: [],
            navigationData: { brandName: 'Portfolio', navLinks: [], ctaText: 'Contact' },
            footerData: { brandName: 'Portfolio', copyright: '© 2026', socials: [] },
            resumeData: { versionLabel: 'v1.0', headline: { prefix: 'My', highlight: 'Resume' }, ctaText: 'Download', downloadUrl: '#' },
            projectsData: [],
            experiencesData: [],
            skillsData: []
        };
    }

    const schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Andre Christian Manurung',
        url: 'https://nre.codes',
        jobTitle: 'Fullstack Software Engineer',
        description: siteData.aboutData?.manifesto || 'Fullstack Software Engineer specializing in web and mobile development.',
        sameAs: siteData.footerData?.socials
            ? siteData.footerData.socials
                .map((s: { href: string }) => s.href)
                .filter((link: string) => link && link !== '#')
            : [],
        knowsAbout: [
            'Software Engineering',
            'Fullstack Development',
            'Web Development',
            'Mobile Development',
            ...(siteData.skillsData ? siteData.skillsData.map((s: { name: string }) => s.name) : []),
        ],
        image: siteData.heroData?.heroImage?.src || undefined,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
            />
            <DataProvider data={siteData}>
                <ClientEntry />
            </DataProvider>
        </>
    );
}
