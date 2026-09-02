# -*- coding: utf-8 -*-
import os, subprocess, sys

# Basic Latin + Latin-1 (Umlaute) + typografische Zeichen + ALLE benutzten Pfeile/Haken
UNICODES = ",".join([
    "U+0020-007E",          # Basic Latin
    "U+00A0-00FF",          # Latin-1: aeoeue AEOEUE ss, Grad, Copyright
    "U+0152-0153,U+0178",   # OE oe Ydieresis
    "U+2010-2015",          # Bindestriche, en/em dash
    "U+2018-201E,U+2032,U+2033",  # Anfuehrungszeichen, Prime
    "U+2020,U+2022,U+2026,U+2030",# Dagger, Bullet, Ellipsis, Promille
    "U+00B7",               # Mittelpunkt
    "U+20AC",               # Euro
    "U+2190,U+2191,U+2192,U+2193,U+2194,U+2195,U+2197,U+21B3,U+21BB,U+21BA",  # Pfeile inkl. Kreispfeil
    "U+2713,U+2714,U+2717",# Haken/Kreuz
    "U+2605,U+2606",       # Sterne
    "U+00D7,U+2212",       # mal, minus
])

SRC = "node_modules/@fontsource"
JOBS = [
    (f"{SRC}/fraunces/files/fraunces-latin-900-normal.woff2",        "public/fonts/fraunces-900.woff2"),
    (f"{SRC}/fraunces/files/fraunces-latin-900-italic.woff2",        "public/fonts/fraunces-900-italic.woff2"),
    (f"{SRC}/inter-tight/files/inter-tight-latin-400-normal.woff2",  "public/fonts/inter-tight-400.woff2"),
    (f"{SRC}/inter-tight/files/inter-tight-latin-500-normal.woff2",  "public/fonts/inter-tight-500.woff2"),
    (f"{SRC}/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", "public/fonts/jetbrains-mono-400.woff2"),
]

total_before = total_after = 0
for src, dst in JOBS:
    if not os.path.exists(src):
        print("FEHLT:", src); sys.exit(1)
    before = os.path.getsize(src)
    r = subprocess.run([sys.executable, "-m", "fontTools.subset", src,
        "--unicodes=" + UNICODES, "--flavor=woff2", "--layout-features=kern,liga,calt",
        "--output-file=" + dst], capture_output=True, text=True)
    if r.returncode != 0:
        print("FEHLER", src, r.stderr[:300]); sys.exit(1)
    after = os.path.getsize(dst)
    total_before += before; total_after += after
    print("%-34s %6d -> %6d B  (-%d%%)" % (os.path.basename(dst), before, after, 100 - after*100//before))
print("-" * 62)
print("GESAMT: %d B -> %d B  (gespart: %d B / %d KB)" % (total_before, total_after, total_before-total_after, (total_before-total_after)//1024))
