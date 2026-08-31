import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Copy, 
  Check, 
  Linkedin, 
  FileDown, 
  AlertCircle
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Article } from '../types';

interface LinkedInCarouselModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

// Utility to reliably trigger file downloads across Chrome, Safari, Android, and iOS
function triggerFileDownload(blob: Blob, filename: string) {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    }, 2500);
  } catch {
    const reader = new FileReader();
    reader.onloadend = () => {
      const link = document.createElement('a');
      link.href = reader.result as string;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1500);
    };
    reader.readAsDataURL(blob);
  }
}

// Helper: Wrap text into array of lines based on maxWidth in Canvas 2D
function getWrappedLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

// Helper: Draw rounded rectangle in Canvas 2D
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor?: string,
  strokeColor?: string,
  lineWidth: number = 1
) {
  ctx.beginPath();
  if (radius <= 0) {
    ctx.rect(x, y, width, height);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  ctx.closePath();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

// Helper: Load image safely as HTMLImageElement
function loadImageAsync(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

// Pure Canvas 2D Slide Renderer (1200x675 HD 16:9)
// Zero DOM dependencies, immune to CSS color/oklab parsing bugs
async function renderSlideToCanvas(article: Article, slideIndex: number): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  // Background
  ctx.fillStyle = '#061426';
  ctx.fillRect(0, 0, 1200, 675);

  // Outer Border
  ctx.strokeStyle = '#040E1B';
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1184, 659);

  // Gold Inner Accent Border
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, 20, 1160, 635);

  // Subtle grid dot pattern
  ctx.fillStyle = 'rgba(197, 168, 128, 0.08)';
  for (let gx = 35; gx < 1165; gx += 32) {
    for (let gy = 35; gy < 640; gy += 32) {
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }
  }

  // --- COMMON HEADER ---
  // Gold square icon
  ctx.fillStyle = '#C5A880';
  ctx.fillRect(50, 42, 12, 12);

  // Header Title
  ctx.fillStyle = '#C5A880';
  ctx.font = 'bold 14px "Courier New", Courier, monospace';
  ctx.fillText('PHARMASIGNAL · DEAL DESK', 72, 53);

  // Slide Counter
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '12px "Courier New", Courier, monospace';
  const slideText = `SLIDE ${slideIndex + 1} OF 4`;
  const slideTextWidth = ctx.measureText(slideText).width;
  ctx.fillText(slideText, 1150 - slideTextWidth, 53);

  // Header Divider
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 68);
  ctx.lineTo(1150, 68);
  ctx.stroke();

  // --- COMMON FOOTER ---
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 600);
  ctx.lineTo(1150, 600);
  ctx.stroke();

  ctx.fillStyle = '#C5A880';
  ctx.font = 'bold 11px "Courier New", Courier, monospace';
  ctx.fillText('PHARMASIGNAL.COM · BD DECISION INTELLIGENCE', 50, 622);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '11px "Courier New", Courier, monospace';
  const footerRightText = slideIndex === 3 ? 'Follow PharmaSignal on LinkedIn' : 'Swipe for Next Insight →';
  const footerRightWidth = ctx.measureText(footerRightText).width;
  ctx.fillText(footerRightText, 1150 - footerRightWidth, 622);

  // --- SLIDE SPECIFIC CONTENT ---
  if (slideIndex === 0) {
    // SLIDE 1: Executive Deal Brief & 3 Metrics
    // Badge
    const dateStr = (article.date || 'AUGUST 2026').toUpperCase();
    const tagText = `DEAL SIGNAL BRIEF · ${dateStr}`;
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    const tagWidth = ctx.measureText(tagText).width + 24;
    drawRoundedRect(ctx, 50, 95, tagWidth, 26, 0, 'rgba(197, 168, 128, 0.15)', 'rgba(197, 168, 128, 0.7)');
    ctx.fillStyle = '#C5A880';
    ctx.fillText(tagText, 62, 112);

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px Georgia, "Playfair Display", serif';
    const titleLines = getWrappedLines(ctx, article.title, 1080);
    let titleY = 165;
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 50, titleY);
      titleY += 40;
    }

    // 3 Metrics Columns
    const boxY = Math.max(titleY + 15, 275);
    const boxW = 345;
    const boxH = 90;

    const metrics = [
      { label: 'ASSET CLASS', val: article.assetClass || 'Targeted Biologic' },
      { label: 'DEAL STRUCTURE', val: article.dealStructure || 'Territorial Licensing' },
      { label: 'GEOGRAPHIC SCOPE', val: article.geographicScope || 'Global Tiered Rights' }
    ];

    metrics.forEach((m, idx) => {
      const bx = 50 + idx * (boxW + 22);
      drawRoundedRect(ctx, bx, boxY, boxW, boxH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(197, 168, 128, 0.35)');
      
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 10px "Courier New", Courier, monospace';
      ctx.fillText(m.label, bx + 16, boxY + 28);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const valLines = getWrappedLines(ctx, m.val, boxW - 32);
      ctx.fillText(valLines[0] || m.val, bx + 16, boxY + 58);
    });

    // Summary Quote
    const summaryY = boxY + boxH + 30;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'italic 16px Georgia, "Playfair Display", serif';
    const summary = article.description || article.featuredSummary || '';
    const summaryLines = getWrappedLines(ctx, `"${summary}"`, 1080);
    let sY = summaryY;
    for (const line of summaryLines.slice(0, 3)) {
      ctx.fillText(line, 50, sY);
      sY += 25;
    }

  } else if (slideIndex === 1) {
    // SLIDE 2: Transaction Architecture (Diagram Image or Structural Breakdown)
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 12px "Courier New", Courier, monospace';
    ctx.fillText('TRANSACTION ARCHITECTURE', 50, 100);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '11px "Courier New", Courier, monospace';
    ctx.fillText('Rights Partition & Value Stream Flow', 280, 100);

    const frameW = 1100;
    const frameH = 450;

    drawRoundedRect(ctx, 50, 118, frameW, frameH, 0, '#020A14', 'rgba(197, 168, 128, 0.5)', 1.5);

    if (article.imageUrl) {
      try {
        const img = await loadImageAsync(article.imageUrl);
        // Draw image fit contain
        const imgAspect = img.width / img.height;
        const frameAspect = (frameW - 20) / (frameH - 20);
        let dw = frameW - 20;
        let dh = frameH - 20;
        let dx = 50 + 10;
        let dy = 118 + 10;

        if (imgAspect > frameAspect) {
          dw = frameW - 20;
          dh = dw / imgAspect;
          dy = 118 + (frameH - dh) / 2;
        } else {
          dh = frameH - 20;
          dw = dh * imgAspect;
          dx = 50 + (frameW - dw) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
      } catch {
        // Fallback text if image load fails
        ctx.fillStyle = '#C5A880';
        ctx.font = 'bold 16px "Courier New", Courier, monospace';
        ctx.fillText('TRANSACTION STRUCTURE BREAKDOWN', 80, 160);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const fallbackLines = getWrappedLines(ctx, article.featuredSummary || article.description || '', 1000);
        let fY = 210;
        for (const fl of fallbackLines.slice(0, 8)) {
          ctx.fillText(fl, 80, fY);
          fY += 30;
        }
      }
    } else {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 16px "Courier New", Courier, monospace';
      ctx.fillText('TRANSACTION STRUCTURE BREAKDOWN', 80, 160);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const fallbackLines = getWrappedLines(ctx, article.featuredSummary || article.description || '', 1000);
      let fY = 210;
      for (const fl of fallbackLines.slice(0, 8)) {
        ctx.fillText(fl, 80, fY);
        fY += 30;
      }
    }

  } else if (slideIndex === 2) {
    // SLIDE 3: The PharmaSignal Read
    const tagText = 'THE PHARMASIGNAL READ';
    drawRoundedRect(ctx, 50, 95, 210, 26, 0, 'rgba(197, 168, 128, 0.15)', 'rgba(197, 168, 128, 0.7)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText(tagText, 62, 112);

    // Primary Mechanism Box with left gold line
    const boxW = 1100;
    const boxH = 210;
    drawRoundedRect(ctx, 50, 135, boxW, boxH, 0, 'rgba(197, 168, 128, 0.08)', 'rgba(197, 168, 128, 0.35)');
    
    // Thick Left Accent
    ctx.fillStyle = '#C5A880';
    ctx.fillRect(50, 135, 6, boxH);

    // Read Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Georgia, "Playfair Display", serif';
    const readLines = getWrappedLines(ctx, article.pharmaSignalRead || 'Mechanism Breakdown', 1040);
    let rY = 175;
    for (const rl of readLines.slice(0, 2)) {
      ctx.fillText(rl, 75, rY);
      rY += 32;
    }

    if (article.useThisWhen) {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 11px "Courier New", Courier, monospace';
      ctx.fillText('DECISION CONTEXT / WHEN TO DEPLOY:', 75, rY + 15);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const useLines = getWrappedLines(ctx, article.useThisWhen, 1040);
      let uY = rY + 40;
      for (const ul of useLines.slice(0, 2)) {
        ctx.fillText(ul, 75, uY);
        uY += 24;
      }
    }

    // 2 Bottom Columns: Value Lever & Key Risk
    const colW = 538;
    const colH = 180;
    const colY = 375;

    // Col 1: Value Creation Lever
    drawRoundedRect(ctx, 50, colY, colW, colH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.12)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText('PRIMARY VALUE CREATION LEVER', 70, colY + 32);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const valLevLines = getWrappedLines(ctx, 'Capability arbitrage, selective downstream margin ownership, and retention of clinical equity upside.', colW - 40);
    let vY = colY + 68;
    for (const vl of valLevLines) {
      ctx.fillText(vl, 70, vY);
      vY += 24;
    }

    // Col 2: Key Friction Point
    drawRoundedRect(ctx, 612, colY, colW, colH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.12)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText('CRITICAL STRUCTURAL FRICTION', 632, colY + 32);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const riskLines = getWrappedLines(ctx, 'Cross-border governance debt, interface friction, and operational execution capability deficit.', colW - 40);
    let kY = colY + 68;
    for (const rk of riskLines) {
      ctx.fillText(rk, 632, kY);
      kY += 24;
    }

  } else if (slideIndex === 3) {
    // SLIDE 4: Strategic Principle & Call to Action
    const tagText = 'PHARMASIGNAL PRINCIPLE';
    drawRoundedRect(ctx, 480, 110, 240, 28, 0, 'rgba(197, 168, 128, 0.2)', 'rgba(197, 168, 128, 0.8)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText(tagText, 520, 128);

    // Large Quote
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold italic 26px Georgia, "Playfair Display", serif';
    const quote = '"Territorial rights and deal terms create value only when the capability to execute travels with the rights."';
    const quoteLines = getWrappedLines(ctx, quote, 950);
    let qY = 220;
    for (const ql of quoteLines) {
      const qWidth = ctx.measureText(ql).width;
      ctx.fillText(ql, (1200 - qWidth) / 2, qY);
      qY += 42;
    }

    // Gold CTA Button
    const ctaText = `Read Full Signal: pharmasignal.com/?deal=${article.id}`;
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    const ctaWidth = ctx.measureText(ctaText).width + 48;
    const ctaX = (1200 - ctaWidth) / 2;
    const ctaY = 400;

    drawRoundedRect(ctx, ctaX, ctaY, ctaWidth, 44, 0, '#C5A880', '#D8BE9B');
    ctx.fillStyle = '#061426';
    ctx.fillText(ctaText, ctaX + 24, ctaY + 27);

    // Subtext
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '12px "Courier New", Courier, monospace';
    const subText = 'Biopharma BD Decision Intelligence · Follow on LinkedIn for Weekly Deal Briefings';
    const subWidth = ctx.measureText(subText).width;
    ctx.fillText(subText, (1200 - subWidth) / 2, 485);
  }

  return canvas;
}

export default function LinkedInCarouselModal({
  article,
  isOpen,
  onClose,
  darkMode = true
}: LinkedInCarouselModalProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [pdfProgress, setPdfProgress] = useState<string | null>(null);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);
  const [copiedPost, setCopiedPost] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

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
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = postCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dealDeepLink);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = dealDeepLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Export full multi-page PDF Carousel for LinkedIn Document posts via Pure Canvas 2D
  const handleExportPDF = async () => {
    setPdfProgress('Rendering slides...');
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      // Standard 16:9 Landscape PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 675],
        compress: true
      });

      for (let i = 0; i < totalSlides; i++) {
        setPdfProgress(`Rendering Slide ${i + 1} of ${totalSlides}...`);
        const slideCanvas = await renderSlideToCanvas(article, i);
        const imgData = slideCanvas.toDataURL('image/jpeg', 0.94);

        if (i > 0) {
          pdf.addPage([1200, 675], 'landscape');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 1200, 675, undefined, 'FAST');
      }

      setPdfProgress('Finalizing PDF package...');
      const fileName = `${article.id}-pharmasignal-linkedin-carousel.pdf`;
      const blob = pdf.output('blob');
      triggerFileDownload(blob, fileName);

      setDownloadSuccess('Carousel PDF downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Error generating carousel PDF:', err);
      setDownloadError('Could not render PDF. Try downloading individual PNG slides below.');
      setTimeout(() => setDownloadError(null), 6000);
    } finally {
      setPdfProgress(null);
    }
  };

  // Export single PNG slide
  const handleExportSinglePng = async () => {
    setIsGeneratingPng(true);
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      const slideCanvas = await renderSlideToCanvas(article, activeSlide);
      slideCanvas.toBlob((blob) => {
        if (blob) {
          const fileName = `${article.id}-slide-${activeSlide + 1}.png`;
          triggerFileDownload(blob, fileName);
          setDownloadSuccess(`Slide #${activeSlide + 1} PNG downloaded!`);
          setTimeout(() => setDownloadSuccess(null), 3000);
        } else {
          throw new Error('Canvas blob conversion failed');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error exporting single PNG:', err);
      setDownloadError('Could not export slide image. Please try again.');
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  // Export all 4 slides as PNG files
  const handleExportAllPngs = async () => {
    setIsGeneratingPng(true);
    setDownloadError(null);

    try {
      for (let i = 0; i < totalSlides; i++) {
        const slideCanvas = await renderSlideToCanvas(article, i);
        await new Promise<void>((resolve) => {
          slideCanvas.toBlob((blob) => {
            if (blob) {
              const fileName = `${article.id}-slide-${i + 1}-of-4.png`;
              triggerFileDownload(blob, fileName);
            }
            setTimeout(resolve, 500);
          }, 'image/png');
        });
      }
      setDownloadSuccess('All 4 slides downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Error exporting all PNGs:', err);
      setDownloadError('Failed to download images. Please try again.');
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#020A14]/90 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-5xl overflow-hidden text-left align-middle shadow-2xl transition-all border border-brand-gold/40 bg-[#061426] text-white flex flex-col rounded-none"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-brand-gold/20 bg-[#040E1B]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-[#0A66C2] flex items-center justify-center text-white shadow-sm shrink-0">
                <Linkedin size={18} fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">
                    LINKEDIN CAROUSEL EXPORTER
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 uppercase">
                    16:9 HD Document
                  </span>
                </div>
                <h2 className="font-serif text-sm sm:text-base font-bold text-white leading-none line-clamp-1 mt-0.5">
                  {article.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1.5 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Deal Deep Link"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Share Link'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Toast Notification Alert Banner */}
          {downloadSuccess && (
            <div className="bg-emerald-950/80 border-b border-emerald-500/50 px-4 py-2 flex items-center gap-2 text-emerald-300 text-xs font-mono">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {downloadError && (
            <div className="bg-red-950/80 border-b border-red-500/50 px-4 py-2 flex items-center gap-2 text-red-300 text-xs font-mono">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <span>{downloadError}</span>
            </div>
          )}

          {/* Main Body */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Carousel Visual Slide Screen (8 cols) */}
            <div className="w-full lg:col-span-8 flex flex-col items-center">
              
              {/* Slide Screen Frame */}
              <div 
                className="w-full aspect-[16/9] bg-[#040E1B] border-2 border-brand-gold/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
              >
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Bar of Slide */}
                <div className="relative z-10 flex items-center justify-between border-b border-brand-gold/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-brand-gold" />
                    <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-brand-gold uppercase">
                      PHARMASIGNAL · DEAL DESK
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/60 tracking-wider uppercase">
                    SLIDE {activeSlide + 1} OF {totalSlides}
                  </span>
                </div>

                {/* Slide Dynamic Content */}
                <div className="relative z-10 my-auto py-1 sm:py-2">
                  <AnimatePresence mode="wait">
                    {activeSlide === 0 && (
                      /* SLIDE 1: Executive Deal Brief & 3-Badge Strip */
                      <motion.div
                        key="slide-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-3 md:space-y-4"
                      >
                        <div className="inline-block px-2 sm:px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                          DEAL SIGNAL ANALYSIS · {article.date?.toUpperCase()}
                        </div>
                        <h1 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {article.title}
                        </h1>

                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-1">
                          <div className="p-1.5 sm:p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              ASSET CLASS
                            </span>
                            <span className="text-[10px] sm:text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.assetClass || 'Targeted Biologic'}
                            </span>
                          </div>
                          <div className="p-1.5 sm:p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              DEAL STRUCTURE
                            </span>
                            <span className="text-[10px] sm:text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.dealStructure || 'Territorial Architecture'}
                            </span>
                          </div>
                          <div className="p-1.5 sm:p-2.5 bg-white/5 border border-brand-gold/30">
                            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">
                              GEOGRAPHIC SCOPE
                            </span>
                            <span className="text-[10px] sm:text-xs font-semibold text-white font-sans line-clamp-1">
                              {article.geographicScope || 'Global Tiered Rights'}
                            </span>
                          </div>
                        </div>

                        <p className="font-serif text-[11px] sm:text-xs md:text-sm text-white/80 italic leading-relaxed pt-0.5 line-clamp-2 sm:line-clamp-3">
                          "{article.description || article.featuredSummary}"
                        </p>
                      </motion.div>
                    )}

                    {activeSlide === 1 && (
                      /* SLIDE 2: Rights Architecture & Deal Diagram */
                      <motion.div
                        key="slide-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase">
                            TRANSACTION ARCHITECTURE
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-mono text-white/60 uppercase">
                            Value & Rights Flow
                          </span>
                        </div>

                        {article.imageUrl ? (
                          <div className="w-full aspect-[2.2/1] overflow-hidden border border-brand-gold/40 bg-[#020A14] flex items-center justify-center relative">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              className="w-full h-full object-contain object-center"
                              crossOrigin="anonymous"
                            />
                          </div>
                        ) : (
                          <div className="p-3 sm:p-4 bg-white/5 border border-brand-gold/30 space-y-1.5">
                            <span className="text-xs font-bold text-brand-gold font-mono block uppercase">
                              Structure Breakdown
                            </span>
                            <p className="text-xs font-sans text-white/90 leading-relaxed line-clamp-4">
                              {article.featuredSummary || article.description}
                            </p>
                          </div>
                        )}

                        <p className="text-[10px] sm:text-[11px] font-mono text-brand-gold/90 tracking-wide text-center">
                          Swipe to inspect the PharmaSignal Strategic Mechanism →
                        </p>
                      </motion.div>
                    )}

                    {activeSlide === 2 && (
                      /* SLIDE 3: The PharmaSignal Read & Value/Risk Breakdown */
                      <motion.div
                        key="slide-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-3"
                      >
                        <div className="inline-block px-2 sm:px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/50 text-brand-gold font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                          THE PHARMASIGNAL READ
                        </div>
                        
                        <div className="p-2.5 sm:p-3.5 bg-brand-gold/10 border-l-4 border-brand-gold space-y-1.5">
                          <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-white leading-snug line-clamp-2">
                            {article.pharmaSignalRead || 'Mechanism Breakdown'}
                          </h3>
                          {article.useThisWhen && (
                            <p className="text-[11px] sm:text-xs font-sans text-white/80 leading-relaxed line-clamp-2">
                              <strong className="text-brand-gold font-mono uppercase text-[8px] sm:text-[9px] inline-block mr-1">Decision Context:</strong>
                              {article.useThisWhen}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-left pt-0.5">
                          <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10">
                            <span className="text-[8px] sm:text-[9px] font-mono text-brand-gold uppercase block font-bold">
                              VALUE LEVER
                            </span>
                            <span className="text-[10px] sm:text-xs font-sans text-white/90 line-clamp-2">
                              Capability Arbitrage & Downstream Margin
                            </span>
                          </div>
                          <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10">
                            <span className="text-[8px] sm:text-[9px] font-mono text-brand-gold uppercase block font-bold">
                              KEY RISK
                            </span>
                            <span className="text-[10px] sm:text-xs font-sans text-white/90 line-clamp-2">
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
                        className="space-y-3 sm:space-y-4 text-center"
                      >
                        <div className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-brand-gold/20 border border-brand-gold/60 text-brand-gold font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                          PHARMASIGNAL PRINCIPLE
                        </div>

                        <blockquote className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white italic leading-relaxed px-2 sm:px-4">
                          "Territorial rights and deal terms create value only when the capability to execute travels with the rights."
                        </blockquote>

                        <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                          <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold text-brand-primary font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                            <span>Read Full Signal:</span>
                            <span className="underline">pharmasignal.com/?deal={article.id}</span>
                          </div>
                        </div>

                        <p className="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase tracking-widest">
                          Biopharma BD Decision Intelligence · Follow on LinkedIn for Weekly Deal Briefings
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Footer of Slide */}
                <div className="relative z-10 flex items-center justify-between border-t border-brand-gold/20 pt-2 sm:pt-3">
                  <span className="font-mono text-[8px] sm:text-[9px] text-brand-gold uppercase tracking-widest font-semibold">
                    PHARMASIGNAL.COM · BD DECISION INTELLIGENCE
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/50 tracking-wider">
                    {article.id}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="w-full flex items-center justify-between mt-3 sm:mt-4">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 transition-all cursor-pointer rounded-none ${
                        activeSlide === i 
                          ? 'w-7 sm:w-8 bg-brand-gold' 
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Go to Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 sm:p-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-xs text-white/70 px-1 sm:px-2">
                    {activeSlide + 1} / {totalSlides}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 sm:p-2 border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold bg-white/5 transition-colors cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 1-Click Export Tools (4 cols) */}
            <div className="w-full lg:col-span-4 flex flex-col space-y-3 sm:space-y-4">
              
              {/* Primary PDF Download Action */}
              <div className="p-4 sm:p-5 bg-[#0A1A2E] border border-brand-gold/40 flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  <FileDown size={18} className="text-brand-gold shrink-0" />
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white">
                    Export Multi-Slide PDF
                  </h3>
                </div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Generates a crisp 4-slide 16:9 document PDF ready to upload directly as a LinkedIn document carousel.
                </p>

                <button
                  onClick={handleExportPDF}
                  disabled={!!pdfProgress}
                  className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  {pdfProgress ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="truncate">{pdfProgress}</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Download Carousel (PDF)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Single Slide & All PNGs Download */}
              <div className="p-4 bg-white/5 border border-white/10 flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-brand-gold uppercase font-bold block">
                      IMAGE EXPORT
                    </span>
                    <span className="text-xs text-white/80 font-sans">
                      Slide #{activeSlide + 1} as Image
                    </span>
                  </div>
                  <button
                    onClick={handleExportSinglePng}
                    disabled={isGeneratingPng}
                    className="px-3 py-1.5 border border-brand-gold/50 hover:border-brand-gold text-brand-gold text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1.5 bg-brand-gold/10 hover:bg-brand-gold/20 disabled:opacity-50"
                  >
                    <Download size={12} />
                    <span>{isGeneratingPng ? 'Exporting...' : 'Slide PNG'}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-white/60 font-sans">
                    Export all 4 slides as separate images:
                  </span>
                  <button
                    onClick={handleExportAllPngs}
                    disabled={isGeneratingPng}
                    className="text-[11px] font-mono text-brand-gold underline hover:text-white transition-colors cursor-pointer"
                  >
                    Download All PNGs
                  </button>
                </div>
              </div>

              {/* Copy LinkedIn Post Text */}
              <div className="p-4 sm:p-5 bg-[#0A1A2E] border border-white/10 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-[#0A66C2] shrink-0" />
                    <h3 className="font-serif text-sm font-bold text-white">
                      LinkedIn Post Copy
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-brand-gold uppercase font-bold">
                    Executive Style
                  </span>
                </div>

                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Pre-formatted executive post with deal metrics, strategic read, and deep-link.
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

              {/* Instructions Tip */}
              <div className="p-3 bg-brand-gold/5 border-l-2 border-brand-gold text-[11px] font-mono text-brand-gold/90 space-y-1">
                <span className="font-bold block uppercase">How to Post on LinkedIn:</span>
                <p className="text-white/70 font-sans text-[11px] leading-relaxed">
                  1. Click "Start a post" on LinkedIn.<br/>
                  2. Click the document icon ("Add a document") and upload the downloaded PDF.<br/>
                  3. Paste the copied post text.
                </p>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}
