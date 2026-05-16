import { atomWithStorage, createJSONStorage } from 'jotai/utils'

type ConsentStore = Record<string, string[]>

export const oauthConsentAtom = atomWithStorage<ConsentStore>(
  'oauth_consents',
  {},
  createJSONStorage<ConsentStore>(),
  { getOnInit: true }
)
