import { createStore } from 'jotai'
import { resolvedThemeAtom } from './atoms/theme'

export const store = createStore()

export const initThemeSync = () => {
  const sync = () => {
    const resolved = store.get(resolvedThemeAtom)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }

  sync()

  return store.sub(resolvedThemeAtom, sync)
}
