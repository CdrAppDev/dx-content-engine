---
name: feature-translator
description: Translate a software feature description (Salesforce, Snowflake, Databricks, AWS, Mulesoft, Tableau, or any platform) into a structured business-results brief addressed to a mid-market C-suite or VP buyer. Use upstream of any customer-facing content (landing page, blog, email) when the input is feature-speak and the output needs to be results-speak.
---

# Feature translator

Your job is to convert **feature-speak into business-results-speak**. You do
not write customer-facing copy here — you produce a **structured internal
brief** that the landing-page skill (and other content-type skills) consume.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`). The translator brief must be
consistent with that positioning: DX Foundation is a **strategy consultancy
that uses technology**, not a platform reseller. Never lead with the
platform name. Lead with the business problem.

## Inputs

One of:

- **A research dossier** produced by the `feature-research` skill (typically at `output/{slug}/dossier.md`). This is the preferred input — it's already structured, sourced, and de-marketed.
- **A raw feature description** — vendor release notes, marketing copy, doc excerpts, a paragraph the user typed, a bullet list. Use when no dossier is available.

Optional: a vertical, department, or buyer role the user wants to target.
If omitted, pick the strongest single audience from the source material and
call it out.

## Process

1. **Read the feature description and identify the underlying capability.**
   Strip the marketing language. What does this thing *do* in plain mechanical terms?
2. **Identify the business problem this capability resolves.** Not "users can't see X" — what business outcome is held back without it? Cycle time? Revenue leakage? Compliance risk? Customer churn?
3. **Identify the buyer.** Which C-suite or VP role would write the check or sponsor the work? (CFO, COO, CRO, CIO, CMO, CHRO, VP Operations, VP Customer Experience, etc.) Pick one as primary; you can name up to two secondary.
4. **Identify the department / function** that operates this capability day-to-day (often different from the buyer — e.g., the CFO buys it, the controller's team runs it).
5. **Quantify the shift.** Where you can: time saved, cost reduced, revenue protected/unlocked, risk lowered, headcount avoided. Use ranges where specific numbers aren't supportable. If you can't quantify, name the qualitative shift in business language ("close the books faster," "field fewer escalations").
6. **Identify the strategic frame.** Is this a *cost* play, a *growth* play, a *risk* play, or an *experience* play? (Sometimes more than one — pick the primary.)
7. **Flag what would make this a bad fit.** When would this feature not move the needle? Honest disqualifiers protect the strategy-first brand.

## Output format

A markdown brief with exactly these sections, in this order. No preamble, no
explanation, no "here is your brief":

```markdown
# Feature brief: {short noun-phrase name, in plain English — NOT the vendor's marketing name}

## Vendor and feature
- **Vendor**: {Salesforce / Snowflake / etc.}
- **Vendor name for it**: {their marketing name, verbatim}
- **Plain-English capability**: {one sentence, mechanical, no marketing}

## Strategic frame
{One of: Cost / Growth / Risk / Experience — or two if genuinely both. One sentence on why.}

## Primary buyer
- **Role**: {CFO / COO / CRO / CIO / CMO / CHRO / VP-X}
- **What they're trying to move**: {the business metric on their dashboard that this feature touches}

## Operating department
{The team that uses the feature day to day. May differ from the buyer.}

## Business problem
{2-3 sentences. Frame the problem the buyer has *before* this capability exists. Use the buyer's vocabulary, not the vendor's.}

## Outcome shift
- **Before**: {concrete description of the current state}
- **After**: {concrete description of the post-implementation state}
- **Quantified where supportable**: {time / cost / revenue / risk impact, with ranges when needed; "qualitative only" if not}

## Proof needed
{What kind of evidence would a buyer ask for? "A peer in {industry} who cut {metric} by {amount}." This is a placeholder for case-study work — generated copy must not fabricate specifics.}

## Bad-fit signals
{2-4 bullets: when this feature would NOT move the needle. "If close cycle is already under 5 days, the marginal gain doesn't justify the lift," etc.}

## DX Foundation angle
{1-2 sentences on how DXF positions this — strategy-first, vendor-neutral framing. Always emphasize the business outcome over the platform. Never "we implement {vendor}." Instead: "we help {role} move {metric} — {vendor} happens to be one of the strongest tools for the job."}
```

That's the whole output. Nothing else.
