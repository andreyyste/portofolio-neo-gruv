import React from 'react';
import { useReveal } from './hooks/useReveal';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Layout } from './layout/Layout';
import { MouseTrail } from './ui/MouseTrail';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Experience } from './sections/Experience';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';
import { MobileApp } from './mobile/MobileApp';

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

const App: React.FC = () => {
    useReveal();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;