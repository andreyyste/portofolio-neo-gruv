import React from 'react';
import { Button } from '../ui/Button';
import { resumeData } from '../data';
import { Badge } from '../ui/Badge';

export const Resume: React.FC = () => {
    const { versionLabel, headline, ctaText } = resumeData;

    return (
        <section className="py-32 px-gutter bg-theme-green neo-section-divider flex items-center justify-center reveal-section w-full" id="resume">
            <div className="w-full max-w-4xl mx-auto text-center relative animate-float">
                <Badge className="absolute -top-12 left-10 bg-on-surface text-theme-green rotate-[-10deg] z-10 hover:rotate-0 transition-transform duration-300">
                    {versionLabel}
                </Badge>
                <div className="bg-surface p-12 md:p-24 neo-border-heavy neo-shadow transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative group">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#1e1b19_10px,#1e1b19_12px)] opacity-5 z-0 pointer-events-none group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="font-display-2xl text-[48px] md:text-[80px] leading-none uppercase mb-12 text-on-surface tracking-tighter">
                            {headline.prefix} <span className="bg-theme-yellow px-4 neo-border inline-block rotate-2 animate-float">{headline.highlight}</span>
                        </h2>
                        <a href={resumeData.downloadUrl} download className="block">
                            <Button className="bg-on-surface text-theme-green neo-border-heavy px-6 md:px-12 py-8 font-display-2xl text-[5vw] sm:text-[32px] md:text-[48px] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#b8bb26] hover:bg-surface hover:text-on-surface shadow-[8px_8px_0px_0px_#b8bb26] duration-300 gap-4 active:translate-y-2 active:shadow-[0px_0px_0px_0px_#b8bb26]">
                                <span className="material-symbols-outlined text-[5vw] sm:text-[32px] md:text-[48px] group-hover:animate-bounce flex-shrink-0">download</span>
                                {ctaText}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};