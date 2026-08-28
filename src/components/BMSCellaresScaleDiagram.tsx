import React from 'react';

export const BMSCellaresScaleDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-4 sm:p-7 flex flex-col justify-between select-none rounded-none shadow-2xl transition-all ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL DEAL SIGNAL</span>
        <span className="opacity-80">ALLIANCE TERMINATION / SCALE CONSTRAINT</span>
      </div>

      {/* Main Center Area: Company Logos & Connection Symbol */}
      <div className="my-auto py-3 sm:py-6">
        <div className="grid grid-cols-11 gap-2 sm:gap-4 items-center">
          
          {/* Left Company: Bristol Myers Squibb Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-2">
              {/* Bristol Myers Squibb Official Hand Emblem */}
              <svg viewBox="0 0 100 100" className="h-8 sm:h-11 w-auto shrink-0" fill="none">
                {/* Purple Hand / Human Touch Silhouette */}
                <path 
                  d="M20 75 C20 45, 30 20, 50 15 C60 12, 70 20, 65 35 C60 50, 45 60, 40 75 Z" 
                  fill="#4C12A1" 
                />
                {/* Red/Coral Accent Arc */}
                <path 
                  d="M45 75 C45 55, 60 40, 75 30 C85 45, 80 65, 65 80 Z" 
                  fill="#EB1C24" 
                />
              </svg>
              
              {/* BMS Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight leading-tight text-white font-sans">
                  Bristol Myers
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight leading-none text-white font-sans">
                  Squibb
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Breyanzi Innovator
            </span>
          </div>

          {/* Center: Alliance Termination / Disconnect Symbol */}
          <div className="col-span-3 flex flex-col items-center justify-center px-1">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-rose-500/15 border-2 border-rose-500 shadow-lg shadow-rose-500/10">
              {/* Disconnect / Scale Termination Icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Connection Label */}
            <div className="mt-2 text-center">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                Terminated
              </span>
              <span className="block text-[7px] sm:text-[9px] font-mono text-white/60 tracking-tight">
                $380M Scale Gap
              </span>
            </div>
          </div>

          {/* Right Company: Cellares Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-1.5 sm:gap-2">
              {/* Cellares Official Hexagon Cell Automation Emblem */}
              <svg viewBox="0 0 100 100" className="h-7 sm:h-10 w-auto shrink-0" fill="none">
                <polygon points="50,10 88,32 88,78 50,98 12,78 12,32" stroke="#0080FF" strokeWidth="6" fill="#00E5FF" fillOpacity="0.15" />
                <circle cx="50" cy="55" r="16" fill="#00E5FF" />
                <path d="M50 25 V39 M75 68 L63 60 M25 68 L37 60" stroke="#0080FF" strokeWidth="4" strokeLinecap="round" />
              </svg>
              
              {/* Cellares Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-base font-black tracking-widest leading-none text-white font-sans uppercase">
                  CELLARES
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-[#00E5FF] uppercase font-semibold mt-0.5">
                  Cell Shuttle
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Automated Manufacturing
            </span>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-white/50">
        <span>BRISTOL MYERS SQUIBB (NYSE: BMY)</span>
        <span>CELLARES CELL SHUTTLE PLATFORM</span>
      </div>
    </div>
  );
};
