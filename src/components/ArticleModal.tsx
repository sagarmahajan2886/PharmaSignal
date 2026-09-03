import { useEffect, useState, UIEvent } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Share2, ClipboardCheck, ArrowLeft, Shield, ArrowRight, Linkedin, FileDown } from 'lucide-react';
import { Article } from '../types';
import ApprovalGapDiagram from './ApprovalGapDiagram';
import { TerritoryExecutionTransferDiagram } from './TerritoryExecutionTransferDiagram';
import { CapabilityLedOpportunityDiagram } from './CapabilityLedOpportunityDiagram';
import { SKBiopharmBiohavenDiagram } from './SKBiopharmBiohavenDiagram';
import { AurigeneTechTransferDiagram } from './AurigeneTechTransferDiagram';
import { BMSCellaresScaleDiagram } from './BMSCellaresScaleDiagram';
import LinkedInCarouselModal from './LinkedInCarouselModal';
// @ts-ignore
import executionDeficitImg from '../assets/images/execution_deficit_diagram_new_1782370523380.jpg';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  darkMode?: boolean;
  onSelectArticleId?: (id: string) => void;
}

export default function ArticleModal({ article, onClose, darkMode = false, onSelectArticleId }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carouselOpen, setCarouselOpen] = useState(false);

  // Lock body scroll and sync URL when reading is active
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      setScrollProgress(0); // Reset progress on article change
      const prefix = article.isDealSignal ? '/deal-signals' : '/explainers';
      const path = `${prefix}/${article.id}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    const prefix = article.isDealSignal ? '/deal-signals' : '/explainers';
    const fullUrl = `${window.location.origin}${prefix}/${article.id}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
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
            darkMode ? 'bg-[#0B121E] text-white border-b border-l border-r border-white/10' : 'bg-white text-[#0B121E] border-b border-l border-r border-slate-200'
          }`}
        >
          {/* Header Action Bar */}
          <div className={`sticky top-0 z-10 flex flex-col border-b backdrop-blur ${
            darkMode ? 'border-white/10 bg-[#0B121E]/95' : 'border-slate-200 bg-white/95'
          }`}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <button
                onClick={onClose}
                className={`flex items-center gap-1.5 sm:gap-2 text-xs font-sans font-semibold tracking-widest transition-colors cursor-pointer group uppercase ${
                  darkMode ? 'text-white hover:text-brand-gold' : 'text-[#0B121E] hover:text-brand-cobalt'
                }`}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {article.isDealSignal ? 'Back to Deal Signals' : 'Back to Explainers'}
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setCarouselOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider border border-brand-gold/40 hover:border-brand-gold text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 transition-all cursor-pointer uppercase font-bold"
                  title="Export LinkedIn Visual Carousel"
                >
                  <Linkedin size={13} fill="currentColor" />
                  <span className="hidden sm:inline">Export Carousel</span>
                  <FileDown size={13} />
                </button>

                <button
                  onClick={handleShare}
                  className={`p-1.5 sm:p-2 rounded-none transition-all cursor-pointer relative border ${
                    darkMode ? 'text-white border-white/10 hover:border-brand-gold hover:text-brand-gold hover:bg-white/5' : 'text-[#0B121E] border-slate-200 hover:border-brand-cobalt hover:text-brand-cobalt hover:bg-slate-50'
                  }`}
                  title="Copy Link to Article"
                >
                  {copied ? <ClipboardCheck size={16} className="text-emerald-500 animate-pulse" /> : <Share2 size={16} />}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0B121E] text-white text-[10px] py-1 px-2 rounded-none tracking-widest whitespace-nowrap border border-white/10">
                      LINK COPIED
                    </span>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className={`p-1.5 sm:p-2 rounded-none transition-all cursor-pointer border ${
                    darkMode ? 'text-white border-white/10 hover:text-red-400 hover:border-red-400 hover:bg-white/5' : 'text-[#0B121E] border-slate-200 hover:text-red-600 hover:border-red-300 hover:bg-red-50/50'
                  }`}
                  title="Close Reader"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Reading progress bar */}
            <div className={`w-full h-[3px] relative overflow-hidden ${
              darkMode ? 'bg-white/10' : 'bg-slate-100'
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
                darkMode ? 'border-white/10' : 'border-slate-200'
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
                        onClick={() => scrollToId('handover-problem')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        03. Handover Problem
                      </button>
                      <button 
                        onClick={() => scrollToId('detect-early')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        04. Detecting Deficit Early
                      </button>
                      <button 
                        onClick={() => scrollToId('decision-makers')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        05. For Decision Makers
                      </button>
                      <button 
                        onClick={() => scrollToId('principle-deficit')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        06. PharmaSignal Principle
                      </button>
                    </>
                  ) : article.id === 'opportunity-creation-processing' ? (
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
                        onClick={() => scrollToId('creation-vs-processing')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        02. Creation vs Processing
                      </button>
                      <button 
                        onClick={() => scrollToId('visibility-compression')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        03. Visibility Compression
                      </button>
                      <button 
                        onClick={() => scrollToId('creation-test')} 
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
                        05. Decision Maker Guide
                      </button>
                      <button 
                        onClick={() => scrollToId('principle-creation')} 
                        className={`w-full text-left font-sans text-[11px] py-1.5 px-2 hover:bg-brand-gold/10 hover:text-brand-gold border-l-2 border-transparent hover:border-brand-gold transition-all cursor-pointer ${
                          darkMode ? 'text-white/70' : 'text-brand-primary'
                        }`}
                      >
                        06. PharmaSignal Principle
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

                <div className={`p-4 border space-y-2.5 ${
                  darkMode ? 'bg-[#111C2E] border-brand-gold/40' : 'bg-blue-50/40 border-blue-200/60'
                }`}>
                  <div className="flex items-center gap-2">
                    <Linkedin size={15} className="text-[#0A66C2]" />
                    <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                      LinkedIn Carousel
                    </span>
                  </div>
                  <p className={`text-[11px] font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Export 4-slide high-res PDF carousel with quote hooks & metrics.
                  </p>
                  <button
                    onClick={() => setCarouselOpen(true)}
                    className="w-full py-2 bg-brand-gold hover:bg-brand-gold-hover text-[#0B121E] font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FileDown size={13} />
                    <span>Export Carousel PDF</span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleShare}
                    className={`w-full flex items-center justify-center gap-2 font-sans font-semibold tracking-wider text-xs py-2.5 border transition-all cursor-pointer uppercase ${
                      darkMode 
                        ? 'border-white/15 hover:border-brand-gold text-white hover:text-brand-gold bg-white/[0.02]' 
                        : 'border-slate-200 hover:border-brand-cobalt text-slate-700 hover:text-brand-cobalt bg-slate-50/50'
                    }`}
                  >
                    {copied ? <ClipboardCheck size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                    {copied ? 'Link Copied' : 'Share Briefing'}
                  </button>
                  <button
                    onClick={onClose}
                    className={`w-full text-center font-sans font-bold tracking-wider text-xs py-2.5 transition-all cursor-pointer uppercase ${
                      darkMode 
                        ? 'bg-brand-gold hover:bg-brand-gold-hover text-[#0B121E]' 
                        : 'bg-[#0B121E] hover:bg-brand-cobalt text-white'
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
                    <span className="sm:inline hidden">Reading Time: 7 Minutes</span>
                    <span className="opacity-40 sm:inline hidden">•</span>
                    <span className="sm:inline hidden">Published: June 24, 2026</span>
                    
                    <span className="sm:hidden text-[9px] px-1 py-0.5 bg-brand-gold-light/10 text-brand-gold rounded font-mono inline-block">7 Min</span>
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
                  <p className="font-serif text-sm sm:text-lg md:text-xl italic leading-relaxed text-brand-gold/90 font-medium">
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
                  <p className="mb-6">The easy explanation would have been to blame the product, the market, the partner, or the forecast. But that was not the real issue. The opportunity had not been poorly selected. The agreement had not been casually negotiated. The business case had not been weakly presented.</p>
                  <p className="mb-6">The problem surfaced only when the agreement moved into execution.</p>
                  <p className="mb-6">The deal moved from BD into regulatory, governance, commercial and other execution teams without enough structured transition. Assumptions that were clear during approval were not carried forward with the same ownership. Follow-up weakened. Context was lost. The handover was incomplete.</p>
                  <p className="mb-6">The signing was strong.</p>
                  <p className="mb-6">The transition that followed was not.</p>
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
                  <div className="my-10 sm:my-16 max-w-2xl mx-auto px-1 sm:px-0">
                    <p className={`mb-6 font-serif text-base sm:text-lg leading-relaxed ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/80'
                    }`}>
                      This is the Execution Deficit: the distance between signing the agreement and building the operating conditions required to realize the deal’s value.
                    </p>
                    <div className="w-full py-4 sm:py-6 select-none">
                      <img 
                        src={executionDeficitImg} 
                        alt="Execution Deficit in pharma BD — the gap between signed agreement and realized commercial value." 
                        className="w-full h-auto object-contain shadow-2xl border border-brand-gold/20 rounded-sm"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className={`mt-2 block text-center font-sans text-[10px] sm:text-xs tracking-normal font-normal leading-normal ${
                      darkMode ? 'text-white/50' : 'text-brand-charcoal/55'
                    }`}>
                      Figure: Execution Deficit — where projected value leaks after signature.
                    </span>
                  </div>

                  {/* Elegant Internal Linking Card */}
                  <div className={`my-10 p-6 border-l-2 border-brand-gold ${darkMode ? 'bg-white/[0.02]' : 'bg-brand-gold-light/10'}`}>
                    <p className="text-[10px] font-mono tracking-widest text-brand-gold uppercase mb-1.5 font-bold">Related Analysis</p>
                    <p className={`font-serif text-sm leading-relaxed ${darkMode ? 'text-white/90' : 'text-brand-charcoal'}`}>
                      Read our explainer on{' '}
                      <button 
                        onClick={() => onSelectArticleId?.('the-approval-gap')} 
                        className="text-brand-gold underline hover:text-brand-gold-hover font-semibold cursor-pointer transition-colors"
                      >
                        The Approval Gap
                      </button>
                      {' '}to understand how internal alignment friction delays critical licensing decisions.
                    </p>
                  </div>

                  {/* The False Comfort of Signing */}
                  <h2 id="signing-comfort" className={`font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 mt-10 sm:mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    The False Comfort of Signing
                  </h2>
                  <p className="mb-6">Many pharma deals are judged too early.</p>
                  <p className="mb-6">Organizations often treat signing as the moment when the deal is completed. The BD team has delivered. The partner has committed. Management has approved. Attention shifts to the next opportunity.</p>
                  <p className="mb-6">In internal language, the deal is “closed.”</p>
                  <p className="mb-6">Commercially, however, very little value has been created at that point.</p>
                  <p className="mb-6">The value is created later, through regulatory execution, supply readiness, launch preparation, partner focus, market access work, governance discipline and cross-functional follow-through.</p>
                  <p className="mb-6">A deal can be excellent at the negotiation table and still fail in commercialization if the organization does not manage the transition from agreement to execution.</p>
                  <p className="mb-6">The risk is not in the signature itself.</p>
                  <p className="mb-6 font-bold text-brand-gold italic">The risk is in what the organization assumes the signature has already solved.</p>

                  {/* The Handover Problem */}
                  <h2 id="handover-problem" className={`font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 mt-10 sm:mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    The Handover Problem
                  </h2>
                  <p className="mb-6">Conventional BD thinking gives significant attention to deal closure, and understandably so.</p>
                  <p className="mb-6">Closure requires opportunity selection, commercial modelling, internal alignment, management approval, partner negotiation, legal agreement and financial justification.</p>
                  <p className="mb-6">But closure is only one part of value creation.</p>
                  <p className="mb-6">The deal system and the execution system are often not connected strongly enough.</p>
                  <p className="mb-6">Value leaks when Business Development hands over the contractual obligation but not the underlying decision logic.</p>
                  <p className="mb-6">Regulatory, governance, supply, commercial, finance and local teams need to understand not only what has been signed, but why it was signed, what assumptions supported approval, where value can be lost, and what must be protected during execution.</p>
                  <p className="mb-6 font-bold text-brand-gold italic">In many cases, the weak point is not the negotiation table. It is the passage from negotiation to execution.</p>

                  {/* How to Detect Execution Deficit Early */}
                  <div id="detect-early" className={`my-14 p-8 sm:p-12 border-l-4 border-brand-gold ${darkMode ? 'bg-white/[0.01]' : 'bg-brand-gold-light/20'}`}>
                    <h2 className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 tracking-tight ${
                      darkMode ? 'text-white' : 'text-brand-primary'
                    }`}>
                      How to Detect Execution Deficit Early
                    </h2>
                    <p className={`font-sans text-xs tracking-wider uppercase mb-8 ${darkMode ? 'text-brand-gold' : 'text-brand-primary/60'}`}>
                      Three signs indicate that a deal has been signed faster than it has been operationally absorbed
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
                            Is there a 90-day transition owner after signing, with BD and execution teams both accountable? If nobody owns the transition, the deal enters execution with unclear accountability from day one.
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
                            Are the key assumptions from diligence documented and assigned to functional owners? If assumptions stay inside the approval deck, they rarely survive execution reality.
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
                            Are regulatory, governance and commercial milestones agreed before final approval, not after signing? If execution milestones are built only after signature, the organization is already late.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What This Means for Decision Makers */}
                  <h2 id="decision-makers" className={`font-serif text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 mt-10 sm:mt-12 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    What This Means for Decision Makers
                  </h2>
                  <p className="mb-6">For BD teams, responsibility should not end at signature. It should change form: from deal creation to value transition.</p>
                  <p className="mb-6">For licensing heads, approval should include transition readiness, not only deal attractiveness.</p>
                  <p className="mb-6">For alliance managers, early involvement matters because governance debt is often created before the alliance formally begins.</p>
                  <p className="mb-6">For regulatory, commercial and local execution teams, early context is not administrative. It protects the assumptions that made the deal worth signing.</p>
                  <p className="mb-6">For finance and portfolio leaders, risk-adjusted value should include execution risk, not only product, price and market assumptions.</p>
                  
                  <p className="mb-6 font-serif text-lg sm:text-xl md:text-2xl italic text-brand-gold leading-relaxed mt-10">
                    The better question is not only:
                  </p>
                  <p className="mb-6 font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-brand-gold leading-tight">
                    Can we sign this deal?
                  </p>
                  <p className="mb-6 font-serif text-lg sm:text-xl md:text-2xl italic text-brand-gold leading-relaxed mt-8">
                    The better question is:
                  </p>
                  <p className="mb-6 font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-brand-gold leading-tight">
                    Can this deal survive the transition from agreement to execution?
                  </p>

                  {/* PHARMASIGNAL PRINCIPLE */}
                  <div id="principle-deficit" className="my-16 p-8 sm:p-12 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-4">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <div className="space-y-6">
                      <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic font-medium text-brand-gold">
                        "The signature matters, but the handover decides whether the forecast survives."
                      </p>
                      <div className="h-[1px] w-20 bg-brand-gold/40" />
                      <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80">
                        The handover from Business Development to regulatory, governance, commercial and alliance teams is not an administrative step. It is an active value-protection mechanism. The strongest organizations do not stop at negotiating the agreement. They protect the strategic assumptions behind it as the deal moves into execution.
                      </p>
                      <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed italic font-medium text-brand-gold pt-4">
                        A signed deal creates commitment. Execution creates value.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : article.id === 'innovent-spero-ex-china-execution-transfer' ? (
              <>
                {/* 1. Category Breadcrumb */}
                <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase mb-2 sm:mb-3">
                  {article.category}
                </span>

                {/* 1. Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  Innovent Transfers SP001 Execution Outside Greater China
                </h1>

                {/* 2. Subtitle */}
                <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold mb-6 sm:mb-8 font-medium">
                  Spero receives more than geographic rights. It assumes the operating responsibilities required to build the asset across international markets.
                </p>

                {/* 3. Metadata */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-3.5 mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Deal Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>July 14, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>2 minutes read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                    <span>Mechanism: Territory-to-Execution Transfer</span>
                  </div>
                </div>

                {/* 4. PharmaSignal Take Box */}
                <div className={`my-8 p-6 sm:p-8 border-l-4 border-brand-gold ${
                  darkMode ? 'bg-brand-gold/10 text-white' : 'bg-brand-gold-light/25 text-brand-primary'
                }`}>
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    <Shield size={16} /> PHARMASIGNAL TAKE
                  </div>
                  <p className="font-serif text-base sm:text-lg leading-relaxed font-semibold mb-3 text-brand-gold">
                    This is a Territory-to-Execution Transfer deal.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed mb-3 opacity-95">
                    Innovent assigned research, development, manufacturing and commercialization responsibility outside Greater China.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 italic">
                    The BD question is whether execution capability transfers as cleanly as contractual rights.
                  </p>
                </div>

                {/* 5. Hero Mechanism Image */}
                <div className="my-10 max-w-2xl mx-auto">
                  <TerritoryExecutionTransferDiagram darkMode={darkMode} />
                  <p className={`mt-3 text-center font-sans text-xs tracking-wide italic leading-normal ${
                    darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                  }`}>
                    Figure 1: Territory-to-Execution Transfer — Innovent retains Greater China while Spero absorbs rest-of-world operating accountability.
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  
                  {/* 6. Deal Signal */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Deal Signal
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    On July 14, 2026, Spero Therapeutics and Innovent Biologics announced an exclusive license for SP001, also known as IBI355. Spero received worldwide rights outside Greater China to research, develop, manufacture and commercialize the asset. Innovent retained rights in mainland China, Hong Kong, Macau and Taiwan. Innovent is eligible for an upfront payment, milestones bringing the stated potential deal value to approximately $1.1 billion, and tiered royalties.
                  </p>

                  {/* 7. Source Discipline */}
                  <div className={`my-8 p-6 border-l-2 border-brand-gold ${darkMode ? 'bg-white/[0.02]' : 'bg-brand-gold-light/15'}`}>
                    <h2 className={`font-serif text-xl sm:text-2xl font-bold mb-4 tracking-tight ${
                      darkMode ? 'text-brand-gold' : 'text-brand-primary'
                    }`}>
                      Source Discipline
                    </h2>
                    <div className="space-y-3 font-sans text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-brand-gold font-bold">Verified facts:</strong> The rights package covers research, development, manufacturing and commercialization outside Greater China. Spero expects to advance SP001 initially in IgG4-related disease, while Innovent expects to study it in China in Sjögren’s disease.
                      </p>
                      <p>
                        <strong className="text-brand-gold font-bold">Undisclosed terms:</strong> Upfront-payment amount, milestone breakdown, royalty rates, governance, supply transition, development-data exchange and decision rights.
                      </p>
                      <p>
                        <strong className="text-brand-gold font-bold">PharmaSignal interpretation:</strong> The agreement creates two territorial execution systems around the same asset.
                      </p>
                    </div>
                  </div>

                  {/* 8. Why It Matters */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why It Matters
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Territorial licenses are often described as geographic divisions. That description is incomplete when the licensee also assumes the functions required to move an asset through development and into the market.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    Spero is not simply receiving access to countries. It is taking responsibility for converting an externally developed program into a new international pipeline. Innovent retains Greater China and continues its own development path.
                  </p>

                  {/* 9. PharmaSignal Read */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    PharmaSignal Read
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    This is Territory-to-Execution Transfer: territory bundled with operating accountability.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    The structure gives each company room to select indications and development priorities suited to its own portfolio. That can create parallel opportunity. It can also create divergence in evidence generation, manufacturing decisions and regulatory sequencing.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    The main execution risk sits at the boundary. Early clinical knowledge, assay history, manufacturing methods and future safety findings must cross organizational and territorial lines. Weak transfer mechanisms can produce Value Leakage After Signing even when contractual rights are clear.
                  </p>

                  {/* 10. PharmaSignal Principle */}
                  <div className="my-12 p-8 sm:p-10 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <p className="font-serif text-lg sm:text-2xl leading-relaxed italic font-bold text-brand-gold">
                      "A territory creates value only when the capability to execute travels with the rights."
                    </p>
                  </div>

                  {/* 11. Related Signals */}
                  <div className={`my-12 p-6 sm:p-8 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      RELATED SIGNALS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Related Signal 1 */}
                      <button
                        onClick={() => onSelectArticleId?.('ems-mirecule-upstream-collaboration')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          OPPORTUNITY CREATION
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          EMS Moves Upstream Before There Is a Product to License
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>

                      {/* Related Signal 2 */}
                      <button
                        onClick={() => onSelectArticleId?.('kaigene-taisho-japan-licensing')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          TERRITORIAL EXECUTION
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          Kaigene Transfers Japan Execution to Taisho
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>
                    </div>
                  </div>

                </div>
              </>
            ) : article.id === 'gsk-capability-led-opportunity-creation' ? (
              <>
                {/* Draft Badge & Category Breadcrumb */}
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-3">
                  <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase">
                    {article.category}
                  </span>
                  <span className="inline-block text-[10px] font-mono tracking-widest px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold uppercase">
                    DRAFT — READY FOR REVIEW
                  </span>
                </div>

                {/* 1. Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  GSK Buys an Earlier Position in Drug Discovery
                </h1>

                {/* 2. Subtitle */}
                <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold mb-6 sm:mb-8 font-medium">
                  The Relation collaboration moves business development upstream—from evaluating available assets to generating proprietary opportunities.
                </p>

                {/* 3. Metadata */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-3.5 mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Deal Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>July 30, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>2 minutes read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                    <span>Mechanism: Capability-Led Opportunity Creation</span>
                  </div>
                </div>

                {/* 4. PharmaSignal Take Box */}
                <div className={`my-8 p-6 sm:p-8 border-l-4 border-brand-gold ${
                  darkMode ? 'bg-brand-gold/10 text-white' : 'bg-brand-gold-light/25 text-brand-primary'
                }`}>
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    <Shield size={16} /> PHARMASIGNAL TAKE
                  </div>
                  <p className="font-serif text-base sm:text-lg leading-relaxed font-semibold mb-3 text-brand-gold">
                    This is a Capability-Led Opportunity Creation deal.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed mb-3 opacity-95">
                    Relation will generate biological datasets that may produce new drug targets for GSK.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 italic">
                    The BD question is who controls the opportunity after the evidence becomes valuable.
                  </p>
                </div>

                {/* 5. Hero Mechanism Image */}
                <div className="my-10 max-w-2xl mx-auto">
                  <CapabilityLedOpportunityDiagram darkMode={darkMode} />
                  <p className={`mt-3 text-center font-sans text-xs tracking-wide italic leading-normal ${
                    darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                  }`}>
                    Figure 1: Capability-Led Opportunity Creation — Relation capability generates proprietary evidence to power GSK opportunities.
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  
                  {/* 6. Deal Signal */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Deal Signal
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    GSK and Relation Therapeutics entered a research collaboration worth up to $110 million. Relation will generate large-scale datasets showing how human cells respond to genetic and drug interventions. Those datasets will train AI models, including Relation’s MORGAN platform, to identify potential drug targets. The agreement expands an existing relationship focused on fibrotic diseases and osteoarthritis.
                  </p>

                  {/* 7. Why It Matters */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why It Matters
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Most pharma BD teams enter after an asset exists. They evaluate a defined programme, compete with other buyers and negotiate against increasingly visible evidence.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    This agreement moves the relationship earlier. GSK is supporting a partner capability that may create proprietary opportunities before those opportunities become finished assets available to the wider market.
                  </p>

                  {/* 8. PharmaSignal Read */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    PharmaSignal Read
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    The mechanism is not AI alone. It is access to differentiated biological information.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    If Relation’s experimental system produces evidence that competitors cannot access, GSK may gain an earlier view of targets worth developing. That can reduce competitive pressure and improve the quality of opportunity selection.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    But early access is not the same as captured value. Target ownership, option rights, development responsibility and decision governance determine whether an information advantage becomes an economic advantage. Those terms were not disclosed.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    The critical handoff comes when discovery evidence becomes a development opportunity. Ambiguity at that point can create governance debt and allow value to leak between research success and asset control.
                  </p>

                  {/* 9. PharmaSignal Principle */}
                  <div className="my-10 p-8 sm:p-10 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <p className="font-serif text-lg sm:text-2xl leading-relaxed italic font-bold text-brand-gold">
                      "The strongest BD teams do not only find opportunities earlier. They design the rights needed to retain them."
                    </p>
                  </div>

                  {/* 10. Source (Exact specification) */}
                  <div className={`my-8 py-3.5 px-5 border-l-2 border-brand-gold/60 font-sans text-xs sm:text-sm ${
                    darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-charcoal/80'
                  }`}>
                    Source: <a 
                      href="https://www.reuters.com/business/healthcare-pharmaceuticals/gsk-relation-therapeutics-sign-up-110-million-ai-drug-discovery-deal-2026-07-30/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-gold font-bold underline hover:opacity-80 transition-opacity"
                    >
                      Reuters
                    </a>, July 30, 2026.
                  </div>

                  {/* 11. Related Signals */}
                  <div className={`my-12 p-6 sm:p-8 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      RELATED SIGNALS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Related Signal 1 */}
                      <button
                        onClick={() => onSelectArticleId?.('ems-mirecule-upstream-collaboration')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          OPPORTUNITY CREATION
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          EMS Moves Upstream Before There Is a Product to License
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>

                      {/* Related Signal 2 */}
                      <button
                        onClick={() => onSelectArticleId?.('innovent-spero-ex-china-execution-transfer')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          TERRITORY-TO-EXECUTION TRANSFER
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          Innovent Transfers SP001 Execution Outside Greater China
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>
                    </div>
                  </div>

                </div>
              </>
            ) : article.id === 'sk-biopharm-biohaven-epilepsy-platform' ? (
              <>
                {/* Draft Badge & Category Breadcrumb */}
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-3">
                  <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase">
                    {article.category}
                  </span>
                  <span className="inline-block text-[10px] font-mono tracking-widest px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold uppercase">
                    DRAFT — READY FOR REVIEW
                  </span>
                </div>

                {/* 1. Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  SK Biopharm Buys Worldwide Epilepsy Platform for $400M Near-Term
                </h1>

                {/* 2. Subtitle */}
                <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold mb-6 sm:mb-8 font-medium">
                  By leveraging its existing specialist commercial infrastructure, an Asian pharma company acquires global innovation rights rather than a regional territory license.
                </p>

                {/* 3. Metadata */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-3.5 mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Deal Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>August 26, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>3 minutes read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                    <span>Mechanism: Commercial Infrastructure as Acquisition Advantage</span>
                  </div>
                </div>

                {/* 4. PharmaSignal Take Box */}
                <div className={`my-8 p-6 sm:p-8 border-l-4 border-brand-gold ${
                  darkMode ? 'bg-brand-gold/10 text-white' : 'bg-brand-gold-light/25 text-brand-primary'
                }`}>
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    <Shield size={16} /> PHARMASIGNAL TAKE
                  </div>
                  <p className="font-serif text-base sm:text-lg leading-relaxed font-semibold mb-3 text-brand-gold">
                    This is a Commercial Infrastructure as Acquisition Advantage transaction.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed mb-3 opacity-95">
                    SK Biopharmaceuticals is deploying its established XCOPRI commercial engine to acquire worldwide rights to Biohaven’s entire Kv7 platform.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 italic">
                    The BD lesson is that specialist commercial infrastructure lowers incremental launch cost, creating valuation leverage to outbid traditional acquirers.
                  </p>
                </div>

                {/* 5. Hero Mechanism Image */}
                <div className="my-10 max-w-2xl mx-auto">
                  <SKBiopharmBiohavenDiagram darkMode={darkMode} />
                  <p className={`mt-3 text-center font-sans text-xs tracking-wide italic leading-normal ${
                    darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                  }`}>
                    Figure 1: Commercial Infrastructure as Acquisition Advantage — Pre-existing commercial infrastructure enables global platform acquisition ahead of pivotal validation.
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  
                  {/* 6. Deal Signal */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Deal Signal
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    On 26 August 2026, South Korea’s SK Biopharmaceuticals agreed to acquire an exclusive worldwide license to Biohaven’s Kv7 ion-channel platform, led by Phase II/III epilepsy asset opakalim (BHV-7000). Biohaven will receive $350 million at closing plus $50 million in 2027, with total platform-related payments potentially reaching $795 million, plus tiered royalties. SK will also assume future programme development costs and certain legacy obligations. Opakalim remains ahead of pivotal readout, with RISE3 trial results expected in H2 2026.
                  </p>

                  {/* 7. Why It Matters */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why It Matters
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    This transaction signals a structural shift beyond conventional regional in-licensing. Historically, Asian pharma companies acquired regional territories (such as Korea or Asia-Pacific) for late-stage Western assets.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    SK has already built a global commercial epilepsy franchise around cenobamate (XCOPRI). Rather than acquiring another regional license, it is using that existing commercial and regulatory infrastructure to take worldwide ownership of an entire therapeutic mechanism ahead of pivotal validation.
                  </p>

                  {/* 8. PharmaSignal Read */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    PharmaSignal Read
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    The competitive landscape for innovative assets is expanding beyond US and European Big Pharma. Asian companies with established specialist capabilities can now compete directly for global rights.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    SK can justify the economics because its pre-existing epilepsy infrastructure removes the need to build a new commercial organization from scratch. The acquisition bundles asset NPV, franchise adjacency, existing salesforce synergy and long-term platform optionality.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    Once a specialist acquirer buys a global platform, regional carve-outs for emerging markets may never reach the secondary market.
                  </p>

                  {/* 9. PharmaSignal Principle */}
                  <div className="my-10 p-8 sm:p-10 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <p className="font-serif text-lg sm:text-2xl leading-relaxed italic font-bold text-brand-gold">
                      "Commercial infrastructure is not merely a launch capability. Once established, it becomes an acquisition advantage."
                    </p>
                  </div>

                  {/* 10. Source */}
                  <div className={`my-8 py-3.5 px-5 border-l-2 border-brand-gold/60 font-sans text-xs sm:text-sm ${
                    darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-charcoal/80'
                  }`}>
                    Source: <a 
                      href="https://ir.biohaven.com/news-releases/news-release-details/biohaven-and-sk-biopharmaceuticals-enter-strategic-global" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-gold font-bold underline hover:opacity-80 transition-opacity"
                    >
                      Biohaven Investor Relations
                    </a>, August 26, 2026.
                  </div>

                  {/* 11. Related Signals */}
                  <div className={`my-12 p-6 sm:p-8 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      RELATED SIGNALS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => onSelectArticleId?.('gsk-capability-led-opportunity-creation')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          OPPORTUNITY CREATION
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          GSK Buys an Earlier Position in Drug Discovery
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>

                      <button
                        onClick={() => onSelectArticleId?.('innovent-spero-ex-china-execution-transfer')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          TERRITORY-TO-EXECUTION TRANSFER
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          Innovent Transfers SP001 Execution Outside Greater China
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>
                    </div>
                  </div>

                </div>
              </>
            ) : article.id === 'aurigene-dr-reddys-tech-transfer-architecture' ? (
              <>
                {/* Draft Badge & Category Breadcrumb */}
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-3">
                  <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase">
                    {article.category}
                  </span>
                  <span className="inline-block text-[10px] font-mono tracking-widest px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold uppercase">
                    DRAFT — READY FOR REVIEW
                  </span>
                </div>

                {/* 1. Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  Aurigene Converts Tech Transfer into Long-Term Portfolio Architecture
                </h1>

                {/* 2. Subtitle */}
                <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold mb-6 sm:mb-8 font-medium">
                  A 20+ product manufacturing transfer to Dr. Reddy’s subsidiary shifts Indian CDMO capability from contract services to structural portfolio partnership.
                </p>

                {/* 3. Metadata */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-3.5 mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Deal Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>August 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>3 minutes read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                    <span>Mechanism: Tech-Transfer as Portfolio Architecture</span>
                  </div>
                </div>

                {/* 4. PharmaSignal Take Box */}
                <div className={`my-8 p-6 sm:p-8 border-l-4 border-brand-gold ${
                  darkMode ? 'bg-brand-gold/10 text-white' : 'bg-brand-gold-light/25 text-brand-primary'
                }`}>
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    <Shield size={16} /> PHARMASIGNAL TAKE
                  </div>
                  <p className="font-serif text-base sm:text-lg leading-relaxed font-semibold mb-3 text-brand-gold">
                    This is a Tech-Transfer as Portfolio Architecture partnership.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed mb-3 opacity-95">
                    Aurigene (Dr. Reddy’s) assumed end-to-end transfer, scale-up and commercial supply for over 20 global products across sterile injectables, biologics and topicals.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 italic">
                    The BD question is how controlling the technical transfer pathway establishes multi-year switching costs and portfolio retention.
                  </p>
                </div>

                {/* 5. Hero Mechanism Image */}
                <div className="my-10 max-w-2xl mx-auto">
                  <AurigeneTechTransferDiagram darkMode={darkMode} />
                  <p className={`mt-3 text-center font-sans text-xs tracking-wide italic leading-normal ${
                    darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                  }`}>
                    Figure 1: Tech-Transfer as Portfolio Architecture — Multi-product transfer integration creates long-duration technical dependence and switching barriers.
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  
                  {/* 6. Deal Signal */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Deal Signal
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    Aurigene Pharmaceutical Services, a subsidiary of Dr. Reddy’s Laboratories, entered a long-term commercial partnership with an undisclosed global pharmaceutical company covering more than 20 commercial products across sterile injectables, biologics and topicals. The programme encompasses technology transfer, process development, scale-up, analytical validation and long-term commercial supply for the US, Europe, Canada and emerging markets. Product transfers will occur over a two-to-three-year window, with commercial revenue expected to commence in 2028 and peak volume reaching approximately 18 million units annually (predominantly injectables).
                  </p>

                  {/* 7. Why It Matters */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why It Matters
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    This agreement extends beyond conventional contract manufacturing. Transferring 20+ commercial products to a single Indian manufacturing partner establishes long-duration technical dependence, multi-market regulatory integration, validated infrastructure and high operational switching costs once site transfers are complete.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    It highlights how Indian pharma companies can actively participate in global portfolio restructuring and divestment programs through tech-transfer capability rather than pure brand licensing.
                  </p>

                  {/* 8. PharmaSignal Read */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    PharmaSignal Read
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    In mature brand divestments and site rationalization, manufacturing execution often dictates commercial viability.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    A partner offering an integrated package—commercial rights, alternate-site transfer, cost rationalization and multi-jurisdiction regulatory maintenance—can capture substantially more economic value than a bidder seeking brand rights alone.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    Controlling the technical transfer pathway creates durable pricing power and lifecycle management leverage across complex injectables and mature multinational portfolios.
                  </p>

                  {/* 9. PharmaSignal Principle */}
                  <div className="my-10 p-8 sm:p-10 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <p className="font-serif text-lg sm:text-2xl leading-relaxed italic font-bold text-brand-gold">
                      "The party that controls the transfer pathway can sometimes capture more value than the party that merely owns the commercial rights."
                    </p>
                  </div>

                  {/* 10. Source */}
                  <div className={`my-8 py-3.5 px-5 border-l-2 border-brand-gold/60 font-sans text-xs sm:text-sm ${
                    darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-charcoal/80'
                  }`}>
                    Source: <a 
                      href="https://www.biospectrumindia.com/news/109/28380/aurigene-announces-manufacturing-and-supply-partnership-with-global-pharma-company.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-gold font-bold underline hover:opacity-80 transition-opacity"
                    >
                      BioSpectrum India
                    </a>, August 2026.
                  </div>

                  {/* 11. Related Signals */}
                  <div className={`my-12 p-6 sm:p-8 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      RELATED SIGNALS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => onSelectArticleId?.('merck-alimatravir-market-access')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          MARKET ACCESS BEFORE APPROVAL
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          Merck Is Building Market Access Before Alimatravir Is Approved
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>

                      <button
                        onClick={() => onSelectArticleId?.('innovent-spero-ex-china-execution-transfer')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          TERRITORY-TO-EXECUTION TRANSFER
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          Innovent Transfers SP001 Execution Outside Greater China
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Signal <ArrowRight size={10} />
                        </div>
                      </button>
                    </div>
                  </div>

                </div>
              </>
            ) : article.id === 'bms-terminates-cellares-manufacturing-scale-deficit' ? (
              <>
                {/* Draft Badge & Category Breadcrumb */}
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-3">
                  <span className="inline-block text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase">
                    {article.category}
                  </span>
                  <span className="inline-block text-[10px] font-mono tracking-widest px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold uppercase">
                    DRAFT — READY FOR REVIEW
                  </span>
                </div>

                {/* 1. Title */}
                <h1 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 sm:mb-4 ${
                  darkMode ? 'text-white' : 'text-brand-primary'
                }`}>
                  BMS Ends $380M Cellares Deal as Scale-Up Fails Commercial Test
                </h1>

                {/* 2. Subtitle */}
                <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-brand-gold mb-6 sm:mb-8 font-medium">
                  The termination of automated CAR-T manufacturing underscores the critical divide between clinical-scale feasibility and commercial-scale execution.
                </p>

                {/* 3. Metadata */}
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-3.5 mb-8 text-[11px] sm:text-xs font-mono ${
                  darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-gold" />
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>PharmaSignal Deal Desk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>August 25, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>2 minutes read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                    <span>Mechanism: Clinical vs. Commercial Scale Constraint</span>
                  </div>
                </div>

                {/* 4. PharmaSignal Take Box */}
                <div className={`my-8 p-6 sm:p-8 border-l-4 border-brand-gold ${
                  darkMode ? 'bg-brand-gold/10 text-white' : 'bg-brand-gold-light/25 text-brand-primary'
                }`}>
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    <Shield size={16} /> PHARMASIGNAL TAKE
                  </div>
                  <p className="font-serif text-base sm:text-lg leading-relaxed font-semibold mb-3 text-brand-gold">
                    This is a Clinical vs. Commercial Scale Constraint event.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed mb-3 opacity-95">
                    Bristol Myers Squibb terminated its $380 million partnership with Cellares for automated Breyanzi cell therapy manufacturing.
                  </p>
                  <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 italic">
                    The BD lesson is that platforms operating under clinical GMP can still fail the throughput, cost and reliability standards demanded at commercial scale.
                  </p>
                </div>

                {/* 5. Hero Mechanism Image */}
                <div className="my-10 max-w-2xl mx-auto">
                  <BMSCellaresScaleDiagram darkMode={darkMode} />
                  <p className={`mt-3 text-center font-sans text-xs tracking-wide italic leading-normal ${
                    darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                  }`}>
                    Figure 1: Clinical vs. Commercial Scale Constraint — Platform validation failure under commercial volume stress leads to alliance termination.
                  </p>
                </div>

                {/* Main Article Sections */}
                <div className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}>
                  
                  {/* 6. Deal Signal */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Deal Signal
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    On 25 August 2026, Bristol Myers Squibb terminated its manufacturing collaboration with cell therapy technology developer Cellares. The agreement, originally valued at up to $380 million, was structured to evaluate and implement Cellares’ automated "Cell Shuttle" platform for commercial manufacturing of BMS’s CAR-T therapy Breyanzi. BMS concluded that the automated platform could not meet its commercial-scale throughput, reliability and operating requirements.
                  </p>

                  {/* 7. Why It Matters */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    Why It Matters
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Advanced therapy collaborations frequently generate high upfront enthusiasm around automated manufacturing platforms.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    However, operating under clinical-grade GMP and producing early-phase clinical batches is a fundamentally different hurdle from delivering continuous, cost-effective, high-throughput commercial batches. When scale-up constraints emerge late in an alliance, the result is contract termination and substantial rework.
                  </p>

                  {/* 8. PharmaSignal Read */}
                  <h2 className={`font-serif text-2xl sm:text-3xl font-bold mb-4 mt-10 tracking-tight ${
                    darkMode ? 'text-white' : 'text-brand-primary'
                  }`}>
                    PharmaSignal Read
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Manufacturing diligence often focuses on clinical feasibility—whether the platform works in controlled settings.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Commercial diligence requires testing throughput limits, failure rates under volume stress, cost per commercial dose, and the availability of independent secondary supply.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    For complex modalities (CAR-T, ADCs, peptides and biosimilars), manufacturing constraints can quickly create an Execution Deficit that destroys commercial value after deal signing.
                  </p>

                  {/* 9. PharmaSignal Principle */}
                  <div className="my-10 p-8 sm:p-10 bg-[#071A2E] text-white border-l-4 border-brand-gold relative overflow-hidden shadow-xl">
                    <div className="text-brand-gold font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                      PHARMASIGNAL PRINCIPLE
                    </div>
                    <p className="font-serif text-lg sm:text-2xl leading-relaxed italic font-bold text-brand-gold">
                      "Manufacturing risk often appears solved at clinical scale—until commercial demand exposes the constraint."
                    </p>
                  </div>

                  {/* 10. Source */}
                  <div className={`my-8 py-3.5 px-5 border-l-2 border-brand-gold/60 font-sans text-xs sm:text-sm ${
                    darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-charcoal/80'
                  }`}>
                    Source: <a 
                      href="https://www.reuters.com/legal/litigation/bristol-myers-ends-blood-cancer-drug-deal-with-cell-therapy-maker-cellares-2026-08-25/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-gold font-bold underline hover:opacity-80 transition-opacity"
                    >
                      Reuters
                    </a>, August 25, 2026.
                  </div>

                  {/* 11. Related Signals */}
                  <div className={`my-12 p-6 sm:p-8 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      RELATED SIGNALS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => onSelectArticleId?.('execution-deficit')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          CORE LENS
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          A Signed Deal Is Not an Executed Deal
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Explainer <ArrowRight size={10} />
                        </div>
                      </button>

                      <button
                        onClick={() => onSelectArticleId?.('the-approval-gap')}
                        className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                          darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1 font-bold">
                          DECISION INTELLIGENCE
                        </span>
                        <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-brand-primary'
                        }`}>
                          The Approval Gap
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                          Read Explainer <ArrowRight size={10} />
                        </div>
                      </button>
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
                <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-8 border-y py-2 sm:py-4 mb-4 sm:mb-6 text-[11px] sm:text-xs font-mono ${
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

                {/* Article Thumbnail Image if available */}
                {article.imageUrl && (
                  <div className="my-6 w-full overflow-hidden border border-brand-gold/30 rounded-none bg-brand-deep">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-[420px]"
                    />
                  </div>
                )}

                {/* Featured Summary */}
                {article.featuredSummary && (
                  <p id="doc-overview" className={`font-serif text-base sm:text-xl italic border-l-4 border-brand-gold pl-4 sm:pl-6 py-1.5 sm:py-2 mb-6 sm:mb-8 leading-relaxed p-3 sm:p-4 ${
                    darkMode ? 'bg-white/5 text-white/90' : 'bg-brand-gold-light/25 text-brand-primary/85'
                  }`}>
                    {article.featuredSummary}
                  </p>
                )}

                {/* PharmaSignal Read Callout */}
                {article.pharmaSignalRead && (
                  <div className={`my-6 p-5 sm:p-6 border-l-4 border-brand-gold font-serif text-sm sm:text-base leading-relaxed ${
                    darkMode ? 'bg-brand-gold/10 text-brand-gold-light' : 'bg-brand-gold-light/25 text-brand-primary'
                  }`}>
                    <strong className="font-sans text-xs tracking-widest text-brand-gold uppercase block mb-2 font-bold">
                      PHARMASIGNAL READ
                    </strong>
                    {article.pharmaSignalRead}
                  </div>
                )}

                {/* Use This When Callout Box */}
                {article.useThisWhen && (
                  <div className={`my-8 p-6 border rounded-none text-left ${
                    darkMode ? 'border-brand-gold/40 bg-[#061526] text-white' : 'border-brand-gold/60 bg-[#FAF6EE] text-brand-primary'
                  }`}>
                    <div className="flex items-center gap-2 text-brand-gold font-mono text-xs font-bold tracking-widest uppercase mb-2">
                      <Shield size={16} /> USE THIS WHEN
                    </div>
                    <p className="font-serif text-sm sm:text-base leading-relaxed opacity-95">
                      {article.useThisWhen}
                    </p>
                  </div>
                )}

                {/* Content markup container */}
                <div 
                  id="core-analysis"
                  className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Linked Explainers Section */}
                {article.linkedExplainers && article.linkedExplainers.length > 0 && (
                  <div className={`my-10 p-6 border-t border-b ${
                    darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-brand-charcoal/10 bg-brand-gold-light/10'
                  }`}>
                    <span className="font-mono text-xs tracking-widest text-brand-gold uppercase font-bold block mb-4">
                      {article.isDealSignal ? 'LINKED PHARMASIGNAL LENS' : 'LINKED EXPLAINERS'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {article.linkedExplainers.map((linked) => (
                        <button
                          key={linked.id}
                          onClick={() => {
                            if (onSelectArticleId) {
                              onSelectArticleId(linked.id);
                            }
                          }}
                          className={`p-4 border text-left transition-all hover:border-brand-gold group cursor-pointer ${
                            darkMode ? 'border-white/10 bg-brand-deep hover:bg-white/5' : 'border-brand-charcoal/10 bg-white hover:bg-brand-offwhite'
                          }`}
                        >
                          <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block mb-1">
                            Explainer
                          </span>
                          <p className={`font-serif text-sm font-bold group-hover:text-brand-gold transition-colors line-clamp-2 ${
                            darkMode ? 'text-white' : 'text-brand-primary'
                          }`}>
                            {linked.title}
                          </p>
                          <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-brand-gold tracking-wider uppercase">
                            Read Explainer <ArrowRight size={10} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="my-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider ${
                        darkMode ? 'bg-white/10 text-white/80' : 'bg-brand-primary/10 text-brand-primary'
                      }`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Source Note */}
                {article.sourceNote && (
                  <p className={`text-xs font-mono italic my-4 ${darkMode ? 'text-white/50' : 'text-brand-charcoal/50'}`}>
                    {article.sourceNote}
                  </p>
                )}
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

      {/* LinkedIn Carousel Exporter Modal */}
      {article.isDealSignal && (
        <LinkedInCarouselModal 
          article={article}
          isOpen={carouselOpen}
          onClose={() => setCarouselOpen(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
