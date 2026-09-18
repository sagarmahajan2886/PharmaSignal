import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { jsPDF } from 'jspdf';

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');

// ============================================================================
// 1. DETERMINISTIC WEBSITE HERO SVG (1600 × 900 landscape)
// ============================================================================

function buildHeroSvg(isLight: boolean = false): string {
  const bg = isLight ? '#F8F9FA' : '#0B121E';
  const cardBg = isLight ? '#FFFFFF' : '#151F2D';
  const cardBorder = isLight ? '#CBD5E1' : '#2A3A4E';
  const textPrimary = isLight ? '#0B121E' : '#FFFFFF';
  const textMuted = isLight ? '#64748B' : '#94A3B8';
  const gold = isLight ? '#9A7426' : '#C5A059';
  const goldBg = isLight ? 'rgba(154, 116, 38, 0.08)' : 'rgba(197, 160, 89, 0.12)';
  const goldBorder = isLight ? '#9A7426' : '#C5A059';
  const greenAccent = isLight ? '#047857' : '#10B981';
  const outerBorder = isLight ? '#9A7426' : '#C5A059';
  const outerOpacity = isLight ? '0.35' : '0.3';

  return `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" style="background:${bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <filter id="anchorShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000000" flood-opacity="${isLight ? '0.08' : '0.55'}"/>
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
  <g transform="translate(90, 85)">
    <text x="0" y="22" font-family="Georgia, serif" font-weight="700" font-size="24" letter-spacing="1.3" fill="${textPrimary}">PHARMA<tspan fill="${gold}">SIGNAL</tspan></text>
    <text x="710" y="22" font-family="'JetBrains Mono', 'Courier New', monospace" font-weight="700" font-size="14" letter-spacing="3" fill="${gold}" text-anchor="middle">LICENSING &amp; LOCALIZATION · DEAL SIGNAL</text>
    <text x="1420" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="end">16 SEP 2026</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#1E2C3F'}" stroke-width="1"/>

  <!-- Main Editorial Headline -->
  <g transform="translate(800, 195)">
    <text x="0" y="0" font-family="Georgia, serif" font-weight="700" font-size="44" letter-spacing="0.5" fill="${textPrimary}" text-anchor="middle">Market entry now. Local manufacturing in phases.</text>
    <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="${textMuted}" text-anchor="middle">Shilpa Biologicals and SPIMACO Bio divide current MENA responsibilities from a future Saudi manufacturing transition.</text>
  </g>

  <!-- =============================================================== -->
  <!-- TRANSACTION ANCHORS & LICENCE FLOW                             -->
  <!-- =============================================================== -->

  <!-- LEFT NAME BLOCK: Shilpa Biologicals -->
  <g transform="translate(90, 290)" filter="url(#anchorShadow)">
    <rect width="570" height="260" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="570" height="6" fill="${gold}"/>

    <g transform="translate(36, 40)">
      <rect x="0" y="0" width="130" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="65" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">ORIGINATOR</text>

      <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="34" letter-spacing="0.5" fill="${textPrimary}">Shilpa Biologicals</text>
      
      <line x1="0" y1="92" x2="498" y2="92" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="${gold}">DISCLOSED RESPONSIBILITIES:</text>
      <text x="0" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="600" fill="${textPrimary}">IP · development · manufacture</text>
      <text x="0" y="188" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="${textMuted}">PD-1 Inhibitor Biosimilar Portfolio · Exclusive Developer</text>
    </g>
  </g>

  <!-- CENTRAL ARROW / CONNECTOR: EXCLUSIVE MENA LICENCE -->
  <g transform="translate(685, 385)">
    <rect x="0" y="0" width="230" height="70" rx="4" fill="${goldBg}" stroke="${goldBorder}" stroke-width="2"/>
    <text x="115" y="32" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="13" letter-spacing="2" fill="${gold}" text-anchor="middle">EXCLUSIVE</text>
    <text x="115" y="52" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="13" letter-spacing="2" fill="${textPrimary}" text-anchor="middle">MENA LICENCE →</text>
  </g>

  <!-- RIGHT NAME BLOCK: SPIMACO Bio -->
  <g transform="translate(940, 290)" filter="url(#anchorShadow)">
    <rect width="570" height="260" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="570" height="6" fill="${gold}"/>

    <g transform="translate(36, 40)">
      <rect x="0" y="0" width="180" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="90" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">COMMERCIAL PARTNER</text>

      <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="34" letter-spacing="0.5" fill="${textPrimary}">SPIMACO Bio</text>
      
      <line x1="0" y1="92" x2="498" y2="92" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="${gold}">DISCLOSED RESPONSIBILITIES:</text>
      <text x="0" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="600" fill="${textPrimary}">Regulatory · access · commercialization</text>
      <text x="0" y="188" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="${textMuted}">Territory: Middle East &amp; North Africa (MENA)</text>
    </g>
  </g>

  <!-- DOWNWARD TRANSITION CONNECTORS -->
  <g stroke="${gold}" stroke-width="2" stroke-dasharray="6,4" fill="none" opacity="0.8">
    <path d="M 375 550 L 375 600 L 720 625"/>
    <path d="M 1225 550 L 1225 600 L 880 625"/>
  </g>

  <g transform="translate(800, 595)">
    <line x1="0" y1="0" x2="0" y2="24" stroke="${gold}" stroke-width="2"/>
    <polygon points="0,30 -6,20 6,20" fill="${gold}"/>
  </g>

  <!-- =============================================================== -->
  <!-- BOTTOM QUALIFIED LINE: PHASED TECHNOLOGY TRANSFER              -->
  <!-- =============================================================== -->
  <g transform="translate(180, 635)" filter="url(#centerShadow)">
    <rect width="1240" height="130" rx="4" fill="${cardBg}" stroke="${gold}" stroke-width="2.5"/>
    
    <!-- Left badge -->
    <g transform="translate(40, 35)">
      <rect width="160" height="60" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1.5"/>
      <text x="80" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="2" fill="${gold}" text-anchor="middle">FUTURE STAGE</text>
      <text x="80" y="46" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1" fill="${textMuted}" text-anchor="middle">POST-LAUNCH</text>
    </g>

    <g transform="translate(230, 48)">
      <text x="0" y="16" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1" fill="${textPrimary}">PHASED TECHNOLOGY TRANSFER → SAUDI LOCAL MANUFACTURING</text>
      <text x="0" y="46" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" letter-spacing="1.5" fill="${gold}">CONDITIONAL TRANSITION · TRANSFER SCOPE, TRIGGERS &amp; POST-TRANSFER ECONOMICS UNDISCLOSED</text>
    </g>
  </g>

  <!-- Bottom Sub-Footer -->
  <g transform="translate(800, 815)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="middle">PHARMASIGNAL EDITORIAL TRANSACTION ARCHITECTURE · EVIDENCE CURRENT TO 18 SEP 2026</text>
  </g>
</svg>
`;
}

// ============================================================================
// 2. FOUR 1080 × 1350 LINKEDIN CAROUSEL SLIDES (SVG)
// ============================================================================

function buildSlide1Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#0B121E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- Canvas Background -->
  <rect width="1080" height="1350" fill="#0B121E"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="18" cy="18" r="1" fill="#C5A059" fill-opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="1080" height="1350" fill="url(#grid)"/>

  <!-- Architectural Frame -->
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 1 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#2A3A4E" stroke-width="1"/>

  <!-- Category & Date Pill -->
  <g transform="translate(90, 200)">
    <rect x="0" y="0" width="280" height="36" fill="rgba(197, 160, 89, 0.15)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="140" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">DEAL SIGNAL · 16 SEP 2026</text>
  </g>

  <!-- Big Display Headline -->
  <g transform="translate(90, 290)">
    <text x="0" y="44" font-family="Georgia, serif" font-weight="700" font-size="52" line-height="1.15" fill="#FFFFFF">Market entry now.</text>
    <text x="0" y="106" font-family="Georgia, serif" font-weight="700" font-size="52" fill="#C5A059">Local manufacturing in phases.</text>
    <line x1="0" y1="140" x2="80" y2="140" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Verified Counterparties Card -->
  <g transform="translate(90, 480)">
    <rect width="900" height="340" fill="#151F2D" stroke="#2A3A4E" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">VERIFIED COUNTERPARTY ARCHITECTURE</text>

    <!-- Shilpa Box -->
    <g transform="translate(40, 70)">
      <rect width="400" height="150" fill="#0B121E" stroke="#C5A059" stroke-width="1.5"/>
      <text x="24" y="34" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">ORIGINATOR</text>
      <text x="24" y="74" font-family="Georgia, serif" font-weight="700" font-size="28" fill="#FFFFFF">Shilpa Biologicals</text>
      <text x="24" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">IP · development · manufacture</text>
    </g>

    <!-- SPIMACO Box -->
    <g transform="translate(460, 70)">
      <rect width="400" height="150" fill="#0B121E" stroke="#C5A059" stroke-width="1.5"/>
      <text x="24" y="34" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">COMMERCIAL PARTNER</text>
      <text x="24" y="74" font-family="Georgia, serif" font-weight="700" font-size="28" fill="#FFFFFF">SPIMACO Bio</text>
      <text x="24" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Regulatory · access · commercialization</text>
    </g>

    <!-- Relationship Summary Bar -->
    <g transform="translate(40, 245)">
      <rect width="820" height="65" fill="rgba(197, 160, 89, 0.1)" stroke="#C5A059" stroke-width="1"/>
      <text x="410" y="28" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">EXCLUSIVE MENA LICENCE (PD-1 BIOSIMILAR PORTFOLIO)</text>
      <text x="410" y="50" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1" fill="#FFFFFF" text-anchor="middle">↓ FOLLOWED BY PHASED TECHNOLOGY TRANSFER TO SAUDI ARABIA</text>
    </g>
  </g>

  <!-- Executive Brief Quote Card -->
  <g transform="translate(90, 860)">
    <rect width="900" height="200" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="2"/>
    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">EXECUTIVE DEAL BRIEF</text>
    <text x="40" y="95" font-family="Georgia, serif" font-style="italic" font-size="24" fill="#FFFFFF" width="820">"Shilpa and SPIMACO separate current MENA roles from a future Saudi technology transfer."</text>
    <text x="40" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Market entry begins immediately under Indian supply; localization follows in stages.</text>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#2A3A4E" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR DEAL MAP →</text>
  </g>
</svg>
`;
}

function buildSlide2Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#0B121E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#0B121E"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 2 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#2A3A4E" stroke-width="1"/>

  <!-- Category & Label -->
  <g transform="translate(90, 195)">
    <rect x="0" y="0" width="160" height="34" fill="rgba(197, 160, 89, 0.15)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="80" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">THE DEAL MAP</text>
  </g>

  <!-- Big Title -->
  <g transform="translate(90, 275)">
    <text x="0" y="40" font-family="Georgia, serif" font-weight="700" font-size="44" fill="#FFFFFF">Shilpa Biologicals</text>
    <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="34" fill="#C5A059">→ MENA licence →</text>
    <text x="0" y="140" font-family="Georgia, serif" font-weight="700" font-size="44" fill="#FFFFFF">SPIMACO Bio</text>
  </g>

  <!-- Visual Architecture Diagram Card -->
  <g transform="translate(90, 460)">
    <rect width="900" height="420" fill="#151F2D" stroke="#2A3A4E" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">TRANSACTION STAGES &amp; ROLES</text>

    <!-- Stage 1 Block -->
    <g transform="translate(40, 70)">
      <rect width="820" height="150" fill="#0B121E" stroke="#C5A059" stroke-width="1.5"/>
      <text x="24" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="2" fill="#C5A059">STAGE 1: MARKET ENTRY NOW</text>
      
      <g transform="translate(24, 55)">
        <text x="0" y="20" font-family="Georgia, serif" font-weight="700" font-size="20" fill="#FFFFFF">Shilpa Biologicals</text>
        <text x="0" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">IP, development, manufacture</text>
      </g>

      <g transform="translate(370, 75)">
        <text x="35" y="0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#C5A059" text-anchor="middle">EXCLUSIVE</text>
        <text x="35" y="18" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">LICENCE →</text>
      </g>

      <g transform="translate(480, 55)">
        <text x="0" y="20" font-family="Georgia, serif" font-weight="700" font-size="20" fill="#FFFFFF">SPIMACO Bio</text>
        <text x="0" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Regulatory, access, commercialization</text>
      </g>
    </g>

    <!-- Downward Arrow -->
    <g transform="translate(450, 225)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#C5A059" stroke-width="2.5"/>
      <polygon points="0,35 -6,24 6,24" fill="#C5A059"/>
    </g>

    <!-- Stage 2 Block -->
    <g transform="translate(40, 265)">
      <rect width="820" height="120" fill="rgba(197, 160, 89, 0.1)" stroke="#C5A059" stroke-width="2"/>
      <text x="24" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="2" fill="#C5A059">STAGE 2: FUTURE SAUDI TRANSITION</text>
      <text x="24" y="68" font-family="Georgia, serif" font-weight="700" font-size="24" fill="#FFFFFF">Next: phased Saudi technology transfer.</text>
      <text x="24" y="96" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94A3B8">Intended to establish local manufacturing in Saudi Arabia (triggers &amp; timing undisclosed).</text>
    </g>
  </g>

  <!-- Key Transaction Boundaries Card -->
  <g transform="translate(90, 920)">
    <rect width="900" height="240" fill="#151F2D" stroke="#2A3A4E" stroke-width="2"/>
    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">KEY TRANSACTION BOUNDARIES</text>

    <g transform="translate(40, 75)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="18" fill="#C5A059">▪</text>
      <text x="28" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="18" fill="#FFFFFF">Shilpa: IP, development, manufacture.</text>
    </g>

    <g transform="translate(40, 125)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="18" fill="#C5A059">▪</text>
      <text x="28" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="18" fill="#FFFFFF">SPIMACO: regulatory, access, commercialization.</text>
    </g>

    <g transform="translate(40, 175)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="18" fill="#C5A059">▪</text>
      <text x="28" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="18" fill="#FFFFFF">Next: phased Saudi technology transfer.</text>
    </g>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#2A3A4E" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR THE READ →</text>
  </g>
</svg>
`;
}

function buildSlide3Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#0B121E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#0B121E"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 3 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#2A3A4E" stroke-width="1"/>

  <!-- Category Pill -->
  <g transform="translate(90, 195)">
    <rect x="0" y="0" width="220" height="34" fill="rgba(197, 160, 89, 0.15)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="110" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">PHARMASIGNAL READ</text>
  </g>

  <!-- Big Headline -->
  <g transform="translate(90, 275)">
    <text x="0" y="44" font-family="Georgia, serif" font-weight="700" font-size="46" fill="#FFFFFF">Two operating stages</text>
    <text x="0" y="100" font-family="Georgia, serif" font-weight="700" font-size="46" fill="#C5A059">need separate accountability.</text>
    <line x1="0" y1="130" x2="80" y2="130" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Three Points Card -->
  <g transform="translate(90, 455)">
    <rect width="900" height="380" fill="#151F2D" stroke="#2A3A4E" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">CORE EDITORIAL POINTS</text>

    <!-- Point 1 -->
    <g transform="translate(40, 75)">
      <circle cx="16" cy="22" r="16" fill="rgba(197, 160, 89, 0.2)" stroke="#C5A059" stroke-width="1.5"/>
      <text x="16" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#C5A059" text-anchor="middle">1</text>
      <text x="50" y="28" font-family="Georgia, serif" font-weight="700" font-size="24" fill="#FFFFFF">Launch roles are defined now.</text>
      <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Shilpa develops and manufactures; SPIMACO executes regional regulatory filings and market access.</text>
    </g>

    <!-- Point 2 -->
    <g transform="translate(40, 175)">
      <circle cx="16" cy="22" r="16" fill="rgba(197, 160, 89, 0.2)" stroke="#C5A059" stroke-width="1.5"/>
      <text x="16" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#C5A059" text-anchor="middle">2</text>
      <text x="50" y="28" font-family="Georgia, serif" font-weight="700" font-size="24" fill="#FFFFFF">Local manufacturing comes in phases.</text>
      <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Technology transfer is an intended future step—not an immediate operating condition at signing.</text>
    </g>

    <!-- Point 3 -->
    <g transform="translate(40, 275)">
      <circle cx="16" cy="22" r="16" fill="rgba(197, 160, 89, 0.2)" stroke="#C5A059" stroke-width="1.5"/>
      <text x="16" y="27" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#C5A059" text-anchor="middle">3</text>
      <text x="50" y="28" font-family="Georgia, serif" font-weight="700" font-size="24" fill="#FFFFFF">Supply and transfer incentives must remain aligned.</text>
      <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Product-supply revenue rewards current supply; transfer economics must sustain cooperation later.</text>
    </g>
  </g>

  <!-- Disclosed Boundary / Limitation Card -->
  <g transform="translate(90, 875)">
    <rect width="900" height="280" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="2"/>
    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">DISCLOSED BOUNDARY / LIMITATION</text>

    <g transform="translate(40, 80)">
      <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="26" fill="#FFFFFF">Undisclosed: transfer triggers and post-transfer economics.</text>
      <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#94A3B8" width="820">The public announcement does not disclose transfer timing, validation gates, registration ownership or post-transfer revenue splits.</text>
      <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#94A3B8" width="820">These are critical diligence checkpoints for BD teams, not evidence of partner friction.</text>
    </g>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#2A3A4E" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR PRINCIPLE →</text>
  </g>
</svg>
`;
}

function buildSlide4Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#0B121E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#0B121E"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 4 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#2A3A4E" stroke-width="1"/>

  <!-- Principle Pill -->
  <g transform="translate(90, 195)">
    <rect x="0" y="0" width="260" height="34" fill="rgba(197, 160, 89, 0.2)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="130" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">PHARMASIGNAL PRINCIPLE</text>
  </g>

  <!-- Large Principle Quote Card -->
  <g transform="translate(90, 260)">
    <rect width="900" height="320" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="2.5"/>
    <text x="50" y="80" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="34" fill="#FFFFFF">"Good localization deals define</text>
    <text x="50" y="135" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="34" fill="#FFFFFF">today’s operating roles and tomorrow’s</text>
    <text x="50" y="190" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="34" fill="#C5A059">capability transfer as separate,</text>
    <text x="50" y="245" font-family="Georgia, serif" font-weight="700" font-style="italic" font-size="34" fill="#C5A059">accountable stages."</text>
    <text x="50" y="290" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="1.5" fill="#94A3B8">— PHARMASIGNAL DEAL DESK PRINCIPLE</text>
  </g>

  <!-- What BD Leaders Should Ask -->
  <g transform="translate(90, 620)">
    <rect width="900" height="360" fill="#151F2D" stroke="#2A3A4E" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">WHAT BD LEADERS SHOULD ASK</text>

    <!-- Q1 -->
    <g transform="translate(40, 75)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="16" fill="#C5A059">01.</text>
      <text x="45" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Who owns registrations and product variations in each market?</text>
      <text x="45" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Does that regulatory control change after technology transfer?</text>
    </g>

    <!-- Q2 -->
    <g transform="translate(40, 160)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="16" fill="#C5A059">02.</text>
      <text x="45" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Which readiness and validation gates move manufacturing to Saudi Arabia?</text>
      <text x="45" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">How are supply continuity and quality-release accountability preserved?</text>
    </g>

    <!-- Q3 -->
    <g transform="translate(40, 245)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="16" fill="#C5A059">03.</text>
      <text x="45" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">How do supply pricing and economics change as local manufacture expands?</text>
      <text x="45" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Do milestone terms keep both partners committed as transfer costs evolve?</text>
    </g>
  </g>

  <!-- CTA Box with Exact Placeholder Guard -->
  <g transform="translate(90, 1020)">
    <rect width="900" height="150" fill="#C5A059" stroke="#E2C68A" stroke-width="2"/>
    <text x="450" y="44" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" letter-spacing="2" fill="#0B121E" text-anchor="middle">READ THE FULL DEAL SIGNAL · SUBSCRIBE FOR WEEKLY BD INTELLIGENCE:</text>
    <rect x="50" y="65" width="800" height="56" fill="#0B121E"/>
    <text x="450" y="100" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="1.5" fill="#C5A059" text-anchor="middle">[ARTICLE URL — ADD AFTER PUBLICATION]</text>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#2A3A4E" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#94A3B8" text-anchor="end">CONFIDENTIAL DRAFT / PREVIEW</text>
  </g>
</svg>
`;
}

// ============================================================================
// MAIN GENERATION ROUTINE
// ============================================================================

async function main() {
  console.log('Generating Shilpa-SPIMACO deterministic website hero & carousel assets...');

  // 1. Website Hero (1600 × 900)
  const heroDarkSvg = buildHeroSvg(false);
  const heroLightSvg = buildHeroSvg(true);

  const heroDarkPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_shilpa_spimaco_hero_1600x900.png');
  const heroLightPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_shilpa_spimaco_hero_1600x900_light.png');

  await sharp(Buffer.from(heroDarkSvg)).png({ quality: 95 }).toFile(heroDarkPath);
  await sharp(Buffer.from(heroLightSvg)).png({ quality: 95 }).toFile(heroLightPath);
  console.log('Hero PNGs created:', heroDarkPath, heroLightPath);

  // 2. LinkedIn Carousel Slides (1080 × 1350)
  const slide1Svg = buildSlide1Svg();
  const slide2Svg = buildSlide2Svg();
  const slide3Svg = buildSlide3Svg();
  const slide4Svg = buildSlide4Svg();

  const s1Buffer = await sharp(Buffer.from(slide1Svg)).png({ quality: 95 }).toBuffer();
  const s2Buffer = await sharp(Buffer.from(slide2Svg)).png({ quality: 95 }).toBuffer();
  const s3Buffer = await sharp(Buffer.from(slide3Svg)).png({ quality: 95 }).toBuffer();
  const s4Buffer = await sharp(Buffer.from(slide4Svg)).png({ quality: 95 }).toBuffer();

  const slide1File = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-shilpa-spimaco-mena-local-manufacturing-slide-1.png');
  const slide2File = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-shilpa-spimaco-mena-local-manufacturing-slide-2.png');
  const slide3File = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-shilpa-spimaco-mena-local-manufacturing-slide-3.png');
  const slide4File = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-shilpa-spimaco-mena-local-manufacturing-slide-4.png');

  fs.writeFileSync(slide1File, s1Buffer);
  fs.writeFileSync(slide2File, s2Buffer);
  fs.writeFileSync(slide3File, s3Buffer);
  fs.writeFileSync(slide4File, s4Buffer);
  console.log('Carousel 4 PNG slides created in:', OUTPUT_DOWNLOADS_DIR);

  // 3. Four-Page PDF Carousel (1080 × 1350 portrait)
  const pdfDoc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1350],
    compress: true
  });

  const slidesBuffers = [s1Buffer, s2Buffer, s3Buffer, s4Buffer];
  for (let i = 0; i < slidesBuffers.length; i++) {
    if (i > 0) {
      pdfDoc.addPage([1080, 1350], 'portrait');
    }
    const base64Data = `data:image/png;base64,${slidesBuffers[i].toString('base64')}`;
    pdfDoc.addImage(base64Data, 'PNG', 0, 0, 1080, 1350, undefined, 'FAST');
  }

  const pdfPath = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-shilpa-spimaco-mena-local-manufacturing-linkedin-carousel.pdf');
  const pdfOutput = pdfDoc.output('arraybuffer');
  fs.writeFileSync(pdfPath, Buffer.from(pdfOutput));
  console.log('Carousel 4-page PDF created:', pdfPath);

  console.log('All visual assets generated successfully!');
}

main().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
