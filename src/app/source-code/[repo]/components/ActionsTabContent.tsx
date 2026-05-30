import React from 'react';

interface ActionsTabContentProps {
  repo: string;
}

export const ActionsTabContent: React.FC<ActionsTabContentProps> = ({ repo }) => {
  return (
    <div className="relative border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
      {/* Blurred mockup content */}
      <div className="flex flex-col select-none pointer-events-none blur-[4px] opacity-40">
        <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface font-label-bold text-xs uppercase font-extrabold text-on-surface">
          CI/CD Build Pipeline Runs
        </div>
        <div className="flex flex-col divide-y divide-on-surface/20">
          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-theme-green">✓ lint-and-check-validity-of-types</span>
              <span className="text-on-surface-variant font-semibold">Passed • Commit b7f9a2c by andreyyste on main</span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-theme-green">✓ deploy-production-bundle-to-vercel</span>
              <span className="text-on-surface-variant font-semibold">Passed • Commit b7f9a2c by andreyyste on main</span>
            </div>
          </div>
        </div>
      </div>
      {/* Absolute overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center p-6 z-10">
        <div className="bg-white border-[4px] border-on-surface p-6 shadow-[6px_6px_0px_0px_#1e1b19] flex flex-col items-center gap-3 text-center max-w-sm">
          <h4 className="font-display-2xl text-lg font-bold uppercase text-on-surface">View on GitHub</h4>
          <p className="text-xs font-bold text-on-surface-variant leading-relaxed">
            Workflow runs and automation pipelines are tracked live on GitHub. Open to inspect active builds.
          </p>
          <a
            href={`https://github.com/andreyyste/${repo}/actions`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-bold uppercase text-xs bg-theme-yellow text-on-surface px-6 py-2.5 border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
            Open Actions
          </a>
        </div>
      </div>
    </div>
  );
};
