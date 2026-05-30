import React from 'react';
import type { Project } from '../../types';

const TAG_COLORS = [
    'bg-theme-red text-surface-container-lowest',
    'bg-theme-blue text-surface-container-lowest',
    'bg-theme-green text-on-surface',
    'bg-theme-yellow text-on-surface'
];

interface ProjectCardProps {
    project: Project;
    index: number;
    isActive: boolean;
    isVisible: boolean;
    offset: number;
    isRevealed?: boolean;
    onExpand: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    index,
    isActive,
    isVisible,
    offset,
    isRevealed = true,
    onExpand,
}) => {
    // Pseudo-3D mapping for carousel slots (-2, -1, 0, 1, 2)
    const getCardLayout = (off: number) => {
        switch (off) {
            case 0:
                return { x: 0, scale: 1, zIndex: 30, opacity: 1, blur: 'none' };
            case 1:
                return { x: 105, scale: 0.85, zIndex: 20, opacity: 0.9, blur: 'none' };
            case -1:
                return { x: -105, scale: 0.85, zIndex: 20, opacity: 0.9, blur: 'none' };
            case 2:
                return { x: 52.5, scale: 0.72, zIndex: 10, opacity: 0.45, blur: 'blur(1.5px)' };
            case -2:
                return { x: -52.5, scale: 0.72, zIndex: 10, opacity: 0.45, blur: 'blur(1.5px)' };
            default:
                return { x: off > 0 ? 120 : -120, scale: 0.5, zIndex: 5, opacity: 0, blur: 'blur(4px)' };
        }
    };

    const getRevealClass = (off: number) => {
        if (off < 0) return 'reveal-left';
        if (off > 0) return 'reveal-right';
        return 'reveal-bottom';
    };

    const getRevealDelay = (off: number) => {
        const abs = Math.abs(off);
        if (abs === 0) return '0.1s';
        if (abs === 1) return '0.25s';
        return '0.4s';
    };

    const layout = getCardLayout(offset);
    const revealClass = getRevealClass(offset);
    const revealDelay = getRevealDelay(offset);

    return (
        <div
            className="absolute w-full max-w-[420px] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
            style={{
                transform: `translateX(${layout.x}%) scale(${layout.scale})`,
                opacity: isVisible ? layout.opacity : 0,
                zIndex: layout.zIndex,
                filter: layout.blur === 'none' ? 'none' : layout.blur,
                pointerEvents: isActive ? 'auto' : 'none',
            }}
        >
            <div 
                className={[
                    'group relative',
                    revealClass,
                    isRevealed ? 'reveal-visible' : ''
                ].join(' ')}
                style={{ transitionDelay: revealDelay }}
            >
                {/* Neo shadow behind card */}
                <div
                    className={[
                        'absolute inset-0 neo-border-heavy translate-x-3 translate-y-3 z-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
                        isActive
                            ? 'bg-theme-yellow'
                            : 'bg-on-surface/30',
                    ].join(' ')}
                />
                {/* Card */}
                <div
                    className={[
                        'relative z-10 neo-border-heavy overflow-hidden flex flex-col border-[6px] transition-all duration-500',
                        isActive
                            ? 'bg-theme-grey animate-float-vertical'
                            : 'bg-surface-dim',
                    ].join(' ')}
                    style={isActive ? { animationDelay: `${index * 0.4}s` } : {}}
                >
                    {/* Image */}
                    <div className="h-64 overflow-hidden border-b-[6px] border-on-surface relative">
                        <div className="absolute inset-0 bg-on-surface opacity-0 group-hover:opacity-20 transition-opacity z-10 mix-blend-overlay" />
                        <img
                            alt={project.image.alt}
                            className="w-full h-full object-cover transition-all duration-700 filter-none group-hover:scale-110"
                            src={project.image.src}
                        />
                    </div>
                    {/* Content */}
                    <div
                        className={[
                            'p-6 flex-grow flex flex-col justify-between transition-all duration-500',
                            isActive ? 'bg-surface' : 'bg-surface-dim',
                            Math.abs(offset) > 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        ].join(' ')}
                    >
                        <div>
                            <div className="flex gap-2 mb-4">
                                {project.tags.map((tag, tagIndex) => {
                                    const colorClass = TAG_COLORS[tagIndex % TAG_COLORS.length];
                                    return (
                                        <span
                                            key={tagIndex}
                                            className={[
                                                'px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase transition-colors duration-500',
                                                isActive
                                                    ? colorClass
                                                    : 'bg-on-surface/20 text-on-surface/50',
                                            ].join(' ')}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>
                            <h3
                                className={[
                                    'font-headline-lg-mobile text-[40px] leading-tight font-bold uppercase mb-2 transition-colors duration-500',
                                    isActive ? 'text-on-surface' : 'text-on-surface/50',
                                ].join(' ')}
                            >
                                {project.title}
                            </h3>
                            <p
                                className={[
                                    'font-body-md font-bold border-t-[4px] border-on-surface pt-4 mt-2 transition-colors duration-500',
                                    isActive ? 'text-on-surface-variant' : 'text-on-surface-variant/50',
                                ].join(' ')}
                            >
                                {project.brief}
                            </p>
                        </div>

                        {/* Expand button */}
                        {isActive && (
                            <div className="flex justify-end mt-5">
                                <button
                                    onClick={onExpand}
                                    className="font-label-bold uppercase text-sm bg-theme-yellow text-on-surface px-5 py-2.5 neo-border border-[3px] shadow-[3px_3px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] active:bg-theme-green transition-all duration-200 inline-flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-lg leading-none">open_in_full</span>
                                    Expand
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
