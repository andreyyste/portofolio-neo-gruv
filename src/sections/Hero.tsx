import React from 'react';
import { Button } from '../ui/Button';
import { Marquee } from '../ui/Marquee';
import { Title } from '../ui/Title';
import { heroData } from '../data';

export const Hero: React.FC = () => {
    const { headline, tagline, ctaText, heroImage } = heroData;

    return (
        <section className="relative pt-28 pb-32 w-full neo-section-divider reveal-section z-[100]">
            <div className="px-gutter max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 z-10 relative">
                    <Title
                        as="h1"
                        prefix={<>{headline.line1}<br/>{headline.line2}<br/></>}
                        highlight={headline.highlight}
                        highlightColorClass="bg-theme-yellow"
                        className="font-display-2xl text-[56px] md:text-[80px] lg:text-display-2xl uppercase text-on-background leading-none mb-8 tracking-tighter"
                    />
                    <p className="font-body-lg text-body-lg max-w-2xl mb-12 bg-surface-container p-6 neo-border neo-shadow-sm -rotate-1">
                        {tagline}
                    </p>
                    <Button className="bg-theme-blue text-surface-container-lowest neo-border-heavy neo-shadow px-8 py-4 text-lg gap-2 group">
                        {ctaText}
                        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </Button>
                </div>
                <div className="md:col-span-4 relative -top-12 md:top-0 right-0 md:-right-12 z-0 opacity-80 md:opacity-100">
                    <div className="w-full aspect-[3/4] bg-surface-dim neo-border neo-shadow overflow-hidden relative rotate-3 animate-float" style={{ animationDelay: '1s' }}>
                        <img alt={heroImage.alt} className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000" src={heroImage.src}/>
                    </div>
                </div>
            </div>
            <Marquee />
        </section>
    );
};