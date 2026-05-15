import { useAuth } from '@/hooks/use-auth'

export const HomePage = () => {
  const { user } = useAuth()
  return (
    <div>
      <h1>Hello, {user.username}</h1>
    </div>
  )
}
