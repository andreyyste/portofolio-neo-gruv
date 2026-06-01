import React from 'react';
import Link from 'next/link';
import type { Project } from '../../types';
import { formatImageUrl } from '../../utils/image';

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
    const imageSrc = formatImageUrl(project.coverImage || project.image?.src || '');
 
    if (project.isAllProjectsCard) {
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
                    {/* Card Body */}
                    <div
                        className={[
                            'relative z-10 neo-border-heavy overflow-hidden flex flex-col transition-all duration-500 h-[380px]',
                            isActive
                                ? 'bg-theme-blue text-surface-container-lowest animate-float-vertical'
                                : 'bg-surface-dim text-on-surface/50',
                        ].join(' ')}
                        style={isActive ? { animationDelay: `${index * 0.4}s` } : {}}
                    >
                        <div className="flex-grow flex flex-col justify-center items-center p-8 text-center">
                            <span className="material-symbols-outlined text-[64px] mb-4 animate-float text-theme-yellow">folder_open</span>
                            <h3 className="font-display-2xl text-[28px] uppercase font-bold tracking-tighter mb-2">
                                ALL PROJECTS
                            </h3>
                            <p className="font-body-md font-bold mb-6 text-sm max-w-[280px]">
                                Explore the complete vault of web breakings, custom APIs, and source repositories.
                            </p>
                            {isActive && (
                                <button
                                    onClick={onExpand}
                                    className="bg-theme-yellow text-on-surface font-label-bold uppercase px-6 py-3 neo-border border-[3px] shadow-[4px_4px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                                >
                                    SHOW ALL
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        'relative z-10 neo-border-heavy overflow-hidden flex flex-col transition-all duration-500',
                        isActive
                            ? 'bg-theme-grey animate-float-vertical'
                            : 'bg-surface-dim',
                    ].join(' ')}
                    style={isActive ? { animationDelay: `${index * 0.4}s` } : {}}
                >
                    {project.featured && (
                        <div className="absolute top-4 left-4 z-20 font-label-bold text-[10px] md:text-xs uppercase bg-theme-red text-surface-container-lowest px-3 py-1 neo-border border-[3px] shadow-[2px_2px_0px_0px_#1e1b19]">
                            Featured
                        </div>
                    )}
                    {/* Image */}
                    {imageSrc && (
                        <div className="h-40 overflow-hidden border-b-[6px] border-on-surface relative">
                            <div className="absolute inset-0 bg-on-surface opacity-0 group-hover:opacity-20 transition-opacity z-10 mix-blend-overlay" />
                            <img
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-700 filter-none group-hover:scale-110"
                                src={imageSrc}
                            />
                        </div>
                    )}
                    {/* Content */}
                    <div
                        className={[
                            'p-5 flex-grow flex flex-col justify-between transition-all duration-500',
                            isActive ? 'bg-surface' : 'bg-surface-dim',
                            Math.abs(offset) > 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        ].join(' ')}
                    >
                        <div>
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {project.tags.slice(0, 2).map((tag, tagIndex) => {
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
                                {project.tags.length > 2 && (
                                    <span
                                        className={[
                                            'px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase transition-colors duration-500',
                                            isActive
                                                ? 'bg-surface-variant text-on-surface'
                                                : 'bg-on-surface/20 text-on-surface/50',
                                        ].join(' ')}
                                    >
                                        +{project.tags.length - 2}
                                    </span>
                                )}
                            </div>
                            <h3
                                className={[
                                    'font-display-2xl text-2xl md:text-[28px] leading-tight font-extrabold uppercase mb-2 transition-colors duration-500',
                                    isActive ? 'text-on-surface' : 'text-on-surface/50',
                                ].join(' ')}
                            >
                                {project.title}
                            </h3>
                            <p
                                className={[
                                    'font-body-md font-bold border-t-[3px] border-on-surface pt-3 mt-1.5 transition-colors duration-500',
                                    isActive ? 'text-on-surface-variant' : 'text-on-surface-variant/50',
                                ].join(' ')}
                            >
                                {project.brief}
                            </p>
                        </div>

                        {/* Expand & Action buttons */}
                        {isActive && (
                            <div className="flex gap-2 mt-5">
                                <button
                                    onClick={onExpand}
                                    className="h-11 flex-1 font-label-bold uppercase text-[10px] md:text-xs bg-theme-yellow text-on-surface px-2 md:px-3 neo-border shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 inline-flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_full</span>
                                    Details
                                </button>
                                
                                {project.hasSourceCode && project.githubRepo && (
                                    <Link
                                        href={`/source-code/${project.githubRepo}`}
                                        className="h-11 w-11 flex-shrink-0 bg-on-surface text-surface neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                                        title="Source Code"
                                    >
                                        <span className="material-symbols-outlined text-base">code</span>
                                    </Link>
                                )}

                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-11 flex-1 font-label-bold uppercase text-[10px] md:text-xs bg-theme-blue text-surface px-2 md:px-3 neo-border shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 inline-flex items-center justify-center gap-1"
                                        title="Live Demo"
                                    >
                                        <span className="material-symbols-outlined text-sm">public</span>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
