import React from 'react';
import { useData } from '../context/DataContext';

export const MobileFooter: React.FC = () => {
    const { footerData } = useData();
    const { socials } = footerData;
    return (
        <footer className="w-full bg-[#cc2929] px-4 py-16 flex flex-col items-center border-t-[6px] border-on-surface">
            <h2 className="font-display-2xl text-[40px] uppercase tracking-tighter text-[#f4f1ea] mb-8 font-extrabold text-center">
                {footerData.brandName}
            </h2>

            <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
                {socials.map((social, index) => (
                    <React.Fragment key={social.label}>
                        <a href={social.href} className="font-label-bold font-bold text-xs tracking-widest uppercase text-[#f4f1ea] hover:text-on-surface transition-colors">
                            {social.label}
                        </a>
                        {index < socials.length - 1 && (
                            <span className="text-[#f4f1ea] opacity-50">|</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <p className="font-label-bold text-[10px] text-[#f4f1ea] uppercase tracking-widest text-center opacity-80">
                {footerData.copyright}
            </p>
        </footer>
    );
};
