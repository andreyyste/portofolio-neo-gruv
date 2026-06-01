"use client";

import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { Layout } from '../layout/Layout';
import { MouseTrail } from '../ui/MouseTrail';
import { Hero } from '../sections/Hero';
import { Marquee } from '../ui/Marquee';
import { About } from '../sections/About';
import { Work } from '../sections/Work';
import { Experience } from '../sections/Experience';
import { Skills } from '../sections/Skills';
import { Resume } from '../sections/Resume';
import { Contact } from '../sections/Contact';

export const ClientEntry: React.FC = () => {
    useReveal(true);

    return (
        <Layout>
            <MouseTrail />
            <Hero />
            <Marquee />
            <About />
            <Work />
            <Experience />
            <Skills />
            <Resume />
            <Contact />
        </Layout>
    );
};
