import React from 'react';

export const AurigeneTechTransferDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-4 sm:p-7 flex flex-col justify-between select-none rounded-none shadow-2xl transition-all ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL DEAL SIGNAL</span>
        <span className="opacity-80">TECH-TRANSFER AS PORTFOLIO ARCHITECTURE</span>
      </div>

      {/* Main Center Area: Company Logos & Connection Symbol */}
      <div className="my-auto py-3 sm:py-6">
        <div className="grid grid-cols-11 gap-2 sm:gap-4 items-center">
          
          {/* Left Company: Aurigene / Dr. Reddy's Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-2">
              {/* Dr. Reddy's Official Heart Logo Emblem */}
              <svg viewBox="0 0 100 100" className="h-8 sm:h-11 w-auto shrink-0" fill="none">
                {/* Purple Heart Body */}
                <path 
                  d="M50 20 C35 5, 10 20, 10 45 C10 65, 35 80, 50 90 C65 80, 90 65, 90 45 C90 20, 65 5, 50 20 Z" 
                  fill="#602D8C" 
                />
                {/* Orange Core Dot */}
                <circle cx="50" cy="45" r="12" fill="#FF8200" />
              </svg>
              
              {/* Aurigene & Dr. Reddy's Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-base font-bold tracking-tight leading-none text-white font-sans">
                  aurigene
                </span>
                <span className="text-[7px] sm:text-[9px] font-sans font-medium text-[#FF8200] leading-tight mt-0.5">
                  A Dr. Reddy's Company
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              CDMO & Tech Transfer Partner
            </span>
          </div>

          {/* Center: Tech Transfer Connection Symbol */}
          <div className="col-span-3 flex flex-col items-center justify-center px-1">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-gold/15 border-2 border-brand-gold shadow-lg shadow-brand-gold/10">
              {/* Manufacturing Transfer Flow Symbol */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            
            {/* Connection Label */}
            <div className="mt-2 text-center">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold text-brand-gold uppercase tracking-wider">
                20+ Products
              </span>
              <span className="block text-[7px] sm:text-[9px] font-mono text-white/60 tracking-tight">
                Global Tech Transfer
              </span>
            </div>
          </div>

          {/* Right Company: Global Pharma Partner */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-1.5 sm:gap-2">
              {/* Global Pharma Multinational Shield Emblem */}
              <svg viewBox="0 0 100 100" className="h-7 sm:h-10 w-auto shrink-0" fill="none">
                <rect x="15" y="15" width="70" height="70" rx="12" stroke="#3B82F6" strokeWidth="6" fill="#1E3A8A" fillOpacity="0.4" />
                <path d="M30 50 H70 M50 30 V70" stroke="#60A5FA" strokeWidth="8" strokeLinecap="round" />
              </svg>
              
              {/* Global Partner Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm md:text-base font-serif font-bold tracking-wide leading-none text-white uppercase">
                  GLOBAL PHARMA
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-blue-400 uppercase font-semibold mt-0.5">
                  Multinational Enterprise
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Innovator · Brand Owner
            </span>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-white/50">
        <span>DR. REDDY'S LABORATORIES (NSE: DRREDDY)</span>
        <span>US, EU, CANADA & EM COMMERCIAL MARKETS</span>
      </div>
    </div>
  );
};
