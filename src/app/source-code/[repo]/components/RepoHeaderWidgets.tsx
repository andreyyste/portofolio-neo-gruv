"use client";

import React, { useState } from 'react';

interface RepoHeaderWidgetsProps {
  initialWatch?: number;
  initialStar?: number;
  initialFork?: number;
}

export const RepoHeaderWidgets: React.FC<RepoHeaderWidgetsProps> = ({
  initialWatch = 42,
  initialStar = 1200,
  initialFork = 250,
}) => {
  const [watched, setWatched] = useState(false);
  const [watchCount, setWatchCount] = useState(initialWatch);

  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(initialStar);

  const [forked, setForked] = useState(false);
  const [forkCount, setForkCount] = useState(initialFork);

  const handleWatch = () => {
    if (watched) {
      setWatched(false);
      setWatchCount(prev => prev - 1);
    } else {
      setWatched(true);
      setWatchCount(prev => prev + 1);
    }
  };

  const handleStar = () => {
    if (starred) {
      setStarred(false);
      setStarCount(prev => prev - 1);
    } else {
      setStarred(true);
      setStarCount(prev => prev + 1);
    }
  };

  const handleFork = () => {
    if (forked) {
      setForked(false);
      setForkCount(prev => prev - 1);
    } else {
      setForked(true);
      setForkCount(prev => prev + 1);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Public Badge */}
      <span className="font-label-bold text-[10px] uppercase border-[2.5px] border-on-surface px-4 py-1.5 rounded-full bg-white select-none shadow-[2px_2px_0px_0px_#1e1b19] font-extrabold">
        Public
      </span>

      {/* Watch Widget */}
      <button
        onClick={handleWatch}
        className={`flex items-center gap-2 border-[2.5px] border-on-surface px-3 py-1 rounded-full shadow-[3px_3px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e1b19] font-label-bold text-xs uppercase cursor-pointer select-none transition-all duration-100 ${
          watched ? 'bg-[#adeef1]' : 'bg-white hover:bg-theme-grey'
        }`}
      >
        <span className={`material-symbols-outlined text-base leading-none ${watched ? 'fill-1' : ''}`}>
          visibility
        </span>
        <span>Watch</span>
        <span className="bg-on-surface text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {formatCount(watchCount)}
        </span>
      </button>

      {/* Star Widget */}
      <button
        onClick={handleStar}
        className={`flex items-center gap-2 border-[2.5px] border-on-surface px-3 py-1 rounded-full shadow-[3px_3px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e1b19] font-label-bold text-xs uppercase cursor-pointer select-none transition-all duration-100 ${
          starred ? 'bg-theme-yellow' : 'bg-white hover:bg-theme-grey'
        }`}
      >
        <span className={`material-symbols-outlined text-base leading-none ${starred ? 'fill-1' : ''}`}>
          star
        </span>
        <span>Star</span>
        <span className="bg-on-surface text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {formatCount(starCount)}
        </span>
      </button>

      {/* Fork Widget */}
      <button
        onClick={handleFork}
        className={`flex items-center gap-2 border-[2.5px] border-on-surface px-3 py-1 rounded-full shadow-[3px_3px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e1b19] font-label-bold text-xs uppercase cursor-pointer select-none transition-all duration-100 ${
          forked ? 'bg-[#ffdad5]' : 'bg-white hover:bg-theme-grey'
        }`}
      >
        <span className="material-symbols-outlined text-base leading-none">
          call_split
        </span>
        <span>Fork</span>
        <span className="bg-on-surface text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {formatCount(forkCount)}
        </span>
      </button>
    </div>
  );
};
