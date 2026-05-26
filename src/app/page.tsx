import React from 'react';
import { ClientEntry } from './ClientEntry';
import { DataProvider } from '../context/DataContext';

export default async function Page() {
    // Determine the base URL for the backend
    // In production, this might be a different domain. For now, we hardcode localhost.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    // Fetch all data concurrently
    const [
        heroData,
        aboutData,
        contactData,
        marqueeItems,
        navigationData,
        footerData,
        resumeData,
        projectsData,
        experiencesData,
        skillsData
    ] = await Promise.all([
        fetch(`${baseUrl}/config/hero`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/about`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/contact`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/marquee`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/navigation`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/footer`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/config/resume`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/portfolio/projects`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/portfolio/experiences`, { cache: 'no-store' }).then(res => res.json()),
        fetch(`${baseUrl}/portfolio/skills`, { cache: 'no-store' }).then(res => res.json()),
    ]);

    const mappedProjects = projectsData.map((p: any) => ({
        ...p,
        image: { src: p.imageSrc, alt: p.imageAlt },
        tags: p.tags?.map((t: any) => t.name) || []
    }));

    const mappedExperiences = experiencesData.map((e: any) => ({
        ...e,
        skills: e.skills?.map((s: any) => s.name) || []
    }));

    const siteData = {
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

    return (
        <DataProvider data={siteData}>
            <ClientEntry />
        </DataProvider>
    );
}
