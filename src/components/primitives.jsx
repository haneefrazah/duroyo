import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useReveal } from '../lib/motion'

/* ================================================================== */
/*  MaskedLines — deterministic line-by-line reveal.                  */
/*  Lines are supplied explicitly (no DOM measurement), so there is   */
/*  no reflow on resize and the animation is identical every load.    */
/* ================================================================== */
export function MaskedLines({ lines, className = '', delay = 0, stagger = 0.09, start = 'top 84%' }) {
  const wrap = useReveal(
    (el, reduced) => {
      const spans = el.querySelectorAll('.line-mask > span')
      if (reduced) {
        gsap.set(spans, { yPercent: 0, opacity: 1 })
        return
      }
      gsap.fromTo(
        spans,
        { yPercent: 118, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'expo.out',
          stagger,
          delay,
        },
      )
    },
    { start },
  )

  return (
    <span ref={wrap} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </span>
  )
}

/* ================================================================== */
/*  Reveal — generic fade / rise for copy and rules.                  */
/* ================================================================== */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  y = 26,
  delay = 0,
  duration = 1.05,
  start = 'top 86%',
}) {
  const ref = useReveal(
    (el, reduced) => {
      gsap.fromTo(
        el,
        { y: reduced ? 0 : y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduced ? 0.01 : duration,
          ease: 'expo.out',
          delay: reduced ? 0 : delay,
        },
      )
    },
    { start },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/* ================================================================== */
/*  SmartImage — responsive srcset, blur-up, optional clip wipe.       */
/* ================================================================== */
export function SmartImage({
  image,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  wipe = true,
  wipeDelay = 0,
  parallax = 0,
  start = 'top 88%',
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  /* The ref this returns is the element `useReveal` observes — it has to be
     the one on the frame, not a separate local ref, or the effect bails on a
     null element and the reveal never runs. */
  const frame = useReveal(
    (el, reduced) => {
      const img = el.querySelector('img')
      if (reduced) {
        gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(img, { scale: 1, yPercent: 0, filter: 'blur(0px)' })
        return
      }
      gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.35,
        ease: 'expo.out',
        delay: wipeDelay,
      })
      // When parallax is on, the scrubbed tween below owns scale — animating it
      // here as well would leave the two fighting over the same property.
      if (!parallax) {
        gsap.to(img, { scale: 1, duration: 1.9, ease: 'expo.out', delay: wipeDelay })
      }
    },
    {
      start,
      deps: [wipeDelay, parallax],
      prepare: (el, reduced) => {
        if (reduced) return
        gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' })
        if (parallax) return // the scrubbed tween owns the img's resting scale
        const img = el.querySelector('img')
        if (img) gsap.set(img, { scale: 1.14 })
      },
    },
  )

  /* Scroll-linked drift. The image is held slightly overscaled so the travel
     never exposes an edge inside the clipped frame. */
  useEffect(() => {
    if (!parallax) return
    const el = frame.current
    const img = imgRef.current
    if (!el || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -parallax, scale: 1 + parallax / 8 },
        {
          yPercent: parallax,
          scale: 1 + parallax / 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [parallax])

  const srcSet = image.sm ? `${image.sm} 900w, ${image.src} 2000w` : undefined

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={image.src}
        srcSet={srcSet}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        /* React 18 predates the camelCase `fetchPriority` prop; lowercase keeps
           the hint without tripping the unknown-prop warning. */
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={{
          filter: loaded ? 'blur(0px)' : 'blur(14px)',
          transition: 'filter 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
        className={`img-cover ${imgClassName}`}
      />
    </div>
  )
}

/* ================================================================== */
/*  HoverPicture — motion for images you are meant to touch.           */
/*                                                                    */
/*  Deliberately separate from SmartImage rather than a flag on it.    */
/*  Both write `transform` to the same <img>, and two writers on one   */
/*  property is how pictures end up jittering. Here GSAP owns the img  */
/*  outright: the zoom and the pointer drift are two tweens on the     */
/*  same element but different properties, so they compose instead of  */
/*  overwriting. Use this on interactive images, SmartImage+parallax   */
/*  on scenery you only scroll past.                                   */
/* ================================================================== */
export function HoverPicture({
  image,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  zoom = 1.05,
  /* Max px of pointer travel. Enough to feel like parallax under the
     finger, small enough that the photo never tears its own border. */
  drift = 14,
  wash = true,
  washClass = '',
  priority = false,
  start = 'top 88%',
  onClick,
  onEnter,
  onLeave,
  role,
  cursor,
  children,
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)
  const dx = useRef(null)
  const dy = useRef(null)
  const inside = useRef(false)

  const frame = useReveal(
    (el, reduced) => {
      if (reduced) return
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.out' })
    },
    {
      start,
      prepare: (el, reduced) => {
        if (reduced) return
        gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' })
      },
    },
  )

  useEffect(() => {
    const el = frame.current
    const img = imgRef.current
    if (!el || !img) return
    // No pointer to follow, and no reason to move a photo for someone who
    // asked for stillness.
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo(img, 'x', { duration: 0.75, ease: 'power3.out' })
    const yTo = gsap.quickTo(img, 'y', { duration: 0.75, ease: 'power3.out' })
    dx.current = xTo
    dy.current = yTo

    const onMove = (e) => {
      if (!inside.current) return
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      xTo(((e.clientX - r.left) / r.width - 0.5) * 2 * drift)
      yTo(((e.clientY - r.top) / r.height - 0.5) * 2 * drift)
    }
    const onPointerEnter = () => {
      inside.current = true
      onEnter?.()
      gsap.to(img, { scale: zoom, duration: 1.15, ease: 'expo.out' })
    }
    const onPointerLeave = () => {
      inside.current = false
      onLeave?.()
      gsap.to(img, { scale: 1, duration: 1.15, ease: 'expo.out' })
      xTo(0)
      yTo(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerenter', onPointerEnter)
    el.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onPointerEnter)
      el.removeEventListener('pointerleave', onPointerLeave)
      dx.current = null
      dy.current = null
      gsap.killTweensOf(img)
    }
  }, [zoom, drift, onEnter, onLeave])

  const srcSet = image.sm ? `${image.sm} 900w, ${image.src} 2000w` : undefined
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      ref={frame}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      role={role}
      data-cursor={cursor}
      className={`group relative block w-full overflow-hidden text-left ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <img
        ref={imgRef}
        src={image.src}
        srcSet={srcSet}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={{
          filter: loaded ? 'blur(0px)' : 'blur(14px)',
          transition: 'filter 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
        className={`img-cover ${imgClassName}`}
      />
      {wash && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-brass/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 ${washClass}`}
        />
      )}
      {children}
    </Tag>
  )
}

/* ================================================================== */
/*  Eyebrow — small brass label preceded by a hairline rule.          */
/* ================================================================== */
export function Eyebrow({ children, className = '', light = false, rule = true }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      {rule && (
        <span
          aria-hidden="true"
          className={`h-px w-10 ${light ? 'bg-bone/40' : 'bg-brass/60'}`}
        />
      )}
      <span className={`label-sm ${light ? 'text-bone/60' : 'text-brass'}`}>{children}</span>
    </span>
  )
}

/* ================================================================== */
/*  DemoFlag — small, quiet marker on imagery that is NOT the hotel.  */
/* ================================================================== */
export function DemoFlag({ className = '' }) {
  return (
    <span
      title="Concept image — not a photograph of Duroyo Hotel"
      className={`label-sm inline-flex items-center gap-2 border border-current/25 px-2.5 py-1.5 text-[10px] leading-none opacity-70 ${className}`}
    >
      Concept image
    </span>
  )
}

/* ================================================================== */
/*  Magnetic — an element leans toward the pointer as it approaches.   */
/*  Kept deliberately weak: the movement should read as the element    */
/*  noticing you, not chasing the cursor.                              */
/* ================================================================== */
export function Magnetic({ children, strength = 0.3, radius = 110, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.75, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.75, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const reach = Math.max(r.width, r.height) / 2 + radius

      if (Math.hypot(dx, dy) < reach) {
        xTo(dx * strength)
        yTo(dy * strength)
      } else {
        xTo(0)
        yTo(0)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength, radius])

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}

/* ================================================================== */
/*  Chars — per-character rise with a touch of rotation.               */
/*  For short strings only; the DOM cost is one node per character.    */
/* ================================================================== */
export function Chars({ text, className = '', delay = 0, stagger = 0.024, start = 'top 86%' }) {
  const wrap = useReveal(
    (el, reduced) => {
      const chars = el.querySelectorAll('[data-char]')
      if (reduced) {
        gsap.set(chars, { yPercent: 0, opacity: 1, rotateX: 0 })
        return
      }
      gsap.fromTo(
        chars,
        { yPercent: 65, opacity: 0, rotateX: -58 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.05,
          ease: 'expo.out',
          stagger,
          delay,
        },
      )
    },
    { start },
  )

  return (
    <span ref={wrap} className={`inline-block [perspective:600px] ${className}`}>
      <span className="inline-block [transform-style:preserve-3d]">
        {Array.from(text).map((c, i) => (
          <span
            key={i}
            data-char=""
            className="inline-block whitespace-pre will-change-transform"
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  )
}

/* ================================================================== */
/*  SplitWords — each word rises out of its own mask.                 */
/*  Finer than MaskedLines, which moves whole lines. Use it where the   */
/*  entrance should feel choreographed rather than simply revealed.    */
/* ================================================================== */
export function SplitWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  start = 'top 86%',
  reveal = true,
}) {
  // The hook is always called so ordering stays stable; when a parent timeline
  // owns the entrance we simply hand it a build that does nothing.
  const wrap = useReveal(
    reveal
      ? (el, reduced) => {
          const words = el.querySelectorAll('[data-word]')
          if (reduced) {
            gsap.set(words, { yPercent: 0, opacity: 1 })
            return
          }
          gsap.fromTo(
            words,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              stagger,
              delay,
            },
          )
        }
      : () => {},
    { start },
  )

  return (
    <span ref={wrap} className={`block ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="line-mask mr-[0.26em] inline-block">
          <span data-word="" className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ================================================================== */
/*  CopyPhone — copies the verified number, with quiet confirmation.   */
/*  The tel: link in the nav is still the primary path; this is the    */
/*  convenience on the page that lists the address.                    */
/* ================================================================== */
export function CopyPhone({ value, className = '', labelClassName = '' }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1900)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard permission denied — the number is already visible and the
      // nav carries a tel: link, so there is nothing useful to say here.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor={copied ? '' : 'Copy'}
      aria-label={`Copy phone number ${value}`}
      className={`tap-target group inline-flex items-baseline gap-3 text-left ${className}`}
    >
      <span className="link-brass">{value}</span>
      <span
        className={`label-sm translate-y-1 text-brass opacity-0 transition-all duration-500 group-hover:translate-y-0 ${
          copied ? '!translate-y-0 !opacity-100' : ''
        } ${labelClassName}`}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}

/* ================================================================== */
/*  RuleLine — a brass hairline that draws itself as it enters.        */
/*  The static version of this is the `.rule` utility in index.css.     */
/* ================================================================== */
export function RuleLine({ className = '', delay = 0, light = false, start = 'top 92%' }) {
  const line = useReveal((el, reduced) => {
    if (reduced) {
      gsap.set(el, { scaleX: 1 })
      return
    }
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'expo.out', delay, transformOrigin: 'left center' },
    )
  }, { start })

  return (
    <span
      ref={line}
      aria-hidden="true"
      className={`block h-px w-full origin-left ${light ? 'rule-light' : 'rule'} ${className}`}
    />
  )
}
