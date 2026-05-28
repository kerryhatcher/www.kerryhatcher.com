---
target: youtube embeds (latest article)
total_score: 31
p0_count: 0
p1_count: 1
timestamp: 2026-05-28T18-37-19Z
slug: s-2026-05-27-out-of-runway-the-fy27-bcsd-budget-md
---
# Critique: YouTube embed (kg-embed-card) in the FY27 BCSD budget post

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Lazy-loaded; play affordance clear. No poster-load skeleton. |
| 2 | Match System / Real World | 4 | Caption + title attr name the meeting precisely. |
| 3 | User Control and Freedom | 4 | No autoplay; fullscreen allowed; native controls. |
| 4 | Consistency and Standards | 2 | Mobile breaks 16:9; width/alignment differ from post images. |
| 5 | Error Prevention | 3 | n/a-ish; no broken-embed fallback. |
| 6 | Recognition Rather Than Recall | 4 | Recognizable YouTube UI + clear caption. |
| 7 | Flexibility and Efficiency | 3 | Lazy-load good; loads full YouTube (no facade). |
| 8 | Aesthetic and Minimalist Design | 2 | Desktop clean; mobile letterbox + column inset hurt. |
| 9 | Error Recovery | 3 | No fallback link if iframe fails. |
| 10 | Help and Documentation | 3 | Caption carries context. |
| **Total** | | **31/40** | **Good, with one P1 mobile bug** |

## Anti-Patterns Verdict

**LLM assessment:** Not AI slop. The embed uses the site's existing `kg-embed-card` convention, mono left-aligned caption, no decorative chrome. On brand.

**Deterministic scan:** `detect.mjs` on the built post returned `[]` (exit 0). No antipatterns. (Detector engine restored this session.)

**Visual overlays:** Firefox (playwright-cli) at 1280 and 390. Desktop: 720x405 true 16:9, centered, caption below. Mobile: 350x320 (ratio 1.09) - 16:9 broken.

## Overall Impression
Desktop is genuinely clean and on-brand. Two issues hold it back: a real mobile aspect-ratio bug (primary audience is on phones) and a left-edge alignment inconsistency against the post's images.

## Priority Issues

**[P1] Mobile player is not 16:9.** `.prose iframe { min-height: 320px }` (main.scss:1268, a rule for Ghost interactive maps) leaks onto the embed because `.kg-embed-card iframe` never resets it. At 350px wide the 16:9 height (197px) loses to the 320px floor, so the player renders 350x320 and letterboxes. PRODUCT.md names phones as the primary civic-reader device. Fix: add `min-height: 0` to `.kg-embed-card iframe`.

**[P2] Embed breaks the left-edge reading rhythm.** `.post__body > figure` promotes the embed into the `wide` grid zone, then the iframe is capped at 720px and centered. Result: the player sits inset 40px from the reading column's left edge (240 vs 280) and is narrower than the post's images (720 vs 800). Every other figure aligns flush-left; the video floats. Fix: either keep it in `main` flush-left at column width, or let it fill the `wide` zone.

**[P3] Privacy posture.** The standard `youtube.com/embed` host loads YouTube JS and sets cookies before any click (console shows YT cookie traffic on load). PRODUCT.md: "no embeds that hijack the page," "no analytics that surveil." Use `youtube-nocookie.com` or a click-to-load facade.

## Minor Observations
- Stale `width="200" height="113"` attributes (CSS overrides them; harmless but noise).
- No fallback `<a>` link inside the figure if the iframe is blocked.
- Caption left-aligns to the player edge (correct), but inherits the centered player's inset from the text column.

## Questions to Consider
- Should the video be a peer of the post's images (same width, same left edge), or deliberately set apart by centering?
- Is loading full YouTube on page load acceptable given the site's "hosted, not platform" stance?
