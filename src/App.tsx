import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Check, 
  Linkedin, 
  Twitter, 
  ChevronRight,
  BookOpen,
  Filter,
  ArrowUpRight,
  Award,
  Users,
  Search,
  CheckCircle2
} from 'lucide-react';

import { EXPLAINERS_DATA } from './articlesData';
import { ActiveTab, Article } from './types';
import Navigation from './components/Navigation';
import ArticleModal from './components/ArticleModal';
import AudienceGrid from './components/AudienceGrid';
import CredibilityStrip from './components/CredibilityStrip';
import AboutSection from './components/AboutSection';

// Import our custom board room image and manage fallback elegantly if needed
// @ts-ignore
import heroBoardroom from './assets/images/hero_boardroom_1781714962645.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsEmail, setNewsEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('pharmasignal_darkmode') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('pharmasignal_darkmode', String(next));
      return next;
    });
  };

  const handleSubscribe = (e: FormEvent, emailValue: string, setter: (val: string) => void) => {

    e.preventDefault();
    if (!emailValue || !emailValue.includes('@')) {
      alert('Please enter a valid work email address.');
      return;
    }
    
    // Store subscriber info in localStorage
    const currentSubscribers = JSON.parse(localStorage.getItem('pharmasignal_subscribers') || '[]');
    const newSub = { email: emailValue, timestamp: new Date().toISOString() };
    localStorage.setItem('pharmasignal_subscribers', JSON.stringify([...currentSubscribers, newSub]));
    
    setter('');
    setSubscribedMessage(true);
    setTimeout(() => {
      setSubscribedMessage(false);
    }, 6000);

    // Smooth scroll check to newsletter card if needed
    const el = document.getElementById('newsletter-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter explainers
  const filteredExplainers = EXPLAINERS_DATA.filter(art => {
    const matchesCategory = selectedCategoryFilter === 'ALL' || art.category === selectedCategoryFilter;
    const matchesQuery = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = ['ALL', 'LICENSING STRATEGY', 'EVIDENCE & DEVELOPMENT', 'COMMERCIAL STRATEGY'];

  const scrollToNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-gold selection:text-brand-primary transition-colors duration-300 ${
      darkMode ? 'bg-brand-deep text-white' : 'bg-brand-offwhite text-brand-charcoal'
    }`}>
      
      {/* 1. Header / Navigation */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSubscribeClick={scrollToNewsletter}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* 2. Hero Section */}
      <section className="bg-brand-primary text-white relative overflow-hidden py-20 sm:py-28 md:py-32">
        {/* Subtle geometric overlay lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Premium copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left lg:pr-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-[1px] w-8 bg-brand-gold" />
                <span className="font-mono text-xs tracking-widest text-brand-gold font-bold uppercase">
                  WE EXPLAIN
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
              >
                What Creates <span className="text-brand-gold font-style-normal">Value</span><br />
                in Pharma BD
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-white/80 max-w-2xl mb-10 font-light"
              >
                We explain why licensing deals succeed or fail, how asset value is created, and what drives strategic commercial outcomes.<br className="hidden sm:inline" />
                <span className="font-medium text-white block mt-3">
                  Clear analysis. Practical frameworks. Actionable insights.
                </span>
                For leaders who make high-stakes portfolio decisions.
              </motion.p>

              {/* Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => setSelectedArticle(EXPLAINERS_DATA[0])}
                  className="px-8 py-4 bg-brand-gold text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-brand-gold-hover hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-3 cursor-pointer rounded-none"
                >
                  READ LATEST EXPLAINER <ArrowRight size={14} className="top-[0.5px] relative" />
                </button>
                
                <button
                  onClick={scrollToNewsletter}
                  className="px-8 py-4 bg-transparent border border-white/35 text-white font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-white hover:text-brand-primary hover:border-white hover:-translate-y-0.5 flex items-center justify-center cursor-pointer rounded-none"
                >
                  SUBSCRIBE FREE
                </button>
              </motion.div>
            </div>

            {/* Right Column: Premium corporate image with a dark gradient blend */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full h-[320px] sm:h-[450px] lg:h-[500px]"
            >
              {/* Outer border container */}
              <div className="absolute inset-0 border border-brand-gold/20 p-2 sm:p-3 relative z-10 w-full h-full">
                <div className="relative w-full h-full overflow-hidden">
                  {/* Blending Overlay - Left and Bottom Gradient Cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 via-transparent to-transparent z-10" />
                  
                  {/* Real boardroom image derived via Gemini Image Generation */}
                  <img 
                    src={heroBoardroom} 
                    alt="Premium Pharmaceutical BD Boardroom overlooking global skyline" 
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback in case of asset fetch failures
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  
                  {/* Embedded editorial overlay mark */}
                  <div className="absolute bottom-6 left-6 z-20 hidden sm:block">
                    <span className="font-mono text-[9px] tracking-widest text-[#D9A441] bg-brand-primary/85 py-1 px-2 border border-brand-gold/30 font-semibold block uppercase">
                      TOKYO • LONDON • NEW YORK
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative design nodes */}
              <div className="absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-brand-gold/30 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-brand-gold/30 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Built for Decision Makers Section */}
      <section className={`py-20 sm:py-24 lg:py-28 transition-colors duration-300 ${
        darkMode ? 'bg-[#06131F]' : 'bg-brand-offwhite'
      }`} id="decision-makers-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-3">
              TARGET AUDIENCE
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase ${
              darkMode ? 'text-white' : 'text-brand-primary'
            }`}>
              BUILT FOR DECISION MAKERS
            </h2>
            <div className="h-[2px] w-12 bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Interactive Horizontal Cards Grid */}
          <AudienceGrid darkMode={darkMode} />

          {/* 4. Credibility Strip */}
          <CredibilityStrip />

        </div>
      </section>

      {/* 5. Latest Explainers Section */}
      <section className={`py-20 sm:py-24 transition-colors duration-300 ${
        darkMode ? 'bg-brand-deep' : 'bg-brand-offwhite'
      }`} id="latest-explainers-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header row */}
          <div className={`flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b pb-6 mb-12 ${
            darkMode ? 'border-white/10' : 'border-brand-border'
          }`}>
            <div>
              <h2 className={`text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-3 ${
                darkMode ? 'text-white' : 'text-brand-charcoal'
              }`}>
                Latest Explainers <span className={`h-px w-24 hidden sm:inline-block ${darkMode ? 'bg-white/15' : 'bg-brand-charcoal/20'}`}></span>
              </h2>
            </div>
            
            <a 
              href="#latest-explainers-section" 
              onClick={() => {
                setSelectedCategoryFilter('ALL');
                setSearchQuery('');
              }}
              className={`text-[10px] font-sans font-black tracking-widest text-[#D9A441] transition-colors uppercase flex items-center gap-2 group ${
                darkMode ? 'hover:text-white' : 'hover:text-brand-primary'
              }`}
            >
              View All Explainers <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Search and Category Filters */}
          <div className="mb-10 flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-4 py-2 text-[11px] font-sans font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    selectedCategoryFilter === cat
                      ? darkMode
                        ? 'bg-brand-gold text-brand-primary border border-brand-gold'
                        : 'bg-brand-primary text-white border border-brand-primary'
                      : darkMode
                        ? 'bg-[#112538] text-white/70 border border-white/10 hover:bg-brand-gold/10'
                        : 'bg-brand-offwhite text-brand-charcoal/70 border border-brand-border hover:bg-brand-gold/10'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL ESSAYS' : cat}
                </button>
              ))}
            </div>

            {/* Quick search filter */}
            <div className="relative max-w-sm w-full">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-white/40' : 'text-brand-charcoal/40'}`} size={16} />
              <input 
                type="text" 
                placeholder="Search briefings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-xs font-sans border outline-none focus:border-brand-gold transition-colors block font-medium ${
                  darkMode 
                    ? 'bg-[#112538] border-white/10 text-white placeholder:text-white/40' 
                    : 'bg-brand-offwhite border-brand-border text-brand-charcoal placeholder:text-brand-charcoal/40'
                }`}
              />
            </div>
          </div>

          {/* Core Articles Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredExplainers.length > 0 ? (
                filteredExplainers.map((art, idx) => (
                  <motion.div
                    key={art.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => setSelectedArticle(art)}
                    className={`p-6 shadow-sm group hover:shadow-md transition-all flex flex-col h-full cursor-pointer relative hover:-translate-y-1 border-t-2 border-brand-gold ${
                      darkMode 
                        ? 'bg-[#112538] border-b border-l border-r border-white/5' 
                        : 'bg-white border-b border-l border-r border-brand-border/40'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      {/* Category Label */}
                      <span className="text-[10px] font-black text-brand-gold mb-2 tracking-[0.15em] uppercase font-mono">
                        {art.category}
                      </span>

                      {/* Title */}
                      <h3 className={`text-lg font-serif mb-3 leading-snug group-hover:text-brand-gold transition-colors font-bold ${
                        darkMode ? 'text-white' : 'text-brand-primary'
                      }`} style={{ fontFamily: 'Georgia, serif' }}>
                        {art.title}
                      </h3>

                      {/* Description / Summary */}
                      <p className={`text-xs mb-6 line-clamp-3 leading-relaxed flex-grow ${
                        darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
                      }`}>
                        {art.description}
                      </p>

                      {/* Meta Block & Interactive Arrow footer */}
                      <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-widest border-t pt-3.5 mt-auto ${
                        darkMode ? 'text-white/50 border-white/10' : 'text-brand-charcoal/50 border-brand-border/40'
                      }`}>
                        <span className="font-mono">
                          {art.meta}
                        </span>
                        
                        <div className="text-brand-gold group-hover:translate-x-1.5 transition-transform duration-200">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`col-span-3 py-16 text-center border border-dashed ${
                  darkMode ? 'border-white/10' : 'border-brand-border'
                }`}>
                  <BookOpen className={`mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-brand-charcoal/30'}`} size={36} />
                  <p className={`text-sm font-serif font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>No executive explainers match your filter</p>
                  <button 
                    onClick={() => {
                      setSelectedCategoryFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-xs font-sans tracking-wider text-brand-gold uppercase hover:underline"
                  >
                    Reset Active Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 6. Newsletter Section */}
      <section className={`py-16 sm:py-24 transition-colors duration-300 ${
        darkMode ? 'bg-[#06131F]' : 'bg-brand-offwhite'
      }`} id="newsletter-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-brand-primary text-white p-8 sm:p-12 md:p-16 rounded-none shadow-2xl relative overflow-hidden border border-brand-gold/30"
            id="newsletter-card"
          >
            {/* Grid graphic background effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#808080_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14">
              
              {/* Left Column: Icon + Header text */}
              <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                {/* Gold mail icon inside circular gold outline */}
                <div className="h-16 w-16 rounded-full border border-brand-gold/40 flex items-center justify-center mb-6 shrink-0 bg-brand-gold/5">
                  <Mail className="text-brand-gold" size={24} strokeWidth={1.5} />
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  One Pharma BD Lesson<br />
                  <span className="text-brand-gold">Every Week</span>
                </h2>
                
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-md font-light">
                  Practical insights on what drives and destroys value in pharmaceutical business development—delivered directly containing strategic models to your inbox.
                </p>
              </div>

              {/* Right Column: Active Interactive Form block */}
              <div className="w-full md:w-1/2">
                <AnimatePresence mode="wait">
                  {!subscribedMessage ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => handleSubscribe(e, newsEmail, setNewsEmail)}
                      className="space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row gap-2 relative">
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Your work email"
                          className="w-full px-5 py-4 text-xs font-sans bg-brand-deep border border-white/10 text-white placeholder:text-white/40 focus:border-brand-gold/80 focus:outline-none transition-colors rounded-none"
                        />
                        <button
                          type="submit"
                          className="px-6 py-4 bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors text-xs font-sans tracking-widest font-bold whitespace-nowrap uppercase cursor-pointer rounded-none"
                        >
                          SUBSCRIBE FREE
                        </button>
                      </div>

                      {/* Features lists checklist */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 pt-2 text-[10px] sm:text-xs font-mono text-white/50 tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <Check size={14} className="text-brand-gold shrink-0" />
                          <span>NO SPAM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={14} className="text-brand-gold shrink-0" />
                          <span>UNSUBSCRIBE ANYTIME</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check size={14} className="text-brand-gold shrink-0" />
                          <span>ALWAYS FREE</span>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 px-4 border border-brand-gold/30 bg-brand-deep/50 text-center flex flex-col items-center justify-center space-y-4"
                    >
                      <CheckCircle2 className="text-brand-gold" size={32} />
                      <h4 className="font-serif text-lg font-bold text-brand-gold">Access Confirmed</h4>
                      <p className="font-sans text-xs text-white/85 leading-relaxed">
                        Thank you for subscribing. We have registered your professional email. You will receive the subsequent Strategy Explainer directly on Friday morning.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Brand Methodology & Core Rules */}
      <AboutSection />

      {/* 7. Footer */}
      <footer className="bg-brand-deep text-white pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
            
            {/* Column 1: Info */}
            <div className="md:col-span-4 flex flex-col space-y-5 text-left">
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  PHARMA<span className="text-brand-gold">SIGNAL</span>
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-[#D9A441] uppercase font-semibold mt-1">
                  Decision Intelligence for Pharma BD
                </span>
              </div>
              
              <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white/50 max-w-sm">
                Independent insights for licensing, portfolio, and commercial leaders in the pharmaceutical industry. We break open the complex mechanics of clinical efficacy translating to commercial value.
              </p>

              {/* Social icons */}
              <div className="flex items-center space-x-4 pt-2">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-gold/30"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-gold/30"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={16} />
                </a>
                <a 
                  href="mailto:analyst@pharmasignal.com"
                  className="p-2 bg-white/5 text-white/80 hover:text-brand-gold hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-gold/30 flex items-center justify-center"
                  aria-label="Email Office"
                >
                  <Mail size={16} />
                </a>
              </div>
              
              <p className="text-[10px] font-mono text-white/30 pt-3">
                © 2025 PharmaSignal. Independent Strategic Publishing. All rights reserved. Registered trademark.
              </p>
            </div>

            {/* Column 2: Explore */}
            <div className="md:col-span-2 flex flex-col space-y-4 text-left">
              <h4 className="font-serif text-sm font-bold tracking-widest text-brand-gold uppercase">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-white/60">
                <li>
                  <a 
                    href="#latest-explainers-section" 
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Explainers
                  </a>
                </li>
                <li>
                  <a 
                    href="#newsletter-section" 
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Newsletter Briefs
                  </a>
                </li>
                <li>
                  <a 
                    href="#about-section" 
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    About Intel Forum
                  </a>
                </li>
                <li>
                  <a 
                    href="#decision-makers-section" 
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Audience Standards
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="md:col-span-2 flex flex-col space-y-4 text-left">
              <h4 className="font-serif text-sm font-bold tracking-widest text-brand-gold uppercase">
                RESOURCES
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-white/60">
                <li>
                  <a 
                    href="#latest-explainers-section" 
                    onClick={() => setSelectedCategoryFilter('LICENSING STRATEGY')}
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Licensing Archives
                  </a>
                </li>
                <li>
                  <a 
                    href="#latest-explainers-section" 
                    onClick={() => setSelectedCategoryFilter('EVIDENCE & DEVELOPMENT')}
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Evidence Studies
                  </a>
                </li>
                <li>
                  <a 
                    href="#latest-explainers-section" 
                    onClick={() => setSelectedCategoryFilter('COMMERCIAL STRATEGY')}
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    Territory Metrics
                  </a>
                </li>
                <li>
                  <a 
                    href="#about-section" 
                    className="hover:text-brand-gold transition-colors inline-block py-0.5 animate-pulse"
                  >
                    Our Methodology
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Stay Informed quick input */}
            <div className="md:col-span-4 flex flex-col space-y-4 text-left">
              <h4 className="font-serif text-sm font-bold tracking-widest text-brand-gold uppercase">
                STAY INFORMED
              </h4>
              <p className="font-sans text-xs text-white/50 leading-relaxed mb-1">
                Weekly intelligence reports outlining market failures, valuation pitfalls and regional expansion maps.
              </p>
              
              <form onSubmit={(e) => handleSubscribe(e, footerEmail, setFooterEmail)} className="flex flex-col sm:flex-row gap-1">
                <input 
                  type="email" 
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Professional email" 
                  className="bg-brand-primary text-xs px-4 py-3 border border-white/10 text-white placeholder:text-white/30 focus:border-brand-gold focus:outline-none w-full"
                  required
                />
                <button 
                  type="submit"
                  className="bg-brand-gold text-brand-primary hover:bg-brand-gold-hover text-xs font-sans font-bold tracking-widest px-4 py-3 shrink-0 uppercase transition-colors"
                >
                  JOIN
                </button>
              </form>
            </div>

          </div>

          {/* Sub or footer privacy elements */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-white/40">
            <p>PharmaSignal is an independent decision intelligence brand. All valuations are informational.</p>
            <div className="flex space-x-6">
              <a href="#app-navigation" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#app-navigation" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 8. Floating Reader Modal / Drawer for Explainers */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
