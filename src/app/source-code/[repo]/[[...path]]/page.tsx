import React from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { codeToHtml } from 'shiki';

interface PageProps {
  params: Promise<{
    repo: string;
    path?: string[];
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

export default async function SourceCodePage({ params }: PageProps) {
  const { repo, path } = await params;
  const filePath = path ? path.join('/') : '';
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const isReadme = !filePath || filePath.toLowerCase() === 'readme.md';

  // Customized Markdown styling components to align with Neo-Brutalist design system
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
    table: (props: any) => <table className="w-full border-collapse border-[3px] border-on-surface mb-6 text-sm" {...props} />,
    th: (props: any) => <th className="border-[3px] border-on-surface bg-theme-grey p-2 text-left uppercase font-bold" {...props} />,
    td: (props: any) => <td className="border-[3px] border-on-surface p-2 font-bold" {...props} />,
  };

  if (isReadme) {
    let readmeContent = '';
    try {
      const res = await fetch(`${baseUrl}/github/repos/${repo}/readme`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        readmeContent = data.content;
      } else {
        readmeContent = '# Repository Readme\n\nREADME.md not found. Choose a file from the sidebar to inspect the source code.';
      }
    } catch (e) {
      readmeContent = '# Error Loading Readme\n\nCould not fetch README.md from backend proxy service.';
    }

    return (
      <div className="p-6 md:p-10 max-w-4xl">
        <div className="bg-surface p-8 md:p-12 neo-border-heavy shadow-[8px_8px_0px_0px_#1e1b19] -rotate-0.5 mb-10">
          <ReactMarkdown components={markdownComponents}>{readmeContent}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Else, fetch and render a code file with Shiki highlighting
  try {
    const fileRes = await fetch(`${baseUrl}/github/repos/${repo}/file?path=${encodeURIComponent(filePath)}`, { cache: 'no-store' });
    if (!fileRes.ok) {
      notFound();
    }

    const fileData = await fileRes.json();
    const { content, size, language, lines } = fileData;

    // Perform Server-Side syntax highlighting using Shiki with Gruvbox theme
    let highlightedHtml = '';
    try {
      highlightedHtml = await codeToHtml(content, {
        lang: language,
        theme: 'gruvbox-dark',
      });
    } catch (e) {
      // Fallback in case syntax highlights fail for a specific language
      highlightedHtml = `<pre class="bg-[#282828] text-[#ebdbb2] p-4 font-mono text-xs"><code>${content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    }

    const breadcrumbs = filePath.split('/');

    return (
      <div className="flex flex-col h-full w-full min-w-0">
        {/* Navigation Breadcrumbs & File Metadata Header */}
        <div className="bg-surface border-b-[4px] border-on-surface px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
            <span className="text-on-surface-variant">{repo}</span>
            {breadcrumbs.map((part, idx) => (
              <React.Fragment key={idx}>
                <span className="text-on-surface-variant opacity-55">/</span>
                <span className={idx === breadcrumbs.length - 1 ? 'text-on-surface font-bold underline' : 'text-on-surface-variant'}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Metadata Badges */}
          <div className="flex gap-2 flex-wrap text-[10px] font-label-bold uppercase">
            <span className="bg-theme-yellow text-on-surface px-2.5 py-1 neo-border">
              {language}
            </span>
            <span className="bg-theme-blue text-surface px-2.5 py-1 neo-border">
              {lines} lines
            </span>
            <span className="bg-theme-grey text-on-surface px-2.5 py-1 neo-border">
              {formatSize(size)}
            </span>
          </div>
        </div>

        {/* Highlighted Code Container */}
        <div className="flex-1 p-6 overflow-auto min-w-0">
          <div 
            dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
            className="neo-border-heavy shadow-[8px_8px_0px_0px_#1e1b19] overflow-x-auto text-xs [&>pre]:!bg-[#282828] [&>pre]:p-6 [&>pre]:overflow-x-auto [&>pre]:leading-relaxed"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching file content:', error);
    notFound();
  }
}
