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
    { id: 'ABOUT', label: 'About' },
    { id: 'NEWSLETTER', label: 'Subscribe' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5 ${
        scrolled 
          ? 'bg-brand-primary/95 backdrop-blur-md py-3 shadow-xl' 
          : 'bg-brand-primary py-4 sm:py-5'
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
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider text-white transition-colors duration-300">
                PHARMA<span className="text-brand-gold">SIGNAL</span>
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[9.5px] font-sans tracking-widest text-white/50 font-light mt-0.5 uppercase">
              Decision Intelligence for Pharma BD
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
                    isActive ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
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
              className="p-2 text-white/80 hover:text-brand-gold hover:bg-white/5 rounded-full transition-colors cursor-pointer shrink-0"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={onSubscribeClick}
              className="px-4 lg:px-5 py-2.5 text-[11px] lg:text-xs font-sans tracking-widest font-bold bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors rounded-none shadow-md cursor-pointer uppercase duration-200 whitespace-nowrap shrink-0"
            >
              SUBSCRIBE FREE
            </button>
          </div>

          {/* Mobile Menu Icon with Dark Mode toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white/85 hover:text-brand-gold transition-colors rounded-full cursor-pointer bg-white/5"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-brand-gold transition-colors p-1 cursor-pointer"
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
            className="md:hidden bg-brand-deep border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-3 text-sm tracking-widest font-sans font-medium transition-colors uppercase ${
                    activeTab === item.id ? 'text-brand-gold pl-2 border-l border-brand-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={toggleDarkMode}
                className="w-full text-left py-3 text-sm tracking-widest font-sans font-medium text-white/80 hover:text-white transition-colors flex items-center justify-between border-t border-white/5 pt-4"
              >
                <span className="uppercase">Theme: {darkMode ? "Midnight Dark" : "Editorial Hybrid"}</span>
                {darkMode ? <Sun size={17} className="text-brand-gold animate-pulse" /> : <Moon size={17} className="text-brand-gold" />}
              </button>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSubscribeClick();
                  }}
                  className="w-full py-3 text-center text-sm font-sans tracking-widest font-semibold bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors uppercase"
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
