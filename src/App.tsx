import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Twitter, 
  CheckCircle2,
  Clock,
  Users,
  Shield,
  BarChart2,
  Compass
} from 'lucide-react';

import { EXPLAINERS_DATA, DEAL_SIGNALS_DATA, ALL_ARTICLES } from './articlesData';
import { ActiveTab, Article } from './types';
import Navigation from './components/Navigation';
import ArticleModal from './components/ArticleModal';
import ApprovalGapDiagram from './components/ApprovalGapDiagram';
import ExecutionDeficitDiagram from './components/ExecutionDeficitDiagram';
import HeroMechanismDiagram from './components/HeroMechanismDiagram';

// Import our custom images
// @ts-ignore
import heroBoardroom from './assets/images/hero_boardroom_1781714962645.jpg';
// @ts-ignore
import executionDeficitImg from './assets/images/execution_deficit_diagram_new_1782370523380.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('EXPLAINERS');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pharmasignal_darkmode');
    return saved === null ? true : saved === 'true';
  });

  const [featuredTab, setFeaturedTab] = useState<'approval' | 'execution'>('approval');

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('pharmasignal_darkmode', String(next));
      return next;
    });
  };

  // Safe fetch for the unique live explainer
  const approvalGapArticle = EXPLAINERS_DATA.find(a => a.id === 'the-approval-gap') || EXPLAINERS_DATA[0];
  const executionDeficitArticle = EXPLAINERS_DATA.find(a => a.id === 'execution-deficit') || EXPLAINERS_DATA[0];

  // Custom routing functions to support clean, deep-linked browser URLs for articles
  const openArticle = (art: Article) => {
    setSelectedArticle(art);
    const prefix = art.isDealSignal ? '/deal-signals' : '/explainers';
    window.history.pushState(null, '', `${prefix}/${art.id}`);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    if (activeTab === 'DEAL SIGNALS' || window.location.pathname.startsWith('/deal-signals')) {
      window.history.pushState(null, '', '/deal-signals');
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

      const explainerMatch = path.match(/^\/explainers\/([a-zA-Z0-9_-]+)/);
      if (explainerMatch) {
        const articleId = explainerMatch[1];
        const found = ALL_ARTICLES.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          return;
        }
      }

      const dealMatch = path.match(/^\/deal-signals\/([a-zA-Z0-9_-]+)/);
      if (dealMatch) {
        const articleId = dealMatch[1];
        const found = ALL_ARTICLES.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          return;
        }
      }

      setSelectedArticle(null);
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

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

      // Store subscriber info in localStorage as backup/history
      const currentSubscribers = JSON.parse(localStorage.getItem('pharmasignal_subscribers') || '[]');
      const newSub = { email: emailToSubmit, timestamp: new Date().toISOString() };
      localStorage.setItem('pharmasignal_subscribers', JSON.stringify([...currentSubscribers, newSub]));
      
      setNewsEmail('');
      setSubscribedMessage(true);
      
      // Auto dismiss success message after 8 seconds
      setTimeout(() => {
        setSubscribedMessage(false);
      }, 8000);
    } catch (err: any) {
      console.error(err);
      setSubscribeError('Could not process subscription. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-explainer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle active navigation highlighting based on scroll position or manual override
  const handleNavHighlight = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-gold selection:text-brand-primary transition-colors duration-300 ${
      darkMode ? 'bg-brand-deep text-white' : 'bg-[#FAF6EE] text-[#111827]'
    }`}>
      
      {/* 1. Header / Navigation */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={handleNavHighlight} 
        onSubscribeClick={scrollToNewsletter}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Dedicated Deal Signals Page View when activeTab === 'DEAL SIGNALS' */}
      {activeTab === 'DEAL SIGNALS' ? (
        <section 
          id="deal-signals-page"
          className={`py-14 sm:py-20 transition-colors duration-300 border-b ${
            darkMode ? 'bg-[#061526] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-12">
              <h1 className={`font-serif text-3.5xl sm:text-5xl font-bold tracking-tight uppercase mb-4 ${
                darkMode ? 'text-white' : 'text-[#001B2A]'
              }`}>
                Deal Signals
              </h1>
              <div className="h-[2px] w-12 bg-brand-gold mt-2 mb-4" />
              <p className={`font-serif text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
              }`}>
                A weekly PharmaSignal filter on pharma BD deals, partnerships and licensing activity — focused on what each deal reveals about execution, market access, partner capability and value creation.
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
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2.5 py-1 border border-brand-gold/30">
                        {deal.category}
                      </span>
                      <span className="text-[10px] font-mono text-brand-gold/80 tracking-wider">
                        {deal.date}
                      </span>
                    </div>
                    
                    <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-4 ${
                      darkMode ? 'text-white' : 'text-[#001B2A]'
                    }`}>
                      {deal.title}
                    </h2>
                    
                    <p className={`font-serif text-sm sm:text-base italic leading-relaxed mb-6 ${
                      darkMode ? 'text-white/90' : 'text-brand-charcoal/90'
                    }`}>
                      {deal.description}
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
        <>
          {/* 2. Hero / About PharmaSignal Section */}
          <section 
            id="about-section"
            className={`relative overflow-hidden py-10 sm:py-16 transition-colors duration-300 border-b ${
              darkMode ? 'bg-brand-deep border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
            }`}
          >
        {/* Subtle geometric overlay lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Premium executive copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left lg:pr-4 order-1 w-full">
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
                className="font-serif text-3.5xl sm:text-5xl lg:text-5.5xl font-bold tracking-tight leading-tight mb-3"
              >
                <span className="bg-[linear-gradient(120deg,#FAF6EE_20%,#D9A441_100%)] bg-clip-text text-transparent">
                  What is PharmaSignal?
                </span>
              </motion.h1>
              <div className="h-[2px] w-12 bg-brand-gold mb-4" />

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`font-sans text-base sm:text-lg leading-relaxed max-w-2xl space-y-3 font-normal ${
                  darkMode ? 'text-white' : 'text-brand-charcoal'
                }`}
              >
                <p className="font-bold text-lg sm:text-xl leading-snug text-white">
                  Decoding how deal value is <span className="text-brand-gold">created and destroyed</span> in biopharma licensing.
                </p>
                <p className="text-base sm:text-[17px] text-white/90 leading-relaxed">
                  We analyze licensing mechanisms, partner selection, execution risk, and value leakage across all deal stages.
                </p>
                <p className={`text-xs sm:text-sm border-l-2 border-brand-gold pl-3.5 py-0.5 italic ${
                  darkMode ? 'text-brand-gold/90' : 'text-brand-primary'
                }`}>
                  Built from practical BD experience and decision-focused explainers.
                </p>
              </motion.div>

              {/* Fully Responsive Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
              >
                <button
                  onClick={scrollToFeatured}
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer rounded-none"
                >
                  Read Latest Explainers <ArrowRight size={14} className="top-[0.5px] relative" />
                </button>
                
                <button
                  onClick={scrollToNewsletter}
                  className={`w-full sm:w-auto px-6 py-3.5 bg-transparent font-sans text-xs tracking-widest font-bold uppercase transition-all duration-305 flex items-center justify-center cursor-pointer rounded-none border ${
                    darkMode 
                      ? 'border-white/35 text-white hover:bg-white hover:text-brand-primary hover:border-white' 
                      : 'border-[#EADBCC] text-brand-primary hover:bg-[#001B2A] hover:text-white hover:border-[#001B2A]'
                  }`}
                >
                  Subscribe Free
                </button>
              </motion.div>
            </div>

            {/* Right Column: PharmaSignal Mechanism Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full h-[240px] sm:h-[320px] lg:h-[360px] order-2"
            >
              <div className={`absolute inset-0 border p-2 sm:p-3 relative z-10 w-full h-full ${
                darkMode ? 'border-brand-gold/20' : 'border-[#EADBCC]'
              }`}>
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#071A2E]">
                  <HeroMechanismDiagram darkMode={darkMode} />
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-brand-gold/30 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-brand-gold/30 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Latest Explainers Section */}
      <section 
        id="featured-explainer-section" 
        className={`scroll-mt-20 py-12 sm:py-20 transition-colors duration-300 border-b ${
          darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
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
            <p className={`font-serif text-base sm:text-[17px] leading-relaxed ${
              darkMode ? 'text-white/85' : 'text-brand-charcoal/85'
            }`}>
              Decision intelligence briefings on the mechanisms that shape pharma BD outcomes.
            </p>
          </div>

          {/* Side-by-Side Premium Briefing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* Card 1: The Approval Gap */}
            <div className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
              darkMode 
                ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
            }`}>
              <div>
                {/* Graphic Side */}
                <div className={`h-48 sm:h-56 lg:h-60 flex items-center justify-center p-3 sm:p-4 border-b overflow-hidden bg-brand-primary/[0.02] ${
                  darkMode ? 'border-white/10' : 'border-[#EADBCC]'
                }`}>
                  <div className="w-full max-w-sm h-full flex items-center justify-center overflow-hidden">
                    <ApprovalGapDiagram darkMode={darkMode} />
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="p-5 sm:p-6">
                  <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-3 px-2 py-0.5 border border-brand-gold/30">
                    APPROVAL GAP
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    The Approval Gap
                  </h3>
                  <p className={`font-serif text-[15px] sm:text-base italic leading-relaxed ${
                    darkMode ? 'text-white/95' : 'text-brand-charcoal/95'
                  }`}>
                    Why commercially attractive pharma BD opportunities often slow down before approval — not because the opportunity is weak, but because internal decision readiness is misaligned.
                  </p>
                </div>
              </div>
              
              <div className="p-5 sm:p-6 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                  <Clock size={12} strokeWidth={2.5} /> 7 MIN READ
                </span>
                <button
                  onClick={() => openArticle(approvalGapArticle)}
                  className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Read Explainer <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Card 2: A Signed Deal Is Not an Executed Deal */}
            <div className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
              darkMode 
                ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
            }`}>
              <div>
                {/* Graphic Side */}
                <div className={`h-48 sm:h-56 lg:h-60 flex items-center justify-center p-3 sm:p-4 border-b overflow-hidden bg-brand-primary/[0.02] ${
                  darkMode ? 'border-white/10' : 'border-[#EADBCC]'
                }`}>
                  <div className="w-full max-w-sm h-full flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                    <img 
                      src={executionDeficitImg} 
                      alt="Execution Deficit Diagram" 
                      className="w-full h-full object-contain shadow-sm border border-brand-gold/20 rounded-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="p-5 sm:p-6">
                  <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-3 px-2 py-0.5 border border-brand-gold/30">
                    EXECUTION DEFICIT
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    A Signed Deal Is Not an Executed Deal
                  </h3>
                  <p className={`font-serif text-[15px] sm:text-base italic leading-relaxed ${
                    darkMode ? 'text-white/95' : 'text-brand-charcoal/95'
                  }`}>
                    Why the transition from agreement to execution is the most vulnerable phase of a pharma transaction.
                  </p>
                </div>
              </div>
              
              <div className="p-5 sm:p-6 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                  <Clock size={12} strokeWidth={2.5} /> 7 MIN READ
                </span>
                <button
                  onClick={() => openArticle(executionDeficitArticle)}
                  className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Read Explainer <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3.5 Deal Signals Section */}
      <section 
        id="deal-signals-section"
        className={`scroll-mt-20 py-8 sm:py-10 transition-colors duration-300 border-b ${
          darkMode ? 'bg-[#061526] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
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
              <p className={`font-serif text-base sm:text-[17px] leading-relaxed ${
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
                className="text-xs font-sans tracking-widest font-bold text-brand-gold hover:text-white uppercase transition-colors flex items-center gap-2 cursor-pointer border border-brand-gold/30 hover:border-brand-gold px-4 py-2.5 bg-brand-gold/5"
              >
                View All Deal Signals <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Grid displaying MAX 2 Deal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {DEAL_SIGNALS_DATA.slice(0, 2).map((deal) => (
              <div 
                key={deal.id}
                className={`overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left rounded-none h-full ${
                  darkMode 
                    ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
                    : 'bg-white border-[#EADBCC] hover:border-brand-gold/60'
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase px-2.5 py-1 border border-brand-gold/30">
                      {deal.category}
                    </span>
                    <span className="text-[10px] font-mono text-brand-gold/80 tracking-wider">
                      {deal.date}
                    </span>
                  </div>
                  
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    {deal.title}
                  </h3>
                  
                  <p className={`font-serif text-[15px] sm:text-base italic leading-relaxed ${
                    darkMode ? 'text-white/95' : 'text-brand-charcoal/95'
                  }`}>
                    {deal.description}
                  </p>
                </div>
                
                <div className="p-5 sm:p-6 pt-0 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase">
                    <Clock size={12} strokeWidth={2.5} /> {deal.readTime.toUpperCase()}
                  </span>
                  <button
                    onClick={() => openArticle(deal)}
                    className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Read Deal Signal <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* 4. Compact Subscribe Section */}
      <section 
        id="newsletter-section" 
        className={`scroll-mt-20 py-6 sm:py-8 transition-colors duration-300 border-b ${
          darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-5 sm:p-7 rounded-none shadow-xl relative overflow-hidden border text-center ${
              darkMode ? 'bg-[#0A1A2E] text-white border-brand-gold/30' : 'bg-[#FAF6EE] text-[#111827] border-[#EADBCC]'
            }`}
          >
            {/* Hostinger Reach tracking div embedded as required */}
            <div data-reach-form="9e6723a1-8c92-43c1-8369-5501a6d91ba1" style={{ display: 'none' }} className="hidden"></div>

            {/* Grid graphic background effect */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#808080_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-3">
              <span className="text-brand-gold font-mono text-xs font-bold block tracking-widest uppercase">
                PHARMASIGNAL BRIEFINGS
              </span>
              <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-[#001B2A]'
              }`}>
                One Pharma BD Insight Worth Saving
              </h2>
              <div className="h-[2px] w-12 bg-brand-gold" />
              
              <p className={`font-serif text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-white/80' : 'text-brand-charcoal/85'
              }`}>
                Practical insights on the mechanisms that create and destroy value in pharmaceutical business development.
              </p>

              <div className="w-full max-w-md pt-1">
                <AnimatePresence mode="wait">
                  {!subscribedMessage ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubscribe}
                      className="space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          disabled={subscribing}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Your work email"
                          className={`w-full px-4 py-2.5 text-sm font-sans border outline-none transition-colors rounded-none ${
                            darkMode 
                              ? 'bg-[#0A1A2E] border-white/10 text-white placeholder:text-white/40 focus:border-brand-gold/85' 
                              : 'bg-white border-[#EADBCC] text-[#111827] placeholder:text-[#111827]/40 focus:border-brand-gold/85'
                          } ${subscribing ? 'opacity-65 cursor-not-allowed' : ''}`}
                        />
                        <button
                          type="submit"
                          disabled={subscribing}
                          className={`w-full sm:w-auto px-5 py-2.5 bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors text-xs font-sans tracking-widest font-bold whitespace-nowrap uppercase rounded-none ${
                            subscribing ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer'
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
                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
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

          </motion.div>
        </div>
      </section>

      {/* 5. Footer Section */}
      <footer className={`pt-8 pb-6 border-t relative z-10 ${
        darkMode ? 'bg-brand-deep text-white border-white/5' : 'bg-[#FAF6EE] text-[#111827] border-[#EADBCC]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-brand-gold/20 items-center">
            
            {/* Left Brand Col */}
            <div className="md:col-span-4 flex flex-col space-y-1 text-left w-full">
              <div>
                <span className={`font-serif text-2xl font-bold tracking-wider ${darkMode ? 'text-white' : 'text-brand-primary'}`}>
                  PHARMA<span className="text-brand-gold">SIGNAL</span>
                </span>
                <span className="block text-[11px] font-mono tracking-widest text-brand-gold uppercase font-semibold mt-1">
                  Decision Intelligence for Pharma Business Development
                </span>
              </div>
            </div>

            {/* Center Motto Paragraph Col */}
            <div className="md:col-span-4 text-center w-full">
              <span className="font-serif text-base sm:text-lg italic text-brand-gold font-semibold tracking-wide block">
                How Pharma Deals Really Work.
              </span>
              <span className={`block text-xs font-mono mt-1 uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-brand-charcoal/60'}`}>
                © 2026 PharmaSignal. All rights reserved.
              </span>
            </div>

            {/* Right Links & Social Col */}
            <div className="md:col-span-4 flex flex-col md:items-end justify-center text-left md:text-right space-y-4 w-full">
              <nav className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-xs font-sans font-bold uppercase tracking-wider">
                <button 
                  onClick={scrollToFeatured}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Explainers
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('deal-signals-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Deal Signals
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  About
                </button>
                <button 
                  onClick={scrollToNewsletter}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Newsletter
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Terms of Use
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

      {/* Floating Reader Modal / Drawer for Explainers */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={closeArticle} 
            darkMode={darkMode}
            onSelectArticleId={(id) => {
              const art = EXPLAINERS_DATA.find(a => a.id === id);
              if (art) setSelectedArticle(art);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
