import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/components/layout'
import { Spinner } from '@/components/atoms'

// ── Auth pages ───────────────────────────────────────────────────────────────
const SplashPage               = lazy(() => import('@/pages/auth/SplashPage').then((m)               => ({ default: m.SplashPage })))
const LanguagePage             = lazy(() => import('@/pages/auth/LanguagePage').then((m)             => ({ default: m.LanguagePage })))
const LoginPage                = lazy(() => import('@/pages/auth/LoginPage').then((m)                => ({ default: m.LoginPage })))
const OTPPage                  = lazy(() => import('@/pages/auth/OTPPage').then((m)                  => ({ default: m.OTPPage })))
const OnboardingPage           = lazy(() => import('@/pages/auth/OnboardingPage').then((m)           => ({ default: m.OnboardingPage })))
const GalleryPermissionPage    = lazy(() => import('@/pages/auth/GalleryPermissionPage').then((m)    => ({ default: m.GalleryPermissionPage })))
const NotificationPermissionPage = lazy(() => import('@/pages/auth/NotificationPermissionPage').then((m) => ({ default: m.NotificationPermissionPage })))

// ── App pages ────────────────────────────────────────────────────────────────
const HomePage     = lazy(() => import('@/pages/app/HomePage').then((m)     => ({ default: m.HomePage })))
const AlbumsPage   = lazy(() => import('@/pages/app/AlbumsPage').then((m)   => ({ default: m.AlbumsPage })))
const SearchPage   = lazy(() => import('@/pages/app/SearchPage').then((m)   => ({ default: m.SearchPage })))
const MemoriesPage = lazy(() => import('@/pages/app/MemoriesPage').then((m) => ({ default: m.MemoriesPage })))
const ProfilePage  = lazy(() => import('@/pages/app/ProfilePage').then((m)  => ({ default: m.ProfilePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m)     => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-dvh bg-surface-0">
      <Spinner size="lg" />
    </div>
  )
}

function wrap(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  // ── Splash — always the entry point every session ─────────────────────────
  { path: '/', element: wrap(SplashPage) },

  // ── Linear auth flow ──────────────────────────────────────────────────────
  { path: '/language',   element: wrap(LanguagePage) },
  { path: '/login',      element: wrap(LoginPage) },
  { path: '/otp',        element: wrap(OTPPage) },
  { path: '/onboarding', element: wrap(OnboardingPage) },

  // ── Permission screens (after onboarding, before home) ────────────────────
  { path: '/permission/gallery',       element: wrap(GalleryPermissionPage) },
  { path: '/permission/notifications', element: wrap(NotificationPermissionPage) },

  // ── Authenticated app ─────────────────────────────────────────────────────
  {
    path: '/home',
    element: <AppLayout />,
    children: [
      { index: true,      element: wrap(HomePage) },
      { path: 'albums',   element: wrap(AlbumsPage) },
      { path: 'search',   element: wrap(SearchPage) },
      { path: 'memories', element: wrap(MemoriesPage) },
      { path: 'profile',  element: wrap(ProfilePage) },
    ],
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
