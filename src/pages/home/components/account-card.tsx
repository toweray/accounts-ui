import { UserIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export const AccountCard = () => {
  const { user } = useAuth()

  const registrationDate = new Date(user?.registered_at).toLocaleDateString()

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-muted">
            <UserIcon className="text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">Your account</CardTitle>
            <CardDescription className="text-xs">
              Account information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Username</span>
          <span className="font-medium">{user?.username}</span>

          <span className="text-muted-foreground">Registered</span>
          <span className="font-medium">{registrationDate}</span>
        </div>
      </CardContent>
    </Card>
  )
}
