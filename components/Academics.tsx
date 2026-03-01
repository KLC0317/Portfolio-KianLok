'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const education = [
  {
    school: 'Monash University Malaysia',
    degree: 'Bachelor of Computer Science',
    period: 'Feb 2024 – Present',
    grade: 'CGPA 4.00',
    sub: 'WAM: 88.667',
    logo: '/awards/monash.png',
    color: 'purple',
    highlights: [
      'Perfect CGPA of 4.00 across all semesters',
      'IT Dean\'s Achievement Award 2024',
      'Unit Award — Highest mark in MAT1841',
      'Top 10 Finalists — Monash L\'Oréal Datathon',
    ],
    tags: ['Computer Science', 'AI & ML', 'Full-Stack', 'Research'],
  },
  {
    school: 'Taylor\'s College',
    degree: 'GCE A-Level',
    period: 'Aug 2022 – Nov 2023',
    grade: '4A*',
    sub: '96% Average',
    logo: '/awards/a-level.png',
    color: 'cyan',
    highlights: [
      'Achieved 4A* across all A-Level subjects',
      '96% overall average — Top Achiever award',
      'JPA LSPM Scholarship recipient',
      'Strong foundation in Mathematics & Sciences',
    ],
    tags: ['Mathematics', 'Physics', 'Chemistry', 'Further Maths'],
  },
  {
    school: 'SMK Sung Siew Sandakan',
    degree: 'SPM (Sijil Pelajaran Malaysia)',
    period: 'Jan 2017 – Apr 2022',
    grade: '10A+',
    sub: 'All distinctions',
    logo: '/awards/sungsiew.png',
    color: 'pink',
    highlights: [
      'Achieved 10A+ across all SPM subjects',
      'JPA LSPM Scholarship — minimum 8A+ required',
      'Consistent academic excellence throughout',
      'Strong groundwork in STEM disciplines',
    ],
    tags: ['SPM', 'STEM', 'State Top 1', 'Sciences'],
  },
]

const stats = [
  { value: '4.00', label: 'CGPA', color: 'purple' },
  { value: '88.7', label: 'WAM %', color: 'cyan' },
  { value: '4A*',  label: 'A-Level', color: 'pink' },
  { value: '10A+', label: 'SPM', color: 'gold' },
]

const colorMap = {
  purple: {
    border:      'rgba(168,85,247,0.28)',
    borderHover: 'rgba(168,85,247,0.65)',
    bg:          'rgba(168,85,247,0.06)',
    glow:        'rgba(168,85,247,0.20)',
    glowStrong:  'rgba(168,85,247,0.45)',
    accent:      '#c084fc',
    gradientTop: 'rgba(168,85,247,0.80)',
    gradientMid: 'rgba(192,132,252,0.50)',
    tagBg:       'rgba(168,85,247,0.12)',
    tagBorder:   'rgba(192,132,252,0.30)',
    tagColor:    '#f3e8ff',
    dotColor:    '#c084fc',
    dotGlow:     'rgba(192,132,252,0.70)',
    statGrad:    'linear-gradient(110deg, #f0abfc 0%, #c084fc 50%, #818cf8 100%)',
    shimmer:     'rgba(168,85,247,0.15)',
    cardGlow:    '168,85,247',
  },
  cyan: {
    border:      'rgba(103,232,249,0.24)',
    borderHover: 'rgba(103,232,249,0.60)',
    bg:          'rgba(103,232,249,0.05)',
    glow:        'rgba(103,232,249,0.16)',
    glowStrong:  'rgba(103,232,249,0.40)',
    accent:      '#67e8f9',
    gradientTop: 'rgba(103,232,249,0.75)',
    gradientMid: 'rgba(56,189,248,0.45)',
    tagBg:       'rgba(103,232,249,0.10)',
    tagBorder:   'rgba(165,243,252,0.26)',
    tagColor:    '#cffafe',
    dotColor:    '#67e8f9',
    dotGlow:     'rgba(103,232,249,0.65)',
    statGrad:    'linear-gradient(110deg, #a5f3fc 0%, #67e8f9 50%, #38bdf8 100%)',
    shimmer:     'rgba(103,232,249,0.12)',
    cardGlow:    '103,232,249',
  },
  pink: {
    border:      'rgba(236,72,153,0.24)',
    borderHover: 'rgba(236,72,153,0.58)',
    bg:          'rgba(236,72,153,0.05)',
    glow:        'rgba(236,72,153,0.16)',
    glowStrong:  'rgba(236,72,153,0.38)',
    accent:      '#f9a8d4',
    gradientTop: 'rgba(236,72,153,0.75)',
    gradientMid: 'rgba(244,114,182,0.45)',
    tagBg:       'rgba(236,72,153,0.10)',
    tagBorder:   'rgba(249,168,212,0.28)',
    tagColor:    '#fce7f3',
    dotColor:    '#f9a8d4',
    dotGlow:     'rgba(249,168,212,0.65)',
    statGrad:    'linear-gradient(110deg, #fbcfe8 0%, #f9a8d4 50%, #ec4899 100%)',
    shimmer:     'rgba(236,72,153,0.12)',
    cardGlow:    '236,72,153',
  },
  gold: {
    border:      'rgba(251,191,36,0.28)',
    borderHover: 'rgba(251,191,36,0.62)',
    bg:          'rgba(251,191,36,0.06)',
    glow:        'rgba(251,191,36,0.18)',
    glowStrong:  'rgba(251,191,36,0.42)',
    accent:      '#fcd34d',
    gradientTop: 'rgba(251,191,36,0.80)',
    gradientMid: 'rgba(245,158,11,0.45)',
    tagBg:       'rgba(251,191,36,0.10)',
    tagBorder:   'rgba(252,211,77,0.28)',
    tagColor:    '#fef3c7',
    dotColor:    '#fcd34d',
    dotGlow:     'rgba(252,211,77,0.65)',
    statGrad:    'linear-gradient(110deg, #fde68a 0%, #fcd34d 50%, #f59e0b 100%)',
    shimmer:     'rgba(251,191,36,0.14)',
    cardGlow:    '251,191,36',
  },
}

/* ─── tiny hook: observe when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Animated number counter ─── */
function Counter({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0')
  const numericMatch = value.match(/[\d.]+/)
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : null
  const prefix = ''
  const suffix = value.replace(/[\d.]+/, '')

  useEffect(() => {
    if (!inView || numeric === null) { setDisplay(value); return }
    let start = 0
    const duration = 1400
    const step = 16
    const total = Math.ceil(duration / step)
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numeric
      const formatted = Number.isInteger(numeric)
        ? Math.round(current).toString()
        : current.toFixed(2)
      setDisplay(prefix + formatted + suffix)
      if (frame >= total) { setDisplay(value); clearInterval(timer) }
    }, step)
    return () => clearInterval(timer)
  }, [inView, value, numeric, prefix, suffix])

  return <>{display}</>
}

export default function Academics() {
  const { ref: wrapRef, inView } = useInView(0.05)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Track mouse per-card for spotlight effect */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    const rect = card.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const css = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes barReveal {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes shimmerSlide {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    @keyframes floatOrb {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-12px) scale(1.04); }
    }
    @keyframes pulseRing {
      0%   { transform: scale(0.95); opacity: 0.7; }
      70%  { transform: scale(1.08); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }
    @keyframes dotPulse {
      0%, 100% { transform: scale(1);   opacity: 1; }
      50%       { transform: scale(1.5); opacity: 0.6; }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes borderGlow {
      0%, 100% { opacity: 0.5; }
      50%       { opacity: 1; }
    }

    .acad-wrap {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 6rem clamp(1.5rem, 7vw, 8rem) 4rem;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    /* Ambient background orbs */
    .acad-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(80px);
      opacity: 0;
      transition: opacity 1.2s ease;
    }
    .acad-orb.visible { opacity: 1; }
    .acad-orb-1 {
      width: 500px; height: 500px;
      top: -100px; right: -100px;
      background: radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%);
      animation: floatOrb 8s ease-in-out infinite;
    }
    .acad-orb-2 {
      width: 400px; height: 400px;
      bottom: -80px; left: -80px;
      background: radial-gradient(circle, rgba(103,232,249,0.08) 0%, transparent 70%);
      animation: floatOrb 10s ease-in-out infinite reverse;
    }

    /* ── Header ── */
    .acad-header {
      margin-bottom: 2.4rem;
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .acad-header.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .acad-section-label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.66rem;
      font-weight: 600;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #c084fc;
      margin-bottom: 0.65rem;
    }
    .acad-label-line {
      display: block;
      width: 20px;
      height: 1px;
      background: linear-gradient(90deg, #c084fc, transparent);
    }
    .acad-title {
      font-size: clamp(1.7rem, 3.2vw, 2.6rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }
    .acad-title span {
      background: linear-gradient(110deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 4s ease infinite;
    }
    .acad-subtitle {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.28);
      margin-top: 0.4rem;
      letter-spacing: 0.01em;
    }

    /* ── Stats bar ── */
    .acad-stats {
      display: flex;
      gap: 0.85rem;
      margin-bottom: 2.4rem;
      flex-wrap: wrap;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
    }
    .acad-stats.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .acad-stat {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.85rem 1.5rem;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(10,10,20,0.50);
      backdrop-filter: blur(16px);
      gap: 0.12rem;
      cursor: default;
      overflow: hidden;
      transition: transform 0.30s cubic-bezier(0.16,1,0.3,1),
                  box-shadow  0.30s ease,
                  border-color 0.30s ease;
    }
    .acad-stat:hover { transform: translateY(-4px) scale(1.03); }

    /* Rotating border glow on stat */
    .acad-stat-ring {
      position: absolute;
      inset: -1px;
      border-radius: 14px;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    .acad-stat:hover .acad-stat-ring { opacity: 1; }

    /* Shimmer sweep */
    .acad-stat-shimmer {
      position: absolute;
      top: 0; left: 0;
      width: 40%;
      height: 100%;
      background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
      opacity: 0;
      pointer-events: none;
    }
    .acad-stat:hover .acad-stat-shimmer {
      opacity: 1;
      animation: shimmerSlide 0.7s ease forwards;
    }

    .acad-stat-value {
      font-size: 1.55rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1;
    }
.acad-stat-label {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ffffff;  /* was rgba(255,255,255,0.28) */
}


    /* ── Cards grid ── */
    .acad-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.1rem;
    }

    /* ── Individual card ── */
    .acad-card {
      position: relative;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(8,8,18,0.65);
      backdrop-filter: blur(20px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      cursor: default;
      opacity: 0;
      transform: translateY(30px);
      transition:
        opacity    0.65s ease,
        transform  0.65s cubic-bezier(0.16,1,0.3,1),
        border-color 0.30s ease,
        box-shadow 0.30s ease;
    }
    .acad-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .acad-card.visible:nth-child(2) { transition-delay: 0.10s; }
    .acad-card.visible:nth-child(3) { transition-delay: 0.20s; }

    /* Mouse-follow spotlight */
    .acad-card-spotlight {
      position: absolute;
      inset: 0;
      border-radius: 18px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .acad-card:hover .acad-card-spotlight { opacity: 1; }

    /* Animated top gradient bar */
    .acad-card-bar {
      height: 3px;
      width: 100%;
      flex-shrink: 0;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s;
    }
    .acad-card.visible .acad-card-bar {
      transform: scaleX(1);
    }

    /* Decorative corner accent */
    .acad-card-corner {
      position: absolute;
      top: 3px; right: 0;
      width: 60px; height: 60px;
      pointer-events: none;
      opacity: 0.40;
    }
    .acad-card-corner-line {
      position: absolute;
      background: currentColor;
      border-radius: 2px;
    }
    .acad-card-corner-line-h {
      top: 0; right: 0;
      width: 30px; height: 1px;
    }
    .acad-card-corner-line-v {
      top: 0; right: 0;
      width: 1px; height: 30px;
    }

    .acad-card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1;
    }

    /* Logo + grade row */
    .acad-card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
    }

    /* School logo container */
    .acad-logo-wrap {
      position: relative;
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }
    .acad-logo-bg {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .acad-logo-img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      filter: brightness(0.95) saturate(0.9);
      transition: transform 0.35s ease, filter 0.35s ease;
    }
    .acad-card:hover .acad-logo-img {
      transform: scale(1.10);
      filter: brightness(1.05) saturate(1.1);
    }
    /* Pulse ring around logo */
    .acad-logo-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 16px;
      border: 1px solid transparent;
      animation: pulseRing 2.8s ease-out infinite;
      pointer-events: none;
    }

    /* Grade pill */
    .acad-grade-pill {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.08rem;
    }
    .acad-grade-value {
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1;
    }
    .acad-grade-sub {
      font-size: 0.57rem;
      color: rgba(255,255,255,0.28);
      letter-spacing: 0.05em;
    }

    /* School info */
    .acad-card-info { }
    .acad-card-school {
      font-size: 0.97rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
      line-height: 1.25;
    }
    .acad-card-degree {
      font-size: 0.71rem;
      color: rgba(255,255,255,0.38);
      margin-top: 0.15rem;
      line-height: 1.4;
    }
    .acad-card-period {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      margin-top: 0.45rem;
      padding: 0.18rem 0.55rem;
      border-radius: 100px;
      font-size: 0.60rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.35);
    }
    .acad-period-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* Divider with fade */
    .acad-divider {
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 80%);
    }

    /* Highlights */
    .acad-highlights {
      list-style: none;
      margin: 0; padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.48rem;
    }
    .acad-highlight {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.52);
      line-height: 1.55;
      transition: color 0.22s ease;
    }
    .acad-card:hover .acad-highlight {
      color: rgba(255,255,255,0.65);
    }
    .acad-highlight-dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 0.45rem;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .acad-card:hover .acad-highlight-dot {
      transform: scale(1.4);
    }

    /* Tags */
    .acad-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.30rem;
      margin-top: auto;
      padding-top: 0.3rem;
    }
    .acad-tag {
      padding: 0.16rem 0.50rem;
      border-radius: 100px;
      font-size: 0.59rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      transition: transform 0.20s ease, box-shadow 0.20s ease;
    }
    .acad-tag:hover {
      transform: translateY(-1px);
    }

    /* Bottom ambient glow inside card */
    .acad-card-ambient {
      position: absolute;
      bottom: -50px;
      right: -50px;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.45s ease;
      filter: blur(30px);
    }
    .acad-card:hover .acad-card-ambient { opacity: 1; }

    /* Top-left subtle noise texture overlay */
    .acad-card-noise {
      position: absolute;
      inset: 0;
      border-radius: 18px;
      pointer-events: none;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    }

    @media (max-width: 860px) {
      .acad-cards { grid-template-columns: 1fr 1fr; }
      .acad-stats  { justify-content: center; }
    }
    @media (max-width: 520px) {
      .acad-cards { grid-template-columns: 1fr; }
      .acad-wrap  { padding: 5rem 1.25rem 3rem; }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="acad-wrap" ref={wrapRef}>

        {/* Ambient background orbs */}
        <div className={`acad-orb acad-orb-1 ${inView ? 'visible' : ''}`} />
        <div className={`acad-orb acad-orb-2 ${inView ? 'visible' : ''}`} />

        {/* ── Header ── */}
        <div className={`acad-header ${inView ? 'visible' : ''}`}>
          <div className="acad-section-label">
            <span className="acad-label-line" />
            Education
          </div>
          <h2 className="acad-title">
            Academic <span>Background</span>
          </h2>
          <p className="acad-subtitle" style={{ color: '#ffffff' }}>A journey of consistent excellence across every stage</p>
        </div>

        {/* ── Stats bar ── */}
        <div className={`acad-stats ${inView ? 'visible' : ''}`}>
          {stats.map((s, i) => {
            const c = colorMap[s.color as keyof typeof colorMap]
            return (
              <div
                key={i}
                className="acad-stat"
                style={{ '--stat-color': c.cardGlow } as React.CSSProperties}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = c.borderHover
                  e.currentTarget.style.boxShadow  = `0 8px 32px rgba(${c.cardGlow},0.22), inset 0 1px 0 rgba(255,255,255,0.06)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow   = 'none'
                }}
              >
                <div className="acad-stat-shimmer" />
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                }} />
                <div
                  className="acad-stat-value"
                  style={{
                    background: c.statGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',                    backgroundClip: 'text',
                  }}
                >
                  <Counter value={s.value} inView={inView} />
                </div>
                <div className="acad-stat-label">{s.label}</div>
              </div>
            )
          })}
        </div>

        {/* ── Education Cards ── */}
        <div className="acad-cards">
          {education.map((edu, idx) => {
            const c = colorMap[edu.color as keyof typeof colorMap]
            const isHovered = hoveredCard === idx

            return (
              <div
                key={idx}
                ref={el => { cardRefs.current[idx] = el }}
                className={`acad-card ${inView ? 'visible' : ''}`}
                style={{
                  transitionDelay: inView ? `${idx * 0.10}s` : '0s',
                  borderColor: isHovered ? c.borderHover : undefined,
                  boxShadow: isHovered
                    ? `0 0 0 1px rgba(${c.cardGlow},0.25), 0 20px 60px rgba(${c.cardGlow},0.18), 0 8px 24px rgba(0,0,0,0.40)`
                    : undefined,
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={e => handleMouseMove(e, idx)}
              >
                {/* Noise overlay */}
                <div className="acad-card-noise" />

                {/* Mouse-follow spotlight */}
                <div
                  className="acad-card-spotlight"
                  style={{
                    background: isHovered
                      ? `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${c.cardGlow},0.10) 0%, transparent 70%)`
                      : undefined,
                  }}
                />

                {/* Ambient corner glow */}
                <div
                  className="acad-card-ambient"
                  style={{ background: `rgba(${c.cardGlow},0.28)` }}
                />

                {/* Top gradient bar */}
                <div
                  className="acad-card-bar"
                  style={{
                    background: `linear-gradient(90deg, ${c.gradientTop}, ${c.gradientMid}, transparent)`,
                  }}
                />

                {/* Corner accent lines */}
                <div className="acad-card-corner" style={{ color: c.accent }}>
                  <div className="acad-card-corner-line acad-card-corner-line-h" />
                  <div className="acad-card-corner-line acad-card-corner-line-v" />
                </div>

                <div className="acad-card-body">
                  {/* Logo + Grade */}
                  <div className="acad-card-top">
                    <div className="acad-logo-wrap">
                      <div
                        className="acad-logo-bg"
                        style={{ background: c.bg, borderColor: c.border }}
                      >
                        <Image
                          src={edu.logo}
                          alt={edu.school}
                          width={32}
                          height={32}
                          className="acad-logo-img"
                        />
                      </div>
                      <div
                        className="acad-logo-pulse"
                        style={{ borderColor: c.accent }}
                      />
                    </div>

                    <div className="acad-grade-pill">
                      <div
                        className="acad-grade-value"
                        style={{
                          background: c.statGrad,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {edu.grade}
                      </div>
                      <div className="acad-grade-sub">{edu.sub}</div>
                    </div>
                  </div>

                  {/* School info */}
                  <div className="acad-card-info">
                    <div className="acad-card-school">{edu.school}</div>
                    <div className="acad-card-degree">{edu.degree}</div>
                    <div className="acad-card-period">
                      <span
                        className="acad-period-dot"
                        style={{
                          background: c.dotColor,
                          boxShadow: `0 0 6px ${c.dotGlow}`,
                          animation: 'dotPulse 2s ease-in-out infinite',
                        }}
                      />
                      {edu.period}
                    </div>
                  </div>

                  <div className="acad-divider" />

                  {/* Highlights */}
                  <ul className="acad-highlights">
                    {edu.highlights.map((h, hi) => (
                      <li key={hi} className="acad-highlight">
                        <span
                          className="acad-highlight-dot"
                          style={{
                            background: c.dotColor,
                            boxShadow: isHovered ? `0 0 8px ${c.dotGlow}` : 'none',
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="acad-tags">
                    {edu.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="acad-tag"
                        style={{
                          background: c.tagBg,
                          border: `1px solid ${c.tagBorder}`,
                          color: c.tagColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

