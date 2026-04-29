#!/usr/bin/env bash
# Headless Chrome → assets/onboarding/onboarding-slide-{1,2,3}.png (910×1024).
# Requires: Google Chrome; layer PNGs under assets/ (from repo or Figma Desktop 127.0.0.1:3845 when authoring HTML).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
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

capture_one() {
  local name="$1"
  local html="$ROOT/scripts/${name}-figma-art.html"
  local out="$ROOT/assets/onboarding/${name}.png"
  if [[ ! -f "$html" ]]; then
    echo "Missing $html" >&2
    exit 1
  fi
  local tmp="/tmp/${name}-$$.png"
  "$CHROME" --headless --hide-scrollbars --disable-gpu --no-sandbox \
    --window-size=910,1024 \
    --force-device-scale-factor=1 \
    --screenshot="$tmp" \
    "file://$html" 2>/dev/null
  if [[ ! -f "$tmp" ]]; then
    echo "Chrome did not write $tmp for $name" >&2
    exit 1
  fi
  mv "$tmp" "$out"
  echo "Wrote $out ($(wc -c <"$out" | tr -d ' ') bytes)"
}

capture_one "onboarding-slide-1"
capture_one "onboarding-slide-2"
capture_one "onboarding-slide-3"
echo "All three onboarding slides captured."
