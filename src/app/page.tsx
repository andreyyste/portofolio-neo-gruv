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

const DesktopApp: React.FC = () => {
    return (
        <Layout>
            <MouseTrail /> 
            <Hero />
            <About />
            <Skills />
            <Work />
            <Experience />
            <Resume />
            <Contact />
        </Layout>
    );
};

export default function App() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Since useMediaQuery might return false initially during SSR, we might want to avoid a hydration mismatch.
    // We can conditionally render based on mounted state, but for now we keep the same logic.
    // If you see hydration errors, consider adding a mounted state check.
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    useReveal(mounted);

    if (!mounted) return null; // Avoid hydration mismatch

    return isMobile ? <MobileApp /> : <DesktopApp />;
}
