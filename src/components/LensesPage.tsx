import { ArrowRight, Compass, Shield, Layers, Radio, Activity, Target, Zap } from 'lucide-react';
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
  const kaigeneSignal = dealSignals.find(a => a.id === 'kaigene-taisho-japan-licensing') || dealSignals[0];

  const lenses = [
    {
      id: 'approval-gap',
      title: 'Approval Gap',
      badge: 'LENS 01',
      subtitle: 'The distance between commercial attractiveness and execution readiness.',
      description: 'Why attractive BD opportunities lose momentum before internal approval. The Approval Gap emerges when different internal functions (BD, Regulatory, Quality, Finance) evaluate an opportunity through conflicting definitions of success.',
      mechanisms: ['Evidence Uncertainty', 'Organizational Alignment', 'Risk Aversion', 'Resource Friction'],
      article: approvalGapArt,
      buttonLabel: 'Read Approval Gap Explainer'
    },
    {
      id: 'execution-deficit',
      title: 'Execution Deficit',
      badge: 'LENS 02',
      subtitle: 'The capability, alignment or resource gaps that slow or stall execution.',
      description: 'Why the transition from agreement to execution is the most vulnerable phase of a transaction. Value leaks quietly after signature when operational teams inherit contractual obligations without decision context.',
      mechanisms: ['Incomplete Context Handover', 'Misaligned Milestone Ownership', 'Governance Debt', 'Operational Friction'],
      article: executionDeficitArt,
      buttonLabel: 'Read Execution Deficit Explainer'
    },
    {
      id: 'opportunity-creation',
      title: 'Opportunity Creation',
      badge: 'LENS 03',
      subtitle: 'The upstream work that creates optionality others don\'t yet have.',
      description: 'Why strong BD teams build thesis-driven partner access before opportunities become visible to the market. Upstream opportunity creation avoids visibility compression and competitive price escalation.',
      mechanisms: ['Upstream Thesis Building', 'Capability-Led Structuring', 'Pre-Pipeline Positioning', 'Strategic Optionality'],
      article: oppCreationArt,
      buttonLabel: 'Read Opportunity Creation Explainer'
    },
    {
      id: 'route-to-market-friction',
      title: 'Route-to-Market Friction',
      badge: 'LENS 04',
      subtitle: 'Market access, pricing and adoption frictions that erode expected value.',
      description: 'How local market access, pricing regulations, and distributor networks erode revenue if territorial licensing fails to align local execution capability with commercial rights.',
      mechanisms: ['Territorial De-Risking', 'Local Access Capability', 'Pricing Compression', 'Regulatory Alignment'],
      article: kaigeneSignal,
      buttonLabel: 'Read Japan Execution Deal Signal'
    },
    {
      id: 'governance-debt',
      title: 'Governance Debt',
      badge: 'LENS 05',
      subtitle: 'Future execution burden created by unclear decision rights.',
      description: 'Why ambiguous alliance steering committees and unresolved escalation pathways erode joint venture value over time. Governance debt accumulates when negotiating teams defer contentious operational decisions to post-signature committee charters.',
      mechanisms: ['Unclear Steering Mandate', 'Escalation Bottlenecks', 'Post-Signature Drift', 'Voting Asymmetry'],
      article: executionDeficitArt,
      buttonLabel: 'Read Execution Deficit Explainer'
    },
    {
      id: 'partner-capability-gap',
      title: 'Partner Capability Gap',
      badge: 'LENS 06',
      subtitle: 'The gap between expected partner role and actual capability.',
      description: 'Why relying on partner name recognition or general market presence without verifying specific therapeutic field force and regulatory relationships leads to stalled launch trajectories.',
      mechanisms: ['Field Force Alignment', 'Therapeutic Expertise Gap', 'Regulatory Access Friction', 'Commercial Commitment'],
      article: kaigeneSignal,
      buttonLabel: 'Read Territorial Execution Signal'
    }
  ];

  return (
    <div className={`py-12 sm:py-20 transition-colors duration-300 ${
      darkMode ? 'bg-brand-deep text-white' : 'bg-[#FAF6EE] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-12 border-b border-brand-gold/20 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="text-brand-gold" size={20} />
            <span className="font-mono text-xs tracking-widest text-brand-gold font-bold uppercase">
              PHARMASIGNAL LENSES
            </span>
          </div>
          
          <h1 className={`font-serif text-3.5xl sm:text-5xl font-bold tracking-tight uppercase mb-4 ${
            darkMode ? 'text-white' : 'text-[#001B2A]'
          }`}>
            PharmaSignal Lenses
          </h1>
          <div className="h-[2px] w-12 bg-brand-gold mb-4" />
          
          <p className={`font-serif text-lg sm:text-xl leading-relaxed italic ${
            darkMode ? 'text-white/90' : 'text-brand-charcoal/90'
          }`}>
            Reusable mental models for interpreting recurring pharma BD decisions.
          </p>
          <p className={`font-sans text-sm sm:text-base mt-3 leading-relaxed ${
            darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
          }`}>
            These decision lenses isolate the underlying mechanics that determine whether pharmaceutical licensing transactions create or destroy commercial value.
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
                  ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                  : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2.5 py-1 border border-brand-gold/30">
                    {lens.badge}
                  </span>
                  <span className="text-[11px] font-mono text-brand-gold/80 uppercase tracking-widest font-semibold">
                    Decision Model
                  </span>
                </div>

                <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  {lens.title}
                </h2>

                <p className="font-serif text-sm sm:text-base text-brand-gold italic font-semibold mb-4">
                  {lens.subtitle}
                </p>

                <p className={`font-sans text-sm sm:text-base leading-relaxed mb-6 ${
                  darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                }`}>
                  {lens.description}
                </p>

                {/* Key mechanisms pill tags */}
                <div className="mb-8">
                  <span className="block text-[10px] font-mono tracking-widest text-brand-gold/90 font-bold uppercase mb-2.5">
                    Core Value Mechanics
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {lens.mechanisms.map((mech) => (
                      <span 
                        key={mech} 
                        className={`text-[11px] font-mono px-2.5 py-1 border ${
                          darkMode ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#FAF6EE] border-[#EADBCC] text-[#111827]/80'
                        }`}
                      >
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between mt-auto">
                <button
                  onClick={() => openArticle(lens.article)}
                  className="w-full px-5 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {lens.buttonLabel} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
