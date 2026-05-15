import { atom, type PrimitiveAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { User } from '@/types'

export const tokenAtom = atomWithStorage<string | null>(
  'token',
  null,
  undefined,
  {
    getOnInit: true
  }
)

export const userAtom = atom<User | null>(null) as PrimitiveAtom<User | null>

export const authErrorAtom = atom<string | null>(null) as PrimitiveAtom<
  string | null
>

export const isAuthenticatedAtom = atom(get => get(userAtom) !== null)
