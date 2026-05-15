import { useAtom, useAtomValue } from 'jotai'
import { isAuthenticatedAtom, tokenAtom, userAtom } from '@/jotai/atoms/auth'

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)

  return {
    user: user!,
    token,
    isAuthenticated,
    setUser,
    setToken
  }
}
