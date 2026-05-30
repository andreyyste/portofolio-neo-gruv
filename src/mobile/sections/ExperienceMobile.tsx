import React from 'react';
import { useData } from '../../context/DataContext';

const TAG_COLORS = [
    'bg-theme-red text-white',
    'bg-theme-blue text-white',
    'bg-theme-green text-on-surface',
    'bg-theme-yellow text-on-surface'
];

export const ExperienceMobile: React.FC = () => {
    const { experiencesData } = useData();

    return (
        <section id="experience" className="w-full bg-[#f4f1ea] px-4 py-16 flex flex-col relative border-t-[6px] border-on-surface overflow-hidden">
            {/* Section Header */}
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-12 font-extrabold flex flex-col items-start reveal-left">
                THE
                <span className="inline-block bg-theme-blue text-white px-3 py-1 rounded-[4px] border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] mt-2">
                    GRIND
                </span>
            </h2>

            {/* Timeline Container */}
            <div className="relative w-full py-4 pl-8">
                {/* Vertical Dashed Line */}
                <div className="absolute left-[8px] top-0 bottom-0 w-0 border-l-[3px] border-dashed border-on-surface z-0" />

                {/* Timeline Items */}
                <div className="flex flex-col gap-10 relative z-10">
                    {experiencesData.map((exp, index) => {
                        const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
                        return (
                            <div key={index} className={`relative flex flex-col w-full ${revealClass}`}>
                            {/* Dot Indicator */}
                            <div className="absolute -left-[30px] top-2 w-4 h-4 rounded-full border-[3px] border-on-surface bg-theme-yellow shadow-[1px_1px_0px_0px_#1e1b19] z-20" />

                            {/* Card Content */}
                            <div className="w-full bg-surface border-[4px] border-on-surface p-5 shadow-[6px_6px_0px_0px_#1e1b19] relative">
                                <div className="flex flex-col gap-2 mb-3">
                                    <span className="font-label-bold text-[10px] uppercase bg-on-surface/10 text-on-surface px-2 py-1 border-[2px] border-on-surface inline-block self-start font-bold">
                                        {exp.period}
                                    </span>
                                    <h3 className="font-display-xl text-xl font-bold uppercase tracking-tight text-on-surface leading-tight">
                                        {exp.role}
                                    </h3>
                                    <span className="font-label-bold text-xs uppercase text-theme-red font-bold">
                                        {exp.company}
                                    </span>
                                </div>

                                <div className="border-t-[2px] border-on-surface pt-3 mb-4">
                                    <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Skills Badges */}
                                <div className="flex flex-wrap gap-1.5">
                                    {exp.skills.map((skill: string, sIdx: number) => {
                                        const colorClass = TAG_COLORS[sIdx % TAG_COLORS.length];
                                        return (
                                            <span 
                                                key={sIdx}
                                                className={`font-label-bold text-[9px] uppercase px-2 py-0.5 border-[2px] border-on-surface font-semibold ${colorClass}`}
                                            >
                                                {skill}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
};
