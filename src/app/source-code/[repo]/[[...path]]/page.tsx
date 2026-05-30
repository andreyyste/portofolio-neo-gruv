import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { codeToHtml } from 'shiki';
import { Title } from '../../../../ui/Title';
import { RepoHeaderWidgets } from '../components/RepoHeaderWidgets';
import { InteractiveDemo } from '../components/InteractiveDemo';
import { ContributorsWidget } from '../components/ContributorsWidget';
import { ReleasesWidget } from '../components/ReleasesWidget';

interface PageProps {
  params: Promise<{
    repo: string;
    path?: string[];
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

// Helpers to format file sizes
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Generates consistent mock commit messages based on file name
const getCommitMessage = (fileName: string) => {
  const name = fileName.toLowerCase();
  if (name.includes('readme')) return 'Update README.md with design guidelines';
  if (name.includes('package.json')) return 'Upgrade dependencies to NestJS v11 & React 19';
  if (name.includes('eslint') || name.includes('prettier')) return 'Configure strict linting and formatting rules';
  if (name.includes('tailwind')) return 'Update Light Gruvbox palette color tokens';
  if (name.includes('tsconfig')) return 'Enable verbatimModuleSyntax compiler checks';
  if (name.includes('prisma') || name.includes('schema')) return 'Migrate database schema for GITHUB source support';
  if (name.includes('controller')) return 'Implement programmatic cache manager verification';
  if (name.includes('service')) return 'Refactor repository sync and proxy tree fetches';
  if (name.includes('dto')) return 'Add class-validator schemas for project payload';
  if (name.includes('work') || name.includes('carousel')) return 'Implement Featured badge overlays and links';
  if (name.includes('source') || name.includes('viewer')) return 'Build interactive codebase tree navigation';
  if (name.includes('main') || name.includes('app')) return 'Initialize NestJS service setup and boot routing';
  return 'Refactor codebase structure for strict brutalist specs';
};

// Generates consistent mock ages based on file name length
const getCommitAge = (fileName: string) => {
  const len = fileName.length;
  if (len % 5 === 0) return 'Just now';
  if (len % 5 === 1) return '1 hour ago';
  if (len % 5 === 2) return '2 hours ago';
  if (len % 5 === 3) return '2 days ago';
  return '1 week ago';
};

export default async function SourceCodePage({ params, searchParams }: PageProps) {
  const { repo, path } = await params;
  const { tab } = await searchParams;

  const activeTab = tab || 'code';
  const filePath = path ? path.join('/') : '';
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // 1. Fetch Repository Info from database via backend API
  let repoDetail: any = null;
  try {
    const reposRes = await fetch(`${baseUrl}/github/repos`, { cache: 'no-store' });
    if (reposRes.ok) {
      const repos = await reposRes.json();
      repoDetail = repos.find((r: any) => r.githubRepo === repo);
    }
  } catch (error) {
    console.error('Error fetching repo info:', error);
  }

  const repoTitle = repoDetail?.title || repo;
  const repoDesc = repoDetail?.description || 'Explore the codebase in retro Neo-Brutalist fashion.';
  const repoTags = repoDetail?.tags || ['TypeScript', 'NestJS', 'React', 'Tailwind'];
  const repoLink = repoDetail?.liveUrl || 'https://nre.codes';

  // 2. Fetch Directory Tree or File Contents if Tab is 'Code'
  let isDirectory = false;
  let treeData: any[] | null = null;
  let fileData: any = null;
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
        const readmeFile = treeData.find((n: any) => n.name.toLowerCase() === 'readme.md');
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

  // Markdown Custom Mappings for Brutalist UI
  const markdownComponents = {
    h1: (props: any) => <h1 className="text-3xl font-extrabold border-b-[4px] border-on-surface pb-2 mb-6 mt-8 uppercase font-display-2xl text-on-surface" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold border-b-[3px] border-on-surface pb-1.5 mb-4 mt-6 uppercase font-display-xl text-on-surface" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-3 mt-5 uppercase text-on-surface" {...props} />,
    p: (props: any) => <p className="mb-4 text-sm font-body-md font-bold leading-relaxed text-on-surface/90" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-4 font-bold text-sm text-on-surface/90" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-4 font-bold text-sm text-on-surface/90" {...props} />,
    li: (props: any) => <li className="mb-1" {...props} />,
    code: ({ inline, className, children, ...props }: any) => {
      return (
        <code className="bg-[#ebdbb2]/50 px-1.5 py-0.5 rounded border border-on-surface/20 text-[#ba1a1a] font-semibold text-xs font-mono" {...props}>
          {children}
        </code>
      );
    },
    pre: (props: any) => <pre className="bg-[#282828] text-[#ebdbb2] p-4 neo-border overflow-x-auto mb-6 text-xs" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-[6px] border-theme-yellow pl-4 italic my-4 text-on-surface/70 font-semibold" {...props} />,
    a: (props: any) => <a className="text-theme-blue font-bold underline hover:text-on-surface transition-colors" {...props} />,
    img: (props: any) => <img className="border-[3px] border-on-surface shadow-[6px_6px_0px_0px_#1e1b19] max-w-full my-6 transition-all duration-150 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]" {...props} />,
    table: (props: any) => <table className="w-full border-collapse border-[3px] border-on-surface mb-6 text-sm" {...props} />,
    th: (props: any) => <th className="border-[3px] border-on-surface bg-theme-grey p-2 text-left uppercase font-bold" {...props} />,
    td: (props: any) => <td className="border-[3px] border-on-surface p-2 font-bold" {...props} />,
  };

  return (
    <div className="flex-1 w-full bg-[#f4ece9] text-on-surface flex flex-col font-mono relative">
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-6 border-b-[6px] border-on-surface">
          {/* Repo title with book icon card */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-[3px] border-on-surface flex items-center justify-center shadow-[3px_3px_0px_0px_#1e1b19] shrink-0">
              <svg 
                viewBox="0 0 16 16" 
                version="1.1" 
                className="w-6 h-6 text-[#24686b]" 
                aria-hidden="true" 
                fill="currentColor"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 1 0 1.5H4.5A2.5 2.5 0 0 1 2 13.5v-11zm10.5-.5h-8A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h6.75A1.5 1.5 0 0 0 12.75 13.5v-11z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-label-bold uppercase opacity-60 font-mono tracking-wider">
                source-code/
              </span>
              <div className="bg-theme-yellow text-on-surface border-[3px] border-on-surface px-4 py-1.5 md:py-2 font-display-2xl text-xl md:text-2xl font-extrabold uppercase shadow-[4px_4px_0px_0px_#1e1b19] -rotate-1 tracking-tighter">
                {repo}
              </div>
            </div>
          </div>

          {/* Social interaction buttons */}
          <RepoHeaderWidgets />
        </section>

        {/* ================= TABS BAR ================= */}
        <section className="flex border-b-[3px] border-on-surface relative">
          <Link 
            href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=code`}
            className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${
              activeTab === 'code' 
                ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' 
                : 'bg-white hover:bg-theme-grey'
            }`}
          >
            <span className="material-symbols-outlined text-base leading-none">code</span>
            Code
          </Link>

          <Link 
            href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=issues`}
            className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${
              activeTab === 'issues' 
                ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' 
                : 'bg-white hover:bg-theme-grey'
            }`}
          >
            <span className="material-symbols-outlined text-base leading-none">info</span>
            Issues <span className="bg-theme-red text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1">5</span>
          </Link>

          <Link 
            href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=pulls`}
            className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 mr-1 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${
              activeTab === 'pulls' 
                ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' 
                : 'bg-white hover:bg-theme-grey'
            }`}
          >
            <span className="material-symbols-outlined text-base leading-none">call_split</span>
            Pull Requests
          </Link>

          <Link 
            href={`/source-code/${repo}/${filePath ? filePath : ''}?tab=actions`}
            className={`font-label-bold uppercase text-xs px-5 py-3 border-[3px] border-on-surface border-b-0 cursor-pointer flex items-center gap-1.5 relative top-[3px] z-10 transition-all ${
              activeTab === 'actions' 
                ? 'bg-theme-red/15 text-theme-red font-bold shadow-[2px_-2px_0px_0px_#1e1b19]' 
                : 'bg-white hover:bg-theme-grey'
            }`}
          >
            <span className="material-symbols-outlined text-base leading-none">play_circle</span>
            Actions
          </Link>
        </section>

        {/* ================= TAB CONTENTS GRID ================= */}
        <section className="grid grid-cols-12 gap-8 items-start">
          
          {/* LEFT/MAIN GRID COLUMN: Content Area */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 min-w-0">
            
            {/* A. CODE TAB CONTENT */}
            {activeTab === 'code' && (
              <>
                {/* 1. If Directory View: Commit Bar + File Table */}
                {isDirectory && treeData && (
                  <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19]">
                    
                    {/* Commit Header Banner */}
                    <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-theme-yellow border-[2px] border-on-surface flex items-center justify-center font-bold text-sm">
                          N
                        </div>
                        <span className="font-label-bold text-xs uppercase text-on-surface font-extrabold">neo-impact</span>
                        <span className="text-xs text-on-surface-variant font-bold">Update structural reference implementation</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant font-bold font-mono">
                        <span className="bg-[#ebdbb2]/50 px-2 py-0.5 rounded border border-on-surface/20 text-on-surface">b7f9a2c</span>
                        <span>2 hours ago</span>
                        <span className="border-l-[2px] border-on-surface/20 pl-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">history</span>
                          156 Commits
                        </span>
                      </div>
                    </div>

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
                        return (
                          <div 
                            key={node.path}
                            className="flex flex-col md:flex-row md:items-center justify-between py-3.5 px-4 hover:bg-theme-grey/50 transition-colors text-xs gap-2"
                          >
                            {/* File Name & Icon */}
                            <div className="flex items-center gap-3 min-w-0 md:w-1/3">
                              <span className="material-symbols-outlined text-lg text-on-surface/75 select-none shrink-0">
                                {isDir ? 'folder' : 'description'}
                              </span>
                              <Link 
                                href={`/source-code/${repo}/${node.path}`}
                                className="font-extrabold text-on-surface hover:text-theme-blue transition-colors truncate"
                              >
                                {node.name}
                              </Link>
                            </div>

                            {/* Simulated Commit Message */}
                            <div className="text-on-surface-variant/80 truncate md:w-1/2">
                              {getCommitMessage(node.name)}
                            </div>

                            {/* Simulated Commit Age */}
                            <div className="text-on-surface-variant/60 font-mono text-right shrink-0 md:w-1/6">
                              {getCommitAge(node.name)}
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
                      <ReactMarkdown components={markdownComponents}>{readmeContent}</ReactMarkdown>

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
            )}

            {/* B. ISSUES TAB CONTENT */}
            {activeTab === 'issues' && (
              <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
                <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface font-label-bold text-xs uppercase font-extrabold text-on-surface">
                  Simulated Repository Issues (5 Open)
                </div>
                <div className="flex flex-col divide-y divide-on-surface/20">
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-theme-red font-extrabold uppercase">● Issue #08: Contrast ratio is too low on surface container</span>
                    <span className="text-on-surface-variant font-semibold">Opened 1 day ago by design-cop • 2 comments</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-theme-red font-extrabold uppercase">● Issue #07: Rounded corners detected in mobile dialog layout</span>
                    <span className="text-on-surface-variant font-semibold">Opened 3 days ago by brutalist-enforcer • 0 comments</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-on-surface-variant/50 line-through font-semibold">✓ Issue #06: Soft blur shadow found on primary hero CTA button</span>
                    <span className="text-on-surface-variant font-semibold">Closed 1 week ago by andreyyste • resolved</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-theme-red font-extrabold uppercase">● Issue #05: Mouse trail particles need more friction & larger gravity</span>
                    <span className="text-on-surface-variant font-semibold">Opened 2 weeks ago by ux-rebel • 5 comments</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-on-surface-variant/50 line-through font-semibold">✓ Issue #04: Next.js dev server hot reload latency on dynamic paths</span>
                    <span className="text-on-surface-variant font-semibold">Closed 3 weeks ago by nest-nest • fixed</span>
                  </div>
                </div>
              </div>
            )}

            {/* C. PULL REQUESTS TAB CONTENT */}
            {activeTab === 'pulls' && (
              <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
                <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface font-label-bold text-xs uppercase font-extrabold text-on-surface">
                  Simulated Pull Requests (2 Active)
                </div>
                <div className="flex flex-col divide-y divide-on-surface/20">
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-theme-blue font-extrabold uppercase">⇄ PR #12: Replace soft gradients with heavy black borders</span>
                    <span className="text-on-surface-variant font-semibold">Merged 2 days ago by andreyyste • 14 commits</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-theme-blue font-extrabold uppercase">⇄ PR #11: Implement strict sharp 0px border-radius rule for elements</span>
                    <span className="text-on-surface-variant font-semibold">Opened 4 days ago by brutalist-bot • Draft</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex flex-col gap-1 text-xs">
                    <span className="text-on-surface-variant/50 line-through font-semibold">✗ PR #10: Try using Tailwind default utility blue colors instead of HSL theme</span>
                    <span className="text-on-surface-variant font-semibold">Closed 2 weeks ago by moderator-classic • Rejected (Generic colors forbidden)</span>
                  </div>
                </div>
              </div>
            )}

            {/* D. ACTIONS TAB CONTENT */}
            {activeTab === 'actions' && (
              <div className="flex flex-col border-[4px] border-on-surface bg-white shadow-[8px_8px_0px_0px_#1e1b19] overflow-hidden">
                <div className="bg-[#e9e1de] p-4 border-b-[4px] border-on-surface font-label-bold text-xs uppercase font-extrabold text-on-surface">
                  CI/CD Build Pipeline Runs
                </div>
                <div className="flex flex-col divide-y divide-on-surface/20">
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-theme-green font-extrabold">✓ lint-and-check-validity-of-types</span>
                      <span className="text-on-surface-variant font-semibold">Passed • Commit b7f9a2c • event: push by andreyyste</span>
                    </div>
                    <span className="text-on-surface-variant font-mono">2 hours ago</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-theme-green font-extrabold">✓ deploy-production-bundle-to-vercel</span>
                      <span className="text-on-surface-variant font-semibold">Passed • Commit b7f9a2c • event: push</span>
                    </div>
                    <span className="text-on-surface-variant font-mono">2 hours ago</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-theme-red font-extrabold">✗ try-tailwindcss-v4-alpha-compat</span>
                      <span className="text-on-surface-variant font-semibold">Failed • Commit fe881c2 • event: pull_request</span>
                    </div>
                    <span className="text-on-surface-variant font-mono">1 week ago</span>
                  </div>
                  <div className="p-4 hover:bg-theme-grey/30 transition-colors flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-theme-green font-extrabold">✓ database-migration-supabase-production</span>
                      <span className="text-on-surface-variant font-semibold">Passed • Commit d944e82 • event: push</span>
                    </div>
                    <span className="text-on-surface-variant font-mono">2 weeks ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT GRID COLUMN: Repository Metadata Sidebar */}
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

            {/* 2. Releases Card */}
            <ReleasesWidget />

            {/* 3. Contributors Card */}
            <ContributorsWidget />
          </div>
        </section>
      </main>
    </div>
  );
}
