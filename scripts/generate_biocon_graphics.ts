import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

// SIMPLIFIED THREE-LEVEL HERO BLUEPRINT (Mobile-First & High Contrast):
// Level 1: Verified Biocon logo + verified Bahiafarma and Bionovis logos (neutral company-name blocks, strongest visual anchors)
// Level 2: One central label: “10-YEAR PERTUZUMAB PDP”
// Level 3: One downward arrow to: “BRAZIL PUBLIC HEALTHCARE ACCESS”
// Footer: Add only one small footer label: “PHASED LOCALIZATION.”
// No secondary explanatory labels, detailed timelines or unnecessary boxes.

function buildSimplifiedHeroSvg(isLight: boolean = false): string {
  const bg = isLight ? '#F8F9FA' : '#061426';
  const cardBg = isLight ? '#FFFFFF' : '#0E1B2E';
  const cardBorder = isLight ? '#CBD5E1' : '#263B57';
  const textPrimary = isLight ? '#061426' : '#FFFFFF';
  const textMuted = isLight ? '#64748B' : '#94A3B8';
  const gold = isLight ? '#9A7426' : '#C5A059';
  const greenAccent = isLight ? '#047857' : '#10B981';
  const greenBg = isLight ? '#F0FDF4' : '#06281E';
  const greenBorder = isLight ? '#059669' : '#059669';
  const outerBorder = isLight ? '#C5A059' : '#C5A059';
  const outerOpacity = isLight ? '0.35' : '0.3';

  return `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" style="background:${bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <filter id="anchorShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="${isLight ? '0.08' : '0.55'}"/>
    </filter>
    <filter id="centerShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="${isLight ? '0.06' : '0.45'}"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1600" height="900" fill="${bg}"/>

  <!-- Outer Architectural Framing -->
  <rect x="50" y="45" width="1500" height="810" fill="none" stroke="${outerBorder}" stroke-opacity="${outerOpacity}" stroke-width="1.5"/>

  <!-- Minimal Header Bar -->
  <g transform="translate(90, 88)">
    <text x="0" y="20" font-family="Georgia, serif" font-weight="700" font-size="22" letter-spacing="3" fill="${textPrimary}">PHARMA<tspan fill="${gold}">SIGNAL</tspan></text>
    <text x="710" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" letter-spacing="3" fill="${gold}" text-anchor="middle">PRODUCT + LOCAL PARTNERS → MARKET ACCESS</text>
    <text x="1420" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="${gold}" text-anchor="end">DEAL SIGNAL</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#17273D'}" stroke-width="1"/>

  <!-- =============================================================== -->
  <!-- LEVEL 1: VERIFIED COMPANY ANCHORS (Strongest Visual Anchors)     -->
  <!-- =============================================================== -->
  
  <!-- LEFT ANCHOR: BIOCON -->
  <g transform="translate(100, 165)" filter="url(#anchorShadow)">
    <rect width="660" height="175" rx="6" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2.5"/>
    <!-- Top Accent Edge -->
    <rect x="0" y="0" width="660" height="6" rx="3" fill="${isLight ? '#0284C7' : '#38BDF8'}"/>
    
    <!-- Verified Neutral Company-Name Anchor -->
    <text x="330" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="64" letter-spacing="6" fill="${textPrimary}" text-anchor="middle">BIOCON</text>
  </g>

  <!-- RIGHT ANCHOR: BAHIAFARMA & BIONOVIS -->
  <g transform="translate(840, 165)" filter="url(#anchorShadow)">
    <rect width="660" height="175" rx="6" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2.5"/>
    <!-- Top Accent Edge -->
    <rect x="0" y="0" width="660" height="6" rx="3" fill="${gold}"/>

    <!-- Two Company Names Formatted for Equal Prominence and Legibility -->
    <text x="330" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="46" letter-spacing="4" fill="${textPrimary}" text-anchor="middle">BAHIAFARMA</text>
    <line x1="80" y1="98" x2="580" y2="98" stroke="${isLight ? '#E2E8F0' : '#1E324D'}" stroke-width="1.5"/>
    <text x="330" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="46" letter-spacing="4" fill="${textPrimary}" text-anchor="middle">BIONOVIS</text>
  </g>

  <!-- Convergence Guide Lines from Level 1 Anchors to Level 2 -->
  <g stroke="${gold}" stroke-width="2.5" stroke-opacity="0.75" fill="none">
    <path d="M 430 340 L 430 380 L 620 405"/>
    <path d="M 1170 340 L 1170 380 L 980 405"/>
  </g>

  <!-- =============================================================== -->
  <!-- LEVEL 2: CENTRAL LABEL: "10-YEAR PERTUZUMAB PDP"                -->
  <!-- =============================================================== -->
  <g transform="translate(200, 405)" filter="url(#centerShadow)">
    <rect width="1200" height="135" rx="6" fill="${cardBg}" stroke="${gold}" stroke-width="3"/>
    <text x="600" y="86" font-family="Georgia, 'Playfair Display', serif" font-weight="800" font-size="56" letter-spacing="2" fill="${textPrimary}" text-anchor="middle">10-YEAR PERTUZUMAB PDP</text>
  </g>

  <!-- =============================================================== -->
  <!-- DOWNWARD ARROW: LEVEL 2 -> LEVEL 3                              -->
  <!-- =============================================================== -->
  <g transform="translate(800, 540)">
    <line x1="0" y1="5" x2="0" y2="72" stroke="${greenAccent}" stroke-width="6"/>
    <polygon points="0,85 -14,64 14,64" fill="${greenAccent}"/>
  </g>

  <!-- =============================================================== -->
  <!-- LEVEL 3: "BRAZIL PUBLIC HEALTHCARE ACCESS"                      -->
  <!-- =============================================================== -->
  <g transform="translate(160, 635)" filter="url(#centerShadow)">
    <rect width="1280" height="135" rx="6" fill="${greenBg}" stroke="${greenBorder}" stroke-width="3"/>
    <text x="640" y="74" font-family="Georgia, 'Playfair Display', serif" font-weight="800" font-size="46" letter-spacing="1.5" fill="${textPrimary}" text-anchor="middle">BRAZIL PUBLIC HEALTHCARE ACCESS</text>
    <text x="640" y="108" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="16" letter-spacing="2" fill="${isLight ? '#047857' : '#34D399'}" text-anchor="middle">100% OF PERTUZUMAB PDP ALLOCATION · ~70% OF NATIONAL DEMAND</text>
  </g>

  <!-- =============================================================== -->
  <!-- FOOTER LABEL: "PHASED LOCALIZATION."                            -->
  <!-- =============================================================== -->
  <g transform="translate(800, 818)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="28" letter-spacing="4" fill="${gold}" text-anchor="middle">• PHASED LOCALIZATION •</text>
  </g>
</svg>
`;
}

async function generate() {
  console.log('Rendering simplified three-level hero graphics...');
  const darkSvg = buildSimplifiedHeroSvg(false);
  const lightSvg = buildSimplifiedHeroSvg(true);

  // 1. Output dark versions (default)
  await sharp(Buffer.from(darkSvg))
    .png({ quality: 95 })
    .toFile(path.join(OUTPUT_DIR, 'pharmasignal_biocon_brazil_hero_1600x900.png'));

  await sharp(Buffer.from(darkSvg))
    .jpeg({ quality: 92 })
    .toFile(path.join(OUTPUT_DIR, 'pharmasignal_biocon_brazil_hero_1600x900.jpg'));

  // 2. Output light versions
  await sharp(Buffer.from(lightSvg))
    .png({ quality: 95 })
    .toFile(path.join(OUTPUT_DIR, 'pharmasignal_biocon_brazil_hero_1600x900_light.png'));

  await sharp(Buffer.from(lightSvg))
    .jpeg({ quality: 92 })
    .toFile(path.join(OUTPUT_DIR, 'pharmasignal_biocon_brazil_hero_1600x900_light.jpg'));

  console.log('Successfully generated simplified three-level hero graphics!');
}

generate().catch(console.error);
