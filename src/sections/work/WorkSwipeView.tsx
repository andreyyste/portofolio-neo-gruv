"use client";
 
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Project } from '../../types';
import { formatImageUrl } from '../../utils/image';
 
const TAG_COLORS = [
    'bg-theme-red text-surface-container-lowest',
    'bg-theme-blue text-surface-container-lowest',
    'bg-theme-green text-on-surface',
    'bg-theme-yellow text-on-surface'
];
 
interface WorkSwipeViewProps {
    projectsData: Project[];
    isSectionVisible: boolean;
    showAll: boolean;
    expandedIndex: number | null;
    setExpandedIndex: (index: number | null) => void;
}
 
export const WorkSwipeView: React.FC<WorkSwipeViewProps> = ({
    projectsData,
    isSectionVisible,
    showAll,
    expandedIndex,
    setExpandedIndex,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
 
    // Touch/Mouse drag state
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const wasDraggingRef = useRef(false);
 
    // Measured dimensions for precise translation centering
    const [dimensions, setDimensions] = useState({ containerWidth: 0, cardWidth: 0 });
 
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const firstCard = containerRef.current.firstElementChild as HTMLElement;
                const cardWidth = firstCard ? firstCard.offsetWidth : 0;
                setDimensions({ containerWidth, cardWidth });
            }
        };
 
        // Run after component mount/render
        const timer = setTimeout(handleResize, 150);
        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [projectsData.length, showAll]);
 
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
        setIsDragging(true);
        wasDraggingRef.current = false;
    };
 
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const current = e.touches[0].clientX;
        setCurrentX(current);
        const diff = current - startX;
        
        if (Math.abs(diff) > 8) {
            wasDraggingRef.current = true;
        }
 
        // Apply rubber-banding at boundaries
        let finalDiff = diff;
        if (activeIndex === 0 && diff > 0) {
            finalDiff = diff * 0.35;
        } else if (activeIndex === projectsData.length - 1 && diff < 0) {
            finalDiff = diff * 0.35;
        }
        setDragOffset(finalDiff);
    };
 
    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
 
        const diff = currentX - startX;
        const threshold = 40; // minimum drag distance to switch cards
 
        if (diff < -threshold && activeIndex < projectsData.length - 1) {
            setActiveIndex(prev => prev + 1);
        } else if (diff > threshold && activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
        }
 
        setDragOffset(0);
    };
 
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // only left click drag
        setStartX(e.clientX);
        setCurrentX(e.clientX);
        setIsDragging(true);
        wasDraggingRef.current = false;
    };
 
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const current = e.clientX;
        setCurrentX(current);
        const diff = current - startX;
 
        if (Math.abs(diff) > 8) {
            wasDraggingRef.current = true;
        }
 
        let finalDiff = diff;
        if (activeIndex === 0 && diff > 0) {
            finalDiff = diff * 0.35;
        } else if (activeIndex === projectsData.length - 1 && diff < 0) {
            finalDiff = diff * 0.35;
        }
        setDragOffset(finalDiff);
    };
 
    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
 
        const diff = currentX - startX;
        const threshold = 40;
 
        if (diff < -threshold && activeIndex < projectsData.length - 1) {
            setActiveIndex(prev => prev + 1);
        } else if (diff > threshold && activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
        }
 
        setDragOffset(0);
    };
 
    const handleCardAction = (e: React.MouseEvent, action: () => void) => {
        if (wasDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        action();
    };
 
    const { containerWidth, cardWidth } = dimensions;
    const gap = 16; // gap-4 spacing is 16px
    const centerOffset = containerWidth && cardWidth ? (containerWidth - cardWidth) / 2 : 24;
    const translateX = centerOffset - activeIndex * (cardWidth + gap) + dragOffset;
 
    return (
        <div
            className={[
                'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform w-full overflow-hidden',
                !showAll && expandedIndex === null
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto relative z-10'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute inset-x-0 top-0 z-0 invisible'
            ].join(' ')}
        >
            {/* Scroll container track */}
            <div className="w-full overflow-hidden select-none touch-pan-y">
                <div
                    ref={containerRef}
                    className={`flex gap-4 py-8 w-full cursor-grab active:cursor-grabbing ${
                        isDragging ? 'transition-none' : 'transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'
                    }`}
                    style={{
                        transform: `translateX(${translateX}px)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {projectsData.map((project, index) => (
                        <SwipeCard
                            key={index}
                            project={project}
                            index={index}
                            isActive={index === activeIndex}
                            isSectionVisible={isSectionVisible}
                            onExpand={(e) => handleCardAction(e, () => setExpandedIndex(index))}
                            onAction={handleCardAction}
                        />
                    ))}
                </div>
            </div>
 
            {/* Dot indicators */}
            <div className="flex justify-center gap-3 mt-4 relative z-30">
                {projectsData.map((_, index) => (
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
    );
};
 
interface SwipeCardProps {
    project: Project;
    index: number;
    isActive: boolean;
    isSectionVisible: boolean;
    onExpand: (e: React.MouseEvent) => void;
    onAction: (e: React.MouseEvent, action: () => void) => void;
}
 
const SwipeCard: React.FC<SwipeCardProps> = ({
    project,
    index,
    isActive,
    isSectionVisible,
    onExpand,
    onAction,
}) => {
    const imageSrc = formatImageUrl(project.coverImage || project.image?.src || '');
 
    return (
        <div
            data-card-index={index}
            className="flex-shrink-0 w-[85vw] max-w-[340px] relative transition-transform duration-300"
        >
            <div className="group relative w-full pointer-events-auto">
                {/* Neo shadow behind card */}
                <div
                    className={[
                        'absolute inset-0 neo-border md:neo-border-heavy translate-x-2 translate-y-2 z-0 transition-all duration-300',
                        isActive ? 'bg-theme-yellow' : 'bg-on-surface/30',
                    ].join(' ')}
                />
                {/* Card Body */}
                <div
                    className={[
                        'relative z-10 neo-border md:neo-border-heavy overflow-hidden flex flex-col transition-all duration-300',
                        isActive ? 'bg-theme-grey animate-float-vertical' : 'bg-surface-dim',
                    ].join(' ')}
                >
                    {project.featured && (
                        <div className="absolute top-3 left-3 z-20 font-label-bold text-[10px] uppercase bg-theme-red text-surface-container-lowest px-2 py-0.5 neo-border border-[3px] shadow-[2px_2px_0px_0px_#1e1b19]">
                            Featured
                        </div>
                    )}
                    {/* Image */}
                    {imageSrc && (
                        <div className="h-40 overflow-hidden border-b-[4px] border-on-surface relative pointer-events-none">
                            <img
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-700"
                                src={imageSrc}
                                draggable="false"
                            />
                        </div>
                    )}
                    {/* Content */}
                    <div
                        className={[
                            'p-4 flex-grow flex flex-col justify-between transition-all duration-300',
                            isActive ? 'bg-surface' : 'bg-surface-dim',
                        ].join(' ')}
                    >
                        <div>
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {project.tags.slice(0, 2).map((tag, tagIndex) => {
                                    const colorClass = TAG_COLORS[tagIndex % TAG_COLORS.length];
                                    return (
                                        <span
                                            key={tagIndex}
                                            className={[
                                                'px-2 py-0.5 neo-border border-[2px] text-[10px] font-label-bold uppercase',
                                                isActive ? colorClass : 'bg-on-surface/20 text-on-surface/50',
                                            ].join(' ')}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                                {project.tags.length > 2 && (
                                    <span
                                        className={[
                                            'px-2 py-0.5 neo-border border-[2px] text-[10px] font-label-bold uppercase',
                                            isActive ? 'bg-surface-variant text-on-surface' : 'bg-on-surface/20 text-on-surface/50',
                                        ].join(' ')}
                                    >
                                        +{project.tags.length - 2}
                                    </span>
                                )}
                            </div>
                            <h3
                                className={[
                                    'font-display-2xl text-xl leading-tight font-extrabold uppercase mb-2',
                                    isActive ? 'text-on-surface' : 'text-on-surface/50',
                                ].join(' ')}
                            >
                                {project.title}
                            </h3>
                            <p
                                className={[
                                    'font-body-md font-bold border-t-[2px] border-on-surface pt-2 mt-1 transition-colors duration-300',
                                    isActive ? 'text-on-surface-variant' : 'text-on-surface-variant/50',
                                ].join(' ')}
                            >
                                {project.brief}
                            </p>
                        </div>
 
                        {/* Action buttons (only active card) */}
                        {isActive && (
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={onExpand}
                                    className="h-10 flex-1 font-label-bold uppercase text-[10px] bg-theme-yellow text-on-surface px-2 neo-border shadow-[2px_2px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 inline-flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_full</span>
                                    Details
                                </button>
                                
                                {project.hasSourceCode && project.githubRepo && (
                                    <Link
                                        href={`/source-code/${project.githubRepo}`}
                                        className="h-10 w-10 flex-shrink-0 bg-on-surface text-surface neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                                        title="Source Code"
                                        onClick={(e) => onAction(e, () => {})}
                                    >
                                        <span className="material-symbols-outlined text-base">code</span>
                                    </Link>
                                )}
 
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 flex-1 font-label-bold uppercase text-[10px] bg-theme-blue text-surface px-2 neo-border shadow-[2px_2px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 inline-flex items-center justify-center gap-1"
                                        title="Live Demo"
                                        onClick={(e) => onAction(e, () => {})}
                                    >
                                        <span className="material-symbols-outlined text-sm">public</span>
                                        Demo
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
