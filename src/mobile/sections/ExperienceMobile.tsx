import React from 'react';
import { useData } from '../../context/DataContext';

export const ExperienceMobile: React.FC = () => {
    const { resumeData } = useData();
    return (
        <section id="experience" className="w-full bg-[#eeeae3] px-4 py-16 flex flex-col">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-8 font-extrabold flex items-center gap-3">
                {resumeData.headline.prefix} 
                <span className="inline-block bg-on-surface text-[#f4f1ea] px-3 py-1 rounded-[4px] border-[3px] border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    {resumeData.headline.highlight}
                </span>
            </h2>

            <div className="w-full aspect-square bg-[#0f241d] border-[6px] border-on-surface shadow-[8px_8px_0px_0px_#1e1b19] mb-8 flex items-center justify-center">
                <span className="font-display-2xl text-[40px] text-[#4af071] opacity-50 text-center">[FLOPPY<br/>DISK]</span>
            </div>

            <a 
                href={resumeData.downloadUrl}
                className="w-full bg-[#1a4a4f] text-white py-4 border-[4px] border-on-surface shadow-[6px_6px_0px_0px_#1e1b19] flex justify-center items-center gap-3 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
                <span className="material-symbols-outlined font-bold">download</span>
                <span className="font-label-bold font-bold uppercase tracking-wider">DOWNLOAD {resumeData.ctaText}</span>
            </a>
        </section>
    );
};
