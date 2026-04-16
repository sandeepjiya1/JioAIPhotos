/* Router config: lazy route map + `createBrowserRouter` (not a component-only module). */
/* eslint-disable react-refresh/only-export-components -- fast refresh does not apply to router tables */
import { lazy, Suspense, useEffect, useState } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout'
import { Spinner } from '@/components/atoms'
import { HomePageSkeleton } from '@/pages/app/HomePageSkeleton'

// ── Auth pages ───────────────────────────────────────────────────────────────
const SplashPage = lazy(() => import('@/pages/auth/SplashPage').then((m) => ({ default: m.SplashPage })))
const LanguagePage = lazy(() => import('@/pages/auth/LanguagePage').then((m) => ({ default: m.LanguagePage })))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const OTPPage = lazy(() => import('@/pages/auth/OTPPage').then((m) => ({ default: m.OTPPage })))
const OnboardingPage = lazy(() => import('@/pages/auth/OnboardingPage').then((m) => ({ default: m.OnboardingPage })))
const GalleryPermissionPage = lazy(() =>
  import('@/pages/auth/GalleryPermissionPage').then((m) => ({ default: m.GalleryPermissionPage })),
)
const NotificationPermissionPage = lazy(() =>
  import('@/pages/auth/NotificationPermissionPage').then((m) => ({ default: m.NotificationPermissionPage })),
)

// ── App pages ────────────────────────────────────────────────────────────────
const HomePage = lazy(() => import('@/pages/app/HomePage').then((m) => ({ default: m.HomePage })))
const AlbumsPage = lazy(() => import('@/pages/app/AlbumsPage').then((m) => ({ default: m.AlbumsPage })))
const SearchPage = lazy(() => import('@/pages/app/SearchPage').then((m) => ({ default: m.SearchPage })))
const AiCameraPage = lazy(() => import('@/pages/app/AiCameraPage').then((m) => ({ default: m.AiCameraPage })))
const FilesPage = lazy(() => import('@/pages/app/FilesPage').then((m) => ({ default: m.FilesPage })))
const CreatePage = lazy(() => import('@/pages/app/CreatePage').then((m) => ({ default: m.CreatePage })))
const MemoriesPage = lazy(() => import('@/pages/app/MemoriesPage').then((m) => ({ default: m.MemoriesPage })))
const ProfilePage = lazy(() => import('@/pages/app/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

/** Minimum time to show home skeleton (lazy-load UX testing). Set to 0 to disable. */
const HOME_SKELETON_MIN_MS = 1000

function HomePageWithMinSkeletonDelay() {
  const [minElapsed, setMinElapsed] = useState(HOME_SKELETON_MIN_MS <= 0)

  useEffect(() => {
    if (HOME_SKELETON_MIN_MS <= 0) return
    const id = window.setTimeout(() => setMinElapsed(true), HOME_SKELETON_MIN_MS)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (HOME_SKELETON_MIN_MS <= 0) return
    void import('@/pages/app/HomePage')
  }, [])

  if (!minElapsed) return <HomePageSkeleton />

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  )
}

function PageLoader() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-surface-0">
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
  { path: '/', element: wrap(SplashPage) },
  { path: '/language', element: wrap(LanguagePage) },
  { path: '/login', element: wrap(LoginPage) },
  { path: '/otp', element: wrap(OTPPage) },
  { path: '/onboarding', element: wrap(OnboardingPage) },
  { path: '/permission/gallery', element: wrap(GalleryPermissionPage) },
  { path: '/permission/notifications', element: wrap(NotificationPermissionPage) },
  {
    path: '/home',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePageWithMinSkeletonDelay /> },
      { path: 'photos', element: wrap(AlbumsPage) },
      { path: 'albums', element: <Navigate to="/home/photos" replace /> },
      { path: 'ai-camera', element: wrap(AiCameraPage) },
      { path: 'files', element: wrap(FilesPage) },
      { path: 'create', element: wrap(CreatePage) },
      { path: 'search', element: wrap(SearchPage) },
      { path: 'memories', element: wrap(MemoriesPage) },
      { path: 'profile', element: wrap(ProfilePage) },
    ],
  },
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
])
