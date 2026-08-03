import { motion } from 'motion/react';

interface HeroMechanismDiagramProps {
  darkMode?: boolean;
}

export default function HeroMechanismDiagram({ darkMode = true }: HeroMechanismDiagramProps) {
  const goldColor = '#D9A441';
  const textColorPrimary = darkMode ? '#FFFFFF' : '#071A2E';
  const textColorDim = darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(7,26,46,0.7)';
  const boxBg = darkMode ? '#0A1A2E' : '#FFFFFF';
  const borderColor = darkMode ? 'rgba(217, 164, 65, 0.35)' : 'rgba(217, 164, 65, 0.5)';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 sm:p-4 bg-[#071A2E] border border-brand-gold/30">
      <svg viewBox="0 0 600 360" className="w-full h-auto max-h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            {`
              .hm-title { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: 0.05em; }
              .hm-box-title { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.08em; font-size: 11px; }
              .hm-sub { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 9px; }
            `}
          </style>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9A441" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D9A441" stopOpacity="0.8" />
          </linearGradient>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill={goldColor} />
          </marker>
        </defs>

        {/* Title */}
        <text x="300" y="32" textAnchor="middle" className="hm-title" fill={goldColor} fontSize="14">
          VALUE CREATION & DESTRUCTION MECHANISM
        </text>

        {/* Process Flow: 4 Nodes */}
        {/* Node 1: Opportunity */}
        <g transform="translate(30, 80)">
          <rect x="0" y="0" width="110" height="70" rx="2" fill={boxBg} stroke={borderColor} strokeWidth="1.5" />
          <text x="55" y="32" textAnchor="middle" className="hm-box-title" fill={textColorPrimary}>
            OPPORTUNITY
          </text>
          <text x="55" y="48" textAnchor="middle" className="hm-sub" fill={textColorDim}>
            Market Signal
          </text>
        </g>

        {/* Arrow 1 */}
        <line x1="140" y1="115" x2="168" y2="115" stroke={goldColor} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Node 2: Decision Friction */}
        <g transform="translate(170, 80)">
          <rect x="0" y="0" width="120" height="70" rx="2" fill={boxBg} stroke={goldColor} strokeWidth="1.5" />
          <text x="60" y="30" textAnchor="middle" className="hm-box-title" fill={goldColor}>
            DECISION
          </text>
          <text x="60" y="44" textAnchor="middle" className="hm-box-title" fill={goldColor}>
            FRICTION
          </text>
          <text x="60" y="58" textAnchor="middle" className="hm-sub" fill={textColorDim}>
            Approval Gap
          </text>
        </g>

        {/* Arrow 2 */}
        <line x1="290" y1="115" x2="318" y2="115" stroke={goldColor} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Node 3: Execution Risk */}
        <g transform="translate(320, 80)">
          <rect x="0" y="0" width="120" height="70" rx="2" fill={boxBg} stroke={goldColor} strokeWidth="1.5" />
          <text x="60" y="30" textAnchor="middle" className="hm-box-title" fill={goldColor}>
            EXECUTION
          </text>
          <text x="60" y="44" textAnchor="middle" className="hm-box-title" fill={goldColor}>
            RISK
          </text>
          <text x="60" y="58" textAnchor="middle" className="hm-sub" fill={textColorDim}>
            Transition Deficit
          </text>
        </g>

        {/* Arrow 3 */}
        <line x1="440" y1="115" x2="468" y2="115" stroke={goldColor} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Node 4: Value Outcome */}
        <g transform="translate(470, 65)">
          <rect x="0" y="0" width="110" height="100" rx="2" fill={boxBg} stroke={borderColor} strokeWidth="1.5" />
          <text x="55" y="30" textAnchor="middle" className="hm-box-title" fill="#10B981">
            VALUE
          </text>
          <text x="55" y="44" textAnchor="middle" className="hm-box-title" fill="#10B981">
            CREATED
          </text>
          <line x1="15" y1="52" x2="95" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="55" y="70" textAnchor="middle" className="hm-box-title" fill="#EF4444">
            VALUE
          </text>
          <text x="55" y="84" textAnchor="middle" className="hm-box-title" fill="#EF4444">
            LOST
          </text>
        </g>

        {/* Connecting Mechanism Diagram Axis */}
        <path d="M 85 180 L 525 180" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        
        {/* Lower Annotation Box */}
        <g transform="translate(80, 210)">
          <rect x="0" y="0" width="440" height="110" rx="2" fill="#030C16" stroke="rgba(217, 164, 65, 0.25)" strokeWidth="1" />
          <text x="220" y="32" textAnchor="middle" className="hm-box-title" fill={goldColor}>
            PHARMASIGNAL DECISION INTELLIGENCE
          </text>
          <text x="220" y="58" textAnchor="middle" className="hm-sub" fill={textColorPrimary} fontSize="11">
            De-risking pharma deals before approval, after signing &amp; during execution.
          </text>
          <text x="220" y="82" textAnchor="middle" className="hm-sub" fill={textColorDim} fontSize="10" fontStyle="italic">
            Opportunity Advantage → Decision Alignment → Execution Value Realization
          </text>
        </g>
      </svg>
    </div>
  );
}
