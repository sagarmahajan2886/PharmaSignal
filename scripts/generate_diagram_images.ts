import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

// 1. SK Biopharm x Biohaven Deal Card
const skSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#D4AF37" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Outer Card Frame -->
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  
  <!-- Subtle Grid Accent -->
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Header Bar -->
  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end" opacity="0.85">WORLDWIDE PLATFORM ACQUISITION</text>

  <!-- Left Box: SK Biopharmaceuticals -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- SK Logo Wings -->
    <g transform="translate(45, 70) scale(1.1)">
      <path d="M10 50 C20 40, 35 25, 45 15 C42 30, 38 45, 30 60 C22 58, 15 55, 10 50 Z" fill="#EA0029"/>
      <path d="M45 15 C55 25, 75 40, 90 50 C78 52, 65 48, 55 42 C48 35, 46 25, 45 15 Z" fill="#FF7A00"/>
      <path d="M30 60 C42 55, 52 50, 68 55 C55 65, 42 70, 30 60 Z" fill="#FF7A00"/>
    </g>

    <!-- SK Wordmark -->
    <text x="165" y="105" fill="#FFFFFF" font-size="34" font-weight="900" letter-spacing="-1">SK</text>
    <text x="165" y="132" fill="#E2E8F0" font-size="18" font-weight="500">biopharmaceuticals</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">BUYER · GLOBAL ACQUIRER</text>
  </g>

  <!-- Center Transaction Node -->
  <g transform="translate(600, 335)">
    <!-- Glow Ring -->
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#glow)"/>
    
    <!-- Arrows Icon -->
    <path d="M-10 14 V-14 M-10 -14 L-18 -6 M-10 -14 L-2 -6 M10 -14 V14 M10 14 L2 6 M10 14 L18 6" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Deal Amount & Terms -->
    <text x="0" y="90" fill="#D4AF37" font-size="20" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">$400M DEAL</text>
    <text x="0" y="116" fill="#94A3B8" font-size="14" font-family="monospace" text-anchor="middle">Worldwide Rights</text>
  </g>

  <!-- Right Box: Biohaven -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Biohaven Helix Emblem -->
    <g transform="translate(45, 65) scale(0.9)">
      <circle cx="50" cy="50" r="44" stroke="#00A3AD" stroke-width="6" stroke-dasharray="16 8" fill="none"/>
      <path d="M30 35 Q50 65 70 35" stroke="#00C49F" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M30 65 Q50 35 70 65" stroke="#00A3AD" stroke-width="8" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Biohaven Wordmark -->
    <text x="160" y="102" fill="#FFFFFF" font-size="34" font-weight="700" letter-spacing="-0.5">biohaven</text>
    <text x="162" y="130" fill="#00C49F" font-size="14" font-family="monospace" font-weight="700" letter-spacing="2">KV7 PLATFORM</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">LICENSOR · ORIGINATOR</text>
  </g>

  <!-- Footer Tickers -->
  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">SK BIOPHARMACEUTICALS (KRX: 326030)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">BIOHAVEN LTD (NYSE: BHVN)</text>
</svg>
`;

// 1B. Roche x Alnylam Deal Card ($2.8B RNAi Cardiovascular Alliance)
const rocheAlnylamSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGradRoche" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#00A3E0" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="675" fill="url(#bgGradRoche)"/>
  
  <!-- Outer Card Frame -->
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  
  <!-- Subtle Grid Accents -->
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Header Bar -->
  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#00A3E0" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">OPTION TRIGGER · $2.8B RNAI ALLIANCE</text>

  <!-- Left Box: Roche -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Roche Hexagon Logo -->
    <g transform="translate(45, 60)">
      <polygon points="45,10 80,30 80,70 45,90 10,70 10,30" fill="#0066CC" stroke="#004C99" stroke-width="4"/>
      <text x="45" y="58" fill="#FFFFFF" font-size="20" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="0.5">Roche</text>
    </g>

    <!-- Roche Wordmark & Info -->
    <text x="150" y="98" fill="#FFFFFF" font-size="28" font-weight="800">Roche</text>
    <text x="152" y="126" fill="#38BDF8" font-size="14" font-weight="600">Global Commercial Lead</text>

    <!-- Key Bullet / Detail -->
    <text x="40" y="180" fill="#94A3B8" font-size="12" font-family="sans-serif">
      <tspan x="40" dy="0">• Exercises Phase IIb expansion option</tspan>
      <tspan x="40" dy="18">• $310M development milestone trigger</tspan>
      <tspan x="40" dy="18">• Global commercial lead (ex-U.S.)</tspan>
    </text>

    <!-- Role Badge -->
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#0066CC" fill-opacity="0.15" stroke="#38BDF8" stroke-opacity="0.4"/>
    <text x="180" y="265" fill="#38BDF8" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">GLOBAL COMMERCIAL LEAD</text>
  </g>

  <!-- Center Transaction Node: RNAi Deal Trigger -->
  <g transform="translate(600, 335)">
    <!-- Glowing Node Circle -->
    <circle cx="0" cy="0" r="56" fill="#00A3E0" fill-opacity="0.15" stroke="#00A3E0" stroke-width="3" filter="url(#glowCyan)"/>
    
    <!-- Deal Flow Arrows & DNA Loop -->
    <path d="M-14 -12 L14 12 M14 -12 L-14 12" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="18" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="6 3"/>
    
    <!-- Deal Amount & Terms -->
    <text x="0" y="86" fill="#D4AF37" font-size="18" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">$310M TRIGGER</text>
    <text x="0" y="108" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="700" text-anchor="middle">U.S. 50/50 Profit Share</text>
    <text x="0" y="128" fill="#94A3B8" font-size="11" font-family="monospace" text-anchor="middle">Zilebesiran (Hypertension)</text>
  </g>

  <!-- Right Box: Alnylam -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Alnylam Helix / Star Emblem -->
    <g transform="translate(45, 60)">
      <circle cx="45" cy="50" r="38" fill="#002D62" stroke="#00A3E0" stroke-width="4"/>
      <path d="M25 35 Q45 65 65 35" stroke="#00C49F" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M25 65 Q45 35 65 65" stroke="#00A3E0" stroke-width="6" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Alnylam Wordmark & Info -->
    <text x="150" y="98" fill="#FFFFFF" font-size="28" font-weight="800">Alnylam</text>
    <text x="152" y="126" fill="#00C49F" font-size="14" font-weight="600">RNAi Originator &amp; Co-Lead</text>

    <!-- Key Bullet / Detail -->
    <text x="40" y="180" fill="#94A3B8" font-size="12" font-family="sans-serif">
      <tspan x="40" dy="0">• Originator of zilebesiran siRNA platform</tspan>
      <tspan x="40" dy="18">• 50/50 U.S. co-promotion &amp; profit split</tspan>
      <tspan x="40" dy="18">• Tiered double-digit royalties ex-U.S.</tspan>
    </text>

    <!-- Role Badge -->
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#00A3E0" fill-opacity="0.15" stroke="#00C49F" stroke-opacity="0.4"/>
    <text x="180" y="265" fill="#00C49F" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">RNAI ORIGINATOR &amp; CO-PROMOTION</text>
  </g>

  <!-- Footer Tickers -->
  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">ROCHE HOLDING AG (SIX: ROG / OTCQX: RHHBY)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">ALNYLAM PHARMACEUTICALS (NASDAQ: ALNY)</text>
</svg>
`;

// 1C. Kaigene x Taisho Japan Licensing Card
const kaigeneSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGradKai" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGradKai)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">TERRITORIAL DE-RISKING THROUGH LOCAL CAPABILITY</text>

  <!-- Left: Kaigene -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    <text x="180" y="90" fill="#FFFFFF" font-size="32" font-weight="800" text-anchor="middle">KAIGENE</text>
    <text x="180" y="120" fill="#38BDF8" font-size="14" font-weight="600" text-anchor="middle">FcRn Inhibitor (KG006)</text>
    <text x="40" y="170" fill="#94A3B8" font-size="13">
      <tspan x="40" dy="0">• Originator of KG006 FcRn platform</tspan>
      <tspan x="40" dy="20">• Receives $5M upfront + milestones &amp; royalties</tspan>
      <tspan x="40" dy="20">• Retains all rights outside Japan</tspan>
    </text>
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="265" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">ORIGINATOR · EX-JAPAN HOLDER</text>
  </g>

  <!-- Center -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3"/>
    <path d="M-18 0 H18 M4 -12 L18 0 L4 12" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="0" y="86" fill="#D4AF37" font-size="18" font-family="monospace" font-weight="800" text-anchor="middle">JAPAN LICENSE</text>
    <text x="0" y="108" fill="#94A3B8" font-size="13" font-family="monospace" text-anchor="middle">$5M Upfront + Milestones</text>
  </g>

  <!-- Right: Taisho -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    <text x="180" y="90" fill="#FFFFFF" font-size="32" font-weight="800" text-anchor="middle">TAISHO PHARMA</text>
    <text x="180" y="120" fill="#F87171" font-size="14" font-weight="600" text-anchor="middle">Established Japan Leader</text>
    <text x="40" y="170" fill="#94A3B8" font-size="13">
      <tspan x="40" dy="0">• Exclusive Japan development &amp; launch</tspan>
      <tspan x="40" dy="20">• Assumes PMDA clinical &amp; regulatory lead</tspan>
      <tspan x="40" dy="20">• De-risks complex Japanese reimbursement</tspan>
    </text>
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="265" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">JAPAN COMMERCIAL &amp; CLINICAL</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">KAIGENE BIOTECH</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">TAISHO PHARMACEUTICAL (TYO: 4581)</text>
</svg>
`;

// 1D. Merck Alimatravir Access Card
const merckSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGradMerck" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGradMerck)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#10B981" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">PRE-APPROVAL ACCESS ARCHITECTURE</text>

  <!-- Left: Merck -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    <text x="180" y="90" fill="#FFFFFF" font-size="32" font-weight="800" text-anchor="middle">MERCK &amp; CO.</text>
    <text x="180" y="120" fill="#10B981" font-size="14" font-weight="600" text-anchor="middle">Alimatravir (Oral HIV PrEP)</text>
    <text x="40" y="170" fill="#94A3B8" font-size="13">
      <tspan x="40" dy="0">• Investigational Phase III once-monthly HIV</tspan>
      <tspan x="40" dy="20">• Initiates voluntary licensing before approval</tspan>
      <tspan x="40" dy="20">• Provides initial product supply buffer</tspan>
    </text>
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.4"/>
    <text x="180" y="265" fill="#10B981" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">INNOVATOR · ACCESS ARCHITECT</text>
  </g>

  <!-- Center -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="3"/>
    <path d="M-18 0 H18 M4 -12 L18 0 L4 12" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="0" y="86" fill="#10B981" font-size="18" font-family="monospace" font-weight="800" text-anchor="middle">7 VOLUNTARY LICENSES</text>
    <text x="0" y="108" fill="#94A3B8" font-size="13" font-family="monospace" text-anchor="middle">129 Low- &amp; Middle-Income Countries</text>
  </g>

  <!-- Right: Generic & African Partners -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    <text x="180" y="90" fill="#FFFFFF" font-size="26" font-weight="800" text-anchor="middle">7 REGIONAL MFG</text>
    <text x="180" y="120" fill="#D4AF37" font-size="14" font-weight="600" text-anchor="middle">India &amp; Sub-Saharan Africa</text>
    <text x="40" y="170" fill="#94A3B8" font-size="13">
      <tspan x="40" dy="0">• Aurobindo, Cipla, Emcure, Viatris (India)</tspan>
      <tspan x="40" dy="20">• Aspen, Quality Chem, UCL (Africa)</tspan>
      <tspan x="40" dy="20">• Prepares manufacturing during Phase III</tspan>
    </text>
    <rect x="40" y="240" width="280" height="40" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="265" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">MANUFACTURING &amp; DISTRIBUTION</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">MERCK &amp; CO., INC. (NYSE: MRK)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">129 LMIC GLOBAL ACCESS NETWORK</text>
</svg>
`;

// 2. BMS x Cellares Deal Card
const bmsSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glowRose" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#F43F5E" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad2)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#F43F5E" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">ALLIANCE TERMINATION / SCALE CONSTRAINT</text>

  <!-- Left Box: BMS -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- BMS Logo Emblem -->
    <g transform="translate(45, 60) scale(1.0)">
      <path d="M20 75 C20 45, 30 20, 50 15 C60 12, 70 20, 65 35 C60 50, 45 60, 40 75 Z" fill="#4C12A1"/>
      <path d="M45 75 C45 55, 60 40, 75 30 C85 45, 80 65, 65 80 Z" fill="#EB1C24"/>
    </g>

    <!-- BMS Wordmark -->
    <text x="160" y="95" fill="#FFFFFF" font-size="26" font-weight="800">Bristol Myers</text>
    <text x="160" y="128" fill="#FFFFFF" font-size="26" font-weight="800">Squibb</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">BREYANZI INNOVATOR</text>
  </g>

  <!-- Center Transaction Node: Disconnect -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#F43F5E" fill-opacity="0.15" stroke="#F43F5E" stroke-width="3" filter="url(#glowRose)"/>
    <path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#FB7185" stroke-width="4.5" stroke-linecap="round"/>
    
    <text x="0" y="90" fill="#FB7185" font-size="20" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">TERMINATED</text>
    <text x="0" y="116" fill="#94A3B8" font-size="14" font-family="monospace" text-anchor="middle">$380M Scale Gap</text>
  </g>

  <!-- Right Box: Cellares -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Cellares Hexagon Emblem -->
    <g transform="translate(45, 60) scale(0.95)">
      <polygon points="50,10 88,32 88,78 50,98 12,78 12,32" stroke="#0080FF" stroke-width="6" fill="#00E5FF" fill-opacity="0.15"/>
      <circle cx="50" cy="55" r="16" fill="#00E5FF"/>
      <path d="M50 25 V39 M75 68 L63 60 M25 68 L37 60" stroke="#0080FF" stroke-width="4" stroke-linecap="round"/>
    </g>

    <text x="160" y="100" fill="#FFFFFF" font-size="30" font-weight="900" letter-spacing="2">CELLARES</text>
    <text x="162" y="128" fill="#00E5FF" font-size="14" font-family="monospace" font-weight="700" letter-spacing="2">CELL SHUTTLE</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">AUTOMATED MANUFACTURING</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">BRISTOL MYERS SQUIBB (NYSE: BMY)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">CELLARES CELL SHUTTLE PLATFORM</text>
</svg>
`;

// 3. Aurigene x Global Pharma Deal Card
const aurigeneSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#D4AF37" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad3)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end" opacity="0.85">TECH-TRANSFER AS PORTFOLIO ARCHITECTURE</text>

  <!-- Left Box: Aurigene -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Dr Reddy Heart Emblem -->
    <g transform="translate(45, 60) scale(1.0)">
      <path d="M50 20 C35 5, 10 20, 10 45 C10 65, 35 80, 50 90 C65 80, 90 65, 90 45 C90 20, 65 5, 50 20 Z" fill="#602D8C"/>
      <circle cx="50" cy="45" r="12" fill="#FF8200"/>
    </g>

    <text x="160" y="100" fill="#FFFFFF" font-size="32" font-weight="800">aurigene</text>
    <text x="162" y="128" fill="#FF8200" font-size="14" font-weight="600">A Dr. Reddy's Company</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">CDMO &amp; TECH TRANSFER PARTNER</text>
  </g>

  <!-- Center Transaction Node -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#glowGold)"/>
    <path d="M-18 0 H18 M4 -12 L18 0 L4 12" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="-18" cy="0" r="4" fill="#D4AF37"/>
    
    <text x="0" y="90" fill="#D4AF37" font-size="20" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">20+ PRODUCTS</text>
    <text x="0" y="116" fill="#94A3B8" font-size="14" font-family="monospace" text-anchor="middle">Global Tech Transfer</text>
  </g>

  <!-- Right Box: Global Pharma -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- Shield Emblem -->
    <g transform="translate(45, 60) scale(0.95)">
      <rect x="15" y="15" width="70" height="70" rx="12" stroke="#3B82F6" stroke-width="6" fill="#1E3A8A" fill-opacity="0.4"/>
      <path d="M30 50 H70 M50 30 V70" stroke="#60A5FA" stroke-width="8" stroke-linecap="round"/>
    </g>

    <text x="160" y="100" fill="#FFFFFF" font-size="24" font-weight="800" letter-spacing="1">GLOBAL PHARMA</text>
    <text x="162" y="128" fill="#60A5FA" font-size="14" font-family="monospace" font-weight="600">Multinational Enterprise</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">INNOVATOR · BRAND OWNER</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">DR. REDDY'S LABORATORIES (NSE: DRREDDY)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">US, EU, CANADA &amp; EM MARKETS</text>
</svg>
`;

// 4. GSK x Relation Therapeutics Deal Card
const gskSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glowGold2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#D4AF37" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad4)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end" opacity="0.85">CAPABILITY-LED OPPORTUNITY CREATION</text>

  <!-- Left Box: GSK -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- GSK Emblem -->
    <g transform="translate(45, 60) scale(1.0)">
      <circle cx="50" cy="50" r="40" fill="#F36633" fill-opacity="0.2" stroke="#F36633" stroke-width="4"/>
      <path d="M35 50 H65 M50 35 V65" stroke="#F36633" stroke-width="6" stroke-linecap="round"/>
    </g>

    <text x="160" y="105" fill="#FFFFFF" font-size="40" font-weight="900" letter-spacing="1">GSK</text>
    <text x="162" y="132" fill="#F36633" font-size="14" font-family="monospace" font-weight="600">Global Pharma</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">RESEARCH COLLABORATOR</text>
  </g>

  <!-- Center Transaction Node -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#glowGold2)"/>
    <path d="M-10 14 V-14 M-10 -14 L-18 -6 M-10 -14 L-2 -6 M10 -14 V14 M10 14 L2 6 M10 14 L18 6" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <text x="0" y="90" fill="#D4AF37" font-size="20" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">$110M DEAL</text>
    <text x="0" y="116" fill="#94A3B8" font-size="14" font-family="monospace" text-anchor="middle">AI Target Discovery</text>
  </g>

  <!-- Right Box: Relation Therapeutics -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <!-- AI Network Emblem -->
    <g transform="translate(45, 60) scale(0.95)">
      <circle cx="50" cy="50" r="42" stroke="#8B5CF6" stroke-width="5" fill="#6D28D9" fill-opacity="0.2"/>
      <circle cx="35" cy="40" r="8" fill="#A78BFA"/>
      <circle cx="65" cy="40" r="8" fill="#A78BFA"/>
      <circle cx="50" cy="65" r="8" fill="#A78BFA"/>
      <line x1="35" y1="40" x2="65" y2="40" stroke="#DDD6FE" stroke-width="3"/>
      <line x1="35" y1="40" x2="50" y2="65" stroke="#DDD6FE" stroke-width="3"/>
      <line x1="65" y1="40" x2="50" y2="65" stroke="#DDD6FE" stroke-width="3"/>
    </g>

    <text x="160" y="95" fill="#FFFFFF" font-size="26" font-weight="800">Relation</text>
    <text x="162" y="125" fill="#A78BFA" font-size="14" font-family="monospace" font-weight="700">THERAPEUTICS</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">AI BIOLOGY PLATFORM</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">GSK PLC (LSE/NYSE: GSK)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">RELATION THERAPEUTICS LTD</text>
</svg>
`;

// 5. Innovent x Spero Deal Card
const innoventSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
    <filter id="glowGold3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#D4AF37" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad5)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end" opacity="0.85">TERRITORY-TO-EXECUTION TRANSFER</text>

  <!-- Left Box: Innovent -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <g transform="translate(45, 60) scale(1.0)">
      <circle cx="50" cy="50" r="42" stroke="#EF4444" stroke-width="5" fill="#991B1B" fill-opacity="0.2"/>
      <path d="M30 50 Q50 30 70 50 Q50 70 30 50" fill="#F87171"/>
    </g>

    <text x="160" y="98" fill="#FFFFFF" font-size="30" font-weight="800">innovent</text>
    <text x="162" y="126" fill="#F87171" font-size="14" font-family="monospace" font-weight="600">BIOLOGICS</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">ORIGINATOR · CHINA LEAD</text>
  </g>

  <!-- Center Transaction Node -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#glowGold3)"/>
    <path d="M-18 0 H18 M4 -12 L18 0 L4 12" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="-18" cy="0" r="4" fill="#D4AF37"/>
    
    <text x="0" y="90" fill="#D4AF37" font-size="20" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">SP001 LICENSE</text>
    <text x="0" y="116" fill="#94A3B8" font-size="14" font-family="monospace" text-anchor="middle">Ex-China Rights</text>
  </g>

  <!-- Right Box: Spero -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <g transform="translate(45, 60) scale(0.95)">
      <polygon points="50,15 85,75 15,75" stroke="#06B6D4" stroke-width="5" fill="#0891B2" fill-opacity="0.2"/>
      <circle cx="50" cy="55" r="10" fill="#67E8F9"/>
    </g>

    <text x="160" y="100" fill="#FFFFFF" font-size="32" font-weight="800">SPERO</text>
    <text x="162" y="128" fill="#67E8F9" font-size="14" font-family="monospace" font-weight="600">THERAPEUTICS</text>

    <!-- Role Badge -->
    <rect x="40" y="225" width="280" height="42" rx="4" fill="#D4AF37" fill-opacity="0.1" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="180" y="252" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">EX-CHINA OPERATOR</text>
  </g>

  <text x="80" y="593" fill="#64748B" font-size="14" font-family="monospace">INNOVENT BIOLOGICS (HKEX: 1801)</text>
  <text x="1120" y="593" fill="#64748B" font-size="14" font-family="monospace" text-anchor="end">SPERO THERAPEUTICS (NASDAQ: SPRO)</text>
</svg>
`;

// 6. Approval Gap Card
const approvalGapSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad6" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2E" />
      <stop offset="100%" stop-color="#040E1B" />
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad6)"/>
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.4"/>
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DECISION INTELLIGENCE</text>
  <text x="1120" y="93" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end" opacity="0.85">DECISION FRICTION &amp; ALIGNMENT</text>

  <!-- Left: Commercial Attractiveness -->
  <g transform="translate(180, 200)">
    <circle cx="80" cy="80" r="50" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <circle cx="80" cy="80" r="30" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
    <circle cx="80" cy="80" r="10" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
    <circle cx="80" cy="80" r="4" fill="#D4AF37"/>
    <line x1="80" y1="20" x2="80" y2="140" stroke="#FFFFFF" stroke-width="1.5"/>
    <line x1="20" y1="80" x2="140" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
    
    <text x="80" y="180" fill="#FFFFFF" font-size="18" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">COMMERCIAL</text>
    <text x="80" y="205" fill="#FFFFFF" font-size="18" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">ATTRACTIVENESS</text>
  </g>

  <!-- Center: Approval Gap Chasm -->
  <g transform="translate(600, 200)">
    <line x1="-120" y1="80" x2="120" y2="80" stroke="#D4AF37" stroke-width="3" stroke-dasharray="8 6"/>
    <path d="M-110 70 L-125 80 L-110 90 M110 70 L125 80 L110 90" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round"/>
    <text x="0" y="55" fill="#D4AF37" font-size="22" font-family="monospace" font-weight="800" letter-spacing="2" text-anchor="middle">THE APPROVAL GAP</text>
    
    <rect x="-140" y="120" width="280" height="110" rx="6" fill="#FFFFFF" fill-opacity="0.04" stroke="#D4AF37" stroke-opacity="0.3"/>
    <text x="0" y="150" fill="#E2E8F0" font-size="13" font-family="monospace" font-weight="600" text-anchor="middle">EVIDENCE UNCERTAINTY</text>
    <text x="0" y="175" fill="#E2E8F0" font-size="13" font-family="monospace" font-weight="600" text-anchor="middle">ORGANIZATIONAL ALIGNMENT</text>
    <text x="0" y="200" fill="#E2E8F0" font-size="13" font-family="monospace" font-weight="600" text-anchor="middle">RISK &amp; RESOURCE FRICTION</text>
  </g>

  <!-- Right: Execution Readiness -->
  <g transform="translate(860, 200)">
    <rect x="35" y="30" width="90" height="110" rx="6" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <path d="M50 60 L60 70 L75 55 M50 90 L60 100 L75 85 M50 120 L60 130 L75 115" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="85" y1="60" x2="115" y2="60" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="85" y1="90" x2="115" y2="90" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="85" y1="120" x2="115" y2="120" stroke="#FFFFFF" stroke-width="2"/>

    <text x="80" y="180" fill="#FFFFFF" font-size="18" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">EXECUTION</text>
    <text x="80" y="205" fill="#FFFFFF" font-size="18" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="middle">READINESS</text>
  </g>

  <!-- Footer Takeaway -->
  <text x="600" y="593" fill="#D4AF37" font-size="15" font-family="serif" font-style="italic" text-anchor="middle">"Individually rational decisions. Collectively slow decisions."</text>
</svg>
`;

// 7. Haisco x Sentivera Newco Architecture Diagram (1600x900 / 1200x675)
const haiscoSvg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgNavyHaisco" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08182D" />
      <stop offset="100%" stop-color="#030A14" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1600" height="900" fill="url(#bgNavyHaisco)"/>

  <!-- Header & Outer Frame -->
  <rect x="60" y="45" width="1480" height="810" fill="#091C33" rx="14" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.45"/>
  
  <text x="100" y="100" fill="#D4AF37" font-size="18" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1500" y="100" fill="#38BDF8" font-size="16" font-family="monospace" font-weight="700" letter-spacing="1" text-anchor="end">OPPORTUNITY CREATION · NEWCO ARCHITECTURE</text>
  <line x1="100" y1="125" x2="1500" y2="125" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>

  <!-- Left Box: HAISCO -->
  <g transform="translate(110, 180)">
    <rect width="380" height="480" rx="10" fill="#0D233E" stroke="#38BDF8" stroke-width="2"/>
    <text x="190" y="70" fill="#FFFFFF" font-size="30" font-weight="800" letter-spacing="1" text-anchor="middle">HAISCO</text>
    <text x="190" y="100" fill="#38BDF8" font-size="14" font-family="monospace" font-weight="600" letter-spacing="1" text-anchor="middle">PHARMACEUTICAL</text>
    
    <line x1="40" y1="130" x2="340" y2="130" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
    
    <rect x="35" y="160" width="310" height="70" rx="6" fill="#09182B" stroke="#1E3A5F"/>
    <text x="190" y="190" fill="#E2E8F0" font-size="15" font-weight="700" text-anchor="middle">Type-2 Inflammatory Asset</text>
    <text x="190" y="212" fill="#94A3B8" font-size="12" text-anchor="middle">HSK43359 Oral Pre-clinical / Phase 1</text>

    <rect x="35" y="250" width="310" height="70" rx="6" fill="#09182B" stroke="#1E3A5F"/>
    <text x="190" y="280" fill="#38BDF8" font-size="15" font-weight="700" text-anchor="middle">Retains Greater China Rights</text>
    <text x="190" y="302" fill="#94A3B8" font-size="12" text-anchor="middle">Full domestic commercial ownership</text>

    <rect x="35" y="340" width="310" height="90" rx="6" fill="#09182B" stroke="#1E3A5F"/>
    <text x="190" y="370" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="700" text-anchor="middle">UPSTREAM CREATION</text>
    <text x="190" y="394" fill="#E2E8F0" font-size="12" text-anchor="middle">Doesn't search for buyer;</text>
    <text x="190" y="414" fill="#94A3B8" font-size="12" text-anchor="middle">Co-founds purpose-built US vehicle</text>
  </g>

  <!-- Arrow 1: Haisco -> Sentivera -->
  <g transform="translate(500, 390)">
    <line x1="0" y1="0" x2="90" y2="0" stroke="#38BDF8" stroke-width="3.5"/>
    <polygon points="90,-8 106,0 90,8" fill="#38BDF8"/>
    <text x="50" y="-18" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="700" text-anchor="middle">Ex-China</text>
    <text x="50" y="30" fill="#94A3B8" font-size="12" font-family="monospace" font-weight="600" text-anchor="middle">Rights</text>
  </g>

  <!-- Center Box: SENTIVERA NEWCO (Visual Focus) -->
  <g transform="translate(615, 155)">
    <rect width="420" height="530" rx="12" fill="#0B2038" stroke="#D4AF37" stroke-width="2.5"/>
    
    <!-- Header Badge -->
    <rect x="130" y="-16" width="160" height="32" rx="16" fill="#D4AF37"/>
    <text x="210" y="6" fill="#091C33" font-size="13" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">NEWCO</text>

    <text x="210" y="65" fill="#FFFFFF" font-size="34" font-weight="900" letter-spacing="2" text-anchor="middle">SENTIVERA</text>
    <text x="210" y="92" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="600" text-anchor="middle">Purpose-Built Newco Architecture</text>
    
    <line x1="40" y1="115" x2="380" y2="115" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>

    <text x="210" y="150" fill="#E2E8F0" font-size="16" font-weight="600" text-anchor="middle">Ex-China Global Rights</text>
    <text x="210" y="178" fill="#38BDF8" font-size="16" font-weight="700" text-anchor="middle">+ Dedicated Capital + Seasoned Execs</text>

    <rect x="35" y="210" width="350" height="110" rx="8" fill="#08182D" stroke="#1E3A5F"/>
    <text x="210" y="240" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">FOUNDED &amp; BACKED BY</text>
    <text x="210" y="270" fill="#FFFFFF" font-size="17" font-weight="800" text-anchor="middle">ARCH Venture Partners</text>
    <text x="210" y="298" fill="#E2E8F0" font-size="14" font-weight="600" text-anchor="middle">+ Population Health Partners</text>

    <rect x="35" y="340" width="350" height="80" rx="8" fill="#D4AF37" fill-opacity="0.12" stroke="#D4AF37" stroke-opacity="0.4"/>
    <text x="210" y="372" fill="#D4AF37" font-size="14" font-weight="800" text-anchor="middle">Haisco Equity Stake</text>
    <text x="210" y="396" fill="#E2E8F0" font-size="12" text-anchor="middle">Upstream shareholder in Newco equity upside</text>

    <rect x="35" y="440" width="350" height="60" rx="8" fill="#08182D" stroke="#1E3A5F"/>
    <text x="210" y="475" fill="#38BDF8" font-size="13" font-weight="700" text-anchor="middle">Avoids Pharma Partner Search Delays</text>
  </g>

  <!-- Arrow 2: Sentivera -> Global Development -->
  <g transform="translate(1045, 390)">
    <line x1="0" y1="0" x2="90" y2="0" stroke="#38BDF8" stroke-width="3.5"/>
    <polygon points="90,-8 106,0 90,8" fill="#38BDF8"/>
    <text x="50" y="-18" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="700" text-anchor="middle">Execution</text>
    <text x="50" y="30" fill="#94A3B8" font-size="12" font-family="monospace" font-weight="600" text-anchor="middle">Vehicle</text>
  </g>

  <!-- Right Box: GLOBAL DEVELOPMENT -->
  <g transform="translate(1160, 180)">
    <rect width="360" height="480" rx="10" fill="#0D233E" stroke="#38BDF8" stroke-width="2"/>
    <text x="180" y="70" fill="#FFFFFF" font-size="24" font-weight="800" letter-spacing="1" text-anchor="middle">GLOBAL</text>
    <text x="180" y="98" fill="#FFFFFF" font-size="24" font-weight="800" letter-spacing="1" text-anchor="middle">DEVELOPMENT</text>
    
    <line x1="40" y1="130" x2="320" y2="130" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

    <g transform="translate(40, 160)">
      <rect width="280" height="70" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="35" r="5" fill="#38BDF8"/>
      <text x="45" y="32" fill="#E2E8F0" font-size="14" font-weight="700">Clinical Development</text>
      <text x="45" y="52" fill="#94A3B8" font-size="11">US &amp; Global INDs, Phase 1/2</text>
    </g>

    <g transform="translate(40, 250)">
      <rect width="280" height="70" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="35" r="5" fill="#38BDF8"/>
      <text x="45" y="32" fill="#E2E8F0" font-size="14" font-weight="700">CMC &amp; Scale-Up</text>
      <text x="45" y="52" fill="#94A3B8" font-size="11">Western formulation &amp; supply</text>
    </g>

    <g transform="translate(40, 340)">
      <rect width="280" height="70" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="35" r="5" fill="#38BDF8"/>
      <text x="45" y="32" fill="#E2E8F0" font-size="14" font-weight="700">Commercialization</text>
      <text x="45" y="52" fill="#94A3B8" font-size="11">Western launch or exit</text>
    </g>
  </g>

  <!-- Bottom Value Stream Bar -->
  <g transform="translate(110, 710)">
    <rect width="1410" height="70" rx="8" fill="#08182D" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="705" y="32" fill="#D4AF37" font-size="15" font-weight="800" letter-spacing="1" text-anchor="middle">TRANSACTION ECONOMICS</text>
    <text x="705" y="55" fill="#E2E8F0" font-size="13" text-anchor="middle">Upfront ($75.89M cash &amp; equity) + Development Milestones (up to $1.46B) + Royalties + Newco Equity Upside</text>
  </g>

  <!-- Footer Caption -->
  <text x="800" y="865" fill="#64748B" font-size="13" font-family="monospace" text-anchor="middle">PHARMASIGNAL TRANSACTION ARCHITECTURE · HAISCO PHARMACEUTICAL / SENTIVERA</text>
</svg>
`;

// 8. Alvotech x Lotus Selective Commercial Ownership Diagram (1600x900)
const alvotechSvg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgNavy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08182D" />
      <stop offset="100%" stop-color="#030A14" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1600" height="900" fill="url(#bgNavy)"/>
  
  <!-- Outer Card Frame -->
  <rect x="60" y="45" width="1480" height="810" fill="#091C33" rx="14" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.5"/>
  
  <!-- Top Header Bar -->
  <text x="100" y="100" fill="#D4AF37" font-size="18" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1500" y="100" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="2" text-anchor="end">SELECTIVE COMMERCIAL OWNERSHIP</text>
  <line x1="100" y1="125" x2="1500" y2="125" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>

  <!-- Main Headline -->
  <text x="800" y="180" fill="#FFFFFF" font-size="34" font-weight="900" letter-spacing="1" text-anchor="middle">ONE ASSET. DIFFERENT EXECUTION ARCHITECTURE.</text>
  <text x="800" y="215" fill="#94A3B8" font-size="16" font-weight="500" text-anchor="middle">Alvotech × Lotus Pharmaceutical · Biosimilars AVT34 (durvalumab) &amp; AVT87 (emicizumab)</text>

  <!-- Left Column: UNITED STATES -->
  <g transform="translate(100, 260)">
    <rect width="660" height="430" rx="10" fill="#0D233E" stroke="#38BDF8" stroke-width="2"/>
    
    <!-- Header Tag -->
    <rect x="30" y="25" width="180" height="32" rx="6" fill="#0284C7"/>
    <text x="120" y="46" fill="#FFFFFF" font-size="13" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">UNITED STATES</text>

    <text x="30" y="95" fill="#FFFFFF" font-size="24" font-weight="800">Semi-Exclusive / Shared Model</text>
    <text x="30" y="122" fill="#38BDF8" font-size="15" font-weight="600">Alvotech + Lotus (via Alvogen U.S. Platform)</text>
    
    <line x1="30" y1="145" x2="630" y2="145" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

    <!-- Key Bullet Blocks -->
    <g transform="translate(30, 175)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#38BDF8"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Direct Commercial Participation</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">Alvotech participates in downstream commercial economics alongside Lotus</text>
    </g>

    <g transform="translate(30, 250)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#38BDF8"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Retained Responsibilities</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">Alvotech retains Development, U.S. Marketing Authorization (BLA) &amp; Supply</text>
    </g>

    <g transform="translate(30, 325)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#38BDF8"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Infrastructure Leverage</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">Lotus leverages Alvogen's existing established U.S. commercial organization</text>
    </g>
  </g>

  <!-- Right Column: 8 ASIAN MARKETS -->
  <g transform="translate(840, 260)">
    <rect width="660" height="430" rx="10" fill="#0D233E" stroke="#D4AF37" stroke-width="2"/>
    
    <!-- Header Tag -->
    <rect x="30" y="25" width="220" height="32" rx="6" fill="#D4AF37"/>
    <text x="140" y="46" fill="#0F172A" font-size="13" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">8 ASIAN MARKETS</text>

    <text x="30" y="95" fill="#FFFFFF" font-size="24" font-weight="800">Exclusive Local Commercialization</text>
    <text x="30" y="122" fill="#D4AF37" font-size="15" font-weight="600">Alvotech (Supply) ➔ Lotus Pharmaceutical (Commercial)</text>
    
    <line x1="30" y1="145" x2="630" y2="145" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

    <!-- Key Bullet Blocks -->
    <g transform="translate(30, 175)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#D4AF37"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Territories Covered</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">South Korea, Taiwan, Thailand, Vietnam, Philippines, Singapore, HK, Malaysia</text>
    </g>

    <g transform="translate(30, 250)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#D4AF37"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Lotus Assumes Regional Execution</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">Lotus manages local regulatory filings, pricing, market access &amp; distribution</text>
    </g>

    <g transform="translate(30, 325)">
      <rect width="600" height="60" rx="6" fill="#09182B" stroke="#1E3A5F"/>
      <circle cx="25" cy="30" r="6" fill="#D4AF37"/>
      <text x="45" y="27" fill="#E2E8F0" font-size="15" font-weight="700">Alvotech Value Capture</text>
      <text x="45" y="48" fill="#94A3B8" font-size="13">Alvotech retains Development &amp; exclusive product supply manufacturing</text>
    </g>
  </g>

  <!-- Bottom Strip: PharmaSignal Principle & Financial Terms -->
  <g transform="translate(100, 715)">
    <rect width="1400" height="85" rx="8" fill="#0B1F38" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="700" y="36" fill="#D4AF37" font-size="17" font-weight="800" letter-spacing="1" text-anchor="middle">PHARMASIGNAL PRINCIPLE: TERRITORIAL RIGHTS SHOULD FOLLOW CAPABILITY ECONOMICS</text>
    <text x="700" y="64" fill="#94A3B8" font-size="14" text-anchor="middle">Up to ~$150M in upfront &amp; milestone consideration + ongoing commercial supply revenue</text>
  </g>
</svg>
`;

const hutchmedGskSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" style="background:#071A2E;">
  <defs>
    <linearGradient id="bgGradHutchmed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071A2E"/>
      <stop offset="100%" stop-color="#040E1B"/>
    </linearGradient>
    <linearGradient id="gskOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A38"/>
      <stop offset="100%" stop-color="#E85310"/>
    </linearGradient>
    <linearGradient id="hutchmedBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A3C74"/>
      <stop offset="100%" stop-color="#041F43"/>
    </linearGradient>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="675" fill="url(#bgGradHutchmed)"/>

  <!-- Outer Card Frame -->
  <rect x="40" y="30" width="1120" height="615" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.35"/>

  <!-- Top Editorial Header Bar -->
  <text x="70" y="65" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL</text>
  <text x="1130" y="65" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">DEAL STRUCTURING · HMPL-A830 (KRAS-EGFR)</text>
  <line x1="40" y1="84" x2="1160" y2="84" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1"/>

  <!-- ==================== TOP COUNTERPARTY LOGOS & CAPITAL ARROWS ==================== -->
  
  <!-- LEFT: HUTCHMED COMPANY LOGO CARD -->
  <g transform="translate(70, 110)">
    <rect width="280" height="150" rx="10" fill="url(#hutchmedBlueGrad)" stroke="#38BDF8" stroke-opacity="0.4" stroke-width="1.5"/>
    
    <!-- HUTCHMED Emblem Symbol -->
    <g transform="translate(140, 52)">
      <circle cx="0" cy="0" r="24" fill="#002244" stroke="#D4AF37" stroke-width="2"/>
      <path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="6" fill="#D4AF37"/>
    </g>
    
    <!-- HUTCHMED Official Wordmark -->
    <text x="140" y="108" fill="#FFFFFF" font-size="24" font-family="sans-serif" font-weight="900" letter-spacing="2" text-anchor="middle">HUTCHMED</text>
    <text x="140" y="132" fill="#D4AF37" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">ORIGINATOR · CHINA</text>
  </g>

  <!-- CENTER TRANSACTION ARROWS: Capital & Asset Flow -->
  <g transform="translate(370, 110)">
    <!-- Upfront & Milestones Flow (GSK -> HUTCHMED: Right to Left) -->
    <g transform="translate(0, 25)">
      <line x1="440" y1="18" x2="20" y2="18" stroke="#D4AF37" stroke-width="2.5" stroke-dasharray="6 4"/>
      <polygon points="12,18 24,11 24,25" fill="#D4AF37"/>
      <rect x="70" y="2" width="320" height="32" rx="16" fill="#0A1A2B" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="230" y="22" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">◀  $110M UPFRONT + $1.185B MILESTONES</text>
    </g>

    <!-- License & Rights Flow (HUTCHMED -> GSK: Left to Right) -->
    <g transform="translate(0, 85)">
      <line x1="20" y1="18" x2="440" y2="18" stroke="#38BDF8" stroke-width="2.5"/>
      <polygon points="448,18 436,11 436,25" fill="#38BDF8"/>
      <rect x="70" y="2" width="320" height="32" rx="16" fill="#0A1A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="230" y="22" fill="#38BDF8" font-size="12" font-family="monospace" font-weight="800" letter-spacing="1" text-anchor="middle">HMPL-A830 EX-CHINA RIGHTS  ▶</text>
    </g>
  </g>

  <!-- RIGHT: GSK COMPANY LOGO CARD -->
  <g transform="translate(850, 110)">
    <rect width="280" height="150" rx="10" fill="#0A1A2B" stroke="#FF7A38" stroke-opacity="0.4" stroke-width="1.5"/>
    
    <!-- GSK Iconic Orange Shield Logo -->
    <g transform="translate(140, 52)">
      <rect x="-36" y="-22" width="72" height="44" rx="12" fill="url(#gskOrangeGrad)"/>
      <text x="0" y="9" fill="#FFFFFF" font-size="24" font-family="sans-serif" font-weight="900" letter-spacing="-0.5" text-anchor="middle">gsk</text>
    </g>
    
    <!-- GSK Subtitle -->
    <text x="140" y="108" fill="#FFFFFF" font-size="20" font-family="sans-serif" font-weight="800" letter-spacing="1" text-anchor="middle">GSK</text>
    <text x="140" y="132" fill="#FF7A38" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1.5" text-anchor="middle">GLOBAL PARTNER</text>
  </g>

  <!-- SECTION DIVIDER -->
  <line x1="70" y1="285" x2="1130" y2="285" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>

  <!-- ==================== THREE BOUNDARY TRANSACTION ARROWS & SYMBOLS ==================== -->
  
  <!-- LAYER 01: TERRITORY CARVE-OUT (SYMBOLS + BOUNDARY DIVIDER) -->
  <g transform="translate(70, 305)">
    <rect width="1060" height="66" rx="8" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.2"/>
    
    <!-- Left Entity / Territory Symbol -->
    <g transform="translate(30, 20)">
      <circle cx="13" cy="13" r="13" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="13" y="18" fill="#D4AF37" font-size="13" font-family="sans-serif" font-weight="900" text-anchor="middle">🇨🇳</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">HUTCHMED: GREATER CHINA</text>
    </g>

    <!-- Center Carve-Out Symbol / Divider -->
    <g transform="translate(530, 33)">
      <rect x="-140" y="-18" width="280" height="36" rx="6" fill="#0A1A2B" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="0" y="5" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">⇥  TERRITORIAL CARVE-OUT  ⇤</text>
    </g>

    <!-- Right Entity / Territory Symbol -->
    <g transform="translate(750, 20)">
      <circle cx="13" cy="13" r="13" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="13" y="18" fill="#38BDF8" font-size="13" font-family="sans-serif" font-weight="900" text-anchor="middle">🌐</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">GSK: REST OF WORLD</text>
    </g>
  </g>

  <!-- LAYER 02: DEVELOPMENT HANDOVER (ARROW + PROGRESSION SYMBOL) -->
  <g transform="translate(70, 388)">
    <rect width="1060" height="66" rx="8" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.2"/>
    
    <!-- Left: Global Phase I -->
    <g transform="translate(30, 20)">
      <circle cx="13" cy="13" r="13" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="13" y="18" fill="#38BDF8" font-size="12" font-family="monospace" font-weight="900" text-anchor="middle">I</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">GLOBAL PHASE I (HUTCHMED)</text>
    </g>

    <!-- Center Handover Arrow -->
    <g transform="translate(530, 33)">
      <line x1="-150" y1="0" x2="140" y2="0" stroke="#38BDF8" stroke-width="2.5"/>
      <polygon points="148,0 136,-7 136,7" fill="#38BDF8"/>
      <rect x="-85" y="-16" width="170" height="32" rx="6" fill="#0A1A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="0" y="5" fill="#38BDF8" font-size="12" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">── HANDOVER ──▶</text>
    </g>

    <!-- Right: Subsequent Dev to GSK -->
    <g transform="translate(750, 20)">
      <circle cx="13" cy="13" r="13" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="13" y="18" fill="#38BDF8" font-size="11" font-family="monospace" font-weight="900" text-anchor="middle">II/III</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">SUBSEQUENT DEV &amp; COMM (GSK)</text>
    </g>
  </g>

  <!-- LAYER 03: FUTURE ASSET ACCESS (ROFN ARROW & NEGOTIATION SYMBOL) -->
  <g transform="translate(70, 471)">
    <rect width="1060" height="66" rx="8" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.2"/>
    
    <!-- Left: Earlier ATTC Asset -->
    <g transform="translate(30, 20)">
      <circle cx="13" cy="13" r="13" fill="#00C49F" fill-opacity="0.15" stroke="#00C49F" stroke-width="1.5"/>
      <text x="13" y="18" fill="#00C49F" font-size="12" font-family="monospace" font-weight="900" text-anchor="middle">🎯</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">EARLIER ATTC ASSET (1 CANDIDATE)</text>
    </g>

    <!-- Center ROFN Arrow -->
    <g transform="translate(530, 33)">
      <line x1="-150" y1="0" x2="140" y2="0" stroke="#00C49F" stroke-width="2.5" stroke-dasharray="6 3"/>
      <polygon points="148,0 136,-7 136,7" fill="#00C49F"/>
      <rect x="-85" y="-16" width="170" height="32" rx="6" fill="#0A1A2B" stroke="#00C49F" stroke-width="1.5"/>
      <text x="0" y="5" fill="#00C49F" font-size="12" font-family="monospace" font-weight="800" letter-spacing="1.5" text-anchor="middle">─── ROFN ───▶</text>
    </g>

    <!-- Right: Negotiating Right -->
    <g transform="translate(750, 20)">
      <circle cx="13" cy="13" r="13" fill="#00C49F" fill-opacity="0.15" stroke="#00C49F" stroke-width="1.5"/>
      <text x="13" y="18" fill="#00C49F" font-size="12" font-family="monospace" font-weight="900" text-anchor="middle">⚖</text>
      <text x="40" y="18" fill="#FFFFFF" font-size="15" font-family="sans-serif" font-weight="800">TIME-BOUND NEGOTIATING RIGHT</text>
    </g>
  </g>

  <!-- ==================== BOTTOM PRINCIPLE BANNER ==================== -->
  <g transform="translate(70, 560)">
    <rect width="1060" height="60" rx="8" fill="#0D243A" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="530" y="26" fill="#D4AF37" font-size="14" font-family="monospace" font-weight="900" letter-spacing="2" text-anchor="middle">RIGHTS ≠ RESPONSIBILITIES ≠ FUTURE ACCESS</text>
    <text x="530" y="47" fill="#CBD5E1" font-size="12" font-family="sans-serif" text-anchor="middle">Territory Carve-Out  │  Staged Responsibility Handover  │  Right of First Negotiation (ROFN)</text>
  </g>
</svg>
`;

function createLightModeSvg(darkSvg: string): string {
  let light = darkSvg;

  // Background and gradients
  light = light.replace(/style="background:#071A2E;/g, 'style="background:#F8FAFC;');
  light = light.replace(/stop-color="#071A2E"/g, 'stop-color="#F8FAFC"');
  light = light.replace(/stop-color="#040E1B"/g, 'stop-color="#EDF2F7"');

  // Outer frames and card background fills
  light = light.replace(/fill="#061526"/g, 'fill="#FFFFFF"');
  light = light.replace(/fill="#071A2E"/g, 'fill="#F8FAFC"');
  light = light.replace(/fill="#09182B"/g, 'fill="#F1F5F9"');
  light = light.replace(/fill="#0B1F38"/g, 'fill="#F8FAFC"');
  light = light.replace(/fill="#0B121E"/g, 'fill="#FFFFFF"');
  light = light.replace(/fill="#060B12"/g, 'fill="#FFFFFF"');
  light = light.replace(/fill="#0A1A2B"/g, 'fill="#F8FAFC"');
  light = light.replace(/fill="#0D243A"/g, 'fill="#F1F5F9"');
  light = light.replace(/fill="#002D62"/g, 'fill="#E0F2FE"');

  // Box rects
  light = light.replace(/fill="#FFFFFF" fill-opacity="0.04"/g, 'fill="#F8FAFC" fill-opacity="1"');
  light = light.replace(/fill="#FFFFFF" fill-opacity="0.03"/g, 'fill="#F8FAFC" fill-opacity="1"');
  light = light.replace(/fill="#FFFFFF" fill-opacity="0.05"/g, 'fill="#F8FAFC" fill-opacity="1"');

  // Grid lines & subtle borders
  light = light.replace(/stroke="#FFFFFF" stroke-opacity="0.15"/g, 'stroke="#CBD5E1" stroke-opacity="1"');
  light = light.replace(/stroke="#FFFFFF" stroke-opacity="0.1"/g, 'stroke="#E2E8F0" stroke-opacity="1"');
  light = light.replace(/stroke="#1E3A5F"/g, 'stroke="#CBD5E1"');
  light = light.replace(/stroke="#1E3A55"/g, 'stroke="#CBD5E1"');
  light = light.replace(/stroke="#D4AF37" stroke-opacity="0.4"/g, 'stroke="#C5A059" stroke-opacity="0.7"');
  light = light.replace(/stroke="#D4AF37" stroke-opacity="0.3"/g, 'stroke="#C5A059" stroke-opacity="0.6"');

  // Badge backgrounds
  light = light.replace(/fill="#D4AF37" fill-opacity="0.1"/g, 'fill="#C5A059" fill-opacity="0.18"');

  // High contrast text adjustments for light canvas
  light = light.replace(/fill="#FFFFFF"/g, 'fill="#061426"');
  light = light.replace(/fill="#F8FAFC"/g, 'fill="#061426"');
  light = light.replace(/fill="#E2E8F0"/g, 'fill="#1E293B"');
  light = light.replace(/fill="#94A3B8"/g, 'fill="#475569"');
  light = light.replace(/fill="#64748B"/g, 'fill="#475569"');
  light = light.replace(/fill="#CBD5E1"/g, 'fill="#334155"');

  // Restore white text inside solid colored badges/buttons if needed
  // e.g. Roche logo text:
  light = light.replace(/(<polygon points="[^"]*" fill="#0066CC"[^>]*\/>\s*<text[^>]*fill=")#061426(")/g, '$1#FFFFFF$2');

  // Gold text contrast adjustment for light background
  light = light.replace(/fill="#D4AF37"/g, 'fill="#967126"');

  // Cyan and bright green adjustments for light background readability
  light = light.replace(/fill="#38BDF8"/g, 'fill="#0284C7"');
  light = light.replace(/fill="#00C49F"/g, 'fill="#059669"');
  light = light.replace(/fill="#00E5FF"/g, 'fill="#0284C7"');
  light = light.replace(/fill="#FB7185"/g, 'fill="#E11D48"');
  light = light.replace(/stroke="#38BDF8"/g, 'stroke="#0284C7"');
  light = light.replace(/stroke="#00C49F"/g, 'stroke="#059669"');

  // Gradient adjustments for specific logo cards
  light = light.replace(/stop-color="#0A3C74"/g, 'stop-color="#E0F2FE"');
  light = light.replace(/stop-color="#041F43"/g, 'stop-color="#BAE6FD"');

  // Preserve white text in GSK orange shield
  light = light.replace(/(<rect[^>]*fill="url\(#gskOrangeGrad\)"[^>]*\/>\s*<text[^>]*fill=")#061426(")/g, '$1#FFFFFF$2');

  return light;
}

async function generateAll() {
  console.log('Generating high-resolution deal card images (dark & light modes)...');

  const items = [
    { name: 'roche_alnylam_rnai_expansion.jpg', svg: rocheAlnylamSvg },
    { name: 'sk_biopharm_kv7_deal_1787913184804.jpg', svg: skSvg },
    { name: 'bms_cellares_cart_1787913217672.jpg', svg: bmsSvg },
    { name: 'aurigene_tech_transfer_1787913237947.jpg', svg: aurigeneSvg },
    { name: 'gsk_relation_ai_1787913259639.jpg', svg: gskSvg },
    { name: 'innovent_spero_deal_1787913287919.jpg', svg: innoventSvg },
    { name: 'kaigene_taisho_japan_licensing.jpg', svg: kaigeneSvg },
    { name: 'merck_alimatravir_access.jpg', svg: merckSvg },
    { name: 'approval_gap_header_1787913304979.jpg', svg: approvalGapSvg },
    { name: 'haisco_sentivera_newco_1787913400000.jpg', svg: haiscoSvg },
    { name: 'alvotech_lotus_selective_ownership_1787913500000.jpg', svg: alvotechSvg },
    { name: 'hutchmed_gsk_three_boundaries_deal_signal.jpg', svg: hutchmedGskSvg }
  ];

  for (const item of items) {
    // 1. Dark Mode
    const destDark = path.join(OUTPUT_DIR, item.name);
    await sharp(Buffer.from(item.svg))
      .jpeg({ quality: 95 })
      .toFile(destDark);
    console.log(`✓ Generated Dark: ${item.name}`);

    // 2. Light Mode
    const lightName = item.name.replace(/\.jpg$/, '_light.jpg');
    const destLight = path.join(OUTPUT_DIR, lightName);
    const lightSvg = createLightModeSvg(item.svg);
    await sharp(Buffer.from(lightSvg))
      .jpeg({ quality: 95 })
      .toFile(destLight);
    console.log(`✓ Generated Light: ${lightName}`);
  }

  console.log('All dark and light deal signal card images successfully updated!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
