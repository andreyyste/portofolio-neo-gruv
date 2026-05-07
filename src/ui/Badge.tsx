import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    as?: 'span' | 'div';
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', style, as: Tag = 'div' }) => {
    return (
        <Tag className={`px-4 py-2 font-label-bold uppercase neo-border shadow-[4px_4px_0px_0px_#1e1b19] ${className}`} style={style}>
            {children}
        </Tag>
    );
};
