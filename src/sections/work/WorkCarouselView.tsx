import React, { useState, useCallback } from 'react';
import { IconButton } from '../../ui/IconButton';
import { ProjectCard } from './ProjectCard';

interface WorkCarouselViewProps {
  projectsData: any[];
  isSectionVisible: boolean;
  showAll: boolean;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

export const WorkCarouselView: React.FC<WorkCarouselViewProps> = ({
  projectsData,
  isSectionVisible,
  showAll,
  expandedIndex,
  setExpandedIndex,
}) => {
  const total = projectsData.length;
  const [activeIndex, setActiveIndex] = useState(0);

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
   * Mathematical explanation:
   * To achieve a smooth infinite cycling effect, we compute the distance between the
   * current project card index and the active index. If this distance exceeds half of
   * the total number of projects, it's shorter to loop around the end/start of the array.
   * Subtracting or adding the total shifts the coordinate space so that transition offsets
   * (e.g. from the last card to the first card) remain continuous and visual positioning
   * is seamless.
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
  );
};
