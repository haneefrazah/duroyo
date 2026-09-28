import { images } from '../data/images'
import { hotel } from '../data/site'
import { MaskedLines, Reveal, SmartImage, Eyebrow, RuleLine, Magnetic } from './primitives'

export default function Dining() {
  return (
    <section id="dining" className="relative bg-ink py-24 text-bone md:py-32 lg:py-40">
      <div className="edge">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 lg:order-2 lg:pl-6">
            <Reveal>
              <Eyebrow light>Food</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 [&_.line-mask>span]:!text-bone">
              <MaskedLines lines={['From', 'our table.']} />
            </h2>
            <Reveal delay={0.1} className="mt-9 grid gap-6">
              <p className="body-lg text-bone/60">
                Duroyo has a restaurant, and the food is the kind that suits this
                altitude: rice, grilled meat, dal, chai, and whatever the valley market
                had that morning.
              </p>
              <p className="body-lg text-bone/45">
                Guests eat in-house or on the terrace, and room service is available if
                you would rather not cross the garden.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic strength={0.22}>
                <a href={hotel.phoneHref} className="tap-target link-brass label-sm text-brass" data-cursor="Call">
                  Ask about meals
                </a>
              </Magnetic>
              <RuleLine light className="max-w-[200px] flex-1" delay={0.1} />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <Reveal>
              <SmartImage
                image={images.dining}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-[4/5] w-full"
                parallax={7}
              />
            </Reveal>
            {/* TODO(owner): the hotel's own kitchen photography would sit here. */}
            <Reveal delay={0.25} className="mt-4 flex justify-end">
              <p className="label-sm text-bone/30">A dish prepared at Duroyo</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
