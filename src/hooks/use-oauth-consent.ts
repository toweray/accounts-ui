import { useAtom } from 'jotai'
import { oauthConsentAtom } from '@/jotai/atoms/oauth-consent'

const consentKey = (clientId: string, scope: string): string => {
  return `${clientId}:${scope}`
}

export const useOAuthConsent = (userId: string) => {
  const [store, setStore] = useAtom(oauthConsentAtom)
  const userKey = `user_${userId}`

  const isApproved = (clientId: string, scope: string): boolean => {
    return store[userKey]?.includes(consentKey(clientId, scope)) ?? false
  }

  const saveConsent = (clientId: string, scope: string) => {
    const entry = consentKey(clientId, scope)
    setStore(prev => {
      const entries = prev[userKey] ?? []
      if (entries.includes(entry)) return prev
      return { ...prev, [userKey]: [...entries, entry] }
    })
  }

  const revokeConsent = (clientId: string) => {
    setStore(prev => ({
      ...prev,
      [userKey]: (prev[userKey] ?? []).filter(
        k => !k.startsWith(`${clientId}:`)
      )
    }))
  }

  return { isApproved, saveConsent, revokeConsent }
}
