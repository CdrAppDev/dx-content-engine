---
name: landing-page
description: Generate a publication-ready landing page in DX Foundation voice from a feature-translator brief (or a raw feature input — in which case run the translator first). Target audience is a mid-market C-suite or VP buyer. Output is markdown structured for a B2B services landing page — outcome hero, problem framing, what-we-do, proof, CTA. Use when the user wants a landing page, marketing page, solution page, or "headline" content piece for a feature/capability/offering.
---

# Landing page

You are writing a publication-ready landing page in DX Foundation's voice.
This is the **canonical content artifact** for a given feature — every
downstream piece (blog, LinkedIn post, email) is generated *from* this LP,
not from the raw feature. So the positioning and claims here are the source
of truth.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`) and the feature-translator brief
that was generated upstream.

## Inputs

- A **feature-translator brief** (the structured markdown produced by
  `feature-translator`). This is the preferred input.
- If no brief is provided, run the `feature-translator` skill first on the
  raw input, then continue.

## Audience and register

- Reader: a C-suite or VP-level decision-maker at a mid-market commercial
  company (~$50M–$1B revenue). Any vertical, any function.
- They are skimming. Headlines and the first sentence of each section have
  to do the work.
- They will forward the URL to a peer. The page must stand on its own with
  no prior context.

## Page structure

Generate the page in this order, using markdown. Use `#` only for the page
title; everything else is `##` or `###`.

### 1. Hero

- **H1 (page title)**: A business-outcome promise in Title Case. **Not** the feature name. Format: "{Outcome verb} {business metric} {qualifying clause}." Examples that match the voice:
  - "Close Your Books Two Days Faster — Without Adding Headcount"
  - "Quote Complex Deals in Hours, Not Days"
  - "Stop Losing Revenue to Service Escalations"
- **Subhead (one sentence under the H1)**: The buyer's situation, in their words. Use second person. ~20–30 words.
- **Eyebrow above the H1**: The role this page is written for, in ALL CAPS with em-dash construction: "FOR FINANCE LEADERS" or "FOR HEADS OF OPERATIONS"
- **Primary CTA button text**: A verb-led action — "Talk to a strategist," "See how it works," "Get a 30-minute read."

### 2. The shift (problem → outcome)

Two short paragraphs:

- **Before**: The buyer's current reality, in their vocabulary. Concrete, not generic.
- **After**: What changes when this is in place. Quantified where the brief supports it.

End this section with a one-line bridge to "How we do it." Em dash.

### 3. How we approach it

3–4 short subsections, each one sentence to one short paragraph. This is
where the **strategy-first** positioning shows up — the page should make
clear that DX Foundation starts with the business case, not the platform.
Sample subsections (adapt to the feature):

- **Start with the metric that matters** — name the specific outcome you'd commit to before any technology decision
- **Pick the right tool, not the loudest one** — vendor-neutral framing; the relevant platform (Salesforce, Snowflake, etc.) appears here as the *current best choice*, not as the offering
- **Implement with senior practitioners** — the team in the pitch is the team in the build
- **Tie success to the business case** — the SOW closes on the outcome, not the launch date

### 4. What you can expect

A bulleted list of 4–6 concrete results-language outcomes the buyer can
reasonably expect, derived from the brief's "Outcome shift" section. Each
bullet leads with a verb and quantifies where possible.

### 5. Proof

Use one of:

- **If the brief lists real proof points** (case studies, named customers, supportable numbers): Pull 1–3 here in a clean format. Quote-style or stat-callout.
- **If proof points are placeholders or missing**: Skip this section entirely or replace with a single line: "Proof points and case studies available on request." Never fabricate.

### 6. Bad-fit signals (rare — use only when it sharpens the brand)

If the feature has clear bad-fit signals from the brief, add a small
"When this isn't right" subsection with 2–3 honest disqualifiers. This
reinforces strategy-first positioning ("we won't sell you something that
doesn't move the metric"). If unsure, omit.

### 7. Close + CTA

- One short paragraph re-stating the outcome promise in the buyer's terms.
- One CTA line with the button text again and an inline link placeholder
  (`{book-a-call-url}`).

## Voice rules (reiterated from `brand/voice.md`)

- Title Case for all headlines (H1, H2, H3)
- Sentence case for body, bullets, CTAs
- Em dashes chain consequences — use them
- No "leverage," "synergy," "robust," "seamless," "transformation" (alone), "best-in-class," "world-class," "next-generation," "cutting-edge"
- No emoji
- No exclamation points except in the warm CTA close
- **Platform names stay out of the body.** Target zero mentions of the specific vendor product (Salesforce, Manufacturing Cloud, Advanced Account Forecasting, Snowflake Unistore, etc.) in the visible page copy. Use generic functional terms instead — "your customer system," "a forecasting system," "the planning platform you already run." DXF pitches **business outcomes and strategic solutions**, not vendor products. The platform exists in the feature-brief (internal scaffolding) and shows up in the `discoverability` SEO/AEO bundle (metadata for search engines and AI answer engines). It does not belong in the body the buyer reads.
  - **Rare exception**: one oblique reference if the page absolutely depends on naming the underlying tool to make sense to a savvy reader. Even then, never in the H1, subhead, or first body paragraph.
  - **Competitor platform names** (e.g., listing SAP IBP, Anaplan, o9 as "if you already use these…"): also don't belong in the body. Re-frame as a business condition — "if you already run a mature dedicated planning system your team trusts" — not a vendor list.

## Output format

Pure markdown. Start with `# {H1}`. No preamble. No code fences around the
whole document. No "here is your landing page." Just the page.

## When rendering an HTML preview

If you're also rendering the LP as a standalone HTML file for visual review:

- **The LP is a content block, not a standalone website.** It gets embedded into the existing DXF marketing site, which already provides its own nav, footer, and chrome.
- **Output content only.** No top navigation. No site-level footer with the wordmark or "DX Foundation · Strategy First" tagline. No utility links. Start the body with the hero section; end it with the close CTA.
- **Keep design tokens.** Use the DXF type, color, and spacing tokens so the visual feels right — the assumption is the parent site uses the same tokens.
- This applies to one-off preview HTML in `output/{slug}/landing-page.html` as well as any export the web app generates.
