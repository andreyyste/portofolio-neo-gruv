import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { codeToHtml } from 'shiki';
import { RepoHeaderWidgets } from '../components/RepoHeaderWidgets';
import { ContributorsWidget } from '../components/ContributorsWidget';
import { CodeTabContent } from '../components/CodeTabContent';
import { IssuesTabContent } from '../components/IssuesTabContent';
import { PullsTabContent } from '../components/PullsTabContent';
import { ActionsTabContent } from '../components/ActionsTabContent';
import { formatSize } from '../utils/formatters';
import { GithubRepo, GithubRepoMetadata, GithubTreeItem, GithubFileContent, GithubIssue } from '../../../../types/github';

interface PageProps {
  params: Promise<{
    repo: string;
    path?: string[];
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function SourceCodePage({ params, searchParams }: PageProps) {
  const { repo, path } = await params;
  const { tab } = await searchParams;

  const activeTab = tab || 'code';
  const filePath = path ? path.join('/') : '';
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // 1. Fetch Repository Info from database via backend API
  let repoDetail: GithubRepo | null = null;
  try {
    const reposRes = await fetch(`${baseUrl}/github/repos`, { cache: 'no-store' });
    if (reposRes.ok) {
      const repos = await reposRes.json();
      repoDetail = repos.find((r: GithubRepo) => r.githubRepo === repo);
    }
  } catch (error) {
    console.error('Error fetching repo info:', error);
  }

  // 1b. Fetch dynamic metadata from the backend (stars, forks, watchers, releases, contributors)
  let repoMetadata: GithubRepoMetadata | null = null;
  try {
    const metaRes = await fetch(`${baseUrl}/github/repos/${repo}/metadata`, { cache: 'no-store' });
    if (metaRes.ok) {
      repoMetadata = await metaRes.json();
    }
  } catch (error) {
    console.error('Error fetching repo metadata:', error);
  }

  const repoDesc = repoMetadata?.description || repoDetail?.description || 'Explore the codebase in retro Neo-Brutalist fashion.';
  const repoTags = (repoMetadata?.topics && repoMetadata.topics.length > 0) ? repoMetadata.topics : (repoDetail?.tags || ['TypeScript', 'NestJS', 'React', 'Tailwind']);
  const repoLink = repoMetadata?.homepage || repoDetail?.liveUrl || 'https://nre.codes';

  const starsCount = repoMetadata?.stars ?? 1200;
  const forksCount = repoMetadata?.forks ?? 250;
  const watchersCount = repoMetadata?.watchers ?? 42;
  const contributorsList = repoMetadata?.contributors ?? [];

  // 2. Fetch Directory Tree or File Contents if Tab is 'Code'
  let isDirectory = false;
  let treeData: GithubTreeItem[] | null = null;
  let fileData: GithubFileContent | null = null;
  let readmeContent = '';
  let highlightedHtml = '';

  if (activeTab === 'code') {
    try {
      // Attempt directory fetch first
      const treeRes = await fetch(`${baseUrl}/github/repos/${repo}/tree?path=${encodeURIComponent(filePath)}`, { cache: 'no-store' });
      if (treeRes.ok) {
        treeData = await treeRes.json();
        isDirectory = true;

        // Sort: directories first, then files
        treeData = [...(treeData || [])].sort((a, b) => {
          if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
          return a.name.localeCompare(b.name);
        });

        // Check for README.md in the current directory and fetch it
        const readmeFile = treeData.find((n: GithubTreeItem) => n.name.toLowerCase() === 'readme.md');
        if (readmeFile) {
          const readmeRes = await fetch(`${baseUrl}/github/repos/${repo}/file?path=${encodeURIComponent(readmeFile.path)}`, { cache: 'no-store' });
          if (readmeRes.ok) {
            const readmeData = await readmeRes.json();
            readmeContent = readmeData.content;
          }
        }
      } else {
        // Attempt file fetch
        const fileRes = await fetch(`${baseUrl}/github/repos/${repo}/file?path=${encodeURIComponent(filePath)}`, { cache: 'no-store' });
        if (fileRes.ok) {
          fileData = await fileRes.json();
          isDirectory = false;

          // Perform Server-Side syntax highlighting using Shiki with Gruvbox theme
          try {
            highlightedHtml = await codeToHtml(fileData.content, {
              lang: fileData.language,
              theme: 'gruvbox-dark',
            });
          } catch (e) {
            highlightedHtml = `<pre class="bg-[#282828] text-[#ebdbb2] p-4 font-mono text-xs"><code>${fileData.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
          }
        } else {
          notFound();
        }
      }
    } catch (e) {
      notFound();
    }
  }

  // Generate parent directory path if deep in the tree
  let parentPath = '';
  if (filePath && isDirectory) {
    const segments = filePath.split('/');
    segments.pop();
    parentPath = segments.join('/');
  }

  return (
    <div className="flex-1 w-full bg-[#f4ece9] text-on-surface flex flex-col font-mono relative">
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-6 border-b-[6px] border-on-surface">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-[3px] border-on-surface flex items-center justify-center shadow-[3px_3px_0px_0px_#1e1b19] shrink-0">
              <svg viewBox="0 0 16 16" version="1.1" className="w-6 h-6 text-[#24686b]" aria-hidden="true" fill="currentColor">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 1 0 1.5H4.5A2.5 2.5 0 0 1 2 13.5v-11zm10.5-.5h-8A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h6.75A1.5 1.5 0 0 0 12.75 13.5v-11z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-label-bold uppercase opacity-60 font-mono tracking-wider">source-code/</span>
              <div className="bg-theme-yellow text-on-surface border-[3px] border-on-surface px-4 py-1.5 md:py-2 font-display-2xl text-xl md:text-2xl font-extrabold uppercase shadow-[4px_4px_0px_0px_#1e1b19] -rotate-1 tracking-tighter">
                {repo}
              </div>
            </div>
          </div>
          <RepoHeaderWidgets key={repo} initialWatch={watchersCount} initialStar={starsCount} initialFork={forksCount} />
        </section>

        {/* ================= TABS BAR ================= */}
        <section className="flex border-b-[3px] border-on-surface relative">
          <Link href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=code`} className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${activeTab === 'code' ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' : 'bg-white hover:bg-theme-grey'}`}>
            <span className="material-symbols-outlined text-base leading-none">code</span>Code
          </Link>
          <Link href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=issues`} className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${activeTab === 'issues' ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' : 'bg-white hover:bg-theme-grey'}`}>
            <span className="material-symbols-outlined text-base leading-none">info</span>Issues <span className="bg-theme-red text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1">{repoMetadata?.issues?.filter((i: GithubIssue) => i.state === 'open').length ?? 5}</span>
          </Link>
          <Link href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=pulls`} className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${activeTab === 'pulls' ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' : 'bg-white hover:bg-theme-grey'}`}>
            <span className="material-symbols-outlined text-base leading-none">call_split</span>Pull Requests
          </Link>
          <Link href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=actions`} className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${activeTab === 'actions' ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' : 'bg-white hover:bg-theme-grey'}`}>
            <span className="material-symbols-outlined text-base leading-none">play_circle</span>Actions
          </Link>
        </section>

        {/* ================= TAB CONTENTS GRID ================= */}
        <section className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 min-w-0">
            {activeTab === 'code' && (
              <CodeTabContent
                repo={repo}
                filePath={filePath}
                isDirectory={isDirectory}
                treeData={treeData}
                fileData={fileData}
                readmeContent={readmeContent}
                highlightedHtml={highlightedHtml}
                parentPath={parentPath}
                repoMetadata={repoMetadata}
                repoLink={repoLink}
              />
            )}
            {activeTab === 'issues' && (
              <IssuesTabContent repo={repo} repoMetadata={repoMetadata} />
            )}
            {activeTab === 'pulls' && (
              <PullsTabContent repo={repo} />
            )}
            {activeTab === 'actions' && (
              <ActionsTabContent repo={repo} />
            )}
          </div>

          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            {/* 1. About Card */}
            <div className="bg-white p-6 border-[4px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19]">
              <h3 className="font-display-xl text-lg font-bold uppercase mb-3 border-b-2 border-on-surface pb-1 text-on-surface">About</h3>
              <p className="text-xs font-bold text-on-surface-variant leading-relaxed mb-4">
                {repoDesc}
              </p>
              
              {/* Repo link styled exactly like portfolio.creative.raw */}
              {repoLink && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#24686b] hover:text-on-surface transition-colors mb-5 font-mono select-all">
                  <span className="material-symbols-outlined text-sm font-extrabold">link</span>
                  <a href={repoLink} target="_blank" rel="noopener noreferrer" className="underline break-all uppercase">
                    {repoLink.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {/* Tags list (Brutalist White Capsules) */}
              <div className="flex gap-2 flex-wrap">
                {repoTags.map((tag: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="bg-white text-on-surface font-label-bold text-[10px] uppercase border-[2.5px] border-on-surface px-3 py-1 font-mono hover:bg-theme-grey transition-colors select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Contributors Card */}
            <ContributorsWidget contributors={contributorsList} />
          </div>
        </section>
      </main>
    </div>
  );
}
