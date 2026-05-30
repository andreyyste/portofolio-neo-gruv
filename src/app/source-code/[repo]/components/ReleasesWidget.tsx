"use client";

import React, { useState } from 'react';

interface Release {
  tagName: string;
  name: string;
  body: string;
  publishedAt: string;
}

interface ReleasesWidgetProps {
  releases?: Release[];
}

export const ReleasesWidget: React.FC<ReleasesWidgetProps> = ({ releases = [] }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [activeReleaseIndex, setActiveReleaseIndex] = useState<number | null>(null);

  // Fallback release if none are fetched from GitHub
  const fallbackReleases = [
    {
      tagName: 'v1.0.0-brutal',
      name: 'Initial Brutalist Release',
      body: "- Strict containment layout rules (0px border-radius)\n- Custom diagonal linear-gradient background patterns\n- Hard shadows (offset 4px/6px) with zero blur\n- Integrated simulated terminal for Heroku & Supabase deployments\n- Integrated interactive Shiki syntax highlighting code blocks",
      publishedAt: new Date().toISOString()
    }
  ];

  const activeReleases = releases.length > 0 ? releases : fallbackReleases;

  const handleToggle = (index: number) => {
    if (activeReleaseIndex === index && showNotes) {
      setShowNotes(false);
      setActiveReleaseIndex(null);
    } else {
      setActiveReleaseIndex(index);
      setShowNotes(true);
    }
  };

  return (
    <div className="bg-white p-6 border-[4px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] relative">
      <div className="flex justify-between items-center mb-3 border-b-2 border-on-surface pb-1">
        <h3 className="font-display-xl text-lg font-bold uppercase text-on-surface">Releases</h3>
        <span className="material-symbols-outlined text-base opacity-60">info</span>
      </div>
      
      <div className="flex flex-col gap-3.5">
        {activeReleases.slice(0, 3).map((rel, index) => (
          <div key={rel.tagName} className="flex items-start gap-2.5 text-xs font-bold border-b border-on-surface/5 last:border-0 pb-2 last:pb-0">
            <span className="material-symbols-outlined text-theme-red text-lg select-none">sell</span>
            <div className="flex flex-col">
              <button
                onClick={() => handleToggle(index)}
                className="text-theme-red uppercase font-extrabold hover:underline cursor-pointer text-left focus:outline-none"
              >
                {rel.tagName}
              </button>
              <span className="text-[10px] text-on-surface-variant opacity-60 mt-0.5">
                {index === 0 ? 'Latest' : rel.name || 'Release'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Release Notes Popover */}
      {showNotes && activeReleaseIndex !== null && (
        <div className="absolute top-[85px] left-4 right-4 z-30 bg-[#f4ece9] border-[3px] border-on-surface p-4 shadow-[4px_4px_0px_0px_#1e1b19] animate-fadeIn max-h-60 overflow-y-auto">
          <div className="flex justify-between items-start mb-2 border-b border-on-surface/10 pb-1">
            <h4 className="font-bold text-xs text-on-surface uppercase font-display-xl">
              {activeReleases[activeReleaseIndex].tagName} Details
            </h4>
            <button
              onClick={() => {
                setShowNotes(false);
                setActiveReleaseIndex(null);
              }}
              className="text-[10px] font-mono uppercase bg-white border-[1.5px] border-on-surface px-1.5 py-0.5 cursor-pointer hover:bg-theme-grey"
            >
              close
            </button>
          </div>
          
          <div className="text-[10px] font-bold text-on-surface-variant font-mono whitespace-pre-line leading-relaxed">
            {activeReleases[activeReleaseIndex].body || "No release description provided."}
          </div>
        </div>
      )}
    </div>
  );
};
