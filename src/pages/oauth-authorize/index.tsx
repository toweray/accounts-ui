import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OuterPage } from '@/components/layout/outer-page'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/api'
import type { OAuthClient } from '@/types'
import { ConsentScreen } from './components/consent-screen'

interface AuthorizeData {
  client: OAuthClient
  scopes: string[]
}

export const OAuthAuthorizePage = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<AuthorizeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams({
      client_id: searchParams.get('client_id') ?? '',
      redirect_uri: searchParams.get('redirect_uri') ?? '',
      response_type: searchParams.get('response_type') ?? 'code',
      scope: searchParams.get('scope') ?? '',
      state: searchParams.get('state') ?? ''
    })

    api(`/oauth/authorize?${params}`)
      .then(r => r.json())
      .then((body: AuthorizeData) => setData(body))
      .catch(() => setError('Invalid authorization request'))
      .finally(() => setLoading(false))
  }, [searchParams])

  return (
    <OuterPage>
      {loading && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}
      {!loading && error && (
        <p className="text-center text-destructive text-sm">{error}</p>
      )}
      {!loading && data && (
        <ConsentScreen
          client={data.client}
          scopes={data.scopes}
          searchParams={searchParams}
        />
      )}
    </OuterPage>
  )
}
