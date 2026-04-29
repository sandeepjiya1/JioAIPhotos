#!/usr/bin/env bash
# Renders scripts/onboarding-slide-4-figma-art.html in headless Chrome and writes
# assets/onboarding/onboarding-slide-4.png. Requires Figma Desktop running
# (local asset server on 127.0.0.1:3845) so image URLs load.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/scripts/onboarding-slide-4-figma-art.html"
OUT="$ROOT/assets/onboarding/onboarding-slide-4.png"
if [[ ! -f "$HTML" ]]; then
  echo "Missing $HTML" >&2
  exit 1
fi
CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  if [[ -x "$c" ]]; then CHROME="$c"; break; fi
done
if [[ -z "$CHROME" ]]; then
  echo "Install Google Chrome, or set CHROME to a Chromium binary." >&2
  exit 1
fi
if ! curl -sS -m 2 -o /dev/null "http://127.0.0.1:3845/assets/35face7c5fe4e010aa141e9b1a4ba480117da54f.svg"; then
  echo "Figma local assets not reachable (127.0.0.1:3845). Open Figma Desktop with the file, then retry." >&2
  exit 1
fi
URL="file://$HTML"
# Use /tmp to avoid odd TMPDIR path joining and Chrome not writing the file
TMP="/tmp/onboarding-slide-4-$$.png"
# --headless (not headless=new): reliable file write to --screenshot path on macOS
# Height must exceed Figma frame (405): slide art bleeds below due to negative CSS inset on avatars.
"$CHROME" --headless --hide-scrollbars --disable-gpu --no-sandbox \
  --window-size=360,520 \
  --force-device-scale-factor=2 \
  --screenshot="$TMP" \
  "$URL" 2>/dev/null
if [[ ! -f "$TMP" ]]; then
  echo "Chrome did not write screenshot. Try: $CHROME --headless --screenshot=/tmp/t.png file://$HTML" >&2
  exit 1
fi
BYTES="$(wc -c <"$TMP" | tr -d ' ')"
# With Figma Desktop serving 127.0.0.1:3845, PNGs are usually hundreds of KB; tiny files mean broken <img> sources.
if [[ "$BYTES" -lt 120000 ]]; then
  echo "Warning: screenshot is only ${BYTES} bytes — Figma local assets may have failed (open Figma Desktop on this file, then retry)." >&2
fi
mv "$TMP" "$OUT"
echo "Wrote $OUT (${BYTES} bytes)"
