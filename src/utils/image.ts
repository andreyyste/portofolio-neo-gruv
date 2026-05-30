/**
 * Helper to check if a string is a valid image source (URL or base64)
 */
export function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/')
  );
}

/**
 * Transforms standard Google Drive share links to direct download URLs
 */
export function formatImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Convert Google Drive sharing links to direct download links
  if (trimmed.includes('drive.google.com') || trimmed.includes('googleusercontent.com')) {
    let fileId = '';
    
    // Pattern: /file/d/FILE_ID/view...
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    } else {
      // Pattern: id=FILE_ID
      const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }
    
    if (fileId) {
      // Use the fife server format which serves the raw image directly with a 200 OK
      // instead of redirecting with a 303 (which gets blocked in many browsers due to third-party cookies)
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  return trimmed;
}
