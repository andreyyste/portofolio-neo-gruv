import React from 'react';

// Sanitizes raw HTML alignment tags (<div align="...">, <i>, <h1>) from Markdown files
export const sanitizeMarkdownHtml = (content: string) => {
  if (!content) return '';
  let sanitized = content.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '');
  sanitized = sanitized.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '');
  sanitized = sanitized.replace(/<i[^>]*>/gi, '*').replace(/<\/i>/gi, '*');
  sanitized = sanitized.replace(/<b[^>]*>/gi, '**').replace(/<\/b>/gi, '**');
  sanitized = sanitized.replace(/<h1>(.*?)<\/h1>/gi, '# $1');
  sanitized = sanitized.replace(/<h2>(.*?)<\/h2>/gi, '## $1');
  sanitized = sanitized.replace(/<h3>(.*?)<\/h3>/gi, '### $1');
  sanitized = sanitized.replace(/<br\s*\/?>/gi, '\n');
  return sanitized;
};

// Markdown Custom Mappings for Brutalist UI
export const markdownComponents = {
  h1: (props: any) => <h1 className="text-3xl font-extrabold border-b-[4px] border-on-surface pb-2 mb-6 mt-8 uppercase font-display-2xl text-on-surface" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold border-b-[3px] border-on-surface pb-1.5 mb-4 mt-6 uppercase font-display-xl text-on-surface" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mb-3 mt-5 uppercase text-on-surface" {...props} />,
  p: (props: any) => <p className="mb-4 text-sm font-body-md font-bold leading-relaxed text-on-surface/90" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 font-bold text-sm text-on-surface/90" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 font-bold text-sm text-on-surface/90" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  code: ({ className, children, ...props }: any) => {
    return (
      <code className="bg-[#ebdbb2]/40 px-1.5 py-0.5 border border-on-surface/20 text-[#ba1a1a] font-semibold text-xs font-mono" {...props}>
        {children}
      </code>
    );
  },
  pre: (props: any) => (
    <pre className="bg-[#ebdbb2]/30 text-on-surface p-4 border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] overflow-x-auto mb-6 text-xs font-mono" {...props} />
  ),
  blockquote: (props: any) => <blockquote className="border-l-[6px] border-theme-yellow pl-4 italic my-4 text-on-surface/70 font-semibold font-mono" {...props} />,
  a: (props: any) => <a className="text-theme-blue font-bold underline hover:text-on-surface transition-colors" {...props} />,
  img: (props: any) => <img className="border-[3px] border-on-surface shadow-[6px_6px_0px_0px_#1e1b19] max-w-full my-6 transition-all duration-150 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]" {...props} />,
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto w-full border-[3px] border-on-surface mb-6 bg-white shadow-[4px_4px_0px_0px_#1e1b19]">
      <table className="w-full border-collapse text-xs md:text-sm font-mono" {...props}>
        {children}
      </table>
    </div>
  ),
  th: (props: any) => <th className="border-b-[3px] border-r-[2px] last:border-r-0 border-on-surface bg-[#e9e1de] p-3 text-left uppercase font-extrabold select-none text-xs md:text-sm font-mono" {...props} />,
  td: (props: any) => <td className="border-r-[2px] last:border-r-0 border-b border-on-surface/20 last:border-b-0 p-3 font-bold text-on-surface/90 text-xs md:text-sm font-mono" {...props} />,
};
