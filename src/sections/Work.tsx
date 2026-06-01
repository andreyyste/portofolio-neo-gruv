import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Title } from '../ui/Title';
import { useData } from '../context/DataContext';
import { ProjectExpanded } from './work/ProjectExpanded';
import { WorkGridView } from './work/WorkGridView';
import { WorkCarouselView } from './work/WorkCarouselView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { WorkSwipeView } from './work/WorkSwipeView';

const projectsSectionData = {
  headline: { prefix: 'SELECTED', highlight: 'WORKS' },
  buttonText: 'ALL PROJECTS',
  mobileHeadline: { prefix: 'COLLECTION', highlight: 'ARCHIVES' }
};

const TAG_COLORS = [
  'bg-theme-red text-surface-container-lowest',
  'bg-theme-blue text-surface-container-lowest',
  'bg-theme-green text-on-surface',
  'bg-theme-yellow text-on-surface'
];

export const Work: React.FC = () => {
  const { projectsData } = useData();
  const total = projectsData.length;
  const isMobile = useMediaQuery('(max-width: 768px)');
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

  const expandedProject = expandedIndex !== null ? projectsData[expandedIndex] : null;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-gutter bg-surface neo-section-divider w-full overflow-hidden" id="work">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b-[8px] border-on-surface pb-4 gap-6">
          <div className="reveal-left">
            <Title 
              prefix={<>{projectsSectionData.headline.prefix}<br/></>}
              highlight={projectsSectionData.headline.highlight}
              highlightColorClass="bg-theme-green text-surface-container-lowest"
            />
          </div>
          <div className="reveal-right self-stretch sm:self-auto flex sm:block justify-end">
            <Button 
              onClick={() => setShowAll(!showAll)}
              className="bg-on-surface text-surface px-6 py-4 neo-border-heavy neo-shadow-sm hover:bg-theme-blue hover:text-surface-container-lowest hover:scale-105 hover:-translate-y-1 duration-300 mb-2 w-full sm:w-auto"
            >
              {showAll ? 'BACK TO SLIDES' : projectsSectionData.buttonText}
            </Button>
          </div>
        </div>

        {/* Content views wrapper */}
        <div className="relative w-full reveal-bottom" style={{ transitionDelay: '0.2s' }}>
          {/* Grid View */}
          <WorkGridView
            projectsData={projectsData}
            isSectionVisible={isSectionVisible}
            showAll={showAll}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
            tagColors={TAG_COLORS}
          />

          {/* Carousel / Swipe View */}
          {isMobile ? (
            <WorkSwipeView
              projectsData={projectsData}
              isSectionVisible={isSectionVisible}
              showAll={showAll}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          ) : (
            <WorkCarouselView
              projectsData={projectsData}
              isSectionVisible={isSectionVisible}
              showAll={showAll}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          )}
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