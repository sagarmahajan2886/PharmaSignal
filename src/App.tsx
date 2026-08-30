import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Rss,
  CheckCircle2,
  Clock,
  FileText,
  Radio,
  Compass,
  Activity,
  Layers,
  Shield,
  Target,
  Users,
  Sparkles,
  Filter,
  ExternalLink
} from 'lucide-react';

import { EXPLAINERS_DATA, DEAL_SIGNALS_DATA, ALL_ARTICLES } from './articlesData';
import { ActiveTab, Article } from './types';
import Navigation from './components/Navigation';
import ArticleModal from './components/ArticleModal';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import ApprovalGapDiagram from './components/ApprovalGapDiagram';
import HeroMechanismDiagram from './components/HeroMechanismDiagram';
import LensesPage from './components/LensesPage';
import LinkedInCarouselModal from './components/LinkedInCarouselModal';

// Import assets
// @ts-ignore
import executionDeficitImg from './assets/images/execution_deficit_diagram_new_1782370523380.jpg';

export type DealCategoryFilter = 
  | 'ALL' 
  | 'COMMERCIAL_ARCHITECTURE' 
  | 'NEWCO_CREATION' 
  | 'UPSTREAM_DISCOVERY'
  | 'OPPORTUNITY_CREATION' 
  | 'TERRITORIAL_ARCHITECTURE' 
  | 'COMMERCIAL_SCALE' 
  | 'OPTIONS_ACCESS';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedDealCategory, setSelectedDealCategory] = useState<string>('ALL');
  const [carouselArticle, setCarouselArticle] = useState<Article | null>(null);
  
  // Policy Modal state
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>('privacy');

  const [newsEmail, setNewsEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pharmasignal_darkmode');
    return saved === null ? true : saved === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('pharmasignal_darkmode', String(next));
      return next;
    });
  };

  const openPolicy = (tab: PolicyTab) => {
    setPolicyTab(tab);
    setPolicyModalOpen(true);
    window.history.pushState(null, '', `?policy=${tab}`);
  };

  const closePolicy = () => {
    setPolicyModalOpen(false);
    if (selectedArticle) {
      const prefix = selectedArticle.isDealSignal ? '/deal-signals' : '/explainers';
      window.history.pushState(null, '', `${prefix}/${selectedArticle.id}`);
    } else if (activeTab === 'DEAL SIGNALS') {
      window.history.pushState(null, '', '/deal-signals');
    } else if (activeTab === 'LENSES') {
      window.history.pushState(null, '', '/lenses');
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  // Safe article lookups
  const approvalGapArticle = EXPLAINERS_DATA.find(a => a.id === 'the-approval-gap') || EXPLAINERS_DATA[0];
  const executionDeficitArticle = EXPLAINERS_DATA.find(a => a.id === 'execution-deficit') || EXPLAINERS_DATA[1];
  const opportunityCreationArticle = EXPLAINERS_DATA.find(a => a.id === 'opportunity-creation-processing') || EXPLAINERS_DATA[2];

  // Custom routing functions to support clean, deep-linked browser URLs for articles & pages
  const openArticle = (art: Article) => {
    setSelectedArticle(art);
    const prefix = art.isDealSignal ? '/deal-signals' : '/explainers';
    window.history.pushState(null, '', `${prefix}/${art.id}`);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    if (activeTab === 'DEAL SIGNALS' || window.location.pathname.startsWith('/deal-signals')) {
      window.history.pushState(null, '', '/deal-signals');
    } else if (activeTab === 'LENSES' || window.location.pathname.startsWith('/lenses')) {
      window.history.pushState(null, '', '/lenses');
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  // URL Deep-linking Route Handler (supports pathname, query params ?deal=/?article=/?policy=, and hash)
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      // 0. Check Policy Query Parameters (e.g. ?policy=privacy | terms | editorial | cookies)
      const queryPolicy = searchParams.get('policy');
      if (queryPolicy && ['privacy', 'terms', 'editorial', 'cookies'].includes(queryPolicy)) {
        setPolicyTab(queryPolicy as PolicyTab);
        setPolicyModalOpen(true);
      }

      // 1. Check Query Parameters (e.g. ?deal=... or ?article=... or ?explainer=...)
      const queryArticleId = searchParams.get('deal') || searchParams.get('article') || searchParams.get('explainer') || searchParams.get('id');
      if (queryArticleId) {
        const found = ALL_ARTICLES.find(a => a.id === queryArticleId);
        if (found) {
          setSelectedArticle(found);
          setActiveTab(found.isDealSignal ? 'DEAL SIGNALS' : 'EXPLAINERS');
          return;
        }
      }

      // 2. Check Hash Routing (e.g. #/deal-signals/..., #/explainers/..., #deal=...)
      if (hash) {
        const cleanHash = hash.replace(/^#\/?/, '');
        const hashMatch = cleanHash.match(/^(?:deal-signals|explainers|article)\/([a-zA-Z0-9_-]+)/);
        if (hashMatch) {
          const found = ALL_ARTICLES.find(a => a.id === hashMatch[1]);
          if (found) {
            setSelectedArticle(found);
            setActiveTab(found.isDealSignal ? 'DEAL SIGNALS' : 'EXPLAINERS');
            return;
          }
        }
      }

      // 3. Check Standard Path Routing
      if (path === '/deal-signals') {
        setActiveTab('DEAL SIGNALS');
        setSelectedArticle(null);
        return;
      }

      if (path === '/lenses' || path.startsWith('/lenses')) {
        setActiveTab('LENSES');
        setSelectedArticle(null);
        return;
      }

      const explainerMatch = path.match(/^\/explainers\/([a-zA-Z0-9_-]+)/);
      if (explainerMatch) {
        const articleId = explainerMatch[1];
        const found = ALL_ARTICLES.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          setActiveTab('EXPLAINERS');
          return;
        }
      }

      const dealMatch = path.match(/^\/deal-signals\/([a-zA-Z0-9_-]+)/);
      if (dealMatch) {
        const articleId = dealMatch[1];
        const found = ALL_ARTICLES.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          setActiveTab('DEAL SIGNALS');
          return;
        }
      }

      if (path === '/' || path === '') {
        setActiveTab('HOME');
      }

      setSelectedArticle(null);
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  // Smooth scroll helpers
  const scrollToSection = (id: string) => {
    if (activeTab !== 'HOME') {
      setActiveTab('HOME');
      window.history.pushState(null, '', '/');
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Subscribe Handler
  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const emailToSubmit = newsEmail.trim();
    if (!emailToSubmit || !emailToSubmit.includes('@')) {
      setSubscribeError('Please enter a valid work email address.');
      return;
    }
    
    setSubscribing(true);
    setSubscribeError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed.');
      }

      // Backup local persistence
      const currentSubscribers = JSON.parse(localStorage.getItem('pharmasignal_subscribers') || '[]');
      const newSub = { email: emailToSubmit, timestamp: new Date().toISOString() };
      localStorage.setItem('pharmasignal_subscribers', JSON.stringify([...currentSubscribers, newSub]));
      
      setNewsEmail('');
      setSubscribedMessage(true);
      
      setTimeout(() => {
        setSubscribedMessage(false);
      }, 8000);
    } catch (err) {
      console.error(err);
      setSubscribeError('Could not process subscription. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-gold selection:text-brand-primary transition-colors duration-300 ${
      darkMode ? 'bg-brand-deep text-white' : 'bg-[#FAF6EE] text-[#111827]'
    }`}>
      
      {/* 1. Header / Navigation */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSubscribeClick={() => scrollToSection('subscribe-section')}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Router */}
      {activeTab === 'LENSES' ? (
        /* Dedicated /lenses Page */
        <LensesPage 
          darkMode={darkMode} 
          openArticle={openArticle}
          explainers={EXPLAINERS_DATA}
          dealSignals={DEAL_SIGNALS_DATA}
        />
      ) : activeTab === 'DEAL SIGNALS' ? (
        /* Dedicated Deal Signals Listing View */
        <section 
          id="deal-signals-page"
          className={`py-14 sm:py-20 transition-colors duration-300 border-b ${
            darkMode ? 'bg-[#061526] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-12">
              <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                EMPIRICAL EVIDENCE
              </span>
              <h1 className={`font-serif text-3.5xl sm:text-5xl font-bold tracking-tight uppercase mb-4 ${
                darkMode ? 'text-white' : 'text-[#001B2A]'
              }`}>
                Deal Signals
              </h1>
              <div className="h-[2px] w-12 bg-brand-gold mt-2 mb-4" />
              <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
              }`}>
                A PharmaSignal filter on pharma BD deals, partnerships and licensing activity — focused on what each deal reveals about execution, market access, partner capability and value creation.
              </p>
            </div>

            {/* Grid displaying ALL Deal Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {DEAL_SIGNALS_DATA.map((deal) => (
                <div 
                  key={deal.id}
                  className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div className="p-6 sm:p-7 pb-4">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2.5 py-1 border border-brand-gold/30 bg-brand-gold/10">
                        {deal.category}
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold/80 tracking-wider">
                        {deal.date}
                      </span>
                    </div>
                    
                    <h2 
                      onClick={() => openArticle(deal)}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight hover:text-brand-gold cursor-pointer transition-colors leading-snug ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      {deal.shortTitle || deal.title}
                    </h2>
                  </div>

                  {deal.imageUrl && (
                    <div 
                      className="w-full aspect-[16/9] overflow-hidden bg-brand-deep border-y border-brand-gold/20 relative group cursor-pointer" 
                      onClick={() => openArticle(deal)}
                    >
                      <img 
                        src={deal.imageUrl} 
                        alt={deal.shortTitle || deal.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2E]/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-2.5 right-2.5 bg-[#061426]/90 border border-brand-gold/40 px-2 py-0.5 text-[8px] font-mono font-bold tracking-widest text-brand-gold uppercase">
                        EDITORIAL DIAGRAM
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {(deal.tags || ['Licensing', 'Commercialization']).slice(0, 3).map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className={`text-[9px] font-mono tracking-wider font-medium px-2 py-0.5 border ${
                              darkMode 
                                ? 'bg-white/[0.04] text-white/70 border-white/10' 
                                : 'bg-brand-gold/5 text-brand-charcoal/80 border-[#EADBCC]'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Summary in smaller font */}
                      <p className={`font-sans text-xs sm:text-[13px] leading-relaxed mb-4 ${
                        darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                      }`}>
                        {deal.featuredSummary || deal.description}
                      </p>

                      {deal.pharmaSignalRead && (
                        <div className={`p-3.5 border-l-2 border-brand-gold text-xs font-serif leading-relaxed mb-4 ${
                          darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-primary/90'
                        }`}>
                          <strong className="font-mono text-[9px] uppercase text-brand-gold tracking-widest block mb-1">
                            Signal Mechanism
                          </strong>
                          {deal.pharmaSignalRead}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-brand-gold/10 flex flex-wrap items-center justify-between gap-3 mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                          <Clock size={12} strokeWidth={2.5} /> {deal.readTime}
                        </span>
                        <button
                          onClick={() => setCarouselArticle(deal)}
                          className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                          title="Export LinkedIn Carousel"
                        >
                          <Linkedin size={11} fill="currentColor" />
                          <span>Carousel</span>
                        </button>
                      </div>
                      <button
                        onClick={() => openArticle(deal)}
                        className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        Read Deal Signal <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Executive Intelligence Homepage Layout */
        <>
          {/* SECTION 2 — HERO */}
          <section 
            id="about-section"
            className={`relative overflow-hidden py-12 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-brand-deep border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
            }`}
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Core Positioning Copy */}
                <div className="lg:col-span-7 flex flex-col items-start text-left order-1 w-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <div className="h-[1px] w-6 bg-brand-gold" />
                    <span className="font-mono text-xs tracking-widest text-brand-gold font-bold uppercase">
                      DECISION INTELLIGENCE FOR PHARMA BD
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}
                  >
                    How Pharma Deals Really Work
                  </motion.h1>
                  <div className="h-[2px] w-12 bg-brand-gold mb-5" />

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed mb-4 ${
                      darkMode ? 'text-white/90' : 'text-brand-charcoal'
                    }`}
                  >
                    PharmaSignal studies the mechanisms that create, delay, protect or destroy value in pharmaceutical business development.
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className={`font-sans text-sm sm:text-base leading-relaxed mb-8 max-w-2xl ${
                      darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
                    }`}
                  >
                    Built for BD, licensing, alliance, portfolio and market access leaders who need better judgment before, during and after the deal.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                  >
                    <button
                      onClick={() => scrollToSection('featured-explainer-section')}
                      className="w-full sm:w-auto px-7 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer rounded-none shadow-lg"
                    >
                      Start with the Explainers <ArrowRight size={14} />
                    </button>
                    
                    <button
                      onClick={() => scrollToSection('deal-signals-section')}
                      className={`w-full sm:w-auto px-7 py-4 bg-transparent font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-none border ${
                        darkMode 
                          ? 'border-white/30 text-white hover:bg-white hover:text-brand-primary hover:border-white' 
                          : 'border-[#001B2A]/30 text-brand-primary hover:bg-[#001B2A] hover:text-white hover:border-[#001B2A]'
                      }`}
                    >
                      View Deal Signals <ArrowRight size={14} />
                    </button>
                  </motion.div>
                </div>

                {/* Right Column: PharmaSignal Mechanism Visual */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5 relative w-full h-[300px] sm:h-[340px] lg:h-[380px] order-2"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <HeroMechanismDiagram darkMode={darkMode} />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* SECTION 3 — ORIENTATION STRIP */}
          <section 
            id="start-here"
            className={`py-5 sm:py-6 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061322] border-white/5' : 'bg-[#F4EFE6] border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                    EVIDENCE DATABASE
                  </span>
                  <div className="h-[1px] w-6 bg-brand-gold/40" />
                  <span className={`text-xs font-mono ${darkMode ? 'text-white/60' : 'text-brand-charcoal/70'}`}>
                    {DEAL_SIGNALS_DATA.length} Empirical Deal Signals Analyzed • 100% Sourced from Disclosures
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-wider text-brand-gold">
                  <button 
                    onClick={() => {
                      setActiveTab('DEAL SIGNALS');
                      window.history.pushState(null, '', '/deal-signals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Radio size={13} /> All Signals →
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('LENSES');
                      window.history.pushState(null, '', '/lenses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Compass size={13} /> 6 Mechanism Lenses →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 — DEAL SIGNALS (PRIMARY EVIDENCE ENGINE) */}
          <section 
            id="deal-signals-section"
            className={`py-12 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061426] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                <div className="text-left max-w-3xl">
                  <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                    CORE EMPIRICAL INTELLIGENCE · {DEAL_SIGNALS_DATA.length} DEALS ANALYZED
                  </span>
                  <h2 className={`font-serif text-3xl sm:text-4.5xl font-bold tracking-tight uppercase mb-3 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    Deal Signals
                  </h2>
                  <div className="h-[2px] w-12 bg-brand-gold mb-3" />
                  <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                    darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
                  }`}>
                    Biopharma transactions deconstructed through the exact structural mechanisms that create or destroy enterprise value.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('DEAL SIGNALS');
                      window.history.pushState(null, '', '/deal-signals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-sans tracking-widest font-bold text-brand-gold hover:text-white uppercase transition-colors flex items-center gap-2 cursor-pointer border border-brand-gold/30 hover:border-brand-gold px-4 py-3 bg-brand-gold/5"
                  >
                    All {DEAL_SIGNALS_DATA.length} Signals Archive <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Deal Signals Card Grid: 4 Neatly Laid Tiles of Most Recent Deal Signals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch text-left">
                {[...DEAL_SIGNALS_DATA]
                  .sort((a, b) => {
                    const parseDate = (d?: string) => {
                      if (!d) return 0;
                      const ts = Date.parse(d);
                      if (!isNaN(ts)) return ts;
                      const parts = d.split(' ');
                      if (parts.length === 2) {
                        return Date.parse(`${parts[0]} 1, ${parts[1]}`);
                      }
                      return 0;
                    };
                    return parseDate(b.date) - parseDate(a.date);
                  })
                  .slice(0, 4)
                  .map((deal) => (
                    <div 
                      key={deal.id}
                      className={`border transition-all duration-300 flex flex-col justify-between rounded-none overflow-hidden group shadow-lg ${
                        darkMode 
                          ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/60' 
                          : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                      }`}
                    >
                      <div className="p-5 sm:p-6 pb-4">
                        {/* 1. Date and Category Tag */}
                        <div className="flex items-center justify-between gap-3 mb-2.5">
                          <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                            {deal.category || 'DEAL SIGNAL'}
                          </span>
                          <span className="text-[10px] font-mono text-brand-gold/80 tracking-wider font-semibold">
                            {deal.date?.toUpperCase()}
                          </span>
                        </div>

                        {/* 1. Heading */}
                        <h3 
                          onClick={() => openArticle(deal)}
                          className={`font-serif text-lg sm:text-xl font-bold tracking-tight hover:text-brand-gold cursor-pointer transition-colors leading-snug ${
                            darkMode ? 'text-white' : 'text-[#001B2A]'
                          }`}
                        >
                          {deal.title}
                        </h3>
                      </div>

                      {/* 2. Editorial Diagram / Image */}
                      {deal.imageUrl && (
                        <div 
                          onClick={() => openArticle(deal)}
                          className="w-full aspect-[16/9] bg-[#051424] overflow-hidden cursor-pointer border-y border-brand-gold/20 relative"
                        >
                          <img 
                            src={deal.imageUrl} 
                            alt={deal.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500" 
                          />
                          <div className="absolute top-2.5 right-2.5 bg-[#061426]/90 border border-brand-gold/40 px-2 py-0.5 text-[8px] font-mono font-bold tracking-widest text-brand-gold uppercase">
                            EDITORIAL DIAGRAM
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* 3. Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            {(deal.tags || ['Licensing', 'Commercialization']).slice(0, 3).map((tag, tIdx) => (
                              <span 
                                key={tIdx}
                                className={`text-[9px] font-mono tracking-wider font-medium px-2 py-0.5 border ${
                                  darkMode 
                                    ? 'bg-white/[0.04] text-white/70 border-white/10' 
                                    : 'bg-brand-gold/5 text-brand-charcoal/80 border-[#EADBCC]'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* 4. Summary in smaller font */}
                          <p className={`font-sans text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-2 ${
                            darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                          }`}>
                            {deal.featuredSummary || deal.description}
                          </p>
                        </div>

                        {/* Footer Read Time & Action */}
                        <div className="pt-3.5 border-t border-brand-gold/15 flex flex-wrap items-center justify-between gap-2 mt-4">
                          <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                            <Clock size={11} strokeWidth={2.5} /> {deal.readTime || '4 MIN READ'}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCarouselArticle(deal)}
                              className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2 py-1 bg-[#0A66C2]/10"
                              title="Export LinkedIn Carousel"
                            >
                              <Linkedin size={11} fill="currentColor" />
                              <span>Carousel</span>
                            </button>
                            <button
                              onClick={() => openArticle(deal)}
                              className="px-3.5 py-1.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-[11px] tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                            >
                              Read Signal <ArrowRight size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Clear Link for More Deal Signals */}
              <div className="mt-10 p-6 sm:p-8 border border-brand-gold/30 bg-brand-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className={`font-serif text-lg font-bold ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                    Looking for all transactions in our intelligence desk?
                  </h4>
                  <p className={`text-xs font-sans mt-1 ${darkMode ? 'text-white/70' : 'text-brand-charcoal/70'}`}>
                    Explore all {DEAL_SIGNALS_DATA.length} deconstructed biopharma deals categorized by commercial and partnership mechanisms.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('DEAL SIGNALS');
                    window.history.pushState(null, '', '/deal-signals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-md"
                >
                  View All {DEAL_SIGNALS_DATA.length} Deal Signals Archive <ArrowRight size={14} />
                </button>
              </div>

              {/* Seamless Quick Bridge to Explainers */}
              <div className="mt-10 pt-6 border-t border-brand-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-xs font-mono tracking-wider text-brand-gold uppercase font-bold">
                    Looking for the underlying decision theory?
                  </span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('featured-explainer-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                    darkMode ? 'text-white/80 hover:text-brand-gold' : 'text-brand-charcoal/80 hover:text-brand-gold'
                  }`}
                >
                  Explore Foundational Explainers ↓
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 5 — CORE DECISION EXPLAINERS */}
          <section 
            id="featured-explainer-section"
            className={`py-14 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-left max-w-3xl mb-10">
                <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                  FOUNDATIONAL FRAMEWORKS
                </span>
                <h2 className={`font-serif text-3xl sm:text-4.5xl font-bold tracking-tight uppercase mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Core Decision Explainers
                </h2>
                <div className="h-[2px] w-12 bg-brand-gold mb-3" />
                <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                  darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
                }`}>
                  In-depth briefings on the organizational, governance, and commercial friction points that derail pharma BD execution.
                </p>
              </div>

              {/* Featured Explainer Hero Card: The Approval Gap */}
              <div className={`p-8 sm:p-12 lg:p-14 border relative overflow-hidden shadow-2xl mb-10 ${
                darkMode ? 'bg-[#08192C] border-brand-gold/40' : 'bg-[#FAF6EE] border-[#EADBCC]'
              }`}>
                <div className="absolute top-0 left-0 w-24 h-[3px] bg-brand-gold" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  
                  <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <span className="inline-block text-[11px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-4 px-3 py-1 border border-brand-gold/30 bg-brand-gold/10">
                      FEATURED FRAMEWORK
                    </span>

                    <h2 className={`font-serif text-3.5xl sm:text-4.5xl font-bold tracking-tight mb-4 leading-[1.15] ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      The Approval Gap
                    </h2>

                    <p className="font-serif text-lg sm:text-xl text-brand-gold italic font-semibold mb-5 leading-relaxed">
                      Why attractive opportunities lose momentum before approval.
                    </p>

                    <p className={`font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-2xl ${
                      darkMode ? 'text-white/85' : 'text-brand-charcoal/90'
                    }`}>
                      Explore the decision, organizational and execution forces that create distance between commercial attractiveness and execution readiness.
                    </p>

                    <button
                      onClick={() => openArticle(approvalGapArticle)}
                      className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl rounded-none group"
                    >
                      Read Explainer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="lg:col-span-5 w-full flex items-center justify-center">
                    <div className="w-full border border-brand-gold/30 p-3 sm:p-4 bg-[#051424]">
                      <ApprovalGapDiagram darkMode={true} />
                    </div>
                  </div>

                </div>
              </div>

              {/* 2-Column Grid of Complementary Explainers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Card 1: Execution Deficit */}
                <div className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
                  darkMode 
                    ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                    : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                }`}>
                  <div className="p-6 sm:p-7">
                    <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-3 px-2.5 py-0.5 border border-brand-gold/30">
                      EXECUTION DEFICIT
                    </span>
                    <h3 
                      onClick={() => openArticle(executionDeficitArticle)}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 hover:text-brand-gold cursor-pointer transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      A Signed Deal Is Not an Executed Deal
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                    }`}>
                      Why the transition from agreement to execution is the most vulnerable phase of a pharma transaction.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                      <Clock size={12} strokeWidth={2.5} /> 6 MIN READ
                    </span>
                    <button
                      onClick={() => openArticle(executionDeficitArticle)}
                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Read Explainer <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Card 2: Opportunity Creation vs Processing */}
                <div className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
                  darkMode 
                    ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                    : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                }`}>
                  <div className="p-6 sm:p-7">
                    <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-3 px-2.5 py-0.5 border border-brand-gold/30">
                      OPPORTUNITY CREATION
                    </span>
                    <h3 
                      onClick={() => openArticle(opportunityCreationArticle)}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 hover:text-brand-gold cursor-pointer transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      Opportunity Creation vs Opportunity Processing
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                    }`}>
                      Why the best opportunities are created upstream, not found downstream.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                      <Clock size={12} strokeWidth={2.5} /> 6 MIN READ
                    </span>
                    <button
                      onClick={() => openArticle(opportunityCreationArticle)}
                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Read Explainer <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </section>


        </>
      )}

      {/* SECTION 8 — SUBSCRIBE */}
      <section 
        id="subscribe-section" 
        className={`py-12 sm:py-16 transition-colors duration-300 border-b ${
          darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className={`p-8 sm:p-12 border text-center relative overflow-hidden ${
            darkMode ? 'bg-[#0A1A2E] text-white border-brand-gold/30' : 'bg-[#FAF6EE] text-[#111827] border-[#EADBCC]'
          }`}>
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-4">
              <span className="text-brand-gold font-mono text-xs font-bold block tracking-widest uppercase px-3 py-1 border border-brand-gold/30 bg-brand-gold/5">
                PHARMASIGNAL BRIEFINGS
              </span>

              <h2 className={`font-serif text-2.5xl sm:text-4xl font-bold tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-[#001B2A]'
              }`}>
                One Pharma BD Insight Worth Saving
              </h2>
              <div className="h-[2px] w-12 bg-brand-gold" />
              
              <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-white/90' : 'text-brand-charcoal'
              }`}>
                Get mechanism-first analysis on pharma BD deals, execution risk, partner capability and market access reality.
              </p>

              <p className={`font-sans text-xs tracking-wider uppercase font-semibold text-brand-gold/90 ${
                darkMode ? 'text-brand-gold/90' : 'text-brand-primary'
              }`}>
                For BD, licensing, alliance, portfolio and commercial strategy leaders.
              </p>

              <div className="w-full max-w-md pt-2">
                <AnimatePresence mode="wait">
                  {!subscribedMessage ? (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          disabled={subscribing}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Enter your email"
                          className={`w-full px-4 py-3 text-sm font-sans border outline-none transition-colors rounded-none ${
                            darkMode 
                              ? 'bg-[#061526] border-white/15 text-white placeholder:text-white/40 focus:border-brand-gold' 
                              : 'bg-white border-[#EADBCC] text-[#111827] placeholder:text-[#111827]/40 focus:border-brand-gold'
                          } ${subscribing ? 'opacity-65 cursor-not-allowed' : ''}`}
                        />
                        <button
                          type="submit"
                          disabled={subscribing}
                          className={`w-full sm:w-auto px-6 py-3 bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors text-xs font-sans tracking-widest font-bold whitespace-nowrap uppercase rounded-none cursor-pointer ${
                            subscribing ? 'opacity-65 cursor-not-allowed' : ''
                          }`}
                        >
                          {subscribing ? 'Submitting...' : 'Subscribe Free'}
                        </button>
                      </div>

                      {subscribeError && (
                        <div className="text-xs text-red-500 font-sans mt-1 text-center">
                          {subscribeError}
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-brand-gold/80 font-medium tracking-wide text-center">
                        No spam. Unsubscribe anytime.
                      </div>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-5 px-4 border border-brand-gold/30 bg-brand-gold/5 text-center flex flex-col items-center justify-center space-y-2"
                    >
                      <CheckCircle2 className="text-brand-gold" size={24} />
                      <p className={`font-serif text-sm leading-relaxed ${darkMode ? 'text-white/95' : 'text-brand-charcoal/95'}`}>
                        Thank you for subscribing to PharmaSignal.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9 — FOOTER */}
      <footer className={`pt-12 pb-8 border-t relative z-10 ${
        darkMode ? 'bg-brand-deep text-white border-white/5' : 'bg-[#FAF6EE] text-[#111827] border-[#EADBCC]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-brand-gold/20 items-center">
            
            {/* Left Brand Col */}
            <div className="md:col-span-4 flex flex-col space-y-1 text-left w-full">
              <span className={`font-serif text-2xl font-bold tracking-wider ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                PHARMA<span className="text-brand-gold">SIGNAL</span>
              </span>
              <span className="block text-[11px] font-mono tracking-widest text-brand-gold uppercase font-semibold mt-1">
                Decision intelligence for smarter pharma business development.
              </span>
            </div>

            {/* Center Principle Block */}
            <div className="md:col-span-4 text-center w-full">
              <span className="font-serif text-base sm:text-lg italic text-brand-gold font-semibold tracking-wide block">
                "What mechanism created or destroyed value?"
              </span>
              <span className={`block text-xs font-mono mt-1 uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-brand-charcoal/60'}`}>
                © 2026 PharmaSignal. All rights reserved.
              </span>
            </div>

            {/* Right Footer Links & Social */}
            <div className="md:col-span-4 flex flex-col md:items-end justify-center text-left md:text-right space-y-4 w-full">
              <nav className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-xs font-sans font-bold uppercase tracking-wider">
                <button 
                  onClick={() => scrollToSection('latest-explainers-section')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Explainers
                </button>
                <button 
                  onClick={() => scrollToSection('deal-signals-section')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Deal Signals
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer text-brand-gold"
                >
                  Lenses
                </button>
                <button 
                  onClick={() => scrollToSection('about-section')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('subscribe-section')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Subscribe
                </button>
                <a 
                  href="/rss.xml" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <Rss size={12} className="text-brand-gold" /> RSS Feed
                </a>
                <button 
                  onClick={() => openPolicy('privacy')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => openPolicy('terms')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Terms
                </button>
                <button 
                  onClick={() => openPolicy('editorial')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Editorial
                </button>
                <button 
                  onClick={() => openPolicy('cookies')}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Cookies
                </button>
              </nav>

              {/* Social Icons */}
              <div className="flex items-center space-x-3">
                <a 
                  href="/rss.xml" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-2 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-[#001B2A]/5 text-brand-primary hover:text-brand-gold hover:bg-white border-transparent hover:border-brand-gold/30'
                  }`}
                  aria-label="RSS Feed XML"
                  title="RSS Feed XML for Auto-Syndication"
                >
                  <Rss size={15} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-2 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-[#001B2A]/5 text-brand-primary hover:text-brand-gold hover:bg-white border-transparent hover:border-brand-gold/30'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={15} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-2 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-[#001B2A]/5 text-brand-primary hover:text-brand-gold hover:bg-white border-transparent hover:border-brand-gold/30'
                  }`}
                  aria-label="Twitter Profile"
                >
                  <Twitter size={15} />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 text-center text-[9px] font-mono text-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={darkMode ? 'text-white/25' : 'text-brand-charcoal/30'}>
              Standard disclaimer: All valuations and strategic analyses are informational and do not represent financial or investment advice.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Reader Modal for Articles */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={closeArticle} 
            darkMode={darkMode}
            onSelectArticleId={(id) => {
              const art = ALL_ARTICLES.find(a => a.id === id);
              if (art) setSelectedArticle(art);
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Policy Modal */}
      <AnimatePresence>
        {policyModalOpen && (
          <PolicyModal 
            isOpen={policyModalOpen}
            activeTab={policyTab}
            onTabChange={(tab) => {
              setPolicyTab(tab);
              const url = new URL(window.location.href);
              url.searchParams.set('policy', tab);
              window.history.pushState(null, '', url.toString());
            }}
            onClose={closePolicy}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      {/* Standalone LinkedIn Carousel Modal */}
      <AnimatePresence>
        {carouselArticle && (
          <LinkedInCarouselModal 
            article={carouselArticle}
            isOpen={!!carouselArticle}
            onClose={() => setCarouselArticle(null)}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
