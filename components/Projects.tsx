"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { projects, colorMap } from "../lib/projects-data";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [contentClass, setContentClass] = useState("is-visible");
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const wrapRef = useRef(null);

  const proj = projects[active];
  const c = colorMap[proj.color];

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTabChange = (i) => {
    if (i === active || nextIndex !== null) return;
    setNextIndex(i);
  };

  const handleNext = () => {
    const next = (active + 1) % projects.length;
    handleTabChange(next);
  };

  const handlePrev = () => {
    const prev = (active - 1 + projects.length) % projects.length;
    handleTabChange(prev);
  };

  useEffect(() => {
    if (nextIndex === null) return;
    setContentClass("is-exiting");
    const t1 = setTimeout(() => {
      setActive(nextIndex);
      setContentClass("is-entering");
    }, 180);
    const t2 = setTimeout(() => {
      setContentClass("is-visible");
      setNextIndex(null);
    }, 320);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [nextIndex]);

  const getButtonConfig = (project) => {
    const buttons = [];

    if (project.github) {
      buttons.push({
        href: project.github,
        label: "Code",
        icon: "⌨",
        type: "github",
      });
    }

    if (project.slug === "zestix-ai" && project.live) {
      buttons.push({
        href: project.live,
        label: "Live Demo",
        icon: "↗",
        type: "live",
      });
    } else if (
      project.slug === "brand-intelligence" ||
      project.slug === "safe-vision"
    ) {
      buttons.push({
        href: project.documentation || "#",
        label: "Documentation",
        icon: "📄",
        type: "docs",
      });
    } else if (project.slug === "peleesenet") {
      buttons.push({
        href: project.pdf || "#",
        label: "Research Paper",
        icon: "📑",
        type: "pdf",
      });
    } else if (project.live) {
      buttons.push({
        href: project.live,
        label: "Live Demo",
        icon: "↗",
        type: "live",
      });
    }

    return buttons;
  };

  const buttons = getButtonConfig(proj);

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.pv2-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem clamp(1.2rem, 4vw, 5rem) 3rem;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background: transparent;
}

/* ── Orbs ── */
.pv2-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    animation: orbFloat 12s ease-in-out infinite;
}
.pv2-orb-1 {
    width: 500px; height: 500px;
    top: -120px; left: -120px;
    background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
    animation-delay: 0s;
}
.pv2-orb-2 {
    width: 400px; height: 400px;
    bottom: -80px; right: -80px;
    background: radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%);
    animation-delay: -4s;
}
.pv2-orb-3 {
    width: 300px; height: 300px;
    top: 50%; left: 50%;
    background: radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%);
    animation-delay: -8s;
}
@keyframes orbFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    33%       { transform: translate(30px,-40px) scale(1.08); }
    66%       { transform: translate(-25px,30px) scale(0.95); }
}

/* ── Grid ── */
.pv2-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black, transparent);
    pointer-events: none;
}

/* ── Header ── */
.pv2-header {
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 700px;
}
.pv2-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
}
.pv2-eyebrow-line {
    display: flex;
    align-items: center;
    gap: 3px;
}
.pv2-eyebrow-line span {
    display: block;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
}
.pv2-eyebrow-line span:nth-child(1) { width: 18px; opacity: 1; }
.pv2-eyebrow-line span:nth-child(2) { width: 9px;  opacity: 0.6; }
.pv2-eyebrow-line span:nth-child(3) { width: 4px;  opacity: 0.3; }
.pv2-eyebrow-text {
    font-size: 0.60rem;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    background: linear-gradient(90deg, #60a5fa, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.pv2-title {
    font-size: clamp(1.5rem, 2.8vw, 2.2rem);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: #fff;
    margin-bottom: 0.35rem;
}
.pv2-title-grad {
    background: linear-gradient(120deg, #60a5fa 0%, #3b82f6 40%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.pv2-subtitle {
    font-size: 0.76rem;
    color: rgba(255,255,255,0.40);
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
}

/* ── Main container ── */
.pv2-container {
    width: 100%;
    max-width: 1100px;
    position: relative;
    z-index: 1;
}

/* ── Floating nav buttons ── */
.pv2-nav-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 10;
    display: flex;
    justify-content: space-between;
}

.pv2-nav-btn-float {
    pointer-events: all;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(10,18,35,0.80);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    position: relative;
    overflow: visible;
    box-shadow: 
        0 8px 32px rgba(0,0,0,0.4),
        inset 0 1px 0 rgba(255,255,255,0.08);
    margin: 0 -24px;
}

.pv2-nav-btn-float::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: transparent;
    border: 1.5px solid rgba(59,130,246,0);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}

.pv2-nav-btn-float:hover::before {
    border-color: rgba(59,130,246,0.45);
    inset: -8px;
    animation: ringPing 1.2s ease-out infinite;
}

@keyframes ringPing {
    0%   { inset: -6px; opacity: 1; border-color: rgba(59,130,246,0.45); }
    100% { inset: -14px; opacity: 0; border-color: rgba(59,130,246,0); }
}

.pv2-nav-btn-float:hover {
    border-color: rgba(59,130,246,0.55);
    background: rgba(20,40,80,0.92);
    transform: scale(1.10);
    box-shadow: 
        0 0 0 1px rgba(59,130,246,0.25),
        0 0 20px rgba(59,130,246,0.30),
        0 12px 40px rgba(0,0,0,0.45),
        inset 0 1px 0 rgba(255,255,255,0.12);
}

.pv2-nav-btn-float:active { transform: scale(0.97); }

.pv2-nav-icon-float {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}

.pv2-nav-btn-float:hover .pv2-nav-icon-float {
    transform: scale(1.15);
}

.pv2-arrow-svg {
    width: 18px;
    height: 18px;
    stroke: rgba(255,255,255,0.70);
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.3s;
    overflow: visible;
}

.pv2-nav-btn-float:hover .pv2-arrow-svg {
    stroke: #93c5fd;
    filter: drop-shadow(0 0 6px rgba(147,197,253,0.7));
}

.pv2-nav-btn-prev:hover .pv2-nav-icon-float { transform: translateX(-2px) scale(1.1); }
.pv2-nav-btn-next:hover .pv2-nav-icon-float { transform: translateX(2px) scale(1.1); }

/* ── Project tabs ── */
.pv2-tabs-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}
.pv2-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    cursor: pointer;
    overflow: hidden;
}
.pv2-tab::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
    opacity: 0;
    transition: opacity 0.3s;
}
.pv2-tab:hover::before { opacity: 1; }
.pv2-tab:hover {
    border-color: rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.08);
    transform: translateY(-1px);
}
.pv2-tab.is-active {
    border-color: rgba(59,130,246,0.60);
    background: rgba(59,130,246,0.18);
    box-shadow: 0 0 0 1px rgba(59,130,246,0.20), 0 4px 16px rgba(59,130,246,0.25);
    transform: translateY(-1px);
}
.pv2-tab.is-active::before { opacity: 1; }
.pv2-tab-icon { font-size: 0.78rem; line-height: 1; position: relative; z-index: 1; }
.pv2-tab-name {
    font-size: 0.64rem; font-weight: 600;
    color: rgba(255,255,255,0.45);
    transition: color 0.25s;
    position: relative; z-index: 1;
}
.pv2-tab.is-active .pv2-tab-name { color: #dbeafe; }
.pv2-tab:hover:not(.is-active) .pv2-tab-name { color: rgba(255,255,255,0.75); }
.pv2-tab-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #60a5fa; opacity: 0;
    transition: opacity 0.25s; flex-shrink: 0;
    position: relative; z-index: 1;
    box-shadow: 0 0 6px rgba(96,165,250,0.8);
}
.pv2-tab.is-active .pv2-tab-dot { opacity: 1; }

/* ── Main card ── */
.pv2-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.08),
        0 20px 60px rgba(0,0,0,0.35);
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
}

.pv2-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    padding: 2px;
    background: linear-gradient(
        135deg,
        rgba(59,130,246,0.6),
        rgba(96,165,250,0.4),
        rgba(147,197,253,0.3),
        rgba(59,130,246,0.5)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1);
    z-index: -1;
    animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {
    0%, 100% { filter: brightness(1) blur(0px); }
    50%      { filter: brightness(1.3) blur(1px); }
}

.pv2-card:hover::before { opacity: 1; }

.pv2-corner-glow {
    position: absolute;
    width: 180px;
    height: 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1);
    border-radius: 50%;
    filter: blur(40px);
}

.pv2-card:hover .pv2-corner-glow { opacity: 1; }

.pv2-corner-glow-tl {
    top: -60px; left: -60px;
    background: radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%);
    animation: glowPulseTL 3s ease-in-out infinite;
}
.pv2-corner-glow-tr {
    top: -60px; right: -60px;
    background: radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%);
    animation: glowPulseTR 3s ease-in-out infinite;
    animation-delay: 0.75s;
}
.pv2-corner-glow-bl {
    bottom: -60px; left: -60px;
    background: radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%);
    animation: glowPulseBL 3s ease-in-out infinite;
    animation-delay: 1.5s;
}
.pv2-corner-glow-br {
    bottom: -60px; right: -60px;
    background: radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%);
    animation: glowPulseBR 3s ease-in-out infinite;
    animation-delay: 2.25s;
}

@keyframes glowPulseTL {
    0%, 100% { transform: translate(0,0) scale(1); opacity: 0.8; }
    50%       { transform: translate(8px,8px) scale(1.15); opacity: 1; }
}
@keyframes glowPulseTR {
    0%, 100% { transform: translate(0,0) scale(1); opacity: 0.8; }
    50%       { transform: translate(-8px,8px) scale(1.15); opacity: 1; }
}
@keyframes glowPulseBL {
    0%, 100% { transform: translate(0,0) scale(1); opacity: 0.8; }
    50%       { transform: translate(8px,-8px) scale(1.15); opacity: 1; }
}
@keyframes glowPulseBR {
    0%, 100% { transform: translate(0,0) scale(1); opacity: 0.8; }
    50%       { transform: translate(-8px,-8px) scale(1.15); opacity: 1; }
}

.pv2-corner-bracket {
    position: absolute;
    width: 20px;
    height: 20px;
    pointer-events: none;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.pv2-card:hover .pv2-corner-bracket { opacity: 1; }

.pv2-corner-bracket-tl {
    top: 10px; left: 10px;
    border-top: 2px solid rgba(96,165,250,0.7);
    border-left: 2px solid rgba(96,165,250,0.7);
    border-radius: 4px 0 0 0;
    transform: translate(4px, 4px);
}
.pv2-corner-bracket-tr {
    top: 10px; right: 10px;
    border-top: 2px solid rgba(96,165,250,0.7);
    border-right: 2px solid rgba(96,165,250,0.7);
    border-radius: 0 4px 0 0;
    transform: translate(-4px, 4px);
}
.pv2-corner-bracket-bl {
    bottom: 10px; left: 10px;
    border-bottom: 2px solid rgba(96,165,250,0.7);
    border-left: 2px solid rgba(96,165,250,0.7);
    border-radius: 0 0 0 4px;
    transform: translate(4px, -4px);
}
.pv2-corner-bracket-br {
    bottom: 10px; right: 10px;
    border-bottom: 2px solid rgba(96,165,250,0.7);
    border-right: 2px solid rgba(96,165,250,0.7);
    border-radius: 0 0 4px 0;
    transform: translate(-4px, -4px);
}
.pv2-card:hover .pv2-corner-bracket-tl { transform: translate(0,0); }
.pv2-card:hover .pv2-corner-bracket-tr { transform: translate(0,0); }
.pv2-card:hover .pv2-corner-bracket-bl { transform: translate(0,0); }
.pv2-card:hover .pv2-corner-bracket-br { transform: translate(0,0); }

.pv2-card:hover {
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.10),
        0 20px 60px rgba(0,0,0,0.40),
        0 0 60px rgba(59,130,246,0.15);
}

.pv2-card-inner {
    position: relative;
    z-index: 2;
    padding: 1.5rem 1.8rem;
}

.pv2-card-content {
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1);
}
.pv2-card-content.is-exiting {
    opacity: 0; transform: translateY(-6px) scale(0.99);
}
.pv2-card-content.is-entering {
    opacity: 0; transform: translateY(6px) scale(0.99);
}
.pv2-card-content.is-visible {
    opacity: 1; transform: translateY(0) scale(1);
}

.pv2-card-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1.75rem;
    align-items: start;
}

.pv2-project-image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.03);
    flex-shrink: 0;
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
}
.pv2-project-image {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.pv2-project-image-wrap:hover .pv2-project-image { transform: scale(1.06); }
.pv2-project-image-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem;
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(96,165,250,0.10));
}

.pv2-content-col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 0;
}

.pv2-card-identity { display: flex; align-items: flex-start; gap: 0.75rem; }
.pv2-card-icon-wrap { position: relative; flex-shrink: 0; }
.pv2-card-icon {
    width: 40px; height: 40px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    position: relative; z-index: 1;
}
.pv2-card-icon-ring {
    position: absolute;
    inset: -4px;
    border-radius: 15px;
    border: 1px solid;
    opacity: 0.35;
    animation: ringPulse 3s ease-in-out infinite;
}
@keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 0.35; }
    50%       { transform: scale(1.10); opacity: 0.15; }
}
.pv2-card-meta { flex: 1; min-width: 0; }
.pv2-card-title {
    font-size: 1rem; font-weight: 800; color: #fff;
    letter-spacing: -0.02em; margin: 0 0 0.1rem; line-height: 1.2;
}
.pv2-card-period {
    font-size: 0.60rem; color: rgba(255,255,255,0.32);
    letter-spacing: 0.05em; font-weight: 500;
}
.pv2-card-tagline {
    margin-top: 0.2rem; font-size: 0.72rem;
    color: rgba(255,255,255,0.50); line-height: 1.5;
}

.pv2-tags { display: flex; flex-wrap: wrap; gap: 0.28rem; }
.pv2-tag {
    display: inline-flex; align-items: center; gap: 0.25rem;
    padding: 0.20rem 0.52rem;
    border-radius: 6px; font-size: 0.60rem; font-weight: 500;
    backdrop-filter: blur(8px); border: 1px solid;
    transition: all 0.2s;
}
.pv2-tag:hover { transform: translateY(-2px); }
.pv2-tag-blue   { background: rgba(59,130,246,0.12); border-color: rgba(59,130,246,0.28); color: #bfdbfe; }
.pv2-tag-cyan   { background: rgba(6,182,212,0.10);  border-color: rgba(34,211,238,0.22); color: #cffafe; }
.pv2-tag-indigo { background: rgba(79,70,229,0.10);  border-color: rgba(99,102,241,0.22); color: #e0e7ff; }
.pv2-tag-dot { width: 3px; height: 3px; border-radius: 50%; flex-shrink: 0; }
.pv2-tag-blue .pv2-tag-dot   { background: #60a5fa; }
.pv2-tag-cyan .pv2-tag-dot   { background: #22d3ee; }
.pv2-tag-indigo .pv2-tag-dot { background: #818cf8; }

.pv2-actions { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.pv2-btn {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.38rem 0.75rem;
    border-radius: 8px; font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.03em; text-decoration: none; border: 1px solid;
    backdrop-filter: blur(8px);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    position: relative; overflow: hidden;
}
.pv2-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.10), transparent);
    opacity: 0; transition: opacity 0.25s;
}
.pv2-btn:hover::before { opacity: 1; }
.pv2-btn-gh {
    background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.65);
}
.pv2-btn-gh:hover {
    background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.22);
    color: #fff; transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.22);
}
.pv2-btn-live {
    background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.35);
    color: #93c5fd;
}
.pv2-btn-live:hover {
    background: rgba(59,130,246,0.25); border-color: rgba(59,130,246,0.55);
    color: #dbeafe; transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(59,130,246,0.28);
}
.pv2-btn-docs {
    background: rgba(168,85,247,0.12); border-color: rgba(168,85,247,0.32);
    color: #d8b4fe;
}
.pv2-btn-docs:hover {
    background: rgba(168,85,247,0.22); border-color: rgba(168,85,247,0.55);
    color: #f3e8ff; transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(168,85,247,0.25);
}
.pv2-btn-pdf {
    background: rgba(236,72,153,0.12); border-color: rgba(236,72,153,0.32);
    color: #fbcfe8;
}
.pv2-btn-pdf:hover {
    background: rgba(236,72,153,0.22); border-color: rgba(236,72,153,0.55);
    color: #fce7f3; transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(236,72,153,0.25);
}
.pv2-btn-icon { font-size: 0.72rem; line-height: 1; }

.pv2-sep { display: flex; align-items: center; gap: 0.5rem; }
.pv2-sep-label {
    font-size: 0.56rem; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(255,255,255,0.24); white-space: nowrap;
}
.pv2-sep-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent);
}

.pv2-bullets {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: 0.35rem;
}
.pv2-bullet {
    display: flex; align-items: flex-start; gap: 0.55rem;
    font-size: 0.72rem; color: rgba(255,255,255,0.58); line-height: 1.5;
    padding: 0.45rem 0.75rem;
    border-radius: 9px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(6px);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
}
.pv2-bullet:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.13);
    color: rgba(255,255,255,0.85);
    transform: translateX(3px);
}
.pv2-bullet-icon {
    font-size: 0.58rem;
    flex-shrink: 0;
    margin-top: 0.22rem;
    opacity: 0.9;
}

.pv2-card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin-top: 0.25rem;
}
.pv2-case-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.63rem;
    font-weight: 600;
    color: rgba(96,165,250,0.80);
    text-decoration: none;
    letter-spacing: 0.03em;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(6px);
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.pv2-case-link:hover {
    color: #dbeafe;
    border-color: rgba(59,130,246,0.50);
    background: rgba(59,130,246,0.15);
    box-shadow: 0 0 20px rgba(59,130,246,0.22);
    gap: 0.6rem;
}
.pv2-case-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.pv2-case-link:hover .pv2-case-arrow { transform: translateX(3px); }
/* ── Mobile Responsive ── */
@media (max-width: 900px) {
    .pv2-card-layout { 
        grid-template-columns: 1fr; 
        gap: 1rem; 
    }
    .pv2-project-image-wrap { 
        max-width: 100%;
        margin: 0;
    }
    .pv2-nav-controls { 
        display: none; 
    }
}

@media (max-width: 768px) {
    .pv2-wrap { 
        padding: 2rem 1rem 1.5rem; 
    }
    
    .pv2-header {
        margin-bottom: 1rem;
    }
    
    .pv2-eyebrow {
        gap: 0.35rem;
        margin-bottom: 0.3rem;
    }
    
    .pv2-eyebrow-line span:nth-child(1) { width: 12px; }
    .pv2-eyebrow-line span:nth-child(2) { width: 6px; }
    .pv2-eyebrow-line span:nth-child(3) { width: 3px; }
    
    .pv2-eyebrow-text {
        font-size: 0.52rem;
        letter-spacing: 0.20em;
    }
    
    .pv2-title {
        font-size: 1.4rem;
        margin-bottom: 0.2rem;
    }
    
    .pv2-subtitle {
        display: none;
    }
    
    /* Mobile tabs redesign - Flexible grid */
    .pv2-tabs-row { 
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 0.3rem;
        margin-bottom: 1rem;
        padding: 0;
    }
    
    .pv2-tabs-row::before {
        display: none;
    }
    
    .pv2-tab { 
        padding: 0.5rem 0.5rem;
        flex-shrink: 1;
        border-radius: 10px;
        margin-right: 0;
        min-width: 0;
        width: 100%;
        justify-content: center;
    }
    
    .pv2-tab:last-child {
        margin-right: 0;
    }
    
    .pv2-tab-icon {
        font-size: 0.95rem;
        flex-shrink: 0;
    }
    
    .pv2-tab-name {
        font-size: 0.58rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }
    
    .pv2-tab.is-active {
        background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(96,165,250,0.15));
        border-color: rgba(59,130,246,0.70);
        box-shadow: 
            0 0 0 1px rgba(59,130,246,0.30),
            0 4px 12px rgba(59,130,246,0.35),
            inset 0 1px 0 rgba(255,255,255,0.15);
    }
    
    .pv2-tab.is-active .pv2-tab-name {
        color: #fff;
        font-weight: 700;
    }
    
    .pv2-tab-dot {
        display: none;
    }
    
    .pv2-card {
        border-radius: 16px;
    }
    
    .pv2-card-inner { 
        padding: 1rem; 
    }
    
    .pv2-card-layout { 
        gap: 0.75rem; 
    }
    
    .pv2-project-image-wrap {
        aspect-ratio: 16/9;
        border-radius: 10px;
    }
    
    .pv2-card-identity {
        gap: 0.6rem;
    }
    
    .pv2-card-icon {
        width: 36px;
        height: 36px;
        font-size: 1rem;
        border-radius: 9px;
    }
    
    .pv2-card-icon-ring {
        display: none;
    }
    
    .pv2-card-title {
        font-size: 0.95rem;
        margin-bottom: 0.05rem;
    }
    
    .pv2-card-period {
        font-size: 0.56rem;
    }
    
    .pv2-card-tagline {
        display: none;
    }
    
    .pv2-tags {
        gap: 0.22rem;
    }
    
    .pv2-tag {
        font-size: 0.56rem;
        padding: 0.18rem 0.45rem;
        border-radius: 5px;
    }
    
    .pv2-tag-dot {
        width: 2.5px;
        height: 2.5px;
    }
    
    .pv2-actions {
        gap: 0.3rem;
    }
    
    .pv2-btn {
        padding: 0.4rem 0.7rem;
        font-size: 0.60rem;
        border-radius: 7px;
        flex: 1;
    }
    
    .pv2-btn-icon {
        font-size: 0.70rem;
    }
    
    .pv2-sep {
        display: none;
    }
    
    .pv2-bullets {
        gap: 0.25rem;
    }
    
    .pv2-bullet {
        font-size: 0.64rem;
        padding: 0.35rem 0.55rem;
        gap: 0.4rem;
        border-radius: 7px;
    }
    
    .pv2-bullet-icon {
        font-size: 0.52rem;
        margin-top: 0.12rem;
    }
    
    .pv2-card-footer {
        padding-top: 0.6rem;
        margin-top: 0.3rem;
    }
    
    .pv2-case-link {
        font-size: 0.60rem;
        padding: 0.35rem 0.65rem;
        border-radius: 7px;
        width: 100%;
        justify-content: center;
    }
    
    .pv2-corner-bracket {
        display: none;
    }
    
    .pv2-corner-glow {
        display: none;
    }
    
    .pv2-orb-1,
    .pv2-orb-2,
    .pv2-orb-3 {
        opacity: 0.25;
    }
    
    .pv2-orb-1 {
        width: 300px;
        height: 300px;
    }
    
    .pv2-orb-2 {
        width: 250px;
        height: 250px;
    }
    
    .pv2-orb-3 {
        display: none;
    }
}

@media (max-width: 480px) {
    .pv2-wrap { 
        padding: 1.5rem 0.75rem 1.25rem; 
    }
    
    .pv2-header {
        margin-bottom: 0.75rem;
    }
    
    .pv2-eyebrow-line {
        display: none;
    }
    
    .pv2-eyebrow-text {
        font-size: 0.50rem;
    }
    
    .pv2-title {
        font-size: 1.25rem;
    }
    
    /* Mobile tabs for smaller screens - Flexible 2-3 columns */
    .pv2-tabs-row {
        grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
        gap: 0.28rem;
        margin-bottom: 0.75rem;
    }
    
    .pv2-tab {
        padding: 0.48rem 0.4rem;
        border-radius: 9px;
    }
    
    .pv2-tab-icon {
        font-size: 0.88rem;
    }
    
    .pv2-tab-name {
        font-size: 0.56rem;
    }
    
    .pv2-tab.is-active {
        box-shadow: 
            0 0 0 1px rgba(59,130,246,0.35),
            0 3px 10px rgba(59,130,246,0.40),
            inset 0 1px 0 rgba(255,255,255,0.12);
    }
    
    .pv2-card {
        border-radius: 14px;
    }
    
    .pv2-card-inner {
        padding: 0.85rem;
    }
    
    .pv2-card-layout {
        gap: 0.65rem;
    }
    
    .pv2-card-identity {
        gap: 0.5rem;
    }
    
    .pv2-card-icon {
        width: 32px;
        height: 32px;
        font-size: 0.92rem;
        border-radius: 8px;
    }
    
    .pv2-card-title {
        font-size: 0.88rem;
    }
    
    .pv2-card-period {
        font-size: 0.52rem;
    }
    
    .pv2-tags {
        gap: 0.18rem;
    }
    
    .pv2-tag {
        font-size: 0.52rem;
        padding: 0.16rem 0.4rem;
    }
    
    .pv2-actions {
        gap: 0.25rem;
    }
    
    .pv2-btn {
        padding: 0.38rem 0.65rem;
        font-size: 0.58rem;
    }
    
    .pv2-bullets {
        gap: 0.22rem;
    }
    
    .pv2-bullet {
        font-size: 0.62rem;
        padding: 0.32rem 0.5rem;
        gap: 0.35rem;
    }
    
    .pv2-bullet-icon {
        font-size: 0.50rem;
    }
    
    .pv2-card-footer {
        padding-top: 0.5rem;
        margin-top: 0.25rem;
    }
    
    .pv2-case-link {
        font-size: 0.58rem;
        padding: 0.32rem 0.6rem;
    }
    
    .pv2-project-image-wrap {
        aspect-ratio: 4/3;
    }
    
    .pv2-grid {
        background-size: 30px 30px;
    }
}

@media (max-width: 380px) {
    .pv2-wrap {
        padding: 1.25rem 0.65rem 1rem;
    }
    
    .pv2-title {
        font-size: 1.15rem;
    }
    
    /* Mobile tabs for smallest screens - Flexible 2 columns minimum */
    .pv2-tabs-row {
        grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
        gap: 0.25rem;
    }
    
    .pv2-tab {
        padding: 0.45rem 0.35rem;
        border-radius: 8px;
    }
    
    .pv2-tab-icon {
        font-size: 0.82rem;
    }
    
    .pv2-tab-name {
        font-size: 0.54rem;
    }
    
    .pv2-card-inner {
        padding: 0.75rem;
    }
    
    .pv2-btn {
        font-size: 0.56rem;
        padding: 0.36rem 0.6rem;
    }
}
    `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="pv2-wrap" ref={wrapRef}>
        <div className="pv2-orb pv2-orb-1" />
        <div className="pv2-orb pv2-orb-2" />
        <div className="pv2-orb pv2-orb-3" />
        <div className="pv2-grid" />

        <header className="pv2-header">
          <div className="pv2-eyebrow">
            <div className="pv2-eyebrow-line">
              <span />
              <span />
              <span />
            </div>
            <span className="pv2-eyebrow-text">Selected Work</span>
            <div className="pv2-eyebrow-line">
              <span />
              <span />
              <span />
            </div>
          </div>
          <h2 className="pv2-title">
            Featured <span className="pv2-title-grad">Projects</span>
          </h2>
          <p className="pv2-subtitle">
            A curated selection of my recent technical endeavors, showcasing
            modern web development, scalable architecture, and thoughtful UI/UX
            design.
          </p>
        </header>

        <div className="pv2-container">
          <div className="pv2-nav-controls">
            <button
              className="pv2-nav-btn-float pv2-nav-btn-prev"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <div className="pv2-nav-icon-float">
                <svg className="pv2-arrow-svg" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
            </button>
            <button
              className="pv2-nav-btn-float pv2-nav-btn-next"
              onClick={handleNext}
              aria-label="Next project"
            >
              <div className="pv2-nav-icon-float">
                <svg className="pv2-arrow-svg" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
          </div>

          <div className="pv2-tabs-row">
            {projects.map((p, i) => (
              <button
                key={i}
                className={`pv2-tab ${active === i ? "is-active" : ""}`}
                onClick={() => handleTabChange(i)}
              >
                <span className="pv2-tab-icon">{p.icon}</span>
                <span className="pv2-tab-name">{p.title}</span>
                <span className="pv2-tab-dot" />
              </button>
            ))}
          </div>

          <main className="pv2-card" ref={cardRef}>
            <div className="pv2-corner-glow pv2-corner-glow-tl" />
            <div className="pv2-corner-glow pv2-corner-glow-tr" />
            <div className="pv2-corner-glow pv2-corner-glow-bl" />
            <div className="pv2-corner-glow pv2-corner-glow-br" />

            <div className="pv2-corner-bracket pv2-corner-bracket-tl" />
            <div className="pv2-corner-bracket pv2-corner-bracket-tr" />
            <div className="pv2-corner-bracket pv2-corner-bracket-bl" />
            <div className="pv2-corner-bracket pv2-corner-bracket-br" />

            <div className="pv2-card-inner">
              <div className={`pv2-card-content ${contentClass}`}>
                <div className="pv2-card-layout">
                  {/* Image */}
                  <div className="pv2-project-image-wrap">
                    {proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="pv2-project-image"
                      />
                    ) : (
                      <div className="pv2-project-image-placeholder">
                        {proj.icon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pv2-content-col">
                    <div className="pv2-card-identity">
                      <div className="pv2-card-icon-wrap">
                        <div
                          className="pv2-card-icon"
                          style={{
                            background: c?.iconBg,
                            border: `1px solid ${c?.iconBorder}`,
                          }}
                        >
                          {proj.icon}
                        </div>
                        <div
                          className="pv2-card-icon-ring"
                          style={{ borderColor: c?.accent }}
                        />
                      </div>
                      <div className="pv2-card-meta">
                        <h3 className="pv2-card-title">{proj.title}</h3>
                        <div className="pv2-card-period">{proj.period}</div>
                        {!isMobile && (
                          <div className="pv2-card-tagline">{proj.tagline}</div>
                        )}
                      </div>
                    </div>

                    <div className="pv2-tags">
                      {(isMobile ? proj.tags?.slice(0, 3) : proj.tags)?.map(
                        (tag, i) => {
                          const cls = [
                            "pv2-tag-blue",
                            "pv2-tag-cyan",
                            "pv2-tag-indigo",
                          ];
                          return (
                            <span
                              key={i}
                              className={`pv2-tag ${cls[i % cls.length]}`}
                            >
                              <span className="pv2-tag-dot" />
                              {tag}
                            </span>
                          );
                        },
                      )}
                    </div>

                    <div className="pv2-actions">
                      {buttons.map((btn, i) => (
                        <Link
                          key={i}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`pv2-btn pv2-btn-${btn.type === "github" ? "gh" : btn.type === "live" ? "live" : btn.type === "docs" ? "docs" : "pdf"}`}
                        >
                          <span className="pv2-btn-icon">{btn.icon}</span>
                          {btn.label}
                        </Link>
                      ))}
                    </div>

                    {!isMobile && (
                      <>
                        <div className="pv2-sep">
                          <span className="pv2-sep-label">Key Features</span>
                          <div className="pv2-sep-line" />
                        </div>

                        <ul className="pv2-bullets">
                          {proj.bullets?.map((bullet, i) => (
                            <li key={i} className="pv2-bullet">
                              <span
                                className="pv2-bullet-icon"
                                style={{ color: c?.accent }}
                              >
                                ✦
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {isMobile && (
                      <ul className="pv2-bullets">
                        {proj.bullets?.slice(0, 2).map((bullet, i) => (
                          <li key={i} className="pv2-bullet">
                            <span
                              className="pv2-bullet-icon"
                              style={{ color: c?.accent }}
                            >
                              ✦
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pv2-card-footer">
                      {proj.slug && (
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pv2-case-link"
                        >
                          {isMobile ? "View More" : "View Case Study"}
                          <span className="pv2-case-arrow">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
