"use client";

import React, { useState } from 'react';
import { Button } from '../../../ui/Button';

export function GithubSyncButton() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; synced: string[]; hidden: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch('/api/proxy/github/sync', {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        setError('Failed to trigger synchronization on backend.');
      }
    } catch (e) {
      setError('An error occurred during sync request.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="bg-surface p-6 neo-border-heavy neo-shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h3 className="font-display-2xl text-xl md:text-2xl uppercase tracking-tighter mb-1">GitHub Repositories Sync</h3>
        <p className="font-mono text-xs opacity-75">
          Backend automatically syncs every 24 hours (midnight) or on app startup. Use this to force a manual sync now.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button 
          onClick={handleSync} 
          disabled={syncing}
          className="bg-theme-green text-on-surface py-3 px-6 neo-border hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b19] transition-all disabled:opacity-50 cursor-pointer text-sm font-label-bold uppercase whitespace-nowrap"
        >
          {syncing ? 'SYNCING...' : 'SYNC GITHUB NOW'}
        </Button>

        {result && (
          <div className="font-mono text-[10px] text-theme-green uppercase font-bold text-left md:text-right">
            ✓ Success! Synced: {result.synced?.length || 0} | Hidden: {result.hidden?.length || 0}
          </div>
        )}
        {error && (
          <div className="font-mono text-[10px] text-theme-red uppercase font-bold text-left md:text-right">
            ⚠ {error}
          </div>
        )}
      </div>
    </div>
  );
}
