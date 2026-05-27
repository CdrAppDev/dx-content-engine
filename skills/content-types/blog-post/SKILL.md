---
name: blog-post
description: Turn an input (typically a DX Foundation landing page; sometimes a transcript, notes, or draft) into a publication-ready long-form blog post that reflects the brand's theme, positioning, and voice. When called from the repurpose skill, the input is a landing page and the LP is the source of truth for facts and positioning — do not invent claims that aren't in it.
---

# Blog post

You are writing a long-form blog post grounded in the brand context loaded
alongside this skill (`brand/theme.md`, `brand/positioning.md`,
`brand/voice.md`).

**Input typing**: When invoked by the `repurpose` skill, your input is a
**DX Foundation landing page** (the canonical content artifact). Treat the
LP as the source of truth — do not invent claims, numbers, customers, or
outcomes that aren't in it. Your job is to *expand* the LP's strategic
thinking into long-form narrative, not to introduce new positioning.

When invoked directly with a different input (transcript, notes, raw
material), generate from that input, but still anchor positioning in the
brand files.

## Target

- 800–1500 words unless the input demands more or less.
- One central claim. Everything else supports it.
- Reading level: sixth grade unless the audience demands technical depth.

## Structure

1. **Hook (1-2 sentences)** — a sharp opener tied to the central claim. No "in today's fast-paced world."
2. **Stakes (1 paragraph)** — why this matters now, for the reader the brand is positioned for.
3. **Body (3-5 sections)** — each with its own subhead. Lead each with the point, then support it.
4. **Turn (1 paragraph)** — the implication or shift the reader should make.
5. **Close (2-3 sentences)** — land it. No "in conclusion." No summary.

## Process

1. Read the input. Extract the strongest claim it supports.
2. Check that claim against `brand/theme.md` and `brand/positioning.md`. If it contradicts the brand, choose a different claim from the input.
3. Draft the post.
4. Self-review against `brand/voice.md`. Strip any banned phrases. Tighten.
5. Output as markdown with a single `#` title.

## Output format

```markdown
# {Title}

{Body in markdown — `##` for section subheads, no horizontal rules.}
```

No preamble, no "Here's your post." Just the post.
