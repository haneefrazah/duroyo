/**
 * Single source of truth for hotel facts.
 *
 * ACCURACY RULE: every value here is either (a) supplied by the owner in the
 * brief, or (b) verified against a public listing. Nothing may be added without
 * owner confirmation. Anything uncertain is flagged with a TODO and omitted
 * from the UI rather than guessed.
 */

export const hotel = {
  name: 'Duroyo',
  nameLong: 'Duroyo Hotel',
  alternateNames: ['Duroyo Inn', 'Duroyou Inn'],
  tagline: 'A Stay in Gilgit',
  locationLine: 'Jutial · Gilgit · Gilgit-Baltistan',

  // Verified via public listings (eHotels / travelmyth / Google Hotels)
  address: {
    street: 'Public School & College Road, Near PTV Station, Jutial',
    locality: 'Gilgit',
    region: 'Gilgit-Baltistan',
    postalCode: '15100',
    country: 'Pakistan',
    countryCode: 'PK',
  },
  phone: '+92 355 4377740',
  phoneHref: 'tel:+923554377740',
  geo: { lat: 35.903488, lng: 74.356133 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Duroyo+hotel@35.90348809514,74.356132900963',

  // TODO(owner): no verified booking engine URL has been supplied.
  // The booking CTA renders as a non-navigating placeholder until this is set.
  bookingUrl: null,
  // TODO(owner): no official social profiles verified. Intentionally empty so
  // the footer omits them instead of linking to invented destinations.
  socials: [],
}

/** Confirmed by the owner in the brief. Keep in sync with CREDITS.md. */
export const amenities = [
  { icon: 'wifi', label: 'Wi-Fi' },
  { icon: 'car', label: 'Parking' },
  { icon: 'snowflake', label: 'Air conditioning' },
  { icon: 'trees', label: 'Garden' },
  { icon: 'sunset', label: 'Terrace' },
  { icon: 'waves', label: 'Seasonal outdoor pool' },
  { icon: 'utensils', label: 'Restaurant' },
  { icon: 'concierge', label: 'Room service' },
]

export const nav = [
  { label: 'Stay', href: '#stay' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Gilgit', href: '#gilgit' },
  { label: 'Location', href: '#location' },
]

/**
 * Gilgit-Baltistan surroundings shown in the "Your Base For Gilgit" section.
 *
 * These describe the REGION, not day trips sold by the hotel. Travel times,
 * tour durations and "Taj Mahal of Gilgit" naming were all left unverified and
 * are deliberately not shown. TODO(owner): replace with operator-approved copy
 * if specific excursions are offered.
 */
export const surroundings = [
  {
    key: 'nomal',
    title: 'Nomal Valley',
    blurb: 'The green river valley that opens the road north, and the closest thing to stillness you will find within minutes of Jutial.',
  },
  {
    key: 'baltit',
    title: 'Baltit Fort',
    blurb: 'Hunza’s old royal fort above the Indus, centuries of carving held in stone above a working river valley.',
  },
  {
    key: 'passu',
    title: 'Passu',
    blurb: 'Where the Karakoram road folds into the Hunza valley — a village of slopes, poplar and stone.',
  },
  {
    key: 'fairyMeadows',
    title: 'Fairy Meadows',
    blurb: 'A grass plateau beneath the peaks, reached on foot. Humid, wild, and entirely unlike the valley floor.',
  },
]

export const stats = [
  // Placeholder chips — deliberately not factual claims (no year, no rooms, no rating).
  { value: 'Gilgit-Baltistan', label: 'Setting' },
  { value: 'Jutial', label: 'Address' },
  { value: 'River valley', label: 'Views' },
]
