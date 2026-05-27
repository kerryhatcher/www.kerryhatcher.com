#!/usr/bin/env python3
"""
Pull every post from the Ghost Content API at www.kerryhatcher.com and write
each one as a Jekyll _posts/YYYY-MM-DD-{slug}.html file with YAML frontmatter.

Usage:
    GHOST_CONTENT_KEY=xxxxx python3 scripts/import_ghost.py [--purge-placeholders]
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from typing import Any

API_BASE = "https://www.kerryhatcher.com/ghost/api/content/posts/"
PLACEHOLDER_POSTS = {
    "2026-05-27-opening-the-door.markdown",
    "2026-05-20-on-keeping-a-small-static-site.markdown",
    "2026-05-10-the-color-that-the-room-wants.markdown",
}


def fetch_all_posts(key: str) -> list[dict[str, Any]]:
    posts: list[dict[str, Any]] = []
    page = 1
    while True:
        params = {
            "key": key,
            "limit": "100",
            "page": str(page),
            "include": "tags,authors",
            "formats": "html",
            "order": "published_at desc",
        }
        url = f"{API_BASE}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(url, headers={
            "User-Agent": "kerryhatcher.com-ghost-importer/1.0",
            "Accept": "application/json",
            "Accept-Version": "v5.0",
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        posts.extend(payload.get("posts", []))
        pages = payload.get("meta", {}).get("pagination", {}).get("pages", 1)
        if page >= pages:
            break
        page += 1
    return posts


def yaml_escape(value: str) -> str:
    """Return a YAML-safe double-quoted scalar."""
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def build_frontmatter(post: dict[str, Any]) -> str:
    published = post.get("published_at") or post.get("created_at")
    title = post.get("title") or "Untitled"
    excerpt = post.get("custom_excerpt") or ""
    feature_image = post.get("feature_image") or ""
    feature_image_alt = post.get("feature_image_alt") or ""
    feature_image_caption = post.get("feature_image_caption") or ""
    tags = [t.get("name") for t in post.get("tags") or [] if t.get("name")]
    authors = [a.get("name") for a in post.get("authors") or [] if a.get("name")]
    canonical = post.get("canonical_url") or ""
    ghost_id = post.get("id") or ""
    slug = post.get("slug") or ""
    original_url = post.get("url") or f"https://www.kerryhatcher.com/{slug}/"

    lines = ["---", "layout: post"]
    lines.append(f"title: {yaml_escape(title)}")
    if excerpt:
        lines.append(f"dek: {yaml_escape(excerpt)}")
    if published:
        lines.append(f"date: {published}")
    if tags:
        lines.append("tags:")
        for t in tags:
            lines.append(f"  - {yaml_escape(t)}")
    if authors:
        lines.append("authors:")
        for a in authors:
            lines.append(f"  - {yaml_escape(a)}")
    if feature_image:
        lines.append(f"feature_image: {yaml_escape(feature_image)}")
    if feature_image_alt:
        lines.append(f"feature_image_alt: {yaml_escape(feature_image_alt)}")
    if feature_image_caption:
        lines.append(f"feature_image_caption: {yaml_escape(feature_image_caption)}")
    if canonical:
        lines.append(f"canonical_url: {yaml_escape(canonical)}")
    lines.append(f"ghost_id: {yaml_escape(ghost_id)}")
    lines.append(f"ghost_url: {yaml_escape(original_url)}")
    lines.append("---")
    lines.append("")
    return "\n".join(lines)


def filename_for(post: dict[str, Any]) -> str:
    published = post.get("published_at") or post.get("created_at") or ""
    date_part = published[:10] if published else datetime.utcnow().strftime("%Y-%m-%d")
    slug = post.get("slug") or "untitled"
    slug = re.sub(r"[^a-z0-9-]+", "-", slug.lower()).strip("-")
    return f"{date_part}-{slug}.html"


def normalize_body(html: str) -> str:
    """Strip the kg-card-begin/end HTML comment fences Ghost wraps around raw
    HTML blocks. The HTML inside still renders fine; the fences just clutter."""
    if not html:
        return ""
    html = re.sub(r"<!--\s*kg-card-begin:\s*html\s*-->\s*", "", html)
    html = re.sub(r"\s*<!--\s*kg-card-end:\s*html\s*-->", "", html)
    return html


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--purge-placeholders", action="store_true",
                        help="Delete the scaffolded placeholder posts before importing.")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print what would be written, don't touch files.")
    args = parser.parse_args()

    key = os.environ.get("GHOST_CONTENT_KEY")
    if not key:
        print("GHOST_CONTENT_KEY env var is required.", file=sys.stderr)
        return 1

    root = pathlib.Path(__file__).resolve().parent.parent
    posts_dir = root / "_posts"
    posts_dir.mkdir(exist_ok=True)

    if args.purge_placeholders and not args.dry_run:
        for name in PLACEHOLDER_POSTS:
            p = posts_dir / name
            if p.exists():
                p.unlink()
                print(f"removed placeholder: {p.name}")

    print("fetching posts...")
    posts = fetch_all_posts(key)
    print(f"got {len(posts)} posts")

    for post in posts:
        fname = filename_for(post)
        target = posts_dir / fname
        frontmatter = build_frontmatter(post)
        body = normalize_body(post.get("html") or "")
        content = frontmatter + body + "\n"
        if args.dry_run:
            print(f"would write {target.relative_to(root)} ({len(content)} bytes)")
        else:
            target.write_text(content, encoding="utf-8")
            print(f"wrote {target.relative_to(root)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
