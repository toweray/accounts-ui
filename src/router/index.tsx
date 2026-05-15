import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { HomePage } from '@/pages/home'

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" Component={HomePage} />)
)

export const AppRouter = () => <RouterProvider router={router} />
