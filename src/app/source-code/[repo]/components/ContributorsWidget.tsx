"use client";

import React, { useState } from 'react';

interface ContributorRaw {
  username: string;
  avatarUrl: string;
  contributions: number;
}

interface ContributorsWidgetProps {
  contributors?: ContributorRaw[];
}

interface ContributorDetail {
  id: string;
  name: string;
  username: string;
  role: string;
  avatarUrl: string;
  avatarChar: string;
  bgColor: string;
  commits: number;
  bio: string;
}

export const ContributorsWidget: React.FC<ContributorsWidgetProps> = ({ contributors = [] }) => {
  const [activeContributor, setActiveContributor] = useState<ContributorDetail | null>(null);

  // Core static info mapping for known developers
  const developerProfiles: Record<string, { name: string; role: string; bio: string; bgColor: string }> = {
    andreyyste: {
      name: 'Andre Christian',
      role: 'Lead Developer & Architect',
      bgColor: 'bg-theme-yellow text-on-surface border-[#cacd39]',
      bio: 'Crafting brutalist web interfaces and optimizing full-stack performance pipelines.'
    },
    'antigravity-ai': {
      name: 'Antigravity',
      role: 'AI Pair Programmer',
      bgColor: 'bg-theme-blue text-white border-theme-blue',
      bio: 'DeepMind AI agent pair-programming codebases with laser-focused architectural alignment.'
    },
    'brutalist-bot': {
      name: 'Brutalist Bot',
      role: 'CI/CD Quality Enforcer',
      bgColor: 'bg-theme-green text-on-surface border-theme-green',
      bio: 'Continuous integration agent rejecting soft gradients and enforcing high-contrast borders.'
    }
  };

  // Fallback profiles if list is empty
  const fallbackContributors: ContributorDetail[] = [
    {
      id: 'andreyyste',
      name: 'Andre Christian',
      username: 'andreyyste',
      role: 'Lead Developer & Architect',
      avatarUrl: '',
      avatarChar: 'A',
      bgColor: 'bg-theme-yellow text-on-surface border-[#cacd39]',
      commits: 135,
      bio: 'Crafting brutalist web interfaces and optimizing full-stack performance pipelines.'
    },
    {
      id: 'antigravity-ai',
      name: 'Antigravity',
      username: 'antigravity-ai',
      role: 'AI Pair Programmer',
      avatarUrl: '',
      avatarChar: 'AG',
      bgColor: 'bg-theme-blue text-white border-theme-blue',
      commits: 18,
      bio: 'DeepMind AI agent pair-programming codebases with laser-focused architectural alignment.'
    },
    {
      id: 'brutalist-bot',
      name: 'Brutalist Bot',
      username: 'brutalist-bot',
      role: 'CI/CD Quality Enforcer',
      avatarUrl: '',
      avatarChar: 'BB',
      bgColor: 'bg-theme-green text-on-surface border-theme-green',
      commits: 3,
      bio: 'Continuous integration agent rejecting soft gradients and enforcing high-contrast borders.'
    }
  ];

  let activeList: ContributorDetail[] = [];
  if (contributors.length > 0) {
    activeList = contributors.map(c => {
      const knownProfile = developerProfiles[c.username.toLowerCase()];
      return {
        id: c.username,
        name: knownProfile?.name || c.username,
        username: c.username,
        role: knownProfile?.role || 'Contributor',
        avatarUrl: c.avatarUrl,
        avatarChar: c.username.substring(0, 2).toUpperCase(),
        bgColor: knownProfile?.bgColor || 'bg-white text-on-surface border-on-surface',
        commits: c.contributions,
        bio: knownProfile?.bio || 'Public contributor helping improve the repository.'
      };
    });
  } else {
    activeList = fallbackContributors;
  }

  return (
    <div className="bg-white p-6 border-[4px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] relative">
      <div className="flex justify-between items-center mb-4 border-b-2 border-on-surface pb-1">
        <h3 className="font-display-xl text-lg font-bold uppercase text-on-surface">Contributors</h3>
        <span className="bg-white text-on-surface text-[10px] px-2 py-0.5 border-[2.5px] border-on-surface font-extrabold rounded-full">
          {activeList.length}
        </span>
      </div>
      
      {/* Avatars row */}
      <div className="flex gap-2.5 flex-wrap">
        {activeList.slice(0, 6).map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveContributor(c)}
            className="w-9 h-9 rounded-full border-[2px] border-on-surface flex items-center justify-center font-bold text-xs select-none shadow-[2px_2px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer overflow-hidden bg-white"
            title={`${c.name} (${c.role})`}
          >
            {c.avatarUrl ? (
              <img src={c.avatarUrl} alt={c.username} className="w-full h-full object-cover" />
            ) : (
              <span className={`w-full h-full flex items-center justify-center ${c.bgColor}`}>{c.avatarChar}</span>
            )}
          </button>
        ))}
      </div>

      {/* Profile Card Popover */}
      {activeContributor && (
        <div className="absolute top-[85px] left-4 right-4 z-30 bg-[#f4ece9] border-[3px] border-on-surface p-4 shadow-[4px_4px_0px_0px_#1e1b19] animate-fadeIn">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              {activeContributor.avatarUrl && (
                <img src={activeContributor.avatarUrl} alt={activeContributor.username} className="w-7 h-7 rounded-full border border-on-surface shrink-0" />
              )}
              <div>
                <h4 className="font-bold text-xs text-on-surface uppercase font-display-xl leading-tight">
                  {activeContributor.name}
                </h4>
                <span className="text-[10px] font-mono text-theme-blue font-bold">
                  @{activeContributor.username}
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveContributor(null)}
              className="text-[10px] font-mono uppercase bg-white border-[1.5px] border-on-surface px-1.5 py-0.5 cursor-pointer hover:bg-theme-grey"
            >
              close
            </button>
          </div>
          
          <div className="flex flex-col gap-1.5 text-[11px] font-bold text-on-surface-variant font-mono border-t border-on-surface/10 pt-2">
            <div>
              <span className="text-on-surface font-extrabold uppercase text-[10px]">Role:</span> {activeContributor.role}
            </div>
            <div>
              <span className="text-on-surface font-extrabold uppercase text-[10px]">Commits:</span> {activeContributor.commits}
            </div>
            <p className="text-[10px] italic font-semibold pt-1 text-on-surface/75">
              "{activeContributor.bio}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
