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
    
    // Smooth scroll based on target anchors
    if (tab === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'EXPLAINERS') {
      const el = document.getElementById('featured-explainer-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (tab === 'ABOUT') {
      const el = document.getElementById('about-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (tab === 'NEWSLETTER') {
      const el = document.getElementById('newsletter-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5 ${
        scrolled 
          ? 'bg-brand-primary/95 backdrop-blur-md py-4 shadow-xl' 
          : 'bg-brand-primary py-6'
      }`}
      id="app-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div 
            className="flex flex-col cursor-pointer group"
            onClick={() => handleNavClick('HOME')}
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white transition-colors duration-300">
                PHARMA<span className="text-brand-gold">SIGNAL</span>
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-sans tracking-widest text-white/50 font-light mt-0.5 uppercase">
              Decision Intelligence for Pharma BD
            </span>
          </div>

          {/* Center Navigation for Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            {(['EXPLAINERS', 'ABOUT', 'NEWSLETTER'] as ActiveTab[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`relative text-[11px] tracking-widest font-sans font-bold py-2 transition-colors cursor-pointer uppercase ${
                    isActive ? 'text-brand-gold' : 'text-white/80 hover:text-brand-gold'
                  }`}
                >
                  {tab}
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
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-white/80 hover:text-brand-gold hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={onSubscribeClick}
              className="px-6 py-2.5 text-xs font-sans tracking-widest font-semibold bg-brand-gold text-brand-primary hover:bg-brand-gold-hover transition-colors rounded-none shadow-md cursor-pointer uppercase duration-200"
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
              {(['EXPLAINERS', 'ABOUT', 'NEWSLETTER'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`block w-full text-left py-3 text-sm tracking-widest font-sans font-medium transition-colors ${
                    activeTab === tab ? 'text-brand-gold pl-2 border-l border-brand-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {tab}
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
