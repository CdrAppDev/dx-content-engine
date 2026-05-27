# Feature dossier: Multi-dimensional manufacturing forecasting on the CRM

## Vendor and naming
- **Vendor**: Salesforce
- **Vendor canonical name**: Advanced Account Forecasting (AAF)
- **Product area / cloud**: Manufacturing Cloud (rebranded "Agentforce Manufacturing" in 2026)
- **Status**: GA
- **Plain-English summary**: A configurable multi-dimensional forecasting engine for B2B manufacturers, layered on top of Salesforce's Data Processing Engine. It pulls signals from orders, opportunities, sales agreements, and historical sales, then aggregates them into role-editable "forecast sets" sliced by business dimensions like product, ship-from location, territory, or business unit. The result is a single forecast surface that Sales, Operations, and Finance can adjust during defined windows.

## Sources

| URL | What it is | Used for |
|---|---|---|
| https://help.salesforce.com/s/articleView?id=ind.aaf_admin_customize_task.htm&type=5 | Salesforce Help — AAF Setup parent | Canonical capability + scope of setup |
| https://help.salesforce.com/s/articleView?id=ind.aaf_admin_parent_concept.htm&type=5 | Salesforce Help — AAF parent concept | Official positioning + business processes supported |
| https://trailhead.salesforce.com/content/learn/modules/advanced-account-forecasting-with-manufacturing-cloud/configure-forecast-sets | Trailhead — Configure Forecast Sets | Concrete configuration model (Industrial_Set / Consumer_Set examples) |
| https://www.crmview.net/ai-powered-demand-forecasting-in-salesforce-manufacturing-cloud/ | Third-party technical guide | DPE role + cross-functional users |
| https://www.cloudkaptan.com/insights/forecast-accurately-with-salesforce-advance-account-forecasting | Third-party explainer | Business problem framing + industry stats |
| https://www.fastslowmotion.com/what-is-salesforce-manufacturing-cloud/ | Manufacturing Cloud context | Why this lives in the manufacturing vertical |

## What it does (capability)

AAF generates **multi-horizon forecasts** by aggregating signals across multiple Salesforce objects (orders, opportunities, sales agreements, historical orders) plus user-defined custom sources. The aggregation is orchestrated by the **Data Processing Engine** (DPE) — Salesforce's transformation framework. DPE definitions specify how the raw data gets filtered, joined, aggregated, and computed into forecast values.

The unit of configuration is a **forecast set**. A forecast set is a bundle of:

- **Dimensions** (up to 6 per set) — the breakdowns a forecast is sliced by. Example: Industrial_Set uses Product + Ship-From Location; Consumer_Set uses Product Category + Ship-From Location.
- **Measures** — the numeric fields computed and displayed. Each measure has a calculation method: `Batch Process` (sourced from DPE output, e.g., Opportunity Quantity or Sales Agreement Revenue), `Forecast Formula` (computed from other measures, e.g., Final Forecasted Quantity), or `User-Editable` (manually adjusted values like Account Manager Adjustments).
- **Adjustment periods** — role-based editing windows. The Account Manager might own days 0–5; the Regional Manager owns days 6–10; the Channel Partner owns 11–14. This formalizes who can change what, when.
- **Formulas** — composed in the Forecast Formula Builder to roll up or apply business logic across periods.

Once configured, forecasts can run via scheduled Salesforce **Flow** jobs or in real time. Generated values are stored in the **Forecast Fact object** — a custom object whose records each represent one cell of the forecast grid (e.g., "Forecast Revenue for Product X in Region Y for Period Q3").

A specialized variant — **Service Revenue and Spare Parts Demand Forecasts** — extends the same engine to service-cloud-anchored businesses that need to forecast spare-part demand and recurring service revenue.

## Configuration model

- **Forecast Fact object** — stores all generated forecast values; one record per forecast cell
- **Dimension sources** — point AAF at the Salesforce objects whose fields become forecast dimensions
- **Period groups** — define how often forecasts roll (weekly, monthly, quarterly) and how many periods are visible at once
- **Forecast sets** — the user-facing config bundles (dimensions + measures + adjustment periods + formulas)
- **Data Processing Engine definitions** — the actual ETL: filter, join, aggregate, output
- **Salesforce Flow** — orchestrates DPE runs on schedule or trigger
- **Permission sets + sharing rules + field-level security** — granular access to forecast records and individual measure values
- **Custom fiscal year definitions** — optional, for businesses on non-Gregorian fiscal calendars

## Editions and availability

- **Available in**: Lightning Experience
- **Editions**: Enterprise, Unlimited, Developer
- **Cloud**: Manufacturing Cloud (license required)
- **Required underneath**: Data Pipelines (auto-enabled when AAF is enabled)
- **Optional integration**: CRM Analytics — required for predictive / AI-powered forecasting features
- **License cost signal**: Not publicly listed. Manufacturing Cloud is a paid per-user add-on on top of Sales Cloud or Service Cloud.

## Audience signals (who Salesforce markets this to)

- **Industries / verticals**: Manufacturing — specifically B2B manufacturers with channel-partner distribution or direct sales motions where revenue is driven by recurring volume commitments. Salesforce positions this for industrial manufacturing, consumer-goods manufacturing, and distribution. The Service Cloud variant extends to manufacturers with significant aftermarket / spare-parts revenue.
- **Buyer role**: VP of Revenue Operations, VP of Sales Operations, CFO, COO, or a head of S&OP (Sales & Operations Planning) — anyone whose scorecard includes forecast accuracy or inventory/production alignment.
- **Operating role**: Revenue Operations or Demand Planning teams configure and maintain it. Account Managers, Regional Managers, and Channel Partners interact with it during their adjustment windows.

## Outcome claims found in source material

- "Improve forecast accuracy through data-driven calculations" — **M** (Salesforce marketing framing; no specific delta cited)
- "Align sales and operations planning" — **M**
- "Optimize inventory and production schedules" — **M**
- "Optimize inventory levels, enhanced customer satisfaction, reduced operational costs" — **M** (cloudkaptan summary; no quantification)
- "67% of organizations lack a formalized approach to forecasting" — **R** (third-party survey stat cited via cloudkaptan; original source unverified)
- "81% of manufacturers say they need both new approaches and new tools for accurate forecasting" — **R** (same caveat)
- The Trailhead example uses **"Rayler Parts"** as a fictional reference customer — this is illustrative, **not** a real customer case.
- **No real named-customer ROI stories surfaced in this research pass.**

## Architecture and dependencies

- **Required**: Manufacturing Cloud license, Lightning Experience, Data Processing Engine, Data Pipelines (auto-enabled), Salesforce Flow, Account Hierarchies enabled
- **Strongly recommended**: Sales Agreement records configured (this is a Manufacturing Cloud primitive), historical Order data in the org
- **Optional**: CRM Analytics for predictive / AI forecast augmentation
- **Integrates with**: Channel partners via Experience Cloud portals — partners can see forecasts on shared accounts and make adjustments in their assigned windows

## Adoption complexity signals

- **High setup surface**: at minimum ~9 distinct configuration objects/steps to wire up before a forecast can run (permissions, sharing, FLS, dimension sources, period groups, fact object, forecast set, DPE definition, Flow orchestration). Custom fiscal year + CRM Analytics add more.
- **Data Processing Engine expertise required**: DPE is its own subsystem. Admins comfortable with standard Salesforce admin tasks often need to learn DPE separately. This is the single biggest learning curve.
- **Cross-functional rollout**: Account managers, regional managers, finance, and partners all interact with the forecast grid — so adoption is part technical, part change-management.
- **No real-time UX out of the box**: Forecasts are typically scheduled batch runs via Flow. Real-time recalc is possible but adds orchestration complexity.

## Customer examples found in public sources

No real named-customer stories with quantified outcomes surfaced in this research pass. Trailhead uses **Rayler Parts**, a fictional industrial-parts manufacturer, as the running example throughout the module — useful for illustrating configuration but **not** usable as social proof in DXF content. To produce LP-grade proof points, ask a DXF practice lead to source a real engagement or pull from a Salesforce customer success story library directly.

## Open questions / what the research couldn't determine

- **List pricing**: Salesforce doesn't publish a public price for Manufacturing Cloud or AAF specifically.
- **Real ROI deltas**: No public customer story surfaced with a baseline → improved forecast-accuracy number tied to AAF specifically.
- **Differentiation from standard Account Forecasting**: Salesforce documents both AAF and "Account Forecasting" — AAF is positioned as the multi-dimensional successor, but a clean side-by-side comparison wasn't found. Worth getting from a Manufacturing Cloud product expert before pitching to a buyer who's currently on the standard product.
- **2026 Agentforce branding**: The product was rebranded "Agentforce Manufacturing" in 2026 (per fastslowmotion). Whether AAF's name is also being rebranded under the Agentforce umbrella isn't clear from the surfaced sources — verify before final copy.
- **Predictive AI capabilities**: Mentioned as available via CRM Analytics integration, but the depth (true ML-driven forecasting vs. trend extrapolation) is not clear from public docs. Would benefit from a deeper Trailhead pass or a hands-on demo.
