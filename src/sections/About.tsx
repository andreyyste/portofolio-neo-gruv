import React from 'react';
import { aboutData } from '../data';
import { Badge } from '../ui/Badge';

export const About: React.FC = () => {
    const { badge, portraitLabel, headline, manifesto, rules } = aboutData;

    return (
        <section className="py-24 px-gutter bg-theme-red neo-section-divider relative reveal-section w-full overflow-hidden" id="about">
            <div className="max-w-container-max mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative animate-float">
                        <div className="absolute inset-0 bg-on-surface neo-border translate-x-4 translate-y-4 z-0"></div>
                        <div className="relative z-10 w-full aspect-square bg-surface overflow-hidden neo-border border-[8px] hover:scale-105 transition-transform duration-500">
                            <div className="w-full h-full bg-surface-variant flex items-center justify-center filter grayscale contrast-125">
                                <span className="font-display-2xl text-[72px] md:text-[120px] opacity-20">{aboutData.portraitPlaceholder}</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-surface text-on-surface px-6 py-3 font-label-bold uppercase neo-border-heavy neo-shadow rotate-[-5deg] z-20 hover:rotate-0 transition-transform">
                            {portraitLabel}
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <Badge as="span" className="inline-block bg-on-surface text-surface-container-lowest mb-6 animate-float" style={{ animationDelay: '0.5s' }}>
                            {badge}
                        </Badge>
                        <h2 className="font-display-2xl text-[48px] md:text-[64px] lg:text-[96px] leading-none uppercase mb-8 text-on-surface tracking-tighter">
                            {headline.line1}<br/>{headline.line2}<br/><span className="bg-theme-blue text-surface-container-lowest px-4 neo-border inline-block rotate-2 animate-float">{headline.highlight}</span>
                        </h2>
                        <div className="flex flex-col gap-6 text-on-surface">
                            <p className="font-body-lg text-body-lg font-bold bg-surface p-6 neo-border neo-shadow-sm hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#1e1b19] transition-all duration-300">
                                {manifesto}
                            </p>
                            {rules.map((rule, index) => (
                                <div key={index} className="border-l-[6px] border-on-surface pl-6 py-2 hover:pl-8 transition-all duration-300">
                                    <h4 className="font-headline-lg-mobile text-[24px] uppercase font-bold mb-2">{rule.label}</h4>
                                    <p className="font-body-md font-bold">{rule.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};