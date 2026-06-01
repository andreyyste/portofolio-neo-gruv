"use client";

import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Layout } from '../layout/Layout';
import { MouseTrail } from '../ui/MouseTrail';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Work } from '../sections/Work';
import { Experience } from '../sections/Experience';
import { Resume } from '../sections/Resume';
import { Contact } from '../sections/Contact';
import { MobileApp } from '../mobile/MobileApp';

export const ClientEntry: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    // useReveal langsung dipanggil tanpa syarat mounted
    useReveal(true);

    // Render desktop layout sebagai default (SSR-friendly),
    // baru swap ke mobile setelah hydration kalau memang mobile
    return (
        <>
            {isMobile ? (
                <MobileApp />
            ) : (
                <Layout>
                    <MouseTrail />
                    <Hero />
                    <About />
                    <Work />
                    <Experience />
                    <Skills />
                    <Resume />
                    <Contact />
                </Layout>
            )}
        </>
    );
};
