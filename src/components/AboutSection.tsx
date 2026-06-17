import { motion } from 'motion/react';
import { BookOpen, FileText, Globe, CheckCircle, RefreshCcw, Lock } from 'lucide-react';

export default function AboutSection() {
  const steps = [
    {
      title: 'Structural Analysis',
      desc: 'We map raw clinical and biochemical attributes directly to standard financial valuation and pricing matrices.',
      icon: BookOpen,
    },
    {
      title: 'Neutral Methodology',
      desc: 'Independent of investment bank brokerages and agency syndications. Our insights stay 100% objective.',
      icon: FileText,
    },
    {
      title: 'Global Scale Integration',
      desc: 'Tracking asset movements and commercial launches across both established and major emerging markets.',
      icon: Globe,
    },
  ];

  return (
    <section 
      id="about-section" 
      className="scroll-mt-24 py-20 sm:py-28 bg-[#06131F] text-white border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#001B2A]/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="inline-block text-xs font-mono tracking-widest text-brand-gold uppercase font-bold mb-3">
            GUIDING PRINCIPLES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            The Rules of Strategic Pharma BD
          </h2>
          <div className="h-[2px] w-12 bg-brand-gold mx-auto mb-6" />
          <p className="font-sans text-sm sm:text-base leading-relaxed text-white/70">
            PharmaSignal is an independent intellectual platform founded by former pharmaceutical executives, access analysts, and clinical researchers. We operate on the boundary where corporate transaction logic meets real-world clinical feasibility. Our goal is simple: to make value structures transparent.
          </p>
        </div>

        {/* 3-column structured indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 bg-brand-primary/40 border border-white/10 flex flex-col items-center text-center rounded-none group hover:border-brand-gold/60 transition-colors"
              >
                <div className="p-4 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6 group-hover:bg-brand-gold group-hover:text-brand-primary transition-all duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Callouts block */}
        <div className="mt-20 p-8 sm:p-12 border border-brand-gold/20 bg-brand-primary/30 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-serif text-2xl font-bold tracking-tight text-brand-gold mb-2">
                Independent Strategic Publication
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                PharmaSignal does not accept sponsored content, and we do not provide brokerage services. All explainers, research, and frameworks are compiled independently utilizing publicly available registries, patent disclosures, and proprietary pricing models.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
