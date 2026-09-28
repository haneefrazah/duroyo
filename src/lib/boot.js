/**
 * Boot signal.
 *
 * The loader owns the first paint, then flips this flag. The hero listens for
 * it so its entrance is choreographed against the loader's exit rather than
 * racing it. A plain module flag rather than context, because the two
 * components are siblings and never need to re-render each other.
 */
let booted = false
const listeners = new Set()

export function markBooted() {
  if (booted) return
  booted = true
  listeners.forEach((fn) => fn())
  listeners.clear()
}

export function isBooted() {
  return booted
}

/** Runs `fn` immediately if already booted, otherwise once on boot. */
export function onBoot(fn) {
  if (booted) {
    fn()
    return () => {}
  }
  listeners.add(fn)
  return () => listeners.delete(fn)
}
