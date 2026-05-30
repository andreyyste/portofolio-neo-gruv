import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { InteractiveDemo } from './InteractiveDemo';
import { getCommitForFile, getRelativeAge, formatSize } from '../utils/formatters';
import { sanitizeMarkdownHtml, markdownComponents } from '../utils/markdown';

interface CodeTabContentProps {
  repo: string;
  filePath: string;
  isDirectory: boolean;
  treeData: any[] | null;
  fileData: any | null;
  readmeContent: string;
  highlightedHtml: string;
  parentPath: string;
  repoMetadata: any;
  repoLink: string;
}

export const CodeTabContent: React.FC<CodeTabContentProps> = ({
  repo,
  filePath,
  isDirectory,
  treeData,
  fileData,
  readmeContent,
  highlightedHtml,
  parentPath,
  repoMetadata,
  repoLink,
}) => {
  return (
    <>
      {/* 1. If Directory View: Commit Bar + File Table */}
      {isDirectory && treeData && (
        <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19]">
          
          {/* Commit Header Banner */}
          {(() => {
            const latestCommit = repoMetadata?.commits?.[0];
            const totalC = repoMetadata?.totalCommits || 150;
            
            let commitMsg = 'Update structural reference implementation';
            let author = 'andreyyste';
            let avatarUrl = '';
            let commitHash = 'b7f9a2c';
            let relativeAge = '2 hours ago';
            
            if (latestCommit) {
              commitMsg = latestCommit.message.split('\n')[0];
              author = latestCommit.authorLogin;
              avatarUrl = latestCommit.avatarUrl;
              commitHash = latestCommit.sha.substring(0, 7);
              relativeAge = getRelativeAge(latestCommit.date);
            }
            
            return (
              <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-theme-yellow border-[2px] border-on-surface flex items-center justify-center font-bold text-sm overflow-hidden select-none shrink-0">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={author} className="w-full h-full object-cover" />
                    ) : (
                      author.substring(0, 1).toUpperCase()
                    )}
                  </div>
                  <span className="font-label-bold text-xs uppercase text-on-surface font-extrabold">{author}</span>
                  <span className="text-xs text-on-surface-variant font-bold truncate max-w-[200px] md:max-w-[400px]" title={commitMsg}>
                    {commitMsg}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-bold font-mono">
                  <span className="bg-[#ebdbb2]/50 px-2 py-0.5 rounded border border-on-surface/20 text-on-surface">{commitHash}</span>
                  <span>{relativeAge}</span>
                  <span className="border-l-[2px] border-on-surface/20 pl-3 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">history</span>
                    {totalC} Commits
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Files List Table */}
          <div className="flex flex-col w-full divide-y divide-on-surface/20">
            
            {/* Parent Directory Link (Back arrow) */}
            {filePath && (
              <Link 
                href={`/source-code/${repo}/${parentPath}`}
                className="flex items-center py-3.5 px-4 text-xs font-bold text-theme-blue hover:bg-theme-grey transition-colors gap-2"
              >
                <span className="material-symbols-outlined text-base font-bold">arrow_back</span>
                <span>..</span>
              </Link>
            )}

            {/* File Rows */}
            {treeData.map((node) => {
              const isDir = node.type === 'dir';
              const fileCommit = getCommitForFile(node.name, repoMetadata?.commits || []);
              return (
                <div 
                  key={node.path}
                  className="flex flex-col md:flex-row md:items-center justify-between py-3.5 px-4 hover:bg-theme-grey/50 transition-colors text-xs gap-2"
                >
                  {/* File Name & Icon */}
                  <div className="flex items-center gap-3 min-w-0 md:w-1/3">
                    <span className={`material-symbols-outlined text-lg select-none shrink-0 ${isDir ? 'text-[#24686b]' : 'text-on-surface/65'}`}>
                      {isDir ? 'folder' : 'description'}
                    </span>
                    <Link 
                      href={`/source-code/${repo}/${node.path}`}
                      className="font-extrabold text-on-surface hover:text-theme-blue transition-colors truncate"
                    >
                      {node.name}
                    </Link>
                  </div>

                  {/* Commit Message */}
                  <div className="text-on-surface-variant/80 truncate md:w-1/2">
                    {fileCommit.message}
                  </div>

                  {/* Commit Age */}
                  <div className="text-on-surface-variant/60 font-mono text-right shrink-0 md:w-1/6">
                    {fileCommit.age}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. If File View: Code File Box with Highlighted Code */}
      {!isDirectory && fileData && (
        <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
          
          {/* File Header */}
          <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase truncate max-w-full">
              <Link href={`/source-code/${repo}`} className="text-theme-blue hover:underline shrink-0">{repo}</Link>
              {filePath.split('/').map((part, index, arr) => (
                <React.Fragment key={index}>
                  <span className="opacity-50">/</span>
                  <span className={index === arr.length - 1 ? 'text-on-surface font-extrabold' : 'text-on-surface-variant'}>
                    {part}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex gap-2 text-[10px] font-label-bold uppercase shrink-0">
              <span className="bg-theme-yellow text-on-surface px-2 py-0.5 neo-border border-[2px]">{fileData.language}</span>
              <span className="bg-theme-blue text-surface px-2 py-0.5 neo-border border-[2px]">{fileData.lines} lines</span>
              <span className="bg-theme-grey text-on-surface px-2 py-0.5 neo-border border-[2px]">{formatSize(fileData.size)}</span>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="overflow-x-auto p-4 md:p-6 bg-[#282828]">
            <div 
              dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
              className="text-xs [&>pre]:!bg-[#282828] [&>pre]:overflow-x-auto [&>pre]:leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* 3. README Render block if viewing directory & readme exists */}
      {isDirectory && readmeContent && (
        <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] relative mt-6">
          {/* Mockup styled README black corner badge */}
          <div className="absolute top-0 right-0 bg-[#1e1b19] text-white text-[10px] uppercase font-bold px-4 py-1.5 border-b-[3px] border-l-[3px] border-on-surface z-10 select-none">
            README.md
          </div>

          {/* Markdown Body */}
          <div className="p-8 md:p-12 max-w-none pt-14">
            <ReactMarkdown components={markdownComponents}>{sanitizeMarkdownHtml(readmeContent)}</ReactMarkdown>

            {/* Embed the custom Design Philosophy & Production boxes to match user mockup */}
            <div className="mt-12 flex flex-col gap-8">
              {/* Box 1: Design Philosophy */}
              <div className="bg-[#1a4a4f] text-[#f4ece9] p-8 border-[4px] border-on-surface shadow-[8px_8px_0px_0px_#1e1b19] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-theme-yellow">warning</span>
                  <span className="font-display-xl text-xl font-bold uppercase tracking-wider border-b-[3px] border-[#f4ece9] pb-1">
                    DESIGN PHILOSOPHY
                  </span>
                </div>
                <ul className="flex flex-col gap-3 text-xs font-semibold pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center border-[2px] border-[#ba1a1a] bg-white text-[#ba1a1a] shrink-0 text-[10px] font-bold">✓</span>
                    <span><strong>Containment:</strong> Every element lives within a rigid bounding box. No floating content.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center border-[2px] border-[#ba1a1a] bg-white text-[#ba1a1a] shrink-0 text-[10px] font-bold">✓</span>
                    <span><strong>Contrast:</strong> High contrast borders (#1e1b19) are mandatory. 3px standard, 6px heavy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center border-[2px] border-[#ba1a1a] bg-white text-[#ba1a1a] shrink-0 text-[10px] font-bold">✓</span>
                    <span><strong>Depth:</strong> Hard solid shadows. No blur. Physical displacement on interaction.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Live Production Demo & Terminal Deployer */}
              <InteractiveDemo repoName={repo} liveUrl={repoLink} />

              {/* Rebel Stamp */}
              <div className="flex justify-end">
                <div 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #b0b3b3, #b0b3b3 4px, #a5a8a8 4px, #a5a8a8 8px)'
                  }}
                  className="border-[3px] border-on-surface px-6 py-2.5 font-display-xl font-black text-on-surface shadow-[4px_4px_0px_0px_#1e1b19] rotate-3 text-sm select-none uppercase tracking-widest"
                >
                  REBEL
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
