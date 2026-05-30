import React from 'react';
import { useData } from '../context/DataContext';
const skillsSectionData = { headline: { prefix: 'THE ', highlight: 'ARSENAL' } };
import { Title } from '../ui/Title';

const BRUTALIST_LAYOUTS = [
    { rotate: 'rotate-[-3deg]', hoverRotate: 'hover:rotate-[2deg]', mt: 'md:mt-0', shadow: 'hover:shadow-[12px_12px_0px_0px_#1e1b19]', rawDeg: '-3deg' },
    { rotate: 'rotate-[2deg]', hoverRotate: 'hover:rotate-[-2deg]', mt: 'md:mt-4', shadow: 'hover:shadow-[16px_16px_0px_0px_#1e1b19]', rawDeg: '2deg' },
    { rotate: 'rotate-[-1deg]', hoverRotate: 'hover:rotate-[3deg]', mt: 'md:mt-[-8px]', shadow: 'hover:shadow-[8px_8px_0px_0px_#1e1b19]', rawDeg: '-1deg' },
    { rotate: 'rotate-[4deg]', hoverRotate: 'hover:rotate-[0deg]', mt: 'md:mt-2', shadow: 'hover:shadow-[14px_14px_0px_0px_#1e1b19]', rawDeg: '4deg' },
    { rotate: 'rotate-[-2deg]', hoverRotate: 'hover:rotate-[2deg]', mt: 'md:mt-6', shadow: 'hover:shadow-[16px_16px_0px_0px_#1e1b19]', rawDeg: '-2deg' },
    { rotate: 'rotate-[3deg]', hoverRotate: 'hover:rotate-[-1deg]', mt: 'md:mt-[-4px]', shadow: 'hover:shadow-[10px_10px_0px_0px_#1e1b19]', rawDeg: '3deg' },
    { rotate: 'rotate-[-4deg]', hoverRotate: 'hover:rotate-[1deg]', mt: 'md:mt-3', shadow: 'hover:shadow-[12px_12px_0px_0px_#1e1b19]', rawDeg: '-4deg' },
    { rotate: 'rotate-[1deg]', hoverRotate: 'hover:rotate-[-3deg]', mt: 'md:mt-1', shadow: 'hover:shadow-[14px_14px_0px_0px_#1e1b19]', rawDeg: '1deg' }
];

export const Skills: React.FC = () => {
    const { skillsData } = useData();
    return (
        <section className="py-24 px-gutter bg-theme-blue neo-section-divider overflow-hidden w-full" id="skills">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-16 border-b-[8px] border-on-surface pb-8 reveal-section">
                    <Title
                        prefix={skillsSectionData.headline.prefix}
                        highlight={skillsSectionData.headline.highlight}
                        highlightColorClass="bg-theme-red text-surface-container-lowest"
                        highlightRotateClass="rotate-[-2deg]"
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-4 pb-12">
                    {skillsData.map((skill, index) => {
                        const layout = BRUTALIST_LAYOUTS[index % BRUTALIST_LAYOUTS.length];
                        return (
                            <div 
                                key={index} 
                                className="reveal-bounce"
                                style={{ 
                                    transitionDelay: `${index * 0.08}s`,
                                    ['--rotation-deg' as any]: layout.rawDeg 
                                }}
                            >
                                <div 
                                    className={[
                                        skill.color,
                                        skill.text,
                                        'p-6 neo-border-heavy neo-shadow flex flex-col items-center justify-center aspect-square',
                                        layout.rotate,
                                        layout.hoverRotate,
                                        layout.mt,
                                        layout.shadow,
                                        'hover:scale-105 active:scale-95 transition-all duration-300 relative animate-float cursor-pointer group'
                                    ].join(' ')}
                                    style={{ 
                                        animationDelay: `${index * 0.3}s`,
                                        animationDuration: `${5 + (index % 3)}s` 
                                    }}
                                >
                                    <h3 className="font-display-2xl text-[24px] md:text-[32px] font-bold uppercase tracking-tighter text-center group-hover:scale-110 transition-transform duration-300">
                                        {skill.name}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};