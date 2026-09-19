import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface SampleBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function SampleBriefingModal({ isOpen, onClose, darkMode }: SampleBriefingModalProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const emailToSubmit = email.trim();
    if (!emailToSubmit || !emailToSubmit.includes('@')) {
      setError('Please enter a valid work email address.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed.');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Could not process subscription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border shadow-2xl p-6 sm:p-8 text-left ${
            darkMode 
              ? 'bg-[#0A1A2E] border-[#1E3A55] text-[#F8FAFC]' 
              : 'bg-[#FBFBFC] border-[#E2DDD3] text-[#061426]'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 transition-colors cursor-pointer ${
              darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#061426]'
            }`}
            aria-label="Close Sample Briefing"
          >
            <X size={20} />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block text-[10.5px] font-mono tracking-[0.1em] font-bold uppercase px-2.5 py-0.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059]">
              SAMPLE BRIEFING · FORTNIGHTLY DISPATCH
            </span>
          </div>

          <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-[1.2] ${
            darkMode ? 'text-white' : 'text-[#061426]'
          }`}>
            The PharmaSignal Briefing
          </h2>

          <div className="h-[2px] w-12 bg-[#C5A059] mb-4" />

          <p className={`font-serif text-base sm:text-lg italic font-medium mb-6 ${
            darkMode ? 'text-[#C5A059]' : 'text-amber-900'
          }`}>
            Why attractive opportunities lose momentum before internal approval—and what decision dealmakers should make differently.
          </p>

          {/* Briefing Content */}
          <div className={`space-y-4 font-sans text-sm sm:text-[14.5px] leading-[1.7] mb-8 pb-6 border-b ${
            darkMode ? 'text-slate-300 border-[#1E3A55]' : 'text-slate-700 border-slate-200'
          }`}>
            <p>
              <strong className={darkMode ? 'text-white' : 'text-[#061426]'}>The Observation:</strong>{' '}
              High-profile business development initiatives frequently begin with strong commercial enthusiasm. An asset shows compelling clinical potential, a target market presents high unmet need, and initial exploratory meetings feel productive. Yet weeks later, the transaction stalls inside the prospective licensee or acquirer—not because of sudden scientific failure, but because internal stakeholders evaluate the opportunity through conflicting standards of proof.
            </p>

            <p>
              <strong className={darkMode ? 'text-white' : 'text-[#061426]'}>The Mechanism:</strong>{' '}
              The Approval Gap is the distance between commercial attractiveness and internal execution readiness. Business development evaluates market upside and competitive timing; clinical and regulatory teams evaluate unresolved CMC risks and trial protocol uncertainties; commercial affiliates worry about reimbursement tiering; and finance tests capital hurdle rates. Because each corporate function holds a de facto veto without a shared mechanism for reconciling trade-offs, deal momentum dissipates before the opportunity reaches formal authorization.
            </p>

            <div className={`p-4 border-l-2 border-[#C5A059] italic font-serif my-4 ${
              darkMode ? 'bg-[#0D243A] text-slate-200' : 'bg-amber-50/50 text-slate-800'
            }`}>
              "Regulators evaluate whether a drug is safe and effective; payers decide whether it will be funded; internal governance panels decide whether their organization can execute it."
            </div>

            <p>
              <strong className={darkMode ? 'text-white' : 'text-[#061426]'}>The BD Decision:</strong>{' '}
              Before presenting an opportunity to executive governance or issuing binding terms, conduct a structured cross-functional trade-off review across BD, Regulatory, Quality, and Finance. Identify the deal-breaker hurdles early. If internal consensus cannot be reached on what constitutes acceptable execution risk, the deal will quietly stall regardless of how attractive the headline valuation appears.
            </p>

            <p className={`text-xs font-mono pt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              * Representative sample briefing adapted from PharmaSignal Decision Lens 01 (The Approval Gap). Delivered fortnightly to senior BD leaders.
            </p>
          </div>

          {/* Inline Subscription within Modal */}
          <div className={`p-4 sm:p-5 border ${
            darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-[#F4F1EA] border-[#E2DDD3]'
          }`}>
            <h3 className={`font-serif text-base sm:text-lg font-bold mb-1 ${
              darkMode ? 'text-white' : 'text-[#061426]'
            }`}>
              Subscribe to the Fortnightly Briefing
            </h3>
            
            <div className={`text-xs font-sans mb-3 space-y-1 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <p>• Fortnightly curated briefing of new Deal Signals and explainers.</p>
              <p>• Direct breakdowns of rights, obligations and deal mechanisms.</p>
              <p>• Access to slides and decision checklists.</p>
              <p className="text-[11px] font-medium pt-0.5 opacity-80">No promotional sponsor content or uncurated press releases. No spam. Unsubscribe at any time.</p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    disabled={submitting}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className={`w-full px-3 py-2 text-xs font-sans border outline-none rounded-none ${
                      darkMode 
                        ? 'bg-[#061426] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#C5A059]' 
                        : 'bg-white border-slate-300 text-[#061426] placeholder:text-slate-400 focus:border-[#061426]'
                    } ${submitting ? 'opacity-65 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-4 py-2 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all duration-200 whitespace-nowrap cursor-pointer rounded-none flex items-center justify-center gap-1.5 ${
                      submitting ? 'opacity-65 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>{submitting ? 'Submitting...' : 'Subscribe to Fortnightly Briefing'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-sans mt-1">{error}</p>
                )}
              </form>
            ) : (
              <div className="flex items-center gap-2 p-2.5 border border-[#C5A059]/40 bg-[#C5A059]/10 text-xs font-sans text-[#C5A059]">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing. You will receive the next fortnightly briefing.</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className={`text-xs font-mono font-medium underline transition-colors cursor-pointer ${
                darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#061426]'
              }`}
            >
              Close Sample
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
