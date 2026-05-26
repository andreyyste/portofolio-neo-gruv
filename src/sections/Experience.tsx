import React from 'react';
import { Title } from '../ui/Title';
import { experienceData, experienceSectionData } from '../data';

export const Experience: React.FC = () => {
    return (
        <section className="py-24 px-gutter bg-theme-grey neo-section-divider reveal-section w-full" id="experience">
            <div className="max-w-container-max mx-auto">
                <div className="mb-16 border-b-[8px] border-on-surface pb-4">
                    <Title 
                        className="font-display-2xl text-[48px] md:text-[64px] lg:text-[96px] uppercase tracking-tighter text-on-surface leading-none"
                        prefix={<>{experienceSectionData.headline.prefix}<br/></>}
                        highlight={experienceSectionData.headline.highlight}
                        highlightColorClass="bg-theme-blue text-surface-container-lowest"
                    />
                </div>

                <div className="flex flex-col gap-12">
                    {experienceData.map((exp, index) => (
                        <div 
                            key={index} 
                            className="bg-surface neo-border-heavy p-8 md:p-12 animate-brutalist-vertical group"
                            style={{ animationDelay: `${index * 0.4}s` }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl uppercase font-bold text-on-surface mb-2">
                                        {exp.role}
                                    </h3>
                                    <div className="font-label-bold text-label-bold uppercase text-on-surface-variant flex items-center gap-3">
                                        <span className="bg-theme-yellow px-3 py-1 neo-border text-on-surface inline-block">
                                            {exp.company}
                                        </span>
                                    </div>
                                </div>
                                <div className="font-label-bold text-label-bold uppercase text-on-surface bg-on-surface-variant/10 px-4 py-2 neo-border">
                                    {exp.period}
                                </div>
                            </div>
                            
                            <div className="border-t-[4px] border-on-surface pt-6 mb-8">
                                <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
                                    {exp.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {exp.skills.map((skill, sIdx) => (
                                    <span 
                                        key={sIdx}
                                        className="font-label-bold text-xs uppercase px-3 py-1.5 neo-border border-[3px] bg-surface-dim text-on-surface group-hover:bg-theme-green group-hover:text-surface-container-lowest transition-colors duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
