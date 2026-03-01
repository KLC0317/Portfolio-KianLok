'use client'

const projects = [
  {
    num: '01',
    title: 'Nebula Dashboard',
    tags: ['React', 'Three.js', 'WebGL', 'Data Viz'],
    href: '#',
  },
  {
    num: '02',
    title: 'Morphic E-Commerce',
    tags: ['Next.js', 'Framer Motion', 'Stripe', 'Prisma'],
    href: '#',
  },
  {
    num: '03',
    title: 'Soundwave Studio',
    tags: ['Web Audio API', 'Canvas', 'React', 'TypeScript'],
    href: '#',
  },
  {
    num: '04',
    title: 'Atlas CMS Platform',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
    href: '#',
  },
]

export default function Work() {
  return (
    <section id="work">
      <div className="section-label">Work</div>
      <h2 className="section-title reveal">Selected Projects</h2>

      <div className="work-list">
        {projects.map((project) => (
          <a key={project.num} href={project.href} className="work-item reveal">
            <span className="work-num">{project.num}</span>
            <div className="work-info">
              <div className="work-title">{project.title}</div>
              <div className="work-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <span className="work-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
