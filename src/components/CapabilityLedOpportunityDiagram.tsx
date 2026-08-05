import React from 'react';

export const CapabilityLedOpportunityDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-5 sm:p-8 flex flex-col justify-between select-none rounded-none shadow-2xl ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar / label */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL MECHANISM MAP</span>
        <span className="opacity-80">CAPABILITY-LED OPPORTUNITY CREATION</span>
      </div>

      {/* Main Diagram Center Flow */}
      <div className="my-auto py-2 sm:py-4">
        <div className="grid grid-cols-11 gap-1 sm:gap-2 items-center text-center">
          
          {/* Left Block: RELATION CAPABILITY (White) */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-3 sm:py-4 px-1 bg-white/5 border border-white/20 font-serif font-bold text-xs sm:text-sm md:text-base text-white tracking-wide shadow-md uppercase">
              RELATION CAPABILITY
            </div>
          </div>

          {/* Directional Gold Arrow 1 */}
          <div className="col-span-1 flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-8 sm:h-8 text-brand-gold stroke-current" fill="none" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Center Block: PROPRIETARY EVIDENCE (Gold) */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-3 sm:py-4 px-1 bg-brand-gold/15 border-2 border-brand-gold font-serif font-bold text-xs sm:text-sm md:text-base text-brand-gold tracking-wide uppercase shadow-lg">
              PROPRIETARY EVIDENCE
            </div>
          </div>

          {/* Directional Gold Arrow 2 */}
          <div className="col-span-1 flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-8 sm:h-8 text-brand-gold stroke-current" fill="none" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right Block: GSK OPPORTUNITIES (White) */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-3 sm:py-4 px-1 bg-white/5 border border-white/20 font-serif font-bold text-xs sm:text-sm md:text-base text-white tracking-wide shadow-md uppercase">
              GSK OPPORTUNITIES
            </div>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-white/50">
        <span>GSK / RELATION COLLABORATION</span>
        <span>UP TO $110M UPSTREAM RESEARCH</span>
      </div>
    </div>
  );
};
