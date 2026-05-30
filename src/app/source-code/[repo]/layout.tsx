import React from 'react';
import { DataProvider } from '../../../context/DataContext';
import { fetchSiteData } from '../../../services/api';
import { Layout } from '../../../layout/Layout';

export default async function RepoLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let siteData;
  try {
    siteData = await fetchSiteData(baseUrl);
  } catch (error) {
    console.error('Failed to fetch site data for RepoLayout:', error);
    // Fallback if the backend is down
    siteData = {
      heroData: { name: 'Andre Christian Manurung', roles: [], greeting: '', resumeLink: '' },
      aboutData: { title: '', text: '', quote: '', image: { src: '', alt: '' } },
      contactData: { text: '', email: '', github: '', linkedin: '' },
      marqueeItems: [],
      navigationData: { brandName: 'CREATIVE.RAW', navLinks: [{ label: 'WORK', href: '/#work' }, { label: 'PROCESS', href: '/#about' }, { label: 'ARCHIVES', href: '/#resume' }, { label: 'CONTACT', href: '/#contact' }], ctaText: "LET'S TALK" },
      footerData: { brandName: 'CREATIVE.RAW', socials: [], copyright: '©2026' },
      resumeData: { education: [], experience: [] },
      projectsData: [],
      experiencesData: [],
      skillsData: [],
    };
  }

  return (
    <DataProvider data={siteData}>
      <Layout>
        <div className="min-h-screen bg-theme-grey text-on-surface flex flex-col w-full">
          {children}
        </div>
      </Layout>
    </DataProvider>
  );
}
