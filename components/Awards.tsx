'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const awards = [
  {
    title: "IT Dean's Achievement Award 2024",
    org: 'Monash University Malaysia',
    desc: 'Awarded to top 10 students achieving a 90%+ average across all units in a given year.',
    imageSrc: '/awards/deans-award.png',
    color: 'purple',
    year: '2024',
  },
  {
    title: "Top 10 Finalists — Monash L'Oréal Datathon",
    org: "Monash University Malaysia × L'Oréal Malaysia",
    desc: 'Recognised as one of the top 10 teams for outstanding project quality in the datathon.',
    imageSrc: '/awards/loreal-datathon.png',
    color: 'gold',
    year: '2025',
  },
  {
    title: 'Unit Award — MAT1841',
    org: 'Monash University Malaysia',
    desc: 'Achieved the highest mark in the unit MAT1841 across the entire cohort in 2024.',
    imageSrc: '/awards/mat1841.png',
    color: 'cyan',
    year: '2024',
  },
  {
    title: 'Top Achiever — GCE A-Level',
    org: "Taylor's College",
    desc: 'Awarded to students achieving all As across all A-Level subjects (4A*, 96% avg).',
    imageSrc: '/awards/a-level.png',
    color: 'pink',
    year: '2023',
  },
  {
    title: 'JPA LSPM Scholarship',
    org: 'Jabatan Perkhidmatan Awam Malaysia',
    desc: 'Prestigious government scholarship awarded to students with at least 8A+ in SPM.',
    imageSrc: '/awards/jpa-scholarship.png',
    color: 'gold',
    year: '2022',
  },
]

const colorMap = {
  gold: {
    border: 'rgba(251,191,36,0.30)',
    bg: 'rgba(251,191,36,0.06)',
    glow: 'rgba(251,191,36,0.22)',
    glowStrong: 'rgba(251,191,36,0.45)',
    accent: '#fcd34d',
    accentDim: 'rgba(252,211,77,0.15)',
    iconBg: 'linear-gradient(135deg, rgba(251,191,36,0.30), rgba(245,158,11,0.22))',
    iconBorder: 'rgba(252,211,77,0.45)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.25), transparent)',
    orb: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
    tag: 'rgba(251,191,36,0.12)',
    tagBorder: 'rgba(252,211,77,0.28)',
    tagColor: '#fef3c7',
    particle: '#fcd34d',
    textGlow: '0 0 12px rgba(252,211,77,0.6), 0 0 24px rgba(252,211,77,0.3)',
    titleColor: '#fef9e7',
    orgColor: 'rgba(254,243,199,0.70)',
    descColor: 'rgba(254,249,231,0.82)',
  },
  purple: {
    border: 'rgba(168,85,247,0.32)',
    bg: 'rgba(168,85,247,0.07)',
    glow: 'rgba(168,85,247,0.20)',
    glowStrong: 'rgba(168,85,247,0.50)',
    accent: '#c084fc',
    accentDim: 'rgba(192,132,252,0.15)',
    iconBg: 'linear-gradient(135deg, rgba(217,70,239,0.28), rgba(168,85,247,0.25))',
    iconBorder: 'rgba(192,132,252,0.45)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.28), transparent)',
    orb: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)',
    tag: 'rgba(168,85,247,0.12)',
    tagBorder: 'rgba(192,132,252,0.28)',
    tagColor: '#f3e8ff',
    particle: '#c084fc',
    textGlow: '0 0 12px rgba(192,132,252,0.6), 0 0 24px rgba(192,132,252,0.3)',
    titleColor: '#faf5ff',
    orgColor: 'rgba(243,232,255,0.70)',
    descColor: 'rgba(250,245,255,0.82)',
  },
  cyan: {
    border: 'rgba(103,232,249,0.26)',
    bg: 'rgba(103,232,249,0.055)',
    glow: 'rgba(103,232,249,0.18)',
    glowStrong: 'rgba(103,232,249,0.42)',
    accent: '#67e8f9',
    accentDim: 'rgba(103,232,249,0.13)',
    iconBg: 'linear-gradient(135deg, rgba(103,232,249,0.24), rgba(56,189,248,0.20))',
    iconBorder: 'rgba(165,243,252,0.40)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.22), transparent)',
    orb: 'radial-gradient(circle, rgba(103,232,249,0.16) 0%, transparent 70%)',
    tag: 'rgba(103,232,249,0.09)',
    tagBorder: 'rgba(165,243,252,0.24)',
    tagColor: '#cffafe',
    particle: '#67e8f9',
    textGlow: '0 0 12px rgba(103,232,249,0.55), 0 0 24px rgba(103,232,249,0.25)',
    titleColor: '#f0feff',
    orgColor: 'rgba(207,250,254,0.70)',
    descColor: 'rgba(240,254,255,0.82)',
  },
  pink: {
    border: 'rgba(236,72,153,0.26)',
    bg: 'rgba(236,72,153,0.055)',
    glow: 'rgba(236,72,153,0.18)',
    glowStrong: 'rgba(236,72,153,0.42)',
    accent: '#f9a8d4',
    accentDim: 'rgba(249,168,212,0.13)',
    iconBg: 'linear-gradient(135deg, rgba(236,72,153,0.24), rgba(244,114,182,0.20))',
    iconBorder: 'rgba(249,168,212,0.40)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.22), transparent)',
    orb: 'radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)',
    tag: 'rgba(236,72,153,0.09)',
    tagBorder: 'rgba(249,168,212,0.24)',
    tagColor: '#fce7f3',
    particle: '#f9a8d4',
    textGlow: '0 0 12px rgba(249,168,212,0.55), 0 0 24px rgba(249,168,212,0.25)',
    titleColor: '#fff0f8',
    orgColor: 'rgba(252,231,243,0.70)',
    descColor: 'rgba(255,240,248,0.82)',
  },
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function FloatingParticles({ color, count = 6 }: { color: string; count?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            borderRadius: '50%',
            background: color,
            left: `${15 + i * 14}%`,
            bottom: '10%',
            opacity: 0,
            animationName: `floatUp${i}`,
            animationDuration: `${2.8 + i * 0.5}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
            animationDelay: `${i * 0.55}s`,
          }}
        />
      ))}
    </div>
  )
}

// Fallback icon box when image fails or src not yet set
function AwardImage({
  src,
  alt,
  size,
  iconBg,
  iconBorder,
  glow,
}: {
  src: string
  alt: string
  size: number
  iconBg: string
  iconBorder: string
  glow: string
}) {
  const [errored, setErrored] = useState(false)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size >= 55 ? 15 : 12,
        background: iconBg,
        border: `1px solid ${iconBorder}`,
        boxShadow: `0 0 ${size >= 55 ? 20 : 14}px ${glow}`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setErrored(true)}
        />
      ) : (
        /* Placeholder grid shown when image is missing */
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            opacity: 0.35,
          }}
        >
          <svg
            width={size * 0.45}
            height={size * 0.45}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: '#ffffff' }}
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default function Awards() {
  const { ref: sectionRef, inView } = useInView(0.08)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

const css = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmerSweep {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes pulseRing {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50%       { opacity: 0.9; transform: scale(1.06); }
    }
    @keyframes iconFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%       { transform: translateY(-3px) rotate(-3deg); }
      66%       { transform: translateY(-1px) rotate(2deg); }
    }
    @keyframes labelPulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.6; }
    }

    ${Array.from({ length: 6 })
      .map(
        (_, i) => `
      @keyframes floatUp${i} {
        0%   { opacity: 0;   transform: translateY(0)   translateX(0)    scale(0.5); }
        15%  { opacity: 0.7; }
        80%  { opacity: 0.3; }
        100% { opacity: 0;   transform: translateY(-55px) translateX(${(i % 2 === 0 ? 1 : -1) * (6 + i * 2)}px) scale(1.2); }
      }
    `
      )
      .join('')}

    /* ── Layout ── */
    .aw-wrap {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 6rem clamp(1.5rem, 7vw, 8rem) 4rem;
      box-sizing: border-box;
      position: relative;
    }

    /* Ambient background blobs */
    .aw-ambient {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .aw-ambient-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.035;
    }

    /* ── Header ── */
    .aw-header {
      margin-bottom: 2.8rem;
      position: relative;
    }
    .aw-label {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      font-size: 0.70rem;
      font-weight: 700;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #fcd34d;
      text-shadow: 0 0 10px rgba(252,211,77,0.7);
      margin-bottom: 0.75rem;
    }
    .aw-label-line {
      width: 20px;
      height: 1.5px;
      background: linear-gradient(90deg, #fcd34d, transparent);
      border-radius: 2px;
    }
    .aw-label-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #fcd34d;
      box-shadow: 0 0 6px #fcd34d;
      animation: labelPulse 2s ease-in-out infinite;
    }
    .aw-title {
      font-size: clamp(2rem, 3.6vw, 3rem);
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0 0 30px rgba(255,255,255,0.12);
      letter-spacing: -0.025em;
      line-height: 1.15;
    }
    .aw-title-grad {
      background: linear-gradient(110deg, #fde68a 0%, #fcd34d 45%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 10px rgba(252,211,77,0.55));
    }
    .aw-subtitle {
      margin-top: 0.6rem;
      font-size: 0.88rem;
      color: rgba(255,255,255,0.48);
      letter-spacing: 0.01em;
    }

    /* ── Grid ── */
    .aw-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto auto;
      gap: 1rem;
    }

    /* ── Card Base ── */
    .aw-card {
      position: relative;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.022);
      backdrop-filter: blur(16px);
      overflow: hidden;
      cursor: default;
      transition:
        transform 0.30s cubic-bezier(0.16,1,0.3,1),
        border-color 0.30s ease,
        box-shadow 0.30s ease;
    }
    .aw-card:hover { transform: translateY(-5px) scale(1.008); }

    /* inner padding wrapper */
    .aw-card-inner {
      position: relative;
      z-index: 2;
      padding: 1.5rem;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    /* Shimmer sweep on hover */
    .aw-shimmer {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      overflow: hidden;
      border-radius: inherit;
    }
    .aw-shimmer::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 50%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .aw-card:hover .aw-shimmer::after {
      opacity: 1;
      animation: shimmerSweep 0.7s ease forwards;
    }

    /* Corner orb */
    .aw-orb {
      position: absolute;
      bottom: -35px;
      right: -35px;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.40s ease;
      pointer-events: none;
      z-index: 1;
    }
    .aw-card:hover .aw-orb { opacity: 1; }

    /* Top accent bar */
    .aw-accent-bar {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      z-index: 4;
      opacity: 0;
      transition: opacity 0.30s ease;
      border-radius: 16px 16px 0 0;
    }
    .aw-card:hover .aw-accent-bar { opacity: 1; }

    /* ── Icon ring ── */
    .aw-icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .aw-icon-ring {
      position: absolute;
      inset: -4px;
      border-radius: 14px;
      border: 1px solid transparent;
      animation: pulseRing 3s ease-in-out infinite;
      transition: opacity 0.3s;
      opacity: 0;
    }
    .aw-card:hover .aw-icon-ring { opacity: 1; }
    .aw-card:hover .aw-icon-wrap > div {
      animation: iconFloat 2.5s ease-in-out infinite;
    }

    /* ── Text ── */
    .aw-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .aw-card-title {
      font-weight: 700;
      color: #ffffff;
      line-height: 1.35;
      letter-spacing: -0.012em;
    }
    .aw-card-org {
      font-size: 0.76rem;
      line-height: 1.45;
    }
    .aw-card-desc {
      font-size: 0.82rem;
      line-height: 1.72;
      margin-top: auto;
    }
    .aw-year-badge {
      flex-shrink: 0;
      font-size: 0.64rem;
      font-weight: 700;
      letter-spacing: 0.09em;
      padding: 0.18rem 0.48rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.45);
      transition: color 0.3s, border-color 0.3s, background 0.3s;
    }
    .aw-card:hover .aw-year-badge {
      color: rgba(255,255,255,0.80);
      border-color: rgba(255,255,255,0.22);
      background: rgba(255,255,255,0.09);
    }

    /* ── Featured card (spans 2 cols) ── */
    .aw-card-featured { grid-column: span 2; }
    .aw-card-featured .aw-card-inner {
      flex-direction: row;
      align-items: flex-start;
      gap: 1.4rem;
      padding: 1.9rem;
    }
    .aw-card-featured .aw-card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .aw-card-featured .aw-card-title { font-size: 1.18rem; }
    .aw-card-featured .aw-card-org   { font-size: 0.80rem; }
    .aw-card-featured .aw-card-desc  { font-size: 0.86rem; }

    /* Featured rotating border */
    .aw-card-featured .aw-featured-ring {
      position: absolute;
      inset: -1px;
      border-radius: 17px;
      background: conic-gradient(
        from 0deg,
        transparent 0%,
        rgba(192,132,252,0.5) 25%,
        transparent 50%,
        rgba(192,132,252,0.3) 75%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.4s;
      animation: rotateSlow 4s linear infinite;
      z-index: 0;
      pointer-events: none;
    }
    .aw-card-featured:hover .aw-featured-ring { opacity: 1; }
    .aw-card-featured .aw-featured-ring-mask {
      position: absolute;
      inset: 1px;
      border-radius: 16px;
      background: inherit;
      z-index: 0;
      pointer-events: none;
    }

    /* ── Tall card ── */
    .aw-card-tall { grid-row: span 2; }
    .aw-card-tall .aw-card-inner {
      padding: 1.6rem;
      justify-content: space-between;
    }
    .aw-card-tall .aw-card-title { font-size: 0.97rem; }
    .aw-card-tall .aw-card-org   { font-size: 0.76rem; }
    .aw-card-tall .aw-card-desc  { font-size: 0.82rem; }

    /* ── Normal card ── */
    .aw-card-normal .aw-card-title { font-size: 0.93rem; }
    .aw-card-normal .aw-card-org   { font-size: 0.74rem; }
    .aw-card-normal .aw-card-desc  { font-size: 0.80rem; }

    /* ── Entry animations ── */
    .aw-card.is-visible {
      animation: fadeSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
    }
    .aw-header.is-visible {
      animation: fadeIn 0.6s ease both;
    }

    /* ── Responsive ── */
    @media (max-width: 860px) {
      .aw-grid { 
        grid-template-columns: 1fr 1fr; 
      }
      .aw-card-featured { 
        grid-column: span 2; 
      }
      .aw-card-tall { 
        grid-row: span 1; 
      }
    }

    @media (max-width: 768px) {
      .aw-wrap {
        padding: 3rem 1rem 2.5rem;
        min-height: auto;
      }

      .aw-ambient-blob {
        opacity: 0.025;
        filter: blur(60px);
      }

      .aw-ambient-blob:first-child {
        width: 350px;
        height: 350px;
      }

      .aw-ambient-blob:last-child {
        width: 300px;
        height: 300px;
      }

      .aw-header {
        margin-bottom: 1.5rem;
      }

      .aw-label {
        font-size: 0.60rem;
        gap: 0.4rem;
        margin-bottom: 0.5rem;
      }

      .aw-label-line {
        width: 15px;
      }

      .aw-label-dot {
        width: 3px;
        height: 3px;
      }

      .aw-title {
        font-size: clamp(1.5rem, 5vw, 1.9rem);
      }

      .aw-subtitle {
        font-size: 0.76rem;
        margin-top: 0.45rem;
      }

      /* Compact 2-row grid layout */
      .aw-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 0.7rem;
      }

      /* Featured card spans full width */
      .aw-card-featured {
        grid-column: 1 / -1;
      }

      .aw-card {
        border-radius: 10px;
      }

      .aw-card:hover {
        transform: scale(1.01);
      }

      .aw-card-inner {
        padding: 0.9rem;
        gap: 0.6rem;
      }

      .aw-accent-bar {
        border-radius: 10px 10px 0 0;
        height: 1.5px;
      }

      .aw-orb {
        width: 70px;
        height: 70px;
        bottom: -18px;
        right: -18px;
      }

      .aw-icon-ring {
        inset: -3px;
      }

      .aw-row {
        gap: 0.3rem;
        margin-bottom: 0.5rem;
      }

      .aw-year-badge {
        font-size: 0.52rem;
        padding: 0.13rem 0.35rem;
      }

      .aw-card-title {
        font-size: 0.76rem;
        line-height: 1.25;
        margin-bottom: 0.25rem;
      }

      .aw-card-org {
        font-size: 0.62rem;
        line-height: 1.35;
      }

      .aw-card-desc {
        font-size: 0.68rem;
        line-height: 1.5;
      }

      /* Featured card - horizontal layout */
      .aw-card-featured .aw-card-inner {
        flex-direction: row;
        padding: 1rem;
        gap: 0.9rem;
      }

      .aw-card-featured .aw-card-content {
        gap: 0.3rem;
      }

      .aw-card-featured .aw-card-title {
        font-size: 0.88rem;
      }

      .aw-card-featured .aw-card-org {
        font-size: 0.66rem;
      }

      .aw-card-featured .aw-card-desc {
        font-size: 0.72rem;
      }

      /* Reset tall card */
      .aw-card-tall {
        grid-row: auto;
      }

      .aw-card-tall .aw-card-inner {
        padding: 0.9rem;
      }

      .aw-card-tall .aw-card-title {
        font-size: 0.76rem;
      }

      .aw-card-tall .aw-card-org {
        font-size: 0.62rem;
      }

      .aw-card-tall .aw-card-desc {
        font-size: 0.68rem;
      }

      /* Normal card */
      .aw-card-normal .aw-card-title {
        font-size: 0.76rem;
      }

      .aw-card-normal .aw-card-org {
        font-size: 0.62rem;
      }

      .aw-card-normal .aw-card-desc {
        font-size: 0.68rem;
      }
    }

    @media (max-width: 640px) {
      .aw-wrap {
        padding: 2.5rem 0.85rem 2rem;
      }

      .aw-header {
        margin-bottom: 1.3rem;
      }

      .aw-label {
        font-size: 0.56rem;
        gap: 0.35rem;
      }

      .aw-label-line {
        width: 13px;
      }

      .aw-title {
        font-size: clamp(1.4rem, 6vw, 1.7rem);
      }

      .aw-subtitle {
        font-size: 0.72rem;
      }

      .aw-grid {
        gap: 0.65rem;
      }

      .aw-card {
        border-radius: 9px;
      }

      .aw-card-inner {
        padding: 0.85rem;
        gap: 0.55rem;
      }

      .aw-accent-bar {
        border-radius: 9px 9px 0 0;
      }

      .aw-orb {
        width: 65px;
        height: 65px;
        bottom: -16px;
        right: -16px;
      }

      .aw-row {
        margin-bottom: 0.45rem;
      }

      .aw-year-badge {
        font-size: 0.50rem;
        padding: 0.12rem 0.33rem;
      }

      .aw-card-title {
        font-size: 0.72rem;
        margin-bottom: 0.22rem;
      }

      .aw-card-org {
        font-size: 0.60rem;
      }

      .aw-card-desc {
        font-size: 0.66rem;
        line-height: 1.48;
      }

      /* Featured card - stack vertically on small screens */
      .aw-card-featured .aw-card-inner {
        flex-direction: column;
        padding: 0.95rem;
        gap: 0.75rem;
      }

      .aw-card-featured .aw-card-title {
        font-size: 0.82rem;
      }

      .aw-card-featured .aw-card-org {
        font-size: 0.64rem;
      }

      .aw-card-featured .aw-card-desc {
        font-size: 0.70rem;
      }
    }

    @media (max-width: 480px) {
      .aw-wrap {
        padding: 2.2rem 0.75rem 1.8rem;
      }

      .aw-header {
        margin-bottom: 1.2rem;
      }

      .aw-label {
        font-size: 0.54rem;
      }

      .aw-label-line {
        width: 12px;
      }

      .aw-title {
        font-size: clamp(1.3rem, 7vw, 1.6rem);
      }

      .aw-subtitle {
        font-size: 0.70rem;
      }

      .aw-grid {
        gap: 0.6rem;
      }

      .aw-card-inner {
        padding: 0.8rem;
        gap: 0.5rem;
      }

      .aw-orb {
        width: 60px;
        height: 60px;
        bottom: -15px;
        right: -15px;
      }

      .aw-row {
        margin-bottom: 0.4rem;
      }

      .aw-year-badge {
        font-size: 0.48rem;
        padding: 0.11rem 0.3rem;
      }

      .aw-card-title {
        font-size: 0.70rem;
        margin-bottom: 0.2rem;
      }

      .aw-card-org {
        font-size: 0.58rem;
      }

      .aw-card-desc {
        font-size: 0.64rem;
        line-height: 1.45;
      }

      .aw-card-featured .aw-card-inner {
        padding: 0.9rem;
        gap: 0.7rem;
      }

      .aw-card-featured .aw-card-title {
        font-size: 0.78rem;
      }

      .aw-card-featured .aw-card-org {
        font-size: 0.62rem;
      }

      .aw-card-featured .aw-card-desc {
        font-size: 0.68rem;
      }
    }

    @media (max-width: 380px) {
      .aw-wrap {
        padding: 2rem 0.65rem 1.6rem;
      }

      .aw-header {
        margin-bottom: 1.1rem;
      }

      .aw-label {
        font-size: 0.52rem;
      }

      .aw-title {
        font-size: 1.25rem;
      }

      .aw-subtitle {
        font-size: 0.68rem;
      }

      .aw-grid {
        gap: 0.55rem;
      }

      .aw-card-inner {
        padding: 0.75rem;
        gap: 0.48rem;
      }

      .aw-year-badge {
        font-size: 0.46rem;
        padding: 0.1rem 0.28rem;
      }

      .aw-card-title {
        font-size: 0.68rem;
      }

      .aw-card-org {
        font-size: 0.56rem;
      }

      .aw-card-desc {
        font-size: 0.62rem;
      }

      .aw-card-featured .aw-card-inner {
        padding: 0.85rem;
      }

      .aw-card-featured .aw-card-title {
        font-size: 0.76rem;
      }

      .aw-card-featured .aw-card-org {
        font-size: 0.60rem;
      }

      .aw-card-featured .aw-card-desc {
        font-size: 0.66rem;
      }
    }
  `
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="aw-wrap" ref={sectionRef}>
        {/* Ambient blobs */}
        <div className="aw-ambient">
          <div
            className="aw-ambient-blob"
            style={{
              width: 500,
              height: 500,
              background: 'rgba(168,85,247,1)',
              top: '-10%',
              left: '-5%',
            }}
          />
          <div
            className="aw-ambient-blob"
            style={{
              width: 400,
              height: 400,
              background: 'rgba(251,191,36,1)',
              bottom: '5%',
              right: '10%',
            }}
          />
        </div>

        {/* Header */}
        <div className={`aw-header${inView ? ' is-visible' : ''}`}>
          <div className="aw-label">
            <span className="aw-label-line" />
            <span className="aw-label-dot" />
            Recognition
          </div>
          <h2 className="aw-title">
            Awards &amp; <span className="aw-title-grad">Achievements</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="aw-grid">
          {awards.map((a, i) => {
            const c = colorMap[a.color as keyof typeof colorMap]
            const featured = i === 0
            const tall = i === 2
            const cardClass = featured
              ? 'aw-card aw-card-featured'
              : tall
              ? 'aw-card aw-card-tall aw-card-normal'
              : 'aw-card aw-card-normal'
            const delay = `${0.08 + i * 0.1}s`
            const isHovered = hoveredIndex === i

            return (
              <div
                key={i}
                className={`${cardClass}${inView ? ' is-visible' : ''}`}
                style={{
                  animationDelay: delay,
                  borderColor: isHovered
                    ? c.border.replace('0.30', '0.55').replace('0.26', '0.50').replace('0.32', '0.58')
                    : c.border,
                  background: `linear-gradient(140deg, ${c.bg} 0%, rgba(255,255,255,0.012) 100%)`,
                  boxShadow: isHovered
                    ? `0 10px 40px ${c.glow}, 0 0 0 1px ${c.border}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Rotating border (featured only) */}
                {featured && <div className="aw-featured-ring" />}
                {featured && (
                  <div
                    className="aw-featured-ring-mask"
                    style={{
                      background: `linear-gradient(140deg, ${c.bg} 0%, rgba(10,10,20,0.95) 100%)`,
                    }}
                  />
                )}

                {/* Top accent bar */}
                <div
                  className="aw-accent-bar"
                  style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
                />

                {/* Shimmer */}
                <div className="aw-shimmer">
                  <style>{`.aw-shimmer::after { background: ${c.shimmer}; }`}</style>
                </div>

                {/* Corner orb */}
                <div className="aw-orb" style={{ background: c.orb }} />

                {/* Floating particles */}
                <FloatingParticles color={c.particle} count={5} />

                {/* ── Card content ── */}
                {featured ? (
                  <div className="aw-card-inner">
                    {/* Image / icon */}
                    <div className="aw-icon-wrap">
                      <div className="aw-icon-ring" style={{ borderColor: c.accent }} />
                      <AwardImage
                        src={a.imageSrc}
                        alt={a.title}
                        size={62}
                        iconBg={c.iconBg}
                        iconBorder={c.iconBorder}
                        glow={c.glow}
                      />
                    </div>

                    <div className="aw-card-content">
                      <div className="aw-row">
                        <div
                          className="aw-card-title"
                          style={{
                            color: c.titleColor,
                            textShadow: isHovered ? c.textGlow : 'none',
                            transition: 'text-shadow 0.3s ease, color 0.3s ease',
                          }}
                        >
                          {a.title}
                        </div>
                        <div className="aw-year-badge">{a.year}</div>
                      </div>
                      <div
                        className="aw-card-org"
                        style={{
                          color: isHovered ? c.orgColor : 'rgba(255,255,255,0.52)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {a.org}
                      </div>
                      <div
                        className="aw-card-desc"
                        style={{
                          color: isHovered ? c.descColor : 'rgba(255,255,255,0.65)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {a.desc}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aw-card-inner">
                    <div>
                      <div className="aw-row" style={{ marginBottom: '0.85rem' }}>
                        <div className="aw-icon-wrap">
                          <div className="aw-icon-ring" style={{ borderColor: c.accent }} />
                          <AwardImage
                            src={a.imageSrc}
                            alt={a.title}
                            size={44}
                            iconBg={c.iconBg}
                            iconBorder={c.iconBorder}
                            glow={c.glow}
                          />
                        </div>
                        <div className="aw-year-badge">{a.year}</div>
                      </div>

                      <div
                        className="aw-card-title"
                        style={{
                          fontSize: tall ? '0.97rem' : '0.93rem',
                          marginBottom: '0.35rem',
                          color: c.titleColor,
                          textShadow: isHovered ? c.textGlow : 'none',
                          transition: 'text-shadow 0.3s ease, color 0.3s ease',
                        }}
                      >
                        {a.title}
                      </div>

                      <div
                        className="aw-card-org"
                        style={{
                          fontSize: tall ? '0.76rem' : '0.74rem',
                          color: isHovered ? c.orgColor : 'rgba(255,255,255,0.52)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {a.org}
                      </div>
                    </div>

                    <div
                      className="aw-card-desc"
                      style={{
                        fontSize: tall ? '0.82rem' : '0.80rem',
                        color: isHovered ? c.descColor : 'rgba(255,255,255,0.65)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {a.desc}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

