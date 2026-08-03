import { motion } from 'motion/react';

interface HeroMechanismDiagramProps {
  darkMode?: boolean;
}

export default function HeroMechanismDiagram({ darkMode = true }: HeroMechanismDiagramProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#030B15] overflow-hidden border border-brand-gold/25 group">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-radial from-brand-gold/10 via-transparent to-transparent opacity-40 pointer-events-none" />
      
      {/* Main visual image */}
      <img
        src="/images/pharmasignal_flow_diagram.jpg"
        alt="PharmaSignal Value Creation and Destruction Mechanism Flow"
        className="w-full h-full object-cover sm:object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        onError={(e) => {
          // Fallback to root path if public/images fails
          (e.target as HTMLImageElement).src = "/pharmasignal_flow_diagram.jpg";
        }}
      />

      {/* Subtle overlay badge */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
        <span className="font-mono text-[9px] tracking-widest text-[#D9A441] bg-[#071A2E]/90 py-1 px-2.5 border border-brand-gold/30 font-semibold uppercase backdrop-blur-sm shadow-md">
          Value Creation &amp; Destruction Mechanism
        </span>
      </div>
    </div>
  );
}

