import React from 'react';

interface TitleProps {
    prefix: React.ReactNode;
    highlight: string;
    highlightColorClass: string;
    highlightRotateClass?: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title: React.FC<TitleProps> = ({
    prefix,
    highlight,
    highlightColorClass,
    highlightRotateClass = 'rotate-2',
    className = 'font-display-2xl text-[64px] md:text-[96px] uppercase tracking-tighter text-on-surface leading-none',
    as: Tag = 'h2'
}) => {
    return (
        <Tag className={className}>
            {prefix}
            <span className={`${highlightColorClass} px-4 neo-border inline-block ${highlightRotateClass} animate-float`}>
                {highlight}
            </span>
        </Tag>
    );
};
