import { Target, Shield, CheckSquare, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface HeroMechanismDiagramProps {
  darkMode?: boolean;
}

export default function HeroMechanismDiagram({ darkMode = true }: HeroMechanismDiagramProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#071A2E] overflow-hidden border border-brand-gold/30 p-2 sm:p-4 group select-none">
      {/* Background subtle radial glow and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.12)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Responsive Vector Mechanism Visual */}
      <div className="w-full h-full max-w-2xl flex flex-col justify-between py-2 relative z-10">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between border-b border-brand-gold/20 pb-2">
          <span className="font-mono text-[10px] sm:text-xs text-brand-gold font-bold tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping inline-block" />
            PHARMASIGNAL MECHANISM MODEL
          </span>
          <span className="font-mono text-[9px] text-white/50 tracking-wider">
            VALUE CREATION & DESTRUCTION
          </span>
        </div>

        {/* Main Process Nodes Flow */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2 items-center my-auto relative">
          
          {/* Node 1: OPPORTUNITY */}
          <div className="flex flex-col items-center text-center group/node">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-gold bg-[#0A1A2E] flex items-center justify-center text-brand-gold shadow-lg transition-transform duration-300 group-hover/node:scale-110">
              <Target size={18} />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-wider mt-2">
              OPPORTUNITY
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] text-white/60">
              Upstream
            </span>
          </div>

          {/* Node 2: APPROVAL */}
          <div className="flex flex-col items-center text-center group/node relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-gold bg-[#0A1A2E] flex items-center justify-center text-brand-gold shadow-lg transition-transform duration-300 group-hover/node:scale-110">
              <Shield size={18} />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-wider mt-2">
              APPROVAL
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] text-brand-gold/90 font-medium">
              Approval Gap
            </span>
          </div>

          {/* Node 3: SIGNING */}
          <div className="flex flex-col items-center text-center group/node">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-gold bg-[#0A1A2E] flex items-center justify-center text-brand-gold shadow-lg transition-transform duration-300 group-hover/node:scale-110">
              <CheckSquare size={18} />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-wider mt-2">
              SIGNING
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] text-white/60">
              Contract
            </span>
          </div>

          {/* Node 4: EXECUTION */}
          <div className="flex flex-col items-center text-center group/node">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-gold bg-[#0A1A2E] flex items-center justify-center text-brand-gold shadow-lg transition-transform duration-300 group-hover/node:scale-110">
              <Settings size={18} />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-wider mt-2">
              EXECUTION
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] text-brand-gold/90 font-medium">
              Execution Deficit
            </span>
          </div>

        </div>

        {/* Branching Outcomes: Value Created vs Value Lost */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-gold/20">
          
          {/* Outcome 1: Value Created */}
          <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full shrink-0">
              <TrendingUp size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block tracking-wider">
                VALUE CREATED
              </span>
              <span className="font-sans text-[9px] text-white/70 block">
                Aligned Readiness &amp; Transition
              </span>
            </div>
          </div>

          {/* Outcome 2: Value Lost */}
          <div className="p-2.5 bg-rose-950/30 border border-rose-500/40 flex items-center gap-2.5">
            <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-full shrink-0">
              <TrendingDown size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-rose-400 font-bold uppercase block tracking-wider">
                VALUE LOST
              </span>
              <span className="font-sans text-[9px] text-white/70 block">
                Approval Gap &amp; Value Leakage
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Subtle overlay badge */}
      <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none hidden sm:block">
        <span className="font-mono text-[8px] tracking-widest text-brand-gold bg-[#071A2E]/95 py-0.5 px-2 border border-brand-gold/30 font-semibold uppercase backdrop-blur-sm shadow-md block">
          Decision Intelligence
        </span>
      </div>
    </div>
  );
}
