import { ArrowRight, Compass } from 'lucide-react';
import { Article } from '../types';

interface LensesPageProps {
  darkMode: boolean;
  openArticle: (article: Article) => void;
  explainers: Article[];
  dealSignals: Article[];
}

export default function LensesPage({ darkMode, openArticle, explainers, dealSignals }: LensesPageProps) {
  const approvalGapArt = explainers.find(a => a.id === 'the-approval-gap') || explainers[0];
  const executionDeficitArt = explainers.find(a => a.id === 'execution-deficit') || explainers[0];
  const oppCreationArt = explainers.find(a => a.id === 'opportunity-creation-processing') || explainers[0];
  const dealFailuresArt = explainers.find(a => a.id === 'deal-failures') || explainers[0];
  const bioconSignal = dealSignals.find(a => a.id === 'biocon-brazil-pertuzumab-market-access') || dealSignals[0];
  const kaigeneSignal = dealSignals.find(a => a.id === 'kaigene-taisho-japan-licensing') || dealSignals[0];

  const lenses = [
    {
      id: 'approval-gap',
      title: 'Approval Gap',
      badge: 'LENS 01',
      subtitle: 'Unresolved internal evaluation criteria delay a decision before signing.',
      whatItExplains: 'Internal evaluation criteria, readiness and stakeholder alignment remain unresolved, delaying a decision. The Approval Gap emerges when distinct internal functions—commercial, regulatory, clinical, quality, and finance—evaluate an opportunity using conflicting definitions of success. Each function holds a de facto veto, but no shared mechanism reconciles their trade-offs before executive review.',
      howItAffectsValue: 'Prolonged deliberation burns momentum, allows competing suitors to enter the process, and risks expiration of exclusivity windows. Deals often stall or require renegotiation under worse terms simply because internal decision gates could not align in time.',
      howToUseIt: 'Before issuing or negotiating binding term sheets, establish cross-functional alignment on the non-negotiable risk thresholds across commercial, regulatory, and CMC teams. Force internal trade-off decisions early rather than discovering functional vetoes at the executive committee stage.',
      example: 'Analyzed in the foundational explainer "The Approval Gap," examining how cross-functional veto architectures quietly stall high-potential partnering initiatives before formal sign-off.',
      whereItMayNotApply: 'Does not apply to transactions that terminate strictly due to fundamental scientific or safety data failures in diligence, or external valuation gaps driven by broader capital market conditions.',
      targetArticle: approvalGapArt,
      buttonLabel: 'Read Explainer: The Approval Gap',
      supportingArticles: [
        { label: 'Explainer: The Approval Gap', article: approvalGapArt },
        { label: 'Deal Signal: HUTCHMED–GSK (HMPL-A830)', article: dealSignals.find(d => d.id === 'hutchmed-gsk-licensing') || dealSignals[0] }
      ]
    },
    {
      id: 'execution-deficit',
      title: 'Execution Deficit',
      badge: 'LENS 02',
      subtitle: 'Capability, resource or handover gaps prevent delivery after agreement.',
      whatItExplains: 'Capabilities, resources, handover or operational alignment are insufficient to deliver agreed obligations. Value leaks quietly after signature when operational teams inherit contractual commitments without adequate bandwidth, technical context, or dedicated execution capacity. (Note: Governance Debt can contribute to an Execution Deficit, but the two are not interchangeable: Governance Debt is the structural ambiguity in authority and decision rules, whereas Execution Deficit is the operational failure in delivery).',
      howItAffectsValue: 'Milestone delays, missed regulatory filing windows, CMC scale-up hurdles, and uncoordinated launch preparations compress the product\'s commercial window and erode forecasted net present value post-signing.',
      howToUseIt: 'Design post-signature handover protocols during negotiations, not after signing. Ensure operating teams participate in contract milestone drafting, and link milestone payments to verified operational readiness rather than arbitrary calendar dates.',
      example: 'Explored in "A Signed Deal Is Not an Executed Deal" and observed in transactions such as Innovent–Spero ex-China execution transfers and BMS–Cellares manufacturing scale constraints.',
      whereItMayNotApply: 'Does not explain pre-signing deal fatigue, nor commercial underperformance caused strictly by macroeconomic price controls or unexpected shifts in national reimbursement guidelines.',
      targetArticle: executionDeficitArt,
      buttonLabel: 'Read Explainer: A Signed Deal Is Not an Executed Deal',
      supportingArticles: [
        { label: 'Explainer: A Signed Deal Is Not an Executed Deal', article: executionDeficitArt },
        { label: 'Deal Signal: Innovent–Spero Ex-China Licensing', article: dealSignals.find(d => d.id === 'innovent-spero-ex-china-licensing') || dealSignals[1] }
      ]
    },
    {
      id: 'opportunity-creation',
      title: 'Opportunity Creation',
      badge: 'LENS 03',
      subtitle: 'Upstream structuring that creates proprietary optionality before competitive auctions.',
      whatItExplains: 'The strategic contrast between reactive "opportunity processing" (waiting for circulated broker teasers and competitive bank auctions) and proactive "opportunity creation" (building thesis-driven partner access before an asset becomes visible to the wider market).',
      howItAffectsValue: 'Engaging before an asset is broadly shopped prevents competitive deal inflation, preserves negotiating leverage, and allows counterparties to structure tailored, bilateral risk-sharing terms.',
      howToUseIt: 'Direct scouting teams to identify therapeutic capability gaps and thesis-led partnership targets 12–24 months before clinical inflection points, engaging potential originators through collaborative research, option structures, or Newco architectures.',
      example: 'Disclosed in Haisco’s Newco formation (Sentivera), where Haisco helped create a dedicated US corporate vehicle rather than competing in standard out-licensing channels; also reflected in GSK’s capability-led asset structuring. (Disclosed deal structures demonstrate how rights and obligations were partitioned at signing; they do not prove long-term commercial returns).',
      whereItMayNotApply: 'Not applicable to standardized generic licensing, commodity supply tenders, or highly formalized multi-party auction processes where open competitive bidding is legally mandated.',
      targetArticle: oppCreationArt,
      buttonLabel: 'Read Explainer: Opportunity Creation vs Processing',
      supportingArticles: [
        { label: 'Explainer: Opportunity Creation vs Opportunity Processing', article: oppCreationArt },
        { label: 'Deal Signal: Haisco Sentivera Newco Structuring', article: dealSignals.find(d => d.id === 'haisco-biosciences-sentivera-newco') || dealSignals[2] }
      ]
    },
    {
      id: 'route-to-market-friction',
      title: 'Route-to-Market Friction',
      badge: 'LENS 04',
      subtitle: 'Market access, pricing and institutional adoption frictions that erode modeled revenue.',
      whatItExplains: 'How national pricing regulations, health technology assessments (HTA), centralized hospital tenders, and distributor margin structures restrict commercial uptake if territorial licensing treats market access as a post-signing afterthought.',
      howItAffectsValue: 'An asset can secure regulatory marketing authorization on schedule yet generate negligible revenue if public reimbursement criteria, hospital formulary inclusion, or regional distribution channels are blocked.',
      howToUseIt: 'Incorporate market-access mechanisms directly into deal terms—such as phased supply pricing linked to realized reimbursement outcomes, dedicated local access milestone incentives, or consortia partnerships aligned with public procurement frameworks.',
      example: 'Demonstrated in Biocon’s 10-year pertuzumab partnership in Brazil, which connected product supply directly to Brazil’s public PDP healthcare channel rather than relying on private distributor channels alone.',
      whereItMayNotApply: 'Does not apply in purely cash-pay, non-reimbursed consumer health segments or healthcare markets without centralized institutional purchasers.',
      targetArticle: bioconSignal,
      buttonLabel: 'Read Deal Signal: Biocon Brazil PDP Access',
      supportingArticles: [
        { label: 'Deal Signal: Biocon Brazil PDP Market Access', article: bioconSignal },
        { label: 'Explainer: The Approval Gap', article: approvalGapArt }
      ]
    },
    {
      id: 'governance-debt',
      title: 'Governance Debt',
      badge: 'LENS 05',
      subtitle: 'Decision rights, escalation routes or operating responsibilities are left unclear, creating later execution burdens.',
      whatItExplains: 'Decision rights, escalation routes or operating responsibilities are left unclear in contracts, creating later execution burdens. Ambiguous alliance committee charters, unresolved voting procedures, and deferred operational compromises accumulate friction after signature. (Note: Governance Debt frequently contributes to an Execution Deficit, but the two are not interchangeable: Governance Debt is the defect in governance structure and decision authority, whereas Execution Deficit is the operational shortfall in capability, handover, or delivery).',
      howItAffectsValue: 'Deadlocks in Joint Steering Committees (JSCs) stall protocol amendments, delay commercial launch budgets, and force senior executives into costly, adversarial contract disputes.',
      howToUseIt: 'Clearly partition sole decision rights by operational domain (e.g. originator decides manufacturing changes, licensee decides territorial marketing tactics) and define rapid escalation tie-breakers rather than requiring unanimous consensus for routine operational decisions.',
      example: 'Analyzed in "Why Pharma Deals Stall Before Signing," examining how ambiguous 50/50 joint committee mandates and deferred operational trade-offs create structural stalemates after signature.',
      whereItMayNotApply: 'Does not apply to outright asset divestitures, simple fee-for-service contracts, or clean IP assignments where ongoing bilateral committee governance is not required.',
      targetArticle: dealFailuresArt,
      buttonLabel: 'Read Explainer: Why Pharma Deals Stall Before Signing',
      supportingArticles: [
        { label: 'Explainer: Why Pharma Deals Stall Before Signing', article: dealFailuresArt },
        { label: 'Explainer: A Signed Deal Is Not an Executed Deal', article: executionDeficitArt }
      ]
    },
    {
      id: 'partner-capability-gap',
      title: 'Partner Capability Gap',
      badge: 'LENS 06',
      subtitle: 'The operational disconnect between expected partner execution and verified readiness.',
      whatItExplains: 'The operational disconnect between a partner’s corporate brand or balance sheet and their verified readiness in a specific therapeutic domain. Relying on high-level corporate stature without auditing their specific therapeutic field force, clinical regulatory track record, or local key opinion leader (KOL) access leads to commercial underperformance.',
      howItAffectsValue: 'Under-resourced commercial launches lose first-mover advantage, mismanage initial specialist outreach, and fail against experienced competitor detailing, permanently lowering peak commercial volume.',
      howToUseIt: 'Replace generic corporate representations with verified capability milestones, dedicated therapeutic sales force minimums, and performance-based reversion rights before granting exclusive territorial licenses.',
      example: 'Demonstrated in regional licensing arrangements such as Kaigene–Taisho in Japan and Alvotech–Lotus in Southeast Asia, where territorial rights were partitioned strictly according to specialized, verified operational capabilities.',
      whereItMayNotApply: 'Does not apply when partnering with established global commercial teams that already operate market-leading, fully scaled sales forces in the identical therapeutic sub-specialty.',
      targetArticle: kaigeneSignal,
      buttonLabel: 'Read Deal Signal: Kaigene–Taisho Japan Licensing',
      supportingArticles: [
        { label: 'Deal Signal: Kaigene–Taisho Japan Licensing', article: kaigeneSignal },
        { label: 'Deal Signal: Alvotech Lotus Biosimilar Commercialization', article: dealSignals.find(d => d.id === 'alvotech-lotus-biosimilar-commercialization') || dealSignals[0] }
      ]
    }
  ];

  return (
    <div className={`py-12 sm:py-20 transition-colors duration-300 ${
      darkMode ? 'bg-[#061426] text-white' : 'bg-[#FBFBFC] text-[#061426]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-12 border-b border-[#C5A059]/30 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="text-[#C5A059]" size={20} />
            <span className="font-mono text-xs tracking-widest text-[#C5A059] font-bold uppercase">
              PHARMASIGNAL DECISION LENSES
            </span>
          </div>
          
          <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-[#061426]'
          }`}>
            PharmaSignal Decision Lenses
          </h1>
          <div className="h-[2px] w-12 bg-[#C5A059] mb-4" />
          
          <p className={`font-serif text-lg sm:text-xl leading-relaxed italic ${
            darkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            Reusable mental models for interpreting recurring pharma BD decisions.
          </p>
          <p className={`font-sans text-sm sm:text-base mt-3 leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            These six decision lenses isolate the structural mechanisms that create, protect, delay or destroy value across biopharma transactions—clarifying what decisions dealmakers should make differently.
          </p>
        </div>

        {/* Lenses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {lenses.map((lens) => (
            <div 
              key={lens.id}
              id={lens.id}
              className={`p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between scroll-mt-24 ${
                darkMode 
                  ? 'bg-[#0A1A2E] border-[#1E3A55] hover:border-[#C5A059]/60' 
                  : 'bg-white border-[#E2DDD3] hover:border-[#C5A059]/70 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-[#C5A059]/20">
                  <span className="inline-block text-[10px] font-mono tracking-[0.1em] text-[#C5A059] font-bold uppercase px-2 py-0.5 border border-[#C5A059]/30 bg-[#C5A059]/10">
                    {lens.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    Decision Model
                  </span>
                </div>

                <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 ${
                  darkMode ? 'text-white' : 'text-[#061426]'
                }`}>
                  {lens.title}
                </h2>

                <p className="font-serif text-sm sm:text-[14.5px] text-[#C5A059] italic font-medium mb-6">
                  {lens.subtitle}
                </p>

                {/* Structured Subheadings */}
                <div className="space-y-4 mb-8 text-left font-sans text-xs sm:text-[13px] leading-relaxed">
                  
                  <div>
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      What this explains
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      {lens.whatItExplains}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      How it affects value
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      {lens.howItAffectsValue}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      How to use it
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      {lens.howToUseIt}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      Example
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      {lens.example}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      Where it may not apply
                    </h3>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                      {lens.whereItMayNotApply}
                    </p>
                  </div>

                  {lens.supportingArticles && lens.supportingArticles.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 dark:border-[#1E3A55]/60">
                      <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1.5">
                        Supporting analyses
                      </h3>
                      <div className="flex flex-col gap-1.5">
                        {lens.supportingArticles.map((sup, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => openArticle(sup.article)}
                            className={`text-left font-sans text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                              darkMode ? 'text-slate-300 hover:text-[#C5A059]' : 'text-slate-700 hover:text-[#0A66C2]'
                            }`}
                          >
                            <span className="w-1 h-1 rounded-full bg-[#C5A059] shrink-0" />
                            <span className="underline decoration-slate-300 dark:decoration-slate-600 hover:decoration-[#C5A059]">{sup.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between mt-auto">
                <button
                  onClick={() => openArticle(lens.targetArticle)}
                  className="w-full px-4 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-none"
                >
                  {lens.buttonLabel} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
