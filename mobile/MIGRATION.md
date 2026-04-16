# React Native migration (Expo)

This folder is the **native iOS/Android** app. The existing Vite + React DOM app remains in the repo root (`src/`) until feature parity is reached.

## What is done

- **Expo SDK 54** with **Expo Router** (file-based routes aligned with `src/router.tsx`).
- **TanStack Query** and **Zustand** wired in the root layout (same roles as web `App.tsx`).
- **Auth persistence** on `useAuthStore` via **AsyncStorage** (web used `localStorage` via zustand’s default).
- **Hydration gate** so persisted auth does not flash the wrong UI before rehydration.
- **Home shell** with a **bottom navigation** strip mirroring the five primary tabs from `AppLayout` (`home`, `photos`, `ai-camera`, `files`, `create`).
- **Auth flow (parity with web)** — `SplashPage` timing + logo, `LanguagePage` (i18n + docked footer), `LoginPage`, `OTPPage` (params + mock verify → onboarding). Shared pieces live under `mobile/src/` (`theme/colors`, `lib/i18n`, `AuthLayout`, `LanguageFlowLayout`, `JioLogo`, `PhoneInput`, `OTPInput`, `Button`, `LegalText`).
- **Onboarding** — `app/onboarding.tsx`: three slides from i18n, skip → gallery permission, CTA + chevron + `ProgressDots`, horizontal swipe (pan) between slides, stand-in slide art (web Figma PNGs not bundled).
- **Permissions** — `app/permission/gallery.tsx` uses **`expo-media-library`** (`requestPermissionsAsync`); `app/permission/notifications.tsx` uses **`expo-notifications`** (`requestPermissionsAsync`). Both match web copy/CTAs; **Skip** always advances the flow. `app.json` includes config plugins for iOS/Android permission strings.
- **Home** — `app/home/index.tsx` renders a native **`HomeScreen`** (`src/features/home/HomeScreen.tsx`) aligned with web `HomePage`: header (Jio lockup + search/profile), story rings, IPL theme rail (mosaic + hero + team logos + CTA), Memories / Send Wishes / Recent AI / Photos rails, storage banner + usage bar. Copy data from `src/data/homePageContent.ts` lives at `mobile/src/features/home/homeContent.ts`; images resolve via `mobile/assets/home/registry.ts` (bundled copies of `public/assets/…` produced during migration — re-copy if web assets change).
- **Tab routes under `/home/*`** — `search` → **`SearchScreen`** (TopBar, 16px search field, recent chips, empty state). `memories` → **`MemoriesScreen`** (mock grid like web). `profile` → **`ProfileScreen`** (avatar, phone, storage block, settings rows, **Sign out** → `logout` + `/`). `photos`, `create`, `files`, `ai-camera` → **`TabPlaceholderScreen`** (same chrome as web `AppTabPlaceholderLayout`; `files` omits the extra caption to mirror the minimal web copy). Shared **`TopBar`** lives in `mobile/src/components/layout/TopBar.tsx`.

## Route map (web → native)

| Web path | Native file |
|----------|----------------|
| `/` | `app/index.tsx` |
| `/language` | `app/language.tsx` |
| `/login` | `app/login.tsx` |
| `/otp` | `app/otp.tsx` |
| `/onboarding` | `app/onboarding.tsx` |
| `/permission/gallery` | `app/permission/gallery.tsx` |
| `/permission/notifications` | `app/permission/notifications.tsx` |
| `/home` | `app/home/index.tsx` |
| `/home/photos` (web `/home/albums` redirects here) | `app/home/photos.tsx` |
| `/home/ai-camera` | `app/home/ai-camera.tsx` |
| `/home/files` | `app/home/files.tsx` |
| `/home/create` | `app/home/create.tsx` |
| `/home/search` | `app/home/search.tsx` |
| `/home/memories` | `app/home/memories.tsx` |
| `/home/profile` | `app/home/profile.tsx` |

## How to run

From repo root:

```bash
npm run mobile
```

Or from `mobile/`:

```bash
npm run ios
npm run android
```

Use the **iOS Simulator**, **Android Emulator**, or **Expo Go** / a **dev client**. Fast Refresh replaces the Vite browser loop; there is no PWA or service worker on native.

## Suggested next steps (priority)

1. **Design system** — Replace ad hoc `StyleSheet` with NativeWind, Tamagui, or a small internal token layer so spacing/colors match Figma like the Tailwind web app.
2. **Screen ports** — For each page, swap DOM for RN primitives (`View`, `Text`, `Pressable`, `Image`, `ScrollView`, `FlatList`). Replace **Framer Motion** with **Reanimated** / **Moti** where needed.
3. **Navigation guard** — Reproduce auth/onboarding/permission ordering from the web flow using `useAuthStore` + redirects in layouts or a small navigator helper.
4. **APIs** — Replace `window` / `document` / PWA hooks (`useServiceWorker`, `usePWAInstall`) with native equivalents or remove where not applicable.
5. **Monorepo (optional)** — Extract `packages/shared` for types, API clients, and pure logic used by both `src/` (web) and `mobile/` until the web app is retired.

## Web-only code (do not port blindly)

- `vite-plugin-pwa`, service workers, `usePWAInstall`, `UpdatePrompt` as a web update UX.
- DOM-specific hooks (`useVisualViewportBottomInset`, `useStableViewportHeight`) — replace with `Keyboard`, `useWindowDimensions`, safe area, etc.
