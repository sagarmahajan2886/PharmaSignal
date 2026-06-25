import { motion } from 'motion/react';

interface ExecutionDeficitDiagramProps {
  darkMode?: boolean;
}

export default function ExecutionDeficitDiagram({ darkMode = false }: ExecutionDeficitDiagramProps) {
  const strokeColor = darkMode ? '#FFFFFF' : '#071A2E';
  const strokeColorDim = darkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(7, 26, 46, 0.25)';
  const textColorPrimary = darkMode ? '#FFFFFF' : '#071A2E';
  const textColorSecondary = darkMode ? '#94A3B8' : '#475569';
  const goldColor = '#D9A441';
  const fillBox = darkMode ? '#0C1C2D' : '#F4F6F8';
  const strokeBox = darkMode ? 'rgba(217, 164, 65, 0.3)' : 'rgba(7, 26, 46, 0.15)';

  return (
    <div className="w-full flex justify-center py-4 bg-transparent">
      <div className="w-full max-w-2xl select-none overflow-visible">
        <svg viewBox="0 0 650 640" className="w-full h-auto overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* DEFINITIONS & STYLES */}
          <defs>
            <style>
              {`
                .diag-title { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: 0.03em; }
                .diag-subtitle { font-family: 'Playfair Display', serif; font-style: italic; }
                .diag-label-bold { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.08em; }
                .diag-item-text { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: 0.03em; }
                .diag-caption { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500; }
              `}
            </style>
          </defs>

          {/* MAIN TITLES */}
          <text x="325" y="30" textAnchor="middle" className="diag-title text-xl sm:text-2xl" fill={textColorPrimary}>
            THE EXECUTION DEFICIT
          </text>
          <text x="325" y="55" textAnchor="middle" className="diag-subtitle text-xs sm:text-sm" fill={textColorSecondary}>
            The gap between a signed agreement and realized commercial success.
          </text>

          {/* LEFT CONTAINER: DEAL SYSTEM */}
          <g transform="translate(40, 90)">
            {/* Background Panel */}
            <rect x="0" y="0" width="180" height="280" rx="12" fill={fillBox} stroke={strokeBox} strokeWidth="1.5" />
            
            {/* Header Text */}
            <text x="90" y="32" textAnchor="middle" className="diag-label-bold text-[10px] tracking-widest font-bold" fill={goldColor}>
              DEAL SYSTEM
            </text>

            {/* Connecting Vertical Dotted Line */}
            <line x1="50" x2="50" y1="65" y2="235" stroke={strokeColorDim} strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Opportunity Item */}
            <g transform="translate(40, 75)">
              {/* Target / Bullseye Icon */}
              <circle cx="10" cy="0" r="10" stroke={goldColor} strokeWidth="1.5" />
              <circle cx="10" cy="0" r="6" stroke={goldColor} strokeWidth="1" />
              <circle cx="10" cy="0" r="2.5" fill={goldColor} />
              <line x1="10" y1="-13" x2="10" y2="-10" stroke={goldColor} strokeWidth="1.2" />
              <line x1="10" y1="10" x2="10" y2="13" stroke={goldColor} strokeWidth="1.2" />
              <line x1="-3" y1="0" x2="0" y2="0" stroke={goldColor} strokeWidth="1.2" />
              <line x1="20" y1="0" x2="23" y2="0" stroke={goldColor} strokeWidth="1.2" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Opportunity</text>
            </g>

            {/* Dots on line */}
            <circle cx="50" cy="115" r="3" fill={goldColor} />

            {/* Forecast Item */}
            <g transform="translate(40, 130)">
              {/* Bar Chart Icon */}
              <line x1="2" y1="8" x2="18" y2="8" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="-8" width="2.5" height="15" fill={goldColor} />
              <rect x="8.5" y="-3" width="2.5" height="10" fill={goldColor} />
              <rect x="13" y="-11" width="2.5" height="18" fill={goldColor} />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Forecast</text>
            </g>

            <circle cx="50" cy="170" r="3" fill={goldColor} />

            {/* Approval Item */}
            <g transform="translate(40, 185)">
              {/* Shield Icon */}
              <path d="M 10 -10 C 13 -10 18 -12 18 -12 C 18 -12 18 1 18 4 C 18 9 14 13 10 15 C 6 13 2 9 2 4 C 2 1 2 -12 2 -12 C 2 -12 7 -10 10 -10 Z" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 6 2.5 L 9 5.5 L 14 -1" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Approval</text>
            </g>

            <circle cx="50" cy="225" r="3" fill={goldColor} />

            {/* Signature Item */}
            <g transform="translate(40, 240)">
              {/* Pen Signature Icon */}
              <path d="M 4 8 L 13 -1 L 11 -3 L 2 6 L 1 9 Z" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              <path d="M 2 9 L 17 9 C 14 9 12 12 10 12 C 8 12 6 9 5 9" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Signature</text>
            </g>
          </g>

          {/* RIGHT CONTAINER: EXECUTION SYSTEM */}
          <g transform="translate(430, 90)">
            {/* Background Panel */}
            <rect x="0" y="0" width="180" height="280" rx="12" fill={fillBox} stroke={strokeBox} strokeWidth="1.5" />
            
            {/* Header Text */}
            <text x="90" y="32" textAnchor="middle" className="diag-label-bold text-[10px] tracking-widest font-bold" fill={goldColor}>
              EXECUTION SYSTEM
            </text>

            {/* Connecting Vertical Dotted Line */}
            <line x1="50" x2="50" y1="65" y2="235" stroke={strokeColorDim} strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Regulatory Item */}
            <g transform="translate(40, 75)">
              {/* Doc check Icon */}
              <rect x="2" y="-9" width="15" height="18" rx="1.5" stroke={goldColor} strokeWidth="1.5" />
              <path d="M 6 1 L 8 3 L 12 -2" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Regulatory</text>
            </g>

            <circle cx="50" cy="115" r="3" fill={goldColor} />

            {/* PMO Item */}
            <g transform="translate(40, 130)">
              {/* Network / Nodes Icon */}
              <circle cx="10" cy="-6" r="3" stroke={goldColor} strokeWidth="1.5" />
              <circle cx="4" cy="5" r="3" stroke={goldColor} strokeWidth="1.5" />
              <circle cx="16" cy="5" r="3" stroke={goldColor} strokeWidth="1.5" />
              <line x1="8" y1="-3" x2="5" y2="2" stroke={goldColor} strokeWidth="1.2" />
              <line x1="12" y1="-3" x2="15" y2="2" stroke={goldColor} strokeWidth="1.2" />
              <line x1="7" y1="5" x2="13" y2="5" stroke={goldColor} strokeWidth="1.2" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>PMO</text>
            </g>

            <circle cx="50" cy="170" r="3" fill={goldColor} />

            {/* Commercial Item */}
            <g transform="translate(40, 185)">
              {/* Megaphone Icon */}
              <path d="M 3 -3 L 10 -3 L 15 -7 L 17 -7 L 17 7 L 15 7 L 10 3 L 3 3 Z" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 7 3 L 8 7 L 11 7 L 10 3" stroke={goldColor} strokeWidth="1.5" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Commercial</text>
            </g>

            <circle cx="50" cy="225" r="3" fill={goldColor} />

            {/* Launch Item */}
            <g transform="translate(40, 240)">
              {/* Rocket Icon */}
              <path d="M 10 -9 C 10 -9 15 -4 15 3 C 15 6 13 8 13 8 L 10 6 L 7 8 C 7 8 5 6 5 3 C 5 -4 10 -9 10 -9 Z" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 7 8 L 5 11 L 8 10 L 10 13 L 12 10 L 15 11 L 13 8" stroke={goldColor} strokeWidth="1.2" strokeLinejoin="round" />
              <text x="35" y="4" className="diag-item-text text-xs" fill={textColorPrimary}>Launch</text>
            </g>
          </g>

          {/* CENTER GAP: FRAYED/BROKEN ROPE */}
          <g transform="translate(220, 230)">
            {/* Left Rope segment */}
            <path d="M 0 0 C 15 0 25 -5 45 -5 C 55 -5 65 -3 70 0" stroke={goldColor} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 0 -1.5 C 15 -1.5 25 -6.5 45 -6.5 C 55 -6.5 65 -4.5 70 -1.5" stroke={darkMode ? '#071A2E' : '#FFFFFF'} strokeWidth="1" />
            {/* Frayed Ends Left */}
            <path d="M 70 0 C 73 -1 76 -5 78 -6" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 70 -1 C 74 1 77 4 79 5" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 69 1 C 72 2 75 3 78 3" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Center Broken Dust particles */}
            <circle cx="95" cy="-2" r="1.5" fill={goldColor} />
            <circle cx="100" cy="5" r="1.2" fill={goldColor} />
            <circle cx="110" cy="-6" r="1.5" fill={goldColor} />
            <circle cx="115" cy="2" r="1" fill={goldColor} />

            {/* Right Rope segment */}
            <path d="M 210 0 C 195 0 185 -5 165 -5 C 155 -5 145 -3 140 0" stroke={goldColor} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 210 -1.5 C 195 -1.5 185 -6.5 165 -6.5 C 155 -6.5 145 -4.5 140 -1.5" stroke={darkMode ? '#071A2E' : '#FFFFFF'} strokeWidth="1" />
            {/* Frayed Ends Right */}
            <path d="M 140 0 C 137 -1 134 -5 132 -6" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 140 -1 C 136 1 133 4 131 5" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 141 1 C 138 2 135 3 132 3" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />

            {/* Labels inside the gap */}
            <text x="105" y="-35" textAnchor="middle" className="diag-label-bold text-[11px] tracking-[0.15em] font-black" fill={goldColor}>
              EXECUTION
            </text>
            <text x="105" y="-18" textAnchor="middle" className="diag-label-bold text-[11px] tracking-[0.15em] font-black" fill={goldColor}>
              DEFICIT
            </text>
          </g>

          {/* LOWER GRID: FOUR KEY CAUSES */}
          <g transform="translate(60, 420)">
            {/* Item 1: Weak transition */}
            <g transform="translate(30, 0)">
              {/* Broken Chain Icon */}
              <g transform="translate(15, -15)">
                {/* Left ring */}
                <rect x="-8" y="-4" width="10" height="8" rx="3" stroke={goldColor} strokeWidth="1.5" fill="none" />
                {/* Right ring */}
                <rect x="1" y="-2" width="10" height="8" rx="3" stroke={goldColor} strokeWidth="1.5" fill="none" transform="rotate(25)" />
                {/* Break sparks */}
                <line x1="-1" y1="-8" x2="-2" y2="-11" stroke={goldColor} strokeWidth="1" />
                <line x1="2" y1="-8" x2="4" y2="-11" stroke={goldColor} strokeWidth="1" />
                <line x1="0" y1="8" x2="1" y2="11" stroke={goldColor} strokeWidth="1" />
              </g>
              <text x="15" y="20" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                Weak
              </text>
              <text x="15" y="34" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                transition
              </text>
            </g>

            {/* Vertical Separator 1 */}
            <line x1="120" y1="-25" x2="120" y2="40" stroke={strokeColorDim} strokeWidth="1" />

            {/* Item 2: Lost context */}
            <g transform="translate(150, 0)">
              {/* Head / Brain with dashed outline */}
              <g transform="translate(15, -15)">
                {/* Brain / thoughts silhouette */}
                <path d="M -5 6 C -5 6 -9 4 -9 0 C -9 -5 -5 -8 0 -8 C 5 -8 9 -5 9 0 C 9 3 7 5 5 7" stroke={goldColor} strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                <path d="M -5 6 L -3 10 L 3 10 L 5 7" stroke={goldColor} strokeWidth="1.5" fill="none" />
                <circle cx="-1" cy="-2" r="1.5" fill={goldColor} />
                <circle cx="3" cy="2" r="1" fill={goldColor} />
              </g>
              <text x="15" y="20" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                Lost
              </text>
              <text x="15" y="34" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                context
              </text>
            </g>

            {/* Vertical Separator 2 */}
            <line x1="260" y1="-25" x2="260" y2="40" stroke={strokeColorDim} strokeWidth="1" />

            {/* Item 3: Unclear ownership */}
            <g transform="translate(290, 0)">
              {/* User with question mark */}
              <g transform="translate(15, -15)">
                <circle cx="0" cy="-4" r="4.5" stroke={goldColor} strokeWidth="1.5" fill="none" />
                <path d="M -8 7 C -8 4 -4 2 0 2 C 4 2 8 4 8 7" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                {/* Small Question mark */}
                <path d="M 7 -8 C 7 -10 9 -10 9 -8 C 9 -7 8 -6 8 -5" stroke={goldColor} strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <circle cx="8" cy="-2.5" r="0.8" fill={goldColor} />
              </g>
              <text x="15" y="20" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                Unclear
              </text>
              <text x="15" y="34" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                ownership
              </text>
            </g>

            {/* Vertical Separator 3 */}
            <line x1="400" y1="-25" x2="400" y2="40" stroke={strokeColorDim} strokeWidth="1" />

            {/* Item 4: Slow follow-up */}
            <g transform="translate(430, 0)">
              {/* Hourglass Icon */}
              <g transform="translate(15, -15)">
                <line x1="-7" y1="-8" x2="7" y2="-8" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-7" y1="8" x2="7" y2="8" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M -6 -8 L -1 0 L -6 8" stroke={goldColor} strokeWidth="1.5" fill="none" />
                <path d="M 6 -8 L 1 0 L 6 8" stroke={goldColor} strokeWidth="1.5" fill="none" />
                {/* Sand */}
                <path d="M -3 -6 L 3 -6 L 1 -2 L -1 -2 Z" fill={goldColor} opacity="0.8" />
                <path d="M -2.5 5.5 L 2.5 5.5 L 4 7 L -4 7 Z" fill={goldColor} opacity="0.8" />
                <circle cx="0" cy="1" r="0.8" fill={goldColor} />
                <circle cx="0" cy="3" r="0.8" fill={goldColor} />
              </g>
              <text x="15" y="20" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                Slow
              </text>
              <text x="15" y="34" textAnchor="middle" className="diag-item-text text-[11px] font-semibold" fill={textColorPrimary}>
                follow-up
              </text>
            </g>
          </g>

          {/* BOTTOM RULE AND STATEMENT */}
          <g transform="translate(65, 545)">
            <line x1="0" y1="0" x2="520" y2="0" stroke={strokeBox} strokeWidth="1" />
            <text x="260" y="22" textAnchor="middle" className="diag-caption text-[13px] sm:text-sm italic font-medium" fill={textColorPrimary}>
              Projected value is often lost between <tspan fill={goldColor} className="font-bold font-serif italic">agreement</tspan> and <tspan fill={goldColor} className="font-bold font-serif italic">execution</tspan>.
            </text>
            <line x1="0" y1="36" x2="520" y2="36" stroke={strokeBox} strokeWidth="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}
