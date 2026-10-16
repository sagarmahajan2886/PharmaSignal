import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { jsPDF } from 'jspdf';

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');

// ============================================================================
// 1. DETERMINISTIC WEBSITE HERO SVG (1600 × 900 landscape)
// Headline: ONE PLATFORM. TARGETED REGIONAL CARVE-OUT.
// Left: Biohaven Ltd. / MoDE™ Pan-IgG Degrader Portfolio (BHV-1300 Phase 3)
// Centre arrow: EXCLUSIVE ASIA LICENSING RIGHTS →
// Right: Ono Pharmaceutical / Japan, South Korea, Taiwan & ASEAN
// Metric: USD 80M UPFRONT · UP TO USD 100M NEAR-TERM · ~20% ROYALTIES
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
    <text x="710" y="22" font-family="'JetBrains Mono', 'Courier New', monospace" font-weight="700" font-size="14" letter-spacing="3" fill="${gold}" text-anchor="middle">TERRITORIAL CARVE-OUT · DEAL SIGNAL</text>
    <text x="1420" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="end">09 OCT 2026</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#1E2C3F'}" stroke-width="1"/>

  <!-- Main Editorial Headline -->
  <g transform="translate(800, 190)">
    <text x="0" y="0" font-family="Georgia, serif" font-weight="700" font-size="38" letter-spacing="0.5" fill="${textPrimary}" text-anchor="middle">ONE PLATFORM. TARGETED REGIONAL CARVE-OUT.</text>
    <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="${textMuted}" text-anchor="middle">Biohaven secures Asian capital and ~20% royalties while retaining US, European and China rights.</text>
  </g>

  <!-- =============================================================== -->
  <!-- TRANSACTION ANCHORS & LICENCE FLOW                             -->
  <!-- =============================================================== -->

  <!-- LEFT NAME BLOCK: Biohaven Ltd. -->
  <g transform="translate(90, 275)" filter="url(#anchorShadow)">
    <rect width="440" height="295" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="440" height="6" fill="${gold}"/>

    <g transform="translate(32, 36)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">ORIGINATOR / LICENSOR</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="30" letter-spacing="0.5" fill="${textPrimary}">Biohaven Ltd.</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Biohaven Ltd. (NYSE: BHVN) · New Haven, CT</text>

      <line x1="0" y1="108" x2="376" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="134" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">PORTFOLIO &amp; STAGE:</text>
      <text x="0" y="158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="${textPrimary}">MoDE™ Pan-IgG Degrader Portfolio</text>
      <text x="0" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Lead: BHV-1300 (Phase 3 in Graves' Disease)</text>
      <text x="0" y="202" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Next-Gen: BHV-1310 &amp; BHV-1320</text>
      <text x="0" y="226" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${cyanAccent}">Retained Rights: US, Europe, China &amp; Rest of World</text>
    </g>
  </g>

  <!-- CENTRAL VALUE NODE: Deal Terms & Territorial Carve-Out -->
  <g transform="translate(570, 275)" filter="url(#centerShadow)">
    <rect width="460" height="295" rx="4" fill="${cardBg}" stroke="${goldBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="460" height="6" fill="${gold}"/>

    <g transform="translate(24, 28)">
      <rect x="0" y="0" width="412" height="30" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="206" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="11.5" letter-spacing="1.5" fill="${gold}" text-anchor="middle">EXCLUSIVE ASIA REGIONAL RIGHTS →</text>

      <!-- Headline Metric -->
      <g transform="translate(0, 48)">
        <text x="206" y="32" font-family="'JetBrains Mono', monospace" font-weight="900" font-size="30" letter-spacing="1" fill="${gold}" text-anchor="middle">USD 80M UPFRONT</text>
        <text x="206" y="52" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${textMuted}" text-anchor="middle">UP TO $100M NEAR-TERM · APPROX. 20% ROYALTIES</text>
      </g>

      <line x1="20" y1="116" x2="392" y2="116" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <!-- Economic Breakdown -->
      <g transform="translate(10, 134)">
        <g transform="translate(0, 0)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Committed Upfront:</text>
          <text x="146" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">$80M cash payable upon closing</text>
        </g>
        <g transform="translate(0, 26)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Near-Term Milestone:</text>
          <text x="146" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">$20M payable within 12 months</text>
        </g>
        <g transform="translate(0, 52)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Commercial Royalties:</text>
          <text x="146" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">~20% net sales royalties in territory</text>
        </g>
        <g transform="translate(0, 78)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Contingent Upside:</text>
          <text x="146" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Development &amp; commercial sales milestones</text>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT NAME BLOCK: Ono Pharmaceutical -->
  <g transform="translate(1070, 275)" filter="url(#anchorShadow)">
    <rect width="440" height="295" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="440" height="6" fill="${gold}"/>

    <g transform="translate(32, 36)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">REGIONAL LICENSEE</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="28" letter-spacing="0.5" fill="${textPrimary}">Ono Pharmaceutical</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Ono Pharmaceutical Co., Ltd. (TYO: 4528) · Osaka</text>

      <line x1="0" y1="108" x2="376" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="134" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">LICENSED TERRITORY:</text>
      <text x="0" y="158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="${textPrimary}">Japan, South Korea, Taiwan &amp; ASEAN</text>
      <text x="0" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">ASEAN member states: Singapore, Thailand, etc.</text>
      <text x="0" y="204" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${cyanAccent}">Responsibilities: Regional Dev, PMDA/MFDS &amp; Launch</text>
      <text x="0" y="226" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Leverages established East Asian field infrastructure</text>
    </g>
  </g>

  <!-- =============================================================== -->
  <!-- BOTTOM SECTION: MECHANISM KEY TAKEAWAYS                         -->
  <!-- =============================================================== -->
  <g transform="translate(90, 600)">
    <rect width="1420" height="175" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>

    <g transform="translate(40, 26)">
      <text x="0" y="18" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" letter-spacing="2" fill="${gold}">PHARMASIGNAL DECISION INSIGHT:</text>

      <g transform="translate(0, 42)">
        <!-- Insight 1 -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="410" height="68" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">1. Western Core Preservation</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">100% of US, EU and China rights retained for maximum value capture.</text>
        </g>

        <!-- Insight 2 -->
        <g transform="translate(460, 0)">
          <rect x="0" y="0" width="410" height="68" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">2. Unusual Royalty Strength (~20%)</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">Significantly exceeds standard 10–14% regional rates, reflecting Phase 3 fit.</text>
        </g>

        <!-- Insight 3 -->
        <g transform="translate(920, 0)">
          <rect x="0" y="0" width="410" height="68" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">3. Non-Dilutive Balance Sheet Lift</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">$100M near-term funds Biohaven's global pivotal trials without dilution.</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Footer Tickers -->
  <g transform="translate(90, 812)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">BIOHAVEN LTD. (NYSE: BHVN) · MoDE™ PAN-IgG DEGRADERS (BHV-1300)</text>
    <text x="1420" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}" text-anchor="end">ONO PHARMACEUTICAL CO., LTD. (TYO: 4528 · OTC: OPHLY)</text>
  </g>
</svg>
  `;
}

// ============================================================================
// 2. DETERMINISTIC LINKEDIN CAROUSEL SLIDES (1080 × 1350 portrait)
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
    <text x="140" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059" text-anchor="middle">DEAL SIGNAL · 09 OCT 2026</text>
  </g>

  <!-- Big Display Headline -->
  <g transform="translate(90, 290)">
    <text x="0" y="44" font-family="Georgia, serif" font-weight="700" font-size="50" fill="#FFFFFF">Biohaven carves out Asia</text>
    <text x="0" y="106" font-family="Georgia, serif" font-weight="700" font-size="50" fill="#C5A059">to fund global Phase 3.</text>
    <line x1="0" y1="140" x2="80" y2="140" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Core Brief Card -->
  <g transform="translate(90, 480)">
    <rect width="900" height="260" fill="#0D1E33" stroke="#1E3553" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <g transform="translate(40, 50)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">EXECUTIVE TRANSACTION BRIEF</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#FFFFFF" width="820">Biohaven licenses MoDE pan-IgG degrader portfolio in Asia to Ono for $100M near-term cash, keeping US, EU and China.</text>
      <line x1="0" y1="120" x2="820" y2="120" stroke="#1E3553" stroke-width="1"/>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#94A3B8">Lead Candidate: BHV-1300 (Phase 3 in Graves' disease) + Next-Gen BHV-1310 &amp; BHV-1320</text>
    </g>
  </g>

  <!-- Metrics Highlight -->
  <g transform="translate(90, 780)">
    <g transform="translate(0, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">UPFRONT CAPITAL</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#FFFFFF">$80M</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Cash payable at closing</text>
    </g>

    <g transform="translate(310, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">NEAR-TERM TOTAL</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#C5A059">$100M</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Incl. $20M milestone within 1 yr</text>
    </g>

    <g transform="translate(620, 0)">
      <rect width="280" height="150" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <text x="24" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">ROYALTY RETENTION</text>
      <text x="24" y="85" font-family="'JetBrains Mono', monospace" font-size="32" font-weight="900" fill="#FFFFFF">~20%</text>
      <text x="24" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#94A3B8">Net sales royalties in territory</text>
    </g>
  </g>

  <!-- Takeaway Card -->
  <g transform="translate(90, 970)">
    <rect width="900" height="180" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="1.5"/>
    <text x="40" y="45" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL TAKE</text>
    <text x="40" y="85" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Biohaven secures non-dilutive clinical funding without surrendering core commercial markets.</text>
    <text x="40" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Ono gains an autoinjector IgG degrader platform with established Phase 3 momentum across Japan &amp; East Asia.</text>
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
    <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="44" fill="#FFFFFF">Biohaven Ltd.</text>
    <text x="0" y="118" font-family="Georgia, serif" font-weight="700" font-size="36" fill="#C5A059">→ Asian regional rights → Ono</text>
    <line x1="0" y1="145" x2="80" y2="145" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- Deal Map Architecture -->
  <g transform="translate(90, 410)">
    <!-- Box 1: Asset Portfolio -->
    <g transform="translate(0, 0)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">PORTFOLIO &amp; TARGET</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">MoDE™ Extracellular IgG Degraders</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Lead candidate BHV-1300 in Phase 3 for Graves' disease, with autoinjector administration; follow-on degraders BHV-1310 &amp; BHV-1320.</text>
      </g>
    </g>

    <!-- Box 2: Territory Partition -->
    <g transform="translate(0, 160)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">TERRITORY PARTITION</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">Ono: Japan, Korea, Taiwan, ASEAN · Biohaven: US, EU, China</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Ono leads development and commercialization in East Asia; Biohaven retains Western &amp; China commercial rights.</text>
      </g>
    </g>

    <!-- Box 3: Economics Structure -->
    <g transform="translate(0, 320)">
      <rect width="900" height="130" fill="#0D1E33" stroke="#1E3553" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">ECONOMIC ARCHITECTURE</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">$80M Upfront + $20M Near-Term Milestone</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Up to $100M near-term capital + development &amp; sales milestones + ~20% royalties on net sales in territory.</text>
      </g>
    </g>

    <!-- Box 4: Commercial Fit -->
    <g transform="translate(0, 480)">
      <rect width="900" height="130" fill="rgba(197, 160, 89, 0.12)" stroke="#C5A059" stroke-width="1.5"/>
      <g transform="translate(32, 32)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#C5A059">EXECUTION FIT</text>
        <text x="0" y="48" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF">Ono Regional Depth vs. Biohaven Global Independence</text>
        <text x="0" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94A3B8">Ono deploys established East Asian regulatory and commercial teams; Biohaven self-funds global Phase 3.</text>
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

  <!-- Category & Header -->
  <g transform="translate(90, 200)">
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#C5A059">PHARMASIGNAL READ</text>
    <text x="0" y="70" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#FFFFFF">Carving out Asia protects</text>
    <text x="0" y="118" font-family="Georgia, serif" font-weight="700" font-size="40" fill="#C5A059">Western commercial value.</text>
    <line x1="0" y1="145" x2="80" y2="145" stroke="#C5A059" stroke-width="3"/>
  </g>

  <!-- 3 Structural Checkpoints -->
  <g transform="translate(90, 400)">
    <rect width="900" height="340" fill="#0D1E33" stroke="#1E3553" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="6" fill="#C5A059"/>

    <g transform="translate(45, 45)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">STRUCTURAL EXECUTION INTERFACE</text>

      <g transform="translate(0, 50)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Upfront Capital: Immediate non-dilutive runway.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">$80M upfront + $20M milestone funds global Phase 3 Graves' trials without equity dilution.</text>
      </g>

      <g transform="translate(0, 130)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Royalty Power: ~20% net sales participation.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Substantially above typical regional licensing royalty tiers, reflecting Phase 3 maturity.</text>
      </g>

      <g transform="translate(0, 210)">
        <circle cx="8" cy="10" r="5" fill="#C5A059"/>
        <text x="28" y="16" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF">Territory Focus: Zero loss of Western upside.</text>
        <text x="28" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Retaining US, Europe and China keeps maximum commercial value in Biohaven's hands.</text>
      </g>
    </g>
  </g>

  <!-- Open Diligence Question Card -->
  <g transform="translate(90, 800)">
    <rect width="900" height="280" fill="rgba(197, 160, 89, 0.08)" stroke="#C5A059" stroke-width="1.5"/>
    <g transform="translate(45, 45)">
      <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">THE OPEN QUESTION FOR BD TEAMS</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#FFFFFF" width="810">How will regional PMDA requirements align with global Phase 3 endpoints and autoinjector CMC?</text>
      <line x1="0" y1="120" x2="810" y2="120" stroke="#1E3553" stroke-width="1"/>
      <text x="0" y="158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#94A3B8">Coordinating Asian clinical data generation, device comparability and multi-asset follow-on gating (BHV-1310/1320) will govern the long-term value of the partnership.</text>
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

  <!-- Principle Quote Card -->
  <g transform="translate(90, 260)">
    <rect width="900" height="400" fill="#0D1E33" stroke="#C5A059" stroke-width="2"/>
    <g transform="translate(50, 60)">
      <text x="0" y="40" font-family="Georgia, serif" font-size="64" fill="#C5A059">“</text>
      <text x="0" y="100" font-family="Georgia, serif" font-size="34" font-weight="700" line-height="1.3" fill="#FFFFFF">A successful regional carve-out</text>
      <text x="0" y="150" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#FFFFFF">does not dilute the global asset;</text>
      <text x="0" y="200" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#C5A059">it funds the independence needed</text>
      <text x="0" y="250" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#C5A059">to commercialize it.</text>
      <text x="0" y="300" font-family="Georgia, serif" font-size="64" fill="#C5A059">”</text>
    </g>
  </g>

  <!-- CTA Box -->
  <g transform="translate(90, 720)">
    <rect width="900" height="340" fill="rgba(197, 160, 89, 0.08)" stroke="#1E3553" stroke-width="1.5"/>

    <g transform="translate(50, 50)">
      <text x="0" y="20" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2" fill="#C5A059">READ &amp; SUBSCRIBE</text>
      <text x="0" y="65" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#FFFFFF">Read the full Deal Signal.</text>
      <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="#94A3B8">Subscribe for weekly BD decision intelligence.</text>

      <line x1="0" y1="140" x2="800" y2="140" stroke="#1E3553" stroke-width="1"/>

      <!-- Canonical URL -->
      <g transform="translate(0, 175)">
        <rect width="800" height="60" fill="#061426" stroke="#C5A059" stroke-width="1.5"/>
        <text x="400" y="37" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="1.5" fill="#C5A059" text-anchor="middle">https://pharmasignal.com/deal-signals/biohaven-ono-mode-degrader-licensing</text>
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

  console.log('Generating Biohaven-Ono graphics...');

  // 1. Dark Hero (1600x900)
  const darkSvg = buildHeroSvg(false);
  const darkHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_biohaven_ono_hero_1600x900.png');
  await sharp(Buffer.from(darkSvg)).png().toFile(darkHeroPath);
  console.log(`Saved: ${darkHeroPath}`);

  // 2. Light Hero (1600x900)
  const lightSvg = buildHeroSvg(true);
  const lightHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_biohaven_ono_hero_1600x900_light.png');
  await sharp(Buffer.from(lightSvg)).png().toFile(lightHeroPath);
  console.log(`Saved: ${lightHeroPath}`);

  // 3. Four Portrait Slides (1080x1350)
  const slide1Svg = buildSlide1Svg();
  const slide1Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-biohaven-ono-mode-degrader-licensing-slide-1.png');
  await sharp(Buffer.from(slide1Svg)).png().toFile(slide1Path);
  console.log(`Saved: ${slide1Path}`);

  const slide2Svg = buildSlide2Svg();
  const slide2Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-biohaven-ono-mode-degrader-licensing-slide-2.png');
  await sharp(Buffer.from(slide2Svg)).png().toFile(slide2Path);
  console.log(`Saved: ${slide2Path}`);

  const slide3Svg = buildSlide3Svg();
  const slide3Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-biohaven-ono-mode-degrader-licensing-slide-3.png');
  await sharp(Buffer.from(slide3Svg)).png().toFile(slide3Path);
  console.log(`Saved: ${slide3Path}`);

  const slide4Svg = buildSlide4Svg();
  const slide4Path = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-biohaven-ono-mode-degrader-licensing-slide-4.png');
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

  const pdfPath = path.join(OUTPUT_DOWNLOADS_DIR, 'pharmasignal-biohaven-ono-mode-degrader-licensing-linkedin-carousel.pdf');
  fs.writeFileSync(pdfPath, Buffer.from(pdf.output('arraybuffer')));
  console.log(`Saved: ${pdfPath}`);

  console.log('Finished generating all Biohaven-Ono visual assets!');
}

run().catch((err) => {
  console.error('Error generating Biohaven-Ono graphics:', err);
  process.exit(1);
});
