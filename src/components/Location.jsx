import { Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { hotel } from '../data/site'
import { images, brand } from '../data/images'
import {
  MaskedLines,
  Reveal,
  SmartImage,
  Eyebrow,
  DemoFlag,
  Magnetic,
  Chars,
  RuleLine,
  CopyPhone,
} from './primitives'

const ADDRESS_LINES = [
  hotel.address.street,
  `${hotel.address.locality} ${hotel.address.postalCode}`,
  hotel.address.region,
  hotel.address.country,
]

export default function Location() {
  const onBook = () => {
    // TODO(owner): wire to the hotel's real booking engine. Until a URL is
    // verified this is a deliberate no-op rather than a link to somewhere fake.
    if (hotel.bookingUrl) window.open(hotel.bookingUrl, '_blank', 'noopener')
  }

  return (
    <section id="location" className="relative bg-ink py-24 text-bone md:py-32 lg:py-40">
      <div className="edge">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow light>Find us</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8">
              <MaskedLines lines={['Jutial,', 'Gilgit']} />
            </h2>
            <Reveal delay={0.12}>
              <p className="body-lg mt-8 max-w-[38ch] text-bone/60">
                On the Public School &amp; College Road, a few minutes from the PTV station.
                Call ahead and someone will meet you at the road.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-12">
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={0.24}>
                  <button type="button" onClick={onBook} className="btn-solid" data-cursor="Call">
                    Book your stay
                  </button>
                </Magnetic>
                <Magnetic strength={0.24}>
                  <a href={hotel.phoneHref} className="btn-outline" data-cursor="Call">
                    <Phone size={13} strokeWidth={1.25} aria-hidden="true" />
                    {hotel.phone}
                  </a>
                </Magnetic>
              </div>
              {!hotel.bookingUrl && (
                <p className="mt-5 text-xs font-light leading-relaxed text-bone/40">
                  Online booking is not yet set up for this property — please call the
                  hotel directly to reserve.
                </p>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <dl className="border-t border-bone/12">
                <div className="flex gap-6 border-b border-bone/12 py-6">
                  <dt className="flex w-28 shrink-0 items-start gap-2.5 label-sm text-bone/40">
                    <MapPin size={13} strokeWidth={1.25} aria-hidden="true" className="mt-px" />
                    Address
                  </dt>
                  <dd className="text-sm font-light leading-relaxed text-bone/80">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>

                <div className="flex gap-6 border-b border-bone/12 py-6">
                  <dt className="flex w-28 shrink-0 items-start gap-2.5 label-sm text-bone/40">
                    <Phone size={13} strokeWidth={1.25} aria-hidden="true" className="mt-px" />
                    Telephone
                  </dt>
                  <dd className="text-sm font-light text-bone/80">
                    <CopyPhone value={hotel.phone} className="text-bone/80" />
                  </dd>
                </div>

                <div className="flex gap-6 border-b border-bone/12 py-6">
                  <dt className="w-28 shrink-0 label-sm text-bone/40">Coordinates</dt>
                  <dd className="text-sm font-light tabular-nums text-bone/80">
                    {hotel.geo.lat}, {hotel.geo.lng}
                  </dd>
                </div>

                <div className="flex gap-6 border-b border-bone/12 py-6">
                  <dt className="w-28 shrink-0 label-sm text-bone/40">Map</dt>
                  <dd className="text-sm font-light">
                    <a
                      href={hotel.mapsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="tap-target link-brass inline-flex items-center gap-2 text-bone/80"
                    >
                      Open in Google Maps
                      <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex items-center gap-4">
              <DemoFlag className="text-bone/50" />
              <p className="text-xs font-light leading-relaxed text-bone/40">
                Regional photography. Road conditions into the valley change often — allow
                more time than the map suggests.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Closing plate — the last image on the page, so it reads as an outshot. */}
      <div className="edge mt-20 md:mt-28">
        <RuleLine light delay={0.05} />
      </div>

      <div className="relative mt-14 md:mt-20">
        <SmartImage
          image={images.cta}
          sizes="100vw"
          className="h-[52vh] min-h-[340px] w-full md:h-[68vh]"
          parallax={9}
        />
        {/* Vignette so the closing line holds against a moving image. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_100%,rgba(22,19,15,0.82)_0%,rgba(22,19,15,0.35)_45%,transparent_78%)]"
        />
        <div className="edge pointer-events-none absolute inset-0 flex flex-col justify-end pb-12 md:pb-16">
          <p className="display-3 max-w-[18ch] text-bone">
            <Chars text="Come for the mountains." delay={0.15} />
          </p>
        </div>
      </div>

      <footer className="edge pb-12 pt-16 md:pt-20">
        <div className="grid gap-10 border-t border-bone/12 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <img
              src={brand.lockup.cream}
              alt="Duroyo Hotel"
              className="h-10 w-auto opacity-90"
            />
            <p className="mt-5 text-sm font-light leading-relaxed text-bone/45">
              {hotel.nameLong} — {hotel.locationLine}
            </p>
          </div>

          {hotel.socials.length > 0 && (
            <nav aria-label="Social" className="md:col-span-3">
              <h2 className="label-sm text-bone/40">Elsewhere</h2>
              <ul className="mt-5 grid gap-3">
                {hotel.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="tap-target link-brass text-sm font-light text-bone/70"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone/12 pt-8">
          <p className="text-xs font-light text-bone/35">
            © {new Date().getFullYear()} {hotel.nameLong}. All rights reserved.
          </p>
          <p className="text-xs font-light text-bone/35">
            A concept site — {hotel.alternateNames.join(', ')}.
          </p>
        </div>
      </footer>
    </section>
  )
}
