import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import SampleBriefingModal from './SampleBriefingModal';

interface ExecutiveBriefingBoxProps {
  darkMode: boolean;
  compact?: boolean;
}

export default function ExecutiveBriefingBox({ darkMode, compact = false }: ExecutiveBriefingBoxProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!response.ok) {
        throw new Error('Subscription request failed.');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setErrorMessage('Could not process subscription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`border text-left relative overflow-hidden rounded-none ${
          compact ? 'p-5 sm:p-6' : 'p-7 sm:p-9'
        } ${
          darkMode 
            ? 'bg-[#0D243A] border-[#1E3A55] text-[#F8FAFC]' 
            : 'bg-[#F8FAFC] border-slate-200 text-[#061426]'
        }`}
      >
        {/* Hairline top accent */}
        <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#C5A059]" />

        <div className="max-w-xl">
          <span className="inline-block text-[10.5px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-bold mb-1.5">
            FORTNIGHTLY BRIEFING
          </span>

          <h3 className={`font-serif ${compact ? 'text-[20px] sm:text-[22px]' : 'text-[24px] sm:text-[28px]'} font-bold tracking-tight leading-[1.2]`}>
            One Pharma BD Insight Worth Saving
          </h3>

          <p className={`font-serif italic text-[14px] sm:text-[15px] leading-[1.5] mt-1.5 mb-2 ${
            darkMode ? 'text-[#CBD5E1]' : 'text-slate-700'
          }`}>
            Every two weeks, receive a concise PharmaSignal briefing on deal structure, partner responsibilities or execution risk—with a practical implication for your next BD decision.
          </p>

          <p className={`font-sans text-[12px] sm:text-[13px] leading-[1.5] mb-4 font-medium ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            For BD, licensing, alliance, portfolio and market-access professionals.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    disabled={submitting}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className={`w-full px-3.5 py-2.5 text-[13.5px] font-sans border outline-none transition-colors rounded-none ${
                      darkMode 
                        ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C5A059]' 
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

                {errorMessage && (
                  <p className="text-xs text-red-500 font-sans mt-1">{errorMessage}</p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
                    Free. Every two weeks. Unsubscribe anytime.
                  </span>
                  <button
                    type="button"
                    onClick={() => setSampleModalOpen(true)}
                    className="text-[10.5px] font-mono font-bold text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText size={11} />
                    <span>Read a Sample Briefing</span>
                  </button>
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
                  You are subscribed to <strong className="font-semibold">The PharmaSignal Briefing</strong>. You will receive the fortnightly dispatch.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SampleBriefingModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        darkMode={darkMode}
      />
    </>
  );
}
