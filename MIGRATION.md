# React Native app (Expo)

This repository **is only the Expo / React Native app** (routes under `app/`, shared UI under `src/`). The former Vite + React DOM web client was removed from the repo; treat this document as history and parity notes versus that old web stack.

## What is done

- **Expo SDK 54** with **Expo Router** (file-based routes; former web router was `src/router.tsx` on Vite).
- **TanStack Query** and **Zustand** wired in the root layout (same roles as web `App.tsx`).
- **Auth persistence** on `useAuthStore` via **AsyncStorage** (web used `localStorage` via zustand’s default).
- **Hydration gate** so persisted auth does not flash the wrong UI before rehydration.
- **Home shell** with a **bottom navigation** strip mirroring the five primary tabs from `AppLayout` (`home`, `photos`, `ai-camera`, `files`, `create`).
- **Auth flow (parity with web)** — `SplashPage` timing + logo, `LanguagePage` (i18n + docked footer), `LoginPage`, `OTPPage` (params + mock verify → onboarding). Shared pieces live under `src/` (`theme/colors`, `lib/i18n`, `AuthLayout`, `LanguageFlowLayout`, `JioLogo`, `PhoneInput`, `OTPInput`, `Button`, `LegalText`).
- **Onboarding** — `app/onboarding.tsx`: three slides from i18n, skip → gallery permission, CTA + chevron + `ProgressDots`, horizontal swipe (pan) between slides, stand-in slide art (web Figma PNGs not bundled).
- **Permissions** — `app/permission/gallery.tsx` uses **`expo-media-library`** (`requestPermissionsAsync`); `app/permission/notifications.tsx` uses **`expo-notifications`** (`requestPermissionsAsync`). Both match web copy/CTAs; **Skip** always advances the flow. `app.json` includes config plugins for iOS/Android permission strings.
- **Home** — `app/home/index.tsx` renders **`HomeScreen`** (`src/features/home/HomeScreen.tsx`) aligned with the old web home: header (Jio lockup + search/profile), story rings, IPL theme rail (mosaic + hero + team logos + CTA), Memories / Send Wishes / Recent AI / Photos rails, storage banner + usage bar. Content lives in `src/features/home/homeContent.ts`; images resolve via `assets/home/registry.ts` (bundled static assets under `assets/home/`).
- **Tab routes under `/home/*`** — `search` → **`SearchScreen`**, `memories` → **`MemoriesScreen`**, `profile` → **`ProfileScreen`**, placeholders for `photos`, `create`, `files`, `ai-camera` via **`TabPlaceholderScreen`**. Shared **`TopBar`** lives in `src/components/layout/TopBar.tsx`.

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

From the repo root:

```bash
npm run dev
# or
npm run ios
npm run android
```

Use the **iOS Simulator**, **Android Emulator**, or **Expo Go** / a **dev client**. There is no Vite build or PWA in this repo anymore.

## Suggested next steps (priority)

1. **Design system** — Replace ad hoc `StyleSheet` with NativeWind, Tamagui, or a small internal token layer so spacing/colors match Figma like the old Tailwind web app.
2. **Screen ports** — For each page, swap DOM for RN primitives (`View`, `Text`, `Pressable`, `Image`, `ScrollView`, `FlatList`). Replace **Framer Motion** with **Reanimated** / **Moti** where needed.
3. **Navigation guard** — Reproduce auth/onboarding/permission ordering from the web flow using `useAuthStore` + redirects in layouts or a small navigator helper.
4. **APIs** — Replace `window` / `document` / PWA hooks (`useServiceWorker`, `usePWAInstall`) with native equivalents or remove where not applicable.
5. **Shared packages (optional)** — If a web client returns later, extract `packages/shared` for types, API clients, and pure logic shared across targets.

## Web-only code (do not port blindly)

- `vite-plugin-pwa`, service workers, `usePWAInstall`, `UpdatePrompt` as a web update UX.
- DOM-specific hooks (`useVisualViewportBottomInset`, `useStableViewportHeight`) — replace with `Keyboard`, `useWindowDimensions`, safe area, etc.
