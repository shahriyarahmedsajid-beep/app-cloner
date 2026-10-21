# Zupona AI — Product Requirements Document

**Product:** Zupona AI — the creative storefront and studio
**Document status:** Draft v0.1 (concept build)
**Date:** 21 October 2026
**Owner:** Product / Design (concept team)
**Related docs:** [Competitive research](./RESEARCH.md) · [Live prototype](../README.md)

> This PRD describes an original product. It does not reuse competitor code, assets, copy or visual identity. Higgsfield, InVideo, Kling, Google Flow and all model names are trademarks of their respective owners; references are nominative and comparative only.

---

## 1. Summary

Zupona is a web-based AI creative platform with two connected surfaces:

1. **Storefront** — a curated marketplace of runnable creative workflows ("apps") for outcomes such as UGC ads, product photography, character series, manga pages, music videos and virtual try-on.
2. **Studio** — a single canvas that routes work across frontier image and video models, preserves character/product/brand consistency, shows credit costs up front, and produces export-ready assets.

The bet is simple: models have commoditised; **the workflow is the product**. Users do not want another prompt box or another subscription. They want a reliable path from a brief to an asset they can publish.

The repository includes a full interactive frontend prototype with a simulated generation backend. No external AI API is called. The prototype exists to validate the product experience, information architecture and demo narrative.

---

## 2. Problem

### 2.1 Customer problem

Creators and lean marketing teams must ship images, video and ads every week. Today they:

- Juggle multiple AI subscriptions and model UIs.
- Start from blank prompts with no idea which model or settings to use.
- Burn credits on iterations they cannot predict.
- Struggle to keep a character, product or visual style consistent across shots.
- Move assets between four tools to finish a single deliverable.
- Worry about commercial rights, watermarks and unclear training policies.

### 2.2 Product opportunity

Make the **outcome** the entry point, not the model. Give users a curated, inspectable workflow with a visible cost, then let the agent handle routing, prompt construction and continuity. Keep everything in one library and one balance.

### 2.3 Evidence

Public reviews and competitor pages show recurring complaints about credit confusion, pricing changes, tab sprawl, continuity drift and generic output. The market has many model catalogues and prompt libraries, but few runnable, outcome-level workflows with transparent economics. See [RESEARCH.md](./RESEARCH.md) for sources and analysis.

*Validation status:* the quantitative willingness-to-pay and retention claims are hypotheses. They must be tested in beta.

---

## 3. Vision and principles

**Vision.** Anyone with taste can produce a week of publish-ready creative in one afternoon, without becoming a model expert.

**Product principles**

1. **Outcome before tool.** Start with what the user wants to ship.
2. **Cost before render.** No surprise spend, ever.
3. **Consistency is a feature.** The same face, product and brand should survive the entire production.
4. **Calm interface.** Fewer decisions, stronger defaults, inspectable controls.
5. **Creator economy built in.** The people who design great workflows deserve to earn from them.
6. **Honest by default.** Clear rights, no fake urgency, no dark patterns, labelled demos.
7. **Model-agnostic.** Route to the best engine for the job, not the one with the best partnership.

**Brand personality:** precise, quiet, confident, a little playful. Ink black, bone, electric lime; editorial typography with generous whitespace.

---

## 4. Goals and non-goals

### 4.1 Goals (first 12 months)

| Goal | Metric | Target |
|---|---|---|
| Activate new users | % who complete an accepted render within 10 min | ≥ 45% |
| Retain creators | Week-4 retained active workspaces | ≥ 25% |
| Prove willingness to pay | Free → paid conversion | 5–8% |
| Build a habit | ≥ 4 accepted assets per active workspace per month | ≥ 40% of actives |
| Keep economics healthy | Contribution margin after inference | ≥ 55% |
| Validate storefront | % of paid workspaces using ≥ 1 storefront app | ≥ 60% |
| Build supply | Published creator workflows | 50 by month 12 |
| Build trust | Refund rate / billing complaints | < 2% / < 0.5% |

### 4.2 Non-goals (MVP)

- Training foundation models from scratch.
- Replacing a full non-linear editor (Premiere/Resolve).
- Real-time collaborative editing.
- Open self-serve creator marketplace at launch (invite-only pilot).
- Enterprise SSO, procurement and data residency.
- Native mobile apps.
- Audio/music generation (P2).
- Publishing directly to social platforms.
- Being the cheapest raw model API.

---

## 5. Users and jobs

### 5.1 Primary personas

**A. Maya — solo creator / operator**
- 26–38, publishes 5–20 short-form assets per week.
- Pays for 2–3 AI tools; edits on a laptop.
- Needs speed, hooks, captions, a recognisable look.
- Success: a week of content in one afternoon; no surprise spend.
- Fears: wasting hours on bad renders, looking generic, running out of credits.

**B. Dev — lean marketing lead**
- 28–42, at a DTC or SaaS company with a small team.
- Owns paid social, product launches and lifecycle content.
- Needs variants, brand consistency, approvals and rights.
- Success: more creative variants per campaign without a bigger team.
- Fears: off-brand output, compliance issues, budget opacity.

**C. Sol — boutique studio creative director**
- 30–45, runs a 3–10 person studio.
- Uses AI for concept exploration and select finals.
- Needs fast visual territories, strong craft controls, client review.
- Success: three pitches before lunch; finals that can pass client review.
- Fears: AI-looking output, version chaos, no defensible craft.

### 5.2 Jobs to be done

1. "When I have a launch next week, help me produce a coherent set of assets so I can publish without hiring a crew."
2. "When I find a workflow that works, let me reuse it with my product and brand without rebuilding the prompt every time."
3. "When I generate a sequence, keep the character and product consistent so the result feels intentional."
4. "When I try a new model, show me the cost and the best route before I commit."
5. "When a client asks for a different ratio or hook, let me generate variants without starting over."
6. "When I publish commercially, give me clear rights and no ugly watermark."

---

## 6. Positioning

**Positioning statement**

> For creators and lean marketing teams who need publish-ready assets every week, Zupona is the creative storefront and studio that turns a brief into images, video and ads across the best models — with transparent costs and locked brand consistency. Unlike single-model tools or blank canvases, Zupona starts from an outcome and keeps the whole production in one place.

**Tagline:** *Your imagination, with a ship date.*

**Competitive alternatives**

- Single-model tools (Kling, Veo/Flow): quality without workflow.
- Aggregators (Higgsfield): breadth without calm or cost clarity.
- End-to-end video tools (InVideo): automation without taste/consistency.
- Traditional tools (Canva, Adobe): control without generation-native workflows.

**Differentiators**

1. Outcome storefront with inspectable, remixable recipes.
2. One visible credit balance and cost-before-render.
3. Persistent character/product/brand memory.
4. Model-agnostic routing with quality and cost objectives.
5. Creator marketplace with a published revenue split.
6. Plain-language rights and privacy.

---

## 7. Scope

### 7.1 MVP (P0) — included in this concept build

| Area | Scope |
|---|---|
| Marketing site | Homepage with hero, model roster, storefront preview, manifesto, features, workflow, gallery, personas, pricing, FAQ, CTA |
| Storefront | 12 curated apps, search, category filters, sorting, app detail pages, sample prompts, one-click run |
| Studio | Image + video modes, 6 routes, prompt composer, surprise/enhance, 4 aspect ratios, 5s/10s, credit estimate, mock generation, progress stages, result actions |
| Library | Local persistence, recent runs, download, remix, delete, clear, reset demo credits |
| Pricing | Free / Creator / Studio, monthly/annual toggle, comparison table, credit examples, FAQ |
| Auth | Demo sign-in / guest flow; no real identity |
| Generation API | Validated POST, in-memory job store, polling, deterministic locally rendered SVG result |
| Research | Public `/research` summary and repository docs |
| Instrumentation | Demo-level UI states; analytics spec defined, not wired |

### 7.2 P0 production requirements (not implemented in the demo)

- Real authentication and accounts.
- Postgres persistence, object storage, job queue.
- Server-side credit ledger and Stripe billing.
- Two production model adapters with failover.
- Image/video moderation and consent flows.
- MP4/PNG export pipeline.
- Project/workspace model, brand kits, character memory.
- Real analytics and error monitoring.

### 7.3 P1 — beta

- Workspaces and seats.
- Brand kit (palette, type, tone, guardrails).
- Character/product references and consistency scoring.
- Project boards, versions, comments and review links.
- Real adapters: one premium video model + one fast video model + two image models.
- Real credit ledger, Stripe subscriptions, top-ups.
- Moderation pipeline and takedown flow.
- Basic timeline/trim/stitch for video.
- Public API beta with keys and usage dashboard.
- Invite-only creator marketplace pilot.
- C2PA/provenance metadata on exports.

### 7.4 P2 — expansion

- Open creator marketplace with payouts.
- Audio: voice, music, SFX, lip-sync.
- Mobile apps and camera capture.
- Enterprise: SSO/SCIM, audit logs, data residency, custom routing, SLA.
- Publishing integrations (TikTok, Meta, YouTube, Shopify).
- Multi-language UI and localisation.
- Advanced editing / NLE handoff.
- Fine-tuned brand models.

---

## 8. Information architecture

```
/                         Marketing homepage
/store                    Storefront discovery
/store/[slug]             App detail + run
/studio                   Generation canvas
  ?app=slug               Preset workflow
  ?prompt=...             Preset prompt
  ?model=...              Preset model
/library                  Local saved runs (demo); account library (prod)
/pricing                  Plans + credit comparison
/login                    Demo auth / guest
/research                 Research + PRD summary
/legal                    Terms, privacy, AI policy (concept)
```

**Primary navigation:** Storefront · Studio · Library · Pricing. Right side: Sign in / Open studio.

**Future routes**

```
/projects/[id]            Project board / timeline
/brand                    Brand kits
/characters               Character and product memory
/creators                 Creator marketplace + dashboard
/settings/billing         Subscription, invoices, credits
/admin                    Catalog, moderation, payouts
```

---

## 9. Key user journeys

### 9.1 First-time creator — storefront path

1. Lands on homepage or an SEO app page.
2. Browses storefront, filters to Social.
3. Opens **UGC Ad Lab**; sees outputs, inputs, steps, cost (24 credits), sample prompts.
4. Clicks a sample prompt → Studio opens with the app, prompt and model pre-filled.
5. Reviews cost (24 credits) and presses Generate.
6. Sees staged progress ("Reading the brief → Routing → Rendering") and a result in ~4 seconds (demo).
7. Downloads SVG (demo) / MP4 (prod), sees the run saved to Library.
8. Returns to Storefront to try another outcome.
9. Sees 96 credits left and a contextual top-up/plan CTA.

**Success:** first accepted render in under 10 minutes, no dead ends.

### 9.2 Recurring marketer — brand path (P1)

1. Signs in, opens workspace with brand kit loaded.
2. Creates a project, adds product references and audience notes.
3. Runs Product Studio; costs are shown before each render.
4. Generates 6 variations; marks 2 as approved, rejects 4 with reasons.
5. Exports approved assets in 1:1, 4:5 and 9:16 with captions.
6. Shares a review link with a stakeholder.

**Success:** coherent assets, no off-brand output, approval without a designer in the loop.

### 9.3 Creator publisher — marketplace path (P1/P2)

1. Applies to the creator programme; account reviewed.
2. Builds a workflow in the Studio and runs it 3+ times.
3. Adds inputs, steps, sample prompts, outputs and a price.
4. Submits for review; QA checks quality, safety and cost accuracy.
5. Publishes; storefront page goes live.
6. Earns 70% of platform margin on credits spent; dashboard shows runs, credits and payout status.

**Success:** quality supply, creators earn, buyers get reliable outcomes.

### 9.4 Failure journey

1. Render fails or times out.
2. Credits are automatically released/refunded.
3. User sees a clear error with a retry action and "report this route."
4. If failure rate for a route crosses threshold, the router automatically degrades to the fallback model.
5. Support has a job ID, provider request ID and cost record.

---

## 10. Functional requirements

Priority: **P0** = MVP / demo; **P1** = beta; **P2** = later.

### 10.1 Marketing site

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| MKT-01 | Homepage communicates the outcome and both surfaces (storefront + studio) | P0 | Hero CTA reaches `/studio` and `/store`; headline and subhead fit on 375px viewport without clipping |
| MKT-02 | Show the model roster with a clear claim of routing, not ownership | P0 | Model names rendered; disclaimer present; no implied affiliation |
| MKT-03 | Storefront preview links to real app pages | P0 | 4 featured apps; clicking a card opens the correct detail |
| MKT-04 | Worked example / studio mock | P0 | Preview is visibly a product UI and labelled demo where relevant |
| MKT-05 | Pricing preview matches `/pricing` | P0 | Plan names and prices identical; monthly/annual toggle functional |
| MKT-06 | FAQ answers pricing, rights, model and demo questions | P0 | Accordion keyboard accessible; no invented claims |
| MKT-07 | Contact and creator CTAs work | P0 | Mailto links open an email client |
| MKT-08 | SEO metadata and Open Graph image | P0 | Unique title/description per page; OG image renders |
| MKT-09 | Honest social proof only | P0 | No fabricated logos, testimonials or user counts |

### 10.2 Storefront

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| STORE-01 | Curated app catalogue | P0 | 12 apps with name, category, tagline, credits, model, tags |
| STORE-02 | Search across name, tagline, description, model, tags | P0 | Case-insensitive; empty state; clear/reset |
| STORE-03 | Filter by category and sort by featured/credits/name | P0 | Combined filters work; counts accurate |
| STORE-04 | App detail page | P0 | Inputs, outputs, steps, sample prompts, cost, runtime, model and preview visible |
| STORE-05 | One-click run | P0 | Opens Studio with app prompt/model and a visible preset banner |
| STORE-06 | App content quality gate | P1 | Admin review required before publish; versioned; removal workflow |
| STORE-07 | Creator attribution and remix terms | P1 | Creator name, revenue share and licence shown on detail page |
| STORE-08 | Localisation and currency display | P2 | Prices localised; credit cost unchanged |

### 10.3 Studio

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| GEN-01 | Prompt composer | P0 | 3–1,200 chars; live count; validation message; keyboard focus |
| GEN-02 | Mode switch (image/video) | P0 | Switching mode selects a valid default model; audio labelled "soon" |
| GEN-03 | Model selection | P0 | 3 models per mode; shows tagline, resolution, latency, credits; route source noted |
| GEN-04 | Aspect ratio | P0 | 1:1, 4:5, 16:9, 9:16; reflected in result container |
| GEN-05 | Video duration | P0 | 5s/10s; cost updates with model and duration |
| GEN-06 | Cost preview | P0 | Credits shown before generate and in the button; server recalculates |
| GEN-07 | Generate action | P0 | Validates, reserves cost, creates job, prevents double submit |
| GEN-08 | Progress feedback | P0 | Polls job; shows stage, percentage and ETA; no layout shift |
| GEN-09 | Result actions | P0 | Download, copy prompt, run again, new canvas |
| GEN-10 | Library save | P0 | Completed run auto-saved once; survives page reload locally |
| GEN-11 | Error handling | P0 | Insufficient credits, invalid prompt and network errors have clear recovery |
| GEN-12 | "Surprise me" and "Enhance" | P0 | Prompt changes visibly; no duplicate suffix when enhanced twice |
| GEN-13 | Demo honesty | P0 | "Demo mode" visible; no claim of real model call |
| GEN-14 | Reference uploads | P1 | Up to 6 images (≤20MB); validated types; preview; consent for faces |
| GEN-15 | Character/product memory | P1 | Reusable ID; continuity check; drift warning |
| GEN-16 | Batch variations | P1 | Generate 2–9 variants; item-level status; partial failure refunds |
| GEN-17 | Timeline/stitch | P1 | Reorder clips, trim, export a sequence |
| GEN-18 | Audio workflow | P2 | Voice/music/SFX with per-track licence |

### 10.4 Library and projects

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| LIB-01 | Local library in demo | P0 | Saved runs persist across reloads; empty and populated states |
| LIB-02 | Download and remix | P0 | Download works; remix presets prompt/model |
| LIB-03 | Delete and clear | P0 | Destructive actions confirm; credits unchanged |
| LIB-04 | Reset demo credits | P0 | Restores 120 demo credits with feedback |
| LIB-05 | Account library | P1 | Server-backed, paginated, searchable, project-scoped |
| LIB-06 | Version history | P1 | Every generation versioned; restore previous |
| LIB-07 | Sharing | P1 | Review link with permissions and expiry |

### 10.5 Credits and billing

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| CRED-01 | Plan credits | P0 (display) / P1 (enforce) | Free 60, Creator 1,200, Studio 4,000 pooled (configurable) |
| CRED-02 | Pre-render reservation | P1 | Credits reserved atomically; captured on success; released on failure |
| CRED-03 | Refund on failed render | P1 | Automatic within 60s; ledger entry visible |
| CRED-04 | No auto-overage | P1 | Render blocked at zero; explicit top-up required |
| CRED-05 | Rollover | P1 | Paid credits valid 60 days; FIFO consumption |
| CRED-06 | Public rate card | P1 | Per-model credit and effective $ rate shown |
| CRED-07 | Top-ups | P1 | One-time packs; immediate balance |
| CRED-08 | Invoices and tax | P1 | Stripe invoices; VAT/tax handled by region |
| CRED-09 | Plan changes | P1 | Upgrade immediate, downgrade at period end, proration |
| CRED-10 | Fraud/abuse limits | P1 | Velocity limits; free-tier device/account heuristics |
| CRED-11 | Creator revenue share | P2 | 70% of platform margin; KYC; 30-day payout |
| CRED-12 | API usage billing | P2 | Pay-as-you-go with spend caps and alerts |

### 10.6 Accounts and workspaces

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| AUTH-01 | Demo sign-in / guest | P0 | Both paths reach Studio; no data leaves the browser |
| AUTH-02 | Real auth | P1 | Email magic link + OAuth; session expiry; sign out everywhere |
| AUTH-03 | Workspaces and roles | P1 | Owner/admin/editor/viewer; seat invitations |
| AUTH-04 | SSO/SCIM | P2 | SAML/OIDC, JIT provisioning |
| AUTH-05 | Delete account | P1 | Cascades with retention policy; export option |

### 10.7 Trust, safety and rights

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| SAFE-01 | Content policy | P0 (copy) / P1 (enforcement) | Public policy covers sexual content involving minors, NCII, impersonation, violence, hate, illegal goods |
| SAFE-02 | Prompt and output moderation | P1 | 3 layers: pre-check, provider filter, post-check; block with reason |
| SAFE-03 | Likeness consent | P1 | Affirmative consent required for real-person references; revocable |
| SAFE-04 | Copyright/IP complaints | P1 | Takedown form, SLA, repeat-infringer policy |
| SAFE-05 | Provenance | P1 | C2PA metadata on exports; visible AI label option |
| SAFE-06 | No training on customer data | P0 (policy) | Documented; contractual; verified by provider terms |
| SAFE-07 | Data deletion | P1 | User-initiated; completed within 30 days; backups purged |
| SAFE-08 | Age gate | P1 | 18+ for generation; age-appropriate marketing |

### 10.8 Admin and operations

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| ADMIN-01 | Catalog CMS | P1 | Create/edit/version apps; preview; publish/unpublish |
| ADMIN-02 | Moderation queue | P1 | Report triage, asset review, account actions, audit log |
| ADMIN-03 | Route health | P1 | Success rate, p50/p95 latency, cost per accepted asset per model |
| ADMIN-04 | Credit adjustments | P1 | Manual grants/refunds with reason and audit trail |
| ADMIN-05 | Creator review | P2 | Application, quality score, payout status |
| ADMIN-06 | Feature flags | P1 | Per-workspace and global flags |

### 10.9 API (developer)

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| API-01 | Public REST API | P2 | Key auth, scopes, rate limits, OpenAPI spec |
| API-02 | Create generation | P2 | Idempotency key; returns job; credits reserved |
| API-03 | Poll or webhook | P2 | Signed webhook with retries; job status contract |
| API-04 | Asset URLs | P2 | Signed, expiring URLs; CDN |
| API-05 | Usage endpoint | P2 | Credits consumed by route/day |
| API-06 | Spend controls | P2 | Hard monthly cap; email alerts at 50/80/100% |

---

## 11. Architecture

### 11.1 Logical architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Web app (Next.js, TypeScript, Tailwind)                     │
│  Marketing · Storefront · Studio · Library · Pricing         │
└───────────────────────┬──────────────────────────────────────┘
                        │ HTTPS (BFF / REST / tRPC)
┌───────────────────────▼──────────────────────────────────────┐
│  API layer                                                   │
│  Auth · Rate limits · Validation · Credits · Storefront      │
└───────┬───────────────┬───────────────┬──────────────────────┘
        │               │               │
┌───────▼─────┐  ┌──────▼───────┐  ┌────▼──────────────┐
│ PostgreSQL  │  │ Redis / Queue│  │ Object storage    │
│ users       │  │ jobs         │  │ inputs, outputs   │
│ workspaces  │  │ rate limits  │  │ CDN + signed URLs │
│ generations │  │ cache        │  │                   │
│ ledger      │  └──────┬───────┘  └───────────────────┘
└─────────────┘         │
                ┌───────▼──────────────────────────────┐
                │  Orchestrator / Model Router          │
                │  prompt compiler · cost guard · retry │
                └───┬──────────┬──────────┬────────────┘
                    │          │          │
              ┌─────▼───┐ ┌────▼────┐ ┌───▼────────┐
              │ Kling   │ │ Veo     │ │ Seedance   │  … adapters
              └─────────┘ └─────────┘ └────────────┘
                    │          │          │
                ┌───▼──────────▼──────────▼────┐
                │  Post-processing              │
                │  upscale · caption · transcode│
                │  watermark · provenance       │
                └───────────────────────────────┘
```

### 11.2 Key services

| Service | Responsibility |
|---|---|
| **Web/BFF** | Marketing, authenticated app, server actions, proxy to API |
| **Identity** | Auth, sessions, workspaces, roles |
| **Catalog** | Storefront apps, versions, pricing, creator attribution |
| **Generation API** | Validate, reserve credits, enqueue, return job |
| **Orchestrator** | Route to adapter, retries, fallback, timeouts, post-processing |
| **Model Router** | Choose route from intent, quality history, cost, availability, plan |
| **Consistency** | Character/product/brand references, embeddings, drift checks |
| **Credit Ledger** | Double-entry accounting, reservations, refunds, rollover |
| **Billing** | Stripe subscriptions, invoices, top-ups, revenue share |
| **Moderation** | Prompt pre-check, output post-check, report queue |
| **Asset Service** | Upload, validation, storage, signed URLs, CDN |
| **Analytics** | Product events, funnel, cost per accepted asset |
| **Admin** | Catalog, moderation, route health, credits, creators |

### 11.3 Provider adapter contract

```ts
interface VideoAdapter {
  id: string;
  supports(input: GenerationInput): boolean;
  estimateCost(input: GenerationInput): Promise<ProviderCost>;
  submit(input: ProviderInput): Promise<{ providerJobId: string }>;
  poll(providerJobId: string): Promise<ProviderStatus>;
  cancel(providerJobId: string): Promise<void>;
  normalizeResult(result: unknown): Promise<GeneratedAsset[]>;
}
```

Adapters must be isolated behind a stable internal schema so models can be swapped without changing the UI or job contract.

### 11.4 Demo implementation (this repo)

- **Next.js 16 App Router**, React 19, TypeScript, Tailwind CSS v4.
- **No database or external model.** Jobs live in an in-memory `Map` in the server process.
- `POST /api/generate` validates the request with Zod, calculates credits, creates a job.
- `GET /api/jobs/[id]` simulates progress from elapsed time.
- `GET /api/render/[id]` returns a deterministic SVG artwork seeded by job ID + prompt.
- Library and credits use `localStorage`.
- The UI labels demo mode and does not imply a live model call.
- The design is original; competitor references are limited to nominative comparative research.

**Limitations:** in-memory jobs do not survive a server restart or scale across instances; local library is per browser; no real uploads, moderation, auth or billing. These are intentionally out of scope for the prototype.

---

## 12. Data model

### 12.1 Core entities

| Entity | Key fields |
|---|---|
| `users` | id, email, name, avatar_url, created_at, status, locale |
| `workspaces` | id, name, slug, plan_id, credits_pooled, created_at |
| `memberships` | workspace_id, user_id, role, joined_at |
| `projects` | id, workspace_id, name, brief, status, created_at |
| `assets` | id, workspace_id, project_id, kind, storage_key, mime, width, height, duration, checksum, provenance, created_at |
| `generations` | id, workspace_id, project_id, app_version_id, model_id, mode, prompt, params_json, status, cost_credits, provider, provider_job_id, error_code, created_by, created_at, completed_at |
| `generation_inputs` | generation_id, asset_id, role (reference/first_frame/product/character) |
| `generation_outputs` | generation_id, asset_id, rank, score, selected, rejection_reason |
| `models` | id, provider, public_name, mode, status, unit_costs_json, max_resolution, max_duration, quality_score |
| `apps` | id, slug, name, category, status, current_version_id, creator_id |
| `app_versions` | id, app_id, version, prompt_recipe_json, inputs_schema_json, credits, model_policy, changelog, published_at |
| `app_runs` | id, app_version_id, generation_id, user_id, workspace_id, input_json, accepted |
| `credit_ledger` | id, workspace_id, user_id, kind (grant/reserve/capture/refund/rollover/purchase), amount, balance_after, generation_id, stripe_event_id, created_at |
| `subscriptions` | id, workspace_id, plan_id, status, period_start, period_end, stripe_ids |
| `brand_kits` | id, workspace_id, name, palette_json, fonts_json, tone, logo_asset_id, guardrails_json |
| `characters` | id, workspace_id, name, reference_asset_ids, embedding_ref, consent_record_id, status |
| `review_links` | id, project_id, token_hash, permissions, expires_at |
| `moderation_events` | id, subject_type, subject_id, classifier, decision, reason, reviewer_id |
| `api_keys` | id, workspace_id, name, hash, scopes, last_used_at, revoked_at |
| `audit_logs` | id, workspace_id, actor, action, target, metadata, created_at |

### 12.2 Invariants

- A generation's captured credits must equal its reserved credits unless a partial refund is recorded.
- Every credit mutation writes a ledger row with `balance_after`.
- A completed generation must have at least one output asset or a failure reason.
- An app version is immutable after publish; edits create a new version.
- Deleting a user soft-deletes identity but preserves financial ledger rows for compliance.
- No model route can be used unless it has a current cost table and moderation policy.

---

## 13. API design (production)

Base: `https://api.zupona.ai/v1`

### 13.1 Create a generation

```http
POST /v1/generations
Authorization: Bearer <token>
Idempotency-Key: 7f9b8bd0-...
Content-Type: application/json
```

```json
{
  "prompt": "A glass koi swimming through clouds at golden hour, slow orbit, 35mm",
  "model": "zupona-motion-3",
  "mode": "video",
  "aspect": "9:16",
  "duration": 5,
  "app": "character-reel",
  "project_id": "prj_123",
  "references": [
    { "asset_id": "ast_1", "role": "character" }
  ]
}
```

**201 Created**

```json
{
  "id": "gen_01J...",
  "status": "queued",
  "estimated_credits": 24,
  "reserved_credits": 24,
  "model": "zupona-motion-3",
  "eta_seconds": 38,
  "created_at": "2026-10-21T09:30:00Z"
}
```

Errors: `400 invalid_request`, `401 unauthorized`, `402 insufficient_credits`, `403 moderation_blocked`, `404 model_unavailable`, `409 idempotency_conflict`, `429 rate_limited`, `503 route_unavailable`.

### 13.2 Get a generation

```http
GET /v1/generations/gen_01J...
```

```json
{
  "id": "gen_01J...",
  "status": "completed",
  "progress": 100,
  "outputs": [
    {
      "asset_id": "ast_9",
      "url": "https://cdn.zupona.ai/...signed...",
      "width": 1080,
      "height": 1920,
      "duration": 5,
      "mime": "video/mp4"
    }
  ],
  "credits_captured": 24,
  "provider": "kling",
  "provenance": { "c2pa": true, "ai_generated": true }
}
```

### 13.3 Other endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/apps` | List/publish catalog with filters |
| GET | `/v1/apps/:slug` | App detail + current version |
| POST | `/v1/apps/:slug/runs` | Run an app with inputs |
| GET | `/v1/models` | Available routes, capabilities, credit cost |
| GET | `/v1/projects` | List projects |
| POST | `/v1/projects` | Create project |
| POST | `/v1/assets` | Upload (signed URL flow) |
| GET | `/v1/credits/balance` | Balance + expiring credits |
| GET | `/v1/credits/ledger` | Paginated ledger |
| POST | `/v1/topups` | Create top-up checkout |
| POST | `/v1/webhooks/stripe` | Billing events |
| POST | `/v1/moderation/reports` | Report content |
| GET | `/v1/usage` | Usage and cost breakdown |

### 13.4 Webhooks (outbound)

`generation.completed`, `generation.failed`, `credits.low`, `subscription.updated`, `app.published`. Signed with HMAC, 5-minute tolerance, exponential retries for 24h, dead-letter after 10 attempts.

---

## 14. Generation pipeline

### 14.1 State machine

```
requested
  → validating
      → blocked (moderation / invalid)
  → reserving_credits
      → insufficient_credits
  → queued
  → routing
  → generating (provider)
      → retrying (max 1 fallback)
  → post_processing
  → completed
  → failed (credits released, reason recorded)
  → cancelled (credits released)
```

### 14.2 Rules

- **Timeouts:** submit 30s, video generation 10 min, post-processing 3 min. A timeout triggers one fallback route, then failure.
- **Idempotency:** client key + user + request hash deduplicates for 24h.
- **Cost guard:** server recalculates price; the client estimate is never authoritative. If the price changed since page load, return `409 price_changed` with new cost.
- **Reservation:** atomically decrement available credits at queue time; capture on success; release on failure. Partial batch failures release the item cost.
- **Routing:** rank eligible models by expected acceptance quality (route history), cost, latency and availability. Respect plan entitlements and regional restrictions.
- **Fallback:** only to a route with equal or lower price, unless the user opts in. Never charge more without consent.
- **Provider terms:** store provider request IDs; respect each provider's safety filters; surface refusal reasons without leaking sensitive internals.
- **Post-processing:** transcode, upscale, caption, watermark (free plan), provenance metadata, thumbnail, strip unsafe metadata.
- **Observability:** every transition logged with generation_id, provider, attempt, latency and cost.

### 14.3 Demo pipeline

The repository simulates the state machine with elapsed time. There is no queue, no credit ledger, and no external call. The UI still demonstrates validation, cost display, progress stages, completion and local library persistence. See §11.4.

---

## 15. Credits and billing specification

### 15.1 Plans (concept)

| Plan | Price (annual/mo) | Credits | Seats | Export | Commercial |
|---|---:|---:|---:|---|---|
| Free | $0 | 60/mo | 1 | 720p, watermark | No |
| Creator | $15 (annual) / $19 (monthly) | 1,200/mo | 1 | 1080p + 2K | Yes |
| Studio | $39 (annual) / $49 (monthly) | 4,000 pooled/mo | 3 | 4K | Yes |
| Enterprise | Custom | Custom | Unlimited | Custom | Yes |

Credit prices here are illustrative. Production pricing must be calibrated against p50 inference costs per route with a margin floor.

### 15.2 Ledger design

- **Double-entry style**: each mutation has `kind`, `amount`, `balance_after`, `reference`.
- **Reserve → capture**: reserve at job creation, capture at success. Any unused reservation is released.
- **Refund**: full automatic refund on failed render; no support ticket required.
- **Rollover**: paid monthly credits valid 60 days; promotional/free credits 7–30 days and clearly labelled.
- **Consumption order**: expiring promotional credits → monthly plan credits → purchased top-ups.
- **Top-ups**: do not expire while subscribed; 12-month expiry if the subscription is cancelled.
- **No auto-overage.** Block and prompt.
- **Disputes**: every render links to the provider cost and credit ledger entry.

### 15.3 Unit economics guardrails

- Every route has a `credit_price = ceil(p50_provider_cost × (1 + buffer) / target_revenue_per_credit)`.
- Target contribution margin: 55–65%.
- Track **cost per accepted asset**, not cost per render. Rejected/retried renders are part of COGS.
- Free tier has a hard monthly compute budget and abuse controls.
- Recalculate route prices weekly from provider invoices and acceptance data.
- Creator payouts: 70% of **platform margin** (credits revenue minus compute and payment fees), not gross.

### 15.4 Payment and fraud

- Stripe Checkout + Customer Portal; webhooks as source of truth.
- 3DS where required; tax handled by Stripe Tax.
- Velocity limits per account, card fingerprint and IP for free/entry tiers.
- Manual review for top-up anomalies and marketplace payouts.
- Clear refund policy: unused subscription refunds within 72h; failed renders refunded in credits automatically.

---

## 16. Safety, rights and privacy

### 16.1 Content safety

- Prohibited: CSAM, non-consensual intimate imagery, sexual content involving minors, realistic impersonation without consent, incitement to violence, hateful content, illegal goods, malware, fraud.
- Layered enforcement: prompt classifier → provider moderation → output classifier → user report → human review.
- High-risk categories (real faces, public figures, minors, medical/financial claims) require extra confirmation or are blocked.
- Every block returns a stable reason code and appeal path.
- Storefront creators are accountable for their recipes; the platform remains the moderation layer.

### 16.2 Likeness and consent

- Uploading a real person's face requires an affirmative consent attestation.
- Character memory stores a consent record; consent can be revoked, which disables future generations using that character.
- Public figures are blocked for commercial/endorsement contexts unless verified authorisation exists.

### 16.3 Copyright and IP

- Users must own or have rights to uploaded references.
- A clear takedown process with SLA (24h acknowledgement, 5 business days decision).
- Repeat-infringer policy with account termination.
- Do not train foundation models on customer content. If brand-specific tuning is offered later, it must be opt-in, private and deletable.
- Output rights follow provider terms; Zupona grants the broadest licence it can and documents exceptions.
- Provenance: attach C2PA metadata where supported; display an "AI-generated" label option.

### 16.4 Privacy

- Data minimisation: collect only what is needed for the workflow.
- Encrypt at rest and in transit; signed, expiring asset URLs.
- Data processing agreements for business customers.
- Retention: assets until deleted; logs 90 days; financial records per legal requirement.
- Region-aware routing and storage for regulated customers (P2).
- No sale of personal data. No ad-tech pixels on authenticated pages without consent.
- Subprocessors listed publicly with change notices.

---

## 17. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Marketing LCP < 2.5s on mobile 4G; studio interactive < 2s; API p95 < 400ms excluding inference |
| Reliability | 99.9% monthly API availability; graceful fallback when a route is down; no lost credit reservations |
| Scalability | 10k concurrent jobs at launch horizon; queue backpressure; per-route concurrency controls |
| Security | OWASP ASVS L2; CSP; CSRF protection; secrets in a manager; least privilege; dependency scanning; annual pen test |
| Privacy | GDPR/CCPA ready; DPA; deletion within 30 days; data export |
| Accessibility | WCAG 2.2 AA; keyboard operable; visible focus; reduced-motion support; captions on video demos |
| SEO | Server-rendered marketing and app pages; canonical URLs; structured data; sitemap; OG images |
| Observability | Structured logs, traces, error budgets, route dashboards, cost dashboards, alerting on failure/refund spikes |
| Localisation | English at launch; copy externalised; RTL-ready layout tokens (P2) |
| Browser support | Last two versions of Chrome, Safari, Firefox, Edge; mobile Safari/Chrome |
| Compliance | Age gate 18+; AI disclosure; provider terms; accessibility statement |

---

## 18. Analytics

### 18.1 Event schema (selected)

| Event | Properties |
|---|---|
| `page_view` | path, referrer, device, experiment |
| `storefront_search` | query, category, result_count |
| `app_viewed` | app_slug, category, creator |
| `app_run_started` | app_slug, app_version, inputs_complete |
| `studio_prompt_changed` | mode, length, source (manual/sample/enhance) |
| `model_selected` | model, mode, credits |
| `generation_requested` | model, mode, aspect, duration, credits, app_version |
| `generation_completed` | latency_ms, provider, credits, output_count |
| `generation_failed` | reason, provider, retry_count |
| `result_downloaded` | format, asset_type |
| `result_remixed` | generation_id |
| `library_opened` | count |
| `pricing_viewed` | billing_period |
| `checkout_started` | plan, interval |
| `checkout_completed` | plan, interval, revenue |
| `credits_low` | remaining, plan |
| `creator_application` | source |

### 18.2 Funnels

- **Activation:** landing → app view → studio preset → first generation → completed → downloaded/saved.
- **Paid conversion:** credits low → pricing → checkout → subscription.
- **Storefront health:** impressions → detail views → runs → accepted outputs → remix.
- **Creator supply:** application → draft → review → publish → first run → payout.

### 18.3 Guardrail metrics

- Cost per accepted asset (by route, app and plan).
- Refund/credit-complaint rate.
- Moderation block rate and appeal overturn rate.
- Route failure and fallback rate.
- Support tickets per 1,000 generations.
- Free-tier abuse rate.
- Upload/asset storage cost per active workspace.

---

## 19. Go-to-market

### 19.1 Beachhead

**UGC ads + product studio** for DTC brands and solo creators. These are recurring, budgeted, measurable outcomes. A single workflow can demonstrate ROI: "Make nine ad variants from one product photo."

### 19.2 Launch sequence

1. **Private alpha** — 50 invited creators; three workflows; manual QA; no marketplace.
2. **Public beta** — waitlist; 12 curated apps; Free + Creator; referral loop; creator programme applications.
3. **Creator pilot** — 12–20 publishers; rev-share; quality bar; editorial storefront.
4. **GA** — Studio plan, API beta, brand kits, project boards.
5. **Marketplace expansion** — open applications; category expansion; enterprise pilots.

### 19.3 Acquisition

- SEO outcome pages ("AI UGC ad generator", "product photo AI", "consistent character generator") with real runnable demos and transparent pricing.
- Creator-led demos on TikTok/YouTube/Instagram showing before/after workflows, not just flashy clips.
- Programmatic comparison pages (cost per asset, model routing) built from live rate cards.
- Community: Discord, creator challenges, template drops.
- Referral: credits for inviter and invitee after first accepted asset.
- Partnerships: DTC agencies, Shopify app ecosystem (P2).

### 19.4 Positioning discipline

- Never fabricate users, revenue, logos or testimonials.
- Label simulated demos.
- Publish the rate card and change log.
- Show limitations, not just hero renders.
- Keep claims about third-party models factual and nominative.

---

## 20. Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| **0. Concept prototype** | Weeks 0–4 | This repo: marketing, storefront, studio demo, library, pricing, research + PRD |
| **1. Production foundation** | Weeks 4–10 | Auth, Postgres, storage, queue, real generation API, 2 video + 2 image adapters, credits ledger, Stripe, moderation v1, MP4/PNG export |
| **2. Private alpha** | Weeks 10–16 | 3 flagship apps, brand kit v1, character references, project library, review links, analytics, 50 alpha users |
| **3. Public beta** | Weeks 16–24 | 12 apps, Free + Creator plans, on-boarding, SEO pages, referrals, API beta, 500–2,000 users |
| **4. Creator pilot** | Weeks 24–32 | Creator dashboard, quality review, rev-share, payouts, storefront v2 |
| **5. GA** | Weeks 32–44 | Studio plan, teams, API usage controls, enterprise pilot, expanded model roster |
| **6. Expansion** | Months 12–18 | Marketplace open, audio, mobile, publishing integrations, enterprise compliance |

**Kill criteria for the concept:** if <25% of beta users complete a second accepted run within 14 days, revisit the workflow thesis before adding models or marketplace features.

---

## 21. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Inference costs exceed plan economics | Route-level margin floors, weekly cost recalibration, top-ups, no unlimited video, cap free tier |
| Model provider instability or ToS change | Multi-provider adapters, health checks, fallback routes, contractual review |
| Consistency quality disappoints | Narrow launch promise; reference-driven workflows; drift scoring; human QA |
| Storefront quality declines | Curated launch, versioning, quality score, removal policy, editorial review |
| Moderation bypass / harmful output | Layered moderation, consent, reporting, human review, provider filters, insurance |
| IP/likeness disputes | Consent records, takedown SLA, provenance, legal review, clear terms |
| Big platform bundles similar features | Deep workflow + marketplace + brand memory; integrate rather than fight where possible |
| Credit confusion returns | One balance, pre-render estimates, public rate card, no auto-overage, visible ledger |
| Demo mistaken for a live product | "Demo mode" labels, disclaimers, no fake billing, docs state limitations |
| Team spread too thin | Outcome-led roadmap, three flagship workflows, explicit non-goals |

---

## 22. Demo implementation notes

### 22.1 What is real in this repo

- Responsive marketing homepage and storefront with 12 app pages.
- Functional search, category filters and sorting.
- Studio with client state, validation, cost estimate, model/aspect/duration selection.
- Mock generation API with a typed in-memory job store and polling.
- Deterministic local SVG rendering based on job ID and prompt.
- Local library persistence, download, remix, delete and reset.
- Pricing page with monthly/annual toggle and comparison table.
- Demo auth and guest flow.
- Research and PRD docs plus a public research page.
- Type-safe code, lint and production build.

### 22.2 What is simulated

- Model calls (no external API).
- Authentication and accounts.
- Credits (localStorage, reset available).
- Billing (no payments).
- Uploads, references, brand kits, character memory.
- Moderation and review.
- MP4/video rendering (demo produces an SVG still with video metadata).
- Email, analytics, admin and marketplace payouts.

### 22.3 How to verify

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
# Open http://localhost:3000
# Home → Storefront → app detail → Studio → generate → Library
```

### 22.4 Production migration path

1. Replace `src/lib/jobs.ts` with a Postgres `generations` table and Redis/BullMQ queue.
2. Introduce `ModelAdapter` implementations and a router in the orchestrator.
3. Move credits from `localStorage` to the server ledger (reserve/capture/refund).
4. Add Auth.js/Clerk, workspace middleware and project-scoped queries.
5. Replace SVG render route with signed object-storage asset URLs.
6. Add moderation pre/post checks and consent records.
7. Wire analytics events (§18) and error monitoring.
8. Add Stripe and the billing portal.
9. Keep the frontend contract stable: `POST /api/generate` → job → poll, or move to SSE/webhooks.

---

## 23. Open questions

1. Which three workflows deliver the strongest repeat use and margin?
2. Should the storefront price be a flat app fee or a pass-through of model cost plus a platform fee?
3. How much of "consistency" can be solved without fine-tuning, and what is the cost per accepted asset?
4. Is a light timeline enough, or does the target customer require a full editor?
5. Which plan anchor works better: $19/mo or $29/mo with more credits?
6. How much free compute can we afford without attracting abuse?
7. Will creators publish high-quality workflows for 70% of platform margin?
8. What is the right enterprise wedge: agencies first, or in-house brand teams?
9. Should the public API be a first-class product at GA or a later expansion?
10. Which regions require data residency or provider restrictions from day one?

---

## Appendix A — Competitor snapshot (Oct 2026)

> Directional only. See [RESEARCH.md](./RESEARCH.md) for sources and caveats.

| Product | Entry | Mid | Top consumer | Core strength | Core gap |
|---|---|---|---|---|---|
| Higgsfield | ~$15–20/mo, ~200 cr | ~$49–66/mo, ~660–1,000 cr | ~$110–129/mo | Model breadth, creator tools | Pricing clarity, calm workflow |
| InVideo | ~$10–20/mo, 400 cr | ~$30–60/mo, 2,000 cr | ~$100–1,000/mo | Full video pipeline, localisation | Generic output, credit burn |
| Kling | ~$10/mo, 660 cr | ~$37–92/mo | ~$180/mo, 26,000 cr | Motion realism, price-performance | Point tool, continuity, support |
| Google Flow | Free 50 daily | ~$19.99/mo | ~$99.99–199.99/mo | Veo quality, cinematic controls | Walled garden, bundled cost |

## Appendix B — Requirement traceability (demo)

| PRD area | Demo status |
|---|---|
| MKT-01–MKT-09 | Implemented except real analytics and social proof (intentionally none) |
| STORE-01–STORE-05 | Implemented |
| STORE-06–STORE-08 | Not implemented |
| GEN-01–GEN-13 | Implemented (GEN-12 partial: simple enhance heuristic) |
| GEN-14–GEN-18 | Not implemented |
| LIB-01–LIB-04 | Implemented |
| LIB-05–LIB-07 | Not implemented |
| CRED-01 | Display/local demo only; production enforcement not implemented |
| CRED-02–CRED-12 | Not implemented |
| AUTH-01 | Implemented |
| AUTH-02–AUTH-05 | Not implemented |
| SAFE-01–SAFE-08 | Policy copy and disclaimers only; enforcement not implemented |
| ADMIN-* | Not implemented |
| API-* | Not implemented (internal demo API only) |
