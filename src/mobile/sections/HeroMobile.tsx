import React from 'react';
import { useData } from '../../context/DataContext';
import { formatImageUrl } from '../../utils/image';

export const HeroMobile: React.FC = () => {
    const { heroData } = useData();

    return (
        <section id="hero" className="w-full bg-[#f4f1ea] px-4 pt-12 pb-16 flex flex-col relative overflow-hidden">
            <h1 className="font-display-2xl text-[56px] leading-[0.9] uppercase tracking-tighter text-on-surface mb-6 font-extrabold z-10 reveal-left">
                {heroData.headline.line1} <br /> {heroData.headline.line2}{' '}
                <span className="inline-block bg-[#1a4a4f] text-[#f4f1ea] px-3 py-1 rounded-[4px] -rotate-2 ml-1">
                    {heroData.headline.highlight}
                </span>
            </h1>
            
            <p className="font-body-lg text-[16px] text-on-surface mb-10 max-w-[90%] z-10 font-medium reveal-bottom" style={{ transitionDelay: '100ms' }}>
                {heroData.tagline}
            </p>

            <div className="relative w-full aspect-square border-[6px] border-on-surface bg-[#1a4a4f] z-10 overflow-hidden flex items-center justify-center reveal-bottom" style={{ transitionDelay: '200ms' }}>
                {heroData.heroImage.src ? (
                    <img src={formatImageUrl(heroData.heroImage.src)} alt={heroData.heroImage.alt} className="w-full h-full object-cover opacity-80" />
                ) : (
                    <span className="font-display-2xl text-[48px] text-surface-container-lowest opacity-30">[ROBOT IMAGE]</span>
                )}
                {/* Floating brutalist icons */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-10 h-10 bg-theme-yellow border-[3px] border-on-surface flex items-center justify-center">
                        <span className="material-symbols-outlined font-bold">arrow_forward</span>
                    </div>
                    <div className="w-10 h-10 bg-[#1a4a4f] border-[3px] border-on-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-surface-container-lowest font-bold">star</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
