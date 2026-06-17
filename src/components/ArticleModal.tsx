import { useEffect, useState, UIEvent } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Share2, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  darkMode?: boolean;
}

export default function ArticleModal({ article, onClose, darkMode = false }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lock body scroll when reading is active
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      setScrollProgress(0); // Reset progress on article change
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
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

      <div className={`flex min-h-screen items-center justify-center p-4 text-center sm:p-6 lg:p-10 ${darkMode ? 'dark' : ''}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className={`relative w-full max-w-4xl transform overflow-hidden text-left align-middle shadow-2xl transition-all border-t-4 border-brand-gold ${
            darkMode ? 'bg-brand-deep text-white border-b border-l border-r border-white/10' : 'bg-brand-offwhite text-brand-charcoal'
          }`}
        >
          {/* Header Action Bar */}
          <div className={`sticky top-0 z-10 flex flex-col border-b backdrop-blur ${
            darkMode ? 'border-white/10 bg-brand-deep/95' : 'border-brand-charcoal/10 bg-brand-offwhite/95'
          }`}>
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={onClose}
                className={`flex items-center gap-2 text-xs font-sans font-semibold tracking-widest transition-colors cursor-pointer group uppercase ${
                  darkMode ? 'text-white hover:text-brand-gold' : 'text-[#001B2A] hover:text-brand-gold'
                }`}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Intel
              </button>

              {/* Sophisticated reading status readout */}
              <div className={`hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest font-bold uppercase ${
                darkMode ? 'text-white/60' : 'text-brand-charcoal/55'
              }`}>
                <span>Briefing Progress:</span>
                <span className="text-brand-gold bg-brand-primary border border-white/5 px-1.5 py-0.5">{Math.min(100, Math.round(scrollProgress))}%</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className={`p-2 rounded-full transition-all cursor-pointer relative ${
                    darkMode ? 'text-white hover:text-brand-gold hover:bg-white/5' : 'text-brand-primary hover:text-brand-gold hover:bg-brand-primary/5'
                  }`}
                  title="Copy Link to Article"
                >
                  {copied ? <ClipboardCheck size={18} className="text-emerald-500 animate-pulse" /> : <Share2 size={18} />}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] py-1 px-2 rounded tracking-widest whitespace-nowrap border border-white/10">
                      LINK COPIED
                    </span>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    darkMode ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-brand-primary hover:text-red-700 hover:bg-brand-primary/5'
                  }`}
                  title="Close Reader"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Reading progress bar */}
            <div className={`w-full h-[3px] relative overflow-hidden ${
              darkMode ? 'bg-white/10' : 'bg-brand-charcoal/10'
            }`}>
              <div 
                className="h-full bg-brand-gold transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <article 
            className="px-6 py-10 sm:px-12 sm:py-16 md:px-16 overflow-y-auto max-h-[80vh] scroll-smooth"
            onScroll={handleScroll}
          >
            {/* Category Breadcrumb */}
            <span className="inline-block text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 ${
              darkMode ? 'text-white' : 'text-brand-primary'
            }`}>
              {article.title}
            </h1>

            {/* Author / Date Meta Strip */}
            <div className={`flex flex-wrap items-center gap-y-4 gap-x-8 border-y py-4 mb-8 text-xs font-mono ${
              darkMode ? 'border-white/10 text-white/60' : 'border-brand-charcoal/10 text-brand-charcoal/60'
            }`}>
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-gold" />
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-brand-primary'}`}>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Featured Summary */}
            <p className={`font-serif text-lg sm:text-xl italic border-l-4 border-brand-gold pl-6 py-2 mb-10 leading-relaxed p-4 ${
              darkMode ? 'bg-white/5 text-white/90' : 'bg-[#ECEBE7] text-brand-primary/80'
            }`}>
              {article.featuredSummary}
            </p>

            {/* Content markup container */}
            <div 
              className={`markdown-body proportional-reading-pane ${darkMode ? 'text-white/95' : 'text-[#111827]'}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

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
          </article>
        </motion.div>
      </div>
    </div>
  );
}
