import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  CheckCircle2,
  Clock,
  FileText,
  Radio,
  Compass,
  Activity,
  Layers,
  Shield,
  Target,
  Users
} from 'lucide-react';

import { EXPLAINERS_DATA, DEAL_SIGNALS_DATA, ALL_ARTICLES } from './articlesData';
import { ActiveTab, Article } from './types';
import Navigation from './components/Navigation';
import ArticleModal from './components/ArticleModal';
import ApprovalGapDiagram from './components/ApprovalGapDiagram';
import HeroMechanismDiagram from './components/HeroMechanismDiagram';
import LensesPage from './components/LensesPage';

// Import assets
// @ts-ignore
import executionDeficitImg from './assets/images/execution_deficit_diagram_new_1782370523380.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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

  // URL Deep-linking Route Handler
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;

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
    return () => window.removeEventListener('popstate', handleUrlRoute);
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
                  {deal.imageUrl && (
                    <div 
                      className="w-full aspect-[16/9] overflow-hidden bg-brand-deep border-b border-brand-gold/20 relative group cursor-pointer" 
                      onClick={() => openArticle(deal)}
                    >
                      <img 
                        src={deal.imageUrl} 
                        alt={deal.shortTitle || deal.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2E]/60 via-transparent to-transparent opacity-80" />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2.5 py-1 border border-brand-gold/30">
                        {deal.category}
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold/80 tracking-wider">
                        {deal.date}
                      </span>
                    </div>
                    
                    <h2 
                      onClick={() => openArticle(deal)}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-4 hover:text-brand-gold cursor-pointer transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      {deal.shortTitle || deal.title}
                    </h2>
                    
                    <p className={`font-serif text-sm sm:text-base italic leading-relaxed mb-6 ${
                      darkMode ? 'text-white/90' : 'text-brand-charcoal/90'
                    }`}>
                      {deal.featuredSummary || deal.description}
                    </p>

                    {deal.pharmaSignalRead && (
                      <div className={`p-4 border-l-2 border-brand-gold text-xs font-serif leading-relaxed mb-4 ${
                        darkMode ? 'bg-white/[0.03] text-white/80' : 'bg-brand-gold-light/20 text-brand-primary/90'
                      }`}>
                        <strong className="font-mono text-[9px] uppercase text-brand-gold tracking-widest block mb-1">
                          Signal Mechanism
                        </strong>
                        {deal.pharmaSignalRead}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 sm:p-8 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                      <Clock size={12} strokeWidth={2.5} /> {deal.readTime}
                    </span>
                    <button
                      onClick={() => openArticle(deal)}
                      className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Read Deal Signal <ArrowRight size={12} />
                    </button>
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

          {/* SECTION 3 — START HERE */}
          <section 
            id="start-here"
            className={`py-6 sm:py-8 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061322] border-white/5' : 'bg-[#F4EFE6] border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                  START HERE
                </span>
                <div className="h-[1px] w-8 bg-brand-gold/40" />
              </div>

              {/* 3 Compact Orientation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Card 1: Explainers */}
                <div 
                  onClick={() => scrollToSection('latest-explainers-section')}
                  className={`px-4 py-3.5 border transition-all duration-200 flex items-center justify-between cursor-pointer group rounded-none ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="p-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/25 shrink-0">
                      <FileText size={15} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-serif text-base font-bold tracking-tight truncate group-hover:text-brand-gold transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}>
                        Explainers
                      </h3>
                      <p className={`font-sans text-xs truncate leading-snug ${
                        darkMode ? 'text-white/60' : 'text-brand-charcoal/70'
                      }`}>
                        Reusable mechanisms behind pharma BD decisions.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-brand-gold/80 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card 2: Deal Signals */}
                <div 
                  onClick={() => {
                    setActiveTab('DEAL SIGNALS');
                    window.history.pushState(null, '', '/deal-signals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-3.5 border transition-all duration-200 flex items-center justify-between cursor-pointer group rounded-none ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="p-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/25 shrink-0">
                      <Radio size={15} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-serif text-base font-bold tracking-tight truncate group-hover:text-brand-gold transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}>
                        Deal Signals
                      </h3>
                      <p className={`font-sans text-xs truncate leading-snug ${
                        darkMode ? 'text-white/60' : 'text-brand-charcoal/70'
                      }`}>
                        Public deals interpreted through decision lenses.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-brand-gold/80 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card 3: Lenses */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-3.5 border transition-all duration-200 flex items-center justify-between cursor-pointer group rounded-none ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="p-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/25 shrink-0">
                      <Compass size={15} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-serif text-base font-bold tracking-tight truncate group-hover:text-brand-gold transition-colors ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}>
                        Lenses
                      </h3>
                      <p className={`font-sans text-xs truncate leading-snug ${
                        darkMode ? 'text-white/60' : 'text-brand-charcoal/70'
                      }`}>
                        Vocabulary and mental models BD teams can reuse.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-brand-gold/80 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 — FEATURED EXPLAINER */}
          <section 
            id="featured-explainer-section"
            className={`py-14 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className={`p-8 sm:p-12 lg:p-14 border relative overflow-hidden shadow-2xl ${
                darkMode ? 'bg-[#08192C] border-brand-gold/40' : 'bg-[#FAF6EE] border-[#EADBCC]'
              }`}>
                {/* Top Gold Highlight Accent Line */}
                <div className="absolute top-0 left-0 w-24 h-[3px] bg-brand-gold" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  
                  {/* Left Column: 60% width on desktop */}
                  <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <span className="inline-block text-[11px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-4 px-3 py-1 border border-brand-gold/30 bg-brand-gold/10">
                      FEATURED EXPLAINER
                    </span>

                    <h2 className={`font-serif text-3.5xl sm:text-4.5xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.15] ${
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

                  {/* Right Column: 40% width on desktop */}
                  <div className="lg:col-span-5 w-full flex items-center justify-center">
                    <div className="w-full border border-brand-gold/30 p-3 sm:p-4 bg-[#051424]">
                      <ApprovalGapDiagram darkMode={true} />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* SECTION 5 — PHARMASIGNAL LENSES */}
          <section 
            id="lenses-section"
            className={`py-12 sm:py-16 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#081829] border-white/5' : 'bg-white border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="text-left max-w-3xl">
                  <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                    PROPRIETARY INTELLECTUAL PROPERTY
                  </span>
                  <h2 className={`font-serif text-3xl sm:text-4.5xl font-bold tracking-tight uppercase mb-2 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    PharmaSignal Lenses
                  </h2>
                  <div className="h-[2px] w-12 bg-brand-gold mb-3" />
                  <p className={`font-serif text-base sm:text-lg leading-relaxed italic ${
                    darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
                  }`}>
                    Reusable mental models for interpreting pharma BD decisions.
                  </p>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      setActiveTab('LENSES');
                      window.history.pushState(null, '', '/lenses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-sans tracking-widest font-bold text-brand-gold hover:text-white uppercase transition-colors flex items-center gap-2 cursor-pointer border border-brand-gold/30 hover:border-brand-gold px-4 py-3 bg-brand-gold/5"
                  >
                    View All Lenses <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* 6 Lens Cards: Desktop Grid / Mobile Horizontal Swipe Rail */}
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:overflow-visible sm:pb-0 items-stretch">
                
                {/* Tile 1: Approval Gap */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#approval-gap');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 01
                      </span>
                      <Compass size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Approval Gap
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      The distance between attractive opportunity and execution readiness.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "Where is internal alignment weakest?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tile 2: Execution Deficit */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#execution-deficit');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 02
                      </span>
                      <Shield size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Execution Deficit
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      The gap between signed agreement and realized value.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "What must be true after signing?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tile 3: Opportunity Creation */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#opportunity-creation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 03
                      </span>
                      <Layers size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Opportunity Creation
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      The upstream work that creates optionality before others see it.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "Are we creating opportunities or processing them?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tile 4: Route-to-Market Friction */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#route-to-market-friction');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 04
                      </span>
                      <Target size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Route-to-Market Friction
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      Market access, pricing and adoption barriers that erode value.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "What friction sits between approval and uptake?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tile 5: Governance Debt */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#governance-debt');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 05
                      </span>
                      <FileText size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Governance Debt
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      Future execution burden created by unclear decision rights.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "Where will ambiguity compound later?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Tile 6: Partner Capability Gap */}
                <div 
                  onClick={() => {
                    setActiveTab('LENSES');
                    window.history.pushState(null, '', '/lenses#partner-capability-gap');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group rounded-none min-w-[84%] sm:min-w-0 snap-start flex-shrink-0 ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2 py-0.5 border border-brand-gold/30 bg-brand-gold/10">
                        LENS 06
                      </span>
                      <Users size={16} className="text-brand-gold shrink-0" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight mb-2 group-hover:text-brand-gold transition-colors ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      Partner Capability Gap
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed mb-3 ${
                      darkMode ? 'text-white/75' : 'text-brand-charcoal/80'
                    }`}>
                      The gap between expected partner role and actual capability.
                    </p>
                    <div className={`p-2.5 border-l-2 border-brand-gold/60 my-2 ${
                      darkMode ? 'bg-white/5' : 'bg-brand-gold/5'
                    }`}>
                      <span className="block text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold mb-0.5">
                        Decision Question
                      </span>
                      <p className={`font-serif text-xs italic ${
                        darkMode ? 'text-white/90' : 'text-[#001B2A]'
                      }`}>
                        "Can this partner execute the role we are assigning?"
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <span>View Lens</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>

              {/* Subtle Swipe Discovery Hint for Mobile */}
              <div className="sm:hidden flex items-center justify-between text-[10px] font-mono text-brand-gold/70 mt-3 pt-2 border-t border-brand-gold/10">
                <span>6 PROPRIETARY LENSES</span>
                <span className="flex items-center gap-1 font-bold">Swipe to explore →</span>
              </div>

            </div>
          </section>

          {/* SECTION 6 — LATEST EXPLAINERS */}
          <section 
            id="latest-explainers-section" 
            className={`py-12 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-[#061526] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-left max-w-3xl mb-10 sm:mb-12">
                <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                  DECISION INTELLIGENCE BRIEFINGS
                </span>
                <h2 className={`font-serif text-3xl sm:text-4.5xl font-bold tracking-tight uppercase mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Latest Explainers
                </h2>
                <div className="h-[2px] w-12 bg-brand-gold mb-4" />
                <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                  darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
                }`}>
                  Decision intelligence briefings on the mechanisms that shape pharma BD outcomes.
                </p>
              </div>

              {/* 2-Column Grid of Non-Featured Explainers (No Duplication of Featured Approval Gap) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
                
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

          {/* SECTION 8 — DEAL SIGNALS */}
          <section 
            id="deal-signals-section"
            className={`py-12 sm:py-20 transition-colors duration-300 border-b ${
              darkMode ? 'bg-brand-deep border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                <div className="text-left max-w-3xl">
                  <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-2">
                    EMPIRICAL EVIDENCE
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
                    Public pharma BD deals interpreted through the mechanisms that create or destroy value.
                  </p>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      setActiveTab('DEAL SIGNALS');
                      window.history.pushState(null, '', '/deal-signals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-sans tracking-widest font-bold text-brand-gold hover:text-white uppercase transition-colors flex items-center gap-2 cursor-pointer border border-brand-gold/30 hover:border-brand-gold px-4 py-3 bg-brand-gold/5"
                  >
                    View All Deal Signals <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Rail on Mobile / 2-Column Grid on Desktop */}
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:pb-0 items-stretch">
                
                {/* Card 1: EMS / miRecule */}
                <div 
                  className={`p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full min-w-[88%] max-w-[88%] snap-start flex-shrink-0 lg:min-w-0 lg:max-w-none ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    {/* 1. Mechanism Label (Prominent Gold Outlined Pill) */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-block text-[11px] font-mono tracking-widest text-brand-gold font-bold uppercase px-3 py-1 border border-brand-gold/40 bg-brand-gold/10">
                        OPPORTUNITY CREATION
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold/70 tracking-wider">
                        AUGUST 2026
                      </span>
                    </div>
                    
                    {/* 2. Deal Title */}
                    <h3 
                      onClick={() => {
                        const art = DEAL_SIGNALS_DATA.find(a => a.id === 'ems-mirecule-upstream-collaboration') || DEAL_SIGNALS_DATA[0];
                        openArticle(art);
                      }}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 hover:text-brand-gold cursor-pointer transition-colors leading-snug ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      EMS Moves Upstream Before There Is a Product to License
                    </h3>
                    
                    {/* 3. Mechanism-focused summary */}
                    <p className={`font-sans text-sm leading-relaxed mb-6 ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                    }`}>
                      EMS enters the miRecule RNA collaboration before a finished asset exists. The signal: emerging-market partners can create opportunity by contributing capability upstream.
                    </p>
                  </div>
                  
                  {/* 4. Date/Read time & 5. Read Signal Button */}
                  <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                      <Clock size={12} strokeWidth={2.5} /> 6 MIN READ
                    </span>
                    <button
                      onClick={() => {
                        const art = DEAL_SIGNALS_DATA.find(a => a.id === 'ems-mirecule-upstream-collaboration') || DEAL_SIGNALS_DATA[0];
                        openArticle(art);
                      }}
                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Read Signal <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Card 2: GSK / Relation Therapeutics */}
                <div 
                  className={`p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full min-w-[88%] max-w-[88%] snap-start flex-shrink-0 lg:min-w-0 lg:max-w-none ${
                    darkMode 
                      ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/50' 
                      : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    {/* 1. Mechanism Label (Prominent Gold Outlined Pill) */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-block text-[11px] font-mono tracking-widest text-brand-gold font-bold uppercase px-3 py-1 border border-brand-gold/40 bg-brand-gold/10">
                        CAPABILITY-LED OPPORTUNITY CREATION
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold/70 tracking-wider">
                        JULY 2026
                      </span>
                    </div>
                    
                    {/* 2. Deal Title */}
                    <h3 
                      onClick={() => {
                        const art = ALL_ARTICLES.find(a => a.id === 'gsk-capability-led-opportunity-creation');
                        if (art) openArticle(art);
                      }}
                      className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 hover:text-brand-gold cursor-pointer transition-colors leading-snug ${
                        darkMode ? 'text-white' : 'text-[#001B2A]'
                      }`}
                    >
                      GSK Moves Opportunity Creation Upstream
                    </h3>
                    
                    {/* 3. Mechanism-focused summary */}
                    <p className={`font-sans text-sm leading-relaxed mb-6 ${
                      darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
                    }`}>
                      Relation will generate proprietary biological evidence rather than transfer a finished asset. The value depends on who controls the targets that emerge.
                    </p>
                  </div>
                  
                  {/* 4. Date/Read time & 5. Read Signal Button */}
                  <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                      <Clock size={12} strokeWidth={2.5} /> 2 MIN READ
                    </span>
                    <button
                      onClick={() => {
                        const art = ALL_ARTICLES.find(a => a.id === 'gsk-capability-led-opportunity-creation');
                        if (art) openArticle(art);
                      }}
                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Read Deal Signal <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Subtle Swipe Discovery Hint for Mobile */}
              <div className="lg:hidden flex items-center justify-between text-[10px] font-mono text-brand-gold/70 mt-3 pt-2 border-t border-brand-gold/10">
                <span>MECHANISM EVIDENCE</span>
                <span className="flex items-center gap-1 font-bold">Swipe to view all signals →</span>
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
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </nav>

              {/* Social Icons */}
              <div className="flex items-center space-x-3">
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

    </div>
  );
}
