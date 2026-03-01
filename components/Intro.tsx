'use client'

import { useEffect, useState, useCallback } from 'react'

interface IntroProps {
  onComplete: () => void
}

const FULL_TEXT = 'Hello There! I am Chin Kian Lok'
const TYPE_SPEED = 65      // ms per character
const PAUSE_AFTER = 1800   // ms to pause after typing finishes
const FADE_OUT = 600       // ms fade out duration

export default function Intro({ onComplete }: IntroProps) {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Typing effect
  useEffect(() => {
    let i = 0
    const type = () => {
      if (i < FULL_TEXT.length) {
        i++
        setDisplayed(FULL_TEXT.slice(0, i))
        setTimeout(type, TYPE_SPEED)
      } else {
        // Done typing — pause then fade out
        setTimeout(() => {
          setFadingOut(true)
          setTimeout(onComplete, FADE_OUT)
        }, PAUSE_AFTER)
      }
    }
    const startDelay = setTimeout(type, 400)
    return () => clearTimeout(startDelay)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_OUT}ms ease`,
        pointerEvents: fadingOut ? 'none' : 'all',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          animation: 'introFadeIn 0.6s ease forwards',
        }}
      >
        {/* Greeting line */}
        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(199, 158, 250, 0.7)',
            marginBottom: '1rem',
            opacity: displayed.length > 0 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          Welcome
        </p>

        {/* Typed text */}
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: '#ffffff',
            margin: 0,
            minHeight: '1.2em',
            lineHeight: 1.2,
          }}
        >
          {displayed.split('').map((char, i) => {
            // Style "Hello There!" differently from the name
            const nameStartIndex = FULL_TEXT.indexOf('Chin')
            const isName = i >= nameStartIndex

            return (
              <span
                key={i}
                style={{
                  color: isName ? '#c79efa' : '#ffffff',
                  fontWeight: isName ? 500 : 300,
                  transition: 'color 0.1s',
                }}
              >
                {char}
              </span>
            )
          })}

          {/* Blinking cursor */}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#c79efa',
              marginLeft: '4px',
              verticalAlign: 'middle',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.1s',
              borderRadius: '1px',
            }}
          />
        </h1>

        {/* Subtle "press any key" hint */}
        <p
          style={{
            marginTop: '2.5rem',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            opacity: displayed === FULL_TEXT ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
            animation: displayed === FULL_TEXT ? 'pulseHint 2s ease infinite' : 'none',
          }}
        >
          scroll to continue
        </p>
      </div>

      <style>{`
        @keyframes introFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseHint {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
