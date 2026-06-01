import React from 'react';
import { useData } from '../context/DataContext';

export const Marquee: React.FC = () => {
    const { marqueeItems } = useData();
    // Repeat items enough times to fill ultra-wide screens
    const repeatedItems = Array.from({ length: 10 }).flatMap(() => marqueeItems);

    return (
        <div className="relative w-full z-[100] h-0 select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] overflow-hidden bg-on-surface text-surface py-4 neo-border-heavy rotate-[-1deg] hover:scale-105 transition-transform duration-500">
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
        </div>
    );
};