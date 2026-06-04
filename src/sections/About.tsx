import React from 'react';
import { useData } from '../context/DataContext';
import { Badge } from '../ui/Badge';
import { isImageUrl, formatImageUrl } from '../utils/image';

export const About: React.FC = () => {
    const { aboutData } = useData();
    const { badge, portraitLabel, headline, manifesto, rules } = aboutData;

    return (
        <section className="py-16 md:py-24 px-gutter bg-theme-red neo-section-divider relative w-full overflow-hidden" id="about">
            <div className="max-w-container-max mx-auto">
                {/* Mobile Section Header (Only visible on mobile) */}
                <div className="block md:hidden mb-8">
                    <div className="reveal-top">
                        <Badge as="span" className="inline-block bg-on-surface text-surface-container-lowest mb-6 animate-float" style={{ animationDelay: '0.5s' }}>
                            {badge}
                        </Badge>
                    </div>
                    <h2 className="font-display-2xl text-[32px] sm:text-[48px] leading-none uppercase mb-4 text-on-surface tracking-tighter reveal-right">
                        {headline.line1}<br/>{headline.line2}<br/><span className="bg-theme-blue text-surface-container-lowest px-4 neo-border inline-block rotate-2 animate-float mt-2">{headline.highlight}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Portrait column */}
                    <div className="relative reveal-left">
                        <div className="relative animate-float">
                            <div className="absolute inset-0 bg-on-surface neo-border translate-x-4 translate-y-4 z-0"></div>
                            <div className="relative z-10 w-full aspect-square bg-surface overflow-hidden neo-border border-[8px] hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full bg-surface-variant flex items-center justify-center filter grayscale contrast-125">
                                    {isImageUrl(aboutData.portraitPlaceholder) ? (
                                        <img src={formatImageUrl(aboutData.portraitPlaceholder)} alt={portraitLabel} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="font-display-2xl text-[72px] md:text-[120px] opacity-20">{aboutData.portraitPlaceholder}</span>
                                    )}
                                </div>
                            </div>
                            <div className="absolute bottom-[-1rem] right-[-0.5rem] md:-bottom-8 md:-right-8 bg-surface text-on-surface px-6 py-3 font-label-bold uppercase neo-border-heavy neo-shadow rotate-[-5deg] z-20 hover:rotate-0 transition-transform">
                                {portraitLabel}
                            </div>
                        </div>
                    </div>

                    {/* Text column */}
                    <div>
                        {/* Desktop Section Header (Only visible on desktop) */}
                        <div className="hidden md:block">
                            <div className="reveal-top">
                                <Badge as="span" className="inline-block bg-on-surface text-surface-container-lowest mb-6 animate-float" style={{ animationDelay: '0.5s' }}>
                                    {badge}
                                </Badge>
                            </div>
                            <h2 className="font-display-2xl md:text-[64px] lg:text-[96px] leading-none uppercase mb-8 text-on-surface tracking-tighter reveal-right">
                                {headline.line1}<br/>{headline.line2}<br/><span className="bg-theme-blue text-surface-container-lowest px-4 neo-border inline-block rotate-2 animate-float mt-2">{headline.highlight}</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6 text-on-surface">
                            <div className="reveal-bottom">
                                <p className="font-body-lg text-body-md sm:text-body-lg font-bold bg-surface p-6 neo-border neo-shadow-sm hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#1e1b19] transition-all duration-300">
                                    {manifesto}
                                </p>
                            </div>
                            {rules.map((rule, index) => (
                                <div key={index} className="reveal-right" style={{ transitionDelay: `${index * 0.15}s` }}>
                                    <div className="border-l-[6px] border-on-surface pl-6 py-2 hover:pl-8 transition-all duration-300">
                                        <h3 className="font-headline-lg-mobile text-[24px] uppercase font-bold mb-2">{rule.label}</h3>
                                        <p className="font-body-md font-bold">{rule.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};