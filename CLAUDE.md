# CLAUDE.md

## Running Jekyll

This project has no native `jekyll` or `ruby` on PATH. The user's interactive
shell defines `jekyll` and `jbundle` as zsh functions (see
`~/.zshrc.d/jekyll.zsh`) that wrap `podman run` against
`docker.io/jekyll/jekyll:4`, mounting the working directory at `/srv/jekyll`
and installing gems under `./vendor/bundle`.

Those functions are not available in non-interactive subshells. To build or
serve from a tool/agent shell, invoke podman directly:

```bash
# Build
podman run --rm \
  --userns=keep-id \
  --volume "$PWD:/srv/jekyll:Z" \
  --workdir /srv/jekyll \
  --env BUNDLE_PATH=vendor/bundle \
  --entrypoint sh \
  docker.io/jekyll/jekyll:4 \
  -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll build; else /usr/gem/bin/jekyll build; fi'

# Serve (foreground; add -p mappings so the host can reach WEBrick)
podman run --rm \
  --userns=keep-id \
  --volume "$PWD:/srv/jekyll:Z" \
  --workdir /srv/jekyll \
  --env BUNDLE_PATH=vendor/bundle \
  -p 4000:4000 -p 35729:35729 \
  --entrypoint sh \
  docker.io/jekyll/jekyll:4 \
  -c 'if [ -f Gemfile ]; then bundle exec /usr/gem/bin/jekyll serve --host 0.0.0.0; else /usr/gem/bin/jekyll serve --host 0.0.0.0; fi'
```

Notes:
- Bypass the image's `/usr/jekyll/bin/jekyll` wrapper; it's broken for non-root.
  Call `/usr/gem/bin/jekyll` directly (the wrapper script does this).
- Always pass `--host 0.0.0.0` when serving — binding to `127.0.0.1` inside the
  container makes it unreachable through `-p` port forwarding.
- Drop `-it` for non-interactive runs (the user's wrapper includes `-it` for
  terminal use).
- For arbitrary `bundle` commands (e.g. `bundle install`, `bundle update`),
  use the same pattern with `--entrypoint bundle`.

## Project shape

- Jekyll 4 site, source at repo root, output to `_site/`.
- Layouts in `_layouts/`, partials in `_includes/`, posts in `_posts/`.
- Single SCSS entry at `assets/css/main.scss` (front-matter fences enable
  Jekyll's Sass converter — keep the leading `---` lines).
- See `DESIGN.md` for the visual system. Update it when the design changes.
- `wrangler.jsonc` indicates the built `_site/` is deployed to Cloudflare.
