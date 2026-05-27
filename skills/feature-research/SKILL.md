---
name: feature-research
description: Use this skill when the user gives you just a software feature name (e.g., "Advanced Account Forecasting," "Einstein Activity Capture," "Snowflake Unistore") and you need to gather the source material before any content can be written. The skill autonomously pulls from Salesforce Help, release notes, Trailhead, vendor product pages, and trusted secondary sources to produce a structured research dossier. Trigger whenever the user says "research X," "look into X," "go find out about X," "dig into X feature," "I want a landing page for [feature name]" without providing the description, or any other request that implies "find the source material yourself." Always run this BEFORE feature-translator when only a feature name is in hand — translator without source material will produce thin output.
---

# Feature research

You are the **upstream research step** for the content engine. Your job is to
take a feature name and produce a structured dossier that downstream skills
(feature-translator, landing-page) can consume. The user should never have to
copy-paste help pages or URLs to feed the system — you find them.

You load alongside the brand context (`brand/theme.md`,
`brand/positioning.md`, `brand/voice.md`) and have access to web search
(WebSearch), web fetch (WebFetch), and the Chrome browser tools
(`mcp__claude-in-chrome__*`) for SPAs that don't render server-side.

## Inputs

- **Feature name** (required) — e.g., "Advanced Account Forecasting"
- **Vendor or product area** (optional) — e.g., "Salesforce Manufacturing Cloud." If omitted, you'll determine it from search results.
- **Depth** (optional) — `quick` (one pass, primary sources only) or `deep` (multiple passes, secondary sources included). Default: `deep`.

## Process

### 1. Identify the canonical feature

If the user gave only a name, run a web search to confirm:

- Which vendor owns it
- Which product / cloud it lives in
- Whether the name is current or has been renamed (Salesforce renames features regularly — "Pardot" became "Marketing Cloud Account Engagement," etc.)

If the search returns multiple candidates (ambiguous name), **list them back to the user and ask which one** before continuing. One clarifying question is cheaper than researching the wrong feature.

### Tools and fallback chain

Every research run uses the same toolchain. Pick the right tool per source.

| Source type | First-choice tool | Fallback | Notes |
|---|---|---|---|
| Anything that needs *finding* | `WebSearch` | — | Always start here. Often the snippet is enough to map the landscape. |
| Static HTML pages (vendor marketing, blogs, most release notes, Trailhead unit pages with SSR) | `WebFetch` | Chrome | WebFetch is fast and cheap. Use it first. |
| Salesforce Help (`help.salesforce.com`) | Chrome browser tools | — | WebFetch returns a CSS loading shell. You **must** use Chrome and pierce shadow DOM. See the JS snippet below. |
| Trailhead module bodies (interactive content) | Chrome browser tools | WebFetch (sometimes works for static excerpts) | |
| Anything paywalled or captcha'd (Gartner, some G2) | `WebSearch` (use snippets only) | — | Do not bypass paywalls. Snippet-level signal is enough; flag as "not directly verifiable" in the dossier. |

**When `WebFetch` returns a redirect**, follow it with another `WebFetch` call.
**When `WebFetch` returns near-empty content** ("loading…", a CSS error shell), assume the page is a JS SPA and switch to Chrome.

### Pagination and multi-page document sets

Many sources span multiple pages — a documentation tree with parent + child articles, a numbered-pagination list, a Trailhead module with many units. Three patterns:

1. **TOC / link harvest (preferred).** When you land on a parent page that has a sidebar table of contents or a nav tree, run JavaScript inside `mcp__claude-in-chrome__javascript_tool` to extract every relevant URL in one pass — then visit only the ones whose titles match what you're researching. Don't click-traverse if you can extract a URL list. Example skeleton:

   ```javascript
   (() => {
     function walk(root, urls) {
       const all = root.querySelectorAll ? root.querySelectorAll('a[href]') : [];
       for (const a of all) urls.add(a.href);
       const everything = root.querySelectorAll ? root.querySelectorAll('*') : [];
       for (const el of everything) if (el.shadowRoot) walk(el.shadowRoot, urls);
     }
     const urls = new Set();
     walk(document, urls);
     return [...urls].filter(u => u.includes('YOUR_KEYWORD'));
   })()
   ```

2. **"Next" button traversal.** When pages are linked only by a Next button (no stable URL), use `mcp__claude-in-chrome__find` to locate the button and `mcp__claude-in-chrome__computer` (`left_click`) to advance — ideally batched via `mcp__claude-in-chrome__browser_batch` so each iteration is one round trip. Re-extract content after each click. Set a max iteration count to avoid runaway crawls.

3. **URL pattern stepping.** When pagination is in the URL (`?page=2`, `/p/3/`, etc.), skip the browser entirely — just iterate the URL pattern with `WebFetch`.

**Stop conditions.** Pagination is not a goal; *enough source material* is the goal. Stop when:
- You've gathered enough to populate every section of the dossier
- Three consecutive pages add no new substance
- You've visited 7+ sources (you almost certainly have what you need)

If you genuinely need to scrape a long ordered set (e.g., a 20-page list of release notes), favor URL pattern stepping or TOC harvest over click-traversal — clicking is the slowest, most fragile pattern.

**Salesforce Help shadow-DOM walker** (use inside a `javascript_tool` call):

```javascript
(() => {
  function walk(root, results) {
    const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const el of all) {
      if (el.shadowRoot) walk(el.shadowRoot, results);
      const t = (el.innerText || '').trim();
      if (t.includes('REQUIRED EDITIONS') && t.length > 800 && t.length < 30000) {
        results.push({ tag: el.tagName, len: t.length });
      }
    }
  }
  const results = [];
  walk(document, results);
  results.sort((a, b) => a.len - b.len);
  // Re-walk to retrieve the actual element with smallest matching length
  // (returns the most specific container — usually the article body)
  function find(root, target) {
    const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const el of all) {
      if (el.shadowRoot) { const r = find(el.shadowRoot, target); if (r) return r; }
      if (el.tagName === target.tag && (el.innerText || '').trim().length === target.len) return el;
    }
  }
  const el = results[0] && find(document, results[0]);
  return el ? el.innerText : 'not found';
})()
```

### 2. Pull primary sources

These are authoritative. Always check them first.

- **Vendor help docs** — for Salesforce, `help.salesforce.com`. Use the Chrome browser tools, not WebFetch — Salesforce Help is a JS-rendered SPA with shadow DOM. Helpful JS to pierce shadow roots:

  ```javascript
  // In a javascript_tool call, walk shadow DOM to find article body:
  function walkShadow(root, results) {
    const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const el of all) {
      if (el.shadowRoot) walkShadow(el.shadowRoot, results);
      const t = (el.innerText || '').trim();
      if (t.includes('REQUIRED EDITIONS') && t.length > 800) results.push(el);
    }
  }
  ```

- **Vendor release notes** — for Salesforce, `releasenotes.docs.salesforce.com`. Tells you when the feature shipped, what changed, what's GA vs beta vs pilot.

- **Trailhead modules** — `trailhead.salesforce.com`. These often have the cleanest "what this does and who it's for" framing because they're designed to teach admins.

- **Vendor marketing pages** — `salesforce.com/products/...`. These show the marketing positioning, intended buyer, and any quantified outcome claims (often unsupportable but instructive about the pitch).

- **Vendor pricing pages** if available — gives edition/cost signals.

### 3. Pull secondary sources (if depth = `deep`)

These add context and reality-check the marketing.

- **Vendor engineering / product blog** — often has the "why we built this" framing
- **Third-party admin/consulting blogs** — Salesforce Ben, ApexHours, community posts. Apply judgment; some are sponsored content. Look for posts that include adoption gotchas, real implementation timelines, or admin frustration — those are more useful than uncritical recaps.
- **G2 / Gartner reviews** — capture signal (common complaints, common praise) but never specific numbers or named customers from these as proof in generated content
- **Recent conference talks / webinars** — Dreamforce, World Tour. Sometimes the most candid framing of how the feature is actually being used.

Aim for **3-7 sources total**. More isn't better; you'll just dilute the dossier.

### 4. Aggregate into a dossier

Read everything you pulled, then write the dossier using the structure below.
Do not paraphrase wholesale from sources — extract the substance and re-state
in plain English. Quote sparingly (≤15 words) and only when the source's
exact phrasing is meaningful.

## Output format

```markdown
# Feature dossier: {plain-English noun phrase, NOT the vendor's marketing name}

## Vendor and naming
- **Vendor**: {Salesforce / Snowflake / Databricks / etc.}
- **Vendor canonical name**: {their official marketing name}
- **Product area / cloud**: {Sales Cloud / Service Cloud / Manufacturing Cloud / Data Cloud / Industries / etc.}
- **Status**: {GA / Beta / Pilot — date if known}
- **Plain-English summary**: {2-3 sentences. Mechanical description. No marketing voice.}

## Sources

| URL | What it is | Used for |
|---|---|---|
| {url} | {e.g., "Official help setup article"} | {e.g., "Capability + configuration model"} |
| {url} | ... | ... |

## What it does (capability)
{3-5 paragraphs. Explain the underlying mechanics. What gets created, calculated, synced, exposed. Strip the marketing layer. A technically-literate non-Salesforce-admin should be able to read this and understand the shape of the thing.}

## Configuration model
{What an admin sets up to make it work. Objects, fields, permissions, jobs, flows, integrations, dependencies. Bullets are fine here.}

## Editions and availability
- **Available in**: {Lightning Experience / Classic; Enterprise / Unlimited / Developer / etc.}
- **Add-on required**: {Yes — name / No}
- **License cost signal**: {if found — "Per-user add-on, exact pricing not public" / "Included in {edition}" / etc.}

## Audience signals (who the vendor markets this to)
- **Industries / verticals**: {from vendor positioning}
- **Buyer role**: {who the vendor positions as the buyer — usually inferable from where the feature shows up in marketing}
- **Operating role**: {who runs it day-to-day, usually different from buyer}

## Outcome claims found in source material
{Bulleted list. For each: state the claim AND tag it.
- **S** = supported by a cited customer story or third-party data
- **M** = marketing-asserted with no specific support
- **R** = range claim (industry benchmark, not specific)

Example:
- "Reduces forecast cycle time by 40%" — **M** (Salesforce marketing page; no specific customer cited)
- "Manufacturer X improved forecast accuracy from 65% to 89%" — **S** (Trailhead case study)
}

## Architecture and dependencies
{What this integrates with. What it requires upstream (e.g., "requires Account Hierarchy enabled, requires Data Processing Engine licensed"). What's optional.}

## Adoption complexity signals
{Setup-step count if visible. Common gotchas surfaced in docs or community posts. Skill requirements (admin-only vs requires developer).}

## Customer examples found in public sources
{Real named customers and the outcomes they cited, with source URLs. If none found, write: "No specific public customer stories surfaced." Never fabricate customer names.}

## Open questions / what the research couldn't determine
{Honest list. Examples:
- "Couldn't find specific pricing — Salesforce doesn't publish list price for this."
- "No customer story with quantified ROI in a comparable mid-market context."
- "Unclear whether the feature works with multi-currency orgs from the documentation alone."}
```

## Important rules

- **Never fabricate.** If a source doesn't exist or doesn't say what you need, write that in "Open questions." Generated content downstream relies on the dossier being accurate.
- **Real URLs only.** Every source in the table must be a real, fetched URL — not a guess. If you can't open it, don't include it.
- **Stop when you have enough.** 3-7 sources is the right depth. Going further is research procrastination — finish the dossier and let the user iterate.
- **One question if ambiguous.** If the feature name is ambiguous between multiple Salesforce products (or could be a different vendor), ask once before committing to research.
- **Output the dossier to a file** when working in the content engine repo. Path: `output/{slug}/dossier.md` where slug is a kebab-case version of the feature name. This lets feature-translator pick it up and lets the user inspect what you found.

## What this skill does NOT do

- It does not write customer-facing copy. That's feature-translator + landing-page.
- It does not invent numbers or customer stories. Only what's in source material.
- It does not pitch the feature. It describes it neutrally so downstream skills can re-frame it.
- It does not handle non-software features. Scope is platform features (Salesforce, Snowflake, AWS, etc.).
