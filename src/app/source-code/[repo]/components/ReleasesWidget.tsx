"use client";

import React, { useState } from 'react';

export const ReleasesWidget: React.FC = () => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="bg-white p-6 border-[4px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] relative">
      <div className="flex justify-between items-center mb-3 border-b-2 border-on-surface pb-1">
        <h3 className="font-display-xl text-lg font-bold uppercase text-on-surface">Releases</h3>
        <span className="material-symbols-outlined text-base opacity-60">info</span>
      </div>
      
      <div className="flex items-start gap-2.5 text-xs font-bold">
        <span className="material-symbols-outlined text-theme-red text-lg select-none">sell</span>
        <div className="flex flex-col">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-theme-red uppercase font-extrabold hover:underline cursor-pointer text-left focus:outline-none"
          >
            v1.0.0-brutal
          </button>
          <span className="text-[10px] text-on-surface-variant opacity-60 mt-0.5">Latest</span>
        </div>
      </div>

      {/* Release Notes Popover */}
      {showNotes && (
        <div className="absolute top-[85px] left-4 right-4 z-30 bg-[#f4ece9] border-[3px] border-on-surface p-4 shadow-[4px_4px_0px_0px_#1e1b19] animate-fadeIn">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-xs text-on-surface uppercase font-display-xl">
              v1.0.0-brutal Release Notes
            </h4>
            <button
              onClick={() => setShowNotes(false)}
              className="text-[10px] font-mono uppercase bg-white border-[1.5px] border-on-surface px-1.5 py-0.5 cursor-pointer hover:bg-theme-grey"
            >
              close
            </button>
          </div>
          
          <ul className="list-disc pl-4 text-[10px] font-bold text-on-surface-variant font-mono flex flex-col gap-1">
            <li>Strict containment layout rules (0px border-radius)</li>
            <li>Custom diagonal linear-gradient background patterns</li>
            <li>Hard shadows (offset 4px/6px) with zero blur</li>
            <li>Integrated simulated terminal for Heroku & Supabase deployments</li>
            <li>Integrated interactive Shiki syntax highlighting code blocks</li>
          </ul>
        </div>
      )}
    </div>
  );
};
