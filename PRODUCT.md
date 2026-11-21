# PRODUCT.md — kerryhatcher.com

<!-- impeccable:product-schema 1 -->

## Platform

web

## Capabilities and Constraints

A personal site and writing space at www.kerryhatcher.com. Built with Astro (static output), deployed as a static site on Cloudflare.

Readers can browse a paginated archive or follow the RSS feed. Posts can include source links, photos, charts, code examples, and embeds. The publishing workflow uses the source files in `src/content/posts/` and the Astro static build.

## Users

Two real audiences, both arriving from a specific link in a Facebook share, a forwarded SMS, a citation in local press, or a referral from another technical post. Neither came for a tour.

- **Civic readers.** Bibb County parents, voters, school district staff, and local reporters who landed on a BCSD budget analysis, a transparency post, or a piece in the *Better Schools, Brighter Futures* series. Often on a phone, often older, often skeptical, often deciding in the first paragraph whether the piece is worth the next ten minutes.
- **Technical readers.** Engineers, sysadmins, and hobbyists who landed on a Python/Linux/Rust note, a gear review, or a privacy walkthrough. Usually on a laptop, usually scanning for the part they need, usually willing to read further if the writing earns it.

A secondary audience: Kerry, who will write here often enough that opening a draft and publishing needs to feel inviting rather than ceremonial.

## Product Purpose

A durable, self-owned record of careful work — civic analysis, technical notes, and field reports — that a first-time visitor reads and walks away thinking, *this person thinks carefully and shows their work*. Credibility through evidence, not warmth or charisma. The site succeeds when a reader sent here for one piece reads two.

## Positioning

Kerry publishes local civic analysis, technical notes, and field reports under one byline. The civic writing shows its work through public records, source links, and the calculations behind its conclusions.

## Operating Context

Civic readers often open a single article on a phone from a shared link, then consult the source or print the piece for a meeting. Technical readers often arrive at a specific post to find a procedure or example. Kerry authors and publishes the site from the repository.

## Evidence on Hand

- The FY27 BCSD budget analysis in `src/content/posts/` contains a millage comparison and links to board materials and a meeting recording.
- *Trust, Then Verify* documents a voter-registration address review with maps and methodology.
- Technical walkthroughs and original field photography are available in `src/content/posts/` and `public/assets/`.

## Brand Commitments

Three concrete words: **deliberate, warm, evidence-led.** Not "modern" or "elegant." Closer to: a well-printed indie zine that argues its point from primary sources; a letter you actually wanted to receive; a workshop with the door open and the math on the whiteboard.

## Anti-references

What this site is explicitly **not**:

- **Not a SaaS landing page.** No hero metric, no feature grid, no CTA-above-the-fold.
- **Not a magazine clone.** No drop caps, no italic Fraunces display, no broadsheet grid as scaffolding.
- **Not a developer-portfolio dark mode.** No green-on-black terminal aesthetic for its own sake.
- **Not a default blog-theme aesthetic** (Minima, Chirpy, Hydejack). Those are templates; this is identity.
- **Not a campaign site.** No endorsement bars, no donate CTAs, no yard-sign red/white/blue palette, no "meet Kerry" bio block in the hero. The school board run is acknowledged when it's the subject of a post, not the frame of the site.
- **Not a Substack/Medium author template.** No giant author avatar + name + Subscribe stack at the top of every post. No "X subscribers" social proof. No paywall chrome.
- **Not a local-news-site aesthetic.** No cluttered sidebars, no "recent comments" widgets, no "most-read this week," no dated WordPress chrome.

## Product Principles

- **Reading wins.** Long-form posts get the best typography, the widest margins, the calmest treatment. Every other surface defers to that one.
- **Show the work.** The site should make it easy to cite a source, link a public record, embed a chart with the raw numbers, or footnote a methodology. Credibility is the through-line; design choices that obscure provenance fail the brief.
- **One author, plural subjects.** Civic, technical, and personal posts share one byline, one shell, one type system. No category silos. The mix is the point.
- **Earned over urgent.** "When they're ready, not when a schedule says so." No newsletter ceremony, no engagement bait, no FOMO patterns, no popups. Pace is part of the brand.
- **Hosted, not platform.** This is a self-owned space. Design choices reflect editorial control: no third-party widgets that change under us, no analytics that surveil readers, no embeds that hijack the page.

## Accessibility & Inclusion

WCAG 2.2 AA across the site, mobile-first (civic readers arrive on phones via Facebook/SMS). Reduced motion respected throughout — every animation has a no-motion path.

Two additional commitments shaped by the audience:

- **Print and PDF legibility.** Long civic posts get printed and forwarded in meetings. A deliberate print stylesheet (readable type at A4/Letter, hidden chrome, working links rendered as URLs) is part of the design, not an afterthought.
- **Dyslexia-friendly affordances.** Given a meaningful SPED-parent readership (and Kerry's own background), the body type, line length, and contrast should support readers who tire on long passages. The post footer provides a reader-mode toggle that persists the alternate body font across pages.
