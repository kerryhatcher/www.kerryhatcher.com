#!/usr/bin/env bash
# Guard against duplicate <h1> elements on post pages.
# The layout shell already emits <h1 class="post__title">; post bodies must
# start at <h2> (rendered from `##` in Markdown). See CLAUDE.md / DESIGN.md.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
status=0

# Markdown posts: body lines starting with "# " (single hash + space).
# We only look at lines after the closing frontmatter `---`, but in practice
# a leading "# " anywhere in a post body is wrong, so grep the whole file.
if md_hits=$(grep -nE '^# ' "$root"/_posts/*.md 2>/dev/null); then
  echo "ERROR: Markdown <h1> headings in post body (use ## instead):" >&2
  echo "$md_hits" >&2
  status=1
fi

# HTML posts: any <h1 tag in the body.
if html_hits=$(grep -nE '<h1[ />]' "$root"/_posts/*.html 2>/dev/null); then
  echo "ERROR: <h1> tags in HTML post body (shift to <h2>):" >&2
  echo "$html_hits" >&2
  status=1
fi

exit "$status"
