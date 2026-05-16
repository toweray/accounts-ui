import { api } from './api'

interface ApproveParams {
  clientId: string
  redirectUri: string
  scope: string
  state: string
}

export async function approveOAuth(params: ApproveParams): Promise<string> {
  const response = await api('/oauth/approve', {
    method: 'POST',
    body: {
      client_id: params.clientId,
      redirect_uri: params.redirectUri,
      scope: params.scope,
      state: params.state
    }
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.message ?? 'Authorization failed')
  }

  return body.redirect_uri
}
