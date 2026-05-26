import React from 'react';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
    index: number;
    isActive: boolean;
    isVisible: boolean;
    offset: number;
    onExpand: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    index,
    isActive,
    isVisible,
    offset,
    onExpand,
}) => {
    // Position: center card at 0%, side cards offset by ±105%
    const translateX = offset * 105;
    // Scale: center = 1, sides = 0.85
    const scale = isActive ? 1 : 0.85;
    // Opacity: visible cards only
    const opacity = isVisible ? 1 : 0;
    // Z-index: center on top
    const zIndex = isActive ? 20 : 10;

    return (
        <div
            className="absolute w-full max-w-[420px] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
            style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isVisible ? 'auto' : 'none',
            }}
        >
            <div className="group relative">
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
                            className={[
                                'w-full h-full object-cover transition-all duration-700',
                                isActive
                                    ? 'filter-none group-hover:scale-110'
                                    : 'grayscale contrast-75',
                            ].join(' ')}
                            src={project.image.src}
                        />
                    </div>
                    {/* Content */}
                    <div
                        className={[
                            'p-6 flex-grow flex flex-col justify-between transition-all duration-500',
                            isActive ? 'bg-surface' : 'bg-surface-dim',
                        ].join(' ')}
                    >
                        <div>
                            <div className="flex gap-2 mb-4">
                                {project.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className={[
                                            'px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase transition-colors duration-500',
                                            isActive
                                                ? 'bg-on-surface text-surface'
                                                : 'bg-on-surface/40 text-surface/80',
                                        ].join(' ')}
                                    >
                                        {tag}
                                    </span>
                                ))}
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
