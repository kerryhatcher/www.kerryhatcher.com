#!/usr/bin/env python3
"""Fetch remote images referenced in _posts into assets/images/remote/ and
rewrite the source files to point at the local copies.

Scope: hatchdata.atl1.cdn.digitaloceanspaces.com and old.kerryhatcher.com.
Other hosts (wikimedia, cloudfront, static.ghost.org) are left as-is so
attribution stays accurate.

Idempotent: skips images already on disk; rewrites URLs that already point
locally are a no-op.

The image folder is gitignored — re-run this script after a fresh clone to
rehydrate the local image cache.
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import pathlib
import re
import sys
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS = ROOT / "_posts"
DEST = ROOT / "assets" / "images" / "remote"

# host -> (local subdir, optional URL prefix to strip from the path)
HOSTS = {
    "hatchdata.atl1.cdn.digitaloceanspaces.com": (
        "hatchdata",
        "/hatchdata/www-kerryhatcher-com/",
    ),
    "old.kerryhatcher.com": ("old", "/"),
}

_IMG_EXTS = r'jpg|jpeg|png|gif|webp|avif|svg|ico'
URL_RE = re.compile(
    r'https?://(?:' + '|'.join(re.escape(h) for h in HOSTS) + r')/[^"\'\s<>)]+?'
    r'(?:\.(?:' + _IMG_EXTS + r')|/thumbnail/[^/"\'\s<>)]+|/icon/[^/"\'\s<>)]+)'
    r'(?=["\'\s<>)]|$)',
    re.IGNORECASE,
)


def local_path_for(url: str) -> pathlib.Path:
    parsed = urllib.parse.urlparse(url)
    subdir, strip = HOSTS[parsed.netloc]
    path = parsed.path
    if strip and path.startswith(strip):
        path = path[len(strip):]
    path = path.lstrip("/")
    return DEST / subdir / path


def local_url_for(url: str) -> str:
    rel = local_path_for(url).relative_to(ROOT)
    return "/" + str(rel).replace("\\", "/")


def scan_urls() -> set[str]:
    urls: set[str] = set()
    for f in POSTS.glob("*"):
        if not f.is_file():
            continue
        text = f.read_text(encoding="utf-8", errors="replace")
        for m in URL_RE.finditer(text):
            urls.add(m.group(0))
    return urls


def download(url: str) -> tuple[str, str | None]:
    """Return (url, error). error is None on success."""
    dest = local_path_for(url)
    if dest.exists() and dest.stat().st_size > 0:
        return url, None
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "kerryhatcher-com/fetch"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        tmp = dest.with_suffix(dest.suffix + ".part")
        tmp.write_bytes(data)
        tmp.rename(dest)
        return url, None
    except Exception as e:  # noqa: BLE001
        return url, f"{type(e).__name__}: {e}"


def rewrite_posts(urls: set[str]) -> int:
    """Rewrite remote URLs to local paths in every post file. Returns count
    of files changed."""
    mapping = {u: local_url_for(u) for u in urls}
    changed = 0
    for f in POSTS.glob("*"):
        if not f.is_file():
            continue
        text = f.read_text(encoding="utf-8", errors="replace")
        new = text
        for remote, local in mapping.items():
            if remote in new:
                new = new.replace(remote, local)
        if new != text:
            f.write_text(new, encoding="utf-8")
            changed += 1
    return changed


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--no-rewrite", action="store_true",
                    help="Download only; do not modify post files.")
    ap.add_argument("--workers", type=int, default=8)
    args = ap.parse_args()

    urls = scan_urls()
    print(f"Found {len(urls)} unique remote image URLs in {POSTS}")
    if not urls:
        return 0

    ok = 0
    failures: list[tuple[str, str]] = []
    with cf.ThreadPoolExecutor(max_workers=args.workers) as pool:
        for i, (url, err) in enumerate(pool.map(download, sorted(urls)), 1):
            if err is None:
                ok += 1
            else:
                failures.append((url, err))
            if i % 25 == 0 or i == len(urls):
                print(f"  {i}/{len(urls)} ({ok} ok, {len(failures)} failed)")

    if failures:
        print(f"\n{len(failures)} downloads failed:")
        for url, err in failures[:20]:
            print(f"  {url}\n    {err}")
        if len(failures) > 20:
            print(f"  ... and {len(failures) - 20} more")

    if not args.no_rewrite:
        # Only rewrite for URLs that actually downloaded successfully, so a
        # partial run doesn't break the site for missing images.
        downloaded = urls - {u for u, _ in failures}
        changed = rewrite_posts(downloaded)
        print(f"\nRewrote URLs in {changed} post file(s).")

    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
