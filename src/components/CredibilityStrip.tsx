import { motion } from 'motion/react';
import { ShieldAlert, Award } from 'lucide-react';

export default function CredibilityStrip() {
  const tags = [
    'Licensing',
    'Portfolio Strategy',
    'Commercial Excellence',
    'Emerging Markets'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-brand-primary text-white p-8 md:p-10 rounded-none shadow-xl mt-16 max-w-5xl mx-auto border border-brand-gold/20 relative overflow-hidden"
      id="credibility-strip-card"
    >
      {/* Decorative clean line background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        
        {/* Left Side: Shield + Text */}
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="p-3 bg-brand-gold/10 rounded-none border border-brand-gold/30 text-brand-gold shrink-0">
            <Award size={28} strokeWidth={1.5} className="animate-pulse" />
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-medium tracking-tight text-white/95">
              Built from real-world pharmaceutical business development experience.
            </span>
          </div>
        </div>

        {/* Right Side: Horizontal Category Tags */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 text-center shrink-0">
          {tags.map((tag, idx) => (
            <div key={tag} className="flex items-center">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest font-semibold uppercase text-brand-gold">
                {tag}
              </span>
              {idx < tags.length - 1 && (
                <span className="mx-3 text-white/30 text-sm font-light">•</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
