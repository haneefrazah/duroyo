import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { hotel } from '../data/site'
import { images, brand } from '../data/images'
import { scrollToId } from '../lib/motion'
import { onBoot } from '../lib/boot'
import { SplitWords, DemoFlag } from './primitives'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = ['Come for the', 'mountains.']

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    let ctx = null
    let stop = null

    // The loader owns the first paint, so the hero entrance is choreographed
    // against its exit rather than starting underneath it.
    stop = onBoot(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const el = root.current
      if (!el) return

      ctx = gsap.context(() => {
        // Reduced motion: skip the timeline entirely. Nothing is hidden by
        // CSS, so skipping is enough to leave the hero fully visible.
        if (reduced) return

        // Intro
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

        tl.fromTo('[data-hero-media]', { scale: 1.12 }, { scale: 1, duration: 2.4 }, 0)
          .fromTo(
            '[data-hero-mark]',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2 },
            0.25,
          )
          .fromTo(
            '[data-hero-fade]',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
            0.45,
          )
          .fromTo(
            '[data-hero-type] [data-word]',
            { yPercent: 112, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.055 },
            0.34,
          )

        // Parallax: the photograph drifts as the hero leaves; the type fades faster.
        gsap.to('[data-hero-media]', {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to('[data-hero-type]', {
          yPercent: -34,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: '80% top', scrub: true },
        })
      }, el)
    })

    return () => {
      if (stop) stop()
      if (ctx) ctx.revert()
    }
  }, [])

  const onBook = () => {
    // TODO(owner): wire to the hotel's real booking engine.
    if (hotel.bookingUrl) window.open(hotel.bookingUrl, '_blank', 'noopener')
  }

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Photograph */}
      <div className="absolute inset-0 overflow-hidden">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <img
            src={images.hero.src}
            srcSet={`${images.hero.sm} 900w, ${images.hero.src} 2000w`}
            sizes="100vw"
            alt={images.hero.alt}
            fetchpriority="high"
            decoding="sync"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Legibility scrim — vertical, warm, never a flat colour wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,19,15,0.62)_0%,rgba(22,19,15,0.18)_32%,rgba(22,19,15,0.55)_72%,rgba(22,19,15,0.9)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_35%,rgba(22,19,15,0.45)_100%)]"
        />
      </div>

      {/* Type */}
      <div data-hero-type className="edge relative z-10 pb-14 pt-32 md:pb-20">
        <div className="flex items-end justify-between gap-8">
          <div className="min-w-0">
            <div className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span data-hero-fade data-hero-mark className="flex items-center gap-3">
                <img
                  src={brand.monogram.cream}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-auto opacity-90"
                />
                <span className="font-display text-xl font-light tracking-[0.34em] text-bone">
                  DUROYO
                </span>
              </span>
              <span
                data-hero-fade
                className="label-sm hidden h-px w-16 bg-bone/30 sm:block"
                aria-hidden="true"
              />
              <span data-hero-fade className="label-sm text-bone/55">
                {hotel.locationLine}
              </span>
            </div>

            <h1 className="display-1 max-w-[16ch] text-bone">
              {HEADLINE.map((line, i) => (
                <SplitWords
                  key={i}
                  text={line}
                  reveal={false}
                  className="[&_[data-word]]:!text-bone"
                />
              ))}
            </h1>

            <p
              data-hero-fade
              className="body-lg mt-9 max-w-[46ch] text-bone/70"
            >
              A guest house in Jutial, where the Gilgit valley opens up — quiet rooms,
              a shaded garden, and mountains close enough to feel the weather change.
            </p>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button
            type="button"
            onClick={onBook}
            data-hero-fade
            className="btn-solid"
          >
            Book your stay
          </button>
          <button
            type="button"
            data-hero-fade
            onClick={() => scrollToId('experience')}
            className="btn-outline text-bone"
          >
            Explore Duroyo
          </button>
          <span data-hero-fade className="ml-auto hidden sm:block">
            <DemoFlag className="text-bone/60" />
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollToId('experience')}
        className="absolute bottom-5 right-4 z-10 hidden flex-col items-center gap-3 text-bone/45 transition-colors duration-500 hover:text-bone md:right-10 xl:flex"
      >
        <span className="label-sm [writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown size={14} strokeWidth={1} aria-hidden="true" className="animate-bounce" />
      </button>
    </section>
  )
}
