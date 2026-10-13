interface CapabilityToObligationDiagramProps {
  darkMode?: boolean;
}

export default function CapabilityToObligationDiagram({ darkMode = false }: CapabilityToObligationDiagramProps) {
  const bg = darkMode ? '#0D1E33' : '#FFFFFF';
  const border = darkMode ? '#1E3553' : '#CBD5E1';
  const textPrimary = darkMode ? '#FFFFFF' : '#0B121E';
  const textMuted = darkMode ? '#94A3B8' : '#64748B';
  const gold = darkMode ? '#C5A059' : '#9A7426';
  const goldBg = darkMode ? 'rgba(197, 160, 89, 0.12)' : 'rgba(154, 116, 38, 0.08)';
  const goldBorder = darkMode ? '#C5A059' : '#9A7426';
  const lineCol = darkMode ? '#1E3553' : '#E2E8F0';

  const steps = [
    {
      num: '01',
      title: 'Transaction Obligation',
      subtitle: 'Map specific transferred duties',
      items: ['Regulatory registration', 'Payer & hospital access', 'Specialist physician reach', 'Local manufacturing / CMC']
    },
    {
      num: '02',
      title: 'Required Capability',
      subtitle: 'Define granular execution criteria',
      items: ['Agency dossier track record', 'Tender channel navigation', 'KOL medical relationships', 'Decision speed & focus']
    },
    {
      num: '03',
      title: 'Partner Evidence',
      subtitle: 'Test track record over scale',
      items: ['Recent launch outcomes', 'Comparable class filings', 'Portfolio priority share', 'Dedicated operational team']
    },
    {
      num: '04',
      title: 'Capability Gap',
      subtitle: 'Isolate potential value leakage',
      items: ['Filing delays & queries', 'Slow institutional uptake', 'Asset gets deprioritized', 'Internal governance friction']
    },
    {
      num: '05',
      title: 'Mitigation & Design',
      subtitle: 'Price gap into transaction terms',
      items: ['Retain critical functions', 'Split territory rights', 'Phased technology transfer', 'Tie gates to proof']
    }
  ];

  return (
    <div className="w-full my-8 p-4 sm:p-6 border border-brand-gold/30 rounded-none bg-brand-deep/30 dark:bg-black/20">
      <div className="text-center mb-6">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-brand-gold font-bold block mb-1">
          THE CAPABILITY-TO-OBLIGATION FRAMEWORK
        </span>
        <h4 className={`font-serif text-lg sm:text-xl font-bold ${textPrimary}`}>
          From Deal Obligations to Risk-Mitigated Partner Fit
        </h4>
        <p className={`text-xs font-serif italic mt-1 ${textMuted}`}>
          Start with the transaction, not the counterparty.
        </p>
      </div>

      {/* Grid of 5 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="flex flex-col justify-between p-3.5 border transition-all duration-200 relative group"
            style={{
              backgroundColor: bg,
              borderColor: idx === 2 ? goldBorder : border,
              borderWidth: idx === 2 ? '2px' : '1px'
            }}
          >
            {/* Top Step Number Badge */}
            <div className="flex items-center justify-between mb-2">
              <span 
                className="font-mono text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase border"
                style={{ backgroundColor: goldBg, borderColor: goldBorder, color: gold }}
              >
                STEP {step.num}
              </span>
              {idx < 4 && (
                <span className="hidden md:inline font-mono text-xs font-bold" style={{ color: gold }}>
                  →
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="mb-2.5">
              <h5 className="font-serif text-sm font-bold leading-tight" style={{ color: textPrimary }}>
                {step.title}
              </h5>
              <p className="text-[11px] leading-tight mt-0.5" style={{ color: gold }}>
                {step.subtitle}
              </p>
            </div>

            <div className="w-full h-[1px] my-2" style={{ backgroundColor: lineCol }} />

            {/* Bullet Points */}
            <ul className="space-y-1 text-[11px] leading-relaxed" style={{ color: textMuted }}>
              {step.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-1">
                  <span style={{ color: gold }} className="shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Principle Callout Bar */}
      <div 
        className="mt-6 p-3 sm:p-4 border-l-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ backgroundColor: goldBg, borderColor: gold }}
      >
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest block" style={{ color: gold }}>
            PHARMASIGNAL PRINCIPLE
          </span>
          <p className="font-serif text-xs sm:text-sm font-bold italic" style={{ color: textPrimary }}>
            “Do not select the strongest partner. Select the partner whose proven capabilities best match the obligations that determine value.”
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-wider uppercase px-2 py-1 border font-bold" style={{ borderColor: gold, color: gold }}>
          FIT &gt; SCALE
        </span>
      </div>
    </div>
  );
}
