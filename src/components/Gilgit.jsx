import { surroundings, hotel } from '../data/site'
import { images } from '../data/images'
import { MaskedLines, Reveal, SmartImage, HoverPicture, Eyebrow, DemoFlag } from './primitives'

export default function Gilgit() {
  return (
    <section id="gilgit" className="relative bg-bone py-24 text-ink md:py-32 lg:py-40">
      {/* Wide valley photograph breaks the top edge */}
      <Reveal className="edge mb-16 md:mb-24">
        <SmartImage
          image={images.gilgitWide}
          sizes="100vw"
          className="aspect-[21/9] w-full"
          start="top 92%"
          parallax={7}
        />
      </Reveal>

      <div className="edge">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>The province</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 [&_.line-mask>span]:!text-ink">
              <MaskedLines lines={['Your base', 'for Gilgit.']} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.1}>
              <p className="body-lg text-ink/65">
                Gilgit-Baltistan is not one destination — it is a set of river valleys
                with a road between them, and a mountain range closing the north.
              </p>
              <p className="body-lg mt-6 text-ink/65">
                From Jutial, the valley towns and the high passes are all within reach
                of a day. The hotel is a place to come back to at the end of the day.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Surroundings. Descriptions are of the region, not of tours the hotel sells.
            TODO(owner): if the hotel arranges excursions, add operator-approved copy. */}
        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {surroundings.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * i} as="article" className="group">
              <HoverPicture
                image={images.surroundings[s.key]}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 88vw"
                className="aspect-[3/4] w-full"
                zoom={1.06}
                drift={16}
              />
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="font-display text-[1.55rem] font-light leading-tight">
                  {s.title}
                </h3>
                <span className="label-sm mt-1.5 text-ink/25">0{i + 1}</span>
              </div>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-ink/55">{s.blurb}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <DemoFlag className="text-ink/45" />
          <p className="text-xs font-light text-ink/40">
            Regional photography. Distances and drive times change with road conditions —
            ask the hotel before you set out.
          </p>
          <a
            href={hotel.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="tap-target link-brass label-sm ml-auto text-brass"
          >
            Open the map
          </a>
        </Reveal>
      </div>
    </section>
  )
}
