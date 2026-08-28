import React from 'react';

export const SKBiopharmBiohavenDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-4 sm:p-7 flex flex-col justify-between select-none rounded-none shadow-2xl transition-all ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL DEAL SIGNAL</span>
        <span className="opacity-80">WORLDWIDE PLATFORM ACQUISITION</span>
      </div>

      {/* Main Center Area: Company Logos & Connection Symbol */}
      <div className="my-auto py-3 sm:py-6">
        <div className="grid grid-cols-11 gap-2 sm:gap-4 items-center">
          
          {/* Left Company: SK Biopharmaceuticals Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-2 sm:gap-2.5">
              {/* SK Official Wings of Happiness Emblem */}
              <svg viewBox="0 0 100 80" className="h-8 sm:h-11 w-auto shrink-0" fill="none">
                {/* Red Wing Left */}
                <path 
                  d="M10 50 C20 40, 35 25, 45 15 C42 30, 38 45, 30 60 C22 58, 15 55, 10 50 Z" 
                  fill="#EA0029" 
                />
                {/* Orange Wing Right */}
                <path 
                  d="M45 15 C55 25, 75 40, 90 50 C78 52, 65 48, 55 42 C48 35, 46 25, 45 15 Z" 
                  fill="#FF7A00" 
                />
                {/* Orange Bottom Wing */}
                <path 
                  d="M30 60 C42 55, 52 50, 68 55 C55 65, 42 70, 30 60 Z" 
                  fill="#FF7A00" 
                />
              </svg>
              
              {/* SK Biopharmaceuticals Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-lg font-black tracking-tight leading-none text-white font-sans">
                  SK
                </span>
                <span className="text-[8px] sm:text-[10px] font-sans font-medium tracking-normal text-white/90 leading-tight">
                  biopharmaceuticals
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Buyer · Global Acquirer
            </span>
          </div>

          {/* Center: Deal Connection Symbol */}
          <div className="col-span-3 flex flex-col items-center justify-center px-1">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-gold/15 border-2 border-brand-gold shadow-lg shadow-brand-gold/10">
              {/* Connection Symbol / Exchange Nodes */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Connection Label */}
            <div className="mt-2 text-center">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold text-brand-gold uppercase tracking-wider">
                $400M Deal
              </span>
              <span className="block text-[7px] sm:text-[9px] font-mono text-white/60 tracking-tight">
                Worldwide Rights
              </span>
            </div>
          </div>

          {/* Right Company: Biohaven Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-1.5 sm:gap-2">
              {/* Biohaven Official Ribbon / Helix Emblem */}
              <svg viewBox="0 0 100 100" className="h-7 sm:h-10 w-auto shrink-0" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#00A3AD" strokeWidth="6" strokeDasharray="16 8" />
                <path d="M30 35 Q50 65 70 35" stroke="#00C49F" strokeWidth="8" strokeLinecap="round" />
                <path d="M30 65 Q50 35 70 65" stroke="#00A3AD" strokeWidth="8" strokeLinecap="round" />
              </svg>
              
              {/* Biohaven Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-lg font-bold tracking-tight leading-none text-white font-sans lowercase">
                  biohaven
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#00C49F] uppercase font-bold">
                  Kv7 Platform
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Licensor · Originator
            </span>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-white/50">
        <span>SK BIOPHARMACEUTICALS (KRX: 326030)</span>
        <span>BIOHAVEN LTD (NYSE: BHVN)</span>
      </div>
    </div>
  );
};
