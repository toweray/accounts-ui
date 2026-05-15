import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { AuthRedirector } from './auth-redirector'
import { Spinner } from './ui/spinner'

const Preloader = () => (
  <div className="flex min-h-dvh items-center justify-center bg-background">
    <Spinner />
  </div>
)

export const Root = () => {
  const { syncAuth } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void syncAuth().finally(() => setLoading(false))
  }, [syncAuth])

  if (loading) return <Preloader />

  return (
    <>
      <AuthRedirector>
        <Outlet />
      </AuthRedirector>
      <ScrollRestoration />
    </>
  )
}
