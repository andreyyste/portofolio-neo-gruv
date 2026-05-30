import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Title } from '../ui/Title';
import { IconButton } from '../ui/IconButton';
import { useData } from '../context/DataContext';
import { formatImageUrl } from '../utils/image';
const projectsSectionData = { headline: { prefix: 'SELECTED', highlight: 'WORKS' }, buttonText: 'ALL PROJECTS', mobileHeadline: { prefix: 'COLLECTION', highlight: 'ARCHIVES' } };
import { ProjectCard } from './work/ProjectCard';
import { ProjectExpanded } from './work/ProjectExpanded';

const TAG_COLORS = [
    'bg-theme-red text-surface-container-lowest',
    'bg-theme-blue text-surface-container-lowest',
    'bg-theme-green text-on-surface',
    'bg-theme-yellow text-on-surface'
];

export const Work: React.FC = () => {
    const { projectsData } = useData();
    const total = projectsData.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    const sectionRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSectionVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    /**
     * Navigates to the next project in the carousel loop.
     */
    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    /**
     * Navigates to the previous project in the carousel loop.
     */
    const goPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    /** 
     * Calculates the offset distance from the currently active card.
     * This creates an infinite loop illusion by picking the shortest path.
     * 
     * @param index - The index of the card to calculate the offset for.
     * @returns The offset from the active card: -1 = left, 0 = center, 1 = right, etc.
     */
    const getOffset = (index: number): number => {
        let diff = index - activeIndex;
        // Wrap to shortest path for cycle illusion
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    };

    const expandedProject = expandedIndex !== null ? projectsData[expandedIndex] : null;

    return (
        <section ref={sectionRef} className="py-24 px-gutter bg-surface neo-section-divider w-full overflow-hidden" id="work">
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b-[8px] border-on-surface pb-4">
                    <div className="reveal-left">
                        <Title 
                            prefix={<>{projectsSectionData.headline.prefix}<br/></>}
                            highlight={projectsSectionData.headline.highlight}
                            highlightColorClass="bg-theme-green text-surface-container-lowest"
                        />
                    </div>
                    <div className="reveal-right">
                        <Button 
                            onClick={() => setShowAll(!showAll)}
                            className="bg-on-surface text-surface px-6 py-4 neo-border-heavy neo-shadow-sm hover:bg-theme-blue hover:text-surface-container-lowest hover:scale-105 hover:-translate-y-1 duration-300 mb-2"
                        >
                            {showAll ? 'BACK TO SLIDES' : projectsSectionData.buttonText}
                        </Button>
                    </div>
                </div>

                {/* Content views wrapper */}
                <div className="relative w-full reveal-bottom" style={{ transitionDelay: '0.2s' }}>
                    {/* Grid View */}
                    <div
                        className={[
                            'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform',
                            showAll && expandedIndex === null
                                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto relative z-10'
                                : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute inset-x-0 top-0 z-0 invisible'
                        ].join(' ')}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-8">
                            {projectsData.map((project, index) => (
                                <div 
                                    key={index} 
                                    className={[
                                        'group relative w-full',
                                        index % 3 === 0 ? 'reveal-left' :
                                        index % 3 === 2 ? 'reveal-right' :
                                        'reveal-bottom',
                                        isSectionVisible ? 'reveal-visible' : ''
                                    ].join(' ')}
                                    style={{
                                        transitionDelay: `${(index % 3) * 0.15}s`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-theme-yellow neo-border-heavy translate-x-3 translate-y-3 z-0" />
                                    <div className="relative z-10 neo-border-heavy overflow-hidden flex flex-col border-[6px] bg-surface min-h-[340px]">
                                        {/* Image */}
                                        {(project.coverImage || project.image?.src) && (
                                            <div className="h-40 overflow-hidden border-b-[6px] border-on-surface relative">
                                                <img alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={formatImageUrl(project.coverImage || project.image?.src || '')}/>
                                            </div>
                                        )}
                                        {/* Content */}
                                        <div className="p-5 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex gap-2 mb-4 flex-wrap">
                                                    {project.featured && (
                                                        <span className="px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase bg-theme-red text-surface-container-lowest">
                                                            Featured
                                                        </span>
                                                    )}
                                                    {project.tags.slice(0, 2).map((tag, tagIndex) => {
                                                        const colorClass = TAG_COLORS[tagIndex % TAG_COLORS.length];
                                                        return (
                                                            <span key={tagIndex} className={`px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase ${colorClass}`}>
                                                                {tag}
                                                                </span>
                                                        );
                                                    })}
                                                    {project.tags.length > 2 && (
                                                        <span className="px-3 py-1 neo-border border-[3px] text-xs font-label-bold uppercase bg-surface-variant text-on-surface">
                                                            +{project.tags.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-display-2xl text-[28px] leading-tight font-bold uppercase mb-2 text-on-surface">{project.title}</h3>
                                                <p className="font-body-md font-bold border-t-[3px] border-on-surface pt-3 mt-1.5 text-on-surface-variant line-clamp-3">{project.brief}</p>
                                            </div>
                                            <div className="flex gap-2 mt-5">
                                                <button
                                                    onClick={() => setExpandedIndex(index)}
                                                    className="font-label-bold uppercase text-xs bg-theme-yellow text-on-surface px-4 py-2.5 neo-border flex-grow shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 inline-flex items-center justify-center gap-1.5"
                                                >
                                                    <span className="material-symbols-outlined text-base leading-none">open_in_full</span>
                                                    Details
                                                </button>
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 bg-theme-blue text-surface neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                                                        title="Live Demo"
                                                    >
                                                        <span className="material-symbols-outlined text-base leading-none">public</span>
                                                    </a>
                                                )}
                                                {project.hasSourceCode && project.githubRepo && (
                                                    <Link
                                                        href={`/source-code/${project.githubRepo}`}
                                                        className="w-10 h-10 bg-on-surface text-surface neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                                                        title="Source Code"
                                                    >
                                                        <span className="material-symbols-outlined text-base leading-none">code</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel View */}
                    <div
                        className={[
                            'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform',
                            !showAll && expandedIndex === null
                                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto relative z-10'
                                : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute inset-x-0 top-0 z-0 invisible'
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
                                    const isVisible = Math.abs(offset) <= 2;

                                    return (
                                        <ProjectCard
                                            key={index}
                                            project={project}
                                            index={index}
                                            isActive={isActive}
                                            isVisible={isVisible}
                                            offset={offset}
                                            isRevealed={isSectionVisible}
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