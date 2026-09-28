import { Star } from 'lucide-react'
import { reviews, reviewsMeta } from '../data/reviews'
import { MaskedLines, Reveal, Eyebrow } from './primitives'

function Score({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.25 && value - full >= 0.5
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${value} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full || (half && i === full)
        return (
          <Star
            key={i}
            size={12}
            strokeWidth={1}
            aria-hidden="true"
            className={filled ? 'fill-brass text-brass' : 'text-ink/25'}
          />
        )
      })}
    </span>
  )
}

export default function Hospitality() {
  return (
    <section id="hospitality" className="relative bg-bone py-24 text-ink md:py-32 lg:py-40">
      <div className="edge">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Hospitality</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 [&_.line-mask>span]:!text-ink">
              <MaskedLines lines={['Warmth is', 'the amenity.']} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.1}>
              <p className="body-lg text-ink/65">
                Duroyo is run by the people who live in it. Guests mention the same two
                things first, every time: that the staff went out of their way, and that
                the room was clean.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 md:mt-24 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal
              key={r.id}
              delay={0.06 * i}
              className={i % 2 === 1 ? 'md:mt-20' : ''}
            >
              <figure className="flex h-full flex-col">
                <span
                  aria-hidden="true"
                  className="font-display text-[4.5rem] leading-[0.5] text-brass/45"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-7 flex-1">
                  <p className="font-display text-[1.55rem] font-light leading-[1.32] tracking-[-0.015em] text-ink/85 md:text-[1.7rem]">
                    {r.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-8 flex items-end justify-between gap-6 border-t border-ink/12 pt-5">
                  <div>
                    <p className="label-sm text-ink">{r.name}</p>
                    <p className="mt-1.5 text-xs font-light text-ink/40">
                      <time dateTime={r.dateISO}>{r.date}</time>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      {reviewsMeta.source}
                    </p>
                  </div>
                  <Score value={r.score} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 flex items-center gap-4">
          <span className="rule" aria-hidden="true" />
          <p className="label-sm shrink-0 text-ink/35">{reviewsMeta.sourceNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
