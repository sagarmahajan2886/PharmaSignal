import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Building2, Layers } from 'lucide-react';

interface SuggestDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function SuggestDealModal({ isOpen, onClose, darkMode }: SuggestDealModalProps) {
  const [dealTitle, setDealTitle] = useState('');
  const [counterparties, setCounterparties] = useState('');
  const [mechanismNote, setMechanismNote] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle.trim()) return;

    setSubmitting(true);
    // Simulate discrete submission to Deal Desk
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setDealTitle('');
    setCounterparties('');
    setMechanismNote('');
    setSubmitterEmail('');
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#061426]/80 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-xl border rounded-none shadow-2xl z-10 overflow-hidden text-left ${
            darkMode 
              ? 'bg-[#0D243A] border-[#1E3A55] text-[#F8FAFC]' 
              : 'bg-white border-slate-200 text-[#061426]'
          }`}
        >
          {/* Top Gold Accent Bar */}
          <div className="h-1 w-full bg-[#C5A059]" />

          {/* Header */}
          <div className="p-6 sm:p-7 pb-4 border-b border-[#1E3A55]/30 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-mono tracking-[0.08em] text-[#C5A059] uppercase font-semibold mb-1">
                DEAL DESK SUBMISSION
              </span>
              <h2 className="font-serif text-[24px] sm:text-[28px] font-bold tracking-tight leading-[1.15]">
                Suggest a Deal Signal
              </h2>
              <p className={`font-sans text-[14px] sm:text-[15px] leading-[1.6] mt-2 ${
                darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
              }`}>
                Seen a pharma deal, licensing structure or partnership worth deconstructing? Send it to the PharmaSignal Deal Desk.
              </p>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 transition-colors cursor-pointer border ${
                darkMode 
                  ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5' 
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 pt-5">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5A059]/15 text-[#C5A059] mb-1">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="font-serif text-[22px] font-bold">
                  Transaction Received
                </h3>
                <p className={`font-sans text-[14px] leading-relaxed max-w-md mx-auto ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-slate-600'
                }`}>
                  Thank you. Our deal desk will evaluate the transaction partition, governance covenants, and structural mechanisms for upcoming editorial deconstruction.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-[12px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field 1: Transaction / Asset */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#C5A059] mb-1.5">
                    Transaction / Asset Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={dealTitle}
                      onChange={(e) => setDealTitle(e.target.value)}
                      placeholder="e.g. Haisco / Newco, Alvotech / Teva, BMS / Cellares..."
                      className={`w-full px-3.5 py-2.5 text-[14px] font-sans border outline-none transition-colors rounded-none ${
                        darkMode 
                          ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C5A059]' 
                          : 'bg-slate-50 border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                      }`}
                    />
                  </div>
                </div>

                {/* Field 2: Counterparties */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#94A3B8] mb-1.5">
                    Counterparties (Optional)
                  </label>
                  <input
                    type="text"
                    value={counterparties}
                    onChange={(e) => setCounterparties(e.target.value)}
                    placeholder="e.g. Licensor / Licensee / CDMO"
                    className={`w-full px-3.5 py-2.5 text-[14px] font-sans border outline-none transition-colors rounded-none ${
                      darkMode 
                        ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C5A059]' 
                        : 'bg-slate-50 border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                    }`}
                  />
                </div>

                {/* Field 3: Mechanism Note */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#94A3B8] mb-1.5">
                    What makes this mechanism notable? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={mechanismNote}
                    onChange={(e) => setMechanismNote(e.target.value)}
                    placeholder="e.g. Unusual co-commercialization partition, carve-out territory, capacity reservation covenants..."
                    className={`w-full px-3.5 py-2.5 text-[14px] font-sans border outline-none transition-colors rounded-none resize-none ${
                      darkMode 
                        ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C5A059]' 
                        : 'bg-slate-50 border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                    }`}
                  />
                </div>

                {/* Field 4: Submitter Email */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#94A3B8] mb-1.5">
                    Your Email (Optional &amp; Confidential)
                  </label>
                  <input
                    type="email"
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    placeholder="name@company.com (for attribution or follow-up)"
                    className={`w-full px-3.5 py-2.5 text-[14px] font-sans border outline-none transition-colors rounded-none ${
                      darkMode 
                        ? 'bg-[#0A1A2B] border-[#1E3A55] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#C5A059]' 
                        : 'bg-slate-50 border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                    }`}
                  />
                </div>

                {/* Confidentiality Notice & Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#94A3B8]">
                    <ShieldCheck size={14} className="text-[#C5A059]" />
                    <span>Discreet biopharma editorial review</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full sm:w-auto px-6 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-[12px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-none ${
                      submitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? 'Sending...' : (
                      <>
                        <span>Submit to Deal Desk</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
