'use client'

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-wrap {
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

        /* ambient orbs */
        .contact-orb-1 {
          position: absolute;
          top: -100px; left: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .contact-orb-2 {
          position: absolute;
          bottom: -80px; right: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(103,232,249,0.08) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .contact-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
        }

        /* label */
        .contact-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c084fc;
          margin-bottom: 1rem;
        }
        .contact-label-line {
          display: block;
          width: 20px;
          height: 1px;
          background: linear-gradient(90deg, #c084fc, transparent);
        }

        /* headline */
        .contact-headline {
          font-size: clamp(2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.15;
          max-width: 640px;
          margin: 0 0 0.6rem;
        }
        .contact-headline span {
          background: linear-gradient(110deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-sub {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.35);
          margin: 0 0 3rem;
          letter-spacing: 0.01em;
          line-height: 1.7;
          max-width: 480px;
        }

        /* cards grid */
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          max-width: 640px;
        }

        @media (max-width: 520px) {
          .contact-cards { grid-template-columns: 1fr; }
        }

        .contact-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem 1.4rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,18,0.60);
          backdrop-filter: blur(16px);
          text-decoration: none;
          overflow: hidden;
          transition: border-color 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
          cursor: pointer;
        }
        .contact-card:hover {
          transform: translateY(-3px);
        }

        /* per-card color themes */
        .contact-card-github:hover {
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 8px 32px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.10);
        }
        .contact-card-linkedin:hover {
          border-color: rgba(10,102,194,0.55);
          box-shadow: 0 8px 32px rgba(10,102,194,0.18), 0 0 0 1px rgba(10,102,194,0.20);
        }
        .contact-card-email:hover {
          border-color: rgba(192,132,252,0.55);
          box-shadow: 0 8px 32px rgba(168,85,247,0.18), 0 0 0 1px rgba(192,132,252,0.20);
        }
        .contact-card-phone:hover {
          border-color: rgba(103,232,249,0.50);
          box-shadow: 0 8px 32px rgba(103,232,249,0.14), 0 0 0 1px rgba(103,232,249,0.18);
        }

        /* spotlight on hover */
        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .contact-card-github::before  { background: radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.05), transparent 65%); }
        .contact-card-linkedin::before { background: radial-gradient(ellipse at 0% 0%, rgba(10,102,194,0.08), transparent 65%); }
        .contact-card-email::before    { background: radial-gradient(ellipse at 0% 0%, rgba(168,85,247,0.08), transparent 65%); }
        .contact-card-phone::before    { background: radial-gradient(ellipse at 0% 0%, rgba(103,232,249,0.07), transparent 65%); }
        .contact-card:hover::before { opacity: 1; }

        /* icon box */
        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.05rem;
        }
        .contact-icon-github   { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10); }
        .contact-icon-linkedin { background: rgba(10,102,194,0.14);  border: 1px solid rgba(10,102,194,0.25); }
        .contact-icon-email    { background: rgba(168,85,247,0.12);  border: 1px solid rgba(192,132,252,0.22); }
        .contact-icon-phone    { background: rgba(103,232,249,0.10); border: 1px solid rgba(103,232,249,0.20); }

        .contact-card-text { display: flex; flex-direction: column; gap: 0.12rem; min-width: 0; }

        .contact-card-platform {
          font-size: 0.60rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.30);
        }
        .contact-card-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.01em;
        }

        /* arrow */
        .contact-card-arrow {
          margin-left: auto;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.18);
          flex-shrink: 0;
          transition: color 0.2s, transform 0.2s;
        }
        .contact-card:hover .contact-card-arrow {
          color: rgba(255,255,255,0.55);
          transform: translate(2px, -2px);
        }

        /* bottom line */
        .contact-footer-note {
          margin-top: 2.8rem;
          font-size: 0.70rem;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .contact-footer-note::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          color: rgba(255,255,255,0.65);
        }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section id="contact" className="contact-wrap">
        <div className="contact-orb-1" />
        <div className="contact-orb-2" />

        <div className="contact-inner">
          {/* Label */}
          <div className="contact-label">
            <span className="contact-label-line" />
            Get In Touch
          </div>

          {/* Headline */}
          <h2 className="contact-headline">
            Let&apos;s build something <span>remarkable</span> together.
          </h2>

          <p className="contact-sub">
            Open to internship and full-time opportunities. Feel free to reach out
            via any platform below — I&apos;ll get back to you promptly.
          </p>

          {/* Cards */}
          <div className="contact-cards">

            {/* GitHub */}
            <a
              href="https://github.com/KLC0317"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card-github"
            >
              <div className="contact-icon contact-icon-github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#ffffff'}}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <span className="contact-card-platform">GitHub</span>
                <span className="contact-card-value">@KLC0317</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kian-lok-chin-64b29b319/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card-linkedin"
            >
              <div className="contact-icon contact-icon-linkedin">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{color:'#60a5fa'}}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <span className="contact-card-platform">LinkedIn</span>
                <span className="contact-card-value">Kian Lok Chin</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

            {/* Email */}
            <a
              href="mailto:kianlokchin0317@gmail.com"
              className="contact-card contact-card-email"
            >
              <div className="contact-icon contact-icon-email">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <span className="contact-card-platform">Email</span>
                <span className="contact-card-value">kianlokchin0317@gmail.com</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+60120924898"
              className="contact-card contact-card-phone"
            >
              <div className="contact-icon contact-icon-phone">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-card-text">
                <span className="contact-card-platform">Phone</span>
                <span className="contact-card-value">+60 12-092 4898</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

          </div>

          <p className="contact-footer-note">
            Based in Malaysia · Available for remote &amp; on-site roles
          </p>
        </div>
      </section>
    </>
  )
}
