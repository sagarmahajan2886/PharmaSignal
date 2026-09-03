import { motion } from 'motion/react';

interface ApprovalGapDiagramProps {
  darkMode?: boolean;
}

export default function ApprovalGapDiagram({ darkMode = false }: ApprovalGapDiagramProps) {
  const strokeColor = darkMode ? '#FFFFFF' : '#0B121E';
  const strokeColorDim = darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 18, 30, 0.35)';
  const textColorPrimary = darkMode ? '#FFFFFF' : '#0B121E';
  const textColorSecondary = darkMode ? '#94A3B8' : '#475569';
  const goldColor = '#D9A441';
  const fillChasm = darkMode ? '#112235' : '#F1F5F9';
  const bgBox = darkMode ? '#0C1C2D' : '#F8FAFC';

  return (
    <div className="w-full flex justify-center py-4 bg-transparent">
      <div className="w-full max-w-2xl select-none overflow-visible">
        <svg viewBox="0 0 650 630" className="w-full h-auto overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* DEFINITIONS & STYLES */}
          <defs>
            <style>
              {`
                .diag-font-title { font-family: 'Playfair Display', serif; font-weight: 700; }
                .diag-font-subtitle { font-family: 'Playfair Display', serif; font-style: italic; }
                .diag-font-sans { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.05em; }
                .diag-font-list { font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 0.07em; }
                .diag-font-box { font-family: 'Playfair Display', serif; font-weight: 500; font-style: italic; }
              `}
            </style>
          </defs>

          {/* MAIN TITLES */}
          <text x="325" y="40" textAnchor="middle" className="diag-font-title text-xl sm:text-2xl" fill={textColorPrimary}>
            THE APPROVAL GAP
          </text>
          <text x="325" y="70" textAnchor="middle" className="diag-font-subtitle text-xs sm:text-sm" fill={textColorSecondary}>
            Why attractive opportunities lose momentum before approval.
          </text>

          {/* LEFT COLUMN: COMMERCIAL ATTRACTIVENESS */}
          <g transform="translate(140, 0)">
            <text x="0" y="122" textAnchor="middle" className="diag-font-sans text-[11px]" fill={textColorPrimary}>
              COMMERCIAL
            </text>
            <text x="0" y="137" textAnchor="middle" className="diag-font-sans text-[11px]" fill={textColorPrimary}>
              ATTRACTIVENESS
            </text>

            {/* Bullseye Arrow Icon */}
            <g transform="translate(0, 190)">
              {/* Target Circles */}
              <circle cx="0" cy="0" r="30" stroke={strokeColor} strokeWidth="1.75" />
              <circle cx="0" cy="0" r="20" stroke={strokeColor} strokeWidth="1.25" />
              <circle cx="0" cy="0" r="10" stroke={strokeColor} strokeWidth="1.25" />
              <circle cx="0" cy="0" r="2.5" fill={goldColor} />
              
              {/* Target lines (crosshair lines) */}
              <line x1="-34" y1="0" x2="-30" y2="0" stroke={strokeColor} strokeWidth="1" />
              <line x1="30" y1="0" x2="34" y2="0" stroke={strokeColor} strokeWidth="1" />
              <line x1="0" y1="-34" x2="0" y2="-30" stroke={strokeColor} strokeWidth="1" />
              <line x1="0" y1="30" x2="0" y2="34" stroke={strokeColor} strokeWidth="1" />

              {/* Arrow coming from top-right to center */}
              <line x1="32" y1="-32" x2="4" y2="-4" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
              <path d="M 8 -1 Q 3 -3 2 -8 L 4 -4 L 8 -1 Z" fill={goldColor} />
              
              {/* Arrow Feathers */}
              <line x1="28" y1="-36" x2="36" y2="-28" stroke={goldColor} strokeWidth="1.5" />
              <line x1="31" y1="-39" x2="39" y2="-31" stroke={goldColor} strokeWidth="1.5" />
            </g>
          </g>

          {/* RIGHT COLUMN: EXECUTION READINESS */}
          <g transform="translate(510, 0)">
            <text x="0" y="122" textAnchor="middle" className="diag-font-sans text-[11px]" fill={textColorPrimary}>
              EXECUTION
            </text>
            <text x="0" y="137" textAnchor="middle" className="diag-font-sans text-[11px]" fill={textColorPrimary}>
              READINESS
            </text>

            {/* Checklist Clipboard Icon */}
            <g transform="translate(0, 190)">
              {/* Clipboard Body */}
              <rect x="-18" y="-24" width="36" height="48" rx="3" stroke={strokeColor} strokeWidth="1.75" />
              {/* Clipboard clip */}
              <path d="M -8 -24 L -8 -28 Q -8 -30 -6 -30 L 6 -30 Q 8 -30 8 -24" fill="none" stroke={strokeColor} strokeWidth="1.75" />
              
              {/* Row 1 Checklist */}
              <path d="M -11 -12 l 2.5 2.5 l 5 -5" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="-12" x2="11" y2="-12" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

              {/* Row 2 Checklist */}
              <path d="M -11 0 l 2.5 2.5 l 5 -5" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="0" x2="11" y2="0" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

              {/* Row 3 Checklist */}
              <path d="M -11 12 l 2.5 2.5 l 5 -5" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="12" x2="11" y2="12" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>

          {/* CLIFF RAVINES & MAIN BENCH LAND */}
          {/* Flat terrain lines */}
          <line x1="50" y1="280" x2="222" y2="280" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="428" y1="280" x2="600" y2="280" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

          {/* Left Cliff Chasm (Filled & Outlined) */}
          <path d="M 138 280 L 222 280 L 210 295 L 215 315 L 205 340 L 213 365 L 198 400 L 204 435 L 194 470 L 202 510 L 201 510 L 194 480 L 189 450 L 173 410 L 183 375 L 168 340 L 173 310 S 142 290 138 280 Z" 
            fill={fillChasm} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />

          {/* Right Cliff Chasm (Filled & Outlined) */}
          <path d="M 428 280 L 512 280 L 500 295 L 493 315 L 485 340 L 475 375 L 467 410 L 460 450 L 454 480 L 448 510 L 447 510 L 452 470 L 443 435 L 449 400 L 436 365 L 443 340 L 434 315 L 439 295 Z" 
            fill={fillChasm} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />

          {/* CENTRAL GAP: DOUBLE-HEADED DASHED ARROW */}
          <line x1="234" y1="280" x2="416" y2="280" stroke={goldColor} strokeWidth="1.75" strokeDasharray="5 4" />
          {/* Arrow points */}
          <path d="M 241 274 L 232 280 L 241 286" fill="none" stroke={goldColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 409 274 L 418 280 L 409 286" fill="none" stroke={goldColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />

          {/* Gap label */}
          <text x="325" y="265" textAnchor="middle" className="diag-font-sans text-[11px]" fill={goldColor}>
            APPROVAL GAP
          </text>

          {/* INNER GAP MECHANIC LIST */}
          <g transform="translate(0, 10)">
            {/* Row 1: Evidence Uncertainty */}
            <g transform="translate(240, 325)">
              <path d="M -8 -8 c 0 0 8 -2 8 -2 s 8 2 8 2 v 6 c 0 3.5 -3 7 -8 9 c -5 -2 -8 -5.5 -8 -9 z" 
                fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" />
              <text x="18" y="4" textAnchor="start" className="diag-font-list text-[10px]" fill={textColorPrimary}>
                EVIDENCE UNCERTAINTY
              </text>
            </g>

            {/* Row 2: Organizational Alignment */}
            <g transform="translate(240, 375)">
              <circle cx="0" cy="0" r="9" fill="none" stroke={goldColor} strokeWidth="1.5" />
              <path d="M -4 0 L 0 4 L 5 -3" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="18" y="4" textAnchor="start" className="diag-font-list text-[10px]" fill={textColorPrimary}>
                ORGANIZATIONAL ALIGNMENT
              </text>
            </g>

            {/* Row 3: Risk Aversion */}
            <g transform="translate(240, 425)">
              <path d="M 0 -10 L 10 7 L -10 7 Z" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="0" y1="-5" x2="0" y2="1" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="0" cy="4" r="1.25" fill={goldColor} />
              <text x="18" y="4" textAnchor="start" className="diag-font-list text-[10px]" fill={textColorPrimary}>
                RISK AVERSION
              </text>
            </g>

            {/* Row 4: Resource Friction */}
            <g transform="translate(240, 475)">
              <circle cx="0" cy="0" r="9" fill="none" stroke={goldColor} strokeWidth="1.5" />
              <path d="M 0 -6 L 0 0 L 4 2" fill="none" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="18" y="4" textAnchor="start" className="diag-font-list text-[10px]" fill={textColorPrimary}>
                RESOURCE FRICTION
              </text>
            </g>
          </g>

          {/* BOTTOM SUMMARY BOARD */}
          <g transform="translate(325, 560)">
            <rect x="-160" y="-28" width="320" height="56" rx="0" fill={bgBox} stroke={strokeColor} strokeWidth="1.5" />
            <text x="0" y="-4" textAnchor="middle" className="diag-font-box text-xs sm:text-[13px]" fill={textColorPrimary}>
              Individually rational decisions.
            </text>
            <text x="0" y="16" textAnchor="middle" className="diag-font-box text-xs sm:text-[13px]" fill={textColorPrimary}>
              Collectively slow decisions.
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
