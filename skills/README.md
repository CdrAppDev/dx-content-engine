# Skills

Portable markdown skills for content generation. Each skill is a self-contained
`SKILL.md` with frontmatter (`name`, `description`) and a body of instructions.

Two layers:

- **`repurpose/`** — orchestrator. One source → multiple formats. Delegates to content-type skills.
- **`content-types/`** — per-format skills. Each one knows the structure, length, and rules for its format.

All skills read the `brand/` context at runtime. To change voice across every
piece of content, edit `brand/voice.md` — no skill changes needed.

## Using in Claude Code

Symlink or copy this directory into `.claude/skills/` of any project. Skills
auto-load by their frontmatter `name`.

## Using via the web app

The `web/` app reads `skills/` and `brand/` from the filesystem at runtime,
composes the prompts, and calls the Claude API.
