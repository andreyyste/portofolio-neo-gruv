import React from 'react';

interface IssuesTabContentProps {
  repo: string;
  repoMetadata: any;
}

export const IssuesTabContent: React.FC<IssuesTabContentProps> = ({
  repo,
  repoMetadata,
}) => {
  const openIssuesCount = repoMetadata?.issues?.filter((i: any) => i.state === 'open').length ?? 5;

  return (
    <div className="relative border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
      {/* Blurred mockup content */}
      <div className="flex flex-col select-none pointer-events-none blur-[4px] opacity-40">
        <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface font-label-bold text-xs uppercase font-extrabold text-on-surface">
          Repository Issues ({openIssuesCount} Open)
        </div>
        <div className="flex flex-col divide-y divide-on-surface/20">
          <div className="p-4 flex flex-col gap-1 text-xs">
            <span className="font-extrabold uppercase text-theme-red">● Issue #8: Contrast ratio is too low on surface container</span>
            <span className="text-on-surface-variant font-semibold">Opened 1 day ago by design-cop • 2 comments</span>
          </div>
          <div className="p-4 flex flex-col gap-1 text-xs">
            <span className="font-extrabold uppercase text-theme-red">● Issue #7: Rounded corners detected in mobile dialog layout</span>
            <span className="text-on-surface-variant font-semibold">Opened 3 days ago by brutalist-enforcer • 0 comments</span>
          </div>
          <div className="p-4 flex flex-col gap-1 text-xs">
            <span className="font-extrabold uppercase text-on-surface-variant/50 line-through">✓ Issue #6: Soft blur shadow found on primary hero CTA button</span>
            <span className="text-on-surface-variant font-semibold">Closed 7 days ago by andreyyste • 1 comment</span>
          </div>
        </div>
      </div>
      {/* Absolute overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center p-6 z-10">
        <div className="bg-white border-[4px] border-on-surface p-6 shadow-[6px_6px_0px_0px_#1e1b19] flex flex-col items-center gap-3 text-center max-w-sm">
          <h4 className="font-display-2xl text-lg font-bold uppercase text-on-surface">View on GitHub</h4>
          <p className="text-xs font-bold text-on-surface-variant leading-relaxed">
            Issues are tracked live on GitHub. Open to view or report repository issues.
          </p>
          <a
            href={`https://github.com/andreyyste/${repo}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-bold uppercase text-xs bg-theme-yellow text-on-surface px-6 py-2.5 border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
            Open Issues
          </a>
        </div>
      </div>
    </div>
  );
};
