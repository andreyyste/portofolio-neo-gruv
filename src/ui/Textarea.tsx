import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    focusColorClass?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ className = '', focusColorClass = 'focus:bg-theme-green', ...props }) => {
    return (
        <textarea 
            className={`w-full bg-surface text-on-surface placeholder:text-on-surface-variant font-label-bold text-lg p-6 neo-border-heavy focus:ring-0 focus:outline-none focus:text-surface-container-lowest focus:-translate-y-1 focus:shadow-[8px_8px_0px_0px_#1e1b19] transition-all duration-300 shadow-[4px_4px_0px_0px_#1e1b19] min-h-[150px] ${focusColorClass} ${className}`} 
            {...props} 
        ></textarea>
    );
};
