import { ArrowRight, BookOpen, Layers, Radio, Users, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutPageProps {
  darkMode: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  openSubscription: () => void;
}

export default function AboutPage({ darkMode, setActiveTab, openSubscription }: AboutPageProps) {
  const navigateTo = (tab: ActiveTab, path: string) => {
    setActiveTab(tab);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#061426] text-[#F8FAFC]' : 'bg-[#FAFAFA] text-[#061426]'}`}>
      <main className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Header Section */}
        <div className="text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-3 px-2 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
            DECISION INTELLIGENCE
          </span>
          <h1 className={`font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-tight leading-[1.15] mb-4 ${
            darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
          }`}>
            About PharmaSignal
          </h1>
          <div className="h-[2px] w-12 bg-[#C5A059] mb-6" />
          
          <p className={`font-serif text-[18px] sm:text-[22px] leading-[1.5] max-w-3xl font-medium ${
            darkMode ? 'text-[#CBD5E1]' : 'text-slate-800'
          }`}>
            PharmaSignal examines how pharmaceutical licensing, partnerships and M&A are structured—and how those structures affect execution and value.
          </p>
        </div>

        {/* Audience Callout Box */}
        <div className={`p-6 sm:p-8 border mb-14 text-left ${
          darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2 mb-3 text-[#C5A059] font-mono text-[11px] font-bold uppercase tracking-wider">
            <Users size={16} />
            <span>Target Audience</span>
          </div>
          <p className={`font-sans text-[15px] sm:text-[17px] leading-[1.6] ${
            darkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            For professionals working in business development, licensing, alliance management, portfolio strategy and commercial strategy.
          </p>
        </div>

        {/* Coverage Section */}
        <div className="mb-14 text-left">
          <div className="mb-6">
            <h2 className={`font-serif text-[24px] sm:text-[28px] font-bold tracking-tight ${
              darkMode ? 'text-[#F8FAFC]' : 'text-[#061426]'
            }`}>
              What We Cover
            </h2>
            <div className="h-[2px] w-8 bg-[#C5A059] mt-2 mb-3" />
            <p className={`font-sans text-[14px] sm:text-[15px] leading-relaxed max-w-2xl ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Our publications are organized into three primary intelligence formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Deal Signals Card */}
            <div className={`p-6 sm:p-7 border flex flex-col justify-between ${
              darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C5A059]">
                  <Radio size={18} />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase">Format 01</span>
                </div>
                <h3 className={`font-serif text-[20px] font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-[#061426]'
                }`}>
                  Deal Signals
                </h3>
                <p className={`font-sans text-[14px] leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Our Deal Signals examine individual transactions.
                </p>
              </div>
              <button
                onClick={() => navigateTo('DEAL SIGNALS', '/deal-signals')}
                className="inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-wider text-[#C5A059] hover:underline cursor-pointer"
              >
                <span>Browse Deal Signals</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Explainers Card */}
            <div className={`p-6 sm:p-7 border flex flex-col justify-between ${
              darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C5A059]">
                  <BookOpen size={18} />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase">Format 02</span>
                </div>
                <h3 className={`font-serif text-[20px] font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-[#061426]'
                }`}>
                  Explainers
                </h3>
                <p className={`font-sans text-[14px] leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Our Explainers examine recurring BD challenges.
                </p>
              </div>
              <button
                onClick={() => navigateTo('HOME', '/#explainers')}
                className="inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-wider text-[#C5A059] hover:underline cursor-pointer"
              >
                <span>Explore Explainers</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Decision Lenses Card */}
            <div className={`p-6 sm:p-7 border flex flex-col justify-between ${
              darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C5A059]">
                  <Layers size={18} />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase">Format 03</span>
                </div>
                <h3 className={`font-serif text-[20px] font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-[#061426]'
                }`}>
                  Decision Lenses
                </h3>
                <p className={`font-sans text-[14px] leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Our Decision Lenses help readers apply those ideas to other opportunities.
                </p>
              </div>
              <button
                onClick={() => navigateTo('LENSES', '/lenses')}
                className="inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-wider text-[#C5A059] hover:underline cursor-pointer"
              >
                <span>View Decision Lenses</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Strategic Methodology Callout */}
        <div className={`p-8 border text-left mb-12 ${
          darkMode ? 'bg-[#0A1A2B] border-[#C5A059]/40 text-[#F8FAFC]' : 'bg-[#FAF6EE] border-[#C5A059]/50 text-[#061426]'
        }`}>
          <div className="flex items-center gap-2 text-[#C5A059] font-mono text-[11px] font-bold tracking-widest uppercase mb-3">
            <ShieldCheck size={16} />
            <span>Analytical Methodology</span>
          </div>
          <p className="font-serif text-[16px] sm:text-[18px] leading-[1.6] mb-4">
            "Pharma deal value is shaped by the terms agreed at signing and by how rights, responsibilities and execution capabilities work together afterward."
          </p>
          <p className={`font-sans text-[13.5px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Every analysis published by PharmaSignal emphasizes verifiable contractual terms, disclosure documents, and operational mechanisms to provide senior dealmakers with objective, repeatable decision-intelligence.
          </p>
        </div>

        {/* Subscribe CTA */}
        <div className={`p-8 border text-center ${
          darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`font-serif text-[22px] font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#061426]'}`}>
            Receive PharmaSignal Deal Intelligence
          </h3>
          <p className={`font-sans text-[14px] max-w-xl mx-auto mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Receive PharmaSignal briefings on licensing, alliances and deal execution.
          </p>
          <button
            onClick={openSubscription}
            className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all shadow-xs cursor-pointer"
          >
            Subscribe to Deal Signals
          </button>
        </div>

      </main>
    </div>
  );
}
