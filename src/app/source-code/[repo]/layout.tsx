import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Title } from '../../../ui/Title';
import { FileTreeSidebar } from './components/FileTreeSidebar';

interface RepoLayoutProps {
  children: React.ReactNode;
  params: Promise<{ repo: string }>;
}

export default async function RepoLayout({ children, params }: RepoLayoutProps) {
  const { repo } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  let rootTree = [];
  let repoDetail = null;

  try {
    // 1. Fetch root tree
    const treeRes = await fetch(`${baseUrl}/github/repos/${repo}/tree`, { cache: 'no-store' });
    if (!treeRes.ok) {
      notFound();
    }
    rootTree = await treeRes.json();

    // 2. Find repo details from database
    const reposRes = await fetch(`${baseUrl}/github/repos`, { cache: 'no-store' });
    if (reposRes.ok) {
      const repos = await reposRes.json();
      repoDetail = repos.find((r: any) => r.githubRepo === repo);
    }
  } catch (error) {
    console.error('Error loading repo layout data:', error);
    notFound();
  }

  const repoTitle = repoDetail?.title || repo;
  const repoDesc = repoDetail?.description || 'Explore the repository codebase.';

  return (
    <div className="min-h-screen bg-theme-grey text-on-surface flex flex-col font-mono selection:bg-theme-yellow selection:text-on-surface">
      {/* Top Header Banner */}
      <header className="bg-surface border-b-[6px] border-on-surface px-gutter py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link 
              href="/" 
              className="font-label-bold text-xs uppercase bg-theme-yellow text-on-surface px-3 py-1.5 neo-border hover:bg-on-surface hover:text-surface transition-all"
            >
              ← Back to Portfolio
            </Link>
            <span className="font-label-bold text-xs uppercase bg-theme-blue text-surface px-3 py-1.5 neo-border">
              Repo: {repo}
            </span>
          </div>
          <Title 
            as="h1" 
            prefix="" 
            highlight={repoTitle.toUpperCase()} 
            highlightColorClass="bg-theme-green text-surface-container-lowest"
            highlightRotateClass="-rotate-1"
            className="m-0 font-display-2xl text-[28px] md:text-[36px] uppercase tracking-tighter leading-none"
          />
          <p className="text-sm mt-2 opacity-80 max-w-3xl font-body-md font-bold">{repoDesc}</p>
        </div>

        {/* View on GitHub Button */}
        <a 
          href={`https://github.com/andreyyste/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-bold uppercase text-sm bg-on-surface text-surface px-5 py-3.5 neo-border shadow-[4px_4px_0px_0px_#1e1b19] hover:bg-theme-yellow hover:text-on-surface hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 inline-flex items-center gap-2"
        >
          View on GitHub
          <span className="material-symbols-outlined text-lg leading-none">open_in_new</span>
        </a>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative md:h-[calc(100vh-130px)]">
        {/* Left Sidebar Explorer */}
        <aside className="w-full md:w-80 bg-surface border-b-[6px] md:border-b-0 md:border-r-[6px] border-on-surface overflow-y-auto flex flex-col shrink-0">
          <div className="bg-surface-dim p-4 border-b-[4px] border-on-surface flex justify-between items-center">
            <span className="font-label-bold text-xs uppercase tracking-wider text-on-surface opacity-80 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">folder_open</span>
              Codebase Explorer
            </span>
          </div>
          <FileTreeSidebar repoName={repo} initialTree={rootTree} />
        </aside>

        {/* Right Content View */}
        <main className="flex-1 overflow-y-auto bg-surface-container flex flex-col relative min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
