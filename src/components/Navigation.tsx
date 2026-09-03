import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onSubscribeClick: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  onSubscribeClick,
  darkMode,
  toggleDarkMode
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for header density
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Smooth scroll and routing based on target anchors
    if (tab === 'HOME') {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'EXPLAINERS') {
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      const el = document.getElementById('featured-explainer-section') || document.getElementById('latest-explainers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'DEAL SIGNALS') {
      window.history.pushState(null, '', '/deal-signals');
      const el = document.getElementById('deal-signals-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'LENSES') {
      window.history.pushState(null, '', '/lenses');
      const el = document.getElementById('lenses-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'ABOUT') {
      window.history.pushState(null, '', '/about');
      const el = document.getElementById('about-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'NEWSLETTER') {
      const el = document.getElementById('subscribe-section') || document.getElementById('newsletter-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navTabs: { id: ActiveTab; label: string }[] = [
    { id: 'EXPLAINERS', label: 'Explainers' },
    { id: 'DEAL SIGNALS', label: 'Deal Signals' },
    { id: 'LENSES', label: 'Lenses' },
    { id: 'ABOUT', label: 'About' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        darkMode 
          ? (scrolled ? 'bg-[#0B121E]/95 backdrop-blur-md py-2.5 shadow-xl border-white/10' : 'bg-[#0B121E] py-3.5 sm:py-4 border-white/10')
          : (scrolled ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-xs border-slate-200' : 'bg-[#FBFBFC] py-3.5 sm:py-4 border-slate-200')
      }`}
      id="app-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div 
            className="flex flex-col cursor-pointer group shrink-0"
            onClick={() => handleNavClick('HOME')}
          >
            <div className="flex items-center gap-2">
              <span className={`font-serif text-xl sm:text-2xl lg:text-[26px] font-bold tracking-wider transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-[#0B121E]'
              }`}>
                PHARMA<span className="text-brand-gold">SIGNAL</span>
              </span>
            </div>
            <span className={`text-[8.5px] sm:text-[9.5px] font-mono tracking-widest font-semibold mt-0.5 uppercase ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Biopharma BD Decision Intelligence
            </span>
          </div>

          {/* Center Navigation for Desktop */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {navTabs.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[11px] lg:text-xs tracking-widest font-sans font-bold py-1.5 transition-colors cursor-pointer uppercase whitespace-nowrap ${
                    isActive 
                      ? (darkMode ? 'text-brand-gold' : 'text-brand-cobalt font-extrabold') 
                      : (darkMode ? 'text-slate-300 hover:text-brand-gold' : 'text-slate-600 hover:text-brand-cobalt')
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-brand-gold' : 'bg-brand-cobalt'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button for Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 shrink-0">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors cursor-pointer shrink-0 ${
                darkMode 
                  ? 'text-slate-300 hover:text-brand-gold hover:bg-white/5' 
                  : 'text-slate-600 hover:text-brand-cobalt hover:bg-slate-100'
              }`}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={onSubscribeClick}
              className="px-4 lg:px-5 py-2.5 text-[11px] lg:text-xs font-sans tracking-widest font-bold bg-[#0B121E] text-white hover:bg-brand-cobalt transition-colors rounded-none shadow-xs cursor-pointer uppercase duration-200 whitespace-nowrap shrink-0 border border-transparent dark:bg-brand-gold dark:text-[#0B121E] dark:hover:bg-brand-gold-hover"
            >
              SUBSCRIBE FREE
            </button>
          </div>

          {/* Mobile Menu Icon with Dark Mode toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 transition-colors rounded-full cursor-pointer ${
                darkMode ? 'text-white/85 hover:text-brand-gold bg-white/5' : 'text-slate-700 hover:text-brand-cobalt bg-black/5'
              }`}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors p-1 cursor-pointer ${
                darkMode ? 'text-white hover:text-brand-gold' : 'text-[#0B121E] hover:text-brand-cobalt'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden border-t overflow-hidden ${
              darkMode ? 'bg-[#0B121E] border-white/10' : 'bg-[#FBFBFC] border-slate-200'
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {navTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-3 text-sm tracking-widest font-sans font-medium transition-colors uppercase ${
                    activeTab === item.id 
                      ? (darkMode ? 'text-brand-gold pl-2 border-l border-brand-gold font-bold' : 'text-brand-cobalt pl-2 border-l border-brand-cobalt font-bold')
                      : (darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-900')
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left py-3 text-sm tracking-widest font-sans font-medium transition-colors flex items-center justify-between border-t pt-4 ${
                  darkMode ? 'text-white/80 hover:text-white border-white/5' : 'text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                <span className="uppercase">Theme: {darkMode ? "Midnight Dark" : "Modern Light"}</span>
                {darkMode ? <Sun size={17} className="text-brand-gold animate-pulse" /> : <Moon size={17} className="text-brand-gold" />}
              </button>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSubscribeClick();
                  }}
                  className="w-full py-3 text-center text-sm font-sans tracking-widest font-semibold bg-[#0B121E] text-white hover:bg-brand-cobalt dark:bg-brand-gold dark:text-[#0B121E] dark:hover:bg-brand-gold-hover transition-colors uppercase"
                >
                  SUBSCRIBE FREE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
