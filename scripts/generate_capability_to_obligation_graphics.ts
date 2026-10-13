import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// ============================================================================
// 1. DETERMINISTIC 16:9 MECHANISM DIAGRAM (1600 × 900 landscape)
// Conforms strictly to Section 6 of authoritative brief:
// Shows:
// TRANSACTION OBLIGATION
// ↓
// REQUIRED CAPABILITY
// ↓
// PARTNER EVIDENCE
// ↓
// CAPABILITY GAP
// ↓
// MITIGATION / RESPONSIBILITY DESIGN
// Uses existing dark navy (#061426), gold (#C5A059), and white visual language.
// ============================================================================

function buildMechanismSvg(isLight: boolean = false): string {
  const bg = isLight ? '#F8F9FA' : '#061426';
  const cardBg = isLight ? '#FFFFFF' : '#0D1E33';
  const cardBorder = isLight ? '#CBD5E1' : '#1E3553';
  const textPrimary = isLight ? '#0B121E' : '#FFFFFF';
  const textMuted = isLight ? '#64748B' : '#94A3B8';
  const gold = isLight ? '#9A7426' : '#C5A059';
  const goldBg = isLight ? 'rgba(154, 116, 38, 0.08)' : 'rgba(197, 160, 89, 0.12)';
  const goldBorder = isLight ? '#9A7426' : '#C5A059';
  const outerBorder = isLight ? '#9A7426' : '#C5A059';
  const outerOpacity = isLight ? '0.35' : '0.3';
  const arrowColor = isLight ? '#9A7426' : '#C5A059';

  return `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" style="background:${bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="${isLight ? '0.06' : '0.45'}"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1600" height="900" fill="${bg}"/>

  <!-- Outer Architectural Framing -->
  <rect x="50" y="45" width="1500" height="810" fill="none" stroke="${outerBorder}" stroke-opacity="${outerOpacity}" stroke-width="1.5"/>

  <!-- Minimal Header Bar -->
  <g transform="translate(90, 85)">
    <text x="0" y="22" font-family="Georgia, serif" font-weight="700" font-size="24" letter-spacing="1.3" fill="${textPrimary}">PHARMA<tspan fill="${gold}">SIGNAL</tspan></text>
    <text x="710" y="22" font-family="'JetBrains Mono', 'Courier New', monospace" font-weight="700" font-size="14" letter-spacing="3" fill="${gold}" text-anchor="middle">DECISION LENS · PARTNER STRATEGY &amp; EXECUTION</text>
    <text x="1420" y="22" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" letter-spacing="2" fill="${textMuted}" text-anchor="end">CAPABILITY-TO-OBLIGATION</text>
  </g>

  <!-- Divider Line -->
  <line x1="50" y1="125" x2="1550" y2="125" stroke="${isLight ? '#E2E8F0' : '#1E2C3F'}" stroke-width="1"/>

  <!-- Main Editorial Headline -->
  <g transform="translate(800, 185)">
    <text x="0" y="0" font-family="Georgia, serif" font-weight="700" font-size="38" letter-spacing="0.5" fill="${textPrimary}" text-anchor="middle">The Capability-to-Obligation Lens</text>
    <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="${textMuted}" text-anchor="middle">Why licensing value depends on matching execution capability to transferred responsibility—not scale.</text>
  </g>

  <!-- =============================================================== -->
  <!-- 5-STEP HORIZONTAL FLOW ARCHITECTURE                            -->
  <!-- Obligation → Required Capability → Partner Evidence → Gap → Mitigation -->
  <!-- =============================================================== -->

  <!-- STEP 1: TRANSACTION OBLIGATION -->
  <g transform="translate(90, 275)" filter="url(#boxShadow)">
    <rect width="255" height="340" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>
    <rect x="0" y="0" width="255" height="5" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="80" height="22" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">STEP 01</text>

      <text x="0" y="60" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${textPrimary}">Transaction</text>
      <text x="0" y="85" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${gold}">Obligation</text>

      <line x1="0" y1="105" x2="207" y2="105" stroke="${isLight ? '#E2E8F0' : '#1E3553'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${gold}">START WITH THE DEAL:</text>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="${textPrimary}" width="207">Map the specific duties transferred:</text>
      
      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Regulatory registration</text>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Payer &amp; hospital access</text>
        <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Key specialist reach</text>
        <text x="0" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Local manufacturing / CMC</text>
      </g>
    </g>
  </g>

  <!-- CONNECTOR 1 -->
  <g transform="translate(355, 430)">
    <text x="15" y="15" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="${arrowColor}" text-anchor="middle">→</text>
  </g>

  <!-- STEP 2: REQUIRED CAPABILITY -->
  <g transform="translate(385, 275)" filter="url(#boxShadow)">
    <rect width="255" height="340" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>
    <rect x="0" y="0" width="255" height="5" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="80" height="22" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">STEP 02</text>

      <text x="0" y="60" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${textPrimary}">Required</text>
      <text x="0" y="85" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${gold}">Capability</text>

      <line x1="0" y1="105" x2="207" y2="105" stroke="${isLight ? '#E2E8F0' : '#1E3553'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${gold}">DEFINE FIT CRITERIA:</text>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="${textPrimary}">Isolate what work demands:</text>

      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Deep agency familiarity</text>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Institutional tender track</text>
        <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• KOL medical engagement</text>
        <text x="0" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Decision speed &amp; focus</text>
      </g>
    </g>
  </g>

  <!-- CONNECTOR 2 -->
  <g transform="translate(650, 430)">
    <text x="15" y="15" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="${arrowColor}" text-anchor="middle">→</text>
  </g>

  <!-- STEP 3: PARTNER EVIDENCE -->
  <g transform="translate(680, 275)" filter="url(#boxShadow)">
    <rect width="255" height="340" rx="4" fill="${cardBg}" stroke="${goldBorder}" stroke-width="2"/>
    <rect x="0" y="0" width="255" height="6" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="80" height="22" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">STEP 03</text>

      <text x="0" y="60" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${textPrimary}">Partner</text>
      <text x="0" y="85" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${gold}">Evidence</text>

      <line x1="0" y1="105" x2="207" y2="105" stroke="${isLight ? '#E2E8F0' : '#1E3553'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${gold}">DEMAND VERIFICATION:</text>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="${textPrimary}">Test track record, not size:</text>

      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Actual launch histories</text>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Relevant dossier filings</text>
        <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Portfolio priority balance</text>
        <text x="0" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Dedicated team bandwidth</text>
      </g>
    </g>
  </g>

  <!-- CONNECTOR 3 -->
  <g transform="translate(945, 430)">
    <text x="15" y="15" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="${arrowColor}" text-anchor="middle">→</text>
  </g>

  <!-- STEP 4: CAPABILITY GAP -->
  <g transform="translate(975, 275)" filter="url(#boxShadow)">
    <rect width="255" height="340" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>
    <rect x="0" y="0" width="255" height="5" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="80" height="22" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">STEP 04</text>

      <text x="0" y="60" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${textPrimary}">Capability</text>
      <text x="0" y="85" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${gold}">Gap</text>

      <line x1="0" y1="105" x2="207" y2="105" stroke="${isLight ? '#E2E8F0' : '#1E3553'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${gold}">IDENTIFY LEAKAGE:</text>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="${textPrimary}">Where execution is vulnerable:</text>

      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Filing delays &amp; queries</text>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Slow institutional uptake</text>
        <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Asset gets deprioritized</text>
        <text x="0" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Governance friction</text>
      </g>
    </g>
  </g>

  <!-- CONNECTOR 4 -->
  <g transform="translate(1240, 430)">
    <text x="15" y="15" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="${arrowColor}" text-anchor="middle">→</text>
  </g>

  <!-- STEP 5: MITIGATION / RESPONSIBILITY DESIGN -->
  <g transform="translate(1270, 275)" filter="url(#boxShadow)">
    <rect width="240" height="340" rx="4" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5"/>
    <rect x="0" y="0" width="240" height="5" fill="${gold}"/>

    <g transform="translate(24, 30)">
      <rect x="0" y="0" width="80" height="22" fill="${goldBg}" stroke="${goldBorder}" stroke-width="1"/>
      <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="${gold}" text-anchor="middle">STEP 05</text>

      <text x="0" y="60" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${textPrimary}">Mitigation &amp;</text>
      <text x="0" y="85" font-family="Georgia, serif" font-weight="700" font-size="20" fill="${gold}">Design</text>

      <line x1="0" y1="105" x2="192" y2="105" stroke="${isLight ? '#E2E8F0' : '#1E3553'}" stroke-width="1"/>

      <text x="0" y="130" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" letter-spacing="1.2" fill="${gold}">PRICE GAP INTO DEAL:</text>
      <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="${textPrimary}">Structure solutions:</text>

      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Retain key roles</text>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Split territory rights</text>
        <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Phased tech transfer</text>
        <text x="0" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="${textMuted}">• Tie gates to proof</text>
      </g>
    </g>
  </g>

  <!-- =============================================================== -->
  <!-- BOTTOM SECTION: PHARMASIGNAL PRINCIPLE                          -->
  <!-- =============================================================== -->
  <g transform="translate(90, 650)">
    <rect width="1420" height="135" rx="4" fill="${cardBg}" stroke="${goldBorder}" stroke-width="1.5"/>

    <g transform="translate(45, 26)">
      <text x="0" y="18" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" letter-spacing="2" fill="${gold}">PHARMASIGNAL PRINCIPLE:</text>
      <text x="0" y="55" font-family="Georgia, serif" font-size="22" font-style="italic" font-weight="700" fill="${textPrimary}">“Do not select the strongest partner. Select the partner whose proven capabilities best match the obligations that determine value.”</text>
      <text x="0" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13.5" fill="${textMuted}">Enterprise capability is what a company can theoretically do. Transaction capability is what the deal actually needs it to do.</text>
    </g>
  </g>

  <!-- Footer Tickers -->
  <g transform="translate(90, 820)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}">PHARMASIGNAL DECISION INTELLIGENCE · PARTNER SELECTION ARCHITECTURE</text>
    <text x="1420" y="0" font-family="'JetBrains Mono', monospace" font-size="12" fill="${textMuted}" text-anchor="end">CAPABILITY-TO-OBLIGATION FIT</text>
  </g>
</svg>
  `;
}

async function run() {
  if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
    fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
  }

  console.log('Generating Capability-to-Obligation Lens graphics...');

  // 1. Dark Hero (1600x900)
  const darkSvg = buildMechanismSvg(false);
  const darkHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_capability_to_obligation_hero_1600x900.png');
  await sharp(Buffer.from(darkSvg)).png().toFile(darkHeroPath);
  console.log(`Saved: ${darkHeroPath}`);

  // 2. Light Hero (1600x900)
  const lightSvg = buildMechanismSvg(true);
  const lightHeroPath = path.join(OUTPUT_IMAGES_DIR, 'pharmasignal_capability_to_obligation_hero_1600x900_light.png');
  await sharp(Buffer.from(lightSvg)).png().toFile(lightHeroPath);
  console.log(`Saved: ${lightHeroPath}`);

  console.log('Finished generating Capability-to-Obligation graphics!');
}

run().catch((err) => {
  console.error('Error generating graphics:', err);
  process.exit(1);
});
