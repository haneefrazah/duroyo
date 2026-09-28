/**
 * Curtain transition.
 *
 * A single overlay instance registers itself here; anything that wants to
 * move between sections hands a callback to `playTransition`. The curtain
 * closes, the callback runs behind it, then it lifts.
 *
 * If no curtain is mounted the callback runs directly, so navigation never
 * depends on this being wired up.
 */
let runner = null

export function registerTransition(fn) {
  runner = fn
  return () => {
    if (runner === fn) runner = null
  }
}

export function playTransition(fn) {
  if (runner) runner(fn)
  else fn()
}
