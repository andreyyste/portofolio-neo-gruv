import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../ui/Title';
import { useData } from '../context/DataContext';
const experienceSectionData = { headline: { prefix: 'THE', highlight: 'GRIND' } };

const TAG_COLORS = [
    'bg-theme-red text-surface-container-lowest',
    'bg-theme-blue text-surface-container-lowest',
    'bg-theme-green text-on-surface',
    'bg-theme-yellow text-on-surface'
];

import { useMediaQuery } from '../hooks/useMediaQuery';

interface TimelineItemProps {
    exp: any;
    index: number;
    isMobile: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ exp, index, isMobile }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const isLeft = !isMobile && index % 2 === 0;

    return (
        <div 
            ref={itemRef}
            className={`relative flex flex-col w-full mb-12 md:mb-16 last:mb-0 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                visible 
                    ? 'opacity-100 translate-x-0' 
                    : isLeft 
                        ? 'opacity-0 -translate-x-12 md:-translate-x-20' 
                        : 'opacity-0 translate-x-12 md:translate-x-20'
            }`}
        >
            {/* Timeline Dot Indicator */}
            <div className={`absolute w-6 h-6 rounded-full border-[3px] border-on-surface z-10 transition-all duration-500 shadow-[2px_2px_0px_0px_#1e1b19] ${
                visible ? 'bg-theme-yellow scale-100 rotate-45' : 'bg-surface scale-0 rotate-0'
            } left-[22px] md:left-1/2 -translate-x-1/2 top-8`} />

            {/* Content Row */}
            <div className={`w-full flex ${
                isLeft 
                    ? 'justify-start md:text-left' 
                    : 'justify-start md:justify-end'
            } pl-12 md:pl-0`}>
                
                {/* Compact Card with pointed arrow */}
                <div className={`w-full md:w-[calc(50%-32px)] bg-surface neo-border-heavy p-6 hover:shadow-[6px_6px_0px_0px_#1e1b19] hover:-translate-y-1 transition-all duration-300 relative after:content-[""] after:absolute after:top-[30px] after:w-4 after:h-4 after:bg-surface after:rotate-45 after:border-on-surface after:left-[-11px] after:border-l-[6px] after:border-b-[6px] ${
                    isLeft
                        ? 'md:after:left-auto md:after:-right-[11px] md:after:border-l-0 md:after:border-b-0 md:after:border-r-[6px] md:after:border-t-[6px]'
                        : 'md:after:-left-[11px]'
                }`}>
                    <div className="flex flex-col mb-4 gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h3 className="font-headline-lg-mobile text-2xl uppercase font-bold text-on-surface leading-tight">
                                {exp.role}
                            </h3>
                            <div className="font-label-bold text-xs uppercase text-on-surface bg-on-surface-variant/10 px-3 py-1.5 neo-border inline-block self-start sm:self-auto">
                                {exp.period}
                            </div>
                        </div>
                        <div className="font-label-bold text-xs uppercase text-on-surface-variant">
                            <span className="bg-theme-yellow px-2.5 py-0.5 neo-border border-[2px] text-on-surface inline-block">
                                {exp.company}
                            </span>
                        </div>
                    </div>
                    
                    <div className="border-t-[3px] border-on-surface pt-4 mb-6">
                        <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                            {exp.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill: string, sIdx: number) => {
                            const colorClass = TAG_COLORS[sIdx % TAG_COLORS.length];
                            return (
                                <span 
                                    key={sIdx}
                                    className={`font-label-bold text-[10px] uppercase px-2.5 py-1 neo-border border-[2px] transition-colors duration-300 ${colorClass}`}
                                >
                                    {skill}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Experience: React.FC = () => {
    const { experiencesData: experienceData } = useData();
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <section className="py-16 md:py-24 px-gutter bg-theme-grey neo-section-divider w-full overflow-hidden" id="experience">
            <div className="max-w-container-max mx-auto">
                <div className="mb-16 border-b-[8px] border-on-surface pb-4 reveal-section">
                    <Title 
                        className="font-display-2xl text-[36px] sm:text-[48px] md:text-[64px] lg:text-[96px] uppercase tracking-tighter text-on-surface leading-none"
                        prefix={<>{experienceSectionData.headline.prefix}<br/></>}
                        highlight={experienceSectionData.headline.highlight}
                        highlightColorClass="bg-theme-blue text-surface-container-lowest"
                    />
                </div>

                <div className="relative w-full py-8">
                    {/* Vertical dashed line */}
                    <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-0 border-l-[4px] border-dashed border-on-surface -translate-x-1/2 z-0" />
                    
                    {/* Items container */}
                    <div className="relative z-10 flex flex-col w-full">
                        {experienceData.map((exp, index) => (
                            <TimelineItem key={index} exp={exp} index={index} isMobile={isMobile} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
