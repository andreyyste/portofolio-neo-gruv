"use client";

import React, { createContext, useContext } from 'react';

import { SiteData } from '../types';

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
