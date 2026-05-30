// Helpers to format file sizes
export const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Selects a commit from the repository commit list based on the file name consistently
export const getCommitForFile = (fileName: string, commitsList: any[]) => {
  if (!commitsList || commitsList.length === 0) {
    return { message: 'Refactor codebase structure for strict brutalist specs', age: '2 days ago' };
  }
  // Simple hash function to select a commit consistently based on file name
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = fileName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % commitsList.length;
  const c = commitsList[index];
  
  // Calculate relative age from date
  const date = new Date(c.date);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  let age = 'Just now';
  if (diffDays > 0) age = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  else if (diffHours > 0) age = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  else if (diffMins > 0) age = diffMins === 1 ? '1 min ago' : `${diffMins} mins ago`;

  return {
    message: c.message.split('\n')[0],
    age,
  };
};

// Formats UTC date strings into relative time-ago format
export const getRelativeAge = (dateStr: string) => {
  if (!dateStr) return 'some time ago';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays > 0) return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  if (diffHours > 0) return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  if (diffMins > 0) return diffMins === 1 ? '1 min ago' : `${diffMins} mins ago`;
  return 'Just now';
};
