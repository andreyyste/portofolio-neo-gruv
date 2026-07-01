import React, { useState, useCallback, useMemo } from 'react';
import { IconButton } from '../../ui/IconButton';
import { ProjectCard } from './ProjectCard';
 
interface WorkCarouselViewProps {
  projectsData: any[];
  isSectionVisible: boolean;
  showAll: boolean;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  onShowAll: () => void;
}
 
export const WorkCarouselView: React.FC<WorkCarouselViewProps> = ({
  projectsData,
  isSectionVisible,
  showAll,
  expandedIndex,
  setExpandedIndex,
  onShowAll,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  // Limit to 4 projects and append the special "All Projects" card
  const carouselItems = useMemo(() => {
    const displayProjects = projectsData.slice(0, 4);
    return [
      ...displayProjects,
      {
        isAllProjectsCard: true,
        id: 'all-projects',
        title: 'All Projects',
        tags: [],
        brief: 'Explore the complete vault of web breakings, custom APIs, and source repositories.',
      },
    ];
  }, [projectsData]);
 
  const total = carouselItems.length;
 
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
   */
  const getOffset = (index: number): number => {
    let diff = index - activeIndex;
    // Wrap to shortest path for cycle illusion
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };
 
  return (
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
          {carouselItems.map((project, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
 
            return (
              <ProjectCard
                key={project.id || index}
                project={project}
                index={index}
                isActive={isActive}
                isVisible={isVisible}
                offset={offset}
                isRevealed={isSectionVisible}
                onExpand={project.isAllProjectsCard ? onShowAll : () => setExpandedIndex(index)}
              />
            );
          })}
        </div>
 
        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-12 relative z-30">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={[
                'w-4 h-4 border-[3px] border-on-surface transition-all duration-300',
                index === activeIndex
                  ? 'bg-theme-yellow scale-125 shadow-[2px_2px_0px_0px_var(--neo-border-color)]'
                  : 'bg-surface hover:bg-theme-yellow/50 hover:scale-110',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
