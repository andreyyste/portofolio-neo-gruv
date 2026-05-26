"use client";

import React, { createContext, useContext } from 'react';

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

// We define a broad interface for the global data
export interface SiteData {
  heroData: any;
  aboutData: any;
  contactData: any;
  marqueeItems: string[];
  navigationData: any;
  footerData: any;
  resumeData: any;
  projectsData: any[];
  experiencesData: any[];
  skillsData: any[];
}

const DataContext = createContext<SiteData | null>(null);

export const DataProvider: React.FC<{ data: SiteData; children: React.ReactNode }> = ({ data, children }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = (): SiteData => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
