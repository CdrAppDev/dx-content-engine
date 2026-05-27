---
name: translate-and-publish
description: Use this skill whenever someone wants a publication-ready landing page about a software feature — whether they hand you a feature description, paste release notes, or just give you the feature name. It orchestrates the full upstream pipeline: research the feature (if only a name is given), translate feature-speak into business-results-speak, then assemble the landing page in DX Foundation's strategy-first voice. Trigger even when the user doesn't name the skill — "write me a landing page for Advanced Account Forecasting," "I want to pitch Einstein Activity Capture to a CRO," "turn these release notes into a page," "we want to market Snowflake Unistore" all count. If the output the user wants is a marketing page about a software capability, this skill runs.
---

# Translate and publish

This skill is the **upstream orchestrator**. It exists so that the path from
"I have a feature in mind" to "I have a publication-ready landing page" is
the same whether you're running in Claude Code, the web app, or any other
surface. The orchestration logic lives here, not in any individual caller's
prompt.

You load alongside:
- `brand/theme.md`, `brand/positioning.md`, `brand/voice.md` (loaded automatically as context)
- `feature-research` (sibling skill — used when input is just a name)
- `feature-translator` (sibling skill)
- `landing-page` (sibling skill)

## What this skill does

Given a feature (by name or by description), produce a publication-ready DX
Foundation landing page in markdown. Up to three stages depending on input:

1. **Research** *(only if the user gave just a feature name)* — invoke the `feature-research` skill to autonomously pull source material from vendor help docs, release notes, Trailhead, marketing pages, and trusted secondary sources. Produces a structured dossier.
2. **Translate** — invoke the `feature-translator` skill to produce a structured business-results brief. Source: the research dossier if step 1 ran, otherwise the user's provided description.
3. **Publish** — invoke the `landing-page` skill, feeding it the brief. This is the deliverable.

## Routing the input

Before running anything, classify what the user gave you:

- **Just a name** (e.g., "Advanced Account Forecasting," "Einstein Activity Capture") → run all three stages: research → translate → publish.
- **A name + a few words of context** ("Snowflake Unistore for CFOs") → still run all three; the context becomes a targeting hint for research and translator.
- **A description, release-notes paste, or doc excerpt** → skip research; go translate → publish.
- **An already-generated translator brief** → skip research and translate; go straight to publish.

When in doubt, default to running research — better to have too much source material than too little.

## Why this skill exists

Two reasons:

- **Symmetry.** `repurpose` orchestrates the *downstream* half (LP → derivatives). Without this skill, the *upstream* half (feature → LP) only exists as ad-hoc prompt text in API callers. That means the system behaves differently from different surfaces. This skill makes the pipeline portable.
- **Single responsibility.** `feature-translator` is reusable on its own (sometimes you want the brief, not the page). `landing-page` is reusable on its own (sometimes you already have a brief). This skill exists to bind them when the user wants the full upstream flow in one move.

## Process

1. **Classify the input** using the routing rules above.

2. **Research** *(if needed).* Invoke `feature-research` with the feature name plus any context the user offered (vendor, target role, vertical). The skill pulls 3–7 sources and writes a dossier to `output/{slug}/dossier.md`. Read the dossier before continuing. If research surfaces an ambiguity (e.g., the name maps to two different Salesforce products), surface the question to the user once and wait for an answer — don't pick blindly.

3. **Translate.** Invoke `feature-translator`. Pass the dossier if step 2 ran, otherwise the raw input. The translator will return a structured markdown brief with sections: Vendor and feature, Strategic frame, Primary buyer, Operating department, Business problem, Outcome shift, Proof needed, Bad-fit signals, DX Foundation angle. Save it to `output/{slug}/feature-brief.md`.

4. **Publish.** Invoke `landing-page`. Pass the translator brief. The skill returns a publication-ready markdown LP with a Title-Cased H1 outcome promise, eyebrow, hero subhead, before/after, "How we approach it," "What you can expect," proof, and a close+CTA. Save it to `output/{slug}/landing-page.md`.

5. **Return the landing page.** Drop the intermediate dossier and brief from your reply — those are on disk for the user to inspect. Surface only the LP plus a one-line note pointing at the working files. (If the user wants the dossier or brief inline, they'll ask.)

## Working files

When run end-to-end, the skill leaves a trail in `output/{slug}/`:

```
output/{kebab-case-feature-name}/
  dossier.md          # only if feature-research ran
  feature-brief.md    # the translator's structured brief
  landing-page.md     # the final LP (also returned inline)
```

This makes the pipeline auditable — if the LP feels off, the user can read the brief and the dossier to find where the drift started.

## Output format

Pure markdown. The landing-page skill's output, verbatim. No preamble, no
"here's your landing page," no wrapping code fences around the whole thing.
The first line of output should be the page's `# H1`.

## What this skill does NOT do

- It does not generate derivative content (blog, LinkedIn, email). That's
  `repurpose`'s job, invoked downstream once the LP exists.
- It does not generate SEO/AEO metadata. That's `discoverability`'s job,
  also downstream.
- It does not audit voice. That's `voice-check`'s job, optional QA.
- It does not invent feature information the input didn't contain. If the
  input is too thin to produce a useful brief, the translator will say so,
  and you should surface that to the user rather than fabricating.
