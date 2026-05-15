import { useAtom, useAtomValue } from 'jotai'
import { useCallback } from 'react'
import {
  authErrorAtom,
  isAuthenticatedAtom,
  tokenAtom,
  userAtom
} from '@/jotai/atoms/auth'
import { api } from '@/lib/api'
import type { ApiError, User } from '@/types'

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)
  const [error, setError] = useAtom(authErrorAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)

  const fetchMe = useCallback(async (): Promise<boolean> => {
    try {
      const response = await api('/users/@me')

      if (response.status === 401) {
        setToken(null)
        setUser(null)
        setError(null)
        return false
      }

      if (!response.ok) {
        const body = (await response.json()) as ApiError
        throw new Error(body.message)
      }

      const data: User = await response.json()
      setUser(data)
      setError(null)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot connect to server')
      return false
    }
  }, [setUser, setToken, setError])

  const syncAuth = useCallback(async () => {
    if (!token) {
      setError(null)
      return
    }
    await fetchMe()
  }, [token, fetchMe, setError])

  return {
    user: user!,
    token,
    error,
    isAuthenticated,
    setUser,
    setToken,
    syncAuth
  }
}
