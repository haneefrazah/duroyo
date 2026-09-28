import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { markBooted } from '../lib/boot'
import { brand } from '../data/images'
import { hotel } from '../data/site'

const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Opening curtain.
 *
 * The count eases up to the high eighties, then completes when the document
 * has actually loaded — so the number is honest about most of its journey
 * without ever stalling the page if a font or image drags. A hard cap keeps
 * it from hanging, and a reduced-motion visitor gets no animation at all.
 */
export default function Loader() {
  const root = useRef(null)
  const num = useRef(null)
  const bar = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const state = { p: 0 }
    let finished = false
    let tween = null

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const paint = () => {
      const rounded = Math.round(state.p)
      if (num.current) num.current.textContent = String(rounded).padStart(3, '0')
      if (bar.current) {
        bar.current.style.transform = `scaleX(${Math.max(0.015, state.p / 100)})`
      }
    }

    const exit = () => {
      if (finished) return
      finished = true
      // A tween is an object, not a function — this has to be a method call.
      tween?.kill()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''

      if (REDUCED() || !root.current) {
        setGone(true)
        markBooted()
        return
      }

      gsap
        .timeline({ delay: 0.15, onComplete: () => { setGone(true); markBooted() } })
        .to(state, { p: 100, duration: 0.55, ease: 'power3.inOut', onUpdate: paint }, 0)
        .to('[data-loader-mark]', { opacity: 0, y: -14, duration: 0.5, ease: 'power2.in' }, 0)
        .to(root.current, { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, 0.32)
    }

    if (REDUCED()) {
      // Nothing to animate — reveal immediately.
      setGone(true)
      markBooted()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      return () => {}
    }

    tween = gsap.to(state, { p: 86, duration: 1.55, ease: 'power2.out', onUpdate: paint })

    if (document.readyState === 'complete') {
      setTimeout(exit, 650)
    } else {
      window.addEventListener('load', () => setTimeout(exit, 300), { once: true })
    }

    // Never let a slow asset hold the page hostage.
    const cap = setTimeout(exit, 6000)

    return () => {
      tween?.kill()
      clearTimeout(cap)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div
      ref={root}
      data-loader=""
      className="fixed inset-0 z-[120] flex flex-col justify-between bg-ink px-6 py-8 text-bone md:px-10 md:py-10"
    >
      <div className="flex items-start justify-between">
        <span className="label-sm text-bone/40">{hotel.nameLong}</span>
        <span className="label-sm text-bone/40">Gilgit</span>
      </div>

      <div data-loader-mark className="flex flex-col items-center gap-7">
        <img src={brand.monogram.cream} alt="" aria-hidden="true" className="h-12 w-auto md:h-14" />
        <span className="label-sm text-bone/45">Jutial · Gilgit · Gilgit-Baltistan</span>
      </div>

      <div className="flex items-end gap-6 md:gap-10">
        <span className="relative block h-px flex-1 bg-bone/12">
          <span
            ref={bar}
            className="absolute inset-0 block h-px origin-left bg-brass"
            style={{ transform: 'scaleX(0.015)' }}
          />
        </span>
        <span className="font-display text-4xl font-light leading-none tabular-nums text-bone md:text-6xl">
          <span ref={num}>000</span>
        </span>
      </div>
    </div>
  )
}
