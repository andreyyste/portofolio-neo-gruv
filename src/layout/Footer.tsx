import React from 'react';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
    const { footerData } = useData();
    const { brandName, socials, copyright } = footerData;

    return (
        <footer className="bg-on-surface text-surface w-full px-gutter py-12">
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 reveal-section">
                <div className="font-display-2xl text-[64px] md:text-display-2xl text-theme-yellow leading-none tracking-tighter uppercase hover:scale-105 transition-transform duration-300 cursor-pointer">
                    {brandName}
                </div>
                <div className="flex gap-6">
                    {socials.map((social) => (
                        <a key={social.label} className={`text-surface font-label-bold text-label-bold uppercase ${social.hoverColor} hover:-translate-y-1 transition-all px-3 py-1 border-2 border-transparent ${social.hoverBorder}`} href={social.href}>{social.label}</a>
                    ))}
                </div>
                <div className="font-label-bold text-label-bold uppercase text-surface-variant text-center md:text-right bg-on-surface-variant px-4 py-2 neo-border border-surface hover:bg-surface hover:text-on-surface transition-colors cursor-pointer">
                    {copyright}
                </div>
            </div>
        </footer>
    );
};