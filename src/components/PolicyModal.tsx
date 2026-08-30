import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2, Cookie } from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'editorial' | 'cookies';

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
  isDarkMode: boolean;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      id="policy-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="policy-modal-card"
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-[#0B1528] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          id="policy-modal-header"
          className={`flex items-center justify-between px-6 py-5 border-b ${
            isDarkMode ? 'border-slate-800 bg-[#070F1E]' : 'border-slate-100 bg-slate-50/75'
          }`}
        >
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#0066CC] uppercase">
              PharmaSignal Legal & Governance
            </span>
            <h2 className="text-xl font-serif font-bold mt-0.5">
              Policies & Editorial Standards
            </h2>
          </div>
          <button
            id="policy-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          id="policy-tab-bar"
          className={`flex items-center gap-2 px-6 py-3 border-b overflow-x-auto ${
            isDarkMode ? 'border-slate-800/80 bg-[#091322]' : 'border-slate-100 bg-white'
          }`}
        >
          <button
            id="policy-tab-privacy"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </button>

          <button
            id="policy-tab-terms"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            Terms of Service
          </button>

          <button
            id="policy-tab-editorial"
            onClick={() => setActiveTab('editorial')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'editorial'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Editorial & Fact-Checking
          </button>

          <button
            id="policy-tab-cookies"
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cookie className="w-4 h-4" />
            Cookies & Storage
          </button>
        </div>

        {/* Content Body */}
        <div
          id="policy-modal-body"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 leading-relaxed text-sm sm:text-base"
        >
          {activeTab === 'privacy' && (
            <div id="privacy-content" className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#0066CC]">
                Privacy Policy
              </h3>
              <p className="text-xs font-mono text-slate-400 uppercase">
                Last updated: August 2026
              </p>

              <p>
                PharmaSignal is committed to respecting and protecting the privacy of our
                readers, subscribers, and business development executives. This Privacy
                Policy explains how information is collected, stored, and utilized when you
                visit <strong>pharmasignal.com</strong>.
              </p>

              <h4 className="font-bold text-base mt-4">1. Information Collection</h4>
              <p>
                We do not require account registration or personal profiling to read our open
                deal analyses. The only personal information we collect is:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  <strong>Email Address:</strong> Voluntarily provided if you subscribe to our
                  weekly Deal Signal executive newsletter.
                </li>
                <li>
                  <strong>Anonymous Analytics:</strong> General, non-identifying telemetry
                  (e.g., aggregate page visits, browser types) to ensure server stability and
                  content relevance.
                </li>
              </ul>

              <h4 className="font-bold text-base mt-4">2. Use of Information</h4>
              <p>
                Email addresses are solely used to deliver executive deal briefings and major
                editorial updates. We will never sell, rent, or trade your contact information
                to third-party advertisers, data brokers, or sponsor syndicates.
              </p>

              <h4 className="font-bold text-base mt-4">3. Unsubscribe & Data Deletion</h4>
              <p>
                You may unsubscribe from our newsletter at any time via the one-click
                unsubscribe link included in every email, or by contacting our Deal Desk at{' '}
                <span className="font-mono text-xs text-[#0066CC]">
                  editorial@pharmasignal.com
                </span>
                .
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div id="terms-content" className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#0066CC]">
                Terms of Service
              </h3>
              <p className="text-xs font-mono text-slate-400 uppercase">
                Last updated: August 2026
              </p>

              <p>
                Welcome to PharmaSignal. By accessing our platform, analyses, RSS feeds, or
                infographic assets, you agree to comply with and be bound by the following
                terms.
              </p>

              <h4 className="font-bold text-base mt-4">
                1. Not Financial, Legal, or Investment Advice
              </h4>
              <p>
                PharmaSignal publications represent independent business intelligence and
                mechanism-focused editorial analysis. Content published on this platform does
                not constitute investment advice, financial consultation, legal structuring
                counsel, or formal fairness opinions. Readers are advised to conduct
                independent diligence prior to entering transactions.
              </p>

              <h4 className="font-bold text-base mt-4">2. Intellectual Property Rights</h4>
              <p>
                All proprietary frameworks, analytical models (including Opportunity Creation
                vs Processing, Governance Debt, Selective Commercial Ownership), bespoke 16:9
                deal architecture diagrams, and editorial commentaries are the intellectual
                property of PharmaSignal.
              </p>
              <p className="text-sm">
                You may reference and cite PharmaSignal in professional briefings or slide
                decks provided proper attribution is given to{' '}
                <strong>PharmaSignal (pharmasignal.com)</strong>.
              </p>

              <h4 className="font-bold text-base mt-4">3. Disclaimer of Warranties</h4>
              <p>
                While PharmaSignal adheres to a strict two-source factual verification standard,
                all content is provided &ldquo;as is&rdquo; without warranties of completeness or
                regulatory finality.
              </p>
            </div>
          )}

          {activeTab === 'editorial' && (
            <div id="editorial-content" className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#0066CC]">
                Editorial &amp; Fact-Checking Standards
              </h3>
              <p className="text-xs font-mono text-slate-400 uppercase">
                Mechanism-First Integrity Standard
              </p>

              <p>
                PharmaSignal operates as an executive decision-intelligence engine for
                biopharma BD&amp;L leadership. Our coverage avoids promotional press releases,
                vague corporate optimism, and unverified rumors.
              </p>

              <h4 className="font-bold text-base mt-4">1. The Two-Source Verification Rule</h4>
              <p>
                Every Deal Signal article must be independently substantiated by verified primary
                disclosures:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Direct corporate press releases from both counterparties</li>
                <li>Regulatory filings (e.g., SEC 8-K, 10-Q, HKEX, Shanghai Stock Exchange)</li>
                <li>Public investor briefing presentations</li>
              </ul>

              <h4 className="font-bold text-base mt-4">
                2. Distinction Between Contract Terms and Analytical Read
              </h4>
              <p>
                We clearly separate factual transaction disclosures (territories, milestones,
                upfronts, supply obligations) from PharmaSignal&apos;s proprietary analytical
                interpretations (mechanisms, capability arbitrage, governance friction, and BD
                principles).
              </p>

              <h4 className="font-bold text-base mt-4">3. No Stock Photos or Fabricated Assets</h4>
              <p>
                All visual transaction cards are engineered with bespoke SVG architecture
                focusing on counterparty flows, territory partitioning, and economic streams. We
                strictly prohibit stock photos, generic 3D molecular renders, or fabricated
                trademarks.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div id="cookies-content" className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-[#0066CC]">
                Cookie &amp; Local Storage Policy
              </h3>
              <p className="text-xs font-mono text-slate-400 uppercase">
                Zero Ad-Tracking Commitment
              </p>

              <p>
                PharmaSignal does not employ third-party advertising trackers or invasive
                cross-site cookie networks.
              </p>

              <h4 className="font-bold text-base mt-4">Local Storage &amp; Essential Cookies</h4>
              <p>
                We use minimal browser local storage strictly for your personal viewing
                preferences:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  <code>theme</code>: Persisting your Light Mode / Dark Mode visual preference.
                </li>
                <li>
                  <code>recent_deals</code>: Remembering which deal articles you have recently
                  reviewed in your session.
                </li>
              </ul>
              <p className="text-sm mt-2">
                You can clear your local storage at any time through your browser settings with no
                loss of site functionality.
              </p>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div
          id="policy-modal-footer"
          className={`flex items-center justify-between px-6 py-4 border-t ${
            isDarkMode ? 'border-slate-800 bg-[#070F1E]' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <span className="text-xs text-slate-400 font-mono">
            PharmaSignal Decision Intelligence · Editorial Desk
          </span>
          <button
            id="policy-modal-done-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0066CC] hover:bg-[#0052a3] text-white text-sm font-semibold transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
