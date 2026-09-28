import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '../data/images'
import { Eyebrow, DemoFlag } from './primitives'

gsap.registerPlugin(ScrollTrigger)

const PANELS = images.breathe

export default function Breathe() {
  const section = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sec = section.current
    const tr = track.current
    if (!sec || !tr) return

    // Below desktop, and whenever motion is reduced, this is a plain stack.
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const gutter = window.innerWidth < 1280 ? 80 : 144

      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + gutter)

      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Each panel's photograph drifts against the track for depth.
      const imgs = gsap.utils.toArray('[data-drift]', tr)
      imgs.forEach((img) => {
        /* GSAP owns every transform property on this element: the horizontal
           drift, the vertical framing offset, and the hover zoom. Splitting
           them between a class and a tween means the inline style always wins,
           so the -8% framing and the hover scale were both silently dead. */
        gsap.fromTo(
          img,
          { xPercent: -4 },
          {
            xPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-panel]'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      return () => {
        tween.kill()
        gsap.set(tr, { clearProps: 'transform' })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={section}
      aria-labelledby="breathe-title"
      className="relative bg-ink py-24 text-bone md:py-32 lg:py-0"
    >
      {/* On desktop the section is pinned and full height; on mobile it stacks. */}
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="edge mb-10 shrink-0 lg:mb-0 lg:pt-0">
          <Eyebrow light>The grounds</Eyebrow>
          <h2
            id="breathe-title"
            className="display-2 mt-7 max-w-[18ch] lg:mt-8 [&_.line-mask>span]:!text-bone"
          >
            <span className="line-mask">
              <span>Space to</span>
            </span>
            <span className="line-mask">
              <span>breathe.</span>
            </span>
          </h2>
          <p className="body-lg mt-7 max-w-[46ch] text-bone/55">
            A garden to sit in, a terrace to watch the light go off the far ridge, and a
            town that only takes ten minutes to walk into.
          </p>
        </div>

        {/* Track */}
        <div
          ref={track}
          className="edge flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-center lg:gap-14 lg:pb-0 xl:gap-20"
        >
          {PANELS.map((panel, i) => (
            <article
              key={panel.src}
              data-panel
              className="group flex flex-col gap-6 lg:w-[clamp(280px,30vw,460px)] lg:shrink-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-2">
                {/* Two owners on two elements: CSS zooms the wrapper on hover
                    (from the panel's `group`), GSAP drifts the <img> inside it.
                    Keeping them apart is the point — one element cannot hand a
                    single `transform` to both a class rule and a scrub tween.
                    The photo is oversized and margin-centred so the drift has
                    bleed to spend without exposing an edge. */}
                {/* Tailwind v4 emits `group-hover:scale-*` as the standalone
                    `scale` property, which `transition-transform` does not
                    animate — it would snap. Transition `scale` explicitly.
                    `scale` also composes with GSAP's `transform` on the <img>
                    below without either one clobbering the other. */}
                <div className="absolute inset-0 transition-[scale] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                  <img
                    data-drift
                    src={panel.src}
                    srcSet={`${panel.sm} 900w, ${panel.src} 1500w`}
                    sizes="(min-width: 900px) 34vw, 88vw"
                    alt={panel.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute left-1/2 top-1/2 h-[112%] w-[112%] max-w-none -ml-[56%] -mt-[56%] object-cover"
                  />
                </div>
                <span className="absolute left-5 top-5 label-sm text-bone/70 mix-blend-difference">
                  0{i + 1}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="font-display text-[1.7rem] font-light leading-tight">
                    {panel.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm font-light leading-relaxed text-bone/50">
                    {panel.note}
                  </p>
                </div>
                <DemoFlag className="mt-1 shrink-0 text-bone/40" />
              </div>
            </article>
          ))}

          {/* Trailing plate detail closes the track */}
          <div className="hidden shrink-0 lg:block lg:w-[clamp(180px,18vw,280px)]">
            <div className="tick-corner left-0 top-0 border-l border-t" />
            <p className="font-display text-[1.6rem] font-light italic leading-snug text-bone/70">
              Gilgit
              <br />
              keeps its
              <br />
              <span className="text-brass">own weather.</span>
            </p>
            <div className="tick-corner bottom-0 right-0 border-b border-r" />
          </div>
        </div>
      </div>
    </section>
  )
}
