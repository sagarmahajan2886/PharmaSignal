import { Layers, Shield, Compass, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface DealBadgeStripProps {
  article: Article;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onBadgeClick?: (badgeType: 'assetClass' | 'dealStructure' | 'geographicScope', value: string) => void;
  className?: string;
}

export default function DealBadgeStrip({
  article,
  darkMode = true,
  size = 'md',
  onBadgeClick,
  className = ''
}: DealBadgeStripProps) {
  // Extract or fall back to sensible defaults
  const assetClass = article.assetClass || (
    article.tags?.find(t => t.includes('BIOSIMILAR') || t.includes('RNA') || t.includes('MOLECULE') || t.includes('CAR-T') || t.includes('FcRn'))
    || 'Targeted Biologic'
  );
  
  const dealStructure = article.dealStructure || (
    article.mechanism || 'Territorial Licensing'
  );

  const geographicScope = article.geographicScope || (
    article.tags?.find(t => t.includes('JAPAN') || t.includes('CHINA') || t.includes('US') || t.includes('GLOBAL'))
    || 'Tiered Territorial Rights'
  );

  const isSmall = size === 'sm';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 my-3 ${className}`}>
      {/* Badge 1: Asset Class */}
      <div 
        onClick={(e) => {
          if (onBadgeClick) {
            e.stopPropagation();
            onBadgeClick('assetClass', assetClass);
          }
        }}
        className={`p-2 sm:p-2.5 border transition-all flex flex-col justify-between ${
          onBadgeClick ? 'cursor-pointer hover:border-brand-gold' : ''
        } ${
          darkMode 
            ? 'bg-[#061426] border-white/10 text-white/90' 
            : 'bg-[#FAF6EE] border-[#EADBCC] text-[#001B2A]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Layers size={11} className="text-brand-gold shrink-0" />
          <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold truncate">
            Asset Class
          </span>
        </div>
        <span className={`${isSmall ? 'text-[11px]' : 'text-xs'} font-semibold font-sans line-clamp-1`}>
          {assetClass}
        </span>
      </div>

      {/* Badge 2: Deal Structure */}
      <div 
        onClick={(e) => {
          if (onBadgeClick) {
            e.stopPropagation();
            onBadgeClick('dealStructure', dealStructure);
          }
        }}
        className={`p-2 sm:p-2.5 border transition-all flex flex-col justify-between ${
          onBadgeClick ? 'cursor-pointer hover:border-brand-gold' : ''
        } ${
          darkMode 
            ? 'bg-[#061426] border-white/10 text-white/90' 
            : 'bg-[#FAF6EE] border-[#EADBCC] text-[#001B2A]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Shield size={11} className="text-brand-gold shrink-0" />
          <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold truncate">
            Deal Structure
          </span>
        </div>
        <span className={`${isSmall ? 'text-[11px]' : 'text-xs'} font-semibold font-sans line-clamp-1`}>
          {dealStructure}
        </span>
      </div>

      {/* Badge 3: Geographic Scope */}
      <div 
        onClick={(e) => {
          if (onBadgeClick) {
            e.stopPropagation();
            onBadgeClick('geographicScope', geographicScope);
          }
        }}
        className={`p-2 sm:p-2.5 border transition-all flex flex-col justify-between ${
          onBadgeClick ? 'cursor-pointer hover:border-brand-gold' : ''
        } ${
          darkMode 
            ? 'bg-[#061426] border-white/10 text-white/90' 
            : 'bg-[#FAF6EE] border-[#EADBCC] text-[#001B2A]'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Compass size={11} className="text-brand-gold shrink-0" />
          <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold truncate">
            Geographic Scope
          </span>
        </div>
        <span className={`${isSmall ? 'text-[11px]' : 'text-xs'} font-semibold font-sans line-clamp-1`}>
          {geographicScope}
        </span>
      </div>
    </div>
  );
}
