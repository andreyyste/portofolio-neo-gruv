"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
}

interface FileTreeSidebarProps {
  repoName: string;
  initialTree: FileNode[];
}

export const FileTreeSidebar: React.FC<FileTreeSidebarProps> = ({ repoName, initialTree }) => {
  const pathname = usePathname();
  const [treeData, setTreeData] = useState<Record<string, FileNode[]>>({ '': initialTree });
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());
  const [loadingDirs, setLoadingDirs] = useState<Set<string>>(new Set());

  // Decode the current relative path from the URL
  // path starts after "/source-code/[repo]/"
  const prefix = `/source-code/${repoName}`;
  const relativeActivePath = pathname.startsWith(prefix)
    ? decodeURIComponent(pathname.slice(prefix.length).replace(/^\//, ''))
    : '';

  const handleToggleDirectory = async (dirPath: string) => {
    const isExpanded = expandedDirs.has(dirPath);
    
    if (isExpanded) {
      const nextExpanded = new Set(expandedDirs);
      nextExpanded.delete(dirPath);
      setExpandedDirs(nextExpanded);
    } else {
      const nextExpanded = new Set(expandedDirs);
      nextExpanded.add(dirPath);
      setExpandedDirs(nextExpanded);

      // Fetch on-demand if not already loaded
      if (!treeData[dirPath]) {
        setLoadingDirs(prev => {
          const next = new Set(prev);
          next.add(dirPath);
          return next;
        });

        try {
          const res = await fetch(`/api/proxy/github/repos/${repoName}/tree?path=${encodeURIComponent(dirPath)}`);
          if (res.ok) {
            const data = await res.json();
            setTreeData(prev => ({ ...prev, [dirPath]: data }));
          }
        } catch (error) {
          console.error(`Failed to load directory tree for ${dirPath}:`, error);
        } finally {
          setLoadingDirs(prev => {
            const next = new Set(prev);
            next.delete(dirPath);
            return next;
          });
        }
      }
    }
  };

  // Helper to format file sizes
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Recursive tree renderer
  const renderTree = (dirPath: string, depth = 0) => {
    const nodes = treeData[dirPath] || [];

    // Sort: directories first, then files (alphabetical)
    const sortedNodes = [...nodes].sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'dir' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    return (
      <ul className="flex flex-col w-full">
        {sortedNodes.map((node) => {
          const isDir = node.type === 'dir';
          const isExpanded = expandedDirs.has(node.path);
          const isLoading = loadingDirs.has(node.path);
          const isActive = relativeActivePath === node.path;

          return (
            <li key={node.path} className="flex flex-col w-full">
              {isDir ? (
                // Directory Node
                <button
                  onClick={() => handleToggleDirectory(node.path)}
                  className="w-full flex items-center justify-between py-2 px-3 text-left font-semibold text-xs tracking-wider uppercase text-on-surface hover:bg-theme-grey transition-colors cursor-pointer select-none"
                  style={{ paddingLeft: `${(depth * 12) + 12}px` }}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-base leading-none text-theme-blue select-none">
                      {isExpanded ? 'folder_open' : 'folder'}
                    </span>
                    <span className="truncate">{node.name}</span>
                  </span>
                  
                  <span className="flex items-center">
                    {isLoading ? (
                      <span className="animate-spin text-xs leading-none">↻</span>
                    ) : (
                      <span className="material-symbols-outlined text-xs select-none">
                        {isExpanded ? 'expand_more' : 'chevron_right'}
                      </span>
                    )}
                  </span>
                </button>
              ) : (
                // File Node
                <Link
                  href={`/source-code/${repoName}/${node.path}`}
                  className={`w-full flex items-center justify-between py-2 px-3 text-xs border-y border-transparent transition-all truncate hover:bg-theme-grey ${
                    isActive 
                      ? 'bg-theme-yellow text-on-surface border-on-surface border-y-[2px] font-bold shadow-[inset_3px_0_0_0_#1e1b19]' 
                      : 'text-on-surface-variant'
                  }`}
                  style={{ paddingLeft: `${(depth * 12) + 12}px` }}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-base leading-none text-on-surface/60">
                      description
                    </span>
                    <span className="truncate">{node.name}</span>
                  </span>
                  <span className="text-[10px] opacity-60 ml-2 shrink-0">{formatSize(node.size)}</span>
                </Link>
              )}

              {/* Recursive child render */}
              {isDir && isExpanded && treeData[node.path] && (
                <div className="w-full">
                  {renderTree(node.path, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto py-2">
      {renderTree('')}
    </div>
  );
};
