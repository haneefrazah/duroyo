import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { hotel, nav } from '../data/site'
import { brand } from '../data/images'
import { scrollToId, useReducedMotionPref } from '../lib/motion'
import { playTransition } from '../lib/transition'
import { Magnetic } from './primitives'

function Brand({ tone = 'cream' }) {
  const src = tone === 'cream' ? brand.monogram.cream : brand.monogram.gold
  const word = tone === 'cream' ? brand.wordmark.cream : brand.wordmark.gold
  return (
    <span className="flex items-center gap-3">
      <img src={src} alt="" aria-hidden="true" className="h-8 w-auto md:h-9" />
      <img src={word} alt="Duroyo" className="h-[13px] w-auto md:h-[15px]" />
    </span>
  )
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotionPref()

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        // Solid once the hero image is mostly behind us.
        setSolid(y > window.innerHeight * 0.62)
        // Hide on scroll down, reveal on scroll up — but never over the hero.
        setHidden(y > 220 && y > last + 4)
        last = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href) => {
    setOpen(false)
    const target = href.replace('#', '')
    // Let the overlay finish closing, then wipe across to the new section.
    setTimeout(
      () => playTransition(() => scrollToId(target)),
      reduced ? 0 : 360,
    )
  }

  const onBook = () => {
    // TODO(owner): wire to the hotel's real booking engine.
    if (hotel.bookingUrl) window.open(hotel.bookingUrl, '_blank', 'noopener')
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          solid
            ? 'bg-bone text-ink shadow-[0_1px_0_0_rgba(22,19,15,0.08)]'
            : 'text-bone',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <div className="edge">
          <div className="flex h-[74px] items-center justify-between gap-6 md:h-[86px]">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                playTransition(() => scrollToId('top'))
              }}
              className="shrink-0"
              aria-label="Duroyo — back to top"
            >
              <Brand tone={solid ? 'gold' : 'cream'} />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.href)
                      }}
                      className="tap-target link-brass label-sm py-2 transition-colors duration-500 hover:text-brass"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-5">
              <a
                href={hotel.phoneHref}
                className="hidden items-center gap-2.5 label-sm transition-colors duration-500 hover:text-brass xl:flex"
              >
                <Phone size={13} strokeWidth={1.25} aria-hidden="true" />
                <span className="tracking-[0.16em]">{hotel.phone}</span>
              </a>

              {/* Visibility lives on this wrapper, not on Magnetic. Magnetic has
                  to set `inline-block` so it can be transformed, and putting
                  `hidden` on the same element makes the winner depend on utility
                  order in the stylesheet — which is how the header ended up 679px
                  wide on a 390px phone. A wrapper with no competing `display`
                  utility can't lose that race. */}
              <div className="max-md:hidden">
                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={onBook}
                    data-cursor={hotel.bookingUrl ? 'Book' : ''}
                    className="btn-outline !px-7 !py-[0.95rem]"
                  >
                    Book your stay
                  </button>
                </Magnetic>
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                <Menu size={22} strokeWidth={1.1} aria-hidden="true" className={open ? 'hidden' : ''} />
                <X size={22} strokeWidth={1.1} aria-hidden="true" className={open ? '' : 'hidden'} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink text-bone lg:hidden"
          >
            <div className="edge flex h-[74px] shrink-0 items-center md:h-[86px]">
              <Brand tone="cream" />
            </div>

            <nav aria-label="Mobile" className="edge flex flex-1 flex-col justify-center pb-16">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.16 + i * 0.06,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-bone/10"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.href)
                      }}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span className="label-sm text-brass/70">0{i + 1}</span>
                      <span className="font-display text-[2.6rem] font-light leading-none tracking-tight">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="edge grid shrink-0 gap-3 pb-10"
            >
              <button type="button" onClick={onBook} className="btn-solid w-full">
                Book your stay
              </button>
              <a href={hotel.phoneHref} className="btn-outline w-full">
                <Phone size={13} strokeWidth={1.25} aria-hidden="true" />
                {hotel.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
