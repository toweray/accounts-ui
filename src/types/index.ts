export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = Exclude<Theme, 'system'>

export interface ApiError {
  code: string
  message: string
}

export interface User {
  id: string
  username: string
  email: string
  balance: number
  registered_at: string
}
