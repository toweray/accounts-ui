import { type LucideIcon, MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import type { Theme } from '@/types'

type ThemeOption = {
  value: Theme
  Icon: LucideIcon
  key: string
}

const options: ThemeOption[] = [
  { value: 'light', Icon: SunIcon, key: 'Light' },
  { value: 'dark', Icon: MoonIcon, key: 'Dark' },
  { value: 'system', Icon: SunMoonIcon, key: 'System' }
]

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const current =
    options.find(o => o.value === theme) ??
    // biome-ignore lint/style/noNonNullAssertion: 'system' is always present in the static options array
    options.find(o => o.value === 'system')!
  const CurrentIcon = current.Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        {options.map(({ value, Icon, key }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={`mb-1 flex cursor-pointer items-center gap-2 last:mb-0 ${
              theme === value ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{key}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
