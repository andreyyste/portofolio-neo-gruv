import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button 
            className={`font-label-bold text-label-bold uppercase transition-all flex items-center justify-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};