# Tasks for kerryhatcher.com (Astro static site → Cloudflare Workers Static Assets).
# Node tooling runs through bun. See CLAUDE.md.

set shell := ["bash", "-uc"]

default:
    @just --list

# Install dependencies.
install:
    bun install

# Verify posts don't contain duplicate <h1> headings (a11y guard).
check-headings:
    ./scripts/check-post-headings.sh

# Dev server with hot reload at http://localhost:4321.
dev:
    bun run dev

# Production build into dist/.
build: check-headings
    bun run build

# Serve the built dist/ at http://localhost:4321.
preview: build
    bun run preview

# Build, then run the Playwright suite (parity, behavior, visual) against dist/.
test:
    bun run test

# Run the Playwright suite against the existing dist/ (no rebuild).
test-only *args:
    bun run test:only {{args}}

# Build (production) and deploy to Cloudflare Workers Static Assets.
deploy:
    scripts/deploy.sh

# Deploy without rebuilding (uses current dist/).
deploy-fast:
    scripts/deploy.sh --skip-build

# Build + validate the deploy without uploading.
deploy-check:
    scripts/deploy.sh --dry-run

# Remove build output and caches.
clean:
    rm -rf dist .astro test-results playwright-report
