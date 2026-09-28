import { createRoot } from 'react-dom/client'

import BackToTop from './components/BackToTop'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Transition from './components/Transition'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Rooms from './components/Rooms'
import Hospitality from './components/Hospitality'
import Dining from './components/Dining'
import Breathe from './components/Breathe'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import Gilgit from './components/Gilgit'
import Location from './components/Location'

import { hotel } from './data/site'
import { useSmoothScroll } from './lib/motion'

import './index.css'

/**
 * Page order. Sections alternate light and dark so the scroll keeps a rhythm:
 *
 *   Hero        ink      full-bleed opener
 *   Intro       bone     the pitch
 *   Rooms       ink-2    the rooms
 *   Hospitality bone     reviews
 *   Dining      ink      the table
 *   Breathe     ink      pinned horizontal scroll
 *   Gallery     ink      lightbox
 *   Amenities   bone-2   the practical list
 *   Band        ink      marquee punctuation between the two light sections
 *   Gilgit      bone     the surroundings
 *   Location    ink      final CTA + footer
 *
 * Every section is a zero-prop default export, so order is the only thing
 * this file decides. `id`s here must match the targets in data/site.js.
 */
const BAND = [hotel.locationLine, hotel.tagline, 'Karakoram to the north']

function App() {
  useSmoothScroll()

  return (
    <>
      <Loader />
      <Transition />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Rooms />
        <Hospitality />
        <Dining />
        <Breathe />
        <Gallery />
        <Amenities />
        <div className="relative border-y border-brass/15 bg-ink text-bone">
          <Marquee items={BAND} light speed={40} />
        </div>
        <Gilgit />
        <Location />
      </main>
      <BackToTop />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
