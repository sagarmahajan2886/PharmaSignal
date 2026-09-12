import { useState, useEffect } from 'react';
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
  AlertCircle,
  ExternalLink,
  ArrowDown
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Article } from '../types';
import { getDealSlideData, getCanonicalUrl, DealSlideData } from '../utils/dealSharingData';

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

/**
 * Pure Canvas 2D Portrait Slide Renderer (1080 × 1350px 4:5 Portrait)
 * Conforms to executive BD standard: verified company anchors, no marketing hype, max 35 words/slide.
 */
async function renderSlideToCanvas(article: Article, slideIndex: number, intel: DealSlideData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  const W = 1080;
  const H = 1350;
  const marginX = 64;
  const contentW = W - marginX * 2; // 952px

  // Background - Midnight Navy Executive Slate
  ctx.fillStyle = '#061426';
  ctx.fillRect(0, 0, W, H);

  // Outer 16px Solid Bezel
  ctx.strokeStyle = '#030A14';
  ctx.lineWidth = 24;
  ctx.strokeRect(12, 12, W - 24, H - 24);

  // Inner Subtle Gold Accent Border
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Subtle Dot Matrix Background
  ctx.fillStyle = 'rgba(197, 168, 128, 0.05)';
  for (let gx = 44; gx < W - 44; gx += 36) {
    for (let gy = 44; gy < H - 44; gy += 36) {
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }
  }

  // --- COMMON HEADER (y: 50 - 110) ---
  const isDeal = !!article.isDealSignal;
  
  // Gold square logo indicator
  ctx.fillStyle = '#C5A880';
  ctx.fillRect(marginX, 62, 14, 14);

  // Header Brand Tag
  ctx.fillStyle = '#C5A880';
  ctx.font = 'bold 15px "Courier New", Courier, monospace';
  ctx.fillText(isDeal ? 'PHARMASIGNAL · DEAL DESK' : 'PHARMASIGNAL · DECISION LENS', marginX + 26, 74);

  // Slide Counter
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = 'bold 13px "Courier New", Courier, monospace';
  const slideText = `SLIDE ${slideIndex + 1} OF 4`;
  const slideTextWidth = ctx.measureText(slideText).width;
  ctx.fillText(slideText, W - marginX - slideTextWidth, 74);

  // Header Divider
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginX, 96);
  ctx.lineTo(W - marginX, 96);
  ctx.stroke();

  // --- COMMON FOOTER (y: 1240 - 1300) ---
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginX, 1245);
  ctx.lineTo(W - marginX, 1245);
  ctx.stroke();

  ctx.fillStyle = '#C5A880';
  ctx.font = 'bold 13px "Courier New", Courier, monospace';
  ctx.fillText('PHARMASIGNAL.COM · BD DECISION INTELLIGENCE', marginX, 1278);

  const footerRightText = slideIndex === 3 
    ? 'Follow PharmaSignal on LinkedIn' 
    : `Swipe for Slide ${slideIndex + 2} →`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '13px "Courier New", Courier, monospace';
  const footerRightW = ctx.measureText(footerRightText).width;
  ctx.fillText(footerRightText, W - marginX - footerRightW, 1278);

  // --- SLIDE SPECIFIC CONTENT (y: 120 - 1220) ---
  if (slideIndex === 0) {
    // ==========================================
    // SLIDE 1: Executive Counterparties & Structure
    // ==========================================
    const s1 = intel.slide1;
    const dateStr = (article.date || 'AUGUST 2026').toUpperCase();

    // Category Pill Badge
    const tagText = `${s1.counterparties.tag || 'DEAL SIGNAL'} · ${dateStr}`;
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    const tagW = ctx.measureText(tagText).width + 28;
    drawRoundedRect(ctx, marginX, 125, tagW, 30, 0, 'rgba(197, 168, 128, 0.15)', 'rgba(197, 168, 128, 0.8)');
    ctx.fillStyle = '#C5A880';
    ctx.fillText(tagText, marginX + 14, 145);

    // Verified Counterparty Hero Anchors
    const cpY = 185;
    const cpH = 180;
    drawRoundedRect(ctx, marginX, cpY, contentW, cpH, 0, '#040F1E', 'rgba(197, 168, 128, 0.5)', 1.5);

    // Left Counterparty: Originator
    const partnerBoxW = 410;
    drawRoundedRect(ctx, marginX + 16, cpY + 16, partnerBoxW, 80, 0, 'rgba(255, 255, 255, 0.05)', 'rgba(197, 168, 128, 0.35)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText('ORIGINATOR / PRODUCT CAPABILITY', marginX + 32, cpY + 38);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText(s1.counterparties.originator, marginX + 32, cpY + 72);

    // Right Counterparty: Commercial Partner
    drawRoundedRect(ctx, W - marginX - partnerBoxW - 16, cpY + 16, partnerBoxW, 80, 0, 'rgba(255, 255, 255, 0.05)', 'rgba(197, 168, 128, 0.35)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 11px "Courier New", Courier, monospace';
    ctx.fillText('PARTNER / COMMERCIAL PLATFORM', W - marginX - partnerBoxW, cpY + 38);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.fillText(s1.counterparties.partner, W - marginX - partnerBoxW, cpY + 72);

    // Center Connection Label & Downward Arrow
    const centerBoxY = cpY + 110;
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    const relText = s1.counterparties.relationshipLabel;
    const relW = ctx.measureText(relText).width;
    ctx.fillText(relText, (W - relW) / 2, centerBoxY);

    // Central downward indicator
    ctx.fillStyle = 'rgba(197, 168, 128, 0.8)';
    ctx.fillText('↓', W / 2 - 4, centerBoxY + 22);

    // Downward target: Access Route
    const accessText = s1.counterparties.accessLabel || 'COMMERCIAL ACCESS';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    const accessW = ctx.measureText(accessText).width;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(accessText, (W - accessW) / 2, centerBoxY + 44);

    // Footer Label of Hero Box
    if (s1.counterparties.tag) {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 11px "Courier New", Courier, monospace';
      const phaseW = ctx.measureText(s1.counterparties.tag).width;
      ctx.fillText(s1.counterparties.tag, (W - phaseW) / 2, centerBoxY + 62);
    }

    // Headline
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Georgia, serif';
    const titleLines = getWrappedLines(ctx, s1.headline, contentW);
    let titleY = 415;
    for (const tl of titleLines.slice(0, 3)) {
      ctx.fillText(tl, marginX, titleY);
      titleY += 46;
    }

    // 3 Structured Transaction Parameter Cards
    const metricsY = Math.max(titleY + 15, 570);
    const mCardW = (contentW - 32) / 3;
    const mCardH = 150;

    s1.metrics.forEach((m, idx) => {
      const mx = marginX + idx * (mCardW + 16);
      drawRoundedRect(ctx, mx, metricsY, mCardW, mCardH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(197, 168, 128, 0.35)');
      
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 12px "Courier New", Courier, monospace';
      ctx.fillText(m.label, mx + 18, metricsY + 36);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const valLines = getWrappedLines(ctx, m.val, mCardW - 36);
      let vy = metricsY + 76;
      for (const vl of valLines.slice(0, 2)) {
        ctx.fillText(vl, mx + 18, vy);
        vy += 28;
      }
    });

    // Executive Commercial Brief Card
    const sumY = metricsY + mCardH + 36;
    const sumH = 320;
    drawRoundedRect(ctx, marginX, sumY, contentW, sumH, 0, 'rgba(197, 168, 128, 0.08)', 'rgba(197, 168, 128, 0.4)');
    // Thick gold accent bar on left
    ctx.fillStyle = '#C5A880';
    ctx.fillRect(marginX, sumY, 8, sumH);

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    ctx.fillText('EXECUTIVE DEAL BRIEF', marginX + 32, sumY + 44);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = '22px Georgia, serif';
    const sumLines = getWrappedLines(ctx, `"${s1.summary}"`, contentW - 64);
    let sy = sumY + 95;
    for (const sl of sumLines.slice(0, 6)) {
      ctx.fillText(sl, marginX + 32, sy);
      sy += 36;
    }

  } else if (slideIndex === 1) {
    // ==========================================
    // SLIDE 2: Transaction Architecture
    // ==========================================
    const s2 = intel.slide2;

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 15px "Courier New", Courier, monospace';
    ctx.fillText(s2.title, marginX, 140);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '14px "Courier New", Courier, monospace';
    ctx.fillText(s2.subtitle, marginX + 340, 140);

    // Diagram Frame (large 4:5 viewport)
    const frameY = 165;
    const frameH = 680;
    drawRoundedRect(ctx, marginX, frameY, contentW, frameH, 0, '#020A14', 'rgba(197, 168, 128, 0.45)', 1.5);

    if (article.imageUrl) {
      try {
        const img = await loadImageAsync(article.imageUrl);
        const imgAspect = img.width / img.height;
        const frameAspect = (contentW - 32) / (frameH - 32);
        let dw = contentW - 32;
        let dh = frameH - 32;
        let dx = marginX + 16;
        let dy = frameY + 16;

        if (imgAspect > frameAspect) {
          dw = contentW - 32;
          dh = dw / imgAspect;
          dy = frameY + (frameH - dh) / 2;
        } else {
          dh = frameH - 32;
          dw = dh * imgAspect;
          dx = marginX + (contentW - dw) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
      } catch {
        // Fallback structural rendering
        ctx.fillStyle = '#C5A880';
        ctx.font = 'bold 18px "Courier New", Courier, monospace';
        ctx.fillText(s2.diagramLabel, marginX + 40, frameY + 80);
      }
    } else {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 18px "Courier New", Courier, monospace';
      ctx.fillText(s2.diagramLabel, marginX + 40, frameY + 80);
    }

    // Bottom Takeaway Box
    const takeY = frameY + frameH + 32;
    const takeH = 320;
    drawRoundedRect(ctx, marginX, takeY, contentW, takeH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(197, 168, 128, 0.35)');

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    ctx.fillText('TRANSACTION BOUNDARIES & OPERATIONAL HANDOVER', marginX + 30, takeY + 44);

    let ty = takeY + 95;
    s2.takeaways.forEach((point) => {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 18px "Courier New", Courier, monospace';
      ctx.fillText('▪', marginX + 30, ty);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const pLines = getWrappedLines(ctx, point, contentW - 80);
      for (const pl of pLines) {
        ctx.fillText(pl, marginX + 54, ty);
        ty += 32;
      }
      ty += 16;
    });

  } else if (slideIndex === 2) {
    // ==========================================
    // SLIDE 3: The PharmaSignal Read
    // ==========================================
    const s3 = intel.slide3;

    // Header Pill
    drawRoundedRect(ctx, marginX, 125, 280, 32, 0, 'rgba(197, 168, 128, 0.15)', 'rgba(197, 168, 128, 0.8)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    ctx.fillText('THE PHARMASIGNAL READ', marginX + 16, 146);

    // Primary Mechanism Headline Box
    const mechY = 175;
    const mechH = 190;
    drawRoundedRect(ctx, marginX, mechY, contentW, mechH, 0, 'rgba(197, 168, 128, 0.08)', 'rgba(197, 168, 128, 0.4)');
    ctx.fillStyle = '#C5A880';
    ctx.fillRect(marginX, mechY, 8, mechH);

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 12px "Courier New", Courier, monospace';
    ctx.fillText('PRIMARY MECHANISM', marginX + 28, mechY + 36);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(s3.mechanismTitle, marginX + 28, mechY + 78);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const mLines = getWrappedLines(ctx, s3.mechanismSummary, contentW - 56);
    let my = mechY + 120;
    for (const ml of mLines.slice(0, 2)) {
      ctx.fillText(ml, marginX + 28, my);
      my += 30;
    }

    // Two Columns: Value Driver (Left) & Structural Risk / Friction (Right)
    const colY = mechY + mechH + 32;
    const colW = (contentW - 32) / 2; // 460px
    const colH = 480;

    // Left Column: Commercial Rationale / Access Value
    drawRoundedRect(ctx, marginX, colY, colW, colH, 0, '#040F1E', 'rgba(197, 168, 128, 0.35)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    ctx.fillText(s3.valueHeader, marginX + 24, colY + 42);

    let vY = colY + 90;
    s3.valuePoints.forEach((vp) => {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 16px "Courier New", Courier, monospace';
      ctx.fillText('✓', marginX + 24, vY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const vpLines = getWrappedLines(ctx, vp, colW - 60);
      for (const vpl of vpLines) {
        ctx.fillText(vpl, marginX + 48, vY);
        vY += 28;
      }
      vY += 20;
    });

    // Right Column: Operational Interface / Execution Risk
    drawRoundedRect(ctx, marginX + colW + 32, colY, colW, colH, 0, '#040F1E', 'rgba(197, 168, 128, 0.35)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    ctx.fillText(s3.frictionHeader, marginX + colW + 56, colY + 42);

    let fY = colY + 90;
    s3.frictionPoints.forEach((fp) => {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 16px "Courier New", Courier, monospace';
      ctx.fillText('!', marginX + colW + 56, fY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const fpLines = getWrappedLines(ctx, fp, colW - 60);
      for (const fpl of fpLines) {
        ctx.fillText(fpl, marginX + colW + 80, fY);
        fY += 28;
      }
      fY += 20;
    });

    // Decision Context Box (Bottom)
    const decY = colY + colH + 32;
    const decH = 170;
    drawRoundedRect(ctx, marginX, decY, contentW, decH, 0, 'rgba(255, 255, 255, 0.03)', 'rgba(197, 168, 128, 0.25)');

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 12px "Courier New", Courier, monospace';
    ctx.fillText('DECISION CONTEXT / WHEN TO DEPLOY:', marginX + 24, decY + 36);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const decLines = getWrappedLines(ctx, s3.decisionContext, contentW - 48);
    let dy = decY + 76;
    for (const dl of decLines.slice(0, 3)) {
      ctx.fillText(dl, marginX + 24, dy);
      dy += 28;
    }

  } else if (slideIndex === 3) {
    // ==========================================
    // SLIDE 4: Strategic Principle & Call to Action
    // ==========================================
    const s4 = intel.slide4;

    // Header Pill
    const tagW = 260;
    drawRoundedRect(ctx, (W - tagW) / 2, 130, tagW, 32, 0, 'rgba(197, 168, 128, 0.2)', 'rgba(197, 168, 128, 0.8)');
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 13px "Courier New", Courier, monospace';
    ctx.fillText('PHARMASIGNAL PRINCIPLE', (W - tagW) / 2 + 24, 151);

    // Large Principle Quote Card
    const quoteY = 190;
    const quoteH = 340;
    drawRoundedRect(ctx, marginX, quoteY, contentW, quoteH, 0, 'rgba(197, 168, 128, 0.08)', 'rgba(197, 168, 128, 0.5)', 1.5);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold italic 34px Georgia, serif';
    const qLines = getWrappedLines(ctx, `"${s4.quote}"`, contentW - 96);
    let qy = quoteY + 90;
    for (const ql of qLines.slice(0, 5)) {
      const qWidth = ctx.measureText(ql).width;
      ctx.fillText(ql, (W - qWidth) / 2, qy);
      qy += 48;
    }

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    const attrText = '— PHARMASIGNAL DEAL DESK PRINCIPLE';
    const attrW = ctx.measureText(attrText).width;
    ctx.fillText(attrText, (W - attrW) / 2, quoteY + quoteH - 35);

    // Executive BD Checkpoints Card
    const checkY = quoteY + quoteH + 36;
    const checkH = 350;
    drawRoundedRect(ctx, marginX, checkY, contentW, checkH, 0, 'rgba(255, 255, 255, 0.04)', 'rgba(197, 168, 128, 0.35)');

    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    ctx.fillText('WHAT BD LEADERS MUST VERIFY IN THIS STRUCTURE:', marginX + 32, checkY + 44);

    let cy = checkY + 95;
    s4.checkpoints.forEach((cp, idx) => {
      ctx.fillStyle = '#C5A880';
      ctx.font = 'bold 18px "Courier New", Courier, monospace';
      ctx.fillText(`0${idx + 1}.`, marginX + 32, cy);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const cpLines = getWrappedLines(ctx, cp, contentW - 96);
      for (const cpl of cpLines) {
        ctx.fillText(cpl, marginX + 76, cy);
        cy += 30;
      }
      cy += 18;
    });

    // Gold CTA Button / Card
    const ctaY = checkY + checkH + 40;
    const ctaH = 90;
    drawRoundedRect(ctx, marginX, ctaY, contentW, ctaH, 0, '#C5A880', '#D8BE9B');

    ctx.fillStyle = '#061426';
    ctx.font = 'bold 14px "Courier New", Courier, monospace';
    const ctaLabel = s4.ctaText.toUpperCase();
    const ctaLabelW = ctx.measureText(ctaLabel).width;
    ctx.fillText(ctaLabel, (W - ctaLabelW) / 2, ctaY + 36);

    ctx.fillStyle = '#040E1B';
    ctx.font = 'bold 20px "Courier New", Courier, monospace';
    const urlDisplay = s4.canonicalUrl.replace(/^https?:\/\//, '');
    const urlW = ctx.measureText(urlDisplay).width;
    ctx.fillText(urlDisplay, (W - urlW) / 2, ctaY + 68);
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

  useEffect(() => {
    // Reset to slide 0 whenever opened
    if (isOpen) {
      setActiveSlide(0);
      setDownloadError(null);
      setDownloadSuccess(null);
    }
  }, [isOpen, article?.id]);

  if (!isOpen || !article) return null;

  const totalSlides = 4;
  const intel = getDealSlideData(article);
  const isDeal = !!article.isDealSignal;
  const canonicalUrl = intel.slide4.canonicalUrl;

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Copy Executive LinkedIn Post Text
  const handleCopyPostText = () => {
    const postCopy = intel.linkedInPost;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(postCopy);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = postCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(canonicalUrl);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = canonicalUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Export 4-Page PDF Carousel (1080 × 1350 portrait)
  const handleExportPDF = async () => {
    setPdfProgress('Rendering slides...');
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      // 1080 × 1350 pt/px portrait PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [1080, 1350],
        compress: true
      });

      for (let i = 0; i < totalSlides; i++) {
        setPdfProgress(`Rendering Slide ${i + 1} of ${totalSlides}...`);
        const slideCanvas = await renderSlideToCanvas(article, i, intel);
        const imgData = slideCanvas.toDataURL('image/jpeg', 0.94);

        if (i > 0) {
          pdf.addPage([1080, 1350], 'portrait');
        }

        // Add selectable text layer stream before visual raster
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        if (i === 0) {
          pdf.text(intel.slide1.headline, 64, 100);
          pdf.text(intel.slide1.summary, 64, 130);
        } else if (i === 1) {
          pdf.text(intel.slide2.title, 64, 100);
          pdf.text(intel.slide2.takeaways.join(' '), 64, 130);
        } else if (i === 2) {
          pdf.text(intel.slide3.mechanismTitle, 64, 100);
          pdf.text(intel.slide3.mechanismSummary, 64, 130);
        } else if (i === 3) {
          pdf.text(intel.slide4.quote, 64, 100);
          pdf.text(intel.slide4.canonicalUrl, 64, 130);
        }

        // Add rendered high-res canvas on top
        pdf.addImage(imgData, 'JPEG', 0, 0, 1080, 1350, undefined, 'FAST');
      }

      setPdfProgress('Finalizing PDF package...');
      const fileName = `pharmasignal-${article.id}-linkedin-carousel.pdf`;
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

  // Export single high-resolution PNG slide (1080 × 1350)
  const handleExportSinglePng = async () => {
    setIsGeneratingPng(true);
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      const slideCanvas = await renderSlideToCanvas(article, activeSlide, intel);
      slideCanvas.toBlob((blob) => {
        if (blob) {
          const fileName = `pharmasignal-${article.id}-slide-${activeSlide + 1}.png`;
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

  // Export all 4 slides as individual PNG files
  const handleExportAllPngs = async () => {
    setIsGeneratingPng(true);
    setDownloadError(null);

    try {
      for (let i = 0; i < totalSlides; i++) {
        const slideCanvas = await renderSlideToCanvas(article, i, intel);
        await new Promise<void>((resolve) => {
          slideCanvas.toBlob((blob) => {
            if (blob) {
              const fileName = `pharmasignal-${article.id}-slide-${i + 1}.png`;
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
    <div className="fixed inset-0 z-50 overflow-y-auto" id="linkedin-carousel-exporter">
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
          className="relative w-full max-w-5xl overflow-hidden text-left align-middle shadow-2xl transition-all border border-[#C5A880]/40 bg-[#061426] text-white flex flex-col rounded-none"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#C5A880]/20 bg-[#040E1B]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-[#0A66C2] flex items-center justify-center text-white shadow-sm shrink-0">
                <Linkedin size={18} fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase font-bold">
                    LINKEDIN CAROUSEL EXPORTER
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/30 uppercase">
                    4:5 Portrait Standard (1080 × 1350)
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
                className="px-2.5 py-1.5 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] bg-white/5 text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Canonical Article Link"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Canonical Link'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] bg-white/5 transition-colors cursor-pointer"
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
            
            {/* Left Column: Carousel Visual Slide Screen (7 cols) */}
            <div className="w-full lg:col-span-7 flex flex-col items-center">
              
              {/* Slide Screen Frame - Exact 4:5 Portrait Preview */}
              <div 
                className="w-full max-w-[420px] aspect-[4/5] bg-[#040E1B] border-2 border-[#C5A880]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none"
              >
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Bar of Slide */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#C5A880]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#C5A880]" />
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#C5A880] uppercase">
                      PHARMASIGNAL · {isDeal ? 'DEAL DESK' : 'DECISION LENS'}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/60 tracking-wider uppercase">
                    SLIDE {activeSlide + 1} OF {totalSlides}
                  </span>
                </div>

                {/* Slide Dynamic Content */}
                <div className="relative z-10 my-auto py-1 sm:py-2 overflow-hidden flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeSlide === 0 && (
                      /* SLIDE 1: Executive Deal Brief & Counterparty Anchors */
                      <motion.div
                        key="slide-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-2.5"
                      >
                        <div className="inline-block px-2 py-0.5 bg-[#C5A880]/15 border border-[#C5A880]/50 text-[#C5A880] font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
                          {intel.slide1.counterparties.tag || 'DEAL SIGNAL'} · {article.date?.toUpperCase()}
                        </div>

                        {/* Verified Counterparty Anchors */}
                        <div className="p-2 sm:p-2.5 bg-[#061426] border border-[#C5A880]/40 flex flex-col gap-1.5">
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="p-1.5 bg-white/5 border border-[#C5A880]/30">
                              <span className="text-[7px] font-mono text-[#C5A880] block font-bold">ORIGINATOR</span>
                              <span className="text-[10px] sm:text-[11px] font-serif font-bold text-white leading-tight block">
                                {intel.slide1.counterparties.originator}
                              </span>
                            </div>
                            <div className="p-1.5 bg-white/5 border border-[#C5A880]/30">
                              <span className="text-[7px] font-mono text-[#C5A880] block font-bold">PARTNER</span>
                              <span className="text-[10px] sm:text-[11px] font-serif font-bold text-white leading-tight block">
                                {intel.slide1.counterparties.partner}
                              </span>
                            </div>
                          </div>
                          <div className="text-center pt-0.5 border-t border-[#C5A880]/20">
                            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#C5A880] block">
                              {intel.slide1.counterparties.relationshipLabel}
                            </span>
                            <div className="flex items-center justify-center gap-1 text-[8px] font-mono text-white/90">
                              <span>↓</span>
                              <span className="font-bold">{intel.slide1.counterparties.accessLabel}</span>
                            </div>
                            {intel.slide1.counterparties.tag && (
                              <span className="text-[7px] font-mono text-[#C5A880]/80 tracking-widest block uppercase">
                                {intel.slide1.counterparties.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                          {intel.slide1.headline}
                        </h3>

                        {/* 3 Parameter Chips */}
                        <div className="grid grid-cols-3 gap-1">
                          {intel.slide1.metrics.map((m, idx) => (
                            <div key={idx} className="p-1 sm:p-1.5 bg-white/5 border border-white/10">
                              <span className="text-[6.5px] font-mono text-[#C5A880] block uppercase font-bold">
                                {m.label}
                              </span>
                              <span className="text-[8.5px] sm:text-[9px] font-sans font-semibold text-white/90 block line-clamp-1">
                                {m.val}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Summary Brief */}
                        <div className="p-2 bg-[#C5A880]/10 border-l-2 border-[#C5A880]">
                          <span className="text-[7.5px] font-mono text-[#C5A880] uppercase font-bold block mb-0.5">
                            Executive Deal Brief
                          </span>
                          <p className="font-serif text-[9.5px] sm:text-[10.5px] text-white/90 italic leading-relaxed line-clamp-3">
                            "{intel.slide1.summary}"
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeSlide === 1 && (
                      /* SLIDE 2: Transaction Architecture */
                      <motion.div
                        key="slide-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-widest text-[#C5A880] font-bold uppercase">
                            {intel.slide2.title}
                          </span>
                          <span className="text-[7.5px] font-mono text-white/60 uppercase">
                            {intel.slide2.subtitle}
                          </span>
                        </div>

                        {/* Diagram Viewport */}
                        <div className="w-full aspect-[16/10] overflow-hidden border border-[#C5A880]/40 bg-[#020A14] flex items-center justify-center relative">
                          {article.imageUrl ? (
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              className="w-full h-full object-contain object-center"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="p-3 text-center">
                              <span className="text-xs font-mono text-[#C5A880] block font-bold">
                                {intel.slide2.diagramLabel}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Structural Boundaries */}
                        <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10 space-y-1.5">
                          <span className="text-[7.5px] font-mono text-[#C5A880] uppercase font-bold block">
                            Key Transaction Boundaries
                          </span>
                          {intel.slide2.takeaways.map((takeaway, idx) => (
                            <div key={idx} className="flex items-start gap-1 text-[8.5px] sm:text-[9.5px] text-white/90 leading-tight">
                              <span className="text-[#C5A880] font-mono">▪</span>
                              <p className="line-clamp-2">{takeaway}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeSlide === 2 && (
                      /* SLIDE 3: The PharmaSignal Read */
                      <motion.div
                        key="slide-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2 sm:space-y-2.5"
                      >
                        <div className="inline-block px-2 py-0.5 bg-[#C5A880]/15 border border-[#C5A880]/50 text-[#C5A880] font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
                          THE PHARMASIGNAL READ
                        </div>
                        
                        <div className="p-2 bg-[#C5A880]/10 border-l-2 border-[#C5A880]">
                          <span className="text-[7.5px] font-mono text-[#C5A880] uppercase font-bold block">
                            PRIMARY MECHANISM
                          </span>
                          <h4 className="font-serif text-xs font-bold text-white leading-snug">
                            {intel.slide3.mechanismTitle}
                          </h4>
                          <p className="text-[8.5px] sm:text-[9px] text-white/80 font-sans mt-0.5 line-clamp-2">
                            {intel.slide3.mechanismSummary}
                          </p>
                        </div>

                        {/* Value Driver vs Risk Cards */}
                        <div className="grid grid-cols-2 gap-1.5 text-left">
                          <div className="p-1.5 sm:p-2 bg-[#061426] border border-white/10">
                            <span className="text-[7px] font-mono text-[#C5A880] uppercase block font-bold mb-1">
                              {intel.slide3.valueHeader}
                            </span>
                            <ul className="space-y-1">
                              {intel.slide3.valuePoints.slice(0, 2).map((vp, i) => (
                                <li key={i} className="text-[7.5px] sm:text-[8.5px] text-white/90 leading-tight flex items-start gap-1">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span className="line-clamp-2">{vp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-1.5 sm:p-2 bg-[#061426] border border-white/10">
                            <span className="text-[7px] font-mono text-[#C5A880] uppercase block font-bold mb-1">
                              {intel.slide3.frictionHeader}
                            </span>
                            <ul className="space-y-1">
                              {intel.slide3.frictionPoints.slice(0, 2).map((fp, i) => (
                                <li key={i} className="text-[7.5px] sm:text-[8.5px] text-white/90 leading-tight flex items-start gap-1">
                                  <span className="text-[#C5A880] font-bold">!</span>
                                  <span className="line-clamp-2">{fp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Decision Context */}
                        <div className="p-1.5 bg-white/5 border border-white/10">
                          <span className="text-[7px] font-mono text-[#C5A880] uppercase block font-bold">
                            DECISION CONTEXT:
                          </span>
                          <p className="text-[8px] sm:text-[8.5px] text-white/80 font-sans leading-tight line-clamp-2">
                            {intel.slide3.decisionContext}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeSlide === 3 && (
                      /* SLIDE 4: Strategic Principle & Call to Action */
                      <motion.div
                        key="slide-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2.5 sm:space-y-3 text-center"
                      >
                        <div className="inline-block px-2.5 py-0.5 bg-[#C5A880]/20 border border-[#C5A880]/60 text-[#C5A880] font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">
                          PHARMASIGNAL PRINCIPLE
                        </div>

                        <blockquote className="font-serif text-xs sm:text-sm font-bold text-white italic leading-snug px-1">
                          "{intel.slide4.quote}"
                        </blockquote>

                        <div className="text-left p-2 bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[7px] font-mono text-[#C5A880] uppercase font-bold block">
                            WHAT BD LEADERS MUST VERIFY:
                          </span>
                          {intel.slide4.checkpoints.slice(0, 2).map((cp, idx) => (
                            <div key={idx} className="text-[7.5px] sm:text-[8.5px] text-white/90 leading-tight flex items-start gap-1">
                              <span className="text-[#C5A880] font-mono font-bold">0{idx + 1}.</span>
                              <span className="line-clamp-2">{cp}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-2 bg-[#C5A880] text-[#061426] text-center font-mono">
                          <span className="text-[7.5px] tracking-wider uppercase block font-bold">
                            READ FULL DEAL SIGNAL ON PHARMASIGNAL:
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-bold underline block mt-0.5">
                            {canonicalUrl.replace(/^https?:\/\//, '')}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Footer of Slide */}
                <div className="relative z-10 flex items-center justify-between border-t border-[#C5A880]/20 pt-2">
                  <span className="font-mono text-[8px] text-[#C5A880] uppercase tracking-widest font-semibold">
                    PHARMASIGNAL.COM
                  </span>
                  <span className="font-mono text-[8px] text-white/50 tracking-wider">
                    {article.id}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="w-full max-w-[420px] flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 transition-all cursor-pointer rounded-none ${
                        activeSlide === i 
                          ? 'w-7 bg-[#C5A880]' 
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Go to Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] bg-white/5 transition-colors cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-xs text-white/70 px-1">
                    {activeSlide + 1} / {totalSlides}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] bg-white/5 transition-colors cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: 1-Click Export Tools (5 cols) */}
            <div className="w-full lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
              
              {/* Primary PDF Download Action */}
              <div className="p-4 sm:p-5 bg-[#0A1A2E] border border-[#C5A880]/40 flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  <FileDown size={18} className="text-[#C5A880] shrink-0" />
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white">
                    Export LinkedIn PDF Carousel
                  </h3>
                </div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Generates a crisp 4-slide 1080×1350 portrait document PDF ready to upload directly as a LinkedIn document carousel.
                </p>

                <button
                  onClick={handleExportPDF}
                  disabled={!!pdfProgress}
                  className="w-full py-3 bg-[#C5A880] hover:bg-[#D8B869] text-[#061426] font-sans text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  {pdfProgress ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#061426] border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="truncate">{pdfProgress}</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Download 4-Slide PDF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Single Slide & All PNGs Download */}
              <div className="p-4 bg-white/5 border border-white/10 flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase font-bold block">
                      HIGH-RES IMAGE EXPORT
                    </span>
                    <span className="text-xs text-white/80 font-sans">
                      Slide #{activeSlide + 1} as 1080×1350 PNG
                    </span>
                  </div>
                  <button
                    onClick={handleExportSinglePng}
                    disabled={isGeneratingPng}
                    className="px-3 py-1.5 border border-[#C5A880]/50 hover:border-[#C5A880] text-[#C5A880] text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1.5 bg-[#C5A880]/10 hover:bg-[#C5A880]/20 disabled:opacity-50"
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
                    className="text-[11px] font-mono text-[#C5A880] underline hover:text-white transition-colors cursor-pointer"
                  >
                    Download All 4 PNGs
                  </button>
                </div>
              </div>

              {/* Copy LinkedIn Post Text */}
              <div className="p-4 sm:p-5 bg-[#0A1A2E] border border-white/10 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-[#0A66C2] shrink-0" />
                    <h3 className="font-serif text-sm font-bold text-white">
                      LinkedIn Post Text
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-[#C5A880] uppercase font-bold">
                    Senior BD&L Tone
                  </span>
                </div>

                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Tailored senior BD&L post with deal signal, strategic mechanism, execution questions, and canonical link. No emojis or marketing hype.
                </p>

                <div className="max-h-28 overflow-y-auto p-2 bg-black/30 border border-white/10 text-[10px] font-mono text-white/70 whitespace-pre-wrap leading-relaxed">
                  {intel.linkedInPost}
                </div>

                <button
                  onClick={handleCopyPostText}
                  className="w-full py-2.5 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] bg-white/5 font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedPost ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Post Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy LinkedIn Post Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instructions Tip */}
              <div className="p-3 bg-[#C5A880]/5 border-l-2 border-[#C5A880] text-[11px] font-mono text-[#C5A880]/90 space-y-1">
                <span className="font-bold block uppercase">How to Share on LinkedIn:</span>
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
