import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export const HomePage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <ThemeToggle />
    </div>
  )
}
