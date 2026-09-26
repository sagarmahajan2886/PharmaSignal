import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// ============================================================================
// 1. DETERMINISTIC WEBSITE HERO SVG (1600 × 900 landscape)
// ============================================================================

function buildHeroSvg(isLight: boolean = false): string {
  const bg = isLight ? '#F8F9FA' : '#071526';
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
    <text x="710" y="22" font-family="'JetBrains Mono', 'Courier New', monospace" font-weight="700" font-size="14" letter-spacing="3" fill="${gold}" text-anchor="middle">RADIOLIGAND THERAPY · PRECLINICAL IN-LICENSING</text>
    <text x="1420" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="end">25 SEP 2026</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#1E2C3F'}" stroke-width="1"/>

  <!-- Main Editorial Headline -->
  <g transform="translate(800, 190)">
    <text x="0" y="0" font-family="Georgia, serif" font-weight="700" font-size="40" letter-spacing="0.5" fill="${textPrimary}" text-anchor="middle">Up to $900M ceiling. Preclinical de-risking in practice.</text>
    <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="${textMuted}" text-anchor="middle">Novartis licenses BoomRay’s preclinical radioligand asset, separating headline value from committed capital.</text>
  </g>

  <!-- =============================================================== -->
  <!-- TRANSACTION ANCHORS & LICENCE FLOW                             -->
  <!-- =============================================================== -->

  <!-- LEFT NAME BLOCK: BoomRay Pharmaceuticals -->
  <g transform="translate(90, 280)" filter="url(#anchorShadow)">
    <rect width="430" height="280" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="430" height="6" fill="${gold}"/>

    <g transform="translate(32, 38)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">ORIGINATOR / LICENSOR</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="30" letter-spacing="0.5" fill="${textPrimary}">BoomRay Pharma</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Suzhou, China · Precision Oncology</text>

      <line x1="0" y1="108" x2="366" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="136" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">CONTRIBUTED CAPABILITY:</text>
      <text x="0" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="${textPrimary}">Preclinical RLT asset &amp; discovery IP</text>
      <text x="0" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Target engagement · In vitro/in vivo validation</text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${cyanAccent}">Undisclosed upfront + development upside</text>
    </g>
  </g>

  <!-- CENTRAL VALUE NODE: Deal Terms & Economics Architecture -->
  <g transform="translate(560, 280)" filter="url(#centerShadow)">
    <rect width="480" height="280" rx="4" fill="${cardBg}" stroke="${goldBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="480" height="6" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="432" height="30" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="216" y="20" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="13" letter-spacing="2" fill="${gold}" text-anchor="middle">EXCLUSIVE WORLDWIDE LICENCE</text>

      <!-- Headline Numbers -->
      <g transform="translate(0, 50)">
        <text x="216" y="32" font-family="'JetBrains Mono', monospace" font-weight="900" font-size="36" letter-spacing="1" fill="${gold}" text-anchor="middle">UP TO $900M</text>
        <text x="216" y="52" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}" text-anchor="middle">Total Potential Deal Value Ceiling</text>
      </g>

      <line x1="20" y1="120" x2="412" y2="120" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <!-- Economic Breakdown -->
      <g transform="translate(10, 140)">
        <g transform="translate(0, 0)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Committed:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Upfront payment (undisclosed)</text>
        </g>
        <g transform="translate(0, 26)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Contingent:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Development &amp; regulatory milestones</text>
        </g>
        <g transform="translate(0, 52)">
          <circle cx="6" cy="6" r="4" fill="${gold}"/>
          <text x="18" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">Commercial:</text>
          <text x="100" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Sales milestone gates + tiered net sales royalties</text>
        </g>
      </g>
    </g>
  </g>

  <!-- RIGHT NAME BLOCK: Novartis -->
  <g transform="translate(1080, 280)" filter="url(#anchorShadow)">
    <rect width="430" height="280" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2"/>
    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="430" height="6" fill="${gold}"/>

    <g transform="translate(32, 38)">
      <rect x="0" y="0" width="160" height="24" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="80" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">GLOBAL LICENSEE</text>

      <text x="0" y="66" font-family="Georgia, serif" font-weight="700" font-size="30" letter-spacing="0.5" fill="${textPrimary}">Novartis</text>
      <text x="0" y="90" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">Basel, Switzerland · Global Radiopharma Leader</text>

      <line x1="0" y1="108" x2="366" y2="108" stroke="${isLight ? '#E2E8F0' : '#2A3A4E'}" stroke-width="1"/>

      <text x="0" y="136" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="${gold}">ACQUIRED RESPONSIBILITIES:</text>
      <text x="0" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="${textPrimary}">Worldwide IND, CMC &amp; commercialization</text>
      <text x="0" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${textMuted}">Global isotope supply chain · Hot-lab manufacturing</text>
      <text x="0" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="${cyanAccent}">Feeds Pluvicto &amp; Lutathera global franchise</text>
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
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">1. The $900M Is a Ceiling, Not Capital</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">Preclinical bio-dollars are heavily milestone-skewed.</text>
        </g>

        <!-- Insight 2 -->
        <g transform="translate(460, 0)">
          <rect x="0" y="0" width="410" height="65" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">2. Infrastructure Arbitrage in RLT</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">Discovery biotechs must partner before isotope CMC capex.</text>
        </g>

        <!-- Insight 3 -->
        <g transform="translate(920, 0)">
          <rect x="0" y="0" width="410" height="65" fill="${goldBg}" rx="3"/>
          <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${textPrimary}">3. Asymmetric Downside Protection</text>
          <text x="20" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">Novartis buys optionality; BoomRay shifts clinical capex.</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Footer Tickers -->
  <g transform="translate(90, 810)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">BOOMRAY PHARMACEUTICALS (SUZHOU) · PRECLINICAL RLT ASSET</text>
    <text x="1420" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}" text-anchor="end">NOVARTIS AG (SIX: NOVN · NYSE: NVS)</text>
  </g>
</svg>
  `;
}

async function run() {
  if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
    fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
  }

  console.log('Generating Novartis-BoomRay graphics...');

  // 1. Dark Hero (1600x900)
  const darkSvg = buildHeroSvg(false);
  const darkHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_novartis_boomray_hero_1600x900.png');
  await sharp(Buffer.from(darkSvg)).png().toFile(darkHeroPath);
  console.log(`Saved: ${darkHeroPath}`);

  // 2. Light Hero (1600x900)
  const lightSvg = buildHeroSvg(true);
  const lightHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_novartis_boomray_hero_1600x900_light.png');
  await sharp(Buffer.from(lightSvg)).png().toFile(lightHeroPath);
  console.log(`Saved: ${lightHeroPath}`);

  console.log('Finished generating Novartis-BoomRay graphics!');
}

run().catch((err) => {
  console.error('Error generating Novartis-BoomRay graphics:', err);
  process.exit(1);
});
