#!/usr/bin/env bash
# Ekstrak bahan dari video asli: (1) layar aplikasi per frame, (2) musik latar.
set -euo pipefail
cd "$(dirname "$0")"
SRC="${1:-assets/original-reels.mp4}"
mkdir -p build/screens
# Layar aplikasi di dalam mockup HP (diinset supaya sudut bezel tidak ikut), 24fps, mulai detik 3.5
ffmpeg -v error -y -ss 3.5 -t 41 -i "$SRC" -vf "fps=24,crop=592:1224:244:661" -q:v 2 build/screens/s%04d.jpg
# Musik latar asli (sintesis) dipakai ulang sebagai bed di bawah suara
[ -f assets/bgm.m4a ] || ffmpeg -v error -y -i "$SRC" -vn -c:a aac -b:a 160k assets/bgm.m4a
echo "screens: $(ls build/screens | wc -l) frame"
