import React from 'react';
import { projectsData } from '../../data';

const BUTTON_COLORS = ['bg-[#1a4a4f]', 'bg-[#cc2929]', 'bg-[#7b8c47]'];

export const WorkMobile: React.FC = () => {
    return (
        <section id="work" className="w-full bg-[#eeeae3] px-4 py-16 flex flex-col">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-12 font-extrabold flex flex-col items-start gap-2">
                COLLECTION
                <span className="inline-block bg-[#1a4a4f] text-[#f4f1ea] px-3 py-1 rounded-[4px] border-[3px] border-on-surface neo-shadow-sm -rotate-2">
                    ARCHIVES
                </span>
            </h2>

            <div className="flex flex-col gap-12 w-full">
                {projectsData.map((project, index) => {
                    const btnColor = BUTTON_COLORS[index % BUTTON_COLORS.length];
                    return (
                        <div key={index} className="w-full flex flex-col">
                            <div className="w-full aspect-[4/3] border-[5px] border-on-surface shadow-[8px_8px_0px_0px_#1e1b19] mb-4 flex items-center justify-center bg-gray-400 overflow-hidden relative">
                                {project.image.src ? (
                                    <img src={project.image.src} alt={project.image.alt} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-display-2xl text-3xl opacity-50 text-center">[{project.title}<br/>IMAGE]</span>
                                )}
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-display-2xl text-[32px] uppercase tracking-tighter text-on-surface leading-none mb-1">{project.title}</h3>
                                    <p className="font-label-bold font-bold text-sm text-on-surface opacity-80 uppercase tracking-widest">{project.tags.join(' / ')}</p>
                                </div>
                                <a 
                                    href={project.link}
                                    className={`w-12 h-12 ${btnColor} border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] flex justify-center items-center active:translate-y-1 active:translate-x-1 active:shadow-none transition-all`}
                                >
                                    <span className="material-symbols-outlined text-white font-bold">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
