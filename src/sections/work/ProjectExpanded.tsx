import React from 'react';
import type { Project } from '../../data';

interface ProjectExpandedProps {
    project: Project;
    index: number;
    total: number;
    onClose: () => void;
}

export const ProjectExpanded: React.FC<ProjectExpandedProps> = ({
    project,
    index,
    total,
    onClose,
}) => {
    return (
        <div className="animate-[expandCardIn_0.5s_ease-out_both]">
            <div className="relative">
                {/* Neo shadow behind expanded card */}
                <div className="absolute inset-0 neo-border-heavy translate-x-4 translate-y-4 z-0 bg-theme-yellow" />

                {/* Expanded card */}
                <div className="relative z-10 neo-border-heavy border-[6px] bg-surface overflow-hidden">
                    {/* Close button — top right */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 w-12 h-12 bg-on-surface text-surface neo-border flex items-center justify-center shadow-[3px_3px_0px_0px_#1e1b19] hover:bg-secondary hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
                        aria-label="Collapse project"
                    >
                        <span className="material-symbols-outlined text-xl font-bold">close</span>
                    </button>

                    <div className="flex flex-col md:flex-row">
                        {/* Image — left side */}
                        <div className="md:w-1/2 h-72 md:h-auto md:min-h-[480px] overflow-hidden border-b-[6px] md:border-b-0 md:border-r-[6px] border-on-surface relative">
                            <img
                                alt={project.image.alt}
                                className="w-full h-full object-cover"
                                src={project.image.src}
                            />
                        </div>

                        {/* Content — right side */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-surface">
                            <div>
                                {/* Tags */}
                                <div className="flex gap-2 mb-6">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-4 py-1.5 neo-border border-[3px] text-xs font-label-bold uppercase bg-on-surface text-surface"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="font-headline-lg-mobile text-[48px] md:text-[64px] leading-none font-bold uppercase mb-6 text-on-surface">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <div className="border-t-[4px] border-on-surface pt-6">
                                    <p className="font-body-lg text-on-surface-variant leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Project number label */}
                                <div className="mt-8 inline-block">
                                    <span className="font-label-bold text-xs uppercase bg-surface-dim px-3 py-1.5 neo-border border-[3px] text-on-surface-variant">
                                        Project {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>

                            {/* View → button at bottom right */}
                            <div className="flex justify-end mt-10">
                                <a
                                    href={project.link}
                                    className="font-label-bold uppercase text-sm bg-theme-yellow text-on-surface px-6 py-3 neo-border shadow-[4px_4px_0px_0px_#1e1b19] hover:bg-theme-blue hover:text-surface-container-lowest hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:bg-theme-green transition-all duration-200 inline-flex items-center gap-3"
                                >
                                    View <span className="text-xl leading-none">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
