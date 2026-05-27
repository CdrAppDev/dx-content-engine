# DX Foundation Content Engine

This repo is a **content creation engine** for DX Foundation — a strategy
consultancy that uses technology to help mid-market commercial companies
perform better. The engine takes a software feature description (Salesforce,
Snowflake, Databricks, AWS, anything) and produces a publication-ready
landing page, plus derivative content (blog post, LinkedIn post, email) and
discoverability metadata (SEO + AEO for AI answer engines).

## How to use this engine

The engine runs in two modes:

- **Local (current default)** — Claude Code is the runtime. Skills live in
  `.claude/skills/` and get invoked by name during a conversation. No API
  key needed. This is the right mode for drafting, iterating, and reviewing.
- **Production** — the Next.js web app in `web/` calls the Anthropic API
  directly. Requires `ANTHROPIC_API_KEY` in `web/.env.local`. Use when you
  want a persistent UI for non-Claude-Code users.

For everyday use, just talk to Claude Code in this directory. Ask for
a landing page, derivatives, a voice review, or SEO/AEO metadata, and the
right skills will fire automatically.

## Brand context (always loaded)

@brand/theme.md
@brand/positioning.md
@brand/voice.md

## Available skills

Located in `.claude/skills/` (symlinked from `skills/`):

- **translate-and-publish** — Orchestrator. Feature description → landing page in one move. Runs feature-translator then landing-page internally.
- **feature-translator** — Feature description → structured business-results brief. Internal step, output is scaffolding for the LP.
- **landing-page** — Brief → publication-ready landing page (markdown). The canonical content artifact.
- **repurpose** — Landing page → derivative formats. Orchestrator for blog/LinkedIn/email.
- **blog-post** — Long-form expansion from the LP (or other source). 800–1500 words.
- **linkedin-post** — Sharp standalone social post. One claim. 150–300 words.
- **email** — Newsletter or broadcast email. 200–500 words.
- **discoverability** — LP → SEO + AEO bundle (title, meta, OG, JSON-LD schema, TL;DR, FAQ, llms.txt, entities, internal links).
- **voice-check** — Independent QA pass. Audits any content for banned phrases, casing, fabricated claims, position drift.

## Repo layout

```
brand/             Theme, positioning, voice — single source of truth
skills/            Portable skill markdown (canonical home)
.claude/skills/    Symlinks of the above so Claude Code finds them
web/               Next.js app for production mode (needs API key)
```

## House rules for Claude when generating content

- Brand voice always wins over generic copywriting instincts. If `brand/voice.md` bans a phrase, the phrase is out — even in a quotable hook.
- Never fabricate specifics. Numbers, customer names, partner certifications, and case-study details must trace back to the source material or `brand/positioning.md`. If a generation requires a specific you don't have, leave a placeholder like `{quantified result available on request}` rather than inventing one.
- Strategy first, platform second. The platform name (Salesforce, Snowflake, etc.) should appear at most a few times per piece and never in the H1. Lead with the business outcome.
- When a skill expects a landing page as input and the user hasn't generated one yet, generate it first via `translate-and-publish` rather than producing derivatives from raw feature info.
