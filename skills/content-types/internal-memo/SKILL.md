---
name: internal-memo
description: Use this skill to produce a buyer-forwardable executive memo — written for the buyer (CFO, COO, CRO, etc.) to send INTERNALLY to their CEO, CFO, board, or peer leadership. The voice is neutralized — it reads as if the buyer wrote it, not as if DXF wrote it at them. Trigger when the user says "internal memo," "executive memo," "forwardable summary," "something the buyer can send to their board," "exec brief," "CFO-ready summary," or anything that implies the artifact will be circulated inside the prospect's company.
---

# Internal memo

You are writing an **executive memo from the buyer's perspective** — a
document a CFO, COO, or CRO can forward to their CEO, board, or peer
leadership team without it sounding like marketing.

This is the artifact that gets you internal sponsorship. The buyer reads
the LP, decides the result is worth pursuing, and needs something to send
to two or three other people who control budget or priority. That
"something" is this memo.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

## Inputs

- **A DX Foundation landing page** (the source of truth)
- **Optional**: the buyer's title and the audience inside their company (e.g., "buyer is VP Operations, forwarding to CFO and CEO")

## What makes this different from everything else

- **Voice is neutralized.** Drop the "we" framing. The memo isn't written from DXF to the buyer; it's written from the buyer to their colleagues. Refer to DXF in third person ("DX Foundation," "an outside strategy partner"), and only when necessary.
- **No marketing voice.** No CTA at the bottom (the buyer is the CTA — they're sending this to people they already know). No "Talk to a Strategist." No marketing-heavy adjectives.
- **Confidential / internal tone.** Reads like a memo, not a brochure. Short paragraphs, structured headings, decision-oriented.
- **The result IS the lede.** The opening line states what the buyer wants to do and why; everything after is justification.

## Length and format

- 200–300 words
- Plain prose memo format (not heavy bullets — this is a reading document, not a deck)
- Markdown output

## Structure

```markdown
**To**: {recipients — e.g., "CFO, CEO"}
**From**: {sender — placeholder for the buyer's name and title}
**Re**: {one-line topic — the outcome being pursued, NOT the platform/feature}
**Date**: {placeholder, e.g., "{DATE}"}

## The Opportunity
{1 short paragraph. State the business outcome the company can pursue and the metric it moves. Use first-person plural from the buyer's perspective: "we can," "our," "the company's."}

## What This Looks Like
{1 short paragraph. The operating change in plain terms — what the work involves, who does it, what gets delivered. Reference DXF in third person if needed: "DX Foundation, a strategy partner we've been talking with, has a defined approach to this work."}

## Why Now
{1-2 sentences. The cost of waiting OR the trigger that makes this the right moment. Concrete, not abstract.}

## What I'm Asking
{1 sentence. The internal decision the buyer is asking for — usually "30 minutes to walk you through the proposal" or "alignment on whether to fund a scoping engagement next quarter." Specific.}
```

## Voice rules

- Tone is **confident and direct** — same brand voice — but the *person* is the buyer, not DXF
- **No "we" referring to DXF.** "We" here refers to the buyer's company.
- No emoji, no exclamation points, no marketing modifiers
- Em dashes still welcome
- Numbers stay as ranges or qualitative shifts — the buyer doesn't have DXF's specific case-study data, so they can't cite specific deltas they don't have themselves

## Output format

Pure markdown. Start with the `**To**:` / `**From**:` block. No preamble.
No "here's your memo." The buyer should be able to copy this into their
email body or document and send it — with their name and date filled in —
without rewriting.
