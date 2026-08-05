import React from 'react';

export const TerritoryExecutionTransferDiagram: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`w-full aspect-[16/9] max-w-2xl mx-auto border p-5 sm:p-8 flex flex-col justify-between select-none rounded-none shadow-2xl ${
      darkMode 
        ? 'bg-[#061526] border-brand-gold/30 text-white' 
        : 'bg-[#071A2E] border-brand-gold/40 text-white'
    }`}>
      {/* Header bar / label */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-white/10 pb-2.5 sm:pb-3">
        <span>PHARMASIGNAL MECHANISM MAP</span>
        <span className="opacity-80">TERRITORY-TO-EXECUTION TRANSFER</span>
      </div>

      {/* Main Diagram Center Flow */}
      <div className="my-auto py-2 sm:py-4">
        <div className="grid grid-cols-11 gap-1 sm:gap-2 items-center text-center">
          
          {/* Left Block: INNOVENT */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-3 sm:py-4 px-1.5 bg-white/5 border border-white/20 font-serif font-bold text-xs sm:text-lg md:text-xl text-white tracking-wide shadow-md">
              INNOVENT
            </div>
            <div className="mt-2.5 sm:mt-3 text-[9px] sm:text-xs font-mono text-white/80 tracking-wider font-semibold">
              Greater China retained
            </div>
          </div>

          {/* Directional Gold Arrow 1 */}
          <div className="col-span-1 flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-8 sm:h-8 text-brand-gold stroke-current" fill="none" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Center Block: EXECUTION TRANSFER */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-2.5 sm:py-3.5 px-1 bg-brand-gold/15 border-2 border-brand-gold font-mono font-bold text-[9px] sm:text-xs md:text-sm text-brand-gold tracking-widest uppercase shadow-lg">
              EXECUTION TRANSFER
            </div>
            <div className="mt-2.5 sm:mt-3 text-[8px] sm:text-[10px] font-mono text-brand-gold/80 tracking-wider uppercase">
              Operating Burden
            </div>
          </div>

          {/* Directional Gold Arrow 2 */}
          <div className="col-span-1 flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-8 sm:h-8 text-brand-gold stroke-current" fill="none" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right Block: SPERO */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-full py-3 sm:py-4 px-1.5 bg-white/5 border border-white/20 font-serif font-bold text-xs sm:text-lg md:text-xl text-white tracking-wide shadow-md">
              SPERO
            </div>
            <div className="mt-2.5 sm:mt-3 text-[9px] sm:text-xs font-mono text-white/80 tracking-wider font-semibold">
              Global ex-China assigned
            </div>
          </div>

        </div>
      </div>

      {/* Sub-caption / Footer line */}
      <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-white/50">
        <span>ASSET: SP001 (IBI355)</span>
        <span>EXCLUSIVE WORLDWIDE EX-GREATER CHINA</span>
      </div>
    </div>
  );
};
