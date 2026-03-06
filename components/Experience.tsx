"use client";

import { useState } from "react";

const experiences = [
  {
    role: "AI Solutions Architect",
    type: "Internship",
    company: "Orangesoft Sdn. Bhd.",
    companyLogo: "/images/companies/orangesoft.png",
    period: "Nov 2025 – Feb 2026",
    color: "purple",
    icon: "🏢",
    bullets: [
      {
        label: "Full-Stack Architecture",
        desc: "Built and deployed Zestix (Next.js, Nuxt.js) with WebSockets, Framer Motion, and a scalable dark-mode design system.",
      },
      {
        label: "AI & RAG Systems",
        desc: "Engineered a high-accuracy RAG pipeline using Supabase (pgvector) with a custom 3-tier context injection framework.",
      },
      {
        label: "Automation & Integrations",
        desc: "Developed 55+ workflows in n8n, integrating Apify, Firecrawl, and custom Puppeteer scripts to reduce costs.",
      },
      {
        label: "DevOps & Infrastructure",
        desc: "Managed Linux VPS production with Docker, Traefik, and Redis-based API rate limiting.",
      },
      {
        label: "Analytics & Optimization",
        desc: "Built a GEO audit tool and automated GA4/Search Console reporting for 220+ client sites.",
      },
    ],
    tags: ["Next.js", "n8n", "RAG", "Docker", "Supabase", "Puppeteer"],
  },
  {
    role: "IT Student Researcher",
    type: "Research",
    company: "Monash University Malaysia",
    companyLogo: "/images/companies/monash.png",
    period: "Nov 2024 – Feb 2025",
    color: "cyan",
    icon: "🔬",
    bullets: [
      {
        label: "AI Model Development",
        desc: "Developed a highly efficient AI model for early skin cancer detection, optimized for mobile and low-cost devices.",
      },
      {
        label: "Explainable AI",
        desc: "Engineered a transparent AI that visually explains its decisions to doctors, building clinical trust.",
      },
      {
        label: "Adaptive Learning",
        desc: "Designed a smart, adaptive system that continuously learns and improves using expert feedback.",
      },
      {
        label: "End-to-End Ownership",
        desc: "Managed the project from initial research to practical real-world application deployment.",
      },
    ],
    tags: ["PyTorch", "TensorFlow", "Grad-CAM", "CNN", "Mobile AI"],
  },
];

const skillGroups: Record<string, string[]> = {
  "Programming": ["Python", "Java", "Kotlin", "JavaScript", "SQL", "R", "Dart"],
  "AI / ML": [
    "PyTorch",
    "TensorFlow",
    "YOLO",
    "SBERT",
    "FAISS",
    "LLM APIs",
    "NLP",
    "Computer Vision",
    "Neural Networks",
  ],
  "Tools": [
    "Docker",
    "n8n",
    "Firebase",
    "Git",
    "PowerBI",
    "Flutter",
    "PostgreSQL",
    "Supabase",
    "Linux",
    "Kafka",
    "Redis",
  ],
  "Languages": ["English", "Malay", "Chinese", "Cantonese"],
};

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [hoveredBullet, setHoveredBullet] = useState<string | null>(null);

  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .exp-wrap {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem clamp(1.5rem, 5vw, 6rem) 3rem;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* ── Background ── */
  .exp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    z-index: 0;
    animation: orbFloat 15s ease-in-out infinite;
  }
  .exp-orb-1 {
    width: 600px; height: 600px;
    top: -200px; right: -200px;
    background: radial-gradient(circle, rgba(168,85,247,0.32) 0%, transparent 70%);
  }
  .exp-orb-2 {
    width: 500px; height: 500px;
    bottom: -150px; left: -150px;
    background: radial-gradient(circle, rgba(103,232,249,0.28) 0%, transparent 70%);
    animation-delay: -5s;
  }
  .exp-orb-3 {
    width: 350px; height: 350px;
    top: 40%; left: 35%;
    background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
    animation-delay: -9s;
    animation-duration: 20s;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    33%       { transform: translate(25px,-35px) scale(1.06); }
    66%       { transform: translate(-15px,20px) scale(0.96); }
  }

  .exp-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
    pointer-events: none;
    z-index: 0;
  }

  /* Animated particles */
  .exp-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: particleDrift linear infinite;
    opacity: 0;
  }
  .exp-particle:nth-child(1) {
    width: 3px; height: 3px;
    background: rgba(168,85,247,0.7);
    left: 15%; top: 20%;
    animation-duration: 8s; animation-delay: 0s;
    box-shadow: 0 0 6px rgba(168,85,247,0.8);
  }
  .exp-particle:nth-child(2) {
    width: 2px; height: 2px;
    background: rgba(103,232,249,0.7);
    left: 75%; top: 60%;
    animation-duration: 11s; animation-delay: -3s;
    box-shadow: 0 0 5px rgba(103,232,249,0.8);
  }
  .exp-particle:nth-child(3) {
    width: 4px; height: 4px;
    background: rgba(96,165,250,0.6);
    left: 45%; top: 80%;
    animation-duration: 9s; animation-delay: -6s;
    box-shadow: 0 0 8px rgba(96,165,250,0.7);
  }
  .exp-particle:nth-child(4) {
    width: 2px; height: 2px;
    background: rgba(192,132,252,0.8);
    left: 85%; top: 30%;
    animation-duration: 13s; animation-delay: -2s;
    box-shadow: 0 0 5px rgba(192,132,252,0.8);
  }
  .exp-particle:nth-child(5) {
    width: 3px; height: 3px;
    background: rgba(165,243,252,0.6);
    left: 25%; top: 70%;
    animation-duration: 10s; animation-delay: -8s;
    box-shadow: 0 0 6px rgba(165,243,252,0.7);
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-120px) translateX(40px); opacity: 0; }
  }

  .exp-content {
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .exp-header {
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeSlideDown 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .exp-section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.60rem;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    background: linear-gradient(90deg, #60a5fa, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }
  .exp-section-label::before,
  .exp-section-label::after {
    content: '';
    display: block;
    width: 18px; height: 2px;
    background: linear-gradient(90deg, #60a5fa, transparent);
  }
  .exp-section-label::after {
    background: linear-gradient(90deg, transparent, #60a5fa);
  }

  .exp-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .exp-title span {
    background: linear-gradient(120deg, #60a5fa 0%, #3b82f6 40%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Layout ── */
  .exp-layout {
    display: grid;
    grid-template-columns: 1fr 270px;
    gap: 1.5rem;
    align-items: start;
  }

  /* ── Accordion Cards ── */
  .exp-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .exp-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(28px);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.14),
      0 8px 32px rgba(0,0,0,0.35);
    overflow: hidden;
    transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1);
    animation: fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .exp-card:hover {
    transform: translateY(-2px);
  }

  .exp-card:nth-child(1) { animation-delay: 0.1s; }
  .exp-card:nth-child(2) { animation-delay: 0.2s; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Glowing border overlay */
  .exp-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    padding: 1px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
    z-index: -1;
  }
  /* Inner shimmer sweep */
  .exp-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg,
      transparent 30%,
      rgba(255,255,255,0.04) 50%,
      transparent 70%
    );
    background-size: 200% 100%;
    background-position: -100% 0;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 0;
  }
  .exp-card:hover::after {
    opacity: 1;
    animation: shimmerSweep 1.2s ease forwards;
  }
  @keyframes shimmerSweep {
    from { background-position: -100% 0; }
    to   { background-position: 200% 0; }
  }

  .exp-card-purple::before {
    background: linear-gradient(135deg, rgba(168,85,247,0.75), rgba(192,132,252,0.45));
  }
  .exp-card-cyan::before {
    background: linear-gradient(135deg, rgba(103,232,249,0.75), rgba(165,243,252,0.45));
  }

  .exp-card.is-open,
  .exp-card:hover {
    border-color: rgba(255,255,255,0.22);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.18),
      0 20px 60px rgba(0,0,0,0.42);
  }
  .exp-card-purple.is-open,
  .exp-card-purple:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.18),
      0 20px 60px rgba(0,0,0,0.42),
      0 0 40px rgba(168,85,247,0.12);
  }
  .exp-card-cyan.is-open,
  .exp-card-cyan:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.18),
      0 20px 60px rgba(0,0,0,0.42),
      0 0 40px rgba(103,232,249,0.10);
  }
  .exp-card.is-open::before,
  .exp-card:hover::before { opacity: 1; }

  /* Accent bar */
  .exp-accent-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    border-radius: 3px 0 0 3px;
    transition: opacity 0.3s, width 0.3s;
    opacity: 0.65;
  }
  .exp-card.is-open .exp-accent-bar,
  .exp-card:hover .exp-accent-bar {
    opacity: 1;
    width: 4px;
  }
  .exp-card-purple .exp-accent-bar {
    background: linear-gradient(180deg, #c084fc, #7c3aed);
    box-shadow: 0 0 12px rgba(168,85,247,0.6);
  }
  .exp-card-cyan .exp-accent-bar {
    background: linear-gradient(180deg, #67e8f9, #0891b2);
    box-shadow: 0 0 12px rgba(103,232,249,0.55);
  }

  /* Header row (always visible) */
  .exp-card-trigger {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.2rem 1rem 1.5rem;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
    position: relative;
    z-index: 1;
  }
  .exp-card-trigger:hover {
    background: rgba(255,255,255,0.04);
  }

  .exp-logo-wrap {
    width: 44px; height: 44px;
    border-radius: 11px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.09);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .exp-card-purple:hover .exp-logo-wrap,
  .exp-card-purple.is-open .exp-logo-wrap {
    border-color: rgba(192,132,252,0.45);
    box-shadow: 0 0 14px rgba(168,85,247,0.28);
  }
  .exp-card-cyan:hover .exp-logo-wrap,
  .exp-card-cyan.is-open .exp-logo-wrap {
    border-color: rgba(165,243,252,0.40);
    box-shadow: 0 0 14px rgba(103,232,249,0.25);
  }

  .exp-logo {
    width: 100%; height: 100%;
    object-fit: contain;
    padding: 7px;
  }
  .exp-logo-placeholder { font-size: 1.5rem; }

  .exp-card-info { flex: 1; min-width: 0; }

  .exp-role-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    flex-wrap: wrap;
  }
  .exp-role {
    font-size: 0.95rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
  }
  .exp-badge-type {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.5rem;
    border-radius: 5px;
    font-size: 0.56rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    flex-shrink: 0;
    transition: box-shadow 0.3s;
  }
  .exp-badge-internship {
    background: rgba(168,85,247,0.25);
    border: 1px solid rgba(192,132,252,0.50);
    color: #f3e8ff;
  }
  .exp-card-purple.is-open .exp-badge-internship,
  .exp-card-purple:hover .exp-badge-internship {
    box-shadow: 0 0 10px rgba(168,85,247,0.35);
  }
  .exp-badge-research {
    background: rgba(103,232,249,0.20);
    border: 1px solid rgba(165,243,252,0.45);
    color: #e0fffe;
  }
  .exp-card-cyan.is-open .exp-badge-research,
  .exp-card-cyan:hover .exp-badge-research {
    box-shadow: 0 0 10px rgba(103,232,249,0.30);
  }

  .exp-company-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
  }
  .exp-company {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
  }
  .exp-period {
    font-size: 0.66rem;
    color: rgba(255,255,255,0.36);
    letter-spacing: 0.04em;
  }
  .exp-dot-sep {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.30);
    flex-shrink: 0;
  }

  /* Chevron */
  .exp-chevron {
    width: 22px; height: 22px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.38);
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1), color 0.25s;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .exp-card.is-open .exp-chevron {
    transform: rotate(180deg);
    color: rgba(255,255,255,0.70);
    background: rgba(255,255,255,0.09);
  }
  .exp-card-purple.is-open .exp-chevron {
    border-color: rgba(192,132,252,0.35);
    box-shadow: 0 0 8px rgba(168,85,247,0.3);
  }
  .exp-card-cyan.is-open .exp-chevron {
    border-color: rgba(165,243,252,0.30);
    box-shadow: 0 0 8px rgba(103,232,249,0.25);
  }

  /* Accordion body */
  .exp-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.45s cubic-bezier(0.16,1,0.3,1);
    position: relative;
    z-index: 1;
  }
  .exp-card.is-open .exp-body {
    grid-template-rows: 1fr;
  }
  .exp-body-inner {
    overflow: hidden;
  }
  .exp-body-pad {
    padding: 0 1.5rem 1.2rem;
  }

  .exp-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.11), transparent);
    margin-bottom: 1rem;
  }

  /* Bullets */
  .exp-bullets {
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  /* Purple bullets */
  .exp-bullets-purple .exp-bullet {
    background: rgba(168,85,247,0.07);
    border: 1px solid rgba(192,132,252,0.14);
  }
  .exp-bullets-purple .exp-bullet:hover {
    background: rgba(168,85,247,0.16);
    border-color: rgba(192,132,252,0.38);
    box-shadow:
      0 0 18px rgba(168,85,247,0.20),
      inset 0 0 12px rgba(168,85,247,0.06);
    color: rgba(255,255,255,0.88);
  }

  /* Cyan bullets */
  .exp-bullets-cyan .exp-bullet {
    background: rgba(103,232,249,0.06);
    border: 1px solid rgba(165,243,252,0.13);
  }
  .exp-bullets-cyan .exp-bullet:hover {
    background: rgba(103,232,249,0.13);
    border-color: rgba(165,243,252,0.35);
    box-shadow:
      0 0 18px rgba(103,232,249,0.18),
      inset 0 0 12px rgba(103,232,249,0.05);
    color: rgba(255,255,255,0.88);
  }

  .exp-bullet {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.68);
    line-height: 1.6;
    padding: 0.5rem 0.7rem;
    border-radius: 9px;
    transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
  }
  .exp-bullet:hover {
    transform: translateX(5px);
  }
  .exp-bullet-icon {
    font-size: 0.60rem;
    flex-shrink: 0;
    margin-top: 0.35rem;
    transition: transform 0.3s, text-shadow 0.3s;
  }
  .exp-bullet:hover .exp-bullet-icon {
    transform: scale(1.3);
  }
  .exp-bullet-icon-purple {
    color: #c084fc;
    text-shadow: 0 0 8px rgba(192,132,252,0.5);
  }
  .exp-bullet-icon-cyan {
    color: #67e8f9;
    text-shadow: 0 0 8px rgba(103,232,249,0.5);
  }
  .exp-bullet strong {
    color: rgba(255,255,255,0.95);
    font-weight: 600;
  }
  .exp-bullets-purple .exp-bullet strong { color: #e9d5ff; }
  .exp-bullets-cyan   .exp-bullet strong { color: #cffafe; }

  /* Tags */
  .exp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .exp-tag {
    padding: 0.18rem 0.55rem;
    border-radius: 5px;
    font-size: 0.60rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
    animation: tagPop 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .exp-tag:nth-child(1) { animation-delay: 0.05s; }
  .exp-tag:nth-child(2) { animation-delay: 0.10s; }
  .exp-tag:nth-child(3) { animation-delay: 0.15s; }
  .exp-tag:nth-child(4) { animation-delay: 0.20s; }
  .exp-tag:nth-child(5) { animation-delay: 0.25s; }
  .exp-tag:nth-child(6) { animation-delay: 0.30s; }
  @keyframes tagPop {
    from { opacity: 0; transform: scale(0.8) translateY(4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .exp-tag:hover { transform: translateY(-3px); }
  .exp-tag-purple {
    background: rgba(168,85,247,0.20);
    border: 1px solid rgba(192,132,252,0.38);
    color: #ede9fe;
  }
  .exp-tag-purple:hover {
    background: rgba(168,85,247,0.32);
    box-shadow: 0 0 12px rgba(168,85,247,0.35);
    border-color: rgba(192,132,252,0.60);
  }
  .exp-tag-cyan {
    background: rgba(103,232,249,0.16);
    border: 1px solid rgba(165,243,252,0.32);
    color: #cffafe;
  }
  .exp-tag-cyan:hover {
    background: rgba(103,232,249,0.26);
    box-shadow: 0 0 12px rgba(103,232,249,0.30);
    border-color: rgba(165,243,252,0.55);
  }

  /* ── Skills sidebar ── */
  .exp-skills {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px;
    padding: 1.4rem;
    backdrop-filter: blur(28px);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.13),
      0 8px 32px rgba(0,0,0,0.35);
    position: sticky;
    top: 2rem;
    overflow: hidden;
    animation: fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both;
    transition: box-shadow 0.35s;
  }
  .exp-skills:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      0 12px 44px rgba(0,0,0,0.42),
      0 0 40px rgba(103,232,249,0.08);
  }
  .exp-skills::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(103,232,249,0.70), rgba(96,165,250,0.50), transparent);
    animation: borderShimmer 3s ease-in-out infinite;
  }
  @keyframes borderShimmer {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }

  .exp-skills-title {
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .exp-skills-title::before {
    content: '';
    width: 4px; height: 14px;
    background: linear-gradient(180deg, #60a5fa, transparent);
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(96,165,250,0.5);
  }

  .exp-skill-group { margin-bottom: 1.1rem; }
  .exp-skill-group:last-child { margin-bottom: 0; }

  .exp-skill-group-name {
    font-size: 0.61rem;
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
    margin-bottom: 0.5rem;
  }

  .exp-skill-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .exp-skill-chip {
    padding: 0.22rem 0.55rem;
    border-radius: 5px;
    font-size: 0.62rem;
    font-weight: 500;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.62);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
  }
  .exp-skill-chip:hover {
    border-color: rgba(96,165,250,0.55);
    color: #dbeafe;
    background: rgba(59,130,246,0.18);
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(59,130,246,0.22),
      0 0 8px rgba(96,165,250,0.15);
  }

  .exp-skills-glow {
    position: absolute;
    bottom: -40px; right: -40px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(103,232,249,0.16) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(35px);
    animation: glowPulse 4s ease-in-out infinite;
  }
  .exp-skills-glow-2 {
    position: absolute;
    top: -30px; left: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96,165,250,0.14) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(30px);
    animation: glowPulse 5s ease-in-out infinite;
    animation-delay: -2s;
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.15); }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .exp-layout { 
      grid-template-columns: 1fr; 
    }
    .exp-skills { 
      position: static; 
      margin-top: 1rem;
    }
  }

  @media (max-width: 768px) {
    .exp-wrap {
      padding: 2.5rem 1rem 2rem;
      min-height: auto;
    }

    .exp-orb-1,
    .exp-orb-2,
    .exp-orb-3 {
      opacity: 0      opacity: 0.3;
    }

    .exp-orb-1 {
      width: 350px;
      height: 350px;
    }

    .exp-orb-2 {
      width: 280px;
      height: 280px;
    }

    .exp-orb-3 {
      width: 200px;
      height: 200px;
    }

    .exp-grid {
      background-size: 40px 40px;
    }

    .exp-particle {
      display: none;
    }

    .exp-header {
      margin-bottom: 1.5rem;
    }

    .exp-section-label {
      font-size: 0.56rem;
      gap: 0.4rem;
    }

    .exp-section-label::before,
    .exp-section-label::after {
      width: 14px;
    }

    .exp-title {
      font-size: clamp(1.4rem, 5vw, 1.8rem);
    }

    .exp-layout {
      gap: 1.2rem;
    }

    .exp-timeline {
      gap: 0.6rem;
    }

    .exp-card {
      border-radius: 12px;
    }

    .exp-card:hover {
      transform: none;
    }

    .exp-card-trigger {
      gap: 0.75rem;
      padding: 0.85rem 1rem 0.85rem 1.2rem;
    }

    .exp-logo-wrap {
      width: 38px;
      height: 38px;
      border-radius: 9px;
    }

    .exp-logo {
      padding: 6px;
    }

    .exp-logo-placeholder {
      font-size: 1.3rem;
    }

    .exp-role {
      font-size: 0.85rem;
    }

    .exp-badge-type {
      font-size: 0.52rem;
      padding: 0.13rem 0.45rem;
    }

    .exp-company {
      font-size: 0.68rem;
    }

    .exp-period {
      font-size: 0.62rem;
    }

    .exp-chevron {
      width: 20px;
      height: 20px;
    }

    .exp-chevron svg {
      width: 12px;
      height: 12px;
    }

    .exp-body-pad {
      padding: 0 1.2rem 1rem;
    }

    .exp-divider {
      margin-bottom: 0.8rem;
    }

    .exp-bullets {
      gap: 0.4rem;
      margin-bottom: 0.8rem;
    }

    .exp-bullet {
      font-size: 0.70rem;
      padding: 0.45rem 0.6rem;
      gap: 0.55rem;
      line-height: 1.55;
    }

    .exp-bullet:hover {
      transform: translateX(3px);
    }

    .exp-bullet-icon {
      font-size: 0.56rem;
      margin-top: 0.3rem;
    }

    .exp-tags {
      gap: 0.25rem;
    }

    .exp-tag {
      font-size: 0.56rem;
      padding: 0.16rem 0.5rem;
    }

    .exp-tag:hover {
      transform: translateY(-2px);
    }

    .exp-skills {
      padding: 1.2rem;
      border-radius: 12px;
    }

    .exp-skills-title {
      font-size: 0.60rem;
      margin-bottom: 1rem;
    }

    .exp-skills-title::before {
      width: 3px;
      height: 12px;
    }

    .exp-skill-group {
      margin-bottom: 0.9rem;
    }

    .exp-skill-group-name {
      font-size: 0.58rem;
      margin-bottom: 0.45rem;
    }

    .exp-skill-chips {
      gap: 0.25rem;
    }

    .exp-skill-chip {
      font-size: 0.58rem;
      padding: 0.2rem 0.5rem;
    }

    .exp-skills-glow {
      width: 120px;
      height: 120px;
      bottom: -30px;
      right: -30px;
    }

    .exp-skills-glow-2 {
      width: 90px;
      height: 90px;
      top: -20px;
      left: -20px;
    }
  }

  @media (max-width: 640px) {
    .exp-wrap {
      padding: 2rem 0.85rem 1.5rem;
    }

    .exp-header {
      margin-bottom: 1.2rem;
    }

    .exp-section-label {
      font-size: 0.54rem;
      gap: 0.35rem;
    }

    .exp-section-label::before,
    .exp-section-label::after {
      width: 12px;
    }

    .exp-title {
      font-size: clamp(1.3rem, 6vw, 1.6rem);
    }

    .exp-layout {
      gap: 1rem;
    }

    .exp-timeline {
      gap: 0.55rem;
    }

    .exp-card {
      border-radius: 10px;
    }

    .exp-card-trigger {
      gap: 0.65rem;
      padding: 0.75rem 0.85rem 0.75rem 1rem;
    }

    .exp-logo-wrap {
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }

    .exp-logo {
      padding: 5px;
    }

    .exp-logo-placeholder {
      font-size: 1.2rem;
    }

    .exp-role-row {
      gap: 0.4rem;
      margin-bottom: 0.2rem;
    }

    .exp-role {
      font-size: 0.80rem;
    }

    .exp-badge-type {
      font-size: 0.50rem;
      padding: 0.12rem 0.4rem;
    }

    .exp-company-row {
      gap: 0.4rem;
    }

    .exp-company {
      font-size: 0.65rem;
    }

    .exp-period {
      font-size: 0.60rem;
    }

    .exp-dot-sep {
      width: 2.5px;
      height: 2.5px;
    }

    .exp-chevron {
      width: 18px;
      height: 18px;
    }

    .exp-chevron svg {
      width: 11px;
      height: 11px;
    }

    .exp-body-pad {
      padding: 0 1rem 0.85rem;
    }

    .exp-divider {
      margin-bottom: 0.7rem;
    }

    .exp-bullets {
      gap: 0.35rem;
      margin-bottom: 0.7rem;
    }

    .exp-bullet {
      font-size: 0.68rem;
      padding: 0.4rem 0.55rem;
      gap: 0.5rem;
      border-radius: 7px;
    }

    .exp-bullet-icon {
      font-size: 0.54rem;
      margin-top: 0.28rem;
    }

    .exp-tags {
      gap: 0.22rem;
    }

    .exp-tag {
      font-size: 0.54rem;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
    }

    .exp-skills {
      padding: 1rem;
      border-radius: 10px;
    }

    .exp-skills-title {
      font-size: 0.58rem;
      margin-bottom: 0.9rem;
    }

    .exp-skill-group {
      margin-bottom: 0.8rem;
    }

    .exp-skill-group-name {
      font-size: 0.56rem;
      margin-bottom: 0.4rem;
    }

    .exp-skill-chips {
      gap: 0.22rem;
    }

    .exp-skill-chip {
      font-size: 0.56rem;
      padding: 0.18rem 0.45rem;
      border-radius: 4px;
    }
  }

  @media (max-width: 480px) {
    .exp-wrap {
      padding: 1.8rem 0.75rem 1.3rem;
    }

    .exp-header {
      margin-bottom: 1rem;
    }

    .exp-section-label {
      font-size: 0.52rem;
      gap: 0.3rem;
      margin-bottom: 0.4rem;
    }

    .exp-section-label::before,
    .exp-section-label::after {
      width: 10px;
      height: 1.5px;
    }

    .exp-title {
      font-size: clamp(1.2rem, 7vw, 1.5rem);
    }

    .exp-layout {
      gap: 0.9rem;
    }

    .exp-timeline {
      gap: 0.5rem;
    }

    .exp-card {
      border-radius: 9px;
    }

    .exp-accent-bar {
      width: 2.5px;
    }

    .exp-card.is-open .exp-accent-bar,
    .exp-card:hover .exp-accent-bar {
      width: 3px;
    }

    .exp-card-trigger {
      gap: 0.6rem;
      padding: 0.7rem 0.75rem 0.7rem 0.9rem;
    }

    .exp-logo-wrap {
      width: 34px;
      height: 34px;
      border-radius: 7px;
    }

    .exp-logo {
      padding: 4px;
    }

    .exp-logo-placeholder {
      font-size: 1.1rem;
    }

    .exp-role {
      font-size: 0.76rem;
    }

    .exp-badge-type {
      font-size: 0.48rem;
      padding: 0.11rem 0.38rem;
    }

    .exp-company {
      font-size: 0.63rem;
    }

    .exp-period {
      font-size: 0.58rem;
    }

    .exp-chevron {
      width: 17px;
      height: 17px;
    }

    .exp-chevron svg {
      width: 10px;
      height: 10px;
    }

    .exp-body-pad {
      padding: 0 0.9rem 0.75rem;
    }

    .exp-divider {
      margin-bottom: 0.65rem;
    }

    .exp-bullets {
      gap: 0.32rem;
      margin-bottom: 0.65rem;
    }

    .exp-bullet {
      font-size: 0.66rem;
      padding: 0.38rem 0.5rem;
      gap: 0.45rem;
      line-height: 1.5;
    }

    .exp-bullet-icon {
      font-size: 0.52rem;
      margin-top: 0.26rem;
    }

    .exp-tags {
      gap: 0.2rem;
    }

    .exp-tag {
      font-size: 0.52rem;
      padding: 0.14rem 0.42rem;
    }

    .exp-skills {
      padding: 0.9rem;
    }

    .exp-skills-title {
      font-size: 0.56rem;
      margin-bottom: 0.8rem;
    }

    .exp-skills-title::before {
      width: 2.5px;
      height: 11px;
    }

    .exp-skill-group {
      margin-bottom: 0.7rem;
    }

    .exp-skill-group-name {
      font-size: 0.54rem;
      margin-bottom: 0.38rem;
    }

    .exp-skill-chips {
      gap: 0.2rem;
    }

    .exp-skill-chip {
      font-size: 0.54rem;
      padding: 0.17rem 0.42rem;
    }

    .exp-skills-glow {
      width: 100px;
      height: 100px;
      bottom: -25px;
      right: -25px;
    }

    .exp-skills-glow-2 {
      width: 75px;
      height: 75px;
      top: -15px;
      left: -15px;
    }
  }

  @media (max-width: 380px) {
    .exp-wrap {
      padding: 1.6rem 0.65rem 1.2rem;
    }

    .exp-title {
      font-size: 1.15rem;
    }

    .exp-card-trigger {
      gap: 0.55rem;
      padding: 0.65rem 0.7rem 0.65rem 0.85rem;
    }

    .exp-logo-wrap {
      width: 32px;
      height: 32px;
    }

    .exp-role {
      font-size: 0.74rem;
    }

    .exp-badge-type {
      font-size: 0.46rem;
      padding: 0.1rem 0.36rem;
    }

    .exp-company {
      font-size: 0.61rem;
    }

    .exp-period {
      font-size: 0.56rem;
    }

    .exp-body-pad {
      padding: 0 0.8rem 0.7rem;
    }

    .exp-bullet {
      font-size: 0.64rem;
      padding: 0.36rem 0.48rem;
    }

    .exp-tag {
      font-size: 0.50rem;
      padding: 0.13rem 0.4rem;
    }

    .exp-skills {
      padding: 0.85rem;
    }

    .exp-skill-chip {
      font-size: 0.52rem;
      padding: 0.16rem 0.4rem;
    }
  }
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="exp-wrap">
        <div className="exp-orb exp-orb-1" />
        <div className="exp-orb exp-orb-2" />
        <div className="exp-orb exp-orb-3" />
        <div className="exp-grid" />
        <div className="exp-particle" />
        <div className="exp-particle" />
        <div className="exp-particle" />
        <div className="exp-particle" />
        <div className="exp-particle" />

        <div className="exp-content">
          <div className="exp-header">
            <div className="exp-section-label">Career</div>
            <h2 className="exp-title">
              Work <span>Experience</span>
            </h2>
          </div>

          <div className="exp-layout">
            {/* Accordion Timeline */}
            <div className="exp-timeline">
              {experiences.map((exp, i) => {
                const isOpen = expanded === i;
                return (
                  <div
                    key={i}
                    className={`exp-card exp-card-${exp.color}${isOpen ? " is-open" : ""}`}
                  >
                    <div className="exp-accent-bar" />

                    <div
                      className="exp-card-trigger"
                      onClick={() => setExpanded(isOpen ? null : i)}
                    >
                      <div className="exp-logo-wrap">
                        {exp.companyLogo ? (
                          <img
                            src={exp.companyLogo}
                            alt={exp.company}
                            className="exp-logo"
                          />
                        ) : (
                          <span className="exp-logo-placeholder">
                            {exp.icon}
                          </span>
                        )}
                      </div>

                      <div className="exp-card-info">
                        <div className="exp-role-row">
                          <div className="exp-role">{exp.role}</div>
                          <span
                            className={`exp-badge-type exp-badge-${exp.type.toLowerCase()}`}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="exp-company-row">
                          <span className="exp-company">{exp.company}</span>
                          <span className="exp-dot-sep" />
                          <span className="exp-period">{exp.period}</span>
                        </div>
                      </div>

                      <div className="exp-chevron">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M2.5 5L7 9.5L11.5 5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="exp-body">
                      <div className="exp-body-inner">
                        <div className="exp-body-pad">
                          <div className="exp-divider" />
                          <ul
                            className={`exp-bullets exp-bullets-${exp.color}`}
                          >
                            {exp.bullets.map((b, j) => (
                              <li
                                key={j}
                                className="exp-bullet"
                                onMouseEnter={() =>
                                  setHoveredBullet(`${i}-${j}`)
                                }
                                onMouseLeave={() => setHoveredBullet(null)}
                              >
                                <span
                                  className={`exp-bullet-icon exp-bullet-icon-${exp.color}`}
                                >
                                  ✦
                                </span>
                                <span>
                                  <strong>{b.label}:</strong> {b.desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="exp-tags">
                            {exp.tags.map((t) => (
                              <span
                                key={t}
                                className={`exp-tag exp-tag-${exp.color}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Skills sidebar */}
            <div className="exp-skills">
              <div className="exp-skills-title">Tech Stack</div>
              {Object.entries(skillGroups).map(([group, chips]) => (
                <div key={group} className="exp-skill-group">
                  <div className="exp-skill-group-name">{group}</div>
                  <div className="exp-skill-chips">
                    {chips.map((c) => (
                      <span key={c} className="exp-skill-chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="exp-skills-glow" />
              <div className="exp-skills-glow-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
