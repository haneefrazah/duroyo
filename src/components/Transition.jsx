import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { registerTransition } from '../lib/transition'

/**
 * The curtain that covers section-to-section navigation.
 *
 * It sits parked off the bottom of the screen and only travels when something
 * calls `playTransition`. A brass hairline rides its leading edge so the wipe
 * reads as a deliberate edge rather than a slab of colour.
 */
export default function Transition() {
  const panel = useRef(null)
  const edge = useRef(null)
  const busy = useRef(false)

  useEffect(() => {
    return registerTransition((fn) => {
      // A second click mid-wipe should not stack tweens.
      if (busy.current) {
        fn()
        return
      }
      busy.current = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fn()
        busy.current = false
        return
      }

      gsap
        .timeline({
          onComplete: () => {
            busy.current = false
            gsap.set(panel.current, { yPercent: 100 })
            gsap.set(edge.current, { scaleX: 0 })
          },
        })
        .set(panel.current, { yPercent: 100 })
        .to(panel.current, { yPercent: 0, duration: 0.5, ease: 'expo.inOut' })
        .fromTo(
          edge.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.42, ease: 'expo.out' },
          0.1,
        )
        .add(() => fn())
        .to(panel.current, { yPercent: -100, duration: 0.62, ease: 'expo.inOut' }, '+=0.05')
    })
  }, [])

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[110] translate-y-full bg-ink"
    >
      <span
        ref={edge}
        className="absolute inset-x-0 bottom-0 block h-px origin-left scale-x-0 bg-brass"
      />
    </div>
  )
}
