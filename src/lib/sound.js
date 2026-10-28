import { useSyncExternalStore } from 'react'

// >>> CHANGED: new file. Shared sound state for the reels.
// muted   = visitor pressed mute (remembered for the session)
// blocked = browser refused audible autoplay (no click/tap yet). Videos play muted until the first click/tap/key, then switch to sound.
const KEY = 'reels-muted'
const read = () => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }
const save = (v) => { try { sessionStorage.setItem(KEY, v ? '1' : '0') } catch { /* storage blocked */ } }

let state = { muted: read(), blocked: false }
const subs = new Set()
const emit = () => { state = { ...state }; subs.forEach((f) => f()) }

export const toggleMute = () => { state.muted = !state.muted; save(state.muted); emit() }
export const setBlocked = (b) => { if (state.blocked !== b) { state.blocked = b; emit() } }
export const useSound = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => state)

if (typeof window !== 'undefined') {
  const unlock = () => setBlocked(false)
  ;['pointerdown', 'keydown', 'touchend'].forEach((e) => window.addEventListener(e, unlock, { passive: true }))
}