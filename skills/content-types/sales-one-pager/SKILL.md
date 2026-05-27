---
name: sales-one-pager
description: Use this skill to produce a sales-team leave-behind — a structured one-page summary that distills a DX Foundation landing page into something a salesperson can send before or after a meeting, attach to a proposal, or print on a single sheet. Trigger when the user says "one-pager," "leave-behind," "sales sheet," "summary doc," "executive brief," "single-page," "PDF version," or asks for "something the sales team can hand over."
---

# Sales one-pager

You are writing the **sales-team leave-behind** that distills a landing page
into a scannable single-sheet document. This is the artifact a salesperson
emails to a prospect after a meeting, attaches to a follow-up, or hands
over physically.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

## Inputs

- **A DX Foundation landing page** (the source of truth — same as for the other repurpose derivatives)
- **Optional**: target industry/vertical, if the salesperson wants the language tilted toward a specific buyer

## What this is and isn't

- **Is**: a one-page summary in DXF voice that a prospect can read in 90 seconds and forward to their CFO or CEO without needing to "translate" it.
- **Isn't**: a slide deck (no slides — that's a different skill). Isn't a marketing brochure either; this is closer to a strategic brief.

## Length and format

- ~250–400 words total
- Scannable — generous white space, structured sections, short bullets
- Markdown output, formatted so it renders cleanly when pasted into a PDF generator, Notion page, or HTML attachment

## Structure

Use this exact structure. The labels are the section headings:

```markdown
# {Outcome promise restated from the LP H1 — Title Case}

**{One-line subhead naming the buyer role and situation.}**

## The Result
{2-3 sentences. The business outcome the buyer gets, restated in plain language. Lead with the metric that moves.}

## How We Get There
- {Strategic move 1 — 1 line from the LP's "Our Approach" section}
- {Strategic move 2}
- {Strategic move 3}
- {Strategic move 4}

## What You Walk Away With
- {Concrete outcome — bullet 1 from "What You Can Expect"}
- {Bullet 2}
- {Bullet 3}
- {Bullet 4}
- {Bullet 5}

## When This Isn't the Right Fit
- {Honest disqualifier 1 — bullet from LP's bad-fit section, condensed to one line}
- {Disqualifier 2}
- {Disqualifier 3}

## Next Step
{One sentence inviting a 30-minute conversation. Specific about what to bring (the buyer's current baseline number, the metric they need to move).}

**{name@dxfoundation.com}** · **{book-a-call-url}**
```

## Voice rules

- Title Case for the H1 and section headings
- Sentence case for body and bullets
- Em dashes welcome; chain consequences
- **No platform/vendor names** (per `brand/voice.md`) — even though this is a sales asset, the platform stays in metadata, not body
- No "we" overuse — every paragraph should be about what the buyer gets, not what DXF does
- Bullets land hard: lead with a verb or a concrete noun, not "Helps you to…" or "Enables…"

## Output format

Pure markdown. Start with `# {H1}`. No preamble, no "here's your one-pager,"
no code fences around the whole thing. Salesperson can copy/paste straight
into Notion, Google Docs, a PDF tool, or an email body.
