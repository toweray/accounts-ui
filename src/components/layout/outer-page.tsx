import type { ReactNode } from 'react'
import { Card } from '../ui/card'

interface OuterPageProps {
  children: ReactNode
}

export const OuterPage = ({ children }: OuterPageProps) => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted p-4 dark:bg-background">
      <Card className="w-full max-w-sm p-8">{children}</Card>
    </div>
  )
}
