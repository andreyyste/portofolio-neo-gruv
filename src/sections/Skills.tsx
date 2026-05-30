import React from 'react';
import { useData } from '../context/DataContext';
const skillsSectionData = { headline: { prefix: 'THE ', highlight: 'ARSENAL' } };
import { Title } from '../ui/Title';

export const Skills: React.FC = () => {
    const { skillsData } = useData();
    return (
        <section className="py-24 px-gutter bg-theme-blue neo-section-divider overflow-hidden w-full" id="skills">
            <div className="max-w-container-max mx-auto reveal-section">
                <div className="text-center mb-16 border-b-[8px] border-on-surface pb-8">
                    <Title
                        prefix={skillsSectionData.headline.prefix}
                        highlight={skillsSectionData.headline.highlight}
                        highlightColorClass="bg-theme-red text-surface-container-lowest"
                        highlightRotateClass="rotate-[-2deg]"
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {skillsData.map((skill, index) => (
                        <div key={index} className={`${skill.color} ${skill.text} p-6 neo-border-heavy neo-shadow flex flex-col items-center justify-center aspect-square ${skill.rotate} exaggerated-hover relative ${skill.mt} animate-float`} style={{ animationDelay: skill.delay, animationDuration: skill.dur }}>
                            <h3 className="font-headline-lg-mobile text-[32px] md:text-[40px] font-bold uppercase">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};