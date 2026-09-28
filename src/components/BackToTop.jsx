import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToId } from '../lib/motion'
import { playTransition } from '../lib/transition'
import { Magnetic } from './primitives'

/**
 * Appears once the visitor is well past the hero, and returns to the top
 * through the same curtain used for section navigation.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * 1.4)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="back-to-top"
          className="fixed bottom-6 right-5 z-[70] md:bottom-9 md:right-8"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic strength={0.28} radius={80}>
            <button
              type="button"
              onClick={() => playTransition(() => scrollToId('top'))}
              data-cursor="Top"
              aria-label="Back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 bg-ink/80 text-brass backdrop-blur-sm transition-colors duration-500 hover:border-brass hover:bg-brass hover:text-ink"
            >
              <ArrowUp size={16} strokeWidth={1.2} aria-hidden="true" />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
