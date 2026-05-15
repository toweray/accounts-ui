import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { InnerPage } from '@/components/layout/inner-page'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route Component={InnerPage}>
        <Route index Component={HomePage} />
      </Route>
      <Route path="/login" Component={LoginPage} />
    </>
  )
)

export const AppRouter = () => <RouterProvider router={router} />
