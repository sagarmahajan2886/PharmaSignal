// @ts-ignore
import flowDiagramImg from '../assets/images/pharmasignal_flow_diagram_1785779062252.jpg';

interface HeroMechanismDiagramProps {
  darkMode?: boolean;
}

export default function HeroMechanismDiagram({ darkMode = true }: HeroMechanismDiagramProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#071A2E] overflow-hidden border border-brand-gold/30 p-2 sm:p-3 group">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Main flow diagram visual */}
      <img
        src={flowDiagramImg}
        alt="PharmaSignal Value Creation and Destruction Mechanism Flow"
        className="w-full h-full object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        referrerPolicy="no-referrer"
      />

      {/* Subtle overlay badge */}
      <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
        <span className="font-mono text-[9px] tracking-widest text-[#D9A441] bg-[#071A2E]/95 py-1 px-2.5 border border-brand-gold/40 font-semibold uppercase backdrop-blur-sm shadow-md block">
          Value Creation &amp; Destruction Mechanism
        </span>
      </div>
    </div>
  );
}

