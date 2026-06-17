import { motion } from 'motion/react';
import { ShieldAlert, Compass, Layers, Handshake, Zap } from 'lucide-react';

interface Audience {
  title: string;
  desc: string;
  icon: any;
}

const AUDIENCES: Audience[] = [
  {
    title: 'Licensing Leaders',
    desc: 'Make better go / no-go and partner decisions based on objective, structural value indicators.',
    icon: ShieldAlert,
  },
  {
    title: 'BD Professionals',
    desc: 'Identify, evaluate, and advance high-potential opportunities with practical evaluation frameworks.',
    icon: Compass,
  },
  {
    title: 'Portfolio Strategy Leaders',
    desc: 'Allocate rare development resources dynamically to maximize commercial return and therapeutic impact.',
    icon: Layers,
  },
  {
    title: 'Alliance Managers',
    desc: 'Structure and manage high-value strategic partnerships with balanced risk allocation and governance.',
    icon: Handshake,
  },
  {
    title: 'Commercial Leaders',
    desc: 'Drive geographical territory execution, optimize pricing structures, and improve post-market launch curves.',
    icon: Zap,
  },
];

interface AudienceGridProps {
  darkMode?: boolean;
}

export default function AudienceGrid({ darkMode = false }: AudienceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 mt-12">
      {AUDIENCES.map((audience, i) => {
        const Icon = audience.icon;
        return (
          <motion.div
            key={audience.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`flex flex-col p-6 sm:p-7 border relative hover:border-brand-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded-none ${
              darkMode 
                ? 'bg-brand-primary border-white/10 shadow-sm' 
                : 'bg-white border-brand-border/80 shadow-sm'
            }`}
            id={`audience-card-${i}`}
          >
            {/* Minimal top gold accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />
            
            {/* Icon */}
            <div className="mb-6 text-brand-gold">
              <Icon size={32} strokeWidth={1.2} className="group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Title */}
            <h3 className={`font-serif text-lg font-bold mb-3 leading-tight tracking-tight ${
              darkMode ? 'text-white' : 'text-brand-primary'
            }`}>
              {audience.title}
            </h3>

            {/* Description */}
            <p className={`font-sans text-xs sm:text-[13px] leading-relaxed ${
              darkMode ? 'text-white/70' : 'text-brand-charcoal/70'
            }`}>
              {audience.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
