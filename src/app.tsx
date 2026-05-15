import { Toaster } from 'sonner'
import { AppRouter } from './router'

export const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </>
  )
}
