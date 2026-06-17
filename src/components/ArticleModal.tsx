import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Share2, ClipboardCheck, ArrowLeft, Bookmark } from 'lucide-react';
import { Article } from '../types';
import { useState } from 'react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  // Lock body scroll when reading is active
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
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

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative w-full max-w-4xl transform overflow-hidden bg-brand-offwhite text-left align-middle shadow-2xl transition-all border-t-4 border-brand-gold"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-charcoal/10 bg-brand-offwhite/95 backdrop-blur px-6 py-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#001B2A] hover:text-brand-gold transition-colors cursor-pointer group uppercase"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Intel
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="p-2 text-brand-primary hover:text-brand-gold hover:bg-brand-primary/5 rounded-full transition-all cursor-pointer relative"
                title="Copy Link to Article"
              >
                {copied ? <ClipboardCheck size={18} className="text-emerald-600 animate-pulse" /> : <Share2 size={18} />}
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] py-1 px-2 rounded tracking-widest whitespace-nowrap">
                    LINK COPIED
                  </span>
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-brand-primary hover:text-red-700 hover:bg-brand-primary/5 rounded-full transition-all cursor-pointer"
                title="Close Reader"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <article className="px-6 py-10 sm:px-12 sm:py-16 md:px-16 overflow-y-auto max-h-[80vh]">
            {/* Category Breadcrumb */}
            <span className="inline-block text-xs font-mono tracking-widest text-brand-gold font-semibold uppercase mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary leading-tight tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Author / Date Meta Strip */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 border-y border-brand-charcoal/10 py-4 mb-8 text-xs font-mono text-brand-charcoal/60">
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-gold" />
                <span className="font-medium text-brand-primary">{article.author}</span>
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
            <p className="font-serif text-lg sm:text-xl italic text-brand-primary/80 border-l-4 border-brand-gold pl-6 py-2 mb-10 leading-relaxed bg-[#ECEBE7] p-4">
              {article.featuredSummary}
            </p>

            {/* Content markup container */}
            <div 
              className="markdown-body text-[#111827] proportional-reading-pane"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Bottom Section */}
            <div className="mt-14 pt-10 border-t border-brand-charcoal/10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="font-sans text-xs text-brand-charcoal/60 mb-1 tracking-wider">PUBLICATION DETAILS</p>
                <p className="font-serif text-sm font-semibold text-brand-primary">PharmaSignal Decision Intelligence Platform</p>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 text-xs tracking-widest font-sans font-bold bg-[#001B2A] text-white hover:bg-brand-gold hover:text-[#001B2A] transition-colors rounded-none uppercase cursor-pointer"
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
