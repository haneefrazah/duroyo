import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { images } from '../data/images'
import { MaskedLines, Reveal, Eyebrow, DemoFlag, HoverPicture } from './primitives'

const GALLERY = images.gallery

const ASPECT = { tall: 'aspect-[4/5]', wide: 'aspect-[3/2]', square: 'aspect-square' }

/* ------------------------------------------------------------------ */
/*  Lightbox — Escape / arrows / focus trap / scroll lock            */
/* ------------------------------------------------------------------ */
function Lightbox({ index, onClose, onStep }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)
  const item = GALLERY[index]

  useEffect(() => {
    closeBtn.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onStep(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onStep(-1)
      } else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const nodes = panel.current?.querySelectorAll('button')
        if (!nodes?.length) return
        const list = Array.from(nodes)
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onStep])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/97"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${GALLERY.length}: ${item.caption}`}
    >
      <div ref={panel} className="edge flex shrink-0 items-center justify-between gap-4 py-5">
        <p className="label-sm text-bone/50">
          <span className="text-bone">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          {String(GALLERY.length).padStart(2, '0')}
        </p>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center text-bone/70 transition-colors duration-300 hover:text-bone"
        >
          <span className="sr-only">Close gallery</span>
          <X size={22} strokeWidth={1.1} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-bone/60 transition-colors duration-300 hover:text-bone md:left-6"
        >
          <span className="sr-only">Previous image</span>
          <ChevronLeft size={26} strokeWidth={1.1} aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-0 flex-col items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-full min-h-0 w-auto max-w-full object-contain"
            />
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onStep(1)}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-bone/60 transition-colors duration-300 hover:text-bone md:right-6"
        >
          <span className="sr-only">Next image</span>
          <ChevronRight size={26} strokeWidth={1.1} aria-hidden="true" />
        </button>
      </div>

      <div className="edge shrink-0 pb-6 pt-3">
        <p className="font-display text-lg font-light text-bone/80">{item.caption}</p>
        <p className="mt-1.5 text-xs font-light text-bone/35">{item.credit}</p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(-1)

  const step = useCallback((dir) => {
    setOpenIndex((i) => (i + dir + GALLERY.length) % GALLERY.length)
  }, [])

  return (
    <section id="gallery" className="relative bg-ink py-24 text-bone md:py-32 lg:py-40">
      <div className="edge">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow light>Gallery</Eyebrow>
            </Reveal>
            <h2 className="display-2 mt-8 [&_.line-mask>span]:!text-bone">
              <MaskedLines lines={['The valley,', 'in frames.']} />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-[32ch] text-sm font-light leading-relaxed text-bone/45">
              Gilgit-Baltistan, photographed. Select any frame to open it.
            </p>
          </Reveal>
        </div>

        {/* Editorial masonry-ish grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
          {GALLERY.map((g, i) => {
            const span =
              g.aspect === 'wide'
                ? 'col-span-2 md:col-span-2'
                : g.aspect === 'square'
                  ? 'col-span-1 md:col-span-2'
                  : 'col-span-1'
            return (
              <Reveal
                key={g.src}
                delay={0.05 * i}
                className={span}
              >
                <HoverPicture
                  image={g}
                  sizes="(min-width: 768px) 40vw, 46vw"
                  className={ASPECT[g.aspect]}
                  onClick={() => setOpenIndex(i)}
                  cursor=""
                  zoom={1.06}
                  drift={12}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(22,19,15,0.7)_100%)] opacity-70 transition-opacity duration-700 group-hover:opacity-95"
                  />
                  <span className="pointer-events-none absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                    <span className="label-sm text-bone/85">{g.caption}</span>
                    <span className="label-sm translate-y-1 text-brass opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      View
                    </span>
                  </span>
                </HoverPicture>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <DemoFlag className="text-bone/40" />
          <p className="text-xs font-light text-bone/35">
            Landscape photography is regional stock, not the Duroyo property.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex >= 0 && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(-1)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
