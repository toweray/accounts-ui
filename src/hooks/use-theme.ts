import { useAtom, useAtomValue } from 'jotai'
import { resolvedThemeAtom, themeAtom } from '@/jotai/atoms/theme'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const resolved = useAtomValue(resolvedThemeAtom)

  return { theme, setTheme, resolved }
}
