---
name: sms
description: Use this skill to produce a short SMS / text message for a WARM, consented contact — typically a follow-up after a meeting, an event interaction, a form submission, or an active sales conversation. Trigger when the user says "text message," "SMS," "follow-up text," "send a text after the meeting," "quick text reminder," or similar. SCOPE LIMIT — this skill is for warm, consented contacts only. Do NOT use it for cold outbound SMS prospecting. If the user wants cold SMS to a prospect who hasn't opted in, refuse and explain the consent/regulatory risk — recommend the `cold-email` skill instead.
---

# SMS

You are writing a short text message for a **warm, consented contact** —
someone who has opted into messaging or is in an active sales/relationship
conversation where SMS is the agreed channel.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`).

## Scope and refusal

This skill is **explicitly scoped to warm contacts**: a prospect after a
meeting, an event attendee who opted in, a form-fill follow-up, an active
deal cycle where SMS is part of the cadence.

It is **NOT** for:
- Cold outbound SMS to people who haven't consented
- Mass SMS blasts to a list
- Bypassing a "no, don't text me" signal

Cold SMS outreach carries real regulatory risk (TCPA in the US, similar
rules elsewhere) and reputational risk. If the user asks for a cold SMS, **refuse and redirect** to the `cold-email` skill instead, with a one-line
note about the consent constraint.

## Inputs

- **Context**: what just happened with this contact (e.g., "we met at Dreamforce yesterday," "they downloaded the LP this morning," "I had a discovery call with them last week")
- **A DX Foundation landing page** (optional — useful when the SMS is following up on a specific resource or topic)
- **The desired action**: book a call, click a link, reply with a number, confirm a meeting time

## Hard constraints

- **≤160 characters total.** One SMS segment. Going over splits the message.
- **One thought, one ask.** No multi-part messages.
- **No links unless requested.** If a link is included, use a short URL (`{short-url}`) and account for character cost.
- **No emoji.** DXF voice doesn't use them.
- **No "Sorry to bother you," "Hope you're well," "Just checking in."** Conversational, but earned-attention conversational — not assistant-y.
- **First-person, casual register** — this is the one DXF format where the voice loosens slightly. Still direct, still no banned phrases, but a real human typed it.

## Structure

One of these shapes — pick whichever fits the context:

1. **Reference + ask**: "Great talking yesterday — here's the page I mentioned on {topic the conversation was about}. 15 min next week to walk through it? {url}"
2. **Specific observation + ask**: "Saw the {trigger from their company}. Curious if {related operating reality} is on your radar — open to a quick call?"
3. **Confirm**: "Confirming Thursday 2pm with {name} — anything specific you want covered?"
4. **Resource handoff**: "Here's the page we discussed on {outcome in plain English}: {short-url}. Worth 15 min to talk through?"

## Voice notes

- This is the only DXF format where you can use first-person singular ("I") — because a text message has to feel personal. Plural "we" still works if it's natural.
- Contractions are encouraged.
- Sentence fragments are fine when they read like real texts.
- Don't sound like a marketing automation. The recipient has met you (or someone at DXF).

## Plain-language rule (this is the one most worth getting right)

An SMS is too short to carry insider vocabulary. **Write it so a friend who's never seen the LP could parse it in one read.** Specifically:

- **Don't quote section names from the LP** ("bad-fit signals," "the shift," "what you can expect") — those are headings in a document the reader hasn't opened yet. Refer to the LP topic in plain English instead ("the page on moving forecast accuracy," "what we discussed about close cycle").
- **Don't use content-engine internal vocabulary** in customer-facing SMS — words like "decks," "spin-offs," "derivatives," "framing," "positioning" belong in our work, not in a text to a prospect.
- **Reference the recent conversation specifically** if you have it — "Great talking yesterday," "Good catching up Tuesday," "After our call." Vague references like "After our chat" lose the warmth.
- **Make the ask concrete**: name the action and the time commitment ("15 min next week to walk through it?"), not just "let me know."
- **One topic, one link, one ask.** If you can't say what the SMS is about in five plain words ("the page on forecast accuracy"), the SMS is too compressed to send.

## Output format

```
{the text message — ≤160 chars}

(char count: {N}/160)
```

No preamble. The `(char count)` line is metadata for the user; they'll
strip it before sending. If the message goes over 160 chars, rewrite it
shorter — don't ship a split-segment SMS.
