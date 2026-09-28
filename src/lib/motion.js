import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Smooth scroll (Lenis) driven off the GSAP ticker so that           */
/*  ScrollTrigger and the smooth scroller never drift out of sync.     */
/*                                                                    */
/*  Lenis 1.3 leaves `autoRaf` off and expects `raf(time)` in          */
/*  MILLISECONDS, while the GSAP ticker reports SECONDS. Passing the   */
/*  ticker value straight through advances Lenis by a thousandth of   */
/*  what it should, and every programmatic scroll crawls. The wrapper  */
/*  below converts units, and is held in a variable so cleanup can     */
/*  deregister the exact same reference.                                */
/* ------------------------------------------------------------------ */

let lenis = null
let lenisTick = null

export function getLenis() {
  return lenis
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      ScrollTrigger.refresh()
      return
    }

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    lenisTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisTick)
    gsap.ticker.lagSmoothing(0)

    // Fonts and images change layout height; recalculate once things settle.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      if (lenisTick) gsap.ticker.remove(lenisTick)
      lenisTick = null
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenis = null
      window.removeEventListener('load', refresh)
    }
  }, [])
}

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -8 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion preference, reactive                                */
/* ------------------------------------------------------------------ */
export function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/* ------------------------------------------------------------------ */
/*  Generic ScrollTrigger reveal                                       */
/* ------------------------------------------------------------------ */
/**
 * Runs `build(trigger)` once the element enters the viewport.
 * `build` receives the element and returns a cleanup / tween context.
 */
export function useReveal(
  build,
  { start = 'top 82%', once = true, deps = [], prepare = null } = {},
) {
  const el = useRef(null)
  useEffect(() => {
    if (!el.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Reveal immediately, without any transform.
      build(el.current, true)
      return
    }
    const ctx = gsap.context(() => {
      /* Seed the resting state up front. Without this the element renders in
         its final state, then snaps to the "from" state when the trigger
         fires — a one-frame flash on anything that clips or offsets. */
      if (prepare) prepare(el.current, false)
      ScrollTrigger.create({
        trigger: el.current,
        start,
        once,
        onEnter: () => build(el.current, false),
      })
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return el
}
