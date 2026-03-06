"use client";

import { useEffect, useRef } from "react";

interface NavProps {
  visible: boolean;
  activeSlide?: number;
}

const slides = [
  "Home",
  "Projects",
  "Experience",
  "Awards & Certs",
  "Academics",
  "Contact"
];

export default function Nav({ visible, activeSlide = 0 }: NavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    navRef.current.style.opacity = visible ? "1" : "0";
    navRef.current.style.transform = visible
      ? "translateY(0)"
      : "translateY(-20px)";
  }, [visible]);

  const goToSlide = (i: number) => {
    const container = document.getElementById("slide-container");
    container?.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
  };

  const css = `
nav {
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 200;
display: flex;
align-items: center;
justify-content: space-between;
padding: 1.4rem clamp(2rem, 7vw, 8rem);
pointer-events: auto;
}

/* Frosted bar */
nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(4, 2, 18, 0.72) 0%,
    rgba(4, 2, 18, 0.0)  100%
  );
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  pointer-events: none;
}

/* Logo */
.nav-logo {
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  pointer-events: auto;
  transition: opacity 0.2s;
}
.nav-logo:hover { opacity: 0.80; }
.nav-logo-mark {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d946ef 0%, #a855f7 55%, #818cf8 100%);
  box-shadow: 0 0 16px rgba(168,85,247,0.55), 0 0 32px rgba(217,70,239,0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

/* Nav links */
.nav-links {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  /* Glass pill container */
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 100px;
  padding: 0.28rem 0.35rem;
  backdrop-filter: blur(16px);
  box-shadow: 0 0 0 1px rgba(168,85,247,0.08),
              inset 0 1px 0 rgba(255,255,255,0.06);
}

.nav-links li { display: flex; }

.nav-links button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.55);
  padding: 0.38rem 1rem;
  border-radius: 100px;
  transition: color 0.2s, background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
  position: relative;
}
.nav-links button:hover {
  color: rgba(255,255,255,0.90);
  background: rgba(255,255,255,0.06);
}
.nav-links button.active {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(217,70,239,0.22) 0%, rgba(168,85,247,0.22) 50%, rgba(129,140,248,0.18) 100%);
  box-shadow: 0 0 14px rgba(168,85,247,0.18),
              inset 0 1px 0 rgba(255,255,255,0.10);
}

/* Resume CTA */
.nav-resume {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.46rem 1.1rem;
  border-radius: 100px;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffffff;
  background: linear-gradient(135deg, #d946ef 0%, #a855f7 55%, #7c3aed 100%);
  border: 1px solid rgba(233,213,255,0.25);
  box-shadow: 0 0 16px rgba(168,85,247,0.45),
              0 0 40px rgba(217,70,239,0.12),
              inset 0 1px 0 rgba(255,255,255,0.16);
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
  pointer-events: auto;
}
.nav-resume::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.16), transparent 55%);
  opacity: 0;
  transition: opacity 0.2s;
}
.nav-resume:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 0 24px rgba(168,85,247,0.60),
              0 0 55px rgba(217,70,239,0.20),
              inset 0 1px 0 rgba(255,255,255,0.20);
}
.nav-resume:hover::before { opacity: 1; }

/* ── Right-side dot nav ── */
.dot-nav {
  position: fixed;
  right: 1.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.7rem;
}

.dot-nav-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  pointer-events: auto;
}

/* Tooltip label */
.dot-label {
  font-size: 0.60rem;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.0);
  white-space: nowrap;
  transition: color 0.25s, transform 0.25s cubic-bezier(0.16,1,0.3,1);
  transform: translateX(6px);
  pointer-events: none;
}
.dot-nav-item:hover .dot-label,
.dot-nav-item.active-dot .dot-label {
  color: rgba(255,255,255,0.70);
  transform: translateX(0);
}
.dot-nav-item.active-dot .dot-label {
  color: #f3e8ff;
}

/* The dot itself */
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  flex-shrink: 0;
}
.dot-nav-item:hover .dot {
  background: rgba(255,255,255,0.55);
  border-color: rgba(255,255,255,0.40);
  box-shadow: 0 0 8px rgba(255,255,255,0.25);
}
.dot-nav-item.active-dot .dot {
  width: 9px;
  height: 9px;
  background: linear-gradient(135deg, #e879f9, #a855f7);
  border-color: rgba(233,213,255,0.50);
  box-shadow: 0 0 10px rgba(168,85,247,0.70),
              0 0 20px rgba(217,70,239,0.35);
}

/* ── Mobile Responsive ── */
@media (max-width: 768px) {
  nav {
    padding: 1rem 1.5rem;
  }

  .nav-logo {
    font-size: 0.85rem;
    gap: 0.4rem;
  }

  .nav-logo-mark {
    width: 24px;
    height: 24px;
    font-size: 0.65rem;
  }

  .nav-links {
    display: none;
  }

  .nav-resume {
    font-size: 0.70rem;
    padding: 0.40rem 0.95rem;
  }

  /* Mobile dot nav - move to bottom */
  .dot-nav {
    right: auto;
    left: 50%;
    top: auto;
    bottom: 1.5rem;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 0.5rem;
  }

  .dot-label {
    display: none;
  }

  .dot {
    width: 6px;
    height: 6px;
  }

  .dot-nav-item.active-dot .dot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  nav {
    padding: 0.85rem 1rem;
  }

  .nav-logo {
    font-size: 0.75rem;
  }

  .nav-logo-mark {
    width: 22px;
    height: 22px;
    font-size: 0.60rem;
  }

  .nav-resume {
    font-size: 0.65rem;
    padding: 0.35rem 0.80rem;
  }
}
`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav
        ref={navRef}
        style={{
          opacity: 0,
          transform: "translateY(-20px)",
          transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
        }}
      >
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={() => goToSlide(0)}>
          <span className="nav-logo-mark">KL</span>
          Kian Lok
        </a>

        {/* Centre pill nav */}
        <ul className="nav-links">
          {["Projects", "Experience", "Awards & Certs", "Academics", "Contacts"].map(
            (label, i) => (
              <li key={label}>
                <button
                  className={activeSlide === i + 1 ? "active" : ""}
                  onClick={() => goToSlide(i + 1)}
                >
                  {label}
                </button>
              </li>
            ),
          )}
        </ul>

        {/* Resume CTA */}
        <a
          href="/KianLok.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume"
        >
          ↓ Resume
        </a>
      </nav>

      {/* Right dot nav */}
      {visible && (
        <div className="dot-nav">
          {slides.map((label, i) => (
            <button
              key={i}
              className={`dot-nav-item${activeSlide === i ? " active-dot" : ""}`}
              onClick={() => goToSlide(i)}
              title={label}
            >
              <span className="dot-label">{label}</span>
              <span className="dot" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
