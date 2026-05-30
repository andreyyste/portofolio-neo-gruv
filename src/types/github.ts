export interface GithubCommit {
  sha: string;
  authorLogin: string;
  avatarUrl: string;
  message: string;
  date: string;
}

export interface GithubTreeItem {
  name: string;
  path: string;
  type: 'dir' | 'file';
  size?: number;
}

export interface GithubFileContent {
  content: string;
  language: string;
  lines: number;
  size: number;
}

export interface GithubIssue {
  id?: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  created_at: string;
  user: string;
  comments: number;
}

export interface GithubRepoMetadata {
  description?: string;
  topics?: string[];
  homepage?: string;
  stars?: number;
  forks?: number;
  watchers?: number;
  releases?: any[];
  contributors?: any[];
  commits?: GithubCommit[];
  totalCommits?: number;
  issues?: GithubIssue[];
}

export interface GithubRepo {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubRepo: string;
}
