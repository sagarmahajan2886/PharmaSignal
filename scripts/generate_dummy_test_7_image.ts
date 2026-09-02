import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'images', 'test_7_deal_signal.jpg');

const testSvg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="canvasGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081E36" />
      <stop offset="100%" stop-color="#030C18" />
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#D4AF37" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#canvasGrad)"/>
  
  <!-- Outer Card Frame -->
  <rect x="45" y="40" width="1110" height="595" fill="#061526" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.5"/>
  
  <!-- Grid Guidelines -->
  <line x1="45" y1="115" x2="1155" y2="115" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="45" y1="565" x2="1155" y2="565" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Header Bar -->
  <text x="75" y="90" fill="#D4AF37" font-size="15" font-family="monospace" font-weight="700" letter-spacing="3">PHARMASIGNAL DEAL SIGNAL · TEST 7 (EXACT FORMAT MATCH)</text>
  <text x="1125" y="90" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="600" letter-spacing="2" text-anchor="end">TERRITORIAL RIGHTS ARBITRAGE</text>

  <!-- Left Party: Originator / Biotech -->
  <g transform="translate(90, 165)">
    <rect width="370" height="340" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <circle cx="70" cy="75" r="30" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="2" />
    <text x="70" y="83" fill="#D4AF37" font-size="19" font-weight="bold" font-family="monospace" text-anchor="middle">AT</text>

    <text x="120" y="70" fill="#FFFFFF" font-size="22" font-weight="800" letter-spacing="-0.5">Aura Therapeutics</text>
    <text x="120" y="95" fill="#94A3B8" font-size="12" font-family="monospace">ORIGINATOR &amp; US COMMERCIAL LEAD</text>

    <!-- Details Box -->
    <rect x="25" y="130" width="320" height="175" rx="6" fill="#030B14" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="45" y="165" fill="#E2E8F0" font-size="14" font-weight="600">• $75M non-dilutive upfront funding</text>
    <text x="45" y="198" fill="#E2E8F0" font-size="14" font-weight="600">• Retains 100% US commercial rights</text>
    <text x="45" y="231" fill="#E2E8F0" font-size="14" font-weight="600">• Offloads 80% of Phase 3 trial costs</text>
    <text x="45" y="264" fill="#D4AF37" font-size="13" font-family="monospace" font-weight="700">• Retains long-term US terminal value</text>
  </g>

  <!-- Center Transaction Flow Node -->
  <g transform="translate(600, 335)">
    <circle cx="0" cy="0" r="52" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="3" filter="url(#goldGlow)"/>
    <path d="M-10 14 V-14 M-10 -14 L-18 -6 M-10 -14 L-2 -6 M10 -14 V14 M10 14 L2 6 M10 14 L18 6" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    
    <rect x="-95" y="70" width="190" height="34" rx="4" fill="#071A2E" stroke="#D4AF37" stroke-width="1"/>
    <text x="0" y="92" fill="#D4AF37" font-size="12" font-family="monospace" font-weight="700" text-anchor="middle" letter-spacing="1">$75M + EX-US OUT-LICENSE</text>
  </g>

  <!-- Right Party: Global Commercial Partner -->
  <g transform="translate(740, 165)">
    <rect width="370" height="340" rx="8" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    
    <circle cx="70" cy="75" r="30" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="2" />
    <text x="70" y="83" fill="#38BDF8" font-size="19" font-weight="bold" font-family="monospace" text-anchor="middle">NP</text>

    <text x="120" y="70" fill="#FFFFFF" font-size="22" font-weight="800" letter-spacing="-0.5">Nexus Pharma</text>
    <text x="120" y="95" fill="#94A3B8" font-size="12" font-family="monospace">GLOBAL SCALE &amp; EX-US COMMERCIAL</text>

    <!-- Details Box -->
    <rect x="25" y="130" width="320" height="175" rx="6" fill="#030B14" stroke="#FFFFFF" stroke-opacity="0.08"/>
    <text x="45" y="165" fill="#E2E8F0" font-size="14" font-weight="600">• Full Ex-US commercial license</text>
    <text x="45" y="198" fill="#E2E8F0" font-size="14" font-weight="600">• Up to $480M regulatory milestones</text>
    <text x="45" y="231" fill="#E2E8F0" font-size="14" font-weight="600">• Absorbs global regulatory filings</text>
    <text x="45" y="264" fill="#38BDF8" font-size="13" font-family="monospace" font-weight="700">• Tiered 16-24% Ex-US net royalties</text>
  </g>

  <!-- Bottom Tagline -->
  <text x="600" y="605" fill="#94A3B8" font-size="13" font-family="monospace" text-anchor="middle" letter-spacing="1.5">
    MECHANISM: ASYMMETRIC COST ABSORPTION · EXECUTABLE US INDEPENDENCE
  </text>
</svg>
`;

async function run() {
  await sharp(Buffer.from(testSvg))
    .jpeg({ quality: 95 })
    .toFile(OUTPUT_PATH);
  console.log('Generated Test 7 deal signal image at:', OUTPUT_PATH);
}

run();
