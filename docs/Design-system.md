# JioAIPhotos — Design system

This document describes the **in-code** design system for the Expo / React Native app: semantic colour tokens, motion, layout scaling, reusable components, and UI conventions. It stays aligned with **Figma: JioAIPhotos — Journeys** where noted.

**Canonical implementation**

| Area | Source |
|------|--------|
| Colour palettes (dark / light) | [`src/theme/palettes.ts`](../src/theme/palettes.ts) |
| Runtime theme hook | [`src/theme/useThemeColors.ts`](../src/theme/useThemeColors.ts) |
| Legacy static dark read | [`src/theme/colors.ts`](../src/theme/colors.ts) — deprecated for new UI; prefer `useThemeColors()` |
| Motion durations & easing | [`src/theme/motion.ts`](../src/theme/motion.ts) |
| Responsive scale (Figma 390pt baseline) | [`src/theme/layoutScale.ts`](../src/theme/layoutScale.ts) + [`useLayoutScale`](../src/hooks/useLayoutScale.ts) |
| Appearance persistence | [`src/store/themeStore.ts`](../src/store/themeStore.ts) |

---

## Principles

1. **Dark-first** — Default shell matches Figma dark canvas (`surface0` `#0C0D10`). Light mode uses the same **token roles** with values from `lightPalette`.
2. **Semantic tokens** — UI references `contentPrimary`, `primary600`, `surface2`, etc., not raw hex in feature code (exceptions: one-off gradients with documented Figma nodes).
3. **Accessibility** — Respect reduced motion where hooks exist (`usePrefersReducedMotion`). Primary `TextInput` flows should use **font size ≥ 16** on iOS to avoid unwanted zoom in hybrid contexts (see [`.cursor/rules/ios-input-no-zoom.mdc`](../.cursor/rules/ios-input-no-zoom.mdc)).
4. **Figma fidelity** — Complex icons may ship as exported SVG strings + `react-native-svg` `SvgXml`, with fills swapped for theme tokens (e.g. [`src/features/permissions/`](../src/features/permissions/)).

---

## Colour tokens

Tokens are defined on `AppThemeColors` in `palettes.ts`. Use **`useThemeColors()`** in components so light/dark toggles from Profile apply correctly.

### Surfaces & structure

| Token | Role |
|--------|------|
| `surface0` | App root / full-screen background |
| `surface2`, `surface3`, `surface4` | Elevated panels, cards, tracks |

### Brand & actions

| Token | Role |
|--------|------|
| `primary600`, `primary700` | Primary actions, pressed states |
| `primary200` | Softer brand accent |
| `jioTeal`, `jioTealLight`, `jioSplash` | Jio accents / splash-adjacent |

### Content

| Token | Role |
|--------|------|
| `contentPrimary` | Main text and primary icon fills |
| `contentSecondary` | Supporting copy |
| `contentTertiary` | De-emphasised / hints |

### Chrome & overlays

| Token | Role |
|--------|------|
| `glassTint`, `shellUnderlay`, `navShellBg` | Header / bottom nav glass |
| `hairlineOnGlass` | Dividers on glass |
| `onBorder` | Outlined controls, search field border |
| `outlinePressed` | Outline button pressed wash |

### Feedback & danger

| Token | Role |
|--------|------|
| `error`, `dangerBg`, `dangerPressed` | Errors and destructive CTAs (`Button` `danger`) |

### Domain-specific (examples)

| Token | Role |
|--------|------|
| `buttonSecondaryBg`, `buttonSecondaryBgPressed` | Secondary pill (`Button` `secondary`) |
| `searchInputBg`, `searchInputBorder` | Search field |
| `onPhotoHigh`, `onPhotoMedium` | Text on imagery / video tiles |
| `languageHeroDepthGradientEnd`, `languageHeroVignetteMid` | Language hero collage (Figma `683:15305`) |

**Root canvas sync** — `DARK_MODE_ROOT_BACKGROUND` / `app.json` web background should stay aligned with `surface0` (documented in `palettes.ts`).

---

## Typography & type scale

There is no separate typography token file yet. Patterns in the codebase:

- **Buttons** — `useLayoutScale` → `ms(16)` (or `ms(14)` for `sm`); line height ≈ `fontSize * 1.2`; label weight `600` ([`Button.tsx`](../src/components/atoms/Button.tsx)).
- **Screens** — Section titles and body sizes are declared per screen or in content modules (e.g. [`homeContent.ts`](../src/features/home/homeContent.ts)); prefer **`useThemeColors()`** for colour, and `ms` / `moderateSize` when scaling from a 390pt Figma layout.
- **Forms** — Keep `TextInput` **fontSize ≥ 16** on primary flows (workspace rule above).

---

## Motion

From [`src/theme/motion.ts`](../src/theme/motion.ts):

| Name | Value / use |
|------|----------------|
| `motionDuration.fast` | 200 ms |
| `motionDuration.normal` | 280 ms |
| `motionDuration.slow` | 420 ms |
| `stackTransitionMs` | Native stack default duration (Android) |
| `homeTabFadeDurationMs` | Home tab `Stack` fade (longer on iOS) |
| `motionEasing` | `outCubic`, `inOutQuad`, `standard` (Reanimated) |
| `motionSpring.press` / `pressReduced` | `PressableScale` feedback |
| `pressScaleDefault` | `0.96` scale on press |
| `scrollRevealRangePx`, `scrollRevealTranslateMax`, `scrollRevealOpacityMin` | Scroll-linked section reveal on Home |

Prefer these constants over magic numbers when adding transitions.

---

## Layout & scaling

- **Design reference width:** `390` pt (`BASE_DESIGN_WIDTH`).
- **`scaleSize(size, screenWidth)`** — Full proportional scaling.
- **`moderateSize(size, screenWidth, factor?)`** — Softer scaling for type and controls that should not jump as much on large phones / tablets.

Use the **`useLayoutScale()`** hook in components that need `ms()` / layout-aware values (see `Button`).

---

## Components

Shared UI lives under **`src/components/`**. Prefer extending these before adding one-off duplicates.

### Atoms

| Component | Path | Notes |
|-----------|------|--------|
| **Button** | [`atoms/Button.tsx`](../src/components/atoms/Button.tsx) | Variants: `primary`, `secondary`, `outline`, `danger`. Sizes: `pill`, `md`, `sm`. Uses `PressableScale`, `useThemeColors`, `useLayoutScale`. |

### Molecules

| Component | Path | Notes |
|-----------|------|--------|
| **ChevronRight** | [`molecules/ChevronRight.tsx`](../src/components/molecules/ChevronRight.tsx) | |
| **JioLogo** | [`molecules/JioLogo.tsx`](../src/components/molecules/JioLogo.tsx) | Sizes include `splash` |
| **JioProductMark** | [`molecules/JioProductMark.tsx`](../src/components/molecules/JioProductMark.tsx) | |
| **LegalText** | [`molecules/LegalText.tsx`](../src/components/molecules/LegalText.tsx) | Auth footers |
| **OTPInput** | [`molecules/OTPInput.tsx`](../src/components/molecules/OTPInput.tsx) | OTP cells |
| **PhoneInput** | [`molecules/PhoneInput.tsx`](../src/components/molecules/PhoneInput.tsx) | Login |
| **ProgressDots** | [`molecules/ProgressDots.tsx`](../src/components/molecules/ProgressDots.tsx) | Onboarding |
| **LanguageCard** | [`molecules/LanguageCard.tsx`](../src/components/molecules/LanguageCard.tsx) | Language selection |

### Layout

| Component | Path | Notes |
|-----------|------|--------|
| **AuthLayout** | [`layout/AuthLayout.tsx`](../src/components/layout/AuthLayout.tsx) | Login / OTP shell, optional keyboard-aware footer |
| **HomeBottomNav** | [`layout/HomeBottomNav.tsx`](../src/components/layout/HomeBottomNav.tsx) | Main tab bar |
| **LanguageFlowLayout** | [`layout/LanguageFlowLayout.tsx`](../src/components/layout/LanguageFlowLayout.tsx) | |
| **TopBar** | [`layout/TopBar.tsx`](../src/components/layout/TopBar.tsx) | |

### Motion

| Component | Path | Notes |
|-----------|------|--------|
| **AnimatedScreen** | [`motion/AnimatedScreen.tsx`](../src/components/motion/AnimatedScreen.tsx) | Screen enter wrapper |
| **AnimatedSection** | [`motion/AnimatedSection.tsx`](../src/components/motion/AnimatedSection.tsx) | |
| **ScrollRevealSection** | [`motion/ScrollRevealSection.tsx`](../src/components/motion/ScrollRevealSection.tsx) | Home scroll reveal |
| **PressableScale** | [`motion/PressableScale.tsx`](../src/components/motion/PressableScale.tsx) | Press feedback |

### Other

| Component | Path | Notes |
|-----------|------|--------|
| **OnboardingSlideArt** | [`onboarding/OnboardingSlideArt.tsx`](../src/components/onboarding/OnboardingSlideArt.tsx) | |
| **NavBarGlyph** | [`navigation/NavBarGlyph.tsx`](../src/components/navigation/NavBarGlyph.tsx) | |
| **AuthHydrationGate** | [`system/AuthHydrationGate.tsx`](../src/components/system/AuthHydrationGate.tsx) | Wraps root navigation |

### Feature-level UI

Rich screens compose atoms/molecules with feature modules, e.g.:

- **Home** — [`src/features/home/`](../src/features/home/) (`HomeScreen`, headers, rails, skeleton; copy/assets in [`homeContent.ts`](../src/features/home/homeContent.ts)).
- **Permissions** — [`src/features/permissions/`](../src/features/permissions/) (Figma SVG helpers: `permissionHeroIconSvg.ts`, `permissionRowIconsSvg.ts`).

---

## Patterns & architecture

### Routing & shells

- **Root** — [`app/_layout.tsx`](../app/_layout.tsx): `GestureHandlerRootView`, `SafeAreaProvider`, TanStack `QueryClientProvider`, `AuthHydrationGate`, themed `Stack` (`headerShown: false`, platform stack animation).
- **Home tabs** — [`app/home/_layout.tsx`](../app/home/_layout.tsx): nested `Stack` with **fade** between routes + `HomeBottomNav`.

### Auth & state

- **Zustand** — [`authStore`](../src/store/authStore.ts), [`themeStore`](../src/store/themeStore.ts), [`homePreferencesStore`](../src/store/homePreferencesStore.ts) (home hero variant: Figma Option 1 vs legacy IPL rail).
- **Navigation helpers** — [`src/lib/authNavigation.ts`](../src/lib/authNavigation.ts).

### Copy & locales

- **i18n** — [`src/lib/i18n.ts`](../src/lib/i18n.ts), **`useTranslation()`** hook.

### Home content

- Section titles, subtitles, and rail items: [`homeContent.ts`](../src/features/home/homeContent.ts).
- **Home section titles** must stay **left-aligned** for main rails unless product overrides — see [`.cursor/rules/homepage-section-titles-left.mdc`](../.cursor/rules/homepage-section-titles-left.mdc).

### Icons from Figma

1. Export SVG from Figma (or Figma Desktop MCP asset URL during dev).
2. Store raw markup in a small `*.ts` module; replace `var(--fill-0, white)` (or equivalent) with a function argument for theme tint.
3. Render with **`SvgXml`** from `react-native-svg`.

---

## Screen map (high level)

| Area | Route(s) | Primary UI |
|------|-----------|--------------|
| Splash | `/` | [`app/index.tsx`](../app/index.tsx) |
| Language | `/language` | [`app/language.tsx`](../app/language.tsx) |
| Login / OTP | `/login`, `/otp` | [`app/login.tsx`](../app/login.tsx), [`app/otp.tsx`](../app/otp.tsx) |
| Onboarding | `/onboarding` | [`app/onboarding.tsx`](../app/onboarding.tsx) |
| Permission intro | `/permission` | [`PreAppPermissionScreen`](../src/features/permissions/PreAppPermissionScreen.tsx) |
| Home hub | `/home/*` | [`HomeScreen`](../src/features/home/HomeScreen.tsx), tabs, placeholders |
| Greeting detail | `/home/greeting/[id]` | [`GreetingDetailScreen`](../src/features/greetings/GreetingDetailScreen.tsx) — Figma `839:10412` |
| Home hero (AI Avatars) | `/home` | [`HomeIplRail`](../src/features/home/HomeIplRail.tsx) switches [`HomeIplRailOption1`](../src/features/home/HomeIplRailOption1.tsx) (Figma `1305:22351`) vs [`HomeIplRailLegacy`](../src/features/home/HomeIplRailLegacy.tsx) via Profile → Homepage options |

Deep links under `/permission/gallery` and `/permission/notifications` redirect home.

---

## Related documentation

| Doc | Purpose |
|-----|---------|
| [`README.md`](../README.md) | Project setup and run |
| [`MIGRATION.md`](../MIGRATION.md) | Architecture / migration notes |
| [`.cursor/rules/`](../.cursor/rules/) | AI / team guardrails (iOS inputs, home headers) |

---

## Maintaining this file

When you add or rename **tokens**, **motion** constants, or **shared components**, update this document in the same PR. For one-off Figma nodes, prefer a short comment in code **and** a single line here under “Figma references” if the asset is long-lived.

### Figma references (examples)

| Node / area | Code / asset |
|-------------|----------------|
| Language hero `683:15305` | `app/language.tsx`, `palettes` language hero tokens |
| Permission icons `683:15443`, `683:15463`, `683:15470` | `src/features/permissions/*Svg.ts` |
| Greetings detail `839:10412` (Jio AI Cloud — Temp) | `src/features/greetings/GreetingDetailScreen.tsx`, `greetingDetailContent.ts` |
| AI Avatars hero `1305:22351` (JioAIPhotos — Journeys) | `HomeIplRailOption1.tsx`, `HomeIplRailLegacy.tsx` |

---

*Last updated: design system doc introduced alongside existing `src/theme` and `src/components` structure.*
