import { useState, useEffect, FormEvent, lazy, Suspense } from 'react';
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
  BookOpen,
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
import { PolicyTab } from './components/PolicyModal';
import ApprovalGapDiagram from './components/ApprovalGapDiagram';
import HeroMechanismDiagram from './components/HeroMechanismDiagram';
import SuggestDealModal from './components/SuggestDealModal';
import ExecutiveBriefingBox from './components/ExecutiveBriefingBox';

// Lazily load modals and secondary views to optimize initial bundle size & mobile performance
const ArticleModal = lazy(() => import('./components/ArticleModal'));
const PolicyModal = lazy(() => import('./components/PolicyModal').then(m => ({ default: m.PolicyModal })));
const LensesPage = lazy(() => import('./components/LensesPage'));
const LinkedInCarouselModal = lazy(() => import('./components/LinkedInCarouselModal'));

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

export const getCategoryBadgeClass = (category: string = '') => {
  const cat = category.toUpperCase();
  if (cat.includes('OPPORTUNITY') || cat.includes('CREATION') || cat.includes('NEWCO')) {
    return 'badge-category-opportunity';
  }
  if (cat.includes('SCALE') || cat.includes('MANUFACTURING') || cat.includes('TECH TRANSFER') || cat.includes('CELL & GENE')) {
    return 'badge-category-scale';
  }
  if (cat.includes('DEFICIT') || cat.includes('FAILURE') || cat.includes('RISK') || cat.includes('GAP') || cat.includes('TERMINATION')) {
    return 'badge-category-risk';
  }
  return 'badge-category-licensing';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedDealCategory, setSelectedDealCategory] = useState<string>('ALL');
  const [carouselArticle, setCarouselArticle] = useState<Article | null>(null);
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  
  // Policy Modal state
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>('privacy');

  const [newsEmail, setNewsEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const [earlyEmail, setEarlyEmail] = useState('');
  const [earlySubscribedMessage, setEarlySubscribedMessage] = useState(false);
  const [earlySubscribing, setEarlySubscribing] = useState(false);
  const [earlySubscribeError, setEarlySubscribeError] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const userTheme = localStorage.getItem('pharmasignal_theme');
      return userTheme === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('pharmasignal_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('pharmasignal_theme', 'light');
      }
      localStorage.removeItem('pharmasignal_darkmode');
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
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
  const dealFailuresArticle = EXPLAINERS_DATA.find(a => a.id === 'deal-failures') || EXPLAINERS_DATA[3] || EXPLAINERS_DATA[0];
  const evidenceMaturityArticle = EXPLAINERS_DATA.find(a => a.id === 'evidence-maturity') || EXPLAINERS_DATA[4] || EXPLAINERS_DATA[0];

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

  // Early Subscribe Handler
  const handleEarlySubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const emailToSubmit = earlyEmail.trim();
    if (!emailToSubmit || !emailToSubmit.includes('@')) {
      setEarlySubscribeError('Please enter a valid work email address.');
      return;
    }
    
    setEarlySubscribing(true);
    setEarlySubscribeError(null);

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
      
      setEarlyEmail('');
      setEarlySubscribedMessage(true);
      
      setTimeout(() => {
        setEarlySubscribedMessage(false);
      }, 8000);
    } catch (err) {
      console.error(err);
      setEarlySubscribeError('Could not process subscription. Please try again.');
    } finally {
      setEarlySubscribing(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-[#C5A059] selection:text-[#061426] transition-colors duration-300 ${
      darkMode ? 'bg-[#061426] text-[#F8FAFC]' : 'bg-[#FBFBFC] text-[#061426]'
    }`}>
      
      {/* 1. Header / Navigation */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSubscribeClick={() => scrollToSection('subscribe-section')}
        onSuggestClick={() => setSuggestModalOpen(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Router */}
      {activeTab === 'LENSES' ? (
        /* Dedicated /lenses Page */
        <Suspense fallback={<div className="min-h-screen py-16 flex items-center justify-center font-mono text-xs text-brand-gold">Loading lenses...</div>}>
          <LensesPage 
            darkMode={darkMode} 
            openArticle={openArticle}
            explainers={EXPLAINERS_DATA}
            dealSignals={DEAL_SIGNALS_DATA}
          />
        </Suspense>
      ) : activeTab === 'DEAL SIGNALS' ? (
        /* Dedicated Deal Signals Listing View */
        <section 
          id="deal-signals-page"
          className={`py-8 sm:py-12 transition-colors duration-300 border-b ${
            darkMode ? 'bg-[#050F1A] border-white/5' : 'bg-[#FAF7F0] border-[#E5DDD0]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-6 sm:mb-8 pb-4 border-b border-brand-gold/20">
              <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold-antique dark:text-brand-gold uppercase font-bold mb-1">
                EMPIRICAL EVIDENCE · DEAL MECHANISMS
              </span>
              <h1 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5 ${
                darkMode ? 'text-white' : 'text-[#001B2A]'
              }`}>
                Deal Signals
              </h1>
              <div className="h-[2px] w-10 bg-brand-gold mb-2.5" />
              <p className={`font-serif text-xs sm:text-sm leading-relaxed ${
                darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
              }`}>
                A PharmaSignal filter on pharma BD deals, partnerships and licensing activity — focused on what each deal reveals about execution, market access, partner capability and value creation.
              </p>
            </div>

            {/* Grid displaying ALL Deal Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
              {DEAL_SIGNALS_DATA.map((deal) => (
                <div 
                  key={deal.id}
                  className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full shadow-sm ${
                    darkMode 
                      ? 'bg-[#0B1B2D] border-white/10 hover:border-brand-gold/45' 
                      : 'bg-white border-[#E5DDD0] hover:border-brand-gold/60'
                  }`}
                >
                  <div className="p-4 sm:p-5 pb-2.5">
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-brand-gold/10">
                      <span className={`inline-block text-[9.5px] font-mono tracking-[0.12em] font-bold uppercase px-2 py-0.5 border ${getCategoryBadgeClass(deal.category)}`}>
                        {deal.category}
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold-antique/85 dark:text-brand-gold/80 tracking-wider font-semibold tnum tabular-nums">
                        {deal.date}
                      </span>
                    </div>
                    
                    <h2 
                      onClick={() => openArticle(deal)}
                      className={`font-serif text-base sm:text-lg font-bold tracking-tight hover:text-brand-gold cursor-pointer transition-colors leading-snug ${
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
                        src={darkMode ? (deal.imageUrlDark || deal.imageUrl) : (deal.imageUrlLight || deal.imageUrl)} 
                        alt={deal.shortTitle || deal.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050F1A]/70 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-2 right-2 bg-[#050F1A]/90 border border-brand-gold/40 px-1.5 py-0.5 text-[8px] font-mono font-bold tracking-widest text-brand-gold uppercase">
                        EDITORIAL DIAGRAM
                      </div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5 pt-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        {(deal.tags || ['Licensing', 'Commercialization']).slice(0, 3).map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className={`text-[9px] font-mono tracking-wider font-medium px-1.5 py-0.5 border ${
                              darkMode 
                                ? 'bg-white/[0.04] text-white/70 border-white/10' 
                                : 'bg-brand-gold/5 text-brand-charcoal/80 border-[#E5DDD0]'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Summary in smaller font */}
                      <p className={`font-sans text-xs leading-relaxed mb-2.5 ${
                        darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                      }`}>
                        {deal.featuredSummary || deal.description}
                      </p>

                      {deal.pharmaSignalRead && (
                        <div className={`p-2.5 border-l-2 border-brand-gold text-xs font-serif leading-relaxed mb-2.5 ${
                          darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-primary/90'
                        }`}>
                          <strong className="font-mono text-[9px] uppercase text-brand-gold-antique dark:text-brand-gold tracking-widest block mb-0.5">
                            Signal Mechanism
                          </strong>
                          {deal.pharmaSignalRead}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-2.5 border-t border-brand-gold/10 flex flex-wrap items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1 text-[9.5px] font-mono text-brand-gold-antique dark:text-brand-gold font-bold uppercase tnum tabular-nums">
                          <Clock size={10} strokeWidth={2.5} /> {deal.readTime}
                        </span>
                        <button
                          onClick={() => setCarouselArticle(deal)}
                          className="flex items-center gap-1 text-[9.5px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2 py-0.5 bg-[#0A66C2]/10"
                          title="Export LinkedIn Carousel"
                        >
                          <Linkedin size={10} fill="currentColor" />
                          <span>Carousel</span>
                        </button>
                      </div>
                      <button
                        onClick={() => openArticle(deal)}
                        className="px-3.5 py-1.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        Read Deal Signal <ArrowRight size={11} />
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
          {/* SECTION 1 — HERO */}
          <section 
            id="about-section"
            className={`relative overflow-hidden py-14 sm:py-18 lg:py-24 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FBFBFC] border-slate-200'
            }`}
          >
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl flex flex-col items-start text-left">
                
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 mb-2.5"
                >
                  <div className="h-[1.5px] w-6 bg-[#C5A059]" />
                  <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.08em] text-[#C5A059] font-bold uppercase">
                    BIOPHARMA BD DECISION INTELLIGENCE
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`font-serif text-[34px] sm:text-[38px] lg:text-[46px] xl:text-[50px] font-bold tracking-tight leading-[1.08] mb-3.5 ${
                    darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                  }`}
                >
                  How Pharma Deals Really Work
                </motion.h1>
                <div className="h-[2px] w-12 bg-[#C5A059] mb-4" />

                <motion.p 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`font-sans text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] mb-6 max-w-2xl ${
                    darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                  }`}
                >
                  PharmaSignal deconstructs the empirical structural mechanisms that create, delay, protect or destroy value in pharmaceutical licensing and M&A transactions.
                </motion.p>

                {/* Proof Metrics Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className={`flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-4 border-b text-[11px] sm:text-[12px] font-mono tracking-[0.08em] uppercase font-semibold ${
                    darkMode ? 'border-[#1E3A55] text-[#94A3B8]' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                    {DEAL_SIGNALS_DATA.length} DEALS ANALYZED
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                    {EXPLAINERS_DATA.length} STRATEGIC EXPLAINERS
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                    6 DECISION LENSES
                  </span>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
                >
                  <button
                    onClick={() => scrollToSection('deal-signals-section')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer rounded-none shadow-xs"
                  >
                    View Deal Signals <ArrowRight size={13} />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('featured-explainer-section')}
                    className={`w-full sm:w-auto px-6 py-3.5 bg-transparent font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-none border ${
                      darkMode 
                        ? 'border-[#1E3A55] text-[#F8FAFC] hover:bg-[#0D243A] hover:border-[#C5A059]' 
                        : 'border-slate-300 text-[#061426] hover:bg-slate-100 hover:border-slate-400'
                    }`}
                  >
                    Explore Decision Frameworks <ArrowRight size={13} />
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 2 — DEAL SIGNALS (EMPIRICAL MARKET EVIDENCE) */}
          <section 
            id="deal-signals-section"
            className={`py-14 sm:py-20 lg:py-24 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#081B2E] border-[#1E3A55]' : 'bg-[#F8FAFC] border-slate-200'
            }`}
          >
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 pb-4 border-b border-[#1E3A55]/70">
                <div className="text-left max-w-2xl">
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-bold mb-1.5">
                    EMPIRICAL EVIDENCE · {DEAL_SIGNALS_DATA.length} DEALS ANALYZED
                  </span>
                  <h2 className={`font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight leading-[1.15] mb-2 ${
                    darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                  }`}>
                    Latest Deal Signals
                  </h2>
                  <div className="h-[2px] w-10 bg-[#C5A059] mb-2.5" />
                  <p className={`font-sans text-[14px] sm:text-[15px] leading-[1.65] ${
                    darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                  }`}>
                    Biopharma transactions deconstructed through the exact structural mechanisms that create or destroy enterprise value.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setSuggestModalOpen(true)}
                    className={`text-xs font-sans tracking-widest font-bold uppercase transition-all px-4 py-2.5 border cursor-pointer ${
                      darkMode 
                        ? 'border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10' 
                        : 'border-slate-300 text-[#061426] hover:bg-slate-100'
                    }`}
                  >
                    Suggest a Deal Signal
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('DEAL SIGNALS');
                      window.history.pushState(null, '', '/deal-signals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`text-xs font-sans tracking-widest font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer px-4 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-bold`}
                  >
                    All Signals Archive <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Deal Signals Card Grid: 4 Neatly Laid Tiles of Most Recent Deal Signals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch text-left">
                {[...DEAL_SIGNALS_DATA]
                  .filter((deal) => !deal.hideFromHomepage)
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
                      className={`border transition-all duration-300 flex flex-col justify-between rounded-none overflow-hidden group shadow-xs hover:shadow-md ${
                        darkMode 
                          ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/60' 
                          : 'bg-white border-slate-200 hover:border-[#C5A059]/60'
                      }`}
                    >
                      <div className="p-6 sm:p-7 pb-3">
                        {/* 1. Date and Category Tag */}
                        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#1E3A55]/50">
                          <span className={`inline-block text-[10px] font-mono tracking-[0.08em] font-bold uppercase px-2 py-0.5 border ${getCategoryBadgeClass(deal.category)}`}>
                            {deal.category || 'DEAL SIGNAL'}
                          </span>
                          <span className={`text-[11px] font-mono tracking-wider font-semibold tnum tabular-nums ${darkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
                            {deal.date?.toUpperCase()}
                          </span>
                        </div>

                        {/* 2. Heading */}
                        <h3 
                          onClick={() => openArticle(deal)}
                          className={`font-serif text-[19px] sm:text-[21px] font-bold tracking-tight cursor-pointer transition-colors leading-[1.28] mb-2 ${
                            darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                          }`}
                        >
                          {deal.shortTitle || deal.title}
                        </h3>
                      </div>

                      {/* 3. Editorial Diagram / Image with Mechanism Overlay Badge */}
                      {(deal.imageUrl || deal.imageUrlLight || deal.imageUrlDark) && (
                        <div 
                          onClick={() => openArticle(deal)}
                          className={`w-full aspect-[16/9] overflow-hidden cursor-pointer border-y relative transition-colors duration-300 ${
                            darkMode ? 'bg-[#0A1A2B] border-[#1E3A55]' : 'bg-slate-100 border-slate-200'
                          }`}
                        >
                          <img 
                            src={darkMode ? (deal.imageUrlDark || deal.imageUrl) : (deal.imageUrlLight || deal.imageUrl)} 
                            alt={deal.title} 
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500" 
                          />
                          <div className={`absolute inset-0 transition-opacity duration-300 ${
                            darkMode 
                              ? 'bg-gradient-to-t from-[#061426]/75 via-transparent to-transparent opacity-80' 
                              : 'bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-60'
                          }`} />
                          <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.08em] uppercase border ${
                            darkMode 
                              ? 'bg-[#061426]/90 border-[#C5A059]/40 text-[#C5A059]' 
                              : 'bg-white/95 border-[#C5A059]/60 text-[#8A6718] shadow-xs'
                          }`}>
                            EDITORIAL DIAGRAM
                          </div>
                          {deal.pharmaSignalRead && (
                            <div className={`absolute bottom-2.5 left-2.5 right-2.5 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono line-clamp-1 border ${
                              darkMode 
                                ? 'bg-[#061426]/90 border-[#C5A059]/30 text-white/90' 
                                : 'bg-white/95 border-[#C5A059]/40 text-slate-800 shadow-xs'
                            }`}>
                              <span className={`font-bold uppercase tracking-wider mr-1.5 ${darkMode ? 'text-[#C5A059]' : 'text-[#8A6718]'}`}>
                                MECHANISM:
                              </span>
                              {deal.pharmaSignalRead.split('.')[0]}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 sm:p-7 pt-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* 4. Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            {(deal.tags || ['Licensing', 'Commercialization']).slice(0, 3).map((tag, tIdx) => (
                              <span 
                                key={tIdx}
                                className={`text-[9.5px] font-mono tracking-wider font-medium px-2 py-0.5 border ${
                                  darkMode 
                                    ? 'bg-[#061426] text-[#CBD5E1] border-[#1E3A55]' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* 5. Summary: 2 lines max per design specification */}
                          <p className={`font-sans text-[13.5px] leading-[1.6] line-clamp-2 mb-3 ${
                            darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                          }`}>
                            {deal.featuredSummary || deal.description}
                          </p>
                        </div>

                        {/* Footer Read Time & Action */}
                        <div className="pt-3 border-t border-[#1E3A55]/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
                          <span className={`flex items-center gap-1 text-[11px] font-mono font-bold uppercase tnum tabular-nums ${darkMode ? 'text-[#C5A059]' : 'text-slate-500'}`}>
                            <Clock size={11} strokeWidth={2.5} /> {deal.readTime || '4 MIN READ'}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCarouselArticle(deal)}
                              className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                              title="Export LinkedIn Carousel"
                            >
                              <Linkedin size={11} fill="currentColor" />
                              <span>Carousel</span>
                            </button>
                            <button
                              onClick={() => openArticle(deal)}
                              className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
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
              <div className={`mt-8 p-6 sm:p-7 border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
                darkMode ? 'border-[#1E3A55] bg-[#0D243A]' : 'border-slate-200 bg-white shadow-xs'
              }`}>
                <div>
                  <h4 className={`font-serif text-[18px] sm:text-[20px] font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'}`}>
                    Explore all {DEAL_SIGNALS_DATA.length} transactions in our Deal Intelligence desk
                  </h4>
                  <p className={`text-xs sm:text-sm font-sans mt-0.5 ${darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'}`}>
                    Search, filter, and review biopharma licensing and partnerships categorized by commercial mechanisms.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSuggestModalOpen(true)}
                    className="px-4 py-2.5 border border-[#C5A059]/60 text-[#C5A059] hover:bg-[#C5A059]/10 font-sans text-xs tracking-widest font-bold uppercase transition-all cursor-pointer whitespace-nowrap"
                  >
                    Suggest a Deal
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('DEAL SIGNALS');
                      window.history.pushState(null, '', '/deal-signals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-[#0B121E] hover:bg-brand-cobalt text-white dark:bg-[#C5A059] dark:text-[#061426] dark:hover:bg-[#D8B869] font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    View All {DEAL_SIGNALS_DATA.length} Signals Archive <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3 — FEATURED EXPLAINER (THE APPROVAL GAP) */}
          <section 
            id="featured-explainer-section"
            className={`py-14 sm:py-20 lg:py-24 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-white border-slate-200'
            }`}
          >
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-left max-w-2xl mb-8 sm:mb-10 pb-3 border-b border-[#1E3A55]/70">
                <span className="inline-block text-[11px] sm:text-[12px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-bold mb-1.5">
                  FOUNDATIONAL FRAMEWORK
                </span>
                <h2 className={`font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight leading-[1.15] mb-2 ${
                  darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                }`}>
                  Featured Explainer
                </h2>
                <div className="h-[2px] w-10 bg-[#C5A059] mb-2.5" />
                <p className={`font-sans text-[14px] sm:text-[15px] leading-[1.65] ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                }`}>
                  In-depth briefings on the organizational, governance, and commercial friction points that derail pharma BD execution.
                </p>
              </div>

              {/* Featured Explainer Hero Card: The Approval Gap */}
              <div className={`p-6 sm:p-8 lg:p-9 border relative overflow-hidden shadow-xs hover:shadow-md transition-shadow ${
                darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-[#F8FAFC] border-slate-200'
              }`}>
                <div className="absolute top-0 left-0 w-20 h-[3px] bg-[#C5A059]" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
                  
                  <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <span className={`inline-block text-[10px] font-mono tracking-[0.08em] font-bold uppercase mb-2.5 px-2.5 py-0.5 border ${
                      darkMode ? 'text-[#C5A059] border-[#C5A059]/30 bg-[#061426]' : 'text-brand-cobalt border-blue-200 bg-blue-50/70'
                    }`}>
                      DECISION LENS 01
                    </span>

                    <h2 className={`font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight mb-2.5 leading-[1.15] ${
                      darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                    }`}>
                      The Approval Gap
                    </h2>

                    <p className={`font-serif text-sm sm:text-base italic font-semibold mb-3.5 leading-relaxed ${
                      darkMode ? 'text-[#C5A059]' : 'text-amber-800'
                    }`}>
                      Why attractive opportunities lose momentum before internal approval.
                    </p>

                    <p className={`font-sans text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-xl ${
                      darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                    }`}>
                      Explore the decision, organizational and execution forces that create distance between commercial attractiveness and execution readiness.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setCarouselArticle(approvalGapArticle)}
                        className="flex items-center gap-1.5 text-[10.5px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-3.5 py-2 bg-[#0A66C2]/10"
                        title="Export LinkedIn Carousel"
                      >
                        <Linkedin size={12} fill="currentColor" />
                        <span>Export Carousel</span>
                      </button>
                      <button
                        onClick={() => openArticle(approvalGapArticle)}
                        className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs rounded-none group"
                      >
                        Read Explainer <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 w-full flex items-center justify-center">
                    <div className={`w-full border p-3 ${
                      darkMode ? 'border-[#1E3A55] bg-[#0A1A2B]' : 'border-slate-200 bg-white'
                    }`}>
                      <ApprovalGapDiagram darkMode={darkMode} />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4 — OTHER EXPLAINERS TO READ */}
          <section 
            id="latest-explainers-section"
            className={`py-14 sm:py-20 lg:py-24 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#081B2E] border-[#1E3A55]' : 'bg-[#F8FAFC] border-slate-200'
            }`}
          >
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-left max-w-2xl mb-8 sm:mb-10 pb-3 border-b border-[#1E3A55]/70">
                <span className="inline-block text-[11px] sm:text-[12px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-bold mb-1.5">
                  REUSABLE MECHANISMS · FOUNDATIONAL LIBRARY
                </span>
                <h2 className={`font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight leading-[1.15] mb-2 ${
                  darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                }`}>
                  Core Explainer Library
                </h2>
                <div className="h-[2px] w-10 bg-[#C5A059] mb-2.5" />
                <p className={`font-sans text-[14px] sm:text-[15px] leading-[1.65] ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                }`}>
                  In-depth structural briefings on recurring deal dynamics, post-signature execution, and upstream opportunity creation.
                </p>
              </div>

              {/* 2x2 Grid of Key Explainers - Gap 28-32px, Padding 22-28px */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch text-left">
                
                {/* Card 1: Execution Deficit */}
                <div className={`border transition-all duration-300 flex flex-col justify-between rounded-none h-full group shadow-xs hover:shadow-md ${
                  darkMode 
                    ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/60' 
                    : 'bg-white border-slate-200 hover:border-[#C5A059]/60'
                }`}>
                  <div className="p-6 sm:p-7 pb-3">
                    <span className="inline-block text-[10px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-2 px-2 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
                      EXECUTION DEFICIT
                    </span>
                    <h3 
                      onClick={() => openArticle(executionDeficitArticle)}
                      className={`font-serif text-[18px] sm:text-[20px] font-bold tracking-tight mb-2 cursor-pointer transition-colors leading-[1.28] ${
                        darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                      }`}
                    >
                      A Signed Deal Is Not an Executed Deal
                    </h3>
                    <p className={`font-sans text-[13.5px] leading-[1.6] line-clamp-2 ${
                      darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                    }`}>
                      Why the transition from agreement to execution is the most vulnerable phase of a pharma transaction.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-3 border-t border-[#1E3A55]/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-[11px] font-mono font-bold uppercase tnum tabular-nums ${darkMode ? 'text-[#C5A059]' : 'text-slate-500'}`}>
                        <Clock size={11} strokeWidth={2.5} /> 6 MIN READ
                      </span>
                      <button
                        onClick={() => setCarouselArticle(executionDeficitArticle)}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                        title="Export LinkedIn Carousel"
                      >
                        <Linkedin size={11} fill="currentColor" />
                        <span>Carousel</span>
                      </button>
                    </div>
                    <button
                      onClick={() => openArticle(executionDeficitArticle)}
                      className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Read Explainer <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Card 2: Opportunity Creation vs Processing */}
                <div className={`border transition-all duration-300 flex flex-col justify-between rounded-none h-full group shadow-xs hover:shadow-md ${
                  darkMode 
                    ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/60' 
                    : 'bg-white border-slate-200 hover:border-[#C5A059]/60'
                }`}>
                  <div className="p-6 sm:p-7 pb-3">
                    <span className="inline-block text-[10px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-2 px-2 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
                      OPPORTUNITY CREATION
                    </span>
                    <h3 
                      onClick={() => openArticle(opportunityCreationArticle)}
                      className={`font-serif text-[18px] sm:text-[20px] font-bold tracking-tight mb-2 cursor-pointer transition-colors leading-[1.28] ${
                        darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                      }`}
                    >
                      Opportunity Creation vs Opportunity Processing
                    </h3>
                    <p className={`font-sans text-[13.5px] leading-[1.6] line-clamp-2 ${
                      darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                    }`}>
                      Why the best opportunities are created upstream through custom structuring, not found downstream in auction processes.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-3 border-t border-[#1E3A55]/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-[11px] font-mono font-bold uppercase tnum tabular-nums ${darkMode ? 'text-[#C5A059]' : 'text-slate-500'}`}>
                        <Clock size={11} strokeWidth={2.5} /> 6 MIN READ
                      </span>
                      <button
                        onClick={() => setCarouselArticle(opportunityCreationArticle)}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                        title="Export LinkedIn Carousel"
                      >
                        <Linkedin size={11} fill="currentColor" />
                        <span>Carousel</span>
                      </button>
                    </div>
                    <button
                      onClick={() => openArticle(opportunityCreationArticle)}
                      className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Read Explainer <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Card 3: Deal Failures */}
                <div className={`border transition-all duration-300 flex flex-col justify-between rounded-none h-full group shadow-xs hover:shadow-md ${
                  darkMode 
                    ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/60' 
                    : 'bg-white border-slate-200 hover:border-[#C5A059]/60'
                }`}>
                  <div className="p-6 sm:p-7 pb-3">
                    <span className="inline-block text-[10px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-2 px-2 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
                      LICENSING STRATEGY
                    </span>
                    <h3 
                      onClick={() => openArticle(dealFailuresArticle)}
                      className={`font-serif text-[18px] sm:text-[20px] font-bold tracking-tight mb-2 cursor-pointer transition-colors leading-[1.28] ${
                        darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                      }`}
                    >
                      Why Most Pharma Deals Fail Before Signing
                    </h3>
                    <p className={`font-sans text-[13.5px] leading-[1.6] line-clamp-2 ${
                      darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                    }`}>
                      Diligence friction, valuation asymmetry, and internal stakeholder misalignment that quietly sink biopharma transactions.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-3 border-t border-[#1E3A55]/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-[11px] font-mono font-bold uppercase tnum tabular-nums ${darkMode ? 'text-[#C5A059]' : 'text-slate-500'}`}>
                        <Clock size={11} strokeWidth={2.5} /> 5 MIN READ
                      </span>
                      <button
                        onClick={() => setCarouselArticle(dealFailuresArticle)}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                        title="Export LinkedIn Carousel"
                      >
                        <Linkedin size={11} fill="currentColor" />
                        <span>Carousel</span>
                      </button>
                    </div>
                    <button
                      onClick={() => openArticle(dealFailuresArticle)}
                      className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Read Explainer <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Card 4: Evidence Maturity Gap */}
                <div className={`border transition-all duration-300 flex flex-col justify-between rounded-none h-full group shadow-xs hover:shadow-md ${
                  darkMode 
                    ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/60' 
                    : 'bg-white border-slate-200 hover:border-[#C5A059]/60'
                }`}>
                  <div className="p-6 sm:p-7 pb-3">
                    <span className="inline-block text-[10px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-2 px-2 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
                      EVIDENCE & DEVELOPMENT
                    </span>
                    <h3 
                      onClick={() => openArticle(evidenceMaturityArticle)}
                      className={`font-serif text-[18px] sm:text-[20px] font-bold tracking-tight mb-2 cursor-pointer transition-colors leading-[1.28] ${
                        darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                      }`}
                    >
                      The Evidence Maturity Gap That Destroys Value
                    </h3>
                    <p className={`font-sans text-[13.5px] leading-[1.6] line-clamp-2 ${
                      darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                    }`}>
                      How premature partnering before key clinical and payer inflection points creates permanent value destruction.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-7 pt-3 border-t border-[#1E3A55]/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-[11px] font-mono font-bold uppercase tnum tabular-nums ${darkMode ? 'text-[#C5A059]' : 'text-slate-500'}`}>
                        <Clock size={11} strokeWidth={2.5} /> 5 MIN READ
                      </span>
                      <button
                        onClick={() => setCarouselArticle(evidenceMaturityArticle)}
                        className="flex items-center gap-1 text-[10px] font-mono tracking-wider font-semibold text-[#0A66C2] hover:text-white transition-colors cursor-pointer border border-[#0A66C2]/40 hover:border-[#0A66C2] px-2.5 py-1 bg-[#0A66C2]/10"
                        title="Export LinkedIn Carousel"
                      >
                        <Linkedin size={11} fill="currentColor" />
                        <span>Carousel</span>
                      </button>
                    </div>
                    <button
                      onClick={() => openArticle(evidenceMaturityArticle)}
                      className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Read Explainer <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 5 — THE LENSES FRAMEWORK PREVIEW */}
          <section 
            id="lenses-preview-section"
            className={`py-14 sm:py-20 lg:py-24 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061426] border-[#1E3A55]' : 'bg-[#FBFBFC] border-slate-200'
            }`}
          >
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 pb-4 border-b border-[#1E3A55]/70">
                <div className="text-left max-w-2xl">
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-bold mb-1.5">
                    INTELLECTUAL FRAMEWORKS · 6 MENTAL MODELS
                  </span>
                  <h2 className={`font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold tracking-tight leading-[1.15] mb-2 ${
                    darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
                  }`}>
                    The PharmaSignal Decision Lenses
                  </h2>
                  <div className="h-[2px] w-10 bg-[#C5A059] mb-2.5" />
                  <p className={`font-sans text-[14px] sm:text-[15px] leading-[1.65] ${
                    darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                  }`}>
                    Reusable mental models for interpreting recurring pharmaceutical licensing, valuation, and post-signature execution decisions.
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setActiveTab('LENSES');
                      window.history.pushState(null, '', '/lenses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`text-xs font-sans tracking-widest font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer px-4 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-bold`}
                  >
                    Explore All 6 Lenses <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* 3-Column Preview Grid - Gap 28-32px, Padding 22-28px */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch text-left">
                {[
                  {
                    num: 'LENS 01',
                    title: 'Approval Gap',
                    subtitle: 'Distance between commercial appeal and execution readiness.',
                    action: () => openArticle(approvalGapArticle)
                  },
                  {
                    num: 'LENS 02',
                    title: 'Execution Deficit',
                    subtitle: 'Capability and alignment gaps that stall post-signature progress.',
                    action: () => openArticle(executionDeficitArticle)
                  },
                  {
                    num: 'LENS 03',
                    title: 'Opportunity Creation',
                    subtitle: 'Upstream structuring that creates proprietary deal access.',
                    action: () => openArticle(opportunityCreationArticle)
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={item.action}
                    className={`p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer group rounded-none shadow-xs hover:shadow-md ${
                      darkMode 
                        ? 'bg-[#0D243A] border-[#1E3A55] hover:border-[#C5A059]/70 hover:bg-[#102c46]' 
                        : 'bg-white border-slate-200 hover:border-[#C5A059]/60 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono tracking-[0.08em] uppercase font-bold px-2 py-0.5 border ${
                          darkMode ? 'text-[#C5A059] border-[#C5A059]/30 bg-[#061426]' : 'text-brand-cobalt border-blue-200 bg-blue-50/70'
                        }`}>
                          {item.num}
                        </span>
                        <Compass size={16} className="text-[#C5A059] opacity-80 group-hover:opacity-100" />
                      </div>
                      <h3 className={`font-serif text-[19px] sm:text-[20px] font-bold tracking-tight mb-2 leading-[1.28] transition-colors ${
                        darkMode ? 'text-[#F8FAFC] group-hover:text-[#C5A059]' : 'text-[#061426] group-hover:text-[#0A66C2]'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`font-sans text-[13.5px] leading-[1.6] ${
                        darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>

                    <div className={`pt-3 mt-4 border-t border-[#1E3A55]/60 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider ${
                      darkMode ? 'text-[#C5A059]' : 'text-[#061426]'
                    }`}>
                      <span>View Framework</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </>
      )}

      {/* SECTION 8 — SUBSCRIBE */}
      <section 
        id="subscribe-section" 
        className={`py-7 sm:py-10 transition-colors duration-300 border-b ${
          darkMode ? 'bg-[#0E1726] border-white/5' : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className={`p-5 sm:p-7 border text-center relative overflow-hidden shadow-xs ${
            darkMode ? 'bg-[#111C2E] text-white border-brand-gold/30' : 'bg-[#F8FAFC] text-[#0B121E] border-slate-200'
          }`}>
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-2.5">
              <span className="text-brand-gold font-mono text-[10px] font-bold block tracking-widest uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/5">
                PHARMASIGNAL BRIEFINGS
              </span>

              <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-[#0B121E]'
              }`}>
                One Pharma BD Insight Worth Saving
              </h2>
              <div className="h-[2px] w-8 bg-brand-gold" />
              
              <p className={`font-serif text-xs sm:text-sm leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Get mechanism-first analysis on pharma BD deals, execution risk, partner capability and market access reality.
              </p>

              <p className={`font-sans text-[10.5px] tracking-wider uppercase font-semibold ${
                darkMode ? 'text-brand-gold/90' : 'text-slate-700'
              }`}>
                For BD, licensing, alliance, portfolio and commercial strategy leaders.
              </p>

              <div className="w-full max-w-md pt-1">
                <AnimatePresence mode="wait">
                  {!subscribedMessage ? (
                    <form onSubmit={handleSubscribe} className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          disabled={subscribing}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Enter your email"
                          className={`w-full px-3 py-2 text-xs font-sans border outline-none transition-colors rounded-none ${
                            darkMode 
                              ? 'bg-[#061426] border-white/15 text-white placeholder:text-white/40 focus:border-brand-gold' 
                              : 'bg-white border-slate-300 text-[#0B121E] placeholder:text-slate-400 focus:border-brand-cobalt'
                          } ${subscribing ? 'opacity-65 cursor-not-allowed' : ''}`}
                        />
                        <button
                          type="submit"
                          disabled={subscribing}
                          className={`w-full sm:w-auto px-4 py-2 bg-[#0B121E] hover:bg-brand-cobalt text-white dark:bg-brand-gold dark:text-[#0B121E] dark:hover:bg-brand-gold-hover transition-colors text-xs font-sans tracking-widest font-bold whitespace-nowrap uppercase rounded-none cursor-pointer shadow-xs ${
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

                      <div className="text-[9.5px] font-mono text-slate-500 dark:text-brand-gold/80 font-medium tracking-wide text-center">
                        No spam. Unsubscribe anytime.
                      </div>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-3 px-3 border border-brand-gold/30 bg-brand-gold/5 text-center flex flex-col items-center justify-center space-y-1"
                    >
                      <CheckCircle2 className="text-brand-gold" size={18} />
                      <p className={`font-serif text-xs leading-relaxed ${darkMode ? 'text-white/95' : 'text-slate-700'}`}>
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
      <footer className={`pt-8 pb-6 border-t relative z-10 ${
        darkMode ? 'bg-[#060B12] text-white border-white/10' : 'bg-[#FBFBFC] text-[#0B121E] border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-brand-gold/20 items-center">
            
            {/* Left Brand Col */}
            <div className="md:col-span-4 flex flex-col space-y-1 text-left w-full">
              <span className={`font-serif text-xl sm:text-2xl font-bold tracking-wider ${darkMode ? 'text-white' : 'text-[#0B121E]'}`}>
                PHARMA<span className="text-brand-gold">SIGNAL</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-brand-gold uppercase font-semibold mt-0.5">
                Decision intelligence for smarter pharma business development.
              </span>
            </div>

            {/* Center Principle Block */}
            <div className="md:col-span-4 text-center w-full">
              <span className="font-serif text-sm sm:text-base italic text-brand-gold font-semibold tracking-wide block">
                "What mechanism created or destroyed value?"
              </span>
              <span className={`block text-[11px] font-mono mt-0.5 uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-slate-500'}`}>
                © 2026 PharmaSignal. All rights reserved.
              </span>
            </div>

            {/* Right Footer Links & Social */}
            <div className="md:col-span-4 flex flex-col md:items-end justify-center text-left md:text-right space-y-3 w-full">
              <nav className={`flex flex-wrap md:justify-end gap-x-4 gap-y-1.5 text-[11px] font-sans font-bold uppercase tracking-wider ${
                darkMode ? 'text-white/80' : 'text-slate-600'
              }`}>
                <button 
                  onClick={() => scrollToSection('latest-explainers-section')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Explainers
                </button>
                <button 
                  onClick={() => scrollToSection('deal-signals-section')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Deal Signals
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer text-brand-gold"
                >
                  Lenses
                </button>
                <button 
                  onClick={() => scrollToSection('about-section')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('subscribe-section')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Subscribe
                </button>
                <a 
                  href="/rss.xml" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer flex items-center gap-1"
                >
                  <Rss size={11} className="text-brand-gold" /> RSS Feed
                </a>
                <button 
                  onClick={() => openPolicy('privacy')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => openPolicy('terms')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Terms
                </button>
                <button 
                  onClick={() => openPolicy('editorial')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Editorial
                </button>
                <button 
                  onClick={() => openPolicy('cookies')}
                  className="hover:text-brand-cobalt dark:hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Cookies
                </button>
              </nav>

              {/* Social Icons */}
              <div className="flex items-center space-x-2.5">
                <a 
                  href="/rss.xml" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-1.5 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-slate-100 text-slate-700 hover:text-brand-cobalt hover:bg-white border-slate-200 hover:border-brand-cobalt/40'
                  }`}
                  aria-label="RSS Feed XML"
                  title="RSS Feed XML for Auto-Syndication"
                >
                  <Rss size={14} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-1.5 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-slate-100 text-slate-700 hover:text-[#0A66C2] hover:bg-white border-slate-200 hover:border-[#0A66C2]/40'
                  }`}
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-1.5 transition-colors border ${
                    darkMode 
                      ? 'bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 border-white/5 hover:border-brand-gold/30' 
                      : 'bg-[#001B2A]/5 text-brand-primary hover:text-brand-gold hover:bg-white border-transparent hover:border-brand-gold/30'
                  }`}
                  aria-label="Twitter Profile"
                >
                  <Twitter size={14} />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-4 text-center text-[9px] font-mono text-white/20 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className={darkMode ? 'text-white/25' : 'text-brand-charcoal/30'}>
              Standard disclaimer: All valuations and strategic analyses are informational and do not represent financial or investment advice.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Reader Modal for Articles */}
      <AnimatePresence>
        {selectedArticle && (
          <Suspense fallback={null}>
            <ArticleModal 
              article={selectedArticle} 
              onClose={closeArticle} 
              darkMode={darkMode}
              onSelectArticleId={(id) => {
                const art = ALL_ARTICLES.find(a => a.id === id);
                if (art) setSelectedArticle(art);
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Floating Policy Modal */}
      <AnimatePresence>
        {policyModalOpen && (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
      </AnimatePresence>

      {/* Standalone LinkedIn Carousel Modal */}
      <AnimatePresence>
        {carouselArticle && (
          <Suspense fallback={null}>
            <LinkedInCarouselModal 
              article={carouselArticle}
              isOpen={!!carouselArticle}
              onClose={() => setCarouselArticle(null)}
              darkMode={darkMode}
            />
          </Suspense>
        )}
      </AnimatePresence>

    </div>
  );
}
