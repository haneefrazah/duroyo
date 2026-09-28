import { images } from '../data/images'
import { hotel } from '../data/site'
import { MaskedLines, Reveal, SmartImage, HoverPicture, Eyebrow } from './primitives'

export default function Rooms() {
  return (
    <section id="stay" className="relative bg-ink-2 py-24 text-bone md:py-32 lg:py-40">
      <div className="edge">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow light>Accommodation</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 lg:mt-9 [&_.line-mask>span]:!text-bone">
              <MaskedLines lines={['Your space', 'in Gilgit.']} />
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <Reveal delay={0.1}>
              <p className="body-lg text-bone/60">
                Rooms are simple, clean and air-conditioned, and they face the valley
                rather than the road. Most of the value is in what is outside the window:
                the light, the trees, and the ridge line that stays visible long after
                sunset.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={hotel.phoneHref} className="tap-target link-brass label-sm text-brass">
                Enquire about rooms
              </a>
              <span className="rule max-w-[180px] flex-1" aria-hidden="true" />
            </Reveal>
          </div>
        </div>

        {/* Asymmetric editorial grid. TODO(owner): replace the public-listing
            photographs with the hotel's own room shoot and set confirmed room names. */}
        <div className="mt-16 grid gap-5 sm:grid-cols-12 md:mt-24">
          {images.rooms.map((room, i) => {
            const span = ['sm:col-span-7', 'sm:col-span-5 sm:pt-24', 'sm:col-span-6 sm:col-start-4 sm:pt-10'][
              i
            ]
            const ratio = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/10]'][i]
            return (
              <figure key={room.src} className={span}>
                <Reveal delay={0.05 * i}>
                  <HoverPicture
                    image={room}
                    sizes="(min-width: 640px) 46vw, 92vw"
                    className={`${ratio} w-full`}
                    zoom={1.05}
                    drift={18}
                  />
                </Reveal>
                <Reveal delay={0.1 + 0.05 * i} className="mt-4 flex items-baseline justify-between gap-4">
                  <figcaption className="text-sm font-light text-bone/55">
                    {room.meta}
                  </figcaption>
                  <span className="label-sm text-bone/25">0{i + 1}</span>
                </Reveal>
              </figure>
            )
          })}
        </div>

        {/* Shared space */}
        <div className="mt-20 grid items-center gap-10 border-t border-bone/10 pt-14 md:mt-28 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <HoverPicture
              image={images.lounge}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-square w-full"
              zoom={1.05}
              drift={22}
              washClass="from-brass/20"
            />
          </Reveal>
          <div className="lg:pl-6">
            <Reveal delay={0.1}>
              <Eyebrow light>Shared spaces</Eyebrow>
              <h3 className="display-3 mt-7 max-w-[16ch] text-bone">
                Somewhere to sit that is not your room.
              </h3>
              <p className="body-lg mt-6 max-w-[46ch] text-bone/55">
                A lounge for the hours between arriving and turning in, and a garden
                that does the same job outdoors.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
