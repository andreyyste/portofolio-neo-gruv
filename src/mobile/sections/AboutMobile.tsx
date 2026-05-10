import React from 'react';
import { aboutData } from '../../data';

export const AboutMobile: React.FC = () => {
    return (
        <section id="about" className="w-full bg-[#eeeae3] px-4 py-16 flex flex-col relative">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-8 font-extrabold">
                {aboutData.headline.line1} {aboutData.headline.line2}<br />
                <span className="inline-block bg-[#cc2929] text-[#f4f1ea] px-3 py-1 rounded-[4px]">
                    {aboutData.headline.highlight}
                </span>
            </h2>

            <div className="w-full aspect-square border-[6px] border-on-surface bg-gray-400 mb-8 flex items-center justify-center neo-shadow">
                <span className="font-display-2xl text-[48px] text-on-surface opacity-50">[PORTRAIT]</span>
            </div>

            <p className="font-body-lg text-[16px] text-on-surface mb-10 font-medium leading-relaxed">
                {aboutData.manifesto}
            </p>

            <div className="w-full relative border-[6px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] flex flex-col">
                <div className="w-full aspect-square bg-gray-300 flex items-center justify-center">
                    <span className="font-display-2xl text-[40px] text-on-surface opacity-50 text-center">[GROUP<br/>IMAGE]</span>
                </div>
                <div className="w-full py-2 bg-white flex justify-center items-center border-t-[4px] border-on-surface">
                    <span className="text-[#cc2929] font-label-bold font-bold text-sm tracking-wider uppercase">{aboutData.badge}</span>
                </div>
            </div>
        </section>
    );
};
