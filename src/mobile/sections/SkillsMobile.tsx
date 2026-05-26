import React from 'react';
import { useData } from '../../context/DataContext';
const skillsSectionData = { headline: { prefix: 'THE ', highlight: 'ARSENAL' } };

export const SkillsMobile: React.FC = () => {
    const { skillsData } = useData();
    return (
        <section id="skills" className="w-full bg-[#f4f1ea] px-4 py-16 flex flex-col items-center">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-10 font-extrabold flex items-center gap-3">
                {skillsSectionData.headline.prefix}
                <span className="inline-block bg-[#7b8c47] text-[#f4f1ea] px-3 py-1 rounded-[4px] border-[3px] border-on-surface neo-shadow-sm">
                    {skillsSectionData.headline.highlight}
                </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
                {skillsData.map((skill, i) => (
                    <span 
                        key={i} 
                        className={`border-[3px] border-on-surface ${skill.color} ${skill.text} px-4 py-2 font-label-bold font-bold uppercase shadow-[4px_4px_0px_0px_#1e1b19]`}
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
        </section>
    );
};
