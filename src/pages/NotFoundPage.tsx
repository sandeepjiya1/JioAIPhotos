import { Link } from 'react-router-dom'
import { Button } from '@/components/atoms'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 px-6 text-center bg-surface-0">
      <p className="text-7xl font-bold text-surface-3">404</p>
      <h1 className="text-xl font-semibold text-content-primary">Page not found</h1>
      <p className="text-sm text-content-secondary text-balance">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Go home</Button>
      </Link>
    </div>
  )
}
