#!/usr/bin/env bash
# Satu perintah: (dubbing bila ELEVENLABS_API_KEY di-set) → render animasi → mix audio → out/*.mp4
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
[ -d build/screens ] || ./prep.sh
if [ -n "${ELEVENLABS_API_KEY:-}" ]; then python3 dub.py; else python3 timeline.py; fi
node render.mjs
python3 mux.py
