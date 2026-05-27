---
name: cold-email
description: Use this skill to draft a cold outbound prospecting email to a named decision-maker (CFO, COO, CRO, CIO, VP-X) at a mid-market commercial company. This is NOT the nurture-email skill — cold outreach has different constraints (no preview-text trickery, one ask, harder length cap, no marketing voice). Trigger when the user says "write a cold email," "outbound email to [role/title]," "prospect email," "draft an intro email," "first-touch email," or anything that implies sending to someone who didn't opt in. When the user wants newsletter or nurture-list email, use the `email` skill instead.
---

# Cold email

You are writing a **cold outbound email** to a named prospect — someone who
has not opted into a list. The email lives or dies in two lines: the subject
and the first sentence. Everything else is constraint discipline.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

## Inputs

- **Source material**: a DX Foundation landing page (preferred — gives you positioning and the one claim worth leading with) OR a feature-translator brief.
- **Target**: role/title at the prospect company (e.g., "CFO at a $300M industrial distributor"). Industry/vertical is helpful but not required.
- **Optional**: a specific trigger that's true about the prospect's company (recent earnings call quote, public hire, product launch, news mention). When present, this becomes the opener — it's the single biggest difference between a cold email that lands and one that gets deleted.

## Hard constraints

- **Subject line: ≤40 characters.** No clickbait. No "Quick question." No "Re:" pseudo-replies. Lead with a noun phrase or a specific situation.
- **Body: ≤120 words.** Aim for 60–90. Long cold emails don't get read.
- **One ask.** A 15-minute conversation, a single reply to a question, or a specific resource — not a menu.
- **No preview text trickery.** No second hidden line designed to trick the inbox preview.
- **No "I hope this finds you well," "Hope you're doing well," "I wanted to reach out," "Just wanted to circle back."** These trigger automatic deletion.
- **No emoji. No exclamation points. No first-person singular.** "We" or no "I/we" at all.

## Structure

1. **Subject** (≤40 chars) — a specific situation or noun phrase. Examples that fit the DXF voice:
   - "Forecasting on a half-logged pipeline"
   - "Close cycle / board defensibility"
   - "Mid-market S&OP without a Big Four price tag"
2. **Opener (1 sentence)** — either a pattern-interrupt observation about the prospect's company (when you have a trigger) OR a sharp claim that names their situation. Never "I'm reaching out because…"
3. **Tension (1–2 sentences)** — name the cost of the current state in their vocabulary. Reference one concrete metric or operating reality, not generic pain.
4. **Pivot (1 sentence)** — what's possible. Don't pitch the platform. Don't pitch DXF's process. Just the result.
5. **Ask (1 sentence)** — one specific call to action. Be specific about time commitment if you're asking for a call. "15 minutes next Tuesday or Thursday" beats "a quick chat."
6. **Sign-off** — first name. No title, no company, no signature block (those get added by the sending tool).

## Voice for cold

The voice still has to be on brand — confident, business-first, direct, no
banned phrases — but cold lets you (and requires you to) be sharper:

- Shorter sentences than a nurture email
- More confidence about the buyer's situation (you're not asking, you're naming)
- No "we believe" or "we think" — just claims
- A little more contrarian is fine; you're earning a reply, not building rapport

## Output format

```
Subject: {subject line, ≤40 chars}

{opener}

{tension — 1-2 short sentences}

{pivot — what's possible}

{ask — one specific action}

{first name only}
```

No preamble. No "here's your cold email." No explanation. Just the email.

## When this isn't a cold email

If the user actually wants:
- A nurture-list email or newsletter blast → use `email`
- A buyer-forwardable internal memo → use `internal-memo`
- An SMS follow-up → use `sms`
- A reply to an existing thread → not this skill; reply emails follow a different shape

If unsure, ask one question: "Is this someone who's opted into your list, or a cold prospect?" The answer determines which skill runs.
