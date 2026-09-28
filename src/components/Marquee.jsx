import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * A seamless marquee. The track holds two identical copies and travels -50%,
 * so the loop point is never visible.
 *
 * `speed` is the seconds for one full pass; longer means slower.
 */
export default function Marquee({
  items,
  speed = 34,
  light = false,
  separator = '·',
  className = '',
}) {
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { xPercent: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }, el)

    return () => ctx.revert()
  }, [speed])

  const copy = (key) => (
    <div className="flex shrink-0 items-center" aria-hidden={key === 'copy'}>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span
            className={`px-8 ${light ? 'text-brass/60' : 'text-brass/70'}`}
            aria-hidden="true"
          >
            {separator}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`relative w-full overflow-hidden py-6 select-none ${className}`}
      aria-label={typeof items[0] === 'string' ? items.join(', ') : undefined}
    >
      <div ref={track} className="flex w-max will-change-transform">
        {copy('copy')}
        {copy('duplicate')}
      </div>
    </div>
  )
}
