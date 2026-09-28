import { images } from '../data/images'
import { MaskedLines, Reveal, SmartImage, Eyebrow, DemoFlag } from './primitives'

export default function Intro() {
  return (
    <section id="experience" className="relative bg-bone py-24 text-ink md:py-36 lg:py-44">
      <div className="edge">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Stay with us</Eyebrow>
            </Reveal>

            <h2 className="display-2 mt-9">
              <MaskedLines
                lines={['More than', 'a room.']}
                className="[&_.line-mask>span]:!text-ink"
              />
            </h2>

            <Reveal delay={0.1} className="mt-10 grid gap-7 sm:grid-cols-2">
              <p className="body-lg text-ink/70">
                Duroyo sits on the Jutial side of Gilgit, in a part of the valley that
                does not perform for visitors. There is a garden, a terrace, and a
                working river somewhere behind the property.
              </p>
              <p className="body-lg text-ink/70">
                The rest is ordinary in the best sense — a clean bed, warm water, air
                conditioning when the summer turns, and hosts who have been here long
                enough to know which pass is open.
              </p>
            </Reveal>
          </div>

          {/* Photograph */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <Reveal delay={0.15}>
              <SmartImage
                image={images.arrive}
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="aspect-[4/5] w-full"
                parallax={8}
              />
            </Reveal>
            <Reveal delay={0.3} className="mt-5 flex items-start justify-between gap-4">
              <p className="label-sm max-w-[26ch] leading-[1.7] text-ink/40">
                Gilgit-Baltistan — the register of the valley
              </p>
              <DemoFlag className="shrink-0 text-ink/45" />
            </Reveal>
          </div>
        </div>

        {/* Brass plate detail — a quiet nod to the logo, and a texture break */}
        <Reveal delay={0.1} className="mt-20 grid grid-cols-2 gap-6 md:mt-28 md:grid-cols-4">
          {[
            { k: 'Address', v: 'Jutial, Gilgit', n: 'On the valley floor' },
            { k: 'Setting', v: 'River valley', n: 'Karakoram to the north' },
            { k: 'Garden', v: 'Shaded', n: 'A quiet hour outside' },
            { k: 'Terrace', v: 'Overlooking', n: 'Where the view opens' },
          ].map((s) => (
            <div key={s.k} className="border-t border-ink/12 pt-5">
              <p className="label-sm text-brass">{s.k}</p>
              <p className="mt-3 font-display text-2xl font-light text-ink">{s.v}</p>
              <p className="mt-1.5 text-sm font-light text-ink/45">{s.n}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
