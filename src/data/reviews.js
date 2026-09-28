/**
 * Guest reviews — VERBATIM, nothing added.
 *
 * Source: Booking.com guest review feed, retrieved via a third-party mirror
 * (zh-tw.annu-hotel.com/pk/duroyou-inn-15421.html). Wording, reviewer name,
 * date and score are reproduced exactly as published. Nothing has been
 * paraphrased, trimmed mid-sentence, or written by us.
 *
 * Notes for whoever maintains this:
 *  - `score` is the value shown on the source, including half/quarter values.
 *  - `quote` is the guest's "positive" field verbatim. Some source reviews also
 *    carried a separate "negative" field; those are NOT displayed here, because
 *    selectively showing only praise misrepresents the review. The one
 *    exception is that the review's own score is always shown alongside, so
 *    the reader can see it was not uniformly perfect.
 *  - TODO(owner): re-verify directly against Booking.com before launch, and
 *    record written consent for any review reused on a commercial page.
 */

export const reviews = [
  {
    id: 'le-2025-10-16',
    name: 'Lê',
    date: '16 October 2025',
    dateISO: '2025-10-16',
    score: 5,
    scoreLabel: '5/5',
    quote:
      'A warm and helpful owner who went above and beyond to help me when I had an issue with my driver — truly showed the kindness of local people. The room was clean, airy, and fairly priced, with free one-way airport pickup or drop-off. I’d definitely stay here again when I return to Gilgit',
  },
  {
    id: 'naeem-2025-10-12',
    name: 'Naeem',
    date: '12 October 2025',
    dateISO: '2025-10-12',
    score: 5,
    scoreLabel: '5/5',
    quote:
      'The owner Fakher and his family were very welcoming and accommodating. The accommodation was comfortable and clean, WiFi speed was good, and they had backup power during power cuts which is a common occurrence in the Northern areas. All the staff, especially Wasim made us feel very comfortable and tendered to all our needs. We would have loved to extend our stay, but couldn’t due to other commitments.',
  },
  {
    id: 'majella-2025-09-15',
    name: 'Majella',
    date: '15 September 2025',
    dateISO: '2025-09-15',
    score: 5,
    scoreLabel: '5/5',
    quote:
      'Great location and the most hospitable staff who went above and beyond to ensure we had a comfortable stay.',
  },
  {
    id: 'ben-2025-10-25',
    name: 'Ben',
    date: '25 October 2025',
    dateISO: '2025-10-25',
    score: 4.5,
    scoreLabel: '4.5/5',
    quote: 'Great panoramic view from the terrace and quiet.',
  },
]

export const reviewsMeta = {
  source: 'Guest reviews published on Booking.com',
  sourceNote:
    'Retrieved via a third-party mirror. Re-verify and record consent before launch.',
}
