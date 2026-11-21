#!/usr/bin/env bash
# Build the Astro site and deploy dist/ as a static-assets Worker.
#
# Worker name comes from wrangler.jsonc — defaults to "blog", which serves at
# blog.<account>.workers.dev.
#
# Usage:
#   scripts/deploy.sh                    # build + deploy
#   scripts/deploy.sh --skip-build       # deploy current dist/ as-is
#   scripts/deploy.sh --dry-run          # build + validate, no upload
#
# Environment:
#   CLOUDFLARE_API_TOKEN   API token with Workers:Edit (for non-interactive auth)
#   CLOUDFLARE_ACCOUNT_ID  Account ID (required with API token)
#   WRANGLER_VERSION       Pinned wrangler version when falling back to npx (default: 4)

set -euo pipefail

# Ensure Homebrew binaries (wrangler, etc.) are on PATH even when invoked
# from a non-login shell.
if [[ -d /home/linuxbrew/.linuxbrew/bin ]]; then
  PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
fi

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

WRANGLER_VERSION="${WRANGLER_VERSION:-4}"

SKIP_BUILD=0
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-build) SKIP_BUILD=1; shift ;;
    --dry-run)    DRY_RUN=1; shift ;;
    -h|--help)
      sed -n '2,15p' "$0"; exit 0 ;;
    *)
      echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

log() { printf '\033[1;34m==>\033[0m %s\n' "$*"; }

if [[ $SKIP_BUILD -eq 0 ]]; then
  log "Building Astro site for Cloudflare"
  rm -rf dist
  bun install --frozen-lockfile
  bun run build --mode cloudflare
else
  log "Skipping build (using existing dist/)"
fi

if [[ ! -d dist ]] || [[ -z "$(ls -A dist 2>/dev/null)" ]]; then
  echo "error: dist/ is missing or empty — nothing to deploy" >&2
  exit 1
fi

DEPLOY_ARGS=(deploy)
if [[ $DRY_RUN -eq 1 ]]; then
  DEPLOY_ARGS+=(--dry-run)
  log "Validating deploy (dry-run)"
else
  log "Deploying static-assets Worker"
fi

if command -v wrangler >/dev/null 2>&1; then
  exec wrangler "${DEPLOY_ARGS[@]}"
else
  exec npx --yes "wrangler@${WRANGLER_VERSION}" "${DEPLOY_ARGS[@]}"
fi
