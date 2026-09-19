import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  FileText, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';
import { FormEvent, MouseEvent, useState, useMemo } from 'react';
import { DEAL_SIGNALS_DATA } from '../articlesData';
import { Article } from '../types';

interface SampleBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onSelectArticle?: (article: Article) => void;
}

type DealFilter = 'ALL' | 'ALLIANCES' | 'TERRITORIES' | 'PLATFORMS';

interface AugustDealBrief {
  articleId: string;
  category: 'ALLIANCES' | 'TERRITORIES' | 'PLATFORMS';
  counterparties: string;
  date: string;
  headline: string;
  headlineSummary: string;
  mechanism: string;
  structureType: string;
  signalAndEconomics: string;
  pharmaSignalRead: string;
  bdDecisionRule: string;
  keyFrictionOrRisk: string;
  articleSlug: string;
}

const AUGUST_DEALS_BRIEFS: AugustDealBrief[] = [
  {
    articleId: 'roche-alnylam-rnai-expansion',
    category: 'ALLIANCES',
    counterparties: 'ROCHE & ALNYLAM',
    date: 'August 28, 2026',
    headline: 'Roche & Alnylam Expand $2.8B RNAi Cardiovascular Alliance',
    headlineSummary: '$310M Option Trigger via Clinical De-risking & 50/50 US Profit Share',
    mechanism: 'Option Trigger via Clinical De-Risking',
    structureType: 'Option Trigger Milestone & Co-Commercialization',
    signalAndEconomics: 'Roche triggered a $310M option exercise milestone for cardiovascular RNAi candidate zilebesiran following Phase IIb KARDIA-2 data, solidifying a 50/50 US profit-and-loss share alongside tiered ex-US royalties.',
    pharmaSignalRead: 'Instead of committing massive upfront capital during exploratory Phase I/IIa, Roche bought structural optionality. Alnylam retained equal US commercial standing, leveraging Roche’s massive cardiovascular field force ex-US while avoiding terminal economic dilution.',
    bdDecisionRule: 'In capital-intensive chronic indications, structure milestone-gated option tranches tied to definitive Phase IIb clinical endpoints rather than attempting all-in rights transfers prematurely.',
    keyFrictionOrRisk: 'High Phase III CVOT cardiovascular outcome trial cost obligations shared under 50/50 US terms.',
    articleSlug: '/deal-signals/roche-alnylam-rnai-expansion'
  },
  {
    articleId: 'sk-biopharm-biohaven-epilepsy-platform',
    category: 'ALLIANCES',
    counterparties: 'SK BIOPHARM & BIOHAVEN',
    date: 'August 26, 2026',
    headline: 'SK Biopharm Buys Worldwide Epilepsy Platform for $400M Near-Term',
    headlineSummary: 'Specialty Commercial Footprint Deployed as an M&A Acquisition Advantage',
    mechanism: 'Commercial Infrastructure as Acquisition Advantage',
    structureType: 'Worldwide Platform Acquisition ($400M Near-Term)',
    signalAndEconomics: 'SK Biopharmaceuticals acquired worldwide development and commercial rights to Biohaven’s Kv7 potassium channel opener platform (BHV-7000) for $400M in upfront and near-term considerations.',
    pharmaSignalRead: 'SK Biopharm already built an established US neuro-specialty sales force for its flagship cenobamate (XCOPRI). Because adding a second epilepsy asset to an existing sales call incurs near-zero incremental SG&A, SK Biopharm possessed higher synergy value than non-commercial bidders.',
    bdDecisionRule: 'When evaluating asset acquisitions, your existing institutional and specialty field force is financial capital. Target pipeline assets that utilize current sales details.',
    keyFrictionOrRisk: 'Trial execution risk in refractory focal seizures where competitor clinical benchmarks are intensifying.',
    articleSlug: '/deal-signals/sk-biopharm-biohaven-epilepsy-platform'
  },
  {
    articleId: 'haisco-sentivera-newco-licensing',
    category: 'ALLIANCES',
    counterparties: 'HAISCO & SENTIVERA (NEWCO)',
    date: 'August 25, 2026',
    headline: 'Instead of Finding a Licensee, Haisco Helped Create One',
    headlineSummary: 'Opportunity Creation through Newco Architecture for Ex-China Rights',
    mechanism: 'Opportunity Creation through Newco Architecture',
    structureType: 'Newco Licensing, Equity Co-Founding & $1.46B Milestones',
    signalAndEconomics: 'Haisco Pharmaceutical out-licensed ex-China global rights for its dual-target small molecule HSK44459 to Sentivera Therapeutics—a newly formed US vehicle backed by life-science venture capital, receiving upfront equity, board representation, and up to $1.46B in milestones.',
    pharmaSignalRead: 'In a sluggish cross-border licensing environment, waiting for multinational pharma interest often leads to asset stagnation. By partnering with specialist venture capital to seed a purpose-built Newco, Haisco created its own licensee, secured US development leadership, and kept significant equity upside.',
    bdDecisionRule: 'When conventional licensing channels offer discounted valuations, assemble trusted venture capital to establish a dedicated Newco to capture asset upside and equity participation.',
    keyFrictionOrRisk: 'Subsequent Series B/C syndication risk and governance overhead across cross-border boards.',
    articleSlug: '/deal-signals/haisco-sentivera-newco-licensing'
  },
  {
    articleId: 'bms-terminates-cellares-manufacturing-scale-deficit',
    category: 'PLATFORMS',
    counterparties: 'BMS & CELLARES',
    date: 'August 25, 2026',
    headline: 'BMS Ends $380M Cellares Deal as Scale-Up Fails Commercial Test',
    headlineSummary: 'Manufacturing Scale Deficit: When Clinical Success Fails Commercial Stress-Testing',
    mechanism: 'Clinical vs Commercial Scale Constraint',
    structureType: 'Automated Manufacturing Alliance Termination',
    signalAndEconomics: 'Bristol Myers Squibb terminated its $380M automated cell-therapy manufacturing alliance with Cellares for CAR-T assets, walking away from reserved capacity and unvested technology access milestones.',
    pharmaSignalRead: 'A technology platform that produces pristine batches under Phase I/II clinical trial tolerances can still collapse when subjected to commercial cost-of-goods, multi-product turnaround, and regulatory release speed requirements. Technical validation in trials is not commercial scale readiness.',
    bdDecisionRule: 'In advanced therapy alliances, stress-test automated platforms against commercial peak demand, cleanroom changeover times, and batch-abort economics before authorizing capacity reservation fees.',
    keyFrictionOrRisk: 'Sunken tech-transfer integration hours and necessity of falling back onto centralized internal cleanrooms.',
    articleSlug: '/deal-signals/bms-terminates-cellares-manufacturing-scale-deficit'
  },
  {
    articleId: 'alvotech-lotus-selective-commercial-ownership',
    category: 'TERRITORIES',
    counterparties: 'ALVOTECH & LOTUS PHARMACEUTICAL',
    date: 'August 21, 2026',
    headline: 'Alvotech Does Not License Every Market the Same Way',
    headlineSummary: 'Selective Commercial Ownership: Co-Commercializing in the US, Out-Licensing in Asia',
    mechanism: 'Selective Commercial Ownership',
    structureType: 'Semi-Exclusive US Co-Commercialization vs Exclusive 8-Country Asian License',
    signalAndEconomics: 'Alvotech partnered biosimilar candidates AVT05 (golimumab) and AVT16 (durvalumab) with Lotus. In eight Asian markets, Lotus holds exclusive commercialization; in the United States, Alvotech retains co-commercialization and dedicated margin participation.',
    pharmaSignalRead: 'One-size-fits-all licensing ignores regional margin realities. In fragmented Asian tender markets, Alvotech out-licensed to Lotus’s entrenched hospital footprint. In the high-value US market, Alvotech maintained co-ownership to capture terminal profit margins.',
    bdDecisionRule: 'Segment territory allocations by gross-margin potential and internal capability. Never grant global commercial rights when you possess the capital to co-own tier-one markets.',
    keyFrictionOrRisk: 'Dual governance structures and complex co-promotional accounting in the US territory.',
    articleSlug: '/deal-signals/alvotech-lotus-selective-commercial-ownership'
  },
  {
    articleId: 'kaigene-taisho-japan-licensing',
    category: 'TERRITORIES',
    counterparties: 'KAIGENE & TAISHO',
    date: 'August 18, 2026',
    headline: 'Kaigene Transfers Japan Execution to Taisho',
    headlineSummary: 'Territorial Execution Transfer to Resolve Domestic Regulatory & Commercial Deficits',
    mechanism: 'Territorial Execution Transfer',
    structureType: 'Exclusive Territorial License ($5M Upfront + Milestones)',
    signalAndEconomics: 'South Korea’s Kaigene licensed Japanese rights for its FcRn inhibitor KG006 to Taisho Pharmaceutical for a $5M upfront payment, development/sales milestones, and double-digit tiered royalties.',
    pharmaSignalRead: 'Originator biotechs frequently overestimate their ability to navigate PMDA regulatory audits and Japanese hospital distribution. Recognizing its domestic execution deficit, Kaigene traded territory upside for Taisho’s guaranteed local execution machinery.',
    bdDecisionRule: 'If your organization lacks local regulatory relationships and specialized physician detailing in a complex jurisdiction, partner early with a domestic market champion.',
    keyFrictionOrRisk: 'Capped territorial upside in exchange for downside mitigation and execution certainty.',
    articleSlug: '/deal-signals/kaigene-taisho-japan-licensing'
  },
  {
    articleId: 'aurigene-dr-reddys-tech-transfer',
    category: 'PLATFORMS',
    counterparties: 'AURIGENE & DR. REDDY’S',
    date: 'August 15, 2026',
    headline: 'Aurigene Converts Tech Transfer into Long-Term Portfolio Architecture',
    headlineSummary: 'Contract Manufacturing Protocols Converted into Durable Strategic Sticky Ties',
    mechanism: 'Tech-Transfer as Portfolio Architecture',
    structureType: 'Multi-Product Tech Transfer & Commercial Supply Agreement',
    signalAndEconomics: 'Aurigene Pharmaceutical Services concluded a multi-product technology transfer agreement covering 20+ injectable generic ANDAs with Dr. Reddy’s, transforming technical transfer into long-term commercial supply locks.',
    pharmaSignalRead: 'CDMO agreements that focus solely on batch delivery leave service providers vulnerable to annual re-tendering. By embedding proprietary analytical transfer methods and shared regulatory filings, Aurigene created high switching costs and portfolio longevity.',
    bdDecisionRule: 'In supply and tech-transfer transactions, design the analytical validation dossier to establish deep operational switching barriers that preserve long-term margin.',
    keyFrictionOrRisk: 'Prolonged technology validation timelines across older legacy generic regulatory filings.',
    articleSlug: '/deal-signals/aurigene-dr-reddys-tech-transfer'
  },
  {
    articleId: 'merck-alimatravir-voluntary-licensing',
    category: 'TERRITORIES',
    counterparties: 'MERCK & GENERIC CONSORTIUM (129 LMICs)',
    date: 'August 12, 2026',
    headline: 'Merck Is Building Market Access Before Alimatravir Is Approved',
    headlineSummary: 'Pre-Approval Voluntary Licensing Across 129 LMICs to Eliminate Availability Gaps',
    mechanism: 'Market Access Before Approval',
    structureType: '7 Pre-Approval Royalty-Free Voluntary Licenses Across 129 LMICs',
    signalAndEconomics: 'Merck signed 7 royalty-free voluntary licensing agreements for investigational oral protease inhibitor alimatravir across 129 low- and middle-income countries while the asset remains in Phase III trials.',
    pharmaSignalRead: 'Conventional biopharma launches wait until FDA/EMA approval before initiating emerging-market access discussions, resulting in 3- to 5-year availability delays. By transferring technical dossiers pre-approval, generic supply is validated on day one of global approval.',
    bdDecisionRule: 'For infectious disease and global health assets, initiate tiered voluntary licensing and tech-transfer protocols during Phase III to compress the approval-to-access time lag.',
    keyFrictionOrRisk: 'Risk of technology leak or generic partner capacity misallocation if Phase III fails to meet primary endpoints.',
    articleSlug: '/deal-signals/merck-alimatravir-voluntary-licensing'
  },
  {
    articleId: 'mirecule-ems-upstream-platform',
    category: 'PLATFORMS',
    counterparties: 'MIRECULE & EMS GROUP (RIO BIOFARMA)',
    date: 'August 4, 2026',
    headline: 'miRecule & EMS Group Partner Upstream for Co-Owned Extra-Hepatic RNA',
    headlineSummary: 'Upstream Capability-Led Co-Ownership to Generate First-in-Class Assets',
    mechanism: 'Upstream Capability-Led Co-Ownership',
    structureType: 'Upstream R&D Consortium with 50/50 Global Asset Ownership',
    signalAndEconomics: 'miRecule and EMS Group’s venture arm (Rio Biofarma) entered a co-development partnership utilizing miRecule’s CLEVER antibody-RNA conjugate platform, splitting discovery costs and sharing 50/50 worldwide asset ownership.',
    pharmaSignalRead: 'Mid-sized global pharma companies frequently struggle to compete against mega-cap buyers for clinical-stage assets. By funding preclinical platform chemistry and sharing discovery risk, EMS secured co-ownership of extra-hepatic RNA targets at a fraction of late-stage acquisition multiples.',
    bdDecisionRule: 'Construct upstream co-development partnerships around proprietary drug delivery platforms to build proprietary late-stage pipelines before competitive auction bidding begins.',
    keyFrictionOrRisk: 'Unproven translational pharmacology when advancing conjugated RNA conjugates into non-human primates.',
    articleSlug: '/deal-signals/mirecule-ems-upstream-platform'
  }
];

export default function SampleBriefingModal({ 
  isOpen, 
  onClose, 
  darkMode,
  onSelectArticle
}: SampleBriefingModalProps) {
  const [activeFilter, setActiveFilter] = useState<DealFilter>('ALL');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDeals = useMemo(() => {
    if (activeFilter === 'ALL') return AUGUST_DEALS_BRIEFS;
    return AUGUST_DEALS_BRIEFS.filter(d => d.category === activeFilter);
  }, [activeFilter]);

  const handleArticleClick = (brief: AugustDealBrief) => {
    const article = DEAL_SIGNALS_DATA.find(a => a.id === brief.articleId);
    if (article && onSelectArticle) {
      onClose();
      onSelectArticle(article);
    } else {
      // Fallback direct navigation
      window.location.href = brief.articleSlug;
    }
  };

  const handleCopyLink = (e: MouseEvent, brief: AugustDealBrief) => {
    e.stopPropagation();
    const fullUrl = `https://pharmasignal.com${brief.articleSlug}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(brief.articleId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const emailToSubmit = email.trim();
    if (!emailToSubmit || !emailToSubmit.includes('@')) {
      setError('Please enter a valid work email address.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed.');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Could not process subscription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="executive-briefing-modal-overlay" 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xs"
      >
        <motion.div
          id="executive-briefing-modal-container"
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col border shadow-2xl overflow-hidden text-left ${
            darkMode 
              ? 'bg-[#081524] border-[#1E3A55] text-[#F8FAFC]' 
              : 'bg-[#FBFBFC] border-[#DED8CC] text-[#061426]'
          }`}
        >
          {/* Modal Header Bar */}
          <div className={`p-5 sm:p-7 border-b shrink-0 flex items-start justify-between gap-4 ${
            darkMode ? 'bg-[#06111D] border-[#1E3A55]' : 'bg-[#F4F1EA] border-[#E2DDD3]'
          }`}>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-block text-[10px] font-mono tracking-[0.14em] font-bold uppercase px-2.5 py-0.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]">
                  EXECUTIVE BRIEFING · AUGUST 2026 DEALS REVIEW
                </span>
                <span className={`text-[10.5px] font-mono font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Issue 08 · Published September 1, 2026 · 9 Deals Analyzed
                </span>
              </div>

              <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-[1.15] ${
                darkMode ? 'text-white' : 'text-[#061426]'
              }`}>
                The August 2026 Deal Briefing
              </h2>

              <p className={`font-serif text-sm sm:text-base italic font-medium mt-1.5 ${
                darkMode ? 'text-[#C5A059]' : 'text-amber-900'
              }`}>
                How 9 biopharma transactions structured rights, divided capabilities, and navigated execution friction.
              </p>
            </div>

            <button
              id="close-executive-briefing-button"
              onClick={onClose}
              className={`p-2 transition-colors cursor-pointer shrink-0 border rounded-none ${
                darkMode 
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60' 
                  : 'border-slate-300 text-slate-600 hover:text-[#061426] hover:bg-slate-200/60'
              }`}
              aria-label="Close Executive Briefing"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Briefing Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7">
            
            {/* Executive Synthesis Section */}
            <div className={`p-4 sm:p-5 border ${
              darkMode ? 'bg-[#0D2238]/60 border-[#1E3A55]' : 'bg-white border-[#E2DDD3]'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#C5A059]" />
                <h3 className={`font-sans text-xs font-bold uppercase tracking-wider ${
                  darkMode ? 'text-white' : 'text-[#061426]'
                }`}>
                  Deal Desk Macro Synthesis: 3 Core Mechanisms in August 2026
                </h3>
              </div>

              <p className={`font-sans text-xs sm:text-[13.5px] leading-relaxed mb-3 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                August 2026 transaction flow reflected a decisive shift away from passive, whole-asset out-licensing toward <strong>capability-contingent architecture</strong>. Senior BD leaders addressed valuation gaps by deploying three distinct structural mechanisms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className={`p-3 border text-left ${
                  darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FAF8F5] border-[#E2DDD3]'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                    01 · Option De-Risking
                  </div>
                  <div className={`font-sans text-xs font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#061426]'}`}>
                    Milestone-Gated Tranches
                  </div>
                  <p className={`text-[11.5px] font-sans leading-snug ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Roche/Alnylam ($310M trigger) and miRecule/EMS proved that option structures let buyers defer capital until Phase IIb de-risking while originators preserve 50/50 terminal profit upside.
                  </p>
                </div>

                <div className={`p-3 border text-left ${
                  darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FAF8F5] border-[#E2DDD3]'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                    02 · Infrastructure Leverage
                  </div>
                  <div className={`font-sans text-xs font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#061426]'}`}>
                    Specialty Footprint Arbitrage
                  </div>
                  <p className={`text-[11.5px] font-sans leading-snug ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    SK Biopharm leveraged its existing US neuro sales force to outbid non-commercial buyers for Biohaven’s epilepsy platform, turning existing SG&A into an M&A competitive advantage.
                  </p>
                </div>

                <div className={`p-3 border text-left ${
                  darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FAF8F5] border-[#E2DDD3]'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                    03 · Commercial Scale Deficit
                  </div>
                  <div className={`font-sans text-xs font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#061426]'}`}>
                    Manufacturing Reality Test
                  </div>
                  <p className={`text-[11.5px] font-sans leading-snug ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    BMS’s termination of the $380M Cellares alliance demonstrated that platform automation that satisfies clinical trials often fails under commercial cost, yield, and throughput constraints.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-mono uppercase font-semibold ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Filter Transactions:
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {(['ALL', 'ALLIANCES', 'TERRITORIES', 'PLATFORMS'] as DealFilter[]).map((tabKey) => {
                  const labels: Record<DealFilter, string> = {
                    ALL: 'All August Deals (9)',
                    ALLIANCES: 'Alliances & M&A (3)',
                    TERRITORIES: 'Territory Rights & Access (3)',
                    PLATFORMS: 'CMC & Platforms (3)'
                  };
                  const active = activeFilter === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveFilter(tabKey)}
                      className={`px-3 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer border ${
                        active
                          ? darkMode
                            ? 'bg-[#C5A059] text-[#061426] border-[#C5A059]'
                            : 'bg-[#061426] text-white border-[#061426]'
                          : darkMode
                            ? 'bg-[#061426] text-slate-300 border-[#1E3A55] hover:border-slate-500'
                            : 'bg-white text-slate-700 border-[#E2DDD3] hover:border-slate-400'
                      }`}
                    >
                      {labels[tabKey]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deal Briefs Stream */}
            <div className="space-y-5">
              {filteredDeals.map((brief, idx) => {
                const isCopied = copiedId === brief.articleId;

                return (
                  <div
                    key={brief.articleId}
                    id={`brief-card-${brief.articleId}`}
                    className={`border p-5 sm:p-6 transition-all ${
                      darkMode 
                        ? 'bg-[#0A1A2E] border-[#1E3A55] hover:border-[#C5A059]/50' 
                        : 'bg-white border-[#DED8CC] hover:border-[#061426]'
                    }`}
                  >
                    {/* Card Meta Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-dashed border-slate-700/40 dark:border-slate-700/60">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold tracking-wider text-[#C5A059]">
                          {brief.counterparties}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">·</span>
                        <span className={`text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {brief.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-block text-[10px] font-mono uppercase font-bold px-2 py-0.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]">
                          {brief.mechanism}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h4 
                      onClick={() => handleArticleClick(brief)}
                      className={`font-serif text-lg sm:text-xl font-bold tracking-tight mb-1 cursor-pointer transition-colors ${
                        darkMode ? 'text-white hover:text-[#C5A059]' : 'text-[#061426] hover:text-amber-800'
                      }`}
                    >
                      {brief.headline}
                    </h4>

                    <p className={`font-mono text-xs mb-4 font-medium ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {brief.headlineSummary}
                    </p>

                    {/* Structured Grid: Signal vs Read */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4 text-xs font-sans leading-relaxed">
                      <div className={`p-3 border text-left ${
                        darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FAF8F5] border-[#E2DDD3]'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1.5 font-bold font-mono text-[10.5px] uppercase tracking-wider text-[#C5A059]">
                          <FileText size={12} />
                          <span>The Deal Signal &amp; Economics</span>
                        </div>
                        <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                          {brief.signalAndEconomics}
                        </p>
                      </div>

                      <div className={`p-3 border text-left ${
                        darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FAF8F5] border-[#E2DDD3]'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1.5 font-bold font-mono text-[10.5px] uppercase tracking-wider text-[#C5A059]">
                          <TrendingUp size={12} />
                          <span>The PharmaSignal Read</span>
                        </div>
                        <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                          {brief.pharmaSignalRead}
                        </p>
                      </div>
                    </div>

                    {/* Principle Quote */}
                    <div className={`p-3 border-l-2 border-[#C5A059] italic font-serif text-xs sm:text-[13px] mb-4 ${
                      darkMode ? 'bg-[#0D243A] text-slate-200' : 'bg-amber-50/60 text-slate-800'
                    }`}>
                      <strong className="font-sans font-bold uppercase not-italic text-[10px] tracking-wider text-[#C5A059] block mb-0.5">
                        PharmaSignal Decision Rule
                      </strong>
                      "{brief.bdDecisionRule}"
                    </div>

                    {/* Action Row with Direct Website Link */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/30">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          Original Article:
                        </span>
                        <a
                          href={brief.articleSlug}
                          onClick={(e) => {
                            e.preventDefault();
                            handleArticleClick(brief);
                          }}
                          className="text-xs font-mono font-medium text-[#C5A059] hover:underline flex items-center gap-1"
                        >
                          <span>pharmasignal.com{brief.articleSlug}</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(e, brief)}
                          className={`px-2.5 py-1 text-[11px] font-mono border transition-colors flex items-center gap-1 cursor-pointer ${
                            isCopied
                              ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059]'
                              : darkMode
                                ? 'border-slate-700 hover:border-slate-500 text-slate-300'
                                : 'border-slate-300 hover:border-slate-400 text-slate-700'
                          }`}
                          title="Copy direct link to this deal"
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Link Copied' : 'Copy Link'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleArticleClick(brief)}
                          className={`px-3 py-1 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer`}
                        >
                          <span>Read Full Analysis</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* August Deals Comparative Matrix */}
            <div className={`p-4 sm:p-5 border ${
              darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-white border-[#E2DDD3]'
            }`}>
              <h4 className={`font-serif text-base sm:text-lg font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-[#061426]'
              }`}>
                August 2026 Deals Comparative Matrix
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className={`border-b font-mono uppercase text-[10px] tracking-wider ${
                      darkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                    }`}>
                      <th className="py-2 pr-3">Deal &amp; Counterparties</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Core Mechanism</th>
                      <th className="py-2 px-3">Headline Structure</th>
                      <th className="py-2 pl-3 text-right">PharmaSignal Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/40 dark:divide-slate-700/60">
                    {AUGUST_DEALS_BRIEFS.map((b) => (
                      <tr key={b.articleId} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="py-2.5 pr-3 font-medium">
                          <button
                            onClick={() => handleArticleClick(b)}
                            className="text-left font-sans font-bold hover:text-[#C5A059] transition-colors cursor-pointer"
                          >
                            {b.counterparties}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] opacity-80 whitespace-nowrap">
                          {b.date.replace(', 2026', '')}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-mono text-[10px] text-[#C5A059] uppercase">
                            {b.mechanism}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[11.5px] opacity-90 max-w-[240px] truncate">
                          {b.structureType}
                        </td>
                        <td className="py-2.5 pl-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleArticleClick(b)}
                            className="text-xs font-mono font-bold text-[#C5A059] hover:underline cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Open Analysis</span>
                            <ArrowRight size={10} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Newsletter Subscription Card inside Modal */}
            <div className={`p-5 sm:p-6 border ${
              darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-[#F4F1EA] border-[#E2DDD3]'
            }`}>
              <h3 className={`font-serif text-lg sm:text-xl font-bold mb-1.5 ${
                darkMode ? 'text-white' : 'text-[#061426]'
              }`}>
                Subscribe to The Fortnightly Deal Desk Dispatch
              </h3>
              
              <div className={`text-xs font-sans mb-4 space-y-1.5 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <p>• Detailed mechanical breakdowns of biopharma licensing agreements, M&amp;A, and access partnerships.</p>
                <p>• Executive decision rules and structured trade-off checklists for senior BD&amp;L leaders.</p>
                <p className="text-[11px] font-medium pt-0.5 opacity-80">Strictly executive intelligence. No promotional fluff or sponsored press releases. Unsubscribe anytime.</p>
              </div>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      disabled={submitting}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your corporate work email"
                      className={`w-full px-3 py-2 text-xs font-sans border outline-none rounded-none ${
                        darkMode 
                          ? 'bg-[#061426] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#C5A059]' 
                          : 'bg-white border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                      } ${submitting ? 'opacity-65 cursor-not-allowed' : ''}`}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-5 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-200 whitespace-nowrap cursor-pointer rounded-none flex items-center justify-center gap-1.5 ${
                        submitting ? 'opacity-65 cursor-not-allowed' : ''
                      }`}
                    >
                      <span>{submitting ? 'Submitting...' : 'Subscribe to Future Briefings'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs text-red-500 font-sans mt-1">{error}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center gap-2 p-3 border border-[#C5A059]/40 bg-[#C5A059]/10 text-xs font-sans text-[#C5A059]">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing. You will receive the next fortnightly executive dispatch.</span>
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer Bar */}
          <div className={`p-4 border-t shrink-0 flex items-center justify-between text-xs font-mono ${
            darkMode ? 'bg-[#06111D] border-[#1E3A55] text-slate-400' : 'bg-[#F4F1EA] border-[#E2DDD3] text-slate-600'
          }`}>
            <span>PharmaSignal Intelligence Desk · Independent Decision Intelligence</span>
            <button
              onClick={onClose}
              className="font-bold underline hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Close Briefing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
