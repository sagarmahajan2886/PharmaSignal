import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Linkedin, 
  FileDown, 
  Sparkles, 
  Layers, 
  Activity, 
  Compass, 
  ExternalLink,
  Shield,
  Clock,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Article } from '../types';

interface LinkedInCarouselModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function LinkedInCarouselModal({
  article,
  isOpen,
  onClose,
  darkMode = true
}: LinkedInCarouselModalProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);
  const [copiedPost, setCopiedPost] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Hidden container holding all 4 slides for multi-page PDF generation
  const slidesExportContainerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !article) return null;

  const totalSlides = 4;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://pharmasignal.com';
  const dealDeepLink = `${currentOrigin}/?deal=${article.id}`;

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Copy Executive LinkedIn Post Text
  const handleCopyPostText = () => {
    const postCopy = `🚨 PHARMASIGNAL DEAL BRIEF: ${article.title.toUpperCase()}

How biopharma BD&L creates and protects value through transaction architecture:

📊 QUICK SCAN METRICS:
• Asset Class: ${article.assetClass || 'Targeted Biologic'}
• Deal Structure: ${article.dealStructure || 'Territorial Licensing & Execution Transfer'}
• Geographic Scope: ${article.geographicScope || 'Global / Tiered Regional'}
• Published Date: ${article.date}

💡 THE PHARMASIGNAL READ:
${article.pharmaSignalRead || article.description}

🎯 THE BD PRINCIPLE:
"Territorial rights and deal terms only create enterprise value when the operational capability to execute travels with the contract."

Read the complete mechanism deconstruction and interactive transaction diagram on PharmaSignal:
🔗 ${dealDeepLink}

#Biopharma #BusinessDevelopment #PharmaLicensing #LifeSciences #DealMaking #PharmaSignal #BiotechStrategy`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(postCopy);
    }
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dealDeepLink);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Export full multi-page PDF Carousel for LinkedIn Document posts
  const handleExportPDF = async () => {
    if (!slidesExportContainerRef.current) return;
    setIsGeneratingPdf(true);

    try {
      // 1200 x 675 is standard 16:9 landscape
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 675]
      });

      const slideElements = slidesExportContainerRef.current.querySelectorAll('.export-slide-item');
      
      for (let i = 0; i < slideElements.length; i++) {
        const slideEl = slideElements[i] as HTMLElement;
        const canvas = await html2canvas(slideEl, {
          scale: 2, // 2x retina clarity
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#061426',
          logging: false,
          width: 1200,
          height: 675
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) {
          pdf.addPage([1200, 675], 'landscape');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 1200, 675);
      }

      const fileName = `${article.id}-pharmasignal-linkedin-carousel.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Error generating carousel PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Export currently selected slide as high-res PNG
  const handleExportSinglePng = async () => {
    if (!slidesExportContainerRef.current) return;
    setIsGeneratingPng(true);

    try {
      const slideElements = slidesExportContainerRef.current.querySelectorAll('.export-slide-item');
      const targetSlide = slideElements[activeSlide] as HTMLElement;
      if (!targetSlide) return;

      const canvas = await html2canvas(targetSlide, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#061426',
        logging: false,
        width: 1200,
        height: 675
      });

      const link = document.createElement('a');
      link.download = `${article.id}-slide-${activeSlide + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error exporting PNG:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="linkedin-carousel-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-primary/85 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl overflow-hidden text-left align-middle shadow-2xl transition-all border border-brand-gold/40 bg-[#061426] text-white flex flex-col rounded-none"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-gold/20 bg-[#040E1B]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-[#0A66C2] flex items-center justify-center text-white shadow-sm">
                <Linkedin size={18} fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                    LINKEDIN CAROUSEL EXPORTER
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 uppercase">
                    16:9 HD Document
                  </span>
                </div>
                <h2 className="font-serif text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
                  {article.shortTitle || article.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer uppercase"
                title="Copy Deep Link"
              >
                {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                <span>{copiedLink ? 'Copied' : 'Link'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-none text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Carousel Live Preview (8 cols) */}
            <div className="w-full lg:col-span-8 flex flex-col items-center">
              
              {/* Slide Screen Frame */}
              <div 
                ref={activeSlideRef}
                className="w-full aspect-[16/9] bg-[#040E1B] border-2 border-brand-gold/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none"
              >
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Bar of Slide */}
                <div className="relative z-10 flex items-center justify-between border-b border-brand-gold/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-brand-gold" />
                    <span className="font-mono text-xs font-bold tracking-widest text-brand-gold uppercase">
                      PHARMASIGNAL · DEAL DESK
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/60 tracking-wider uppercase">
                    SLIDE {activeSlide + 1} OF {totalSlides}
                  </span>
                </div>

                {/* Slide Dynamic Content */}
                <div className="relative z-10 my-auto py-2">
                  <AnimatePresence mode="wait">
                    {activeSlide === 0 && (
                      /* SLIDE 1: Executive Deal Brief & 3-Badge Strip */
                      <motion.div
                        key="slide-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="inline-block px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold font-mono text-[10px] font-bold uppercase tracking-wider">
                          DEAL SIGNAL ANALYSIS · {article.date?.toUpperCase()}
                        </div>
                        <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {article.title}
                        </h1>

                        {/* 3-Badge Strip on Slide */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                          <div className="p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              ASSET CLASS
                            </span>
                            <span className="text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.assetClass || 'Targeted Biologic'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              DEAL STRUCTURE
                            </span>
                            <span className="text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.dealStructure || 'Territorial Architecture'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              GEOGRAPHIC SCOPE
                            </span>
                            <span className="text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.geographicScope || 'Global Tiered Rights'}
                            </span>
                          </div>
                        </div>

                        <p className="font-serif text-xs sm:text-sm text-white/80 italic leading-relaxed pt-1 line-clamp-3">
                          "{article.description || article.featuredSummary}"
                        </p>
                      </motion.div>
                    )}

                    {activeSlide === 1 && (
                      /* SLIDE 2: Transaction Architecture & Diagram */
                      <motion.div
                        key="slide-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase">
                            TRANSACTION ARCHITECTURE
                          </span>
                          <span className="text-[9px] font-mono text-white/60 uppercase">
                            Value & Rights Flow
                          </span>
                        </div>

                        {article.imageUrl ? (
                          <div className="w-full aspect-[2.1/1] overflow-hidden border border-brand-gold/40 bg-[#020A14] flex items-center justify-center relative">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              className="w-full h-full object-cover object-center"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="p-4 bg-white/5 border border-brand-gold/30 space-y-2">
                            <span className="text-xs font-bold text-brand-gold font-mono block uppercase">
                              Structure Breakdown
                            </span>
                            <p className="text-xs font-sans text-white/90 leading-relaxed">
                              {article.featuredSummary || article.description}
                            </p>
                          </div>
                        )}

                        <p className="text-[11px] font-mono text-brand-gold/90 tracking-wide text-center">
                          Swipe to inspect the PharmaSignal Strategic Mechanism →
                        </p>
                      </motion.div>
                    )}

                    {activeSlide === 2 && (
                      /* SLIDE 3: PharmaSignal Mechanism Read & Value Drivers */
                      <motion.div
                        key="slide-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-3"
                      >
                        <div className="inline-block px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold font-mono text-[10px] font-bold uppercase tracking-wider">
                          THE PHARMASIGNAL READ
                        </div>
                        
                        <div className="p-4 bg-brand-gold/10 border-l-4 border-brand-gold space-y-2">
                          <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-snug">
                            {article.pharmaSignalRead || 'Mechanism Breakdown'}
                          </h3>
                          {article.useThisWhen && (
                            <p className="text-xs font-sans text-white/80 leading-relaxed">
                              <strong className="text-brand-gold font-mono uppercase text-[9px] block">Decision Context:</strong>
                              {article.useThisWhen}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-left pt-1">
                          <div className="p-2.5 bg-white/5 border border-white/10">
                            <span className="text-[9px] font-mono text-brand-gold uppercase block font-bold">
                              VALUE LEVER
                            </span>
                            <span className="text-xs font-sans text-white/90">
                              Capability Arbitrage & Downstream Margin
                            </span>
                          </div>
                          <div className="p-2.5 bg-white/5 border border-white/10">
                            <span className="text-[9px] font-mono text-brand-gold uppercase block font-bold">
                              KEY RISK
                            </span>
                            <span className="text-xs font-sans text-white/90">
                              Governance Debt & Interface Friction
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSlide === 3 && (
                      /* SLIDE 4: Strategic Principle & Actionable Call to Action */
                      <motion.div
                        key="slide-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 text-center"
                      >
                        <div className="inline-block px-3 py-1 bg-brand-gold/20 border border-brand-gold/60 text-brand-gold font-mono text-[10px] font-bold uppercase tracking-widest">
                          PHARMASIGNAL PRINCIPLE
                        </div>

                        <blockquote className="font-serif text-base sm:text-lg lg:text-xl font-bold text-white italic leading-relaxed px-4">
                          "Territorial rights and deal terms create value only when the capability to execute travels with the rights."
                        </blockquote>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                          <div className="px-4 py-2 bg-brand-gold text-brand-primary font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                            <span>Read Full Signal:</span>
                            <span className="underline">pharmasignal.com/?deal={article.id}</span>
                          </div>
                        </div>

                        <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                          Biopharma BD Decision Intelligence · Follow on LinkedIn for Weekly Deal Briefings
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Footer of Slide */}
                <div className="relative z-10 flex items-center justify-between border-t border-brand-gold/20 pt-3">
                  <span className="font-mono text-[9px] text-brand-gold uppercase tracking-widest font-semibold">
                    PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                  </span>
                  <span className="font-mono text-[9px] text-white/50 tracking-wider">
                    {article.id}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="w-full flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 transition-all cursor-pointer rounded-none ${
                        activeSlide === i 
                          ? 'w-8 bg-brand-gold' 
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Go to Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-xs text-white/70 px-2">
                    {activeSlide + 1} / {totalSlides}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 1-Click Export Tools (4 cols) */}
            <div className="w-full lg:col-span-4 flex flex-col space-y-4">
              
              {/* Primary PDF Download Action */}
              <div className="p-5 bg-[#0A1A2E] border border-brand-gold/30 flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  <FileDown size={18} className="text-brand-gold" />
                  <h3 className="font-serif text-base font-bold text-white">
                    Export Multi-Slide PDF
                  </h3>
                </div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  LinkedIn supports high-engagement multi-page document carousels. Generates a pristine 4-slide PDF ready to upload directly to LinkedIn.
                </p>

                <button
                  onClick={handleExportPDF}
                  disabled={isGeneratingPdf}
                  className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Download Carousel (PDF)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Copy LinkedIn Post Text */}
              <div className="p-5 bg-[#0A1A2E] border border-white/10 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-[#0A66C2]" />
                    <h3 className="font-serif text-sm font-bold text-white">
                      LinkedIn Post Copy
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-brand-gold uppercase font-bold">
                    Executive Style
                  </span>
                </div>

                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Pre-formatted executive post with key metric hooks, summary takeaways, and deep-link back to PharmaSignal.
                </p>

                <button
                  onClick={handleCopyPostText}
                  className="w-full py-2.5 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedPost ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Post Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Post Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Single Slide PNG Download */}
              <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase font-bold block">
                    CURRENT SLIDE
                  </span>
                  <span className="text-xs text-white/80 font-sans">
                    Slide #{activeSlide + 1} as Image
                  </span>
                </div>
                <button
                  onClick={handleExportSinglePng}
                  disabled={isGeneratingPng}
                  className="px-3 py-1.5 border border-brand-gold/40 hover:border-brand-gold text-brand-gold text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={12} />
                  <span>PNG</span>
                </button>
              </div>

              {/* Instructions Tip */}
              <div className="p-3 bg-brand-gold/5 border-l-2 border-brand-gold text-[11px] font-mono text-brand-gold/90 space-y-1">
                <span className="font-bold block uppercase">How to Post on LinkedIn:</span>
                <p className="text-white/70 font-sans text-[11px]">
                  1. Click "Start a post" on LinkedIn.<br/>
                  2. Choose "Add a document" and upload the downloaded PDF.<br/>
                  3. Paste the copied post text.
                </p>
              </div>

            </div>

          </div>

          {/* OFF-SCREEN CONTAINER FOR PRE-RENDERING ALL 4 SLIDES AT FULL RESOLUTION (1200 x 675) */}
          <div 
            ref={slidesExportContainerRef}
            className="fixed -top-[99999px] -left-[99999px] pointer-events-none"
            style={{ width: '1200px', zIndex: -100 }}
          >
            {/* SLIDE 1 */}
            <div className="export-slide-item w-[1200px] h-[675px] bg-[#061426] text-white p-16 flex flex-col justify-between border-8 border-[#040E1B] box-border relative">
              <div className="flex items-center justify-between border-b-2 border-[#C5A880]/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#C5A880]" />
                  <span className="font-mono text-base font-bold tracking-widest text-[#C5A880] uppercase">
                    PHARMASIGNAL · DEAL DESK
                  </span>
                </div>
                <span className="font-mono text-sm text-white/60 tracking-widest uppercase">
                  SLIDE 1 OF 4
                </span>
              </div>

              <div className="space-y-6 my-auto">
                <div className="inline-block px-4 py-1.5 bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] font-mono text-xs font-bold uppercase tracking-widest">
                  DEAL SIGNAL BRIEF · {article.date?.toUpperCase()}
                </div>
                <h1 className="font-serif text-4xl font-bold text-white leading-tight max-w-4xl">
                  {article.title}
                </h1>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-white/5 border border-[#C5A880]/40">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block font-bold mb-1">
                      ASSET CLASS
                    </span>
                    <span className="text-base font-semibold text-white font-sans">
                      {article.assetClass || 'Targeted Biologic'}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-[#C5A880]/40">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block font-bold mb-1">
                      DEAL STRUCTURE
                    </span>
                    <span className="text-base font-semibold text-white font-sans">
                      {article.dealStructure || 'Territorial Architecture'}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-[#C5A880]/40">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block font-bold mb-1">
                      GEOGRAPHIC SCOPE
                    </span>
                    <span className="text-base font-semibold text-white font-sans">
                      {article.geographicScope || 'Global Tiered Rights'}
                    </span>
                  </div>
                </div>

                <p className="font-serif text-lg text-white/85 italic leading-relaxed">
                  "{article.description || article.featuredSummary}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#C5A880]/30 pt-4">
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest font-bold">
                  PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                </span>
                <span className="font-mono text-xs text-white/60">
                  Swipe for Transaction Architecture →
                </span>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="export-slide-item w-[1200px] h-[675px] bg-[#061426] text-white p-16 flex flex-col justify-between border-8 border-[#040E1B] box-border relative">
              <div className="flex items-center justify-between border-b-2 border-[#C5A880]/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#C5A880]" />
                  <span className="font-mono text-base font-bold tracking-widest text-[#C5A880] uppercase">
                    PHARMASIGNAL · DEAL DESK
                  </span>
                </div>
                <span className="font-mono text-sm text-white/60 tracking-widest uppercase">
                  SLIDE 2 OF 4
                </span>
              </div>

              <div className="space-y-4 my-auto">
                <span className="text-xs font-mono tracking-widest text-[#C5A880] font-bold uppercase block">
                  TRANSACTION ARCHITECTURE
                </span>

                {article.imageUrl ? (
                  <div className="w-full h-[360px] overflow-hidden border-2 border-[#C5A880]/50 bg-[#020A14] flex items-center justify-center">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="p-8 bg-white/5 border border-[#C5A880]/40 space-y-3">
                    <span className="text-base font-bold text-[#C5A880] font-mono block uppercase">
                      Structural Mechanism
                    </span>
                    <p className="text-base font-sans text-white/90 leading-relaxed">
                      {article.featuredSummary || article.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#C5A880]/30 pt-4">
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest font-bold">
                  PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                </span>
                <span className="font-mono text-xs text-white/60">
                  Swipe for Mechanism Read →
                </span>
              </div>
            </div>

            {/* SLIDE 3 */}
            <div className="export-slide-item w-[1200px] h-[675px] bg-[#061426] text-white p-16 flex flex-col justify-between border-8 border-[#040E1B] box-border relative">
              <div className="flex items-center justify-between border-b-2 border-[#C5A880]/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#C5A880]" />
                  <span className="font-mono text-base font-bold tracking-widest text-[#C5A880] uppercase">
                    PHARMASIGNAL · DEAL DESK
                  </span>
                </div>
                <span className="font-mono text-sm text-white/60 tracking-widest uppercase">
                  SLIDE 3 OF 4
                </span>
              </div>

              <div className="space-y-6 my-auto">
                <div className="inline-block px-4 py-1.5 bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] font-mono text-xs font-bold uppercase tracking-widest">
                  THE PHARMASIGNAL READ
                </div>

                <div className="p-6 bg-[#C5A880]/15 border-l-4 border-[#C5A880] space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                    {article.pharmaSignalRead || 'Mechanism Breakdown'}
                  </h3>
                  {article.useThisWhen && (
                    <p className="text-sm font-sans text-white/85 leading-relaxed pt-2">
                      <strong className="text-[#C5A880] font-mono uppercase text-xs block mb-1">When to Deploy this Architecture:</strong>
                      {article.useThisWhen}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10">
                    <span className="text-[11px] font-mono text-[#C5A880] uppercase block font-bold mb-1">
                      VALUE CREATION LEVER
                    </span>
                    <span className="text-sm font-sans text-white/90">
                      Capability Arbitrage & Selective Downstream Margin Ownership
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10">
                    <span className="text-[11px] font-mono text-[#C5A880] uppercase block font-bold mb-1">
                      CRITICAL FRICTION POINT
                    </span>
                    <span className="text-sm font-sans text-white/90">
                      Cross-border Governance Debt & Operational Hand-off Deficit
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#C5A880]/30 pt-4">
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest font-bold">
                  PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                </span>
                <span className="font-mono text-xs text-white/60">
                  Swipe for Strategic Principle →
                </span>
              </div>
            </div>

            {/* SLIDE 4 */}
            <div className="export-slide-item w-[1200px] h-[675px] bg-[#061426] text-white p-16 flex flex-col justify-between border-8 border-[#040E1B] box-border relative">
              <div className="flex items-center justify-between border-b-2 border-[#C5A880]/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#C5A880]" />
                  <span className="font-mono text-base font-bold tracking-widest text-[#C5A880] uppercase">
                    PHARMASIGNAL · DEAL DESK
                  </span>
                </div>
                <span className="font-mono text-sm text-white/60 tracking-widest uppercase">
                  SLIDE 4 OF 4
                </span>
              </div>

              <div className="space-y-8 my-auto text-center">
                <div className="inline-block px-5 py-2 bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] font-mono text-xs font-bold uppercase tracking-widest">
                  PHARMASIGNAL PRINCIPLE
                </div>

                <blockquote className="font-serif text-3xl font-bold text-white italic leading-relaxed max-w-4xl mx-auto">
                  "Territorial rights and deal terms create value only when the capability to execute travels with the rights."
                </blockquote>

                <div className="pt-4 flex items-center justify-center">
                  <div className="px-6 py-3 bg-[#C5A880] text-[#061426] font-mono text-sm font-bold tracking-widest uppercase">
                    Read Full Signal: pharmasignal.com/?deal={article.id}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-[#C5A880]/30 pt-4">
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest font-bold">
                  PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                </span>
                <span className="font-mono text-xs text-white/60">
                  Follow PharmaSignal on LinkedIn
                </span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}
