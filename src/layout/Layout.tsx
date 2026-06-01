import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col relative w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-grow w-full mx-auto flex flex-col overflow-x-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
};