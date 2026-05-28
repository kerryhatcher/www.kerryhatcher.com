# Tasks for kerryhatcher.com (Jekyll → Cloudflare Workers Static Assets).
# See CLAUDE.md for why everything runs via podman.

set shell := ["bash", "-uc"]

jekyll_image := "docker.io/jekyll/jekyll:4"
host_port    := "4000"
lr_port      := "35729"

# Shared podman invocation (single line so `just` can interpolate it inline).
_pj := "podman run --rm --userns=keep-id --volume \"$PWD:/srv/jekyll:Z\" --workdir /srv/jekyll --env BUNDLE_PATH=vendor/bundle"

default:
    @just --list

# Verify posts don't contain duplicate <h1> headings (a11y guard).
check-headings:
    ./scripts/check-post-headings.sh

# Build the site into _site/ (development).
build: check-headings
    {{_pj}} --entrypoint sh {{jekyll_image}} -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll build --trace; else /usr/gem/bin/jekyll build --trace; fi'

# Build with JEKYLL_ENV=production (clears _site/ first).
build-prod: check-headings
    rm -rf _site
    {{_pj}} --env JEKYLL_ENV=production --entrypoint sh {{jekyll_image}} -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll build --trace; else /usr/gem/bin/jekyll build --trace; fi'

# Serve the site at http://127.0.0.1:4000 (foreground, no watch).
serve:
    {{_pj}} -p {{host_port}}:4000 -p {{lr_port}}:35729 --entrypoint sh {{jekyll_image}} -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll serve --host 0.0.0.0 --skip-initial-build --no-watch; else /usr/gem/bin/jekyll serve --host 0.0.0.0 --skip-initial-build --no-watch; fi'

# Serve with live-reload + watch (foreground).
watch:
    {{_pj}} -p {{host_port}}:4000 -p {{lr_port}}:35729 --entrypoint sh {{jekyll_image}} -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll serve --host 0.0.0.0 --livereload --livereload-port 35729; else /usr/gem/bin/jekyll serve --host 0.0.0.0 --livereload --livereload-port 35729; fi'

# Run `bundle <args>` inside the Jekyll image (e.g. `just bundle install`).
bundle *args:
    {{_pj}} --entrypoint bundle {{jekyll_image}} {{args}}

# Build (production) and deploy to Cloudflare Workers Static Assets.
deploy:
    scripts/deploy.sh

# Deploy without rebuilding (uses current _site/).
deploy-fast:
    scripts/deploy.sh --skip-build

# Build + validate the deploy without uploading.
deploy-check:
    scripts/deploy.sh --dry-run

# Remove _site/ and Jekyll caches.
clean:
    rm -rf _site .jekyll-cache .jekyll-metadata
