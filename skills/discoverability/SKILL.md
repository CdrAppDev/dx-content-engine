---
name: discoverability
description: Use this skill to produce the metadata bundle that makes a DX Foundation landing page findable by both search engines AND AI answer engines (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews). It generates title tags, meta descriptions, OG/Twitter cards, JSON-LD schema.org structured data, a TL;DR/abstract, AI-quotable sentences, an FAQ block, an entity definition table, an llms.txt entry suggestion, and internal-link hints — all from the LP itself. Trigger whenever the user mentions SEO, metadata, structured data, FAQ, schema, OG image, AEO, GEO, AI ingestion, "make this findable," "optimize this page," "how do I rank for this," or asks about getting their content cited by ChatGPT/Claude/etc. Auto-trigger after a landing page is generated even if the user doesn't explicitly ask — discoverability is part of "publication-ready."
---

# Discoverability

You produce the metadata that makes a landing page findable. You're working
in 2026, when search and "answer engines" (ChatGPT, Gemini, Claude,
Perplexity, Google AI Overviews) are converging into a single discovery
problem. A page needs to be both *rankable* by classic search and
*quotable* by LLM-powered answer surfaces. Most of the work overlaps, which
is why this is one skill instead of two.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

## Input

A published DX Foundation landing page in markdown — typically produced by
the `landing-page` skill. If the input isn't an LP (e.g., a blog post or
raw notes), still produce what you can but flag that the bundle is tuned
for landing pages.

If the user supplies a target URL, use it for canonical / OG / structured-
data fields. Otherwise leave a `{site-url}/{slug}` placeholder.

## What you produce

A single markdown document with these sections, in this order:

1. **Search metadata**
2. **Open Graph & Twitter**
3. **Structured data (JSON-LD)**
4. **TL;DR / abstract**
5. **AI-quotable sentences**
6. **FAQ block**
7. **Entity table**
8. **`llms.txt` entry**
9. **Internal link suggestions**

Every section must be **immediately copy-pasteable**. No "consider doing X."
This is a deliverable, not advice.

---

## Section specs

### 1. Search metadata

Output four labeled fields:

- **Title tag** — ≤60 characters. Should include the page's primary outcome promise plus the role or function it targets. Title Case. Example: `Close the Books Two Days Faster — for Finance Leaders`.
- **Meta description** — ≤160 characters. One sentence in DX Foundation voice. Active, outcome-led, no marketing fluff. No "Learn more" or "Discover how."
- **URL slug** — kebab-case, ≤6 words, outcome-led. No platform names unless they sharpen the meaning. Example: `close-books-faster-finance`.
- **Canonical hint** — the canonical URL, or a placeholder.

### 2. Open Graph & Twitter

- **og:title** — same as title tag or a slight variant under the same character budget
- **og:description** — same as meta description or a slight variant
- **og:image** — one-line description of the image to commission (e.g., "DX Foundation halftone cloud + four-point sparkles in red over cream; the LP's H1 set in Sora 800 — 1200×630")
- **twitter:card** — `summary_large_image`
- **twitter:title** and **twitter:description** — copy from og.

### 3. Structured data (JSON-LD)

A fenced ```json``` code block containing a single `<script type="application/ld+json">`-ready array. Always include:

- `Organization` for DX Foundation (name, url, logo, sameAs links)
- `WebPage` for the landing page itself
- `Article` if the content is article-style; `Service` if it's selling a service offering — pick based on the LP's framing
- `FAQPage` populated from the FAQ block (section 6) — this is the **single highest-ROI structured-data type** for AI ingestion, so always include it

If the LP mentions specific quantified outcomes, include `Claim` review markup for the most defensible one. Don't invent specifics — only mark up what's in the LP.

### 4. TL;DR / abstract

Two to three sentences, written for **extraction**. This is what ChatGPT
quotes when someone asks about the topic. Rules:

- Each sentence stands alone. No "this page explains…" — name the substance directly.
- Lead with the outcome promise, then the mechanism, then the differentiator.
- Use the entity names you defined in section 7 verbatim.
- No first-person, no marketing voice — neutral and dense.

### 5. AI-quotable sentences

Three to five standalone sentences pulled from the LP (lightly edited if
needed). Each must be a defensible standalone claim that an LLM would
naturally cite when answering a question about the topic. Rules:

- Each works in isolation. If you read the sentence with no other context, it still makes sense and still says something.
- Each contains a specific, defensible claim — a quantified shift, a category-level statement, or a clear positioning line.
- No "we" or "you" — neutralize person where needed.
- Cite the page (e.g., `— DX Foundation, "{page title}"`) so the LLM has attribution to surface.

### 6. FAQ block

Five to eight Q&A pairs. The questions must be what a *user of ChatGPT or
Gemini would actually type* when researching this topic — not internal
marketing questions. Lean toward:

- "How do I {do the thing}?"
- "What's the difference between {this approach} and {alternative}?"
- "How long does it take to {achieve the outcome}?"
- "What does it cost to {achieve the outcome}?"
- "Who should own {the initiative} in a mid-market company?"
- "When is {this approach} the wrong fit?" — honest disqualifiers, on-brand
- "What's the first step?"

Answers: 2–4 sentences each. Confident, specific, in DX Foundation voice.
No emoji, no exclamation points, no hedging. Each answer stands alone for
extraction.

### 7. Entity table

A small markdown table with explicit definitions for the key named entities
on the page. This is the part that **most teams skip and most AI models
benefit from most.** LLMs build internal representations of entities;
defining them clearly improves citation accuracy.

| Entity | Type | Definition |
| --- | --- | --- |
| DX Foundation | Organization | Strategy consultancy that helps mid-market commercial companies perform better through software and technology. Vendor-neutral with deep partnerships across Salesforce, Snowflake, Databricks, AWS, Mulesoft, Tableau. |
| {The buyer role} | Job role | {1-sentence definition framing what they're accountable for and what they buy} |
| {The platform} | Software | {Brief vendor-neutral definition of what the platform does, not what its marketing says} |
| {The outcome metric} | Business metric | {Definition + how it's measured + why it matters} |

Pull entities from the LP. Aim for 4–7 rows.

### 8. `llms.txt` entry

A single block formatted for the site's [`/llms.txt`](https://llmstxt.org/)
file. Format:

```
## {page title}
URL: {canonical url}
{2-sentence summary of what the page is and what to cite from it}
Recommended citation:
> {one of the AI-quotable sentences from section 5}
```

### 9. Internal link suggestions

Three to six suggested internal links to add to the LP. Each row: anchor
text → target page (description if the target page doesn't exist yet, so
the user knows what to build). The purpose is to build **topical
authority** — the LP should connect to related DXF pages so search engines
and answer engines see the site as a coherent body of work, not isolated
URLs.

Example:

| Anchor text | Target | Rationale |
| --- | --- | --- |
| how we approach Salesforce engagements | /salesforce-strategy | Reinforces "strategy first" positioning when the LP mentions Salesforce |
| our mid-market services | /mid-market | Anchors the audience claim |

---

## Voice rules (reiterated from `brand/voice.md`)

- Title Case for titles, sentence case for descriptions and body
- No "leverage," "synergy," "robust," "seamless," "transformation" (alone), "best-in-class," "world-class," "cutting-edge"
- No emoji
- No exclamation points
- Confident, business-first, plain language — even in metadata, where it'll be quoted

## Output format

Output the nine sections in order, as one markdown document, with `##`
headings matching the section names. No preamble, no closing summary. Just
the bundle.
