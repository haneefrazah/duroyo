import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * A brass ring that trails the pointer and reacts to anything carrying a
 * `data-cursor` attribute.
 *
 *   data-cursor            → ring opens, no label
 *   data-cursor="View"     → ring opens and shows a label
 *
 * The native cursor is hidden only while this is actually running, and only
 * for fine pointers — touch and reduced-motion users never see it at all, so
 * they are never left without a cursor of their own.
 *
 * Scale is owned by exactly one tween: `active` and `pressed` are combined
 * into a single target, so the hover and press tweens can never fight.
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [text, setText] = useState('')
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Decide once, after mount, so the first paint never flashes a stray ring.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    document.body.style.cursor = 'none'

    // The dot tracks tightly; the ring lags behind it. The gap between the two
    // durations is what produces the trailing feel.
    const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power2.out' })
    const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power2.out' })
    const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.55, ease: 'power3.out' })

    let visible = false
    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e) => {
      const hit = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (hit) {
        setActive(true)
        setText(hit.dataset.cursor || '')
      } else {
        setActive(false)
        setText('')
      }
    }

    const onLeave = () => {
      visible = false
      setActive(false)
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.2 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  useEffect(() => {
    const ringEl = ring.current
    if (!ringEl || !enabled) return
    gsap.to(ringEl, {
      scale: (active ? 2.1 : 1) * (pressed ? 0.82 : 1),
      duration: pressed ? 0.18 : 0.45,
      ease: 'power3.out',
    })
  }, [active, pressed, enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden lg:block"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      <span
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-brass opacity-0"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
      <span
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-brass/70 opacity-0 will-change-transform"
        style={{ width: 38, height: 38, marginLeft: -19, marginTop: -19 }}
      >
        <span
          className={`label-sm text-[8px] leading-none tracking-[0.2em] text-brass transition-opacity duration-300 ${
            text ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {text}
        </span>
      </span>
    </div>
  )
}
