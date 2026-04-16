# Jio AI Photos (native)

## Quick test (pick one)

From **repo root** (`JioAIPhotos/`) or from **`mobile/`** — same script names:

| Command | What it does |
|--------|----------------|
| **`npm run mobile:dev`** | Starts Expo with **`--clear`**. Then scan the QR in **Expo Go**. |
| **`npm run mobile:dev:ios`** | Same + **iOS Simulator** (Mac + Xcode). |
| **`npm run mobile:dev:android`** | Same + **Android emulator**. |

Inside **`mobile/`** you can also run **`npm run dev`** (same as `mobile:dev`).

**Note:** `npm run mobile:dev - clear` is not valid — the script already includes `--clear`. For a plain start without clearing Metro cache, use **`npm run start`** (in `mobile/`) or **`npm run mobile`** (from repo root).

See [MIGRATION.md](./MIGRATION.md) for the route map and migration notes.
