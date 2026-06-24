import { useEffect, useState, UIEvent } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Share2, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { Article } from '../types';
import ApprovalGapDiagram from './ApprovalGapDiagram';
import ExecutionDeficitDiagram from './ExecutionDeficitDiagram';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  darkMode?: boolean;
}

export default function ArticleModal({ article, onClose, darkMode = false }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lock body scroll when reading is active
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      setScrollProgress(0); // Reset progress on article change
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const progress = (target.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="article-reader">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-primary/80 backdrop-blur-sm transition-opacity"
      />

      <div className={`flex h-screen sm:min-h-screen items-center justify-center p-0 sm:p-4 lg:p-6 text-center ${darkMode ? 'dark' : ''}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className={`relative w-full h-screen sm:h-auto sm:max-h-[85vh] md:max-h-[90vh] lg:max-h-[92vh] max-w-4xl lg:max-w-6xl transform overflow-hidden text-left align-middle shadow-2xl transition-all border-t-4 border-brand-gold flex flex-col ${
            darkMode ? 'bg-brand-deep text-white border-b border-l border-r border-white/10' : 'bg-brand-offwhite text-brand-charcoal'
          }`}
        >
          {/* Header Action Bar */}
          <div className={`sticky top-0 z-10 flex flex-col border-b backdrop-blur ${
            darkMode ? 'border-white/10 bg-brand-deep/95' : 'border-brand-charcoal/10 bg-brand-offwhite/95'
          }`}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <button
                onClick={onClose}
                className={`flex items-center gap-1.5 sm:gap-2 text-xs font-sans font-semibold tracking-widest transition-colors cursor-pointer group uppercase ${
                  darkMode ? 'text-white hover:text-brand-gold' : 'text-[#001B2A] hover:text-brand-gold'
                }`}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Explainers
              </button>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handleShare}
                  className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer relative ${
                    darkMode ? 'text-white hover:text-brand-gold hover:bg-white/5' : 'text-brand-primary hover:text-brand-gold hover:bg-brand-primary/5'
                  }`}
                  title="Copy Link to Article"
                >
                  {copied ? <ClipboardCheck size={18} className="text-emerald-500 animate-pulse" /> : <Share2 size={18} />}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] py-1 px-2 rounded tracking-widest whitespace-nowrap border border-white/10">
                      LINK COPIED
                    </span>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer ${
                    darkMode ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-brand-primary hover:text-red-700 hover:bg-brand-primary/5'
                  }`}
                  title="Close Reader"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Reading progress bar */}
            <div className={`w-full h-[3px] relative overflow-hidden ${
              darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'
            }`}>
              <div 
                className="h-full bg-brand-gold transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <article 
            className="flex-1 px-4 py-6 sm:px-10 sm:py-8 md:px-12 overflow-y-auto scroll-smooth relative"
            onScroll={handleScroll}
          >
            <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
              {/* Sticky Sidebar on Left for PC */}
              <div className={`hidden lg:flex lg:col-span-4 h-fit sticky top-2 flex-col pr-6 border-r ${
                darkMode ? 'border-white/10' : 'border-brand-charcoal/10'
              } space-y-6 select-none`}>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                    Briefing Index
                  </span>
                  <p className={`text-xs font-serif italic ${darkMode ? 'text-white/60' : 'text-brand-charcoal/70'}`}>
                    Click to navigate sections
                  </p>
                </div>

                <div className="space-y-1">
                  {article.id === 'the-approval-gap' ? (
                    <>
                      <button 
                        onClick={() => scrollToId('intro')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        01. Executive Summary
                      </button>
                      <button 
                        onClick={() => scrollToId('why-gaps-exist')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        02. Why Gaps Exist
                      </button>
                      <button 
                        onClick={() => scrollToId('economic-impact')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        03. Value Destruction
                      </button>
                      <button 
                        onClick={() => scrollToId('self-assessment')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        04. Assessment Test
                      </button>
                      <button 
                        onClick={() => scrollToId('implications')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        05. Strategic Implications
                      </button>
                    </>
                  ) : article.id === 'execution-deficit' ? (
                    <>
                      <button 
                        onClick={() => scrollToId('intro')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        01. Executive Narrative
                      </button>
                      <button 
                        onClick={() => scrollToId('signing-comfort')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        02. False Comfort of Signing
                      </button>
                      <button 
                        onClick={() => scrollToId('value-leaking')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        03. Where Value Leaks
                      </button>
                      <button 
                        onClick={() => scrollToId('handover-problem')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        04. Handover Problem
                      </button>
                      <button 
                        onClick={() => scrollToId('strategic-changes')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        05. Strategic Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => scrollToId('doc-overview')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        01. Document Overview
                      </button>
                      <button 
                        onClick={() => scrollToId('core-analysis')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        02. Detailed Analysis
                      </button>
                    </>
                  )}
                </div>

                <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
                    Document Metadata
                  </span>
                  <div className={`space-y-1.5 text-xs font-sans ${darkMode ? 'text-white/60' : 'text-brand-charcoal/70'}`}>
                    <p><strong className="font-semibold text-brand-gold">Published:</strong> {article.date || 'June 18, 2026'}</p>
                    <p><strong className="font-semibold text-brand-gold">Author:</strong> {article.author || 'Decision Intelligence'}</p>
                    <p><strong className="font-semibold text-brand-gold">Reading Time:</strong> {article.readTime || '6–8 Minutes'}</p>
                    <p><strong className="font-semibold text-brand-gold">Category:</strong> {article.category}</p>
                  </div>
                </div>

                <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleShare}
                    className={`w-full flex items-center justify-center gap-2 font-sans font-semibold tracking-wider text-xs py-2.5 border transition-all cursor-pointer uppercase ${
                      darkMode 
                        ? 'border-white/15 hover:border-brand-gold text-white hover:text-brand-gold bg-white/[0.02]' 
                        : 'border-brand-charcoal/15 hover:border-brand-gold text-brand-charcoal hover:text-brand-gold bg-brand-charcoal/5'
                    }`}
                  >
                    {copied ? <ClipboardCheck size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                    {copied ? 'Link Copied' : 'Share Briefing'}
                  </button>
                  <button
                    onClick={onClose}
                    className={`w-full text-center font-sans font-bold tracking-wider text-xs py-2.5 transition-all cursor-pointer uppercase ${
                      darkMode 
                        ? 'bg-brand-gold hover:bg-brand-gold-hover text-brand-primary' 
                        : 'bg-brand-charcoal hover:bg-brand-gold text-white hover:text-[#001B2A]'
                    }`}
                  >
                    Finish Reading
                  </button>
                </div>
              </div>

              {/* Main Reading Column */}
              <div className="col-span-12 lg:col-span-8 w-full">
                {article.id === 'the-approval-gap' ? (
                  <>
                    {/* PHARMASIGNAL EXPLAINED HEADER */}
                    <div id="intro" className="mb-4 sm:mb-8 font-mono text-[10px] sm:text-xs tracking-wider">
                  <span className={`block font-bold tracking-widest ${darkMode ? 'text-brand-gold' : 'text-brand-primary'}`}>
                    PHARMASIGNAL EXPLAINED
                  </span>
                  <div className={`mt-1.5 sm:mt-2 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-0.5 sm:gap-y-1 ${darkMode ? 'text-white/60' : 'text-brand-charcoal/60'}`}>
                    <span>Category: Decision Intelligence</span>
                    <span className="opacity-40 sm:inline hidden">•</span>
                    <span className="sm:inline hidden">Reading Time: 6–8 Minutes</span>
                    <span className="opacity-40 sm:inline hidden">•</span>
                    <span className="sm:inline hidden">Published: June 18, 2026</span>
                    
                    <span className="sm:hidden text-[9px] px-1 py-0.5 bg-brand-gold-light/10 text-brand-gold rounded font-mono inline-block">6-8 Min</span>
                    <span className="sm:hidden text-[9px] px-1 py-0.5 bg-brand-gold-light/10 text-brand-gold rounded font-mono inline-block">June 18, 2026</span>
                  </div>
                </div>

                {/* THE APPROVAL GAP TITLE & SUBTITLE */}
                <div className="mb-6 sm:mb-10">
                  <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-2 sm:mb-4 ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    THE APPROVAL GAP
                  </h1>
                  <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold">
                    Why attractive opportunities lose momentum long before a decision is made.
                  </p>
                </div>

                {/* Content containing exactly premium blocks */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  {/* Opening Narrative */}
                  <p className="mb-6">Several years ago, our team identified what appeared to be an ideal in-licensing opportunity for Russia.</p>
                  <p className="mb-6">The market was sizeable. Competition was limited. The commercial rationale was compelling. From a Business Development perspective, the opportunity appeared straightforward.</p>
                  <p className="mb-6">Yet the opportunity never moved forward.</p>
                  <p className="mb-6">The surprising part was not that the project stalled.</p>
                  <p className="mb-6">The surprising part was that nobody fundamentally disagreed with it.</p>
                  <p className="mb-6">Quality had concerns about manufacturing readiness and Russian GMP requirements.</p>
                  <p className="mb-6">Regulatory questioned the partner's familiarity with local filing expectations.</p>
                  <p className="mb-6">Commercial teams prioritized speed to market and competitive positioning.</p>
                  <p className="mb-6">Finance challenged investment assumptions and expected returns.</p>
                  <p className="mb-6">Each concern was legitimate.</p>
                  <p className="mb-6">Each reflected the responsibilities of the function raising it.</p>
                  <p className="mb-6">Yet together they created months of delay, repeated evaluations and growing uncertainty. By the time alignment began to emerge, the timing advantage that originally made the opportunity attractive had already started to erode.</p>
                  <p className="mb-6">Since then, I have observed the same pattern repeatedly across licensing, portfolio and market expansion decisions.</p>
                  <p className="mb-6">I call this the <strong className="font-bold text-brand-gold">Approval Gap</strong>.</p>
                  <p className="mb-6">The larger the Approval Gap, the longer the decision cycle, the greater the rework and the higher the probability that value is lost before a decision is made.</p>

                  {/* Defining the Mechanism Pull-quote */}
                  <div className={`my-12 py-10 px-6 sm:px-10 border-t-2 border-b-2 border-brand-gold text-center max-w-2xl mx-auto ${
                    darkMode ? 'bg-white/[0.02]' : 'bg-brand-gold-light/25'
                  }`}>
                    <p className={`font-serif text-lg sm:text-xl md:text-2xl italic font-bold leading-relaxed ${
                      darkMode ? 'text-brand-gold' : 'text-brand-primary'
                    }`}>
                      "The Approval Gap is the distance between commercial attractiveness and organizational readiness. It emerges when different functions evaluate the same opportunity through different definitions of success."
                    </p>
                  </div>

                  {/* FT Style Image Insertion */}
                  <div className="my-14 max-w-2xl mx-auto">
                    <div className="w-full flex justify-center pb-4 select-none">
                      <ApprovalGapDiagram darkMode={darkMode} />
                    </div>
                    <p className={`mt-4 text-center font-sans text-xs tracking-wide italic leading-normal ${
                      darkMode ? 'text-white/60' : 'text-brand-charcoal/50'
                    }`}>
                      Figure 1: The Approval Gap emerges when different functions evaluate the same opportunity through different success criteria.
                    </p>
                  </div>

                  {/* Why Organizations Create Approval Gaps */}
                  <h2 id="why-gaps-exist" className={`font-serif text-2xl sm:text-3xl font-semibold mb-6 mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why Organizations Create Approval Gaps
                  </h2>
                  <p className="mb-6">Organizations often view approval as a single event.</p>
                  <p className="mb-6">In reality, approval is the visible outcome of a much longer process involving multiple functions, priorities and decision criteria.</p>
                  <p className="mb-6">Business Development focuses on growth potential, strategic fit and speed to market.</p>
                  <p className="mb-6">Regulatory focuses on approvability, documentation quality and compliance risk.</p>
                  <p className="mb-6">Quality focuses on manufacturing standards, audit readiness and supply reliability.</p>
                  <p className="mb-6">Finance focuses on investment returns, profitability and capital allocation.</p>
                  <p className="mb-6">Management focuses on strategic priorities and portfolio fit.</p>
                  <p className="mb-6">None of these perspectives are wrong.</p>
                  <p className="mb-6">The challenge is that they are rarely aligned by default.</p>
                  <p className="mb-6">What appears highly attractive through one lens may appear operationally risky, financially unattractive or strategically distracting through another.</p>
                  <p className="mb-6">When these differences remain unresolved until formal review, the approval process shifts from evaluating an opportunity to reconciling competing priorities.</p>
                  <p className="mb-6">The meeting itself becomes an attempt to close gaps that should have been addressed much earlier.</p>

                  {/* How the Approval Gap Destroys Value */}
                  <div id="economic-impact" className={`my-14 p-8 sm:p-12 border border-brand-gold/30 bg-brand-gold-light/15 ${
                    darkMode ? 'text-white bg-white/[0.01]' : 'text-[#111827]'
                  }`}>
                    <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-8 tracking-tight ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                      How the Approval Gap Destroys Value
                    </h2>
                    <p className={`font-serif text-base sm:text-lg mb-10 italic leading-relaxed ${darkMode ? 'text-white/80' : 'text-brand-charcoal/70'}`}>
                      The economic impact of internal delay does not appear on a standard P&L as a separate line item. Instead, it systematically degrades opportunity value in three predictable ways:
                    </p>

                    <div className="space-y-10">
                      {/* Item 1 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">01</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Launch-Window Evaporation
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          Across emerging markets, the impact is often amplified. Approval delays are rarely neutral. Missing a reimbursement submission window, a tender cycle or a seasonal procurement opportunity can convert a short internal delay into a much larger commercial setback. The opportunity may remain attractive, but the economics can change materially while organizations continue debating execution readiness.
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                      {/* Item 2 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">02</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Multi-Competitor Margin Compression
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          Over the years, I have seen commercially attractive opportunities delayed by six to twelve months despite broad agreement on their potential. In several cases, the delay itself became the primary source of value destruction. The asset remained attractive, but the advantage of early entry gradually disappeared while the organization worked through unresolved alignment issues.
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                      {/* Item 3 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">03</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Eroding Partner Confidence
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          The consequences of approval delay are rarely dramatic; they are usually incremental. Additional analysis is requested. Forecasts are revised. Assumptions are revisited. Questions that could have been addressed earlier reappear during governance reviews, and cross-functional discussions restart. Timelines extend. Momentum slows. Partner confidence weakens.
                        </p>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed mt-4 ${darkMode ? 'text-white/80' : 'text-brand-charcoal/75'}`}>
                          The cost of the Approval Gap eventually translates into lost first-mover advantages, delayed revenue realization, weakened partner confidence, higher evaluation costs, and opportunities that eventually become strategically irrelevant as the market moves on.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Approval Gap Test */}
                  <div id="self-assessment" className={`my-14 p-8 sm:p-12 border-l-4 border-brand-gold ${darkMode ? 'bg-white/[0.01]' : 'bg-brand-gold-light/20'}`}>
                    <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-3 tracking-tight ${
                      darkMode ? 'text-white' : 'text-brand-primary'
                    }`}>
                      The Approval Gap Test
                    </h2>
                    <p className={`font-sans text-xs tracking-wider uppercase mb-8 ${darkMode ? 'text-brand-gold' : 'text-brand-primary/60'}`}>
                      An Executive Assessment for Business Development Leaders
                    </p>

                    <div className="space-y-8">
                      {/* Q1 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">01</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Alignment Timing
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Are functional stakeholders aligned on evaluation success criteria before formal review stages, or does cross-functional negotiation happen under the pressure of the final decision meeting?
                          </p>
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">02</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Commercial vs. Operational Balance
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Has your team explicitly measured the difference between the commercial attractiveness of the asset and your organization's operational readiness to execute the launch?
                          </p>
                        </div>
                      </div>

                      {/* Q3 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">03</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Interdisciplinary Definitions
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Do BD, Quality, Regulatory, and Finance share a single, aligned definition of what a "successful" deal execution looks like, or is each department optimizing for its own separate objectives?
                          </p>
                        </div>
                      </div>

                      {/* Q4 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">04</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Diligence Friction Control
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Are complex, functional friction points—such as localized manufacturing GMP requirements or partner CMC standards—systematically unearthed and addressed early in the initial diligence phase?
                          </p>
                        </div>
                      </div>

                      {/* Q5 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">05</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Value-At-Risk Modeling
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Is the precise financial risk of regulatory or commercial delays (e.g., missing seasonal tender cycles or launch windows) factored directly into active licensing valuation models?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implications for Decision Makers */}
                  <h2 id="implications" className={`font-serif text-2xl sm:text-3xl font-semibold mb-6 mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Implications for Decision Makers
                  </h2>
                  <p className="mb-6">Most organizations invest considerable effort evaluating opportunities.</p>
                  <p className="mb-6">Far fewer invest the same effort aligning stakeholders before formal evaluation begins.</p>
                  <p className="mb-4">The most effective Business Development leaders understand that approval is not secured through a stronger presentation.</p>
                  <p className="mb-6 italic text-brand-gold font-bold">It is secured through stronger alignment.</p>
                  <p className="mb-6">Their role extends beyond identifying opportunities and negotiating commercial terms. They actively engage stakeholders early. They understand how Quality defines success, they digest Regulatory concerns, and they address Finance expectations and management priorities to resolve friction before it surfaces during governance reviews.</p>
                  <p className="mb-6">Organizations often assume that better analysis leads to better decisions. In reality, closing the Approval Gap frequently creates more value than producing another round of analysis.</p>
                  <p className="mb-6 pb-2">They often believe they are evaluating opportunities. In reality, they are evaluating their ability to align around those opportunities.</p>

                  {/* PHARMASIGNAL PRINCIPLE */}
                  <div className="my-16 p-8 sm:p-12 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-4">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <div className="space-y-6">
                      <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic font-medium text-white/95">
                        "Organizations often believe they lose opportunities because competitors move faster. More often, they lose opportunities because internal alignment moves slower."
                      </p>
                      <div className="h-[1px] w-20 bg-brand-gold/40" />
                      <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic font-medium text-white/95">
                        "In pharmaceutical business development, opportunity quality determines what enters the pipeline. The Approval Gap determines what survives it."
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : article.id === 'execution-deficit' ? (
              <>
                {/* PHARMASIGNAL EXPLAINED HEADER */}
                <div id="intro" className="mb-4 sm:mb-8 font-mono text-[10px] sm:text-xs tracking-wider">
                  <span className={`block font-bold tracking-widest ${darkMode ? 'text-brand-gold' : 'text-brand-primary'}`}>
                    PHARMASIGNAL EXPLAINED
                  </span>
                  <div className={`mt-1.5 sm:mt-2 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-0.5 sm:gap-y-1 ${darkMode ? 'text-white/60' : 'text-brand-charcoal/60'}`}>
                    <span>Category: Decision Intelligence</span>
                    <span className="opacity-40 sm:inline hidden">•</span>
                    <span className="sm:inline hidden">Reading Time: 8 Minutes</span>
                    <span className="opacity-40 sm:inline hidden">•</span>
                    <span className="sm:inline hidden">Published: June 24, 2026</span>
                    
                    <span className="sm:hidden text-[9px] px-1 py-0.5 bg-brand-gold-light/10 text-brand-gold rounded font-mono inline-block">8 Min</span>
                    <span className="sm:hidden text-[9px] px-1 py-0.5 bg-brand-gold-light/10 text-brand-gold rounded font-mono inline-block">June 24, 2026</span>
                  </div>
                </div>

                {/* THE EXECUTION DEFICIT TITLE & SUBTITLE */}
                <div className="mb-6 sm:mb-10">
                  <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-2 sm:mb-4 ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    A SIGNED DEAL IS NOT AN EXECUTED DEAL
                  </h1>
                  <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold">
                    Why the transition from agreement to execution is the most vulnerable phase of a pharma transaction.
                  </p>
                </div>

                {/* Content containing exactly premium blocks */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  {/* Opening Narrative */}
                  <p className="mb-6">One of the first major BD deals our team worked on was for Brazil.</p>
                  <p className="mb-6">It had almost everything a BD team wants to see. The product had been identified strategically. The commercial case was detailed. The forecast was attractive. The management presentation was strong. The agreement was negotiated carefully. By the time the deal was signed, it felt like one of the best closures the team had delivered.</p>
                  <p className="mb-6">The expectation was straightforward: once launched, the product should become a meaningful commercial success.</p>
                  <p className="mb-4 font-bold text-brand-gold text-lg">It did not.</p>
                  <p className="mb-6">Actual revenue was not even one-tenth of the original projection.</p>
                  <p className="mb-6">The easy explanation would have been to blame the product, the market, the partner, or the forecast. But that was not the real issue. The opportunity had not been poorly selected, the agreement had not been casually negotiated, and the business case had not been weakly presented.</p>
                  <p className="mb-6">The problem surfaced only when the agreement moved into execution.</p>
                  <p className="mb-6">The deal moved from BD into regulatory, PMO, commercial and other execution teams without enough structured transition. Assumptions that were clear during approval were not carried forward with the same ownership. Follow-up weakened. Context was lost. The handover was incomplete.</p>
                  <p className="mb-6">The signing was strong; the transition that followed was not.</p>
                  <p className="mb-6">A similar pattern appeared in a few other early projects before the lesson became clear: in pharma BD, signing is not success. It is the point at which the deal begins to depend on the organization’s ability to execute what it has agreed.</p>

                  {/* Defining the Mechanism Pull-quote */}
                  <div className={`my-12 py-10 px-6 sm:px-10 border-t-2 border-b-2 border-brand-gold text-center max-w-2xl mx-auto ${
                    darkMode ? 'bg-white/[0.02]' : 'bg-brand-gold-light/25'
                  }`}>
                    <p className={`font-serif text-lg sm:text-xl md:text-2xl italic font-bold leading-relaxed ${
                      darkMode ? 'text-brand-gold' : 'text-brand-primary'
                    }`}>
                      "In pharmaceutical business development, signing is not success. It is the point at which the deal begins to depend on the organization’s ability to execute what it has agreed."
                    </p>
                  </div>

                  {/* FT Style Image Insertion */}
                  <div className="my-14 max-w-2xl mx-auto">
                    <p className={`mb-6 font-serif text-base sm:text-lg leading-relaxed ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/80'
                    }`}>
                      This is the Execution Deficit: the distance between signing the agreement and building the operating conditions required to deliver the forecast.
                    </p>
                    <div className="w-full flex justify-center pb-4 select-none">
                      <ExecutionDeficitDiagram darkMode={darkMode} />
                    </div>
                    <p className={`mt-4 text-center font-sans text-xs tracking-wide italic leading-normal ${
                      darkMode ? 'text-white/60' : 'text-brand-charcoal/50'
                    }`}>
                      Figure: Execution Deficit — where projected value leaks after signature.
                    </p>
                  </div>

                  {/* The False Comfort of Signing */}
                  <h2 id="signing-comfort" className={`font-serif text-2xl sm:text-3xl font-semibold mb-6 mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    The False Comfort of Signing
                  </h2>
                  <p className="mb-6">Many pharma deals are judged too early.</p>
                  <p className="mb-6">Organizations often treat signing as the moment when the deal is completed. The BD team has delivered, the partner has committed, management has approved, and attention shifts to the next opportunity. In internal language, the deal is “closed.”</p>
                  <p className="mb-6">Commercially, however, very little value has been created at that point.</p>
                  <p className="mb-6">The value is created later, through regulatory execution, supply readiness, launch preparation, partner focus, market access work, governance discipline and cross-functional follow-through. A deal can be excellent at the negotiation table and still fail in commercialization if the organization does not manage the transition from agreement to execution.</p>
                  <p className="mb-6 italic text-brand-gold">The risk is not in the signature itself, but in what the organization assumes the signature has already solved.</p>

                  {/* Where Value Starts Leaking */}
                  <div id="value-leaking" className={`my-14 p-8 sm:p-12 border border-brand-gold/30 bg-brand-gold-light/15 ${
                    darkMode ? 'text-white bg-white/[0.01]' : 'text-[#111827]'
                  }`}>
                    <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-8 tracking-tight ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                      Where Value Starts Leaking
                    </h2>
                    <p className={`font-serif text-base sm:text-lg mb-10 italic leading-relaxed ${darkMode ? 'text-white/80' : 'text-brand-charcoal/70'}`}>
                      Negotiation success is visible. Execution failure is slower, less dramatic, and usually shows up in three places:
                    </p>

                    <div className="space-y-10">
                      {/* Item 1 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">01</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Slipping Regulatory Timelines
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          Regulatory timelines slip when local submission requirements are handled as simple handovers rather than strategic milestones. If the receiving team doesn't inherit the product context from diligence, simple queries can easily trigger months of delay.
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                      {/* Item 2 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">02</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Evaporating Partner Urgency
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          Once negotiations conclude, partner momentum naturally cools. Without active joint governance and transition milestones, the licensing partner may quietly reprioritize internal resources, stalling launch-readiness work.
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`h-[1px] w-full ${darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'}`} />

                      {/* Item 3 */}
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-mono text-sm font-bold text-brand-gold tracking-widest">03</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-bold m-0 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Fragmented Commercial Ownership
                          </h3>
                        </div>
                        <p className={`font-serif text-base sm:text-lg leading-relaxed ${darkMode ? 'text-white/85' : 'text-brand-charcoal/80'}`}>
                          The local affiliate receives a signed contract and a forecast, but not the underlying decision rationale or target profiling logic. Lacking this context, local teams fall back on generic commercial campaigns, eroding the competitive advantage designed during diligence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Handover Problem */}
                  <h2 id="handover-problem" className={`font-serif text-2xl sm:text-3xl font-semibold mb-6 mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    The Handover Problem
                  </h2>
                  <p className="mb-6">Conventional BD thinking gives significant attention to deal closure, and understandably so. Closure requires opportunity selection, commercial modelling, internal alignment, management approval, partner negotiation, legal agreement and financial justification.</p>
                  <p className="mb-6">But closure is only one part of value creation.</p>
                  <p className="mb-6">The deal system and execution system are often not connected strongly enough. Value leaks when Business Development hands over the contractual obligation but not the underlying decision logic.</p>
                  <p className="mb-6">Regulatory, PMO, supply, commercial, finance and local teams need to understand not only what has been signed, but why it was signed, what assumptions supported approval, where value can be lost, and what must be protected during execution.</p>
                  <p className="mb-6 font-bold text-brand-gold italic">In many cases, the weak point is not the negotiation table. It is the passage from negotiation to execution.</p>

                  {/* How to Detect Execution Deficit Early */}
                  <div id="strategic-changes" className={`my-14 p-8 sm:p-12 border-l-4 border-brand-gold ${darkMode ? 'bg-white/[0.01]' : 'bg-brand-gold-light/20'}`}>
                    <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-3 tracking-tight ${
                      darkMode ? 'text-white' : 'text-brand-primary'
                    }`}>
                      How to Detect Execution Deficit Early
                    </h2>
                    <p className={`font-sans text-xs tracking-wider uppercase mb-8 ${darkMode ? 'text-brand-gold' : 'text-brand-primary/60'}`}>
                      Three early signs that the deal has been signed faster than it has been operationally absorbed
                    </p>

                    <div className="space-y-8">
                      {/* Q1 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">01</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Transition Ownership
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Is there a 90-day transition owner after signing, with BD and execution teams both accountable?
                          </p>
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">02</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Diligence Assumptions
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Are the key assumptions from diligence documented and assigned to functional owners?
                          </p>
                        </div>
                      </div>

                      {/* Q3 */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-brand-gold leading-none">03</span>
                        <div>
                          <p className={`font-serif text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                            Execution Milestones
                          </p>
                          <p className={`font-sans text-xs sm:text-sm ${darkMode ? 'text-white/80' : 'text-brand-charcoal/80'}`}>
                            Are regulatory, PMO and commercial milestones agreed before final approval, not after signing?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary & View */}
                  <p className="mb-6">For BD teams, responsibility should not end at signature. It should change form, from deal creation to value transition.</p>
                  <p className="mb-6">For licensing heads, approval should include transition readiness, not only deal attractiveness.</p>
                  <p className="mb-6">For regulatory, PMO and commercial teams, early involvement matters because they inherit the reality that BD has negotiated.</p>

                  {/* PHARMASIGNAL PRINCIPLE */}
                  <div className="my-16 p-8 sm:p-12 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-4">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <div className="space-y-6">
                      <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic font-medium text-brand-gold">
                        "The signature matters, but the handover decides whether the forecast survives."
                      </p>
                      <div className="h-[1px] w-20 bg-brand-gold/40" />
                      <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80">
                        The handover from Business Development to regulatory, PMO, commercial, and alliance teams is not an administrative step. It is an active value-protection mechanism. The strongest organizations do not stop at negotiating the agreement; they protect the strategic assumptions behind it as the deal moves into execution.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Category Breadcrumb */}
                <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase mb-2 sm:mb-4">
                  {article.category}
                </span>

                {/* Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-6 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  {article.title}
                </h1>

                {/* Author / Date Meta Strip */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-2 sm:py-4 mb-4 sm:mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Featured Summary */}
                <p id="doc-overview" className={`font-serif text-base sm:text-xl italic border-l-4 border-brand-gold pl-4 sm:pl-6 py-1.5 sm:py-2 mb-6 sm:mb-10 leading-relaxed p-3 sm:p-4 ${
                  darkMode ? 'bg-white/5 text-white/90' : 'bg-brand-gold-light/25 text-brand-primary/85'
                }`}>
                  {article.featuredSummary}
                </p>

                {/* Content markup container */}
                <div 
                  id="core-analysis"
                  className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </>
            )}

            {/* Bottom Section */}
            <div className={`mt-14 pt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-6 ${
              darkMode ? 'border-white/10' : 'border-brand-charcoal/10'
            }`}>
              <div>
                <p className={`font-sans text-xs mb-1 tracking-wider ${darkMode ? 'text-white/50' : 'text-brand-charcoal/60'}`}>PUBLICATION DETAILS</p>
                <p className={`font-serif text-sm font-semibold ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Decision Intelligence Platform</p>
              </div>
              <button
                onClick={onClose}
                className={`px-8 py-3 text-xs tracking-widest font-sans font-bold transition-colors rounded-none uppercase cursor-pointer ${
                  darkMode ? 'bg-brand-gold text-brand-primary hover:bg-brand-gold-hover' : 'bg-[#001B2A] text-white hover:bg-brand-gold hover:text-[#001B2A]'
                }`}
              >
                Finished Reading
              </button>
            </div>
          </div>
        </div>
      </article>
        </motion.div>
      </div>
    </div>
  );
}
