import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

const publicRoutes = ['/login']

interface AuthRedirectorProps {
  children: ReactNode
}

export const AuthRedirector = ({ children }: AuthRedirectorProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const isPublicRoute = publicRoutes.includes(location.pathname)

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isAuthenticated && isPublicRoute) {
    return <Navigate to={location.state?.from ?? '/'} replace />
  }

  return children
}
