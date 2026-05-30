import React from 'react';
import Link from 'next/link';
import { formatImageUrl } from '../../utils/image';

interface WorkGridViewProps {
  projectsData: any[];
  isSectionVisible: boolean;
  showAll: boolean;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  tagColors: string[];
}

export const WorkGridView: React.FC<WorkGridViewProps> = ({
  projectsData,
  isSectionVisible,
  showAll,
  expandedIndex,
  setExpandedIndex,
  tagColors,
}) => {
  return (
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
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 font-label-bold text-[10px] md:text-xs uppercase bg-theme-red text-surface-container-lowest px-3 py-1 neo-border border-[3px] shadow-[2px_2px_0px_0px_#1e1b19]">
                  Featured
                </div>
              )}
              {/* Image */}
              {(project.coverImage || project.image?.src) && (
                <div className="h-40 overflow-hidden border-b-[6px] border-on-surface relative">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={formatImageUrl(project.coverImage || project.image?.src || '')}
                  />
                </div>
              )}
              {/* Content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.tags.slice(0, 2).map((tag: string, tagIndex: number) => {
                      const colorClass = tagColors[tagIndex % tagColors.length];
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
