import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { InnerPage } from '@/components/layout/inner-page'
import { Root } from '@/components/root'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { OAuthAuthorizePage } from '@/pages/oauth-authorize'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={Root}>
      <Route Component={InnerPage}>
        <Route index Component={HomePage} />
      </Route>
      <Route path="/login" Component={LoginPage} />
      <Route path="/oauth/authorize" Component={OAuthAuthorizePage} />
    </Route>
  )
)

export const AppRouter = () => <RouterProvider router={router} />
