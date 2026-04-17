# Jio AI Photos (Expo / React Native)

This repository is an **Expo SDK 54** app using **Expo Router** (file-based routes under `app/`).

## Prerequisites

- Node.js 20+
- For iOS: Xcode (macOS)
- For Android: Android Studio + emulator or device

## Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Metro with cache cleared (`expo start --clear`). |
| `npm run start` | Start Metro without forcing cache clear. |
| `npm run ios` / `npm run android` | Open simulator / emulator. |
| `npm run dev:ios` / `npm run dev:android` | Clear cache + open platform. |
| `npm run lint` | ESLint on `app/` and `src/`. |

Scan the QR code in **Expo Go** after `npm run dev`, or use a dev build.

Historical notes about the earlier Vite web app live in [MIGRATION.md](./MIGRATION.md).
