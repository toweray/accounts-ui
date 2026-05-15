import { store } from '@/jotai'
import { tokenAtom } from '@/jotai/atoms/auth'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

interface RequestInitOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: BodyInit | Record<string, unknown>
  headers?: Record<string, string>
}

// https://stackoverflow.com/a/8511350
const isObject = (value: unknown): boolean => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

const setHeader = (
  name: string,
  value: string,
  options: RequestInitOptions
) => {
  options.headers = { ...options.headers, [name]: value }
}

export const api = async (
  path: string,
  options: RequestInitOptions = {}
): Promise<Response> => {
  const token = store.get(tokenAtom)
  if (token) {
    setHeader('Authorization', `Bearer ${token}`, options)
  }

  setHeader('Accept', 'application/json', options)

  if (isObject(options.body) && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body)
    setHeader('Content-Type', 'application/json', options)
  }

  const url = `${API_ENDPOINT}${path}`
  return fetch(url, options as RequestInit)
}
