import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, colorMap } from "../../../lib/projects-data";

/* ── Static params ── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) return {};

  return {
    title: `${proj.title} — Project`,
    description: proj.tagline,
  };
}

/* ── Page ── */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) notFound();

  const c = colorMap[proj.color];
  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .pd-root {
    height: 100vh;
    background: #060612;
    color: #ffffff;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* Animated background orbs */
  .pd-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
    animation: orbFloat 12s ease-in-out infinite;
  }
  .pd-orb-1 {
    width: 500px; height: 500px;
    top: -150px; left: -150px;
    background: radial-gradient(circle, ${c.glow} 0%, transparent 70%);
    animation-delay: 0s;
  }
  .pd-orb-2 {
    width: 400px; height: 400px;
    bottom: -100px; right: -100px;
    background: radial-gradient(circle, ${c.glowStrong} 0%, transparent 70%);
    animation-delay: -4s;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    50%       { transform: translate(30px,-40px) scale(1.08); }
  }

  /* Grid overlay */
  .pd-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
    pointer-events: none;
    z-index: 0;
  }

  .pd-shell {
    height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem clamp(1.5rem, 4vw, 3rem);
    position: relative;
    z-index: 1;
  }

  /* Top Navigation */
  .pd-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .pd-back {
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255,255,255,0.50);
    text-decoration: none;
    padding: 0.4rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .pd-back:hover {
    color: #fff;
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
    transform: translateX(-2px);
  }

  .pd-nav-links {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .pd-btn {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 0.38rem 0.75rem;
    border-radius: 8px;
    border: 1px solid;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }

  .pd-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .pd-btn:hover::before { opacity: 1; }

  .pd-btn-github {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.65);
  }

  .pd-btn-github:hover {
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.22);
    color: #fff;
    transform: translateY(-1px);
  }

  .pd-btn-live {
    background: ${c.glow};
    border-color: ${c.border};
    color: ${c.accent};
  }

  .pd-btn-live:hover {
    background: ${c.activeGlow};
    border-color: ${c.activeBorder};
    color: #fff;
    transform: translateY(-1px);
  }

  .pd-btn-docs {
    background: rgba(168,85,247,0.10);
    border-color: rgba(168,85,247,0.30);
    color: #d8b4fe;
  }

  .pd-btn-docs:hover {
    background: rgba(168,85,247,0.20);
    border-color: rgba(168,85,247,0.50);
    color: #f3e8ff;
    transform: translateY(-1px);
  }

  .pd-btn-pdf {
    background: rgba(236,72,153,0.10);
    border-color: rgba(236,72,153,0.30);
    color: #fbcfe8;
  }

  .pd-btn-pdf:hover {
    background: rgba(236,72,153,0.20);
    border-color: rgba(236,72,153,0.50);
    color: #fce7f3;
    transform: translateY(-1px);
  }

  /* Main Content Grid */
  .pd-content {
    flex: 1;
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 2rem;
    min-height: 0;
  }

  /* Left Column - Image */
  .pd-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .pd-image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.03);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .pd-image-wrap::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(135deg, ${c.accent}, transparent);
    opacity: 0.3;
    z-index: -1;
  }

  .pd-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pd-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    background: linear-gradient(135deg, ${c.glow}, rgba(255,255,255,0.05));
  }

  /* Metrics Grid */
  .pd-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .pd-metric {
    padding: 0.8rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(12px);
    transition: all 0.25s;
  }

  .pd-metric:hover {
    border-color: ${c.border};
    background: rgba(255,255,255,0.06);
    transform: translateY(-2px);
  }

  .pd-metric-icon {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    display: block;
  }

  .pd-metric-value {
    font-size: 1rem;
    font-weight: 800;
    color: ${c.accent};
    margin-bottom: 0.15rem;
    letter-spacing: -0.02em;
  }

  .pd-metric-label {
    font-size: 0.6rem;
    color: rgba(255,255,255,0.40);
    font-weight: 500;
  }

  /* Right Column - Content */
  .pd-right {
    display: flex;
    flex-direction: column;
    min-height: 0;
    gap: 1.2rem;
  }

  /* Hero */
  .pd-hero {
    flex-shrink: 0;
  }

  .pd-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 900;
    margin-bottom: 0.4rem;
    letter-spacing: -0.03em;
    line-height: 1.1;
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pd-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
    flex-wrap: wrap;
  }

  .pd-period {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  .pd-status {
    font-size: 0.6rem;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    background: rgba(34,197,94,0.15);
    border: 1px solid rgba(34,197,94,0.30);
    color: #86efac;
    font-weight: 600;
  }

  .pd-tagline {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.60);
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }

  .pd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .bdg {
    font-size: 0.58rem;
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    border: 1px solid ${c.border};
    background: ${c.glow};
    color: ${c.accent};
    transition: all 0.2s;
  }

  .bdg:hover {
    transform: translateY(-1px);
  }

  /* Scrollable Sections */
  .pd-sections {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    min-height: 0;
  }

  .pd-sections::-webkit-scrollbar {
    width: 4px;
  }

  .pd-sections::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.03);
    border-radius: 2px;
  }

  .pd-sections::-webkit-scrollbar-thumb {
    background: ${c.accent};
    border-radius: 2px;
  }

  .pd-section {
    margin-bottom: 1.5rem;
    padding: 1.2rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(8px);
    transition: all 0.25s;
  }

  .pd-section:hover {
    border-color: rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
  }

  .pd-section h3 {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    color: ${c.accent};
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pd-section h3::before {
    content: '';
    width: 3px;
    height: 16px;
    background: linear-gradient(180deg, ${c.accent}, transparent);
    border-radius: 2px;
  }

  .pd-section p {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
  }

  /* Footer Navigation */
  .pd-footer {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.08);
    align-items: center;
  }

  .pd-footer-link {
    text-decoration: none;
    color: rgba(255,255,255,0.50);
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(12px);
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .pd-footer-link:hover {
    color: ${c.accent};
    border-color: ${c.border};
    background: ${c.glow};
    transform: translateY(-2px);
  }

  .pd-footer-link.prev { justify-content: flex-start; }
  .pd-footer-link.next { justify-content: flex-end; }

  .pd-footer-arrow {
    font-size: 0.9rem;
    flex-shrink: 0;
    transition: transform 0.25s;
  }

  .pd-footer-link.prev:hover .pd-footer-arrow { transform: translateX(-2px); }
  .pd-footer-link.next:hover .pd-footer-arrow { transform: translateX(2px); }


  /* ── Mobile Responsive ── */
  @media (max-width: 1024px) {
    .pd-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .pd-left {
      max-width: 500px;
      margin: 0 auto;
      width: 100%;
    }
    
    .pd-sections {
      max-height: 400px;
    }
  }

  @media (max-width: 768px) {
    .pd-root {
      height: auto;
      min-height: 100vh;
    }

    .pd-shell {
      height: auto;
      min-height: 100vh;
      padding: 0.8rem;
    }

    .pd-orb-1,
    .pd-orb-2 {
      opacity: 0.25;
    }

    .pd-orb-1 {
      width: 280px;
      height: 280px;
    }

    .pd-orb-2 {
      width: 220px;
      height: 220px;
    }

    .pd-grid {
      background-size: 30px 30px;
    }

    .pd-nav {
      margin-bottom: 0.6rem;
      gap: 0.5rem;
    }

    .pd-back {
      font-size: 0.58rem;
      padding: 0.32rem 0.7rem;
    }

    .pd-nav-links {
      width: 100%;
      justify-content: flex-start;
    }

    .pd-btn {
      font-size: 0.56rem;
      padding: 0.32rem 0.6rem;
      flex: 1;
    }

    .pd-content {
      gap: 0.8rem;
    }

    .pd-left {
      max-width: 100%;
      gap: 0.6rem;
    }

    .pd-image-wrap {
      border-radius: 10px;
      aspect-ratio: 16/9;
    }

    .pd-image-placeholder {
      font-size: 2.5rem;
    }

    .pd-metrics {
      grid-template-columns: 1fr 1fr;
      gap: 0.4rem;
    }

    .pd-metric {
      padding: 0.5rem;
    }

    .pd-metric-icon {
      font-size: 0.85rem;
      margin-bottom: 0.2rem;
    }

    .pd-metric-value {
      font-size: 0.8rem;
    }

    .pd-metric-label {
      font-size: 0.52rem;
    }

    .pd-right {
      gap: 0.7rem;
    }

    .pd-title {
      font-size: clamp(1.2rem, 5vw, 1.6rem);
      margin-bottom: 0.25rem;
    }

    .pd-meta {
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }

    .pd-period {
      font-size: 0.56rem;
    }

    .pd-status {
      font-size: 0.52rem;
      padding: 0.16rem 0.4rem;
    }

    .pd-tagline {
      font-size: 0.72rem;
      margin-bottom: 0.5rem;
      line-height: 1.45;
    }

    .pd-tags {
      gap: 0.22rem;
    }

    .bdg {
      font-size: 0.52rem;
      padding: 0.16rem 0.4rem;
    }

    .pd-sections {
      max-height: none;
      overflow-y: visible;
      padding-right: 0;
    }

    .pd-section {
      margin-bottom: 0.6rem;
      padding: 0.7rem;
      border-radius: 8px;
    }

    .pd-section:last-child {
      margin-bottom: 0;
    }

    .pd-section h3 {
      font-size: 0.75rem;
      margin-bottom: 0.35rem;
    }

    .pd-section h3::before {
      width: 2px;
      height: 12px;
    }

    .pd-section p {
      font-size: 0.68rem;
      line-height: 1.5;
    }

    .pd-footer {
      flex-direction: column;
      gap: 0.5rem;
      padding-top: 0.6rem;
      margin-top: 0.4rem;
    }

    .pd-footer-link {
      width: 100%;
      justify-content: center;
      font-size: 0.62rem;
      padding: 0.5rem 0.8rem;
    }

    .pd-footer-link.prev,
    .pd-footer-link.next {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .pd-shell {
      padding: 0.7rem;
    }

    .pd-nav {
      margin-bottom: 0.5rem;
    }

    .pd-back {
      font-size: 0.56rem;
      padding: 0.3rem 0.65rem;
    }

    .pd-btn {
      font-size: 0.54rem;
      padding: 0.3rem 0.55rem;
    }

    .pd-content {
      gap: 0.7rem;
    }

    .pd-left {
      gap: 0.5rem;
    }

    .pd-image-wrap {
      border-radius: 8px;
    }

    .pd-metrics {
      gap: 0.35rem;
    }

    .pd-metric {
      padding: 0.45rem;
    }

    .pd-metric-icon {
      font-size: 0.8rem;
    }

    .pd-metric-value {
      font-size: 0.75rem;
    }

    .pd-metric-label {
      font-size: 0.50rem;
    }

    .pd-right {
      gap: 0.6rem;
    }

    .pd-title {
      font-size: clamp(1.1rem, 6vw, 1.4rem);
    }

    .pd-meta {
      gap: 0.45rem;
    }

    .pd-period {
      font-size: 0.54rem;
    }

    .pd-status {
      font-size: 0.50rem;
    }

    .pd-tagline {
      font-size: 0.70rem;
    }

    .bdg {
      font-size: 0.50rem;
      padding: 0.15rem 0.38rem;
    }

    .pd-section {
      padding: 0.6rem;
      margin-bottom: 0.5rem;
    }

    .pd-section h3 {
      font-size: 0.72rem;
    }

    .pd-section p {
      font-size: 0.66rem;
    }

    .pd-footer-link {
      font-size: 0.60rem;
      padding: 0.45rem 0.75rem;
    }
  }

  @media (max-width: 380px) {
    .pd-shell {
      padding: 0.6rem;
    }

    .pd-title {
      font-size: 1.05rem;
    }

    .pd-tagline {
      font-size: 0.68rem;
    }

    .pd-section {
      padding: 0.55rem;
    }

    .pd-section h3 {
      font-size: 0.70rem;
    }

    .pd-section p {
      font-size: 0.64rem;
    }
  }
`;

  // Helper to get button config
  const getButtons = () => {
    const buttons = [];

    if (proj.github) {
      buttons.push({
        href: proj.github,
        label: "GitHub",
        className: "pd-btn-github",
      });
    }

    if (proj.slug === "zestix-ai" && proj.live) {
      buttons.push({
        href: proj.live,
        label: "Live Demo",
        className: "pd-btn-live",
      });
    } else if (
      (proj.slug === "brand-intelligence" || proj.slug === "safe-vision") &&
      proj.documentation
    ) {
      buttons.push({
        href: proj.documentation,
        label: "Documentation",
        className: "pd-btn-docs",
      });
    } else if (proj.slug === "peleesenet" && proj.pdf) {
      buttons.push({
        href: proj.pdf,
        label: "Research Paper",
        className: "pd-btn-pdf",
      });
    } else if (proj.live) {
      buttons.push({
        href: proj.live,
        label: "Live Demo",
        className: "pd-btn-live",
      });
    }

    return buttons;
  };

  const buttons = getButtons();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="pd-root">
        {/* Animated background */}
        <div className="pd-orb pd-orb-1" />
        <div className="pd-orb pd-orb-2" />
        <div className="pd-grid" />

        <div className="pd-shell">
          {/* Top Nav */}
          <div className="pd-nav">
            <Link href="/" className="pd-back">
              <span>←</span> Back to Home
            </Link>

            <div className="pd-nav-links">
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pd-btn ${btn.className}`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="pd-content">
            {/* Left Column - Image & Metrics */}
            <div className="pd-left">
              <div className="pd-image-wrap">
                {proj.image ? (
                  <img src={proj.image} alt={proj.title} className="pd-image" />
                ) : (
                  <div className="pd-image-placeholder">{proj.icon}</div>
                )}
              </div>

              {proj.metrics && proj.metrics.length > 0 && (
                <div className="pd-metrics">
                  {proj.metrics.map((metric) => (
                    <div key={metric.label} className="pd-metric">
                      {metric.icon && (
                        <span className="pd-metric-icon">{metric.icon}</span>
                      )}
                      <div className="pd-metric-value">{metric.value}</div>
                      <div className="pd-metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className="pd-right">
              {/* Hero */}
              <div className="pd-hero">
                <div className="pd-title">{proj.title}</div>
                <div className="pd-meta">
                  <div className="pd-period">{proj.period}</div>
                  {proj.status && (
                    <div className="pd-status">
                      {proj.status === "completed"
                        ? "✓ Completed"
                        : proj.status === "in-progress"
                          ? "⟳ In Progress"
                          : "📦 Archived"}
                    </div>
                  )}
                </div>
                <div className="pd-tagline">{proj.overview}</div>

                <div className="pd-tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="bdg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scrollable Sections */}
              <div className="pd-sections">
                {proj.sections.map((section) => (
                  <div key={section.heading} className="pd-section">
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </div>
                ))}
              </div>

              {/* Footer Navigation */}
              <div className="pd-footer">
                {prev ? (
                  <Link
                    href={`/projects/${prev.slug}`}
                    className="pd-footer-link prev"
                  >
                    <span className="pd-footer-arrow">←</span>
                    <span>{prev.title}</span>
                  </Link>
                ) : (
                  <span />
                )}

                {next ? (
                  <Link
                    href={`/projects/${next.slug}`}
                    className="pd-footer-link next"
                  >
                    <span>{next.title}</span>
                    <span className="pd-footer-arrow">→</span>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
