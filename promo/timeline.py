#!/usr/bin/env python3
"""Hitung build/timeline.json dari script.json.

Kalau audio ElevenLabs per scene sudah ada (build/audio/<id>.mp3 + <id>.align.json),
durasi scene & waktu cue diambil dari audio asli. Kalau belum, dipakai estimasi
(15 karakter/detik) supaya animasi tetap bisa dirender sebagai preview.
"""
import json, pathlib, subprocess

ROOT = pathlib.Path(__file__).parent
BUILD = ROOT / "build"
FPS = 30
EST_CPS = 15.0


def probe_duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", str(path)],
        capture_output=True, text=True, check=True).stdout.strip()
    return float(out)


def build():
    script = json.loads((ROOT / "script.json").read_text())
    lead = script.get("lead", 0.3)
    t, scenes, voiced = 0.0, [], True
    for sc in script["scenes"]:
        text = sc["text"]
        mp3 = BUILD / "audio" / f"{sc['id']}.mp3"
        alignf = BUILD / "audio" / f"{sc['id']}.align.json"
        has_audio = mp3.exists()
        voiced = voiced and has_audio
        voice_dur = probe_duration(mp3) if has_audio else len(text) / EST_CPS
        align = json.loads(alignf.read_text()) if alignf.exists() else None
        cues = {}
        for name, needle in sc.get("cues", {}).items():
            idx = text.find(needle)
            if idx < 0:
                raise SystemExit(f"cue '{name}' ('{needle}') tidak ada di teks scene {sc['id']}")
            if align and idx < len(align["start"]):
                rel = align["start"][idx]
            else:
                rel = idx / len(text) * voice_dur
            cues[name] = round(lead + rel, 3)
        dur = max(sc["min"], lead + voice_dur + sc["tail"])
        scenes.append({
            "id": sc["id"], "start": round(t, 3), "dur": round(dur, 3),
            "voice": str(mp3.relative_to(ROOT)) if has_audio else None,
            "voiceOffset": lead, "voiceDur": round(voice_dur, 3), "cues": cues,
        })
        t += dur
    tl = {"fps": FPS, "total": round(t, 3), "voiced": voiced, "scenes": scenes}
    BUILD.mkdir(exist_ok=True)
    (BUILD / "timeline.json").write_text(json.dumps(tl, indent=1, ensure_ascii=False))
    return tl


if __name__ == "__main__":
    tl = build()
    print(f"total {tl['total']:.1f}s  voiced={tl['voiced']}")
    for s in tl["scenes"]:
        print(f"  {s['id']:8s} start {s['start']:6.2f}  dur {s['dur']:5.2f}  cues {s['cues']}")
