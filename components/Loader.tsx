'use client'

import { useEffect, useRef, useState } from 'react'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const duration = 2200 // ms
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * 100)

      setCount(value)
      if (barRef.current) {
        barRef.current.style.width = `${value}%`
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <div
      className="loader"
      style={{
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all',
        transition: 'opacity 0.6s ease',
      }}
    >
      <div className="loader-number">{String(count).padStart(3, '0')}</div>
      <div className="loader-bar-wrap">
        <div ref={barRef} className="loader-bar" />
      </div>
      <div className="loader-text">Initializing portfolio</div>
    </div>
  )
}
