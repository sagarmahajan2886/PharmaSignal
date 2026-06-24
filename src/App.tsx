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

import { EXPLAINERS_DATA } from './articlesData';
import { ActiveTab, Article } from './types';
import Navigation from './components/Navigation';
import ArticleModal from './components/ArticleModal';
import ApprovalGapDiagram from './components/ApprovalGapDiagram';

// Import our custom boardroom image
// @ts-ignore
import heroBoardroom from './assets/images/hero_boardroom_1781714962645.jpg';

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

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('pharmasignal_darkmode', String(next));
      return next;
    });
  };

  // Safe fetch for the unique live explainer
  const approvalGapArticle = EXPLAINERS_DATA.find(a => a.id === 'the-approval-gap') || EXPLAINERS_DATA[0];

  // Custom routing functions to support clean, deep-linked browser URLs for articles
  const openArticle = (art: Article) => {
    setSelectedArticle(art);
    window.history.pushState(null, '', `/explainers/${art.id}`);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.history.pushState(null, '', '/');
  };

  // URL Deep-linking Route Handler
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const explainerMatch = path.match(/^\/explainers\/([a-zA-Z0-9_-]+)/);
      if (explainerMatch) {
        const articleId = explainerMatch[1];
        const found = EXPLAINERS_DATA.find(a => a.id === articleId);
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
      alert('Please enter a valid work email address.');
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

      {/* 2. Hero / About PharmaSignal Section */}
      <section 
        id="about-section"
        className={`relative overflow-hidden py-16 sm:py-24 transition-colors duration-300 border-b ${
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
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-[1px] w-8 bg-brand-gold" />
                <span className="font-mono text-xs tracking-widest text-brand-gold font-bold uppercase">
                  DECISION INTELLIGENCE
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}
              >
                What is <span className="font-serif font-bold tracking-wider uppercase">PHARMA<span className="text-brand-gold">SIGNAL</span></span>?
              </motion.h1>
              <div className="h-[2px] w-12 bg-brand-gold mb-6" />

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`font-sans text-sm sm:text-base leading-relaxed max-w-2xl space-y-4 font-light ${
                  darkMode ? 'text-white/80' : 'text-brand-charcoal/80'
                }`}
              >
                <p>
                  PharmaSignal is a Decision Intelligence platform for Pharma Business Development.
                </p>
                <p>
                  We study the mechanisms that create and destroy value before, during, and after pharmaceutical transactions.
                </p>
                <p>
                  Built from practical experience across licensing, portfolio strategy, alliance management, and emerging markets.
                </p>
                <p className="font-bold text-brand-gold mt-6 leading-relaxed text-base sm:text-lg">
                  How Pharma Deals Really Work.<br />
                  Make Better Pharma BD Decisions.
                </p>
              </motion.div>

              {/* Fully Responsive Action Buttons - Appears after description on all screens, keeping native mobile stack order (under description, before image) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
              >
                <button
                  onClick={scrollToFeatured}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer rounded-none"
                >
                  Read The Approval Gap <ArrowRight size={14} className="top-[0.5px] relative" />
                </button>
                
                <button
                  onClick={scrollToNewsletter}
                  className={`w-full sm:w-auto px-8 py-4 bg-transparent font-sans text-xs tracking-widest font-bold uppercase transition-all duration-305 flex items-center justify-center cursor-pointer rounded-none border ${
                    darkMode 
                      ? 'border-white/35 text-white hover:bg-white hover:text-brand-primary hover:border-white' 
                      : 'border-[#EADBCC] text-brand-primary hover:bg-[#001B2A] hover:text-white hover:border-[#001B2A]'
                  }`}
                >
                  Subscribe Free
                </button>
              </motion.div>
            </div>

            {/* Right Column: Premium boardroom picture */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full h-[280px] sm:h-[400px] lg:h-[460px] order-2"
            >
              <div className={`absolute inset-0 border p-2 sm:p-3 relative z-10 w-full h-full ${
                darkMode ? 'border-brand-gold/20' : 'border-[#EADBCC]'
              }`}>
                <div className="relative w-full h-full overflow-hidden">
                  <div className={`absolute inset-0 z-10 bg-gradient-to-t ${
                    darkMode ? 'from-brand-primary' : 'from-[#FAF6EE]/60'
                  } via-transparent to-transparent`} />
                  
                  <img 
                    src={heroBoardroom} 
                    alt="Premium Pharmaceutical BD Boardroom" 
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  
                  <div className="absolute bottom-6 left-6 z-20 hidden sm:block">
                    <span className="font-mono text-[9px] tracking-widest text-[#D9A441] bg-brand-primary/80 py-1 px-2 border border-brand-gold/30 font-semibold block uppercase">
                      TOKYO • LONDON • NEW YORK
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-brand-gold/30 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-brand-gold/30 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Featured Explainer Section */}
      <section 
        id="featured-explainer-section" 
        className={`scroll-mt-20 py-16 sm:py-24 transition-colors duration-300 border-b ${
          darkMode ? 'bg-brand-deep border-white/5' : 'bg-white border-[#EADBCC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-3">
              FEATURED EXPLAINER
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight uppercase ${
              darkMode ? 'text-white' : 'text-[#001B2A]'
            }`}>
              The Approval Gap
            </h2>
            <div className="h-[2px] w-12 bg-brand-gold mx-auto mt-3" />
          </div>

          {/* Large Premium Featured Card Grid */}
          <div className={`overflow-hidden border transition-all duration-300 ${
            darkMode 
              ? 'bg-[#0A1A2E] border-white/10 hover:border-brand-gold/45' 
              : 'bg-[#FAF6EE] border-[#EADBCC] hover:border-brand-gold/60'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Copy Side (Desktop first, Mobile first on stack ordering automatically via order-1) */}
              <div className="p-6 sm:p-10 lg:p-14 lg:col-span-6 flex flex-col justify-between text-left order-1">
                <div>
                  <span className="inline-block text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-4 px-2 py-0.5 border border-brand-gold/30">
                    FEATURED EXPLAINER
                  </span>
                  
                  <h3 className={`font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    The Approval Gap
                  </h3>
                  
                  <p className="font-serif text-base sm:text-lg italic leading-relaxed mb-4 text-[#D9A441]">
                    Why attractive opportunities lose momentum long before a decision is made.
                  </p>

                  <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-6 ${
                    darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
                  }`}>
                    A foundational lens on the most common value leak in pharma deals.
                  </p>
                </div>

                {/* Mobile-only Diagram: Placed exactly under Description and before Read info and button as required */}
                <div className="block lg:hidden w-[95%] mx-auto mb-6">
                  <div className="p-1 border border-brand-gold/10 bg-brand-primary/[0.01]">
                    <ApprovalGapDiagram darkMode={darkMode} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-brand-gold/20">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-brand-gold font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} strokeWidth={2} /> 6–8 MIN READ
                    </span>
                  </div>

                  <button
                    onClick={() => openArticle(approvalGapArticle)}
                    className="px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    Read The Explainer <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Graphic / Image Side with actual Approval Gap Diagram (Visible only on desktop/tablet to keep optimized mobile stream) */}
              <div className={`hidden lg:flex lg:col-span-6 p-6 sm:p-8 lg:p-12 flex-col justify-between border-l ${
                darkMode ? 'border-white/10 bg-[#071424]' : 'border-[#EADBCC] bg-white'
              } order-2 w-full`}>
                <div className="w-full h-full flex flex-col justify-center">
                  <div className="p-2 sm:p-4 border border-brand-gold/10 bg-brand-primary/[0.02]">
                    <ApprovalGapDiagram darkMode={darkMode} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Foundational Lenses Section */}
      <section 
        className={`py-16 sm:py-24 transition-colors duration-300 border-b ${
          darkMode ? 'bg-[#06131F] border-white/5' : 'bg-[#FAF6EE] border-[#EADBCC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14 animate-fade-in-up">
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight uppercase ${
              darkMode ? 'text-white' : 'text-brand-primary'
            }`}>
              FOUNDATIONAL LENSES
            </h2>
            <div className="h-[2px] w-12 bg-brand-gold mx-auto mt-3" />
          </div>

          {/* 4 Lenses beautiful layout matching reference grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Card 1: Stakeholder Alignment */}
            <div className={`p-8 border flex flex-col justify-between items-center text-center relative rounded-none hover:border-brand-gold/50 transition-all duration-300 ${
              darkMode ? 'bg-[#0A1A2E] border-white/10' : 'bg-white border-[#EADBCC]'
            }`}>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 bg-brand-gold/5 text-brand-gold">
                  <Users size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-serif text-xl font-bold tracking-tight mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Stakeholder Alignment
                </h3>
                
                <p className={`font-sans text-xs sm:text-[13px] leading-relaxed mb-6 ${
                  darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                }`}>
                  Why attractive opportunities lose momentum before decisions are made.
                </p>
              </div>
              <button 
                onClick={scrollToFeatured}
                className="text-[11px] font-mono font-bold text-brand-gold hover:text-brand-gold-hover tracking-wider uppercase transition-colors flex items-center gap-1 px-3 py-1 bg-transparent hover:bg-brand-gold/5"
              >
                LEARN MORE <ArrowRight size={12} />
              </button>
            </div>

            {/* Card 2: Execution Fragility */}
            <div className={`p-8 border flex flex-col justify-between items-center text-center relative rounded-none hover:border-brand-gold/50 transition-all duration-300 ${
              darkMode ? 'bg-[#0A1A2E] border-white/10' : 'bg-white border-[#EADBCC]'
            }`}>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 bg-brand-gold/5 text-brand-gold">
                  <Shield size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-serif text-xl font-bold tracking-tight mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Execution Fragility
                </h3>
                
                <p className={`font-sans text-xs sm:text-[13px] leading-relaxed mb-6 ${
                  darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                }`}>
                  Why commercially viable assets fail after signing.
                </p>
              </div>
              <button 
                onClick={scrollToFeatured}
                className="text-[11px] font-mono font-bold text-brand-gold hover:text-brand-gold-hover tracking-wider uppercase transition-colors flex items-center gap-1 px-3 py-1 bg-transparent hover:bg-brand-gold/5"
              >
                LEARN MORE <ArrowRight size={12} />
              </button>
            </div>

            {/* Card 3: Market Structure */}
            <div className={`p-8 border flex flex-col justify-between items-center text-center relative rounded-none hover:border-brand-gold/50 transition-all duration-300 ${
              darkMode ? 'bg-[#0A1A2E] border-white/10' : 'bg-white border-[#EADBCC]'
            }`}>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 bg-brand-gold/5 text-brand-gold">
                  <BarChart2 size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-serif text-xl font-bold tracking-tight mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Market Structure
                </h3>
                
                <p className={`font-sans text-xs sm:text-[13px] leading-relaxed mb-6 ${
                  darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                }`}>
                  Why local market realities shape outcomes more than pricing assumptions.
                </p>
              </div>
              <button 
                onClick={scrollToFeatured}
                className="text-[11px] font-mono font-bold text-brand-gold hover:text-brand-gold-hover tracking-wider uppercase transition-colors flex items-center gap-1 px-3 py-1 bg-transparent hover:bg-brand-gold/5"
              >
                LEARN MORE <ArrowRight size={12} />
              </button>
            </div>

            {/* Card 4: Deal Governance */}
            <div className={`p-8 border flex flex-col justify-between items-center text-center relative rounded-none hover:border-brand-gold/50 transition-all duration-300 ${
              darkMode ? 'bg-[#0A1A2E] border-white/10' : 'bg-white border-[#EADBCC]'
            }`}>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 bg-brand-gold/5 text-brand-gold">
                  <Compass size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-serif text-xl font-bold tracking-tight mb-3 ${
                  darkMode ? 'text-white' : 'text-[#001B2A]'
                }`}>
                  Deal Governance
                </h3>
                
                <p className={`font-sans text-xs sm:text-[13px] leading-relaxed mb-6 ${
                  darkMode ? 'text-white/60' : 'text-brand-charcoal/60'
                }`}>
                  Why governance failures are often designed before signing.
                </p>
              </div>
              <button 
                onClick={scrollToFeatured}
                className="text-[11px] font-mono font-bold text-brand-gold hover:text-brand-gold-hover tracking-wider uppercase transition-colors flex items-center gap-1 px-3 py-1 bg-transparent hover:bg-brand-gold/5"
              >
                LEARN MORE <ArrowRight size={12} />
              </button>
            </div>

          </div>

          <div className="text-center mt-12">
            <span className={`font-mono text-xs tracking-widest font-semibold transition-all uppercase ${
              darkMode ? 'text-white/50' : 'text-brand-charcoal/50'
            }`}>
              More lenses coming soon
            </span>
          </div>

        </div>
      </section>

      {/* 5. Newsletter Section */}
      <section 
        id="newsletter-section" 
        className={`scroll-mt-20 py-16 sm:py-24 transition-colors duration-300 ${
          darkMode ? 'bg-brand-deep' : 'bg-white'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 sm:p-12 md:p-14 rounded-none shadow-xl relative overflow-hidden border ${
              darkMode ? 'bg-[#0A1A2E] text-white border-brand-gold/30' : 'bg-[#FAF6EE] text-[#111827] border-[#EADBCC]'
            }`}
          >
            {/* Hostinger Reach tracking div embedded as required */}
            <div data-reach-form="9e6723a1-8c92-43c1-8369-5501a6d91ba1" style={{ display: 'none' }} className="hidden"></div>

            {/* Grid graphic background effect */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#808080_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              
              {/* Text side with mail icon */}
              <div className="md:col-span-12 lg:col-span-7 flex items-start gap-4 sm:gap-6 w-full">
                <div className="h-14 w-14 rounded-full border border-brand-gold/45 flex items-center justify-center bg-brand-gold/5 shrink-0 hidden sm:flex">
                  <Mail className="text-brand-gold" size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className={`font-serif text-2xl sm:text-3.5xl font-bold tracking-tight mb-2 ${
                    darkMode ? 'text-white' : 'text-[#001B2A]'
                  }`}>
                    One Pharma BD Insight Worth Saving
                  </h2>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${
                    darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
                  }`}>
                    Practical insights on what creates and destroys value in pharmaceutical business development.
                  </p>
                </div>
              </div>

              {/* Input subscription side */}
              <div className="md:col-span-12 lg:col-span-5 w-full">
                <AnimatePresence mode="wait">
                  {!subscribedMessage ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubscribe}
                      className="space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          disabled={subscribing}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Your work email"
                          className={`w-full px-4 py-3.5 text-xs font-sans border outline-none transition-colors rounded-none ${
                            darkMode 
                              ? 'bg-[#06131F] border-white/10 text-white placeholder:text-white/40 focus:border-brand-gold/85' 
                              : 'bg-white border-[#EADBCC] text-brand-charcoal placeholder:text-brand-charcoal/40 focus:border-brand-gold/85'
                          } ${subscribing ? 'opacity-65 cursor-not-allowed' : ''}`}
                        />
                        <button
                          type="submit"
                          disabled={subscribing}
                          className={`px-6 py-3.5 bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors text-xs font-sans tracking-widest font-bold whitespace-nowrap uppercase rounded-none ${
                            subscribing ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        >
                          {subscribing ? 'Submitting...' : 'Subscribe Free'}
                        </button>
                      </div>

                      {subscribeError && (
                        <div className="text-xs text-red-500 font-sans mt-1 text-left">
                          {subscribeError}
                        </div>
                      )}

                      {/* Small reassurance */}
                      <div className="text-[11px] font-mono text-brand-gold/80 font-medium tracking-wide text-left sm:text-center">
                        No spam. Unsubscribe anytime.
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 px-4 border border-brand-gold/30 bg-brand-gold/5 text-center flex flex-col items-center justify-center space-y-2"
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

      {/* 6. Footer Section */}
      <footer className={`pt-16 pb-8 border-t relative z-10 ${
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
                <span className="block text-[10px] font-mono tracking-widest text-brand-gold uppercase font-semibold mt-1">
                  Decision Intelligence for Pharma Business Development
                </span>
              </div>
            </div>

            {/* Center Motto Paragraph Col */}
            <div className="md:col-span-4 text-center w-full">
              <span className="font-serif text-base sm:text-lg italic text-brand-gold font-semibold tracking-wide block">
                How Pharma Deals Really Work.
              </span>
              <span className={`block text-[11px] font-mono mt-1 uppercase tracking-wider ${darkMode ? 'text-white/30' : 'text-brand-charcoal/40'}`}>
                © 2026 PharmaSignal. All rights reserved.
              </span>
            </div>

            {/* Right Links & Social Col */}
            <div className="md:col-span-4 flex flex-col md:items-end justify-center text-left md:text-right space-y-4 w-full">
              <nav className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider">
                <button 
                  onClick={scrollToFeatured}
                  className="hover:text-brand-gold transition-colors block py-0.5 cursor-pointer"
                >
                  Explainers
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
          />
        )}
      </AnimatePresence>

    </div>
  );
}
