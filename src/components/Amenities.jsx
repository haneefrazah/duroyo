import {
  Wifi,
  Car,
  Snowflake,
  Trees,
  Sunset,
  Waves,
  UtensilsCrossed,
  ConciergeBell,
} from 'lucide-react'
import { amenities } from '../data/site'
import { MaskedLines, Reveal, Eyebrow } from './primitives'

const ICONS = {
  wifi: Wifi,
  car: Car,
  snowflake: Snowflake,
  trees: Trees,
  sunset: Sunset,
  waves: Waves,
  utensils: UtensilsCrossed,
  concierge: ConciergeBell,
}

export default function Amenities() {
  return (
    <section id="amenities" className="relative bg-bone-2 py-24 text-ink md:py-32">
      <div className="edge">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>What you will find</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 [&_.line-mask>span]:!text-ink">
              <MaskedLines lines={['Amenities']} />
            </h2>
            <Reveal delay={0.12}>
              <p className="body-lg mt-8 max-w-[38ch] text-ink/60">
                Nothing decorative. The list the hotel actually offers, and nothing
                invented to fill a column.
              </p>
            </Reveal>
          </div>

          <ul className="grid sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {amenities.map((a, i) => {
              const Icon = ICONS[a.icon] ?? Wifi
              return (
                <Reveal
                  key={a.label}
                  delay={0.04 * i}
                  as="li"
                  className="border-t border-ink/12"
                >
                  <div className="group flex items-center gap-5 py-6 transition-colors duration-500 hover:text-brass">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/12 transition-colors duration-500 group-hover:border-brass/60">
                      <Icon size={17} strokeWidth={1.1} aria-hidden="true" />
                    </span>
                    <span className="font-display text-xl font-light tracking-tight">
                      {a.label}
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <p className="text-xs font-light leading-relaxed text-ink/40">
            Transport to nearby destinations can be arranged on request, and the pool is
            seasonal — confirm current availability with the hotel before you travel.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
