#!/usr/bin/env python3
"""Gabungkan video senyap + suara dubbing + musik latar (auto-ducking) → out/*.mp4

  python3 mux.py            # pakai build/video.mp4 + build/audio/*.mp3 (kalau ada)
Tanpa audio dubbing, hasilnya = video + musik latar saja (preview).
"""
import argparse, json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).parent
BGM_LEN = 49.0  # panjang musik asli (detik)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out")
    ap.add_argument("--bgm-gain", type=float, default=0.5, help="volume musik latar sebelum ducking")
    args = ap.parse_args()
    tl = json.loads((ROOT / "build/timeline.json").read_text())
    total = tl["total"]
    voices = [s for s in tl["scenes"] if s["voice"] and (ROOT / s["voice"]).exists()]
    out = pathlib.Path(args.out) if args.out else ROOT / "out" / (
        "nihongo-michi-reels-dubbing.mp4" if voices else "nihongo-michi-reels-preview-tanpa-dubbing.mp4")
    out.parent.mkdir(exist_ok=True)

    cmd = ["ffmpeg", "-v", "error", "-y", "-i", str(ROOT / "build/video.mp4"),
           "-i", str(ROOT / "assets/bgm.m4a"), "-i", str(ROOT / "assets/bgm.m4a")]
    for s in voices:
        cmd += ["-i", str(ROOT / s["voice"])]

    f = []
    # musik latar: kalau video lebih panjang dari musiknya, sambung dengan crossfade lalu potong + fade out
    if total > BGM_LEN - 1:
        f.append("[1:a][2:a]acrossfade=d=2.5[bl]")
    else:
        f.append("[1:a]anull[bl]")
    f.append(f"[bl]atrim=0:{total},afade=t=in:d=0.8,afade=t=out:st={total - 2.5:.2f}:d=2.5,"
             f"volume={args.bgm_gain},aformat=sample_rates=44100:channel_layouts=stereo[bgm]")
    if voices:
        labels = []
        for k, s in enumerate(voices):
            ms = int((s["start"] + s["voiceOffset"]) * 1000)
            f.append(f"[{k + 3}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms}[v{k}]")
            labels.append(f"[v{k}]")
        f.append("".join(labels) + f"amix=inputs={len(voices)}:normalize=0:duration=longest,"
                 f"apad=whole_dur={total:.2f},atrim=0:{total}[voice]")
        f.append("[voice]asplit=2[vmix][vsc]")
        f.append("[bgm][vsc]sidechaincompress=threshold=0.025:ratio=9:attack=25:release=500:makeup=1[duck]")
        f.append("[duck][vmix]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9[aout]")
    else:
        f.append("[bgm]loudnorm=I=-16:TP=-1.5:LRA=9[aout]")
    cmd += ["-filter_complex", ";".join(f), "-map", "0:v", "-map", "[aout]",
            "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-t", f"{total:.2f}",
            "-movflags", "+faststart", str(out)]
    subprocess.run(cmd, check=True)
    print(f"{out}  ({out.stat().st_size / 1e6:.1f} MB, {total:.1f}s, voiced={bool(voices)})")


if __name__ == "__main__":
    main()
