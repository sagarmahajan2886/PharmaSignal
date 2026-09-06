import { ArrowLeft, Home, Radio, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types';

interface NotFoundPageProps {
  darkMode: boolean;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function NotFoundPage({ darkMode, setActiveTab }: NotFoundPageProps) {
  const navigateTo = (tab: ActiveTab, path: string) => {
    setActiveTab(tab);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-[#061426] text-[#F8FAFC]' : 'bg-[#FAFAFA] text-[#061426]'
    }`}>
      <div className={`max-w-lg w-full p-8 sm:p-10 border text-center ${
        darkMode ? 'bg-[#0D243A] border-[#1E3A55]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <span className="inline-block text-[11px] font-mono tracking-[0.08em] text-[#C5A059] font-bold uppercase mb-4 px-2.5 py-0.5 border border-[#C5A059]/30 bg-[#061426]">
          404 · PAGE NOT FOUND
        </span>

        <h1 className={`font-serif text-[28px] sm:text-[34px] font-bold tracking-tight mb-3 ${
          darkMode ? 'text-white' : 'text-[#061426]'
        }`}>
          Analysis Not Found
        </h1>

        <div className="h-[2px] w-10 bg-[#C5A059] mx-auto mb-4" />

        <p className={`font-sans text-[14px] leading-relaxed mb-8 ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          The requested URL does not correspond to an active Deal Signal, Explainer, or intelligence brief.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigateTo('HOME', '/')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#C5A059] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </button>
          
          <button
            onClick={() => navigateTo('DEAL SIGNALS', '/deal-signals')}
            className={`w-full sm:w-auto px-5 py-2.5 border text-xs font-sans font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              darkMode 
                ? 'border-white/20 text-white hover:border-[#C5A059] hover:text-[#C5A059]' 
                : 'border-slate-300 text-slate-700 hover:border-[#061426] hover:text-[#061426]'
            }`}
          >
            <Radio size={14} />
            <span>View Deal Signals</span>
          </button>
        </div>
      </div>
    </div>
  );
}
