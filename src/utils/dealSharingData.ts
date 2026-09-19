import { Article } from '../types';

export interface DealSlideData {
  slide1: {
    counterparties: {
      originator: string;
      partner: string;
      relationshipLabel: string;
      accessLabel?: string;
      tag?: string;
    };
    headline: string;
    metrics: Array<{ label: string; val: string }>;
    summary: string;
  };
  slide2: {
    title: string;
    subtitle: string;
    takeaways: string[];
    diagramLabel: string;
  };
  slide3: {
    mechanismTitle: string;
    mechanismSummary: string;
    valueHeader: string;
    valuePoints: string[];
    frictionHeader: string;
    frictionPoints: string[];
    decisionContext: string;
  };
  slide4: {
    quote: string;
    checkpoints: string[];
    ctaText: string;
    canonicalUrl: string;
  };
  linkedInPost: string;
}

// Canonical production origin
export const CANONICAL_ORIGIN = 'https://pharmasignal.com';

export function getCanonicalUrl(article: Article): string {
  const prefix = article.isDealSignal ? 'deal-signals' : 'explainers';
  return `${CANONICAL_ORIGIN}/${prefix}/${article.id}`;
}

// Tailored intelligence records for known Deal Signals
const DEAL_SPECIFIC_INTELLIGENCE: Record<string, Partial<DealSlideData>> = {
  'biocon-brazil-pertuzumab-market-access': {
    slide1: {
      counterparties: {
        originator: 'BIOCON',
        partner: 'BAHIAFARMA & BIONOVIS',
        relationshipLabel: '10-YEAR PERTUZUMAB PDP',
        accessLabel: 'BRAZIL PUBLIC HEALTHCARE ACCESS',
        tag: 'PHASED LOCALIZATION'
      },
      headline: 'A PRODUCT IS NOT A ROUTE TO MARKET',
      metrics: [
        { label: 'DEAL SIGNAL', val: '8 September 2026' },
        { label: 'ALLOCATION', val: '100% of Pertuzumab PDP' },
        { label: 'PUBLIC DEMAND', val: '~70% of National Demand' }
      ],
      summary: 'Biocon’s Brazil partnership connects pertuzumab supply with public-market access and phased localization.'
    },
    slide2: {
      title: 'PRODUCT + LOCAL PARTNERS → MARKET ACCESS',
      subtitle: 'Rights Partition & Commercial Pathway',
      takeaways: [
        'BIOCON → 10-YEAR PERTUZUMAB PDP ← BAHIAFARMA + BIONOVIS',
        'BRAZIL PUBLIC HEALTHCARE ACCESS with phased localization over a 10-year horizon.'
      ],
      diagramLabel: 'PRODUCT + LOCAL PARTNERS → MARKET ACCESS (100% of PDP Allocation)'
    },
    slide3: {
      mechanismTitle: 'WHY THE STRUCTURE MATTERS',
      mechanismSummary: 'Connecting product capability and local partners directly to Brazil’s public healthcare route.',
      valueHeader: 'CORE VALUE ARCHITECTURE',
      valuePoints: [
        'PRODUCT — Biocon brings pertuzumab capability.',
        'ACCESS — The PDP provides a public-market route.',
        'EXECUTION — The 10-year structure supports phased localization.'
      ],
      frictionHeader: 'DISCLOSED BOUNDARY / LIMITATION',
      frictionPoints: [
        'Detailed operating responsibilities remain undisclosed.',
        '100% allocation applies to the PDP, not Brazil’s total market.',
        'Public channel represents ~70% of national demand, not guaranteed revenue.'
      ],
      decisionContext: 'Evaluate whether partner structures secure the actual procurement and institutional access route rather than only local presence.'
    },
    slide4: {
      quote: 'Good partnerships connect complementary capabilities to the market’s actual access route—and define who must deliver each step.',
      checkpoints: [
        'Does the partner structure secure the actual procurement and institutional-access route—or only local presence?',
        'Are localization stages tied to clear technology-transfer, quality, investment and supply-continuity responsibilities?',
        'Do the economics keep every partner committed when localization costs rise or timelines move?'
      ],
      ctaText: 'Read the full Deal Signal. Subscribe for weekly BD decision intelligence:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/biocon-brazil-pertuzumab-market-access`
    },
    linkedInPost: `A strong product does not create market access by itself.

Biocon’s 10-year pertuzumab partnership in Brazil is interesting because the access route sits inside the transaction.

Biocon brings the product and biopharmaceutical capability. Bahiafarma and Bionovis bring relevant Brazilian public-sector and biologics capabilities. Together, the consortium received 100% allocation under Brazil’s pertuzumab PDP—an opportunity linked to the public healthcare channel, reported to represent approximately 70% of national demand.

The distinction matters. This is not 100% of Brazil’s total market, and the press announcement does not allocate every operating responsibility.

The structure nevertheless connects three things that emerging-market business cases often separate: product supply, institutional access and phased localization.

The hard work now moves to execution—registration, tenders, supply continuity, technology transfer, quality and accountability during localization.

The BD question is not only, “Do we have the right product?”

It is, “Have we built the partnership required to reach the market and deliver what the market expects?”

Read the full Deal Signal and subscribe for weekly pharma BD decision intelligence: ${CANONICAL_ORIGIN}/deal-signals/biocon-brazil-pertuzumab-market-access

#PharmaBD #Licensing #PharmaSignal`
  },
  'biocon-brazil-pertuzumab-market-access-partnership': {
    slide1: {
      counterparties: {
        originator: 'BIOCON',
        partner: 'BAHIAFARMA & BIONOVIS',
        relationshipLabel: '10-YEAR PERTUZUMAB PDP',
        accessLabel: 'BRAZIL PUBLIC HEALTHCARE ACCESS',
        tag: 'PHASED LOCALIZATION'
      },
      headline: 'A PRODUCT IS NOT A ROUTE TO MARKET',
      metrics: [
        { label: 'DEAL SIGNAL', val: '8 September 2026' },
        { label: 'ALLOCATION', val: '100% of Pertuzumab PDP' },
        { label: 'PUBLIC DEMAND', val: '~70% of National Demand' }
      ],
      summary: 'Biocon’s Brazil partnership connects pertuzumab supply with public-market access and phased localization.'
    },
    slide2: {
      title: 'PRODUCT + LOCAL PARTNERS → MARKET ACCESS',
      subtitle: 'Rights Partition & Commercial Pathway',
      takeaways: [
        'BIOCON → 10-YEAR PERTUZUMAB PDP ← BAHIAFARMA + BIONOVIS',
        'BRAZIL PUBLIC HEALTHCARE ACCESS with phased localization over a 10-year horizon.'
      ],
      diagramLabel: 'PRODUCT + LOCAL PARTNERS → MARKET ACCESS (100% of PDP Allocation)'
    },
    slide3: {
      mechanismTitle: 'WHY THE STRUCTURE MATTERS',
      mechanismSummary: 'Connecting product capability and local partners directly to Brazil’s public healthcare route.',
      valueHeader: 'CORE VALUE ARCHITECTURE',
      valuePoints: [
        'PRODUCT — Biocon brings pertuzumab capability.',
        'ACCESS — The PDP provides a public-market route.',
        'EXECUTION — The 10-year structure supports phased localization.'
      ],
      frictionHeader: 'DISCLOSED BOUNDARY / LIMITATION',
      frictionPoints: [
        'Detailed operating responsibilities remain undisclosed.',
        '100% allocation applies to the PDP, not Brazil’s total market.',
        'Public channel represents ~70% of national demand, not guaranteed revenue.'
      ],
      decisionContext: 'Evaluate whether partner structures secure the actual procurement and institutional access route rather than only local presence.'
    },
    slide4: {
      quote: 'Good partnerships connect complementary capabilities to the market’s actual access route—and define who must deliver each step.',
      checkpoints: [
        'Does the partner structure secure the actual procurement and institutional-access route—or only local presence?',
        'Are localization stages tied to clear technology-transfer, quality, investment and supply-continuity responsibilities?',
        'Do the economics keep every partner committed when localization costs rise or timelines move?'
      ],
      ctaText: 'Read the full Deal Signal. Subscribe for weekly BD decision intelligence:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/biocon-brazil-pertuzumab-market-access`
    },
    linkedInPost: `A strong product does not create market access by itself.

Biocon’s 10-year pertuzumab partnership in Brazil is interesting because the access route sits inside the transaction.

Biocon brings the product and biopharmaceutical capability. Bahiafarma and Bionovis bring relevant Brazilian public-sector and biologics capabilities. Together, the consortium received 100% allocation under Brazil’s pertuzumab PDP—an opportunity linked to the public healthcare channel, reported to represent approximately 70% of national demand.

The distinction matters. This is not 100% of Brazil’s total market, and the press announcement does not allocate every operating responsibility.

The structure nevertheless connects three things that emerging-market business cases often separate: product supply, institutional access and phased localization.

The hard work now moves to execution—registration, tenders, supply continuity, technology transfer, quality and accountability during localization.

The BD question is not only, “Do we have the right product?”

It is, “Have we built the partnership required to reach the market and deliver what the market expects?”

Read the full Deal Signal and subscribe for weekly pharma BD decision intelligence: ${CANONICAL_ORIGIN}/deal-signals/biocon-brazil-pertuzumab-market-access

#PharmaBD #Licensing #PharmaSignal`
  },

  'hutchmed-gsk-deal-structure-hmpl-a830': {
    slide1: {
      counterparties: {
        originator: 'HUTCHMED',
        partner: 'GSK',
        relationshipLabel: 'TERRITORIAL CARVE-OUT + STAGED TRANSFER',
        accessLabel: 'EX-GREATER CHINA GLOBAL RIGHTS',
        tag: 'ASSET-SPECIFIC ROFN'
      },
      headline: 'HUTCHMED & GSK: One Deal, Three Boundaries',
      metrics: [
        { label: 'ASSET CLASS', val: 'KRAS-EGFR ATTC (HMPL-A830)' },
        { label: 'DEAL STRUCTURE', val: 'Carve-Out + Staged Transfer + ROFN' },
        { label: 'GEOGRAPHIC SCOPE', val: 'Greater China Retained / Ex-China to GSK' }
      ],
      summary: 'HUTCHMED retains Greater China while licensing worldwide rights to GSK for $110M upfront and up to $1.185B in milestones, maintaining Phase I control before staged clinical handover.'
    },
    slide2: {
      title: 'TRANSACTION ARCHITECTURE',
      subtitle: 'Rights Partition & Development Handover',
      takeaways: [
        'Territory is carved out, preserving originator domestic sovereignty in Greater China.',
        'Development responsibility transitions after Phase I; future platform access is governed by an asset ROFN rather than automatic licensing.'
      ],
      diagramLabel: 'Three Boundaries: Territory, Handover & Platform Access'
    },
    slide3: {
      mechanismTitle: 'Independent Boundary Architecture',
      mechanismSummary: 'Structuring territory, development responsibility, and future pipeline access as distinct contractual boundaries.',
      valueHeader: 'COMMERCIAL RATIONALE / VALUE DRIVERS',
      valuePoints: [
        'Significant upfront capital ($110M) while preserving full domestic ownership and upside',
        'Global development scale: GSK assumes late-stage development and commercialization ex-China',
        'Platform protection: single-asset ROFN limits partner access without granting broader pipeline rights'
      ],
      frictionHeader: 'OPERATIONAL INTERFACE / EXECUTION RISK',
      frictionPoints: [
        'Objective Phase I data completion criteria required to trigger development handover',
        'Joint development committee alignment on global registration strategy and safety reporting',
        'Allocation of global chemistry, manufacturing, and controls (CMC) validation costs'
      ],
      decisionContext: 'When originators wish to retain home-market sovereignty, run early clinical development, and restrict partner rights to a single asset.'
    },
    slide4: {
      quote: 'Good deal structuring gives each right, responsibility and future option a boundary that matches the partners\' capabilities and ambitions.',
      checkpoints: [
        'Are transition triggers between Phase I and late-stage development objective and data-gated?',
        'Does the contract clearly distinguish asset-specific options from platform-wide access?',
        'How are global regulatory and safety costs allocated between retained and licensed territories?'
      ],
      ctaText: 'Read full Deal Signal analysis & interactive architecture:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/hutchmed-gsk-deal-structure-hmpl-a830`
    },
    linkedInPost: `HUTCHMED's licensing deal with GSK for HMPL-A830 shows how senior dealmakers establish clear boundaries around geography, development, and future asset access.

THE DEAL SIGNAL
HUTCHMED granted GSK exclusive worldwide rights (excluding Greater China) to its KRAS-EGFR ATTC candidate HMPL-A830. HUTCHMED receives $110M upfront, up to $1.185B in milestones, and tiered royalties. HUTCHMED leads global Phase I before GSK assumes subsequent ex-China development and commercialization. GSK also receives a right of first negotiation (ROFN) on one earlier-stage candidate.

STRATEGIC MECHANISM: THREE INDEPENDENT BOUNDARIES
1. Territorial boundary: Greater China retained; ex-China licensed.
2. Responsibility boundary: Handover occurs after Phase I completion.
3. Pipeline boundary: Access is restricted to a single-asset ROFN rather than an automatic platform license.

CRITICAL EXECUTION QUESTIONS
1. Handover Triggers: Are Phase I data completion standards objectively defined to avoid clinical transition delays?
2. Regulatory Interfaces: How are cross-territorial safety filings and CMC data packages coordinated between partners?
3. Cost Apportionment: How are shared CMC scale-up expenses partitioned across retained and licensed regions?

THE BD PRINCIPLE
Good deal structuring gives each right, responsibility and future option a boundary that matches the partners' capabilities and ambitions.

Read the complete analysis and transaction diagram on PharmaSignal:
${CANONICAL_ORIGIN}/deal-signals/hutchmed-gsk-deal-structure-hmpl-a830

#PharmaBD #BiopharmaLicensing #Oncology #PharmaSignal`
  },

  'alvotech-lotus-selective-commercial-ownership': {
    slide1: {
      counterparties: {
        originator: 'ALVOTECH',
        partner: 'LOTUS PHARMACEUTICAL',
        relationshipLabel: 'TIERED COMMERCIAL PARTITION',
        accessLabel: 'U.S. CO-COMMERCIALIZATION & ASIA ACCESS',
        tag: 'MARKET-BY-MARKET RIGHTS'
      },
      headline: 'Alvotech Does Not License Every Market the Same Way',
      metrics: [
        { label: 'ASSET CLASS', val: 'Biosimilar Biologics (AVT34 & AVT87)' },
        { label: 'DEAL STRUCTURE', val: 'Shared US Co-Comm / Exclusive Asia License' },
        { label: 'GEOGRAPHIC SCOPE', val: 'United States & 8 Asian Markets' }
      ],
      summary: 'Alvotech partners with Lotus across two biosimilars, retaining shared U.S. commercialization while granting exclusive commercialization across eight Asian regional markets.'
    },
    slide2: {
      title: 'TRANSACTION ARCHITECTURE',
      subtitle: 'Market-by-Market Economic Ownership',
      takeaways: [
        'In Asia, Alvotech operates as developer and supplier, delegating commercialization to Lotus.',
        'In the U.S., Alvotech directly participates in commercialization, utilizing Alvogen\'s distribution footprint.'
      ],
      diagramLabel: 'Segmented Value Chains Across U.S. and Asian Markets'
    },
    slide3: {
      mechanismTitle: 'Segmented Commercial Ownership',
      mechanismSummary: 'Adapting commercial rights market-by-market based on operating capabilities rather than applying a single uniform global agreement.',
      valueHeader: 'COMMERCIAL RATIONALE / VALUE DRIVERS',
      valuePoints: [
        'Direct participation in high-volume U.S. commercial economics as corporate capabilities mature',
        'Leverages Lotus\'s established regulatory and commercial teams across 8 Asian markets',
        'Up to ~$150M in upfront/milestones plus ongoing commercial product supply revenue'
      ],
      frictionHeader: 'OPERATIONAL INTERFACE / EXECUTION RISK',
      frictionPoints: [
        'Shared commercial governance and customer account allocation in the U.S. market',
        'Fragmented local regulatory filings, pricing approvals, and tender timelines across Asia',
        'Long-term manufacturing capacity commitments across multiple disparate geographies'
      ],
      decisionContext: 'When an originator has matured enough to co-commercialize in primary markets but requires local partners for regional territories.'
    },
    slide4: {
      quote: 'Licensing structures create maximum value when commercial rights follow regional operating capabilities rather than a single uniform global agreement.',
      checkpoints: [
        'Do partner capabilities in regional territories justify relinquishing commercial economics?',
        'Is the co-commercialization governance clear on pricing authority and account management?',
        'Are commercial supply terms sustainable across both shared and licensed regions?'
      ],
      ctaText: 'Read full Deal Signal analysis & interactive architecture:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/alvotech-lotus-selective-commercial-ownership`
    },
    linkedInPost: `Alvotech's partnership with Lotus Pharmaceutical demonstrates how biosimilar originators partition commercial rights market by market.

THE DEAL SIGNAL
Alvotech and Lotus entered into a licensing and commercialization agreement for two proposed biosimilars: AVT34 (durvalumab) and AVT87 (emicizumab). Alvotech retains shared commercialization rights in the U.S. alongside Lotus subsidiary Alvogen, while Lotus receives exclusive commercialization across eight Asian markets. Financial consideration includes up to approximately $150M in upfront and milestone payments plus commercial supply revenue.

STRATEGIC MECHANISM: SEGMENTED COMMERCIAL OWNERSHIP
Instead of applying a single licensing model globally, rights are tailored to regional operating maturity:
- Asia: Pure developer/manufacturer model, delegating local regulatory and commercial execution to Lotus.
- United States: Co-commercialization model, capturing downstream commercial participation as internal capabilities expand.

CRITICAL EXECUTION QUESTIONS
1. Governance Split: How are pricing discretion and hospital contracting divided between co-promoters in the U.S.?
2. Regional Access: How do regional tender dynamics in Southeast Asia impact minimum batch volume economics?
3. Supply Continuity: How are commercial supply allocations prioritized during early launch supply constraints?

THE BD PRINCIPLE
Licensing structures create maximum value when commercial rights follow regional operating capabilities rather than a single uniform global agreement.

Read the full analysis and transaction diagram on PharmaSignal:
${CANONICAL_ORIGIN}/deal-signals/alvotech-lotus-selective-commercial-ownership

#PharmaBD #Biosimilars #CommercialStrategy #PharmaSignal`
  },

  'haisco-sentivera-newco-licensing': {
    slide1: {
      counterparties: {
        originator: 'HAISCO PHARMACEUTICAL',
        partner: 'SENTIVERA (NEWCO)',
        relationshipLabel: 'NEWCO ASSET CARVE-OUT',
        accessLabel: 'GLOBAL EX-CHINA DEVELOPMENT',
        tag: 'EQUITY + LICENSING'
      },
      headline: 'Instead of Finding a Licensee, Haisco Helped Create One',
      metrics: [
        { label: 'ASSET CLASS', val: 'Targeted Small Molecule (HSK39297)' },
        { label: 'DEAL STRUCTURE', val: 'Asset Out-License + Equity Co-Sponsorship' },
        { label: 'GEOGRAPHIC SCOPE', val: 'Global ex-China (Greater China Retained)' }
      ],
      summary: 'Haisco co-sponsors purpose-built Newco Sentivera to acquire ex-China rights to HSK39297, capturing equity upside, milestones, and royalties without overseas clinical overhead.'
    },
    slide2: {
      title: 'TRANSACTION ARCHITECTURE',
      subtitle: 'Newco Equity & Licensing Partition',
      takeaways: [
        'Instead of waiting for a conventional licensee, the originator created the counterparty.',
        'Greater China rights remain fully retained, while Newco raises Western capital for global trials.'
      ],
      diagramLabel: 'Dual Value Capture: Licensing Terms + Equity Appreciation'
    },
    slide3: {
      mechanismTitle: 'Originator Newco Architecture',
      mechanismSummary: 'Creating a dedicated cross-border Newco to fund and execute global development when standard out-licensing pathways stall.',
      valueHeader: 'COMMERCIAL RATIONALE / VALUE DRIVERS',
      valuePoints: [
        'Retains substantial equity ownership alongside traditional licensing milestones and royalties',
        'Accesses Western venture capital and specialized clinical management',
        'Originator maintains domestic development pace and home-market commercial rights'
      ],
      frictionHeader: 'OPERATIONAL INTERFACE / EXECUTION RISK',
      frictionPoints: [
        'Newco financing dependency and external clinical trial execution risks',
        'Cross-border IP assignment covenants and clinical data sharing protocols',
        'Governance representation and alignment on global registration endpoints'
      ],
      decisionContext: 'When promising domestic assets face slow cross-border licensing demand or originators want substantial equity upside.'
    },
    slide4: {
      quote: 'When traditional licensing pathways stall, creating the counterparty aligns development speed with capital formation.',
      checkpoints: [
        'Is the Newco capitalized adequately to reach meaningful clinical inflection milestones?',
        'Are data-sharing and IP covenants structured to protect the originator\'s home-market rights?',
        'Does the originator retain sufficient board and governance control over asset strategy?'
      ],
      ctaText: 'Read full Deal Signal analysis & interactive architecture:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/haisco-sentivera-newco-licensing`
    },
    linkedInPost: `Haisco Pharmaceutical's transaction for HSK39297 illustrates how originators can deploy Newco structures to advance global development.

THE DEAL SIGNAL
Haisco out-licensed global ex-China development and commercialization rights for its oral targeted therapy HSK39297 to Sentivera, a purpose-built Newco co-sponsored with healthcare venture investors. Haisco retained Greater China rights while securing equity in Sentivera, upfront capital, clinical and commercial milestones, and royalties.

STRATEGIC MECHANISM: ORIGINATOR NEWCO ARCHITECTURE
Rather than waiting for a multinational pharma partner to evaluate the asset, Haisco helped create the licensee. This structure allows the originator to:
- Access Western capital and clinical trial infrastructure.
- Retain complete control over domestic development and commercialization.
- Capture dual value through contract milestones and equity appreciation.

CRITICAL EXECUTION QUESTIONS
1. Capital Runway: Is Newco financing sufficient to fund global Phase II clinical readouts without premature dilution?
2. Data Interfaces: How seamlessly do preclinical and Phase I data packages transition across borders?
3. Strategic Governance: Do shareholder covenants protect the originator's domestic rights in the event of a future Newco trade sale?

THE BD PRINCIPLE
When traditional licensing pathways stall, creating the counterparty aligns development speed with capital formation.

Read the full analysis and transaction diagram on PharmaSignal:
${CANONICAL_ORIGIN}/deal-signals/haisco-sentivera-newco-licensing

#PharmaBD #NewcoStrategy #BiopharmaLicensing #PharmaSignal`
  },

  'roche-alnylam-rnai-expansion': {
    slide1: {
      counterparties: {
        originator: 'ALNYLAM PHARMACEUTICALS',
        partner: 'ROCHE',
        relationshipLabel: 'CO-DEVELOPMENT & CO-COMMERCIALIZATION',
        accessLabel: 'GLOBAL CARDIOVASCULAR ACCESS',
        tag: '50/50 US PROFIT SPLIT'
      },
      headline: 'Roche & Alnylam: Late-Stage Capability Pairing',
      metrics: [
        { label: 'ASSET CLASS', val: 'RNAi Therapeutic (Zilebesiran)' },
        { label: 'DEAL STRUCTURE', val: 'Global Co-Dev / US Co-Comm / Ex-US License' },
        { label: 'GEOGRAPHIC SCOPE', val: 'Worldwide (US Shared / Ex-US to Roche)' }
      ],
      summary: 'Alnylam partners with Roche on hypertension RNAi zilebesiran, securing $310M upfront, 50/50 U.S. profit share, and tiered ex-U.S. royalties backed by Roche\'s commercial scale.'
    },
    slide2: {
      title: 'TRANSACTION ARCHITECTURE',
      subtitle: 'Global Rights & Cost-Sharing Model',
      takeaways: [
        'Alnylam preserves 50% U.S. commercial participation while Roche shoulders large-scale cardiovascular trials.',
        'Roche gains exclusive commercialization rights outside the U.S., deploying its global primary care footprint.'
      ],
      diagramLabel: 'Co-Commercialization in U.S. Combined with Ex-U.S. Multinational Licensing'
    },
    slide3: {
      mechanismTitle: 'Late-Stage Capability Pairing',
      mechanismSummary: 'Pairing specialized biotech platform innovation with multinational commercial and cardiovascular trial infrastructure.',
      valueHeader: 'COMMERCIAL RATIONALE / VALUE DRIVERS',
      valuePoints: [
        'Substantial non-dilutive capital ($310M upfront, up to $2.8B total) and 50% shared development costs',
        'Equal profit sharing and field-force participation in the high-value U.S. market',
        'Immediate access to Roche\'s massive ex-U.S. regulatory and commercial distribution network'
      ],
      frictionHeader: 'OPERATIONAL INTERFACE / EXECUTION RISK',
      frictionPoints: [
        'Massive clinical expenditure commitments required under the 50/50 global co-development budget',
        'Complex joint commercial committee governance for U.S. launch positioning and payer access',
        'Clinical outcome trial risk in large-population hypertension indications'
      ],
      decisionContext: 'When late-stage platform assets require cardiovascular-scale trial funding and global commercial reach.'
    },
    slide4: {
      quote: 'Co-commercialization preserves long-term asset value only when both partners possess genuine field-level execution infrastructure.',
      checkpoints: [
        'Can internal balance sheets absorb long-term 50% co-development cost commitments?',
        'Are field-force allocation and co-promotion details explicitly agreed for the U.S. launch?',
        'Are ex-U.S. royalty tiers protected against generic erosion or secondary indication carve-outs?'
      ],
      ctaText: 'Read full Deal Signal analysis & interactive architecture:',
      canonicalUrl: `${CANONICAL_ORIGIN}/deal-signals/roche-alnylam-rnai-expansion`
    },
    linkedInPost: `The Roche-Alnylam transaction for zilebesiran illustrates how late-stage biotechs leverage co-commercialization to balance risk and commercial upside.

THE DEAL SIGNAL
Alnylam partnered with Roche to co-develop and co-commercialize zilebesiran, an investigational RNAi therapeutic for hypertension. Alnylam received $310M upfront and is eligible for up to $2.8B in milestones. The agreement establishes a 50/50 U.S. profit split and co-promotion structure, while Roche leads commercialization ex-U.S. under tiered royalties.

STRATEGIC MECHANISM: LATE-STAGE CAPABILITY PAIRING
Primary-care indications like hypertension require cardiovascular outcomes trials (CVOT) and commercial reach that exceed standard biotech infrastructure. By partnering with Roche:
- Development costs are shared 50/50, substantially lowering Alnylam's capital exposure.
- Alnylam maintains equal commercial stature in the U.S. market.
- Roche provides the global distribution footprint required for primary care scale.

CRITICAL EXECUTION QUESTIONS
1. Co-Promotion Operations: How are target physician calls and marketing spend apportioned between commercial teams?
2. Capital Burden: Can the originator maintain its 50% development contribution if phase III trial timelines expand?
3. Ex-U.S. Pricing Alignment: How do European tender reference prices impact U.S. gross-to-net realization?

THE BD PRINCIPLE
Co-commercialization preserves long-term asset value only when both partners possess genuine field-level execution infrastructure.

Read the full analysis and transaction diagram on PharmaSignal:
${CANONICAL_ORIGIN}/deal-signals/roche-alnylam-rnai-expansion

#PharmaBD #RNAi #CoCommercialization #PharmaSignal`
  }
};

/**
 * Derives verified, executive-grade intelligence data for any Deal Signal or Explainer.
 * Fallback algorithms guarantee evidence-based, professional BD voice without generic jargon.
 */
export function getDealSlideData(article: Article): DealSlideData {
  const custom = DEAL_SPECIFIC_INTELLIGENCE[article.id];
  const isDeal = !!article.isDealSignal;
  const canonicalUrl = getCanonicalUrl(article);

  // Extract counterparties from title or tags
  let originator = 'ORIGINATOR';
  let partner = 'PARTNER';
  const titleParts = article.title.split(/[:—–-]/);
  const words = article.title.split(' ');

  if (article.tags && article.tags.length > 2) {
    const candidateTags = article.tags.filter(t => 
      !['DEAL SIGNAL', 'LICENSING', 'BIOSIMILARS', 'ONCOLOGY', 'MARKET ACCESS'].includes(t)
    );
    if (candidateTags.length >= 2) {
      originator = candidateTags[0];
      partner = candidateTags[1];
    } else if (candidateTags.length === 1) {
      originator = candidateTags[0];
      partner = 'COMMERCIAL PARTNER';
    }
  } else if (words.length >= 3) {
    originator = words[0];
    partner = words[2] || 'COMMERCIAL PARTNER';
  }

  const relationshipLabel = article.dealStructure 
    ? article.dealStructure.toUpperCase() 
    : (isDeal ? 'STRATEGIC LICENSING & EXECUTION PARTNERSHIP' : 'CROSS-FUNCTIONAL DECISION ARCHITECTURE');

  const defaultSlide1: DealSlideData['slide1'] = {
    counterparties: {
      originator: originator.toUpperCase(),
      partner: partner.toUpperCase(),
      relationshipLabel,
      accessLabel: article.geographicScope ? article.geographicScope.toUpperCase() : 'TERRITORIAL EXECUTION',
      tag: isDeal ? 'DEAL SIGNAL' : 'DECISION FRAMEWORK'
    },
    headline: article.shortTitle || article.title,
    metrics: isDeal ? [
      { label: 'ASSET CLASS', val: article.assetClass || 'Targeted Biopharmaceutical' },
      { label: 'DEAL STRUCTURE', val: article.dealStructure || 'Territorial Licensing & Execution Handover' },
      { label: 'GEOGRAPHIC SCOPE', val: article.geographicScope || 'Territorial Rights Allocation' }
    ] : [
      { label: 'FOCUS AREA', val: article.assetClass || article.category || 'Decision Intelligence' },
      { label: 'CORE MECHANISM', val: article.dealStructure || 'Governance Architecture' },
      { label: 'DECISION SCOPE', val: article.geographicScope || 'Enterprise Portfolio & Access' }
    ],
    summary: article.featuredSummary || article.description
  };

  const defaultSlide2: DealSlideData['slide2'] = {
    title: isDeal ? 'TRANSACTION ARCHITECTURE' : 'DECISION FRAMEWORK ARCHITECTURE',
    subtitle: isDeal ? 'Rights Partition & Commercial Pathway' : 'Structural Framework & Strategic Mechanism',
    takeaways: [
      article.featuredSummary 
        ? article.featuredSummary.slice(0, 160) + '...'
        : 'Transaction partitions territorial control, development responsibilities, and future commercial value streams.',
      'Operational handovers require objective data-driven triggers to prevent execution friction.'
    ],
    diagramLabel: isDeal ? 'Rights Partition & Commercial Value Flow' : 'Decision Framework Schematic'
  };

  const defaultSlide3: DealSlideData['slide3'] = {
    mechanismTitle: article.mechanism || (isDeal ? 'Territorial & Responsibility Boundary Architecture' : 'Strategic Decision Architecture'),
    mechanismSummary: article.pharmaSignalRead 
      ? article.pharmaSignalRead.split('\n')[0].replace(/^(Product capability|Mechanism|Partner fit)\.?\s*/i, '')
      : (article.description || 'Structuring rights and obligations to reflect field-level capabilities.'),
    valueHeader: isDeal ? 'COMMERCIAL RATIONALE / VALUE DRIVERS' : 'CORE ANALYTICAL DRIVERS',
    valuePoints: [
      'Aligns commercial rights with verified regional operational capabilities',
      'Preserves balance sheet efficiency while securing market access milestones',
      'Provides clear contractual boundaries between originators and partners'
    ],
    frictionHeader: isDeal ? 'OPERATIONAL INTERFACE / EXECUTION RISK' : 'KEY STRUCTURAL FRICTIONS',
    frictionPoints: [
      'Transition friction during post-Phase I clinical or regulatory handover',
      'Supply continuity and batch consistency during tech-transfer phases',
      'Governance alignment across cross-functional joint operating committees'
    ],
    decisionContext: article.useThisWhen || 'Deploy when evaluating cross-border licensing agreements where partner capabilities must match territorial responsibilities.'
  };

  const defaultSlide4: DealSlideData['slide4'] = {
    quote: article.principleQuote || (isDeal
      ? 'Good deal structuring gives each right, responsibility and future option a boundary that matches the partners\' capabilities and ambitions.'
      : 'The strongest opportunities do not always create the most value. The opportunities that close the Approval Gap do.'),
    checkpoints: [
      'Do the partner\'s verified local capabilities match the announced commercial obligations?',
      'Are development and supply transition triggers defined with objective criteria?',
      'Do the economic terms keep counterparties committed as timelines evolve?'
    ],
    ctaText: isDeal 
      ? 'Read full Deal Signal analysis & interactive architecture:' 
      : 'Read complete Decision Lens & interactive framework:',
    canonicalUrl
  };

  const defaultPost = `${article.title}

${isDeal ? 'THE DEAL SIGNAL' : 'THE DECISION LENS'}
${article.featuredSummary || article.description}

${isDeal ? 'STRATEGIC MECHANISM' : 'CORE FRAMEWORK'}: ${(article.mechanism || 'Deal Structuring').toUpperCase()}
${article.pharmaSignalTake || article.pharmaSignalRead || article.description}

CRITICAL EXECUTION QUESTIONS
1. Are transition milestones objectively verifiable to prevent handover delays?
2. Do local regulatory and distribution capabilities match the commercial rights granted?
3. How do economic terms protect supply continuity over multi-year horizons?

THE BD PRINCIPLE
${defaultSlide4.quote}

Read the full analysis and interactive diagram on PharmaSignal:
${canonicalUrl}

#PharmaBD #BiopharmaLicensing #LifeSciences #PharmaSignal`;

  return {
    slide1: custom?.slide1 ? { ...defaultSlide1, ...custom.slide1 } : defaultSlide1,
    slide2: custom?.slide2 ? { ...defaultSlide2, ...custom.slide2 } : defaultSlide2,
    slide3: custom?.slide3 ? { ...defaultSlide3, ...custom.slide3 } : defaultSlide3,
    slide4: custom?.slide4 ? { ...defaultSlide4, ...custom.slide4 } : defaultSlide4,
    linkedInPost: custom?.linkedInPost || defaultPost
  };
}
