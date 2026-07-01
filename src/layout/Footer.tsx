"use client";

import React from 'react';
import { useData } from '../context/DataContext';

export const Footer: React.FC = () => {
    const { footerData } = useData();
    const { brandName, socials, copyright } = footerData;

    return (
        <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] w-full px-4 md:px-gutter py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 reveal-section">
                <div className="font-display-2xl text-[36px] sm:text-[48px] md:text-display-2xl text-theme-yellow leading-none tracking-tighter uppercase hover:scale-105 transition-transform duration-300 cursor-pointer">
                    {brandName}
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                    {socials.map((social) => (
                        <a key={social.label} className={`text-[var(--footer-text)] font-label-bold text-label-bold uppercase ${social.hoverColor} hover:-translate-y-1 transition-all px-3 py-1 border-2 border-transparent ${social.hoverBorder}`} href={social.href}>{social.label}</a>
                    ))}
                </div>
                <div className="font-label-bold text-label-bold uppercase text-surface-variant text-center md:text-right bg-on-surface-variant px-4 py-2 neo-border border-[var(--footer-text)] hover:bg-[var(--footer-text)] hover:text-[var(--footer-bg)] transition-colors cursor-pointer">
                    {copyright}
                </div>
            </div>
        </footer>
    );
};