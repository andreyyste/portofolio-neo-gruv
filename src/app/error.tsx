"use client";

import React, { useEffect } from 'react';
import { Button } from '../ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console
    console.error("Backend Connection Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-theme-red text-surface flex flex-col items-center justify-center p-8 text-center selection:bg-theme-yellow selection:text-on-surface">
      <div className="bg-surface text-on-surface p-8 md:p-16 neo-border-heavy shadow-[16px_16px_0px_0px_#1e1b19] max-w-3xl transform -rotate-1">
        <h1 className="font-display-2xl text-[48px] md:text-[80px] uppercase leading-none mb-8 tracking-tighter">
          System <span className="bg-theme-yellow px-4 neo-border inline-block rotate-2">Offline</span>
        </h1>
        <p className="font-body-lg text-lg md:text-2xl mb-12 font-bold opacity-80 max-w-xl mx-auto border-l-4 border-theme-red pl-4 text-left">
          The backend API seems to have flatlined or is currently unreachable. We refuse to show you a generic browser error. 
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button 
            onClick={reset} 
            className="bg-theme-blue text-surface-container-lowest neo-border-heavy px-8 py-4 text-xl hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1e1b19] transition-all"
          >
            RETRY CONNECTION
          </Button>
        </div>
      </div>
    </div>
  );
}
