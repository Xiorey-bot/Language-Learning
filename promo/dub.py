#!/usr/bin/env python3
"""Generate voice-over ElevenLabs per scene (+ timestamp per karakter), lalu hitung ulang timeline.

Pakai:
  export ELEVENLABS_API_KEY=...        # JANGAN di-commit / ditulis ke file
  python3 dub.py                       # semua scene
  python3 dub.py --only hook --force   # ulang satu scene

Suara/model/setting ada di script.json (voice_id, model_id, voice_settings).
"""
import argparse, base64, json, os, pathlib, sys, urllib.error, urllib.request

import timeline

ROOT = pathlib.Path(__file__).parent
AUDIO = ROOT / "build" / "audio"


def tts(key, voice_id, payload):
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128",
        data=json.dumps(payload).encode(),
        headers={"xi-api-key": key, "Content-Type": "application/json", "User-Agent": "nihongo-michi-promo/1.0"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs HTTP {e.code}: {e.read().decode(errors='replace')[:600]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only"); ap.add_argument("--force", action="store_true")
    args = ap.parse_args()
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        sys.exit("Set dulu: export ELEVENLABS_API_KEY=...")
    script = json.loads((ROOT / "script.json").read_text())
    AUDIO.mkdir(parents=True, exist_ok=True)
    scenes = script["scenes"]
    for i, sc in enumerate(scenes):
        if args.only and sc["id"] != args.only:
            continue
        out = AUDIO / f"{sc['id']}.mp3"
        if out.exists() and not args.force:
            print(f"skip {sc['id']} (sudah ada)"); continue
        payload = {
            "text": sc["text"], "model_id": script["model_id"],
            "voice_settings": script["voice_settings"],
            # konteks tetangga supaya intonasi antar-scene nyambung
            **({"previous_text": scenes[i - 1]["text"]} if i > 0 else {}),
            **({"next_text": scenes[i + 1]["text"]} if i < len(scenes) - 1 else {}),
        }
        res = tts(key, script["voice_id"], payload)
        out.write_bytes(base64.b64decode(res["audio_base64"]))
        al = res["alignment"]
        (AUDIO / f"{sc['id']}.align.json").write_text(json.dumps(
            {"start": al["character_start_times_seconds"], "end": al["character_end_times_seconds"]}))
        print(f"ok   {sc['id']}  {out.stat().st_size // 1024} KB")
    tl = timeline.build()
    print(f"timeline: total {tl['total']:.1f}s, voiced={tl['voiced']}")


if __name__ == "__main__":
    main()
