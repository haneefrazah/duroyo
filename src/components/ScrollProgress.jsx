import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A single brass hairline pinned to the top of the viewport, filling as the
 * page is read. Sits behind the nav so it never competes with the wordmark.
 */
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const el = bar.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px">
      <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-brass/80" />
    </div>
  )
}
