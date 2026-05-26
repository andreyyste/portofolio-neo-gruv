"use client";

import React from 'react';
import { Title } from '../../ui/Title';
import { logoutAction } from '../actions/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Configuration' },
    { href: '/dashboard/projects', label: 'Projects' },
    { href: '/dashboard/experiences', label: 'Experiences' },
    { href: '/dashboard/skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-theme-grey text-on-surface flex flex-col md:flex-row">
      <aside className="w-full md:w-64 lg:w-80 bg-surface neo-border-b-heavy md:neo-border-b-0 md:neo-border-r-heavy border-b-[6px] md:border-r-[6px] border-on-surface flex flex-col sticky top-0 md:h-screen z-20">
        <div className="p-6 neo-border-b-heavy border-b-[6px] border-on-surface flex md:block justify-between items-center">
          <Title 
            as="h2" 
            prefix="NRE " 
            highlight="ADMIN" 
            highlightColorClass="bg-theme-red text-surface" 
            highlightRotateClass="rotate-1"
            className="uppercase tracking-tighter m-0 text-[32px] font-display-2xl leading-none" 
          />
          {/* Mobile logout */}
          <form action={logoutAction} className="md:hidden">
            <button type="submit" className="font-label-bold text-xs uppercase bg-theme-red text-surface px-4 py-2 neo-border">
              Logout
            </button>
          </form>
        </div>
        
        <nav className="p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-label-bold uppercase px-4 py-3 neo-border transition-all whitespace-nowrap md:whitespace-normal ${
                  isActive ? 'bg-theme-yellow shadow-[4px_4px_0px_0px_#1e1b19] -translate-y-1' : 'bg-surface hover:bg-theme-grey'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto neo-border-t hidden md:block">
          <form action={logoutAction}>
            <button type="submit" className="w-full font-label-bold text-sm uppercase bg-theme-red text-surface px-6 py-4 neo-border hover:bg-on-surface hover:text-surface hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all cursor-pointer">
              Logout
            </button>
          </form>
        </div>
      </aside>
      
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
