"use client";

import React, { useState, useEffect, useRef } from 'react';

interface InteractiveDemoProps {
  repoName: string;
  liveUrl: string;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ repoName, liveUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const deploymentSteps = [
    { text: "⏳ Initializing pipeline configuration...", delay: 300, progress: 5 },
    { text: "🔑 Authenticating credentials on Heroku registry... SUCCESS", delay: 400, progress: 12 },
    { text: "🗄️ Checking Supabase PostgreSQL database schemas... SUCCESS", delay: 500, progress: 20 },
    { text: "📦 Cloning git repository 'andreyyste/" + repoName + "'...", delay: 400, progress: 28 },
    { text: "📂 Source tree structure verified, active config found: .portfolio.json", delay: 300, progress: 35 },
    { text: "⚙️ Installing package dependencies (Next.js v15.5, React 19.2)...", delay: 600, progress: 42 },
    { text: "🔍 Running ESLint rules and TypeScript compiler diagnostics...", delay: 500, progress: 50 },
    { text: "   └ [TS] No compilation errors, isolatedModules compliance passed.", delay: 200, progress: 54 },
    { text: "🏗️ Building optimized production bundle via next build...", delay: 800, progress: 62 },
    { text: "   └ [Next] Compiled successfully in 1.8s", delay: 200, progress: 68 },
    { text: "   └ [Next] Generating static HTML pages...", delay: 400, progress: 75 },
    { text: "🚀 Deploying static pages to Vercel edge endpoints...", delay: 600, progress: 83 },
    { text: "📡 Running PostgreSQL migrations & sync for portfolio projects...", delay: 500, progress: 90 },
    { text: "🛡️ Setting Firestore rules & Firebase auth policies... SKIPPED (unused)", delay: 300, progress: 95 },
    { text: "🔍 Performing Lighthouse audits (Performance: 98, Accessibility: 100)...", delay: 400, progress: 98 },
    { text: "🎉 DEPLOYMENT SUCCESSFUL! Project is now live at: " + liveUrl, delay: 500, progress: 100 }
  ];

  const startDeployment = () => {
    setIsOpen(true);
    setLogs([]);
    setProgress(0);
    setIsDeploying(true);
    setIsDone(false);
  };

  useEffect(() => {
    if (!isOpen || !isDeploying) return;

    let currentStepIndex = 0;

    const runNextStep = () => {
      if (currentStepIndex >= deploymentSteps.length) {
        setIsDeploying(false);
        setIsDone(true);
        return;
      }

      const step = deploymentSteps[currentStepIndex];
      
      setTimeout(() => {
        setLogs(prev => [...prev, step.text]);
        setProgress(step.progress);
        currentStepIndex++;
        runNextStep();
      }, step.delay);
    };

    runNextStep();
  }, [isOpen, isDeploying]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="mt-12 flex flex-col gap-8">
      {/* Yellow Live Production Demo Box with Stripes */}
      <div 
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #cacd39, #cacd39 12px, #bdc033 12px, #bdc033 24px)'
        }}
        className="text-on-surface p-8 neo-border-heavy shadow-[8px_8px_0px_0px_#1e1b19] flex flex-col items-center text-center gap-3 border-[4px] border-on-surface"
      >
        <h4 className="font-display-2xl text-2xl md:text-3xl font-extrabold uppercase tracking-tight bg-white border-[2.5px] border-on-surface px-4 py-1.5 shadow-[3px_3px_0px_0px_#1e1b19]">
          LIVE PRODUCTION DEMO
        </h4>
        <p className="text-xs font-bold bg-[#1e1b19] text-[#f4ece9] px-3 py-1 neo-border border-[2px] mt-1 select-none">
          Experience the rigid geometry in real-time.
        </p>
        
        <button
          onClick={startDeployment}
          className="bg-[#b51a16] text-white px-6 py-3 border-[3px] border-on-surface shadow-[4px_4px_0px_0px_#1e1b19] hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-label-bold text-xs uppercase mt-3 transition-all duration-150 inline-block cursor-pointer"
        >
          DEPLOY INFRASTRUCTURE
        </button>
      </div>

      {/* Terminal Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#282828] border-[4px] border-on-surface text-[#ebdbb2] shadow-[12px_12px_0px_0px_#1e1b19] flex flex-col overflow-hidden">
            {/* Terminal Window Header */}
            <div className="bg-[#e9e1de] text-on-surface border-b-[4px] border-on-surface px-4 py-3 flex justify-between items-center font-bold text-xs font-mono select-none">
              <div className="flex items-center gap-2">
                {/* Control Dots */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ba1a1a] border border-on-surface"></div>
                  <div className="w-3 h-3 rounded-full bg-[#cacd39] border border-on-surface"></div>
                  <div className="w-3 h-3 rounded-full bg-[#24686b] border border-on-surface"></div>
                </div>
                <span className="font-extrabold uppercase ml-2 tracking-tighter">
                  TERMINAL :: {repoName.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-theme-red hover:text-white px-2 py-0.5 border border-on-surface cursor-pointer font-bold text-[10px]"
              >
                ESC
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs flex flex-col gap-2 h-80 overflow-y-auto bg-[#1d2021] scrollbar-thin select-text">
              <div className="text-[#a89984] mb-2 font-semibold">
                Neo-Impact Deployer v1.0.4 (Host: portofolio-backend-neo-1c3e1ff2a813)
              </div>
              
              {logs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={
                    log.includes("SUCCESS") || log.includes("SUCCESSFUL")
                      ? "text-[#b8bb26] font-bold" 
                      : log.includes("FAILED") || log.includes("errors")
                        ? "text-[#fb4934] font-bold"
                        : log.startsWith(" ")
                          ? "text-[#928374]"
                          : "text-[#ebdbb2]"
                  }
                >
                  {log}
                </div>
              ))}
              
              {isDeploying && (
                <div className="text-[#fabd2f] animate-pulse mt-1 font-bold">
                  ⚡ Running build processes...
                </div>
              )}
              
              <div ref={terminalEndRef} />
            </div>

            {/* Progress Bar & Buttons Footer */}
            <div className="bg-[#3c3836] p-4 border-t-[4px] border-on-surface flex flex-col gap-3">
              {/* Progress Bar */}
              <div className="flex items-center gap-4 text-xs font-mono select-none">
                <span className="font-bold text-[#ebdbb2]">PROGRESS:</span>
                <div className="flex-1 bg-[#1d2021] border-[2px] border-[#ebdbb2]/30 h-4 p-0.5 relative">
                  <div 
                    style={{ width: `${progress}%` }}
                    className="bg-[#fabd2f] h-full transition-all duration-300"
                  />
                </div>
                <span className="font-bold text-[#fabd2f] min-w-[36px] text-right">{progress}%</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-1 text-xs">
                {isDone && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#24686b] text-white border-[2.5px] border-on-surface px-4 py-2 font-bold uppercase shadow-[2px_2px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#347c7f]"
                  >
                    VISIT LIVE DEMO
                  </a>
                )}
                
                <button
                  disabled={isDeploying}
                  onClick={() => setIsOpen(false)}
                  className={`border-[2.5px] border-on-surface px-4 py-2 font-bold uppercase ${
                    isDeploying 
                      ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-white text-on-surface shadow-[2px_2px_0px_0px_#1e1b19] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-theme-grey cursor-pointer'
                  }`}
                >
                  {isDone ? 'CLOSE TERMINAL' : 'CANCEL'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
