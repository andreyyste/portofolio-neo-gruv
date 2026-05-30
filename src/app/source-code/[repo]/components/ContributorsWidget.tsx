"use client";

import React, { useState } from 'react';

interface Contributor {
  id: string;
  name: string;
  username: string;
  role: string;
  avatarChar: string;
  bgColor: string;
  commits: number;
  bio: string;
}

export const ContributorsWidget: React.FC = () => {
  const [activeContributor, setActiveContributor] = useState<Contributor | null>(null);

  const contributors: Contributor[] = [
    {
      id: 'andrey',
      name: 'Andre Christian',
      username: 'andreyyste',
      role: 'Lead Developer & Architect',
      avatarChar: 'A',
      bgColor: 'bg-theme-yellow text-on-surface border-[#cacd39]',
      commits: 135,
      bio: 'Crafting brutalist web interfaces and optimizing full-stack performance pipelines.'
    },
    {
      id: 'antigravity',
      name: 'Antigravity',
      username: 'antigravity-ai',
      role: 'AI Pair Programmer',
      avatarChar: 'AG',
      bgColor: 'bg-theme-blue text-white border-theme-blue',
      commits: 18,
      bio: 'DeepMind AI agent pair-programming codebases with laser-focused architectural alignment.'
    },
    {
      id: 'brutalist-bot',
      name: 'Brutalist Bot',
      username: 'brutalist-bot',
      role: 'Automated CI/CD Quality Enforcer',
      avatarChar: 'BB',
      bgColor: 'bg-theme-green text-on-surface border-theme-green',
      commits: 3,
      bio: 'Continuous integration agent rejecting soft gradients and enforcing high-contrast borders.'
    }
  ];

  return (
    <div className="bg-white p-6 border-[4px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] relative">
      <div className="flex justify-between items-center mb-4 border-b-2 border-on-surface pb-1">
        <h3 className="font-display-xl text-lg font-bold uppercase text-on-surface">Contributors</h3>
        <span className="bg-white text-on-surface text-[10px] px-2 py-0.5 border-[2.5px] border-on-surface font-extrabold rounded-full">
          {contributors.length}
        </span>
      </div>
      
      {/* Avatars row */}
      <div className="flex gap-2.5">
        {contributors.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveContributor(c)}
            className={`w-9 h-9 rounded-full ${c.bgColor} border-[2px] border-on-surface flex items-center justify-center font-bold text-xs select-none shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer`}
            title={`${c.name} (${c.role})`}
          >
            {c.avatarChar}
          </button>
        ))}
      </div>

      {/* Profile Card Popover */}
      {activeContributor && (
        <div className="absolute top-[85px] left-4 right-4 z-30 bg-[#f4ece9] border-[3px] border-on-surface p-4 shadow-[4px_4px_0px_0px_#1e1b19] animate-fadeIn">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-xs text-on-surface uppercase font-display-xl">
                {activeContributor.name}
              </h4>
              <span className="text-[10px] font-mono text-theme-blue font-bold">
                @{activeContributor.username}
              </span>
            </div>
            <button
              onClick={() => setActiveContributor(null)}
              className="text-[10px] font-mono uppercase bg-white border-[1.5px] border-on-surface px-1.5 py-0.5 cursor-pointer hover:bg-theme-grey"
            >
              close
            </button>
          </div>
          
          <div className="flex flex-col gap-1.5 text-[11px] font-bold text-on-surface-variant font-mono">
            <div>
              <span className="text-on-surface font-extrabold uppercase text-[10px]">Role:</span> {activeContributor.role}
            </div>
            <div>
              <span className="text-on-surface font-extrabold uppercase text-[10px]">Commits:</span> {activeContributor.commits}
            </div>
            <p className="text-[10px] italic font-semibold border-t border-on-surface/10 pt-1.5 mt-1 text-on-surface/75">
              "{activeContributor.bio}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
