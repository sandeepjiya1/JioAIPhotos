import { RouterProvider } from 'react-router-dom'
import { router } from '@/browserRouter'

export function AppRouter() {
  return <RouterProvider router={router} />
}
