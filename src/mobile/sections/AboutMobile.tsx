import React from 'react';
import { useData } from '../../context/DataContext';
import { isImageUrl, formatImageUrl } from '../../utils/image';

export const AboutMobile: React.FC = () => {
    const { aboutData } = useData();

    return (
        <section id="about" className="w-full bg-[#eeeae3] px-4 py-16 flex flex-col relative overflow-hidden">
            <h2 className="font-display-2xl text-[48px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-8 font-extrabold reveal-left">
                {aboutData.headline.line1} {aboutData.headline.line2}<br />
                <span className="inline-block bg-[#cc2929] text-[#f4f1ea] px-3 py-1 rounded-[4px]">
                    {aboutData.headline.highlight}
                </span>
            </h2>

            <div className="w-full aspect-square border-[6px] border-on-surface bg-gray-400 mb-8 flex items-center justify-center neo-shadow overflow-hidden reveal-right">
                {isImageUrl(aboutData.portraitPlaceholder) ? (
                    <img src={formatImageUrl(aboutData.portraitPlaceholder)} alt={aboutData.portraitLabel} className="w-full h-full object-cover filter grayscale contrast-125" />
                ) : (
                    <span className="font-display-2xl text-[48px] text-on-surface opacity-50">{aboutData.portraitPlaceholder}</span>
                )}
            </div>

            <p className="font-body-lg text-[16px] text-on-surface mb-10 font-medium leading-relaxed reveal-bottom">
                {aboutData.manifesto}
            </p>

            <div className="w-full relative border-[6px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] flex flex-col reveal-bottom" style={{ transitionDelay: '100ms' }}>
                <div className="w-full aspect-square bg-gray-300 flex items-center justify-center overflow-hidden">
                    {isImageUrl(aboutData.groupImagePlaceholder) ? (
                        <img src={formatImageUrl(aboutData.groupImagePlaceholder)} alt="Group" className="w-full h-full object-cover filter grayscale contrast-125" />
                    ) : (
                        <span className="font-display-2xl text-[40px] text-on-surface opacity-50 text-center whitespace-pre-line">{aboutData.groupImagePlaceholder.replace(' ', '\n')}</span>
                    )}
                </div>
                <div className="w-full py-2 bg-white flex justify-center items-center border-t-[4px] border-on-surface">
                    <span className="text-[#cc2929] font-label-bold font-bold text-sm tracking-wider uppercase">{aboutData.badge}</span>
                </div>
            </div>
        </section>
    );
};
