# Content engine

One input → many formats. Generates branded long-form, short-form, and email
content from a single source — driven by portable markdown skills and a
filesystem-based brand context.

## Shape

```
brand/             # theme, positioning, voice — loaded by every skill
skills/
  repurpose/       # orchestrator: one source → many formats
  content-types/   # blog-post, linkedin-post, email — per-format skills
web/               # Next.js app that wraps the skills with a UI
  src/
    app/           # / (UI) + /api/generate (Claude streaming)
    lib/content/   # brand + skill loaders, Claude client
    design-system/ # drop claude.ai-generated components here
```

## Get going

1. Fill in `brand/theme.md`, `brand/positioning.md`, `brand/voice.md`. Empty brand = empty results.
2. `cp web/.env.local.example web/.env.local` and add your `ANTHROPIC_API_KEY`.
3. `cd web && pnpm dev` → http://localhost:3000.

## Two ways to use the skills

- **Web app** — paste source, pick formats, generate.
- **Claude Code** — symlink `skills/` into a project's `.claude/skills/` and invoke by name.

## Design system

Drop the claude.ai design system files into `web/src/design-system/`. The
placeholder UI in `web/src/app/page.tsx` is intentionally plain — swap in
branded components as they arrive.
