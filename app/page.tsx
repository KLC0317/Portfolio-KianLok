'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Loader from '../components/Loader'
import CustomCursor from '../components/CustomCursor'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Awards from '../components/Awards'
import Academics from '../components/Academics'
import Intro from '../components/Intro'
import Contact from '../components/Contact'


const Scene = dynamic(() => import('../components/three/Scene'), { ssr: false })

type Phase = 'loading' | 'intro' | 'main'

export default function Home() {
const [phase, setPhase] = useState<Phase>('loading')
const [activeSlide, setActiveSlide] = useState(0)

const handleLoaderComplete = useCallback(() => setPhase('intro'), [])
const handleIntroComplete = useCallback(() => setPhase('main'), [])

useEffect(() => {
if (phase !== 'main') return
const container = document.getElementById('slide-container')
if (!container) return

const onScroll = () => {
  const slide = Math.round(container.scrollTop / window.innerHeight)
  setActiveSlide(slide)
}

container.addEventListener('scroll', onScroll, { passive: true })
return () => container.removeEventListener('scroll', onScroll)


}, [phase])

useEffect(() => {
if (phase !== 'main') return
const observer = new IntersectionObserver(
(entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
{ threshold: 0.15 }
)
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
return () => observer.disconnect()
}, [phase])

const slideStyle: React.CSSProperties = {
height: '100vh',
scrollSnapAlign: 'start',
display: 'flex',
alignItems: 'center',
position: 'relative',
}

const slideScrollStyle: React.CSSProperties = {
...slideStyle,
overflowY: 'auto',
}

return (
<>
<div className="noise" aria-hidden="true" />
<CustomCursor />
<Loader onComplete={handleLoaderComplete} />

  {/* 3D canvas — always fixed behind everything */}
  <div className="canvas-container">
    <Scene activeSlide={activeSlide} phase={phase} />
  </div>

  {/* Intro screen */}
  {phase === 'intro' && (
    <Intro onComplete={handleIntroComplete} />
  )}

  {/* Main content */}
  {phase === 'main' && (
    <div
      style={{
        opacity: 1,
        transition: 'opacity 0.8s ease',
        animation: 'fadeIn 0.8s ease',
      }}
    >
      <Nav visible={true} activeSlide={activeSlide} />

      <div
        id="slide-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Slide 0 — Hero */}
        <div style={slideStyle}>
          <Hero visible={true} />
        </div>

        {/* Slide 1 — Projects */}
        <div style={slideScrollStyle}>
          <Projects />
        </div>

        {/* Slide 2 — Experience */}
        <div style={slideScrollStyle}>
          <Experience />
        </div>

        {/* Slide 3 — Awards & Certs */}
        <div style={slideScrollStyle}>
          <Awards />
        </div>

        {/* Slide 4 — Academics */}
        <div
          style={{
            ...slideScrollStyle,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Academics />
        </div>

        {/* Slide 5 — Contact */}
        <div
          style={{
            ...slideScrollStyle,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Contact />
          <footer
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '1.5rem',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.06em',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              marginTop: 'auto',
            }}
          >
            <p style={{ margin: '0 0 0.25rem' }}>
              © {new Date().getFullYear()} Chin Kian Lok. All rights reserved.
            </p>
            <p style={{ margin: 0 }}>Built with Next.js &amp; Three.js</p>
          </footer>
        </div>

      </div>
    </div>
  )}

  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    #slide-container::-webkit-scrollbar { display: none; }
  `}</style>
</>


)
}
