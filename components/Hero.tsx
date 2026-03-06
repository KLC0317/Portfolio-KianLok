"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
  visible: boolean;
}

export default function Hero({ visible }: HeroProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const els = [
      { el: eyebrowRef.current, delay: 200 },
      { el: nameRef.current, delay: 380 },
      { el: roleRef.current, delay: 500 },
      { el: headRef.current, delay: 540 },
      { el: subRef.current, delay: 760 },
      { el: badgesRef.current, delay: 920 },
      { el: ctaRef.current, delay: 1080 },
    ];
    els.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, [visible]);

  const anim: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(36px)",
    transition:
      "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
  };

  const css = `
.hero {
position: relative;
z-index: 10;
display: flex;
flex-direction: column;
justify-content: center;
padding: 0 clamp(2rem, 7vw, 8rem);
min-height: 100vh;
pointer-events: none;
overflow: hidden;
}

/* ── Ambient glow blobs behind content ── */
.hero-glow-1 {
  position: absolute;
  top: 15%;
  left: -8%;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  animation: blobDrift1 8s ease-in-out infinite alternate;
}
.hero-glow-2 {
  position: absolute;
  top: 30%;
  left: 5%;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(103,232,249,0.12) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
  animation: blobDrift2 10s ease-in-out infinite alternate;
}
@keyframes blobDrift1 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px, 40px) scale(1.08); }
}
@keyframes blobDrift2 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(-20px, 30px) scale(1.05); }
}

/* ── Eyebrow ── */
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  margin-bottom: 1.6rem;
  pointer-events: auto;
  position: relative;
}
.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  padding: 0.24rem 0.80rem 0.24rem 0.50rem;
  border-radius: 100px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  animation: eyebrowBlink 3.5s ease-in-out infinite;
}
@keyframes eyebrowBlink {
  0%,100% { opacity: 0.5; border-color: rgba(255,255,255,0.08); }
  50%      { opacity: 0.85; border-color: rgba(255,255,255,0.18); }
}
.eyebrow-pip {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a5f3fc;
  box-shadow: 0 0 6px #a5f3fc, 0 0 14px rgba(165,243,252,0.8);
  animation: pip 2.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pip {
  0%,100% { opacity:1; box-shadow: 0 0 6px #a5f3fc, 0 0 14px rgba(165,243,252,0.8); }
  50%      { opacity:0.4; box-shadow: 0 0 10px #a5f3fc, 0 0 24px rgba(165,243,252,1.0); }
}

/* ── Name ── */
.hero-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  margin-bottom: 0.5rem;
  pointer-events: auto;
  text-shadow: 0 0 40px rgba(255,255,255,0.20);
}

/* ── Role line ── */
.hero-role {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c084fc;
  margin-bottom: 2rem;
  pointer-events: auto;
}
.hero-role-line {
  display: block;
  width: 24px;
  height: 1.5px;
  background: linear-gradient(90deg, #c084fc, rgba(192,132,252,0.2));
  border-radius: 2px;
}

/* ── Headline block ── */
.hero-head {
  margin: 0 0 1.7rem;
  pointer-events: auto;
  position: relative;
}
.ht-main {
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.028em;
  display: flex;
  flex-direction: column;
  gap: 0.03em;
}
.ht-white {
  color: #ffffff;
  text-shadow: 0 0 80px rgba(255,255,255,0.08);
}
.ht-gradient {
  background: linear-gradient(110deg, #f5d0fe 0%, #d946ef 25%, #a855f7 60%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(217,70,239,0.55));
  position: relative;
}
.ht-cyan {
  background: linear-gradient(110deg, #a5f3fc 0%, #67e8f9 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 25px rgba(103,232,249,0.50));
}


/* ── Sub ── */
.hero-sub {
  max-width: 430px;
  font-size: clamp(0.88rem, 1.3vw, 0.97rem);
  line-height: 1.85;
  font-weight: 400;
  color: rgba(255,255,255,0.62);
  margin-bottom: 1.8rem;
  pointer-events: auto;
}

/* ── Badges ── */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 2.4rem;
  pointer-events: auto;
  max-width: 460px;
}
.bdg {
  display: inline-flex;
  align-items: center;
  padding: 0.26rem 0.72rem;
  border-radius: 100px;
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  backdrop-filter: blur(8px);
  transition: transform 0.2s cubic-bezier(0.16,1,0.3,1),
              box-shadow 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;
}
.bdg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent 60%);
  border-radius: inherit;
}
.bdg:hover { transform: translateY(-2px); }

.bdg-purple {
  background: rgba(168,85,247,0.12);
  border: 1px solid rgba(192,132,252,0.45);
  color: #f3e8ff;
  box-shadow: 0 0 12px rgba(168,85,247,0.10),
              inset 0 1px 0 rgba(255,255,255,0.06);
}
.bdg-purple:hover {
  border-color: rgba(192,132,252,0.75);
  box-shadow: 0 0 18px rgba(168,85,247,0.30),
              0 4px 12px rgba(168,85,247,0.15);
}

.bdg-cyan {
  background: rgba(103,232,249,0.08);
  border: 1px solid rgba(165,243,252,0.35);
  color: #e0fffe;
  box-shadow: 0 0 12px rgba(103,232,249,0.08),
              inset 0 1px 0 rgba(255,255,255,0.06);
}
.bdg-cyan:hover {
  border-color: rgba(165,243,252,0.65);
  box-shadow: 0 0 18px rgba(103,232,249,0.25),
              0 4px 12px rgba(103,232,249,0.12);
}

.bdg-pink {
  background: rgba(236,72,153,0.08);
  border: 1px solid rgba(249,168,212,0.35);
  color: #fce7f3;
  box-shadow: 0 0 12px rgba(236,72,153,0.08),
              inset 0 1px 0 rgba(255,255,255,0.06);
}
.bdg-pink:hover {
  border-color: rgba(249,168,212,0.65);
  box-shadow: 0 0 18px rgba(236,72,153,0.22),
              0 4px 12px rgba(236,72,153,0.12);
}

/* ── CTA ── */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: auto;
}

.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.76rem 1.9rem;
  border-radius: 100px;
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffffff;
  background: linear-gradient(135deg, #d946ef 0%, #a855f7 45%, #7c3aed 100%);
  border: 1px solid rgba(233,213,255,0.30);
  box-shadow:
    0 0 0 1px rgba(168,85,247,0.20),
    0 4px 24px rgba(168,85,247,0.55),
    0 0 60px rgba(217,70,239,0.18),
    inset 0 1px 0 rgba(255,255,255,0.20);
  overflow: hidden;
  transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s;
}
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.20), transparent 55%);
  opacity: 0;
  transition: opacity 0.2s;
}
.btn-primary::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(245,208,254,0.4), rgba(168,85,247,0.1), rgba(129,140,248,0.3));
  opacity: 0;
  transition: opacity 0.22s;
  z-index: -1;
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(233,213,255,0.40),
    0 8px 40px rgba(168,85,247,0.70),
    0 0 80px rgba(217,70,239,0.28),
    inset 0 1px 0 rgba(255,255,255,0.25);
}
.btn-primary:hover::before { opacity: 1; }
.btn-primary:hover::after  { opacity: 1; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.76rem 1.6rem;
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: rgba(255,255,255,0.82);
  border: 1px solid rgba(255,255,255,0.16);
  border-radius: 100px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  transition: color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s,
              transform 0.22s cubic-bezier(0.16,1,0.3,1);
}
.btn-ghost:hover {
  color: #ffffff;
  border-color: rgba(255,255,255,0.38);
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 24px rgba(255,255,255,0.06),
              inset 0 1px 0 rgba(255,255,255,0.10);
  transform: translateY(-2px);
}

/* ── Scroll ── */
.scroll-indicator {
  position: absolute;
  bottom: 2.2rem;
  left: clamp(2rem, 7vw, 8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
}
.scroll-line {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, rgba(192,132,252,0.90), transparent);
  animation: spulse 2.6s ease-in-out infinite;
}
@keyframes spulse {
  0%,100% { opacity:0.3; transform:scaleY(1);    }
  50%      { opacity:1.0; transform:scaleY(1.10); }
}
.scroll-label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  writing-mode: vertical-rl;
}
/* ── Mobile Responsive ── */
@media (max-width: 768px) {
  .hero {
    padding: 0 1.5rem;
    justify-content: flex-start;
    padding-top: 6rem;
  }

  .hero-eyebrow {
    font-size: 0.55rem;
    margin-bottom: 1.2rem;
  }

  .eyebrow-pill {
    padding: 0.20rem 0.65rem 0.20rem 0.45rem;
  }

  .hero-name {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }

  .hero-role {
    font-size: 0.65rem;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .hero-role-line {
    width: 18px;
  }

  .ht-main {
    font-size: clamp(2rem, 8vw, 2.8rem);
  }

  .hero-head {
    margin-bottom: 1.2rem;
  }

  .hero-sub {
    font-size: 0.82rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .hero-badges {
    gap: 0.35rem;
    margin-bottom: 1.8rem;
  }

  .bdg {
    font-size: 0.60rem;
    padding: 0.22rem 0.60rem;
  }

  .hero-cta {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .btn-primary,
  .btn-ghost {
    justify-content: center;
    padding: 0.70rem 1.5rem;
    font-size: 0.80rem;
  }

  .scroll-indicator {
    display: none;
  }

  .hero-glow-1,
  .hero-glow-2 {
    display: none;
  }
}
`;

  const purpleBadges = [
    "PyTorch",
    "TensorFlow",
    "RAG Systems",
    "LLM APIs",
    "Computer Vision",
  ];
  const cyanBadges = ["Next.js", "Flutter", "Docker", "n8n"];
  const pinkBadges = ["CGPA 4.00", "Monash University"];

  return (
    <>
      {mounted && <style dangerouslySetInnerHTML={{ __html: css }} />}

      <section className="hero">
        {/* Ambient glow blobs */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        {/* Eyebrow — subtle blinking status */}
        <div ref={eyebrowRef} className="hero-eyebrow" style={anim}>
          <span className="eyebrow-pill">
            <span className="eyebrow-pip" />
            Open to Internship &amp; Full-time Roles
          </span>
        </div>

        {/* Name — now prominent */}
        <p ref={nameRef} className="hero-name" style={anim}>
          Kian Lok Chin · CS @ Monash University Malaysia
        </p>

        {/* Role — accent colored label */}
        <div ref={roleRef} className="hero-role" style={anim}>
          <span className="hero-role-line" />
          AI Engineer &amp; Full-Stack Developer
        </div>

        {/* Headline */}
        <div ref={headRef} className="hero-head" style={anim}>
          <div className="ht-main">
            <span className="ht-white">Building</span>
            <span className="ht-gradient">Intelligent</span>
            <span className="ht-cyan">Systems.</span>
          </div>
        </div>

        {/* Sub */}
        <p ref={subRef} className="hero-sub" style={anim}>
          Crafting production-grade RAG pipelines, computer vision solutions,
          and automation workflows — bridging deep learning research with
          real-world deployment.
        </p>

        {/* Badges */}
        <div ref={badgesRef} className="hero-badges" style={anim}>
          {purpleBadges.map((s) => (
            <span key={s} className="bdg bdg-purple">
              {s}
            </span>
          ))}
          {cyanBadges.map((s) => (
            <span key={s} className="bdg bdg-cyan">
              {s}
            </span>
          ))}
          {pinkBadges.map((s) => (
            <span key={s} className="bdg bdg-pink">
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="hero-cta" style={anim}>
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("slide-container")
                ?.scrollTo({ top: window.innerHeight * 1, behavior: "smooth" });
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("slide-container")
                ?.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" });
            }}
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Scroll */}
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>
    </>
  );
}
