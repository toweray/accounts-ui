import { ArrowRightLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/use-auth'
import { useOAuthConsent } from '@/hooks/use-oauth-consent'
import { approveOAuth } from '@/lib/oauth'
import type { OAuthClient, User } from '@/types'

type ConsentScreenProps = {
  client: OAuthClient
  scopes: string[]
  searchParams: URLSearchParams
}

const scopeLabels: Record<string, (user: User) => React.ReactNode> = {
  identity: () => 'Your user ID',
  profile: user => (
    <span className="flex items-center gap-2">
      Your username{' '}
      <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
        {user.username}
      </span>
    </span>
  ),
  email: user => (
    <span className="flex items-center gap-2">
      Your email address{' '}
      <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
        {user.email}
      </span>
    </span>
  )
}

const denyUrl = (searchParams: URLSearchParams): string => {
  const redirectUri = searchParams.get('redirect_uri') ?? ''
  const state = searchParams.get('state')
  const url = `${redirectUri}?error=access_denied`
  return state ? `${url}&state=${encodeURIComponent(state)}` : url
}

export const ConsentScreen = ({
  client,
  scopes,
  searchParams
}: ConsentScreenProps) => {
  const { user } = useAuth()
  const { isApproved, saveConsent } = useOAuthConsent(user.id)
  const [loading, setLoading] = useState(false)

  const clientId = searchParams.get('client_id') ?? ''
  const scope = searchParams.get('scope') ?? ''
  const redirectUri = searchParams.get('redirect_uri') ?? ''
  const state = searchParams.get('state') ?? ''

  const handleApprove = async () => {
    setLoading(true)
    try {
      const uri = await approveOAuth({ clientId, redirectUri, scope, state })
      saveConsent(clientId, scope)
      window.location.href = uri
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Unable to connect to server'
      )
    } finally {
      setLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once on mount
  useEffect(() => {
    if (isApproved(clientId, scope)) {
      handleApprove()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.toweray.com/head/${user.username}?size=128`}
            alt={user.username}
            width={48}
            height={48}
            className="rounded-lg"
            style={{ imageRendering: 'auto' }}
          />
          <ArrowRightLeftIcon className="size-4 text-muted-foreground/40" />
          <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
            <span className="font-medium text-muted-foreground text-xs">
              APP
            </span>
          </div>
        </div>

        <div className="text-center">
          <h4 className="font-semibold">{client.name}</h4>
          <p className="text-muted-foreground text-sm">
            is requesting access to your account
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/40 px-4 py-3">
        <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Requested permissions
        </p>
        <ul className="space-y-1">
          {scopes.map(scope => (
            <li key={scope} className="flex items-center gap-2 text-sm">
              <span className="size-1.5 shrink-0 rounded-full bg-foreground/40" />
              {scopeLabels[scope]?.(user) ?? scope}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full"
          size="lg"
          onClick={handleApprove}
          disabled={loading}
        >
          {loading && <Spinner />}
          {loading ? 'Loading...' : 'Allow access'}
        </Button>

        <Button variant="outline" className="w-full" size="lg" asChild>
          <a href={denyUrl(searchParams)}>Cancel</a>
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-xs">
        You can revoke access at any time in account settings
      </p>
    </div>
  )
}
