/**
 * CENTRAL IMAGE MANIFEST — every image on the site resolves through here.
 *
 * Swap any slot for the hotel's own photography without touching a component.
 *
 * provenance:
 *   'atmosphere' — licensed stock of Gilgit-Baltistan. NOT the Duroyo property.
 *   'property'   — a photograph of Duroyo Hotel sourced from a public OTA
 *                  listing. Replace with the hotel's own shoot before launch.
 */

const atmosphere = 'atmosphere'
const property = 'property'

export const images = {
  hero: {
    src: '/images/hero.jpg',
    sm: '/images/hero-sm.jpg',
    alt: 'Snow-covered Karakoram peaks above the Gilgit valley, seen through high cloud.',
    credit: 'Karakoram range, Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
    provenance: atmosphere,
    focus: 'center',
  },

  // "More Than A Room" — the human, inhabited, Gilgiti-register image
  arrive: {
    src: '/images/arrive.jpg',
    sm: '/images/arrive-sm.jpg',
    alt: 'A timber building among tall poplar trees in Gilgit-Baltistan.',
    credit: 'Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
    provenance: atmosphere,
  },

  // "Space To Breathe" — horizontal scroll gallery
  breathe: [
    {
      src: '/images/breathe-1.jpg',
      sm: '/images/breathe-1-sm.jpg',
      alt: 'Autumn poplar trees on the slopes above the Indus valley.',
      credit: 'Hunza valley, Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      title: 'The trees',
      note: 'Poplar and willow line every irrigation channel in the valley.',
    },
    {
      src: '/images/breathe-2.jpg',
      sm: '/images/breathe-2-sm.jpg',
      alt: 'Forested mountainsides rising above a Gilgit river valley.',
      credit: 'Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      title: 'The green wall',
      note: 'Above the tree line the valley closes into forest, then into rock.',
    },
    {
      src: '/images/breathe-3.jpg',
      sm: '/images/breathe-3-sm.jpg',
      alt: 'A river cutting through a wide Gilgit-Baltistan valley.',
      credit: 'Passu river valley — Unsplash (stock)',
      provenance: atmosphere,
      title: 'The water',
      note: 'The Indus and its tributaries carve the whole province.',
    },
  ],

  // "Your Space In Gilgit" — TODO(owner): replace with the hotel's own room shoot
  rooms: [
    {
      src: '/images/room-1.jpg',
      sm: '/images/room-1.jpg',
      alt: 'A guest room at Duroyo Hotel with a made bed and simple furnishings.',
      credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
      provenance: property,
      // TODO(owner): confirm the real room name. OTA listings use several
      // different names; none has been confirmed by the hotel, so none is shown.
      name: null,
      meta: 'Guest room',
    },
    {
      src: '/images/room-2.jpg',
      sm: '/images/room-2-sm.jpg',
      alt: 'A guest room at Duroyo Hotel, lit by a window.',
      credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
      provenance: property,
      name: null,
      meta: 'Guest room',
    },
    {
      src: '/images/room-3.jpg',
      sm: '/images/room-3-sm.jpg',
      alt: 'A guest room at Duroyo Hotel with a view of the surrounding mountains.',
      credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
      provenance: property,
      name: null,
      meta: 'Guest room',
    },
  ],

  // Shared spaces
  lounge: {
    src: '/images/lounge-1.jpg',
    sm: '/images/lounge-1-sm.jpg',
    alt: 'A seating area at Duroyo Hotel.',
    credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
    provenance: property,
  },
  stay: {
    src: '/images/stay-1.jpg',
    sm: '/images/stay-1-sm.jpg',
    alt: 'A guest room at Duroyo Hotel.',
    credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
    provenance: property,
  },

  // "From Our Table" — TODO(owner): confirm whether food is prepared on site
  dining: {
    src: '/images/dining-1.jpg',
    sm: '/images/dining-1-sm.jpg',
    alt: 'A dish served at Duroyo Hotel.',
    credit: 'Duroyo Hotel — public listing photo. TODO: replace with official photography.',
    provenance: property,
  },

  // "Your Base For Gilgit" — regional surroundings
  surroundings: {
    nomal: {
      src: '/images/gilgit-4.jpg',
      sm: '/images/gilgit-4-sm.jpg',
      alt: 'The green Nomal river valley beneath the mountains.',
      credit: 'Nomal Valley, Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
      provenance: atmosphere,
    },
    baltit: {
      src: '/images/gilgit-1.jpg',
      sm: '/images/gilgit-1-sm.jpg',
      alt: 'Clouds moving through the high valleys around Baltit.',
      credit: 'Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
      provenance: atmosphere,
    },
    passu: {
      src: '/images/gilgit-2.jpg',
      sm: '/images/gilgit-2-sm.jpg',
      alt: 'The village slopes of Passu above the Hunza river.',
      credit: 'Passu, Hunza — Unsplash (stock, not the Duroyo property)',
      provenance: atmosphere,
    },
    fairyMeadows: {
      src: '/images/gilgit-3.jpg',
      sm: '/images/gilgit-3-sm.jpg',
      alt: 'Dense woodland on the approach to the Fairy Meadows plateau.',
      credit: 'Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
      provenance: atmosphere,
    },
  },

  // "Your Base For Gilgit"
  gilgitWide: {
    src: '/images/gilgit-wide.jpg',
    sm: '/images/gilgit-wide-sm.jpg',
    alt: 'The blue water of Attabad Lake below steep Gilgit-Baltistan slopes.',
    credit: 'Attabad Lake — Unsplash (stock, not the Duroyo property)',
    provenance: atmosphere,
  },

  // Editorial gallery
  gallery: [
    {
      src: '/images/gallery-a.jpg',
      sm: '/images/gallery-a-sm.jpg',
      alt: 'Autumn poplar trees above a Gilgit river valley.',
      credit: 'Hunza valley, Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Hunza Valley',
      aspect: 'tall',
    },
    {
      src: '/images/gallery-b.jpg',
      sm: '/images/gallery-b-sm.jpg',
      alt: 'Close view of a bare rock face in the Karakoram.',
      credit: 'Karakoram, Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Rock',
      aspect: 'wide',
    },
    {
      src: '/images/detail-mist.jpg',
      sm: '/images/detail-mist-sm.jpg',
      alt: 'A single snow peak rising out of mist.',
      credit: 'Karakoram, Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Cloud line',
      aspect: 'tall',
    },
    {
      src: '/images/texture-rock.jpg',
      sm: '/images/texture-rock-sm.jpg',
      alt: 'Sunlit rock strata in the Karakoram.',
      credit: 'Karakoram, Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Strata',
      aspect: 'square',
    },
    {
      src: '/images/detail-grey.jpg',
      sm: '/images/detail-grey-sm.jpg',
      alt: 'A far mountain range fading into low cloud.',
      credit: 'Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'The far range',
      aspect: 'tall',
    },
    {
      src: '/images/detail-wood.jpg',
      sm: '/images/detail-wood-sm.jpg',
      alt: 'Dense forest underfoot in the Gilgit-Baltistan hills.',
      credit: 'Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Under the pines',
      aspect: 'square',
    },
    {
      src: '/images/gilgit-1.jpg',
      sm: '/images/gilgit-1-sm.jpg',
      alt: 'Clouds moving through the Gilgit-Baltistan highlands.',
      credit: 'Gilgit-Baltistan — Unsplash (stock)',
      provenance: atmosphere,
      caption: 'Weather coming in',
      aspect: 'tall',
    },
  ],

  // Final CTA
  cta: {
    src: '/images/cta.jpg',
    sm: '/images/cta-sm.jpg',
    alt: 'Clouds breaking over a snow-covered Karakoram range.',
    credit: 'Karakoram, Gilgit-Baltistan — Unsplash (stock, not the Duroyo property)',
    provenance: atmosphere,
  },
}

/** Flat list used by the credits/attribution footer note. */
export const allImages = [
  ...Object.values(images)
    .flatMap((v) => (Array.isArray(v) ? v : v.src ? [v] : []))
    .map((i) => i.credit),
].filter((c, idx, a) => a.indexOf(c) === idx)

/** Brand marks extracted from the supplied brass plate. */
export const brand = {
  monogram: { gold: '/brand/monogram-gold.png', cream: '/brand/monogram-cream.png' },
  wordmark: { gold: '/brand/wordmark-gold.png', cream: '/brand/wordmark-cream.png' },
  lockup: { gold: '/brand/lockup-gold.png', cream: '/brand/lockup-cream.png' },
  plate: '/brand/brass-plate.jpg',
}
