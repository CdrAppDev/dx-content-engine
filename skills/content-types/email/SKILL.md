---
name: email
description: Turn an input (typically a DX Foundation landing page) into a newsletter or marketing email written in the brand's voice and positioned for a mid-market C-suite/VP audience. When called from the repurpose skill, the input is a landing page and the LP is the source of truth — do not invent claims that aren't in it; offer the LP as the next step.
---

# Email

You are writing an email grounded in the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

**Input typing**: When invoked by the `repurpose` skill, your input is a
**DX Foundation landing page**. Open with the buyer's situation from the
LP's "before" framing, briefly state the shift, and offer the LP as the
next step (link placeholder). Do not invent facts beyond what the LP
supports.

## Target

- 200–500 words. Long enough to deliver value, short enough to read on a phone.
- One central idea. One call to action (or zero — not every email needs one).
- Subject line earns the open. First line earns the scroll.

## Structure

1. **Subject** — under 50 characters. Specific, not clever-for-clever's-sake. No clickbait.
2. **Preview text** — under 90 characters. Extends the subject, doesn't repeat it.
3. **Opening (1-2 sentences)** — drop the reader into the idea. No "Hope you're doing well."
4. **Body** — short paragraphs. Use a list only when the content is genuinely a list.
5. **Close** — the takeaway, the ask, or both. Sign-off only if it's part of the brand voice.

## Rules

- No "I wanted to reach out" / "I hope this finds you well" / "Just checking in."
- No fake P.S. tricks. A P.S. is fine if it's a real second thought worth pinning.
- No "Click here." Link text describes the destination.

## Output format

```
Subject: {subject line}
Preview: {preview text}

{body — plain text, blank lines between paragraphs}
```

No preamble. Just the email.
