import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import type { ResolvedTheme, Theme } from '@/types'

const themeStorage = createJSONStorage<Theme>()

export const themeAtom = atomWithStorage<Theme>(
  'theme',
  'system',
  themeStorage,
  {
    getOnInit: true
  }
)

const getSystemTheme = (): ResolvedTheme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const systemThemeAtom = atom<ResolvedTheme>(getSystemTheme())

systemThemeAtom.onMount = setAtom => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const listener = (e: MediaQueryListEvent) => {
    setAtom(e.matches ? 'dark' : 'light')
  }

  mediaQuery.addEventListener('change', listener)
  return () => mediaQuery.removeEventListener('change', listener)
}

export const resolvedThemeAtom = atom<ResolvedTheme>(get => {
  const theme = get(themeAtom)
  return theme === 'system' ? get(systemThemeAtom) : theme
})
