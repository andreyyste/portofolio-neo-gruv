"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { useData } from '../context/DataContext';

export const Navbar: React.FC = () => {
    const pathname = usePathname();
    const isSourceCode = pathname?.startsWith('/source-code/');
    
    // Extract repo name if in source code
    let repoName = '';
    if (isSourceCode && pathname) {
        const segments = pathname.split('/');
        if (segments.length > 2) {
            repoName = segments[2];
        }
    }

    const [floating, setFloating] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { navigationData, marqueeItems } = useData();
    const { brandName, navLinks, ctaText } = navigationData;

    useEffect(() => {
        const onScroll = () => setFloating(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

    const handleMobileNav = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = id.startsWith('#') ? document.getElementById(id.substring(1)) : document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isSourceCode) {
        return (
            <nav
                className={[
                    'sticky top-0 z-[110] flex justify-between items-center px-gutter text-primary',
                    'transition-all duration-300 ease-in-out',
                    floating
                        ? 'mx-4 mt-5 h-16 rounded-2xl border-[3px] border-on-surface bg-background/90 backdrop-blur-md shadow-[4px_4px_0px_0px_#1e1b19]'
                        : 'w-full h-24 border-b-[4px] border-on-surface bg-background shadow-[8px_8px_0px_0px_#1e1b19]',
                ].join(' ')}
            >
                <div 
                    onClick={() => window.location.href = '/'}
                    className={[
                        'font-display-2xl font-extrabold uppercase tracking-tighter text-on-surface transition-all duration-300 relative z-[120] cursor-pointer',
                        floating ? 'text-[24px]' : 'text-[32px]',
                    ].join(' ')}
                >
                    {brandName}
                </div>
                <div className="flex items-center gap-3 md:gap-4 z-[120]">
                    <Button 
                        onClick={() => window.location.href = '/'}
                        className="bg-surface text-on-surface neo-border neo-shadow px-3 py-1.5 text-xs md:text-sm md:px-6 md:py-2 hover:bg-theme-red hover:text-surface-container-lowest hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19]"
                    >
                        BACK TO PORTFOLIO
                    </Button>
                    <Button 
                        onClick={() => window.open(`https://github.com/andreyyste/${repoName}`, '_blank')}
                        className="bg-theme-yellow text-on-surface neo-border neo-shadow px-3 py-1.5 text-xs md:text-sm md:px-6 md:py-2 hover:bg-theme-blue hover:text-surface-container-lowest hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19]"
                    >
                        OPEN ON GITHUB
                    </Button>
                </div>
            </nav>
        );
    }

    return (
        <>
            {/* Thin Black Marquee (Mobile Only) */}
            <div className="w-full overflow-hidden bg-on-surface text-surface py-2 border-b-[3px] border-on-surface md:hidden z-[115] relative">
                <div className="flex w-max animate-[marquee_200s_linear_infinite] font-label-bold text-[10px] uppercase whitespace-nowrap">
                    <div className="flex gap-8 pr-8">
                        {Array.from({ length: 5 }).flatMap(() => marqueeItems || []).map((item, i) => (
                            <span key={`g1-${i}`}>{item}</span>
                        ))}
                    </div>
                    <div className="flex gap-8 pr-8">
                        {Array.from({ length: 5 }).flatMap(() => marqueeItems || []).map((item, i) => (
                            <span key={`g2-${i}`}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            <nav
                className={[
                    'sticky top-0 z-[110] flex justify-between items-center px-gutter text-primary',
                    'transition-all duration-300 ease-in-out',
                    floating
                        ? 'mx-4 mt-5 h-16 rounded-2xl border-[3px] border-on-surface bg-background/90 backdrop-blur-md shadow-[4px_4px_0px_0px_#1e1b19]'
                        : 'w-full h-16 md:h-24 border-b-[4px] border-on-surface bg-background md:shadow-[8px_8px_0px_0px_#1e1b19]',
                ].join(' ')}
            >
                <div className={[
                    'font-display-2xl font-extrabold uppercase tracking-tighter text-on-surface transition-all duration-300 relative z-[120]',
                    floating ? 'text-[24px]' : 'text-[24px] md:text-[32px]',
                ].join(' ')}>
                    {brandName}
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {(navLinks || []).map((link) => (
                        <a key={link.href} className="text-on-surface font-label-bold text-label-bold uppercase hover:bg-theme-yellow hover:text-on-surface transition-colors duration-100 p-2 border-[4px] border-transparent hover:border-on-surface active:translate-x-1 active:translate-y-1" href={link.href}>{link.label}</a>
                    ))}
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <Button 
                        onClick={() => window.location.href = '/nre-masuk'}
                        className="bg-surface text-on-surface neo-border neo-shadow px-6 py-2 hover:bg-theme-red hover:text-surface-container-lowest hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19]"
                    >
                        LOGIN
                    </Button>
                    <Button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-theme-yellow text-on-surface neo-border neo-shadow px-6 py-2 hover:bg-theme-blue hover:text-surface-container-lowest hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19]"
                    >
                        {ctaText}
                    </Button>
                </div>
                <button 
                    className="md:hidden text-on-surface relative z-[120]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="material-symbols-outlined text-4xl">
                        {isMobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </nav>
 
            {/* Mobile Menu Overlay */}
            <div 
                className={[
                    'fixed inset-0 bg-theme-blue z-[105] flex flex-col justify-center items-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                ].join(' ')}
            >
                <div className="flex flex-col items-center gap-8 w-full px-8">
                    {(navLinks || []).map((link, index) => (
                        <button 
                            key={link.href} 
                            onClick={() => handleMobileNav(link.href)}
                            className="text-surface-container-lowest font-headline-lg-mobile text-[48px] uppercase font-bold hover:text-theme-yellow transition-colors duration-200"
                            style={{ 
                                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.4s ease-out'
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <Button 
                        onClick={() => handleMobileNav('contact')}
                        className="mt-8 bg-theme-yellow text-on-surface neo-border-heavy px-8 py-4 text-2xl uppercase w-full max-w-[280px]"
                        style={{ 
                            transitionDelay: isMobileMenuOpen ? `${navLinks.length * 100}ms` : '0ms',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease-out'
                        }}
                    >
                        {ctaText}
                    </Button>
                    <Button 
                        onClick={() => window.location.href = '/nre-masuk'}
                        className="mt-4 bg-transparent text-surface-container-lowest border-[4px] border-surface-container-lowest px-8 py-4 text-2xl uppercase w-full max-w-[280px] hover:bg-theme-red hover:border-theme-red transition-colors"
                        style={{ 
                            transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 100}ms` : '0ms',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease-out'
                        }}
                    >
                        LOGIN
                    </Button>
                </div>
            </div>
        </>
    );
};