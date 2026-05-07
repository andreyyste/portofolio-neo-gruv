import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    directionClass?: string; // e.g. -left-4 or -right-4
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, className = '', directionClass = '', ...props }) => {
    return (
        <button
            className={`absolute top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-on-surface text-surface neo-border-heavy flex items-center justify-center hover:bg-theme-yellow hover:text-on-surface active:translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_#1e1b19] active:shadow-none ${directionClass} ${className}`}
            {...props}
        >
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </button>
    );
};
