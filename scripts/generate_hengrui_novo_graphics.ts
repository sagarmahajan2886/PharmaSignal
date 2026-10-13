import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { jsPDF } from 'jspdf';

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');

// ============================================================================
// 1. DETERMINISTIC WEBSITE HERO SVG (1600 × 900 landscape)
// Conforms strictly to Section 8 & 9 of authoritative brief:
// Headline: ONE ASSET. TWO TERRITORY PATHS.
// Left: Hengrui Pharma / China Phase I approval
// Centre arrow: EXCLUSIVE EX-GREATER-CHINA RIGHTS →
// Right: Novo / DEVELOP · MANUFACTURE · COMMERCIALISE
// Metric: USD 300M UPFRONT · AGREEMENT SUBJECT TO CLOSING
// ============================================================================

function buildHeroSvg(isLight: boolean = false): string {
  const bg = isLight ? '#F8F9FA' : '#061426';
  const cardBg = isLight ? '#FFFFFF' : '#0D1E33';
  const cardBorder = isLight ? '#CBD5E1' : '#1E3553';
  const textPrimary = isLight ? '#0B121E' : '#FFFFFF';
  const textMuted = isLight ? '#64748B' : '#94A3B8';
  const gold = isLight ? '#9A7426' : '#C5A059';
  const goldBg = isLight ? 'rgba(154, 116, 38, 0.08)' : 'rgba(197, 160, 89, 0.12)';
  const goldBorder = isLight ? '#9A7426' : '#C5A059';
  const cyanAccent = isLight ? '#0369A1' : '#38BDF8';
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
    <text x="710" y="22" font-family="'JetBrains Mono', 'Courier New', monospace" font-weight="700" font-size="14" letter-spacing="3" fill="${gold}" text-anchor="middle">TERRITORIAL LICENSING · DEAL SIGNAL</text>
    <text x="1420" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="end">02 OCT 2026</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#1E2C3F'}" stroke-width="1"/>

  <!-- Main Editorial Headline (Section 8: ONE ASSET. TWO TERRITORY PATHS.) -->
  <g transform="translate(800, 190)">
    <text x="0" y="0" font-family="Georgia, serif" font-weight="700" font-size="40" letter-spacing="0.5" fill="${textPrimary}" text-anchor="middle">ONE ASSET. TWO TERRITORY PATHS.</text>
    <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="${textMuted}" text-anchor="middle">Hengrui and Novo set the territorial boundary for HRS-1596 before Phase I evidence is mature.</text>
  </g>

  <!-- =============================================================== -->
  <!-- TRANSACTION ANCHORS & LICENCE FLOW                             -->
  <!-- =============================================================== -->

  <!-- LEFT NAME BLOCK: Hengrui Pharma -->
  <g transform="translate(90, 280)" filter="url(#anchorShadow)">
    <rect width="440" height="280" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="440" height="6" fill="${gold}"/>

    <g transform="translate(32, 38)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">ORIGINATOR / LICENSOR</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="30" letter-spacing="0.5" fill="${textPrimary}">Hengrui Pharma</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Jiangsu Hengrui · Shanghai / Lianyungang</text>

      <line x1="0" y1="108" x2="376" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="136" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">TERRITORIAL STATUS:</text>
      <text x="0" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="${textPrimary}">China Phase I Approval</text>
      <text x="0" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">HRS-1596 · Oral GLP-1/GIP Dual Agonist</text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${cyanAccent}">Excluded: Mainland, HK, Macao &amp; Taiwan</text>
    </g>
  </g>

  <!-- CENTRAL VALUE NODE: Deal Terms & Geographic Partition -->
  <g transform="translate(570, 280)" filter="url(#centerShadow)">
    <rect width="460" height="280" rx="4" fill="${cardBg}" stroke="${goldBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="460" height="6" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="412" height="30" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="206" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="11.5" letter-spacing="1.5" fill="${gold}" text-anchor="middle">EXCLUSIVE EX-GREATER-CHINA RIGHTS →</text>

      <!-- Headline Metric (Section 8: USD 300M UPFRONT · AGREEMENT SUBJECT TO CLOSING) -->
      <g transform="translate(0, 50)">
        <text x="206" y="32" font-family="'JetBrains Mono', monospace" font-weight="900" font-size="32" letter-spacing="1" fill="${gold}" text-anchor="middle">USD 300M UPFRONT</text>
        <text x="206" y="52" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${textMuted}" text-anchor="middle">UP TO USD 2.6B TOTAL CEILING · SUBJECT TO CLOSING</text>
      </g>

      <line x1="20" y1="120" x2="392" y2="120" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <!-- Economic Breakdown -->
      <g transform="translate(10, 140)">
        <g transform="translate(0, 0)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Committed:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">$300M cash upfront upon Q4 HSR closing</text>
        </g>
        <g transform="translate(0, 26)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Contingent:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Up to $2.3B clinical, regulatory &amp; sales milestones</text>
        </g>
        <g transform="translate(0, 52)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Royalties:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Tiered net sales royalties in licensed territory</text>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT NAME BLOCK: Novo -->
  <g transform="translate(1070, 280)" filter="url(#anchorShadow)">
    <rect width="440" height="280" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="440" height="6" fill="${gold}"/>

    <g transform="translate(32, 38)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">GLOBAL LICENSEE</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="30" letter-spacing="0.5" fill="${textPrimary}">Novo</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Novo Nordisk A/S · Bagsværd, Denmark</text>

      <line x1="0" y1="108" x2="376" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="136" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">ACQUIRED RESPONSIBILITIES:</text>
      <text x="0" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="${textPrimary}">DEVELOP · MANUFACTURE · COMMERCIALISE</text>
      <text x="0" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Global ex-Greater-China development &amp; supply</text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${cyanAccent}">Fits cardiometabolic &amp; oral peptide engine</text>
    </g>
  </g>

  <!-- =============================================================== -->
  <!-- BOTTOM SECTION: MECHANISM KEY TAKEAWAYS                         -->
  <!-- =============================================================== -->
  <g transform="translate(90, 595)">
    <rect width="1420" height="175" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>

    <g transform="translate(40, 28)">
      <text x="0" y="18" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" letter-spacing="2" fill="${gold}">PHARMASIGNAL DECISION INSIGHT:</text>

      <g transform="translate(0, 45)">
        <!-- Insight 1 -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="410" height="65" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">1. Control Moves Early</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">All 3 operating rights move before Phase I enters clinic.</text>
        </g>

        <!-- Insight 2 -->
        <g transform="translate(460, 0)">
          <rect x="0" y="0" width="410" height="65" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">2. Excluded Territory Interface</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">Data, safety &amp; CMC decisions cross the border long before launch.</text>
        </g>

        <!-- Insight 3 -->
        <g transform="translate(920, 0)">
          <rect x="0" y="0" width="410" height="65" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">3. Economics Follow Progress</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">$300M committed upfront; $2.3B contingent on execution gates.</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Footer Tickers -->
  <g transform="translate(90, 810)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">HENGRUI PHARMA (SHA: 600276) · HRS-1596 ORAL GLP-1/GIP</text>
    <text x="1420" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}" text-anchor="end">NOVO NORDISK A/S (CPH: NOVO-B · NYSE: NVO)</text>
  </g>
</svg>
  `;
}

// ============================================================================
// 2. DETERMINISTIC LINKEDIN CAROUSEL SLIDES (1080 × 1350 portrait)
// Section 10 & 13 exact visible copy:
// Slide 1: The territory split happens before Phase I.
// Slide 2: Hengrui Pharma → ex-Greater-China rights → Novo; HRS-1596; Novo develops, manufactures and commercialises; territory excludes Chinese mainland, Hong Kong, Macao and Taiwan; USD 300M upfront.
// Slide 3: A territory schedule is not an operating plan; rights clearly divided; control bundled with Novo; interface undisclosed; open question on evidence and CMC changes.
// Slide 4: Approved principle, Read the full Deal Signal, Subscribe for weekly BD decision intelligence, and [ARTICLE URL — ADD AFTER PUBLICATION].
// ============================================================================

function buildSlide1Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#061426"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 1 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#1E2C3F" stroke-width="1"/>

  <!-- Category & Date Pill -->
  <g transform="translate(90, 200)">
    <rect x="0" y="0" width="280" height="36" fill="rgba(197, 160, 89, 0.15)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="140" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">DEAL SIGNAL · 29 SEP 2026</text>
  </g>

  <!-- Big Display Headline (Exact Slide 1 text) -->
  <g transform="translate(90, 290)">
    <text x="0" y="44" font-family="Georgia, serif" font-weight="700" font-size="52" fill="#FFFFFF">The territory split</text>
    <text x="0" y="106" font-family="Georgia, serif" font-weight="700" font-size="52" fill="#C5A059">happens before Phase I.</text>
    <line x1="0" y1="140" x2="80" y2="140" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Core Brief Card -->
  <g transform="translate(90, 480)">
    <rect width="900" height="260" fill="#0D1E33" stroke="#1E3553" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <g transform="translate(40, 50)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">EXECUTIVE TRANSACTION BRIEF</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#FFFFFF" width="820">Hengrui and Novo divided control while HRS-1596’s clinical evidence and product choices are still being formed.</text>
      <line x1="0" y1="120" x2="820" y2="120" stroke="#1E3553" stroke-width="1"/>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Asset: Once-weekly oral GLP-1/GIP dual receptor agonist (Phase I-ready)</text>
    </g>
  </g>

  <!-- Metrics Highlight -->
  <g transform="translate(90, 780)">
    <g transform="translate(0, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">UPFRONT CAPITAL</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#FFFFFF">$300M</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Cash payable at Q4 closing</text>
    </g>

    <g transform="translate(310, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">POTENTIAL CEILING</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#C5A059">UP TO $2.6B</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Contingent milestones + royalties</text>
    </g>

    <g transform="translate(620, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">TERRITORY SCOPE</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="900" fill="#FFFFFF">GLOBAL</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Ex-Greater-China &amp; Taiwan</text>
    </g>
  </g>

  <!-- Takeaway Card -->
  <g transform="translate(90, 970)">
    <rect width="900" height="180" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL TAKE</text>
    <text x="40" y="85" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Novo receives development, manufacturing and commercialisation control across the licensed territory.</text>
    <text x="40" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">The key execution question is how evidence and product decisions will cross that boundary.</text>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#1E2C3F" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR DEAL MAP →</text>
  </g>
</svg>
  `;
}

function buildSlide2Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#061426"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 2 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#1E2C3F" stroke-width="1"/>

  <!-- Category & Header -->
  <g transform="translate(90, 200)">
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">THE DEAL MAP</text>
    <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="44" fill="#FFFFFF">Hengrui Pharma</text>
    <text x="0" y="118" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#C5A059">→ ex-Greater-China rights → Novo</text>
    <line x1="0" y1="145" x2="80" y2="145" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Verified Deal Map Architecture (Slide 2 items) -->
  <g transform="translate(90, 410)">
    <!-- Box 1: Asset Stage -->
    <g transform="translate(0, 0)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">ASSET &amp; STAGE</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">HRS-1596 · Phase I-Ready</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Oral GLP-1/GIP dual agonist with potential for once-weekly dosing. Hengrui holds China Phase I approval.</text>
      </g>
    </g>

    <!-- Box 2: Novo Scope -->
    <g transform="translate(0, 160)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">NOVO RESPONSIBILITIES</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">Develop, Manufacture, Commercialise</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">All three operating rights bundled together across the licensed worldwide territory.</text>
      </g>
    </g>

    <!-- Box 3: Territory Boundary -->
    <g transform="translate(0, 320)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">TERRITORY EXCLUSIONS</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">Excludes Chinese mainland, Hong Kong, Macao &amp; Taiwan</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Hengrui retains rights in Greater China where it advances weight management &amp; T2D trials.</text>
      </g>
    </g>

    <!-- Box 4: Financial Headline -->
    <g transform="translate(0, 480)">
      <rect width="900" height="130" fill="rgba(197, 160, 89, 0.12)" stroke="#C5A059" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">COMMITTED VS CONTINGENT ECONOMICS</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">USD 300M Upfront · Up to USD 2.6B Potential Total</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Balance contingent on development, regulatory and commercial gates, plus net sales royalties.</text>
      </g>
    </g>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#1E2C3F" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR EDITORIAL READ →</text>
  </g>
</svg>
  `;
}

function buildSlide3Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#061426"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 3 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#1E2C3F" stroke-width="1"/>

  <!-- Category & Header (Exact Slide 3 text) -->
  <g transform="translate(90, 200)">
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL READ</text>
    <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#FFFFFF">A territory schedule is</text>
    <text x="0" y="118" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#C5A059">not an operating plan.</text>
    <line x1="0" y1="145" x2="80" y2="145" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- 3 Structural Checkpoints (Exact Slide 3 bullets) -->
  <g transform="translate(90, 400)">
    <rect width="900" height="340" fill="#0D1E33" stroke="#1E3553" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <g transform="translate(45, 45)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">STRUCTURAL EXECUTION INTERFACE</text>

      <g transform="translate(0, 50)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Rights: clearly divided.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Territorial boundary is explicitly carved out at contract signing.</text>
      </g>

      <g transform="translate(0, 130)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Control: bundled with Novo.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Development, manufacturing &amp; commercialisation sit under one partner.</text>
      </g>

      <g transform="translate(0, 210)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Interface: not disclosed.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Cross-territory data sharing and global CMC change rules remain undisclosed.</text>
      </g>
    </g>
  </g>

  <!-- Open Diligence Question Card (Exact Slide 3 text) -->
  <g transform="translate(90, 800)">
    <rect width="900" height="280" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="1.5"/>
    <g transform="translate(45, 45)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">THE OPEN QUESTION FOR BD TEAMS</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#FFFFFF" width="810">How will clinical evidence, safety reporting and CMC changes cross the boundary?</text>
      <line x1="0" y1="120" x2="810" y2="120" stroke="#1E3553" stroke-width="1"/>
      <text x="0" y="158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Dose selection, safety reporting, formulation comparability and manufacturing changes will shape the same asset across both programmes long before launch.</text>
    </g>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#1E2C3F" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM · DEAL DESK</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">SWIPE FOR PRINCIPLE →</text>
  </g>
</svg>
  `;
}

function buildSlide4Svg(): string {
  return `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" style="background:#061426; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="1080" height="1350" fill="#061426"/>
  <rect x="54" y="54" width="972" height="1242" fill="none" stroke="#C5A059" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Header Bar -->
  <g transform="translate(90, 110)">
    <text x="0" y="24" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="1.3" fill="#FFFFFF">PHARMA<tspan fill="#C5A059">SIGNAL</tspan></text>
    <text x="900" y="24" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="end">SLIDE 4 OF 4</text>
  </g>
  <line x1="90" y1="150" x2="990" y2="150" stroke="#1E2C3F" stroke-width="1"/>

  <!-- Category & Header -->
  <g transform="translate(90, 200)">
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL PRINCIPLE</text>
  </g>

  <!-- Principle Quote Card (Exact Approved Principle) -->
  <g transform="translate(90, 260)">
    <rect width="900" height="400" fill="#0D1E33" stroke="#C5A059" stroke-width="2"/>
    <g transform="translate(50, 60)">
      <text x="0" y="40" font-family="Georgia, serif" font-size="64" fill="#C5A059">“</text>
      <text x="0" y="100" font-family="Georgia, serif" font-size="34" font-weight="700" line-height="1.3" fill="#FFFFFF">A territorial carve-out works only</text>
      <text x="0" y="150" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#FFFFFF">when the rights boundary is matched</text>
      <text x="0" y="200" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#C5A059">by clear rules for the evidence and</text>
      <text x="0" y="250" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#C5A059">product decisions that cross it.</text>
      <text x="0" y="300" font-family="Georgia, serif" font-size="64" fill="#C5A059">”</text>
    </g>
  </g>

  <!-- CTA Box (Exact Slide 4 Copy) -->
  <g transform="translate(90, 720)">
    <rect width="900" height="340" fill="rgba(197, 160, 89, 0.08)" stroke="#1E3553" stroke-width="1.5"/>

    <g transform="translate(50, 50)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">READ &amp; SUBSCRIBE</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#FFFFFF">Read the full Deal Signal.</text>
      <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="#94A3B8">Subscribe for weekly BD decision intelligence.</text>

      <line x1="0" y1="140" x2="800" y2="140" stroke="#1E3553" stroke-width="1"/>

      <!-- Canonical URL Placeholder as strictly specified in Section 10 & 11 -->
      <g transform="translate(0, 175)">
        <rect width="800" height="60" fill="#061426" stroke="#C5A059" stroke-width="1.5"/>
        <text x="400" y="37" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="1.5" fill="#C5A059" text-anchor="middle">[ARTICLE URL — ADD AFTER PUBLICATION]</text>
      </g>
    </g>
  </g>

  <!-- Footer Navigation -->
  <g transform="translate(90, 1220)">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#1E2C3F" stroke-width="1"/>
    <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL.COM</text>
    <text x="900" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#FFFFFF" text-anchor="end">EXECUTIVE DECISION INTELLIGENCE</text>
  </g>
</svg>
  `;
}

async function run() {
  if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
    fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_DOWNLOADS_DIR)) {
    fs.mkdirSync(OUTPUT_DOWNLOADS_DIR, { recursive: true });
  }

  console.log('Generating Hengrui-Novo graphics...');

  // 1. Dark Hero (1600x900)
  const darkSvg = buildHeroSvg(false);
  const darkHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_hengrui_novo_hero_1600x900.png');
  await sharp(Buffer.from(darkSvg)).png().toFile(darkHeroPath);
  console.log(`Saved: ${darkHeroPath}`);

  // 2. Light Hero (1600x900)
  const lightSvg = buildHeroSvg(true);
  const lightHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_hengrui_novo_hero_1600x900_light.png');
  await sharp(Buffer.from(lightSvg)).png().toFile(lightHeroPath);
  console.log(`Saved: ${lightHeroPath}`);

  // 3. Four Portrait Slides (1080x1350)
  const slide1Svg = buildSlide1Svg();
  const slide1Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-hengrui-novo-hrs1596-territorial-boundary-slide-1.png');
  await sharp(Buffer.from(slide1Svg)).png().toFile(slide1Path);
  console.log(`Saved: ${slide1Path}`);

  const slide2Svg = buildSlide2Svg();
  const slide2Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-hengrui-novo-hrs1596-territorial-boundary-slide-2.png');
  await sharp(Buffer.from(slide2Svg)).png().toFile(slide2Path);
  console.log(`Saved: ${slide2Path}`);

  const slide3Svg = buildSlide3Svg();
  const slide3Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-hengrui-novo-hrs1596-territorial-boundary-slide-3.png');
  await sharp(Buffer.from(slide3Svg)).png().toFile(slide3Path);
  console.log(`Saved: ${slide3Path}`);

  const slide4Svg = buildSlide4Svg();
  const slide4Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-hengrui-novo-hrs1596-territorial-boundary-slide-4.png');
  await sharp(Buffer.from(slide4Svg)).png().toFile(slide4Path);
  console.log(`Saved: ${slide4Path}`);

  // 4. Generate 4-Page PDF Carousel
  console.log('Generating 4-page LinkedIn Carousel PDF...');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: [1080, 1350]
  });

  const slidePaths = [slide1Path, slide2Path, slide3Path, slide4Path];
  for (let i = 0; i < slidePaths.length; i++) {
    if (i > 0) pdf.addPage([1080, 1350], 'portrait');
    const imgData = fs.readFileSync(slidePaths[i]);
    const base64 = `data:image/png;base64,${imgData.toString('base64')}`;
    pdf.addImage(base64, 'PNG', 0, 0, 1080, 1350);
  }

  const pdfPath = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-hengrui-novo-hrs1596-territorial-boundary-linkedin-carousel.pdf');
  fs.writeFileSync(pdfPath, Buffer.from(pdf.output('arraybuffer')));
  console.log(`Saved: ${pdfPath}`);

  console.log('Finished generating all Hengrui-Novo visual assets!');
}

run().catch((err) => {
  console.error('Error generating Hengrui-Novo graphics:', err);
  process.exit(1);
});
