import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const getOrderedLinks = (links: Array<{ label: string; href: string }>) => {
    if (!links || links.length === 0) return [];
    const skillsLink = links.find(l => l.label.toLowerCase() === 'skills' || l.href.toLowerCase().includes('skills'));
    if (!skillsLink) return links;

    const filtered = links.filter(l => l !== skillsLink);
    const expIdx = filtered.findIndex(l => l.label.toLowerCase() === 'experience' || l.href.toLowerCase().includes('experience'));
    const resumeIdx = filtered.findIndex(l => l.label.toLowerCase() === 'resume' || l.href.toLowerCase().includes('resume'));

    if (expIdx !== -1) {
        const res = [...filtered];
        res.splice(expIdx + 1, 0, skillsLink);
        return res;
    } else if (resumeIdx !== -1) {
        const res = [...filtered];
        res.splice(resumeIdx, 0, skillsLink);
        return res;
    }
    return links;
};

export const MobileHeader: React.FC = () => {
    const { navigationData, marqueeItems } = useData();
    const { brandName, navLinks, ctaText } = navigationData;
    const orderedNavLinks = getOrderedLinks(navLinks);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const repeatedItems = Array.from({ length: 5 }).flatMap(() => marqueeItems);

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

    return (
        <>
            <div className="w-full flex flex-col z-[110] relative">
                {/* Thin Black Marquee */}
                <div className="w-full overflow-hidden bg-on-surface text-surface py-2 neo-border-b">
                    <div className="flex w-max animate-[marquee_200s_linear_infinite] font-label-bold text-[10px] uppercase whitespace-nowrap">
                        <div className="flex gap-8 pr-8">
                            {repeatedItems.map((item, i) => (
                                <span key={`g1-${i}`}>{item}</span>
                            ))}
                        </div>
                        <div className="flex gap-8 pr-8">
                            {repeatedItems.map((item, i) => (
                                <span key={`g2-${i}`}>{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navbar */}
                <nav className="w-full h-16 bg-surface flex justify-between items-center px-4 border-b-[4px] border-on-surface">
                    <div className="font-display-2xl font-extrabold uppercase tracking-tighter text-on-surface text-[24px]">
                        {brandName}
                    </div>
                    <button 
                        className="text-on-surface relative z-[120]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={[
                    'fixed inset-0 bg-theme-blue z-[105] flex flex-col justify-center items-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                ].join(' ')}
            >
                <div className="flex flex-col items-center gap-8 w-full px-8 mt-16">
                    {orderedNavLinks.map((link, index) => (
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
                    <button 
                        onClick={() => handleMobileNav('contact')}
                        className="mt-8 bg-theme-yellow text-on-surface neo-border-heavy px-8 py-4 text-2xl uppercase w-full max-w-[280px] font-label-bold font-bold"
                        style={{ 
                            transitionDelay: isMobileMenuOpen ? `${orderedNavLinks.length * 100}ms` : '0ms',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease-out'
                        }}
                    >
                        LET'S TALK
                    </button>
                </div>
            </div>
        </>
    );
};
