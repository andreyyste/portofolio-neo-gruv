import React from 'react';
import { marqueeItems } from '../data';

export const Marquee: React.FC = () => {
    // Repeat items enough times to fill ultra-wide screens
    const repeatedItems = Array.from({ length: 10 }).flatMap(() => marqueeItems);

    return (
        <div className="translate-y-[175px] left-0 w-[110%] -ml-[5%] overflow-hidden bg-on-surface text-surface py-4 neo-border-heavy rotate-[-1deg] z-[100] hover:scale-105 transition-transform duration-500">
            <div className="flex w-max animate-[marquee_200s_linear_infinite] font-label-bold text-label-bold uppercase whitespace-nowrap">
                {/* Group 1 */}
                <div className="flex gap-12 pr-12">
                    {repeatedItems.map((item, i) => (
                        <span key={`g1-${i}`}>{item}</span>
                    ))}
                </div>
                {/* Group 2 (Exact Clone for seamless loop) */}
                <div className="flex gap-12 pr-12">
                    {repeatedItems.map((item, i) => (
                        <span key={`g2-${i}`}>{item}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};