import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ExecutiveBriefingBoxProps {
  darkMode: boolean;
  compact?: boolean;
}

export default function ExecutiveBriefingBox({ darkMode, compact = false }: ExecutiveBriefingBoxProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    // Simulate brief network latency
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
    }, 500);
  };

  return (
    <div
      className={`border text-left relative overflow-hidden rounded-none ${
        compact ? 'p-5 sm:p-6' : 'p-7 sm:p-9'
      } ${
        darkMode 
          ? 'bg-[#0D243A] border-[#1E3A55] text-[#F8FAFC]' 
          : 'bg-[#F8FAFC] border-slate-200 text-[#061426]'
      }`}
    >
      {/* Subtle hairline top accent */}
      <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#C5A059]" />

      <div className="max-w-xl">
        <span className="inline-block text-[11px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-semibold mb-1.5">
          EXECUTIVE DISPATCH
        </span>

        <h3 className={`font-serif ${compact ? 'text-[22px] sm:text-[24px]' : 'text-[26px] sm:text-[30px]'} font-bold tracking-tight leading-[1.15]`}>
          The PharmaSignal Briefing
        </h3>

        <p className={`font-serif italic text-[15px] sm:text-[16px] leading-[1.5] mt-1 mb-2 ${
          darkMode ? 'text-[#CBD5E1]' : 'text-slate-700'
        }`}>
          One mechanism-first pharma BD insight worth saving.
        </p>

        <p className={`font-sans text-[13px] sm:text-[14px] leading-[1.6] mb-5 ${
          darkMode ? 'text-[#94A3B8]' : 'text-slate-500'
        }`}>
          For BD, licensing, alliance, portfolio and commercial strategy leaders.
        </p>

        <AnimatePresence mode="wait">
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  disabled={submitting}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your executive email"
                  className={`w-full px-3.5 py-2.5 text-[14px] font-sans border outline-none transition-colors rounded-none ${
                    darkMode 
                      ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-[#94A3B8]/60 focus:border-[#C5A059]' 
                      : 'bg-white border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                  } ${submitting ? 'opacity-65 cursor-not-allowed' : ''}`}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full sm:w-auto px-5 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-[12px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer rounded-none whitespace-nowrap ${
                    submitting ? 'opacity-65 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{submitting ? 'Submitting...' : 'Subscribe Free'}</span>
                  {!submitting && <ArrowRight size={13} />}
                </button>
              </div>

              <div className="text-[10.5px] font-mono text-[#94A3B8] tracking-wide">
                No promotions or noise. High signal-to-noise ratio.
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3.5 border flex items-center gap-2.5 ${
                darkMode ? 'border-[#C5A059]/40 bg-[#0A1A2B] text-[#F8FAFC]' : 'border-slate-300 bg-white text-slate-800'
              }`}
            >
              <CheckCircle2 size={18} className="text-[#C5A059] shrink-0" />
              <p className="font-sans text-[13px] leading-snug">
                You are subscribed to <strong className="font-semibold">The PharmaSignal Briefing</strong>. Welcome.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
