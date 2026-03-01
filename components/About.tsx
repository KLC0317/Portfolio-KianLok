'use client'

const skills = [
  { name: 'React / Next.js', level: 'Expert' },
  { name: 'Three.js / WebGL', level: 'Advanced' },
  { name: 'TypeScript', level: 'Expert' },
  { name: 'Node.js', level: 'Advanced' },
  { name: 'GSAP / Motion', level: 'Advanced' },
  { name: 'Figma / Design', level: 'Proficient' },
  { name: 'Python / ML', level: 'Intermediate' },
  { name: 'AWS / DevOps', level: 'Proficient' },
]

export default function About() {
  return (
    <section id="about">
      <div className="section-label">About</div>
      <h2 className="section-title reveal">Who I Am</h2>

      <div className="about-grid">
        <div className="about-bio reveal">
          <p>
            I&apos;m a full-stack creative developer with a passion for building experiences
            that blur the line between design and engineering. With 5+ years of experience,
            I specialize in interactive web applications and 3D experiences.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me exploring generative art, contributing
            to open source, or photographing urban architecture.
          </p>
          <p style={{ marginTop: '2rem' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Based in San Francisco, CA
            </span>
          </p>
        </div>

        <div className="reveal">
          <div style={{
            marginBottom: '1.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            Skills &amp; Stack
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">{skill.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
