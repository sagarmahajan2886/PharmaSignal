import React from 'react';

export const CapabilityLedOpportunityDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-4 sm:p-7 flex flex-col justify-between select-none rounded-none shadow-2xl transition-all ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL DEAL SIGNAL</span>
        <span className="opacity-80">CAPABILITY-LED OPPORTUNITY CREATION</span>
      </div>

      {/* Main Center Area: Company Logos & Connection Symbol */}
      <div className="my-auto py-3 sm:py-6">
        <div className="grid grid-cols-11 gap-2 sm:gap-4 items-center">
          
          {/* Left Company: Relation Therapeutics Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-2">
              {/* Relation Network Graph Emblem */}
              <svg viewBox="0 0 100 100" className="h-8 sm:h-11 w-auto shrink-0" fill="none">
                <circle cx="50" cy="30" r="14" fill="#10B981" />
                <circle cx="30" cy="70" r="12" fill="#10B981" fillOpacity="0.8" />
                <circle cx="70" cy="70" r="12" fill="#10B981" fillOpacity="0.8" />
                <line x1="50" y1="30" x2="30" y2="70" stroke="#10B981" strokeWidth="4" />
                <line x1="50" y1="30" x2="70" y2="70" stroke="#10B981" strokeWidth="4" />
                <line x1="30" y1="70" x2="70" y2="70" stroke="#10B981" strokeWidth="4" />
              </svg>
              
              {/* Relation Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-base font-black tracking-widest leading-none text-white font-sans uppercase">
                  RELATION
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-emerald-400 uppercase font-semibold mt-0.5">
                  Discovery Engine
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Capability Originator
            </span>
          </div>

          {/* Center: Deal Connection Symbol */}
          <div className="col-span-3 flex flex-col items-center justify-center px-1">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-gold/15 border-2 border-brand-gold shadow-lg shadow-brand-gold/10">
              {/* Connection Symbol / Exchange Nodes */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Connection Label */}
            <div className="mt-2 text-center">
              <span className="block text-[8px] sm:text-[10px] font-mono font-bold text-brand-gold uppercase tracking-wider">
                Strategic Alliance
              </span>
              <span className="block text-[7px] sm:text-[9px] font-mono text-white/60 tracking-tight">
                Upstream Validation
              </span>
            </div>
          </div>

          {/* Right Company: GSK Logo */}
          <div className="col-span-4 flex flex-col items-center justify-center p-3 sm:p-5 bg-white/5 border border-white/15 rounded-sm hover:border-brand-gold/50 transition-colors">
            <div className="h-10 sm:h-14 flex items-center justify-center gap-2">
              {/* GSK Official Rounded Orange Emblem */}
              <svg viewBox="0 0 100 100" className="h-8 sm:h-11 w-auto shrink-0" fill="none">
                <rect x="10" y="10" width="80" height="80" rx="28" fill="#FF5429" />
                <text x="50" y="62" fill="white" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                  GSK
                </text>
              </svg>
              
              {/* GSK Wordmark */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-base font-black tracking-tight leading-none text-white font-sans">
                  GSK plc
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-[#FF5429] uppercase font-bold mt-0.5">
                  Global Pharma
                </span>
              </div>
            </div>
            <span className="mt-2 text-[8px] sm:text-[10px] font-mono text-brand-gold tracking-wider uppercase font-semibold">
              Commercial Acquirer
            </span>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-white/50">
        <span>RELATION THERAPEUTICS</span>
        <span>GSK PLC (LSE/NYSE: GSK)</span>
      </div>
    </div>
  );
};
