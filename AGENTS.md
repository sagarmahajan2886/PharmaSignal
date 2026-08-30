# PharmaSignal Editorial & Visual Content Operating Guidelines

## Core Identity
PharmaSignal is a biopharma BD decision-intelligence platform focused on how licensing, partnerships, commercialization, market access, and execution create or destroy value.

---

## 1. Article Structure & Standards (Mechanism-First)
Every Deal Signal article must adhere to this structured, executive-grade format:

1. **Title**: Mechanism-focused headline (e.g., *"Instead of Finding a Licensee, Haisco Helped Create One"*, *"Alvotech Does Not License Every Market the Same Way"*).
2. **Meta Info**: Category (DEAL SIGNAL / OPPORTUNITY CREATION / LICENSING), Read time (e.g. 3–4 MIN READ), Date, and Author (PharmaSignal Deal Desk).
3. **Deal signal**: Factual, clean breakdown of the counterparties, rights partition, territories, and economics (upfronts, milestones, royalties, equity, supply).
4. **Why it matters**: Structural comparison between conventional licensing pathways and the actual transaction architecture.
5. **PharmaSignal read**:
   - **Primary Mechanism**: (e.g., *Selective Commercial Ownership*, *Opportunity Creation through Newco Architecture*, *Commercial Infrastructure Arbitrage*).
   - **Analytical Value Drivers**: Concrete breakdown of value capture layers.
   - **Structural Risk / Friction**: (e.g., *Governance Debt*, *Partner Capability Gap*, *Scale Validation*).
6. **Linked lens / explainer**: Direct references to foundational PharmaSignal frameworks.
7. **Decision use case**: Actionable BD criteria on when biopharma dealmakers should deploy this structure.
8. **What to watch next**: 4–6 measurable operational/clinical execution indicators.
9. **PharmaSignal principle**: One crisp, memorable rule of thumb in a blockquote.
10. **Source note**: Announcement date and official disclosure sources.

**Tone & Style Constraints:**
- Senior pharma executive and BD&L register.
- Strictly avoid hype, generic licensing primers, fluff adjectives, or banking clichés.

---

## 2. Visual Architecture & Infographic Standard
Every Deal Signal must include a custom, high-resolution 16:9 editorial transaction card (1600×900 / 1200×675):

- **Aesthetic**: Premium business-intelligence diagram (Dark navy `#061426` or clean light canvas `#FAFAFA`).
- **Typography**: High-contrast, clean sans-serif/monospace accents, clear visual hierarchy.
- **Content**: Left-to-right or segmented territorial flows showing counterparties, responsibilities, territories, and value streams.
- **Strict Banned Elements**: No stock photos, no scientists, DNA strands, pills, lab beakers, generic 3D shapes, or invented logos.
- **Workflow**: Render SVG diagram via `scripts/generate_diagram_images.ts` into `/public/images/` as an optimized image asset.

---

## 3. Data Model & Homepage Integration (`src/articlesData.ts`)
- Add new items to `DEAL_SIGNALS_DATA` in `/src/articlesData.ts` with `isDealSignal: true`.
- Provide `imageUrl`, `pharmaSignalRead`, `useThisWhen`, `linkedExplainers`, `tags`, and full HTML-formatted `content`.
- Ensure homepage cards display the 35–50 word executive summary, read time, and direct modal trigger (`?deal=<id>`).

---

## 4. RSS Feed Synchronization (`public/rss.xml`)
Every new Deal Signal must be inserted at the top of `/public/rss.xml` for automated distribution (e.g., Publer $\rightarrow$ LinkedIn):
- Include `<item>` with `<title>`, `<link>`, `<guid>`, `<pubDate>`, `<author>`, and `<category>`.
- Include `<enclosure>` and `<media:content>` pointing to the generated 1600×900 / 1200×675 diagram image.
- Include rich HTML formatted `<description>` and `<content:encoded>` blocks with the embedded diagram image and mechanism summary.
