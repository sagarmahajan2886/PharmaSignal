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

async function generateAll() {
  console.log('Generating high-resolution deal card images...');

  const items = [
    { name: 'sk_biopharm_kv7_deal_1787913184804.jpg', svg: skSvg },
    { name: 'bms_cellares_cart_1787913217672.jpg', svg: bmsSvg },
    { name: 'aurigene_tech_transfer_1787913237947.jpg', svg: aurigeneSvg },
    { name: 'gsk_relation_ai_1787913259639.jpg', svg: gskSvg },
    { name: 'innovent_spero_deal_1787913287919.jpg', svg: innoventSvg },
    { name: 'approval_gap_header_1787913304979.jpg', svg: approvalGapSvg }
  ];

  for (const item of items) {
    const dest = path.join(OUTPUT_DIR, item.name);
    await sharp(Buffer.from(item.svg))
      .jpeg({ quality: 95 })
      .toFile(dest);
    console.log(`✓ Generated: ${item.name}`);
  }

  console.log('All deal signal card images successfully updated!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
