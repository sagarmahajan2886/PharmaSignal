import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'images', 'dummy_test_2_deal_signal.jpg');

const testSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#071A2E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081E36" />
      <stop offset="100%" stop-color="#030C18" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#D4AF37" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Outer Card Frame -->
  <rect x="50" y="45" width="1100" height="585" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.45"/>
  
  <!-- Subtle Grid Accent -->
  <line x1="50" y1="120" x2="1150" y2="120" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="50" y1="555" x2="1150" y2="555" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Header Bar -->
  <text x="80" y="93" fill="#D4AF37" font-size="16" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL · TEST 2 (RSS FEED TEST)</text>
  <text x="1120" y="93" fill="#38BDF8" font-size="14" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">TERRITORY ARBITRAGE &amp; CO-DEVELOPMENT</text>

  <!-- Left Box: US/EU Originator -->
  <g transform="translate(100, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <circle cx="75" cy="85" r="32" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="2" />
    <text x="75" y="93" fill="#D4AF37" font-size="20" font-weight="bold" font-family="monospace" text-anchor="middle">TX</text>

    <text x="130" y="80" fill="#FFFFFF" font-size="22" font-weight="800" letter-spacing="-0.5">TheraNex Global</text>
    <text x="130" y="105" fill="#94A3B8" font-size="13" font-family="monospace">ORIGINATOR (GLOBAL RIGHTS)</text>

    <!-- Details -->
    <rect x="25" y="145" width="310" height="135" rx="6" fill="#030B14" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="45" y="180" fill="#E2E8F0" font-size="14" font-weight="600">• Out-licenses Greater China rights</text>
    <text x="45" y="212" fill="#E2E8F0" font-size="14" font-weight="600">• Receives $40M upfront + equity</text>
    <text x="45" y="244" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700">• Cross-study clinical data sharing</text>
  </g>

  <!-- Center Transaction Node -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="54" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#glow)"/>
    <path d="M-10 14 V-14 M-10 -14 L-18 -6 M-10 -14 L-2 -6 M10 -14 V14 M10 14 L2 6 M10 14 L18 6" fill="none" stroke="#D4AF37" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <rect x="-85" y="68" width="170" height="32" rx="4" fill="#071A2E" stroke="#D4AF37" stroke-width="1"/>
    <text x="0" y="89" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" text-anchor="middle" letter-spacing="1">$40M + DATA ACCESS</text>
  </g>

  <!-- Right Box: Regional Partner -->
  <g transform="translate(740, 175)">
    <rect width="360" height="320" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <circle cx="75" cy="85" r="32" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="2" />
    <text x="75" y="93" fill="#38BDF8" font-size="20" font-weight="bold" font-family="monospace" text-anchor="middle">CB</text>

    <text x="130" y="80" fill="#FFFFFF" font-size="22" font-weight="800" letter-spacing="-0.5">Caelum Bio</text>
    <text x="130" y="105" fill="#94A3B8" font-size="13" font-family="monospace">REGIONAL COMMERCIAL PARTNER</text>

    <!-- Details -->
    <rect x="25" y="145" width="310" height="135" rx="6" fill="#030B14" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="45" y="180" fill="#E2E8F0" font-size="14" font-weight="600">• Funds local Phase 3 trial</text>
    <text x="45" y="212" fill="#E2E8F0" font-size="14" font-weight="600">• Accelerates regional registration</text>
    <text x="45" y="244" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="700">• Tiered double-digit royalties</text>
  </g>

  <!-- Bottom Footer Tagline -->
  <text x="600" y="595" fill="#94A3B8" font-size="13" font-family="monospace" text-anchor="middle" letter-spacing="1.5">
    MECHANISM: RECIPROCAL CLINICAL DATA ARBITRAGE · REGIONAL SPEED-TO-MARKET
  </text>
</svg>
`;

async function run() {
  await sharp(Buffer.from(testSvg))
    .jpeg({ quality: 95 })
    .toFile(OUTPUT_PATH);
  console.log('Generated test 2 deal signal image at:', OUTPUT_PATH);
}

run();
