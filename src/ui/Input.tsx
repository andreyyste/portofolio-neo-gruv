import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    focusColorClass?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', focusColorClass = 'focus:bg-theme-red', ...props }) => {
    return (
        <input 
            className={`w-full bg-surface text-on-surface placeholder:text-on-surface-variant font-label-bold text-lg p-6 neo-border-heavy focus:ring-0 focus:outline-none focus:text-surface-container-lowest focus:-translate-y-1 focus:shadow-[8px_8px_0px_0px_#1e1b19] transition-all duration-300 shadow-[4px_4px_0px_0px_#1e1b19] ${focusColorClass} ${className}`} 
            {...props} 
        />
    );
};
