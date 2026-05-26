import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Title } from '../ui/Title';
import { IconButton } from '../ui/IconButton';
import { projectsData, projectsSectionData } from '../data';
import { ProjectCard } from './work/ProjectCard';
import { ProjectExpanded } from './work/ProjectExpanded';

export const Work: React.FC = () => {
    const total = projectsData.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const goPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    /** Returns the offset from the active card: -1 = left, 0 = center, 1 = right, etc. */
    const getOffset = (index: number): number => {
        let diff = index - activeIndex;
        // Wrap to shortest path for cycle illusion
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    };

    const expandedProject = expandedIndex !== null ? projectsData[expandedIndex] : null;

    return (
        <section className="py-24 px-gutter bg-surface neo-section-divider reveal-section w-full overflow-hidden" id="work">
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b-[8px] border-on-surface pb-4">
                    <Title 
                        prefix={<>{projectsSectionData.headline.prefix}<br/></>}
                        highlight={projectsSectionData.headline.highlight}
                        highlightColorClass="bg-theme-green text-surface-container-lowest"
                    />
                    <Button className="bg-on-surface text-surface px-6 py-4 neo-border-heavy neo-shadow-sm hover:bg-theme-blue hover:text-surface-container-lowest hover:scale-105 hover:-translate-y-1 duration-300 mb-2">
                        {projectsSectionData.buttonText}
                    </Button>
                </div>

                {/* Carousel View */}
                <div
                    className={[
                        'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
                        expandedIndex !== null
                            ? 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
                            : 'max-h-[800px] opacity-100',
                    ].join(' ')}
                >
                    <div className="relative">
                        {/* Arrow Left */}
                        <IconButton
                            onClick={goPrev}
                            directionClass="left-0 md:-left-4 hover:-translate-x-1"
                            icon="arrow_back"
                        />

                        {/* Arrow Right */}
                        <IconButton
                            onClick={goNext}
                            directionClass="right-0 md:-right-4 hover:translate-x-1"
                            icon="arrow_forward"
                        />

                        {/* Cards track */}
                        <div className="flex items-center justify-center py-8 min-h-[520px] relative">
                            {projectsData.map((project, index) => {
                                const offset = getOffset(index);
                                const isActive = offset === 0;
                                const isVisible = Math.abs(offset) <= 1;

                                return (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        isActive={isActive}
                                        isVisible={isVisible}
                                        offset={offset}
                                        onExpand={() => setExpandedIndex(index)}
                                    />
                                );
                            })}
                        </div>

                        {/* Dot indicators */}
                        <div className="flex justify-center gap-3 mt-12 relative z-30">
                            {projectsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={[
                                        'w-4 h-4 neo-border border-[3px] transition-all duration-300',
                                        index === activeIndex
                                            ? 'bg-theme-yellow scale-125 shadow-[2px_2px_0px_0px_#1e1b19]'
                                            : 'bg-surface hover:bg-theme-yellow/50 hover:scale-110',
                                    ].join(' ')}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Expanded Single Project View */}
                {expandedProject && expandedIndex !== null && (
                    <ProjectExpanded
                        project={expandedProject}
                        index={expandedIndex}
                        total={total}
                        onClose={() => setExpandedIndex(null)}
                    />
                )}
            </div>
        </section>
    );
};