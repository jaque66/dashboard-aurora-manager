#!/usr/bin/env python3
"""Tworzy wbudowana kopie Aurory (payload/aurora-payload.tar.gz) z biezacego HA - uruchom przed zbudowaniem dodatku."""
import os, sys, shutil
here = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault("JM_CONFIG_DIR", "/homeassistant"); os.environ.setdefault("JM_DATA", "/tmp/jmdata")
sys.path.insert(0, os.path.join(here, "aurora_manager", "app"))
import manager as s
dest = os.path.join(here, "aurora_manager", "payload")
os.makedirs(dest, exist_ok=True)
for f in os.listdir(dest):
    os.remove(os.path.join(dest, f))
n = s.make_archive(["www", "dash", "themes", "gen", "editor"], [d["url_path"] for d in s.dashboards() if d["jarvis"]], "wbudowana kopia", "aurora-payload", dest)
os.replace(os.path.join(dest, n), os.path.join(dest, "aurora-payload.tar.gz"))
print("payload:", os.path.getsize(os.path.join(dest, "aurora-payload.tar.gz")), "B")
