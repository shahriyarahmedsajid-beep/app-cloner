import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Coins,
  FileText,
  GitBranch,
  Layers,
  Minus,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research & product brief",
  description:
    "The competitive research, positioning, product requirements, economics and roadmap behind the Zupona AI concept.",
};

const repo = "https://github.com/shahriyarahmedsajid-beep/app-cloner/blob/main";

const competitors = [
  {
    name: "Higgsfield",
    role: "The breadth play",
    snapshot:
      "An AI-native suite spanning 35+ models, character tools, UGC workflows, editing and a Supercomputer workspace.",
    strength: "Model breadth, speed, creator energy.",
    gap: "Pricing confusion, surface overload, partial continuity.",
    price: "~$15–129/mo",
    accent: 0,
  },
  {
    name: "InVideo",
    role: "The automation play",
    snapshot:
      "A prompt-to-complete-video agent with 250+ models, voice, templates, localisation and a Magic Editor.",
    strength: "End-to-end output, languages, distribution.",
    gap: "Generic results, credit burn, quality variance.",
    price: "~$10–200+/mo",
    accent: 4,
  },
  {
    name: "Kling",
    role: "The model play",
    snapshot:
      "Kuaishou's frontier video model family with native audio, motion control, avatars and a per-second API.",
    strength: "Motion realism, price-performance, cadence.",
    gap: "Point tool, no brand memory or production layer.",
    price: "~$10–180/mo",
    accent: 2,
  },
  {
    name: "Google Flow",
    role: "The ecosystem play",
    snapshot:
      "A cinematic studio on Veo 3.1, Gemini Omni and Nano Banana, with ingredients-to-video and Scenebuilder.",
    strength: "Model quality, native audio, trust, free tier.",
    gap: "Walled garden, bundled costs, limited routing.",
    price: "Free–$199.99/mo",
    accent: 5,
  },
];

const gaps = [
  {
    title: "Outcome storefront",
    body: "The market sells models and prompt packs. Almost nobody sells a runnable, inspectable workflow with a cost and an outcome.",
  },
  {
    title: "Cost clarity",
    body: "Every competitor uses credits. None makes cost prediction a first-class ritual. This is a category-wide trust gap.",
  },
  {
    title: "Continuity",
    body: "Single clips look great. Characters, products and visual language still drift across a sequence. This is the real technical job.",
  },
  {
    title: "Creator supply",
    body: "Workflow creators have no real marketplace. A curated, revenue-shared storefront can be a durable supply moat.",
  },
];

const metrics = [
  { value: "≥45%", label: "activation: accepted render in 10 min" },
  { value: "≥25%", label: "week-4 retained workspaces" },
  { value: "5–8%", label: "free → paid conversion" },
  { value: "≥55%", label: "contribution margin after inference" },
];

const roadmap = [
  {
    phase: "0",
    label: "Concept",
    time: "Weeks 0–4",
    detail:
      "Marketing, storefront, studio demo, local library, pricing, research and PRD. What you are looking at now.",
    active: true,
  },
  {
    phase: "1",
    label: "Production foundation",
    time: "Weeks 4–10",
    detail:
      "Auth, Postgres, storage, queue, two video and two image adapters, ledger, Stripe, moderation, MP4 export.",
  },
  {
    phase: "2",
    label: "Private alpha",
    time: "Weeks 10–16",
    detail:
      "Three flagship apps, brand kit, character references, projects, review links, analytics, 50 alpha users.",
  },
  {
    phase: "3",
    label: "Public beta",
    time: "Weeks 16–24",
    detail:
      "Twelve apps, Free + Creator plans, SEO outcome pages, referrals, API beta, 500–2,000 users.",
  },
  {
    phase: "4",
    label: "Creator pilot → GA",
    time: "Weeks 24–44",
    detail:
      "Invite-only marketplace, rev-share, Studio plan, teams, API usage controls and enterprise pilots.",
  },
];

const built = [
  "Responsive homepage and 12-app storefront",
  "Functional search, filters and sorting",
  "Studio with routes, ratios, costs and progress",
  "Mock generation API and job polling",
  "Locally rendered deterministic SVG results",
  "Local library with remix and download",
  "Brand kit editor with prompt directive handoff",
  "Pricing, credit calculator examples and FAQ",
  "Demo auth, research page and PRD docs",
];

const simulated = [
  "External AI model calls",
  "Authentication and accounts",
  "Server-side credits and billing",
  "Uploads, account-scoped brand kits and character memory",
  "Moderation, review and admin",
  "MP4 video rendering",
  "Analytics and error monitoring",
  "Creator marketplace and payouts",
];

export default function ResearchPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-[-60%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(196,181,253,0.11),transparent_65%)]" />
        <div className="shell relative pb-14 md:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-lime" />
              Research · PRD · 21 October 2026
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`${repo}/docs/RESEARCH.md`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/40 transition-colors hover:text-white/70"
              >
                <GitBranch className="h-3 w-3" />
                Research.md
              </a>
              <a
                href={`${repo}/docs/PRD.md`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/40 transition-colors hover:text-white/70"
              >
                <FileText className="h-3 w-3" />
                PRD.md
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="display max-w-3xl text-balance text-[46px] leading-[0.95] text-paper sm:text-[64px] md:text-[78px]">
                The thinking
                <br />
                <span className="text-white/30">behind Zupona.</span>
              </h1>
              <p className="pretty mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
                A desk-research teardown of Higgsfield, InVideo, Kling and Google
                Flow — followed by the product bet, requirements, economics and
                roadmap that shaped this prototype.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <ButtonLink href="/studio" className="group">
                  Try the concept
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href="#prd" variant="secondary">
                  Jump to the PRD
                </ButtonLink>
              </div>
              <p className="mt-5 max-w-lg text-[10px] leading-relaxed text-white/25">
                Independent concept. Not affiliated with or endorsed by any
                company named. Prices are point-in-time snapshots and change
                frequently.
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-2">
                {competitors.map((competitor, index) => (
                  <div
                    key={competitor.name}
                    className={cn(
                      "relative overflow-hidden rounded-[20px] border border-white/[0.09] bg-white/[0.02]",
                      index % 2 === 1 && "translate-y-5",
                    )}
                  >
                    <ArtTile variant={competitor.accent} className="aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-x-3 bottom-3 z-10">
                        <p className="font-display text-[14px] font-semibold text-paper">
                          {competitor.name}
                        </p>
                        <p className="text-[8.5px] uppercase tracking-[0.11em] text-white/35">
                          {competitor.role}
                        </p>
                      </div>
                    </ArtTile>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.1] bg-[#0d0f13]/95 px-3.5 py-2 text-[9px] text-white/45 shadow-2xl backdrop-blur">
                <Sparkles className="h-3 w-3 text-lime/70" />
                4 products · 30+ sources · 1 product bet
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">
              <span className="h-1 w-1 rounded-full bg-lime" />
              01 — The landscape
            </p>
            <h2 className="display max-w-2xl text-[34px] leading-[1.01] text-paper sm:text-[44px]">
              Four bets. One shared blind spot.
            </h2>
          </div>
          <p className="max-w-sm text-[12px] leading-relaxed text-white/35">
            Each product is excellent at its chosen layer. None owns the whole
            path from intent to a publish-ready asset with transparent economics.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {competitors.map((competitor) => (
            <div
              key={competitor.name}
              className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.12em] text-white/25">
                    {competitor.role}
                  </p>
                  <h3 className="mt-2 font-display text-[24px] font-semibold tracking-[-0.03em] text-paper">
                    {competitor.name}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[9px] text-white/35">
                  {competitor.price}
                </span>
              </div>
              <p className="pretty mt-3 text-[12px] leading-relaxed text-white/40">
                {competitor.snapshot}
              </p>
              <div className="mt-4 grid gap-2 border-t border-white/[0.06] pt-3 text-[10.5px] sm:grid-cols-2">
                <p className="flex items-start gap-1.5 text-white/40">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-lime/60" />
                  {competitor.strength}
                </p>
                <p className="flex items-start gap-1.5 text-white/30">
                  <Minus className="mt-0.5 h-3 w-3 shrink-0 text-white/25" />
                  {competitor.gap}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(217,255,67,0.06),rgba(255,255,255,0.02)_60%)] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="flex items-center gap-2 text-[9.5px] uppercase tracking-[0.13em] text-lime/70">
                <Target className="h-3.5 w-3.5" />
                The gap we chose
              </p>
              <h3 className="display mt-3 text-[28px] leading-[1.03] text-paper sm:text-[34px]">
                The workflow
                <br />
                is the product.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {gaps.map((gap) => (
                <div
                  key={gap.title}
                  className="rounded-xl border border-white/[0.07] bg-black/15 p-3.5"
                >
                  <p className="text-[11px] font-medium text-white/65">
                    {gap.title}
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-white/30">
                    {gap.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-paper py-14 text-ink md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/40">
              02 — Positioning
            </p>
            <h2 className="display mt-4 text-[36px] leading-[1.0] text-ink sm:text-[46px]">
              A storefront of outcomes,
              <span className="text-ink/35"> a studio for the work.</span>
            </h2>
          </div>
          <div>
            <blockquote className="border-l-2 border-ink/20 pl-6 font-display text-[20px] leading-[1.35] tracking-[-0.015em] text-ink/75 sm:text-[24px]">
              “For creators and lean teams who need publish-ready assets every
              week, Zupona turns a brief into images, video and ads across the
              best models — with transparent costs and locked brand consistency.”
            </blockquote>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10.5px] text-ink/45">
              {[
                "Outcome-first",
                "Cost before render",
                "Consistency memory",
                "Model-agnostic",
                "Creator-owned",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-ink/50" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="prd" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">
                <span className="h-1 w-1 rounded-full bg-lime" />
                03 — Product requirements
              </p>
              <h2 className="display max-w-2xl text-[34px] leading-[1.01] text-paper sm:text-[44px]">
                What v1 must do.
                <span className="text-white/30"> And what it must not.</span>
              </h2>
            </div>
            <a
              href={`${repo}/docs/PRD.md`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/35 transition-colors hover:text-white/70"
            >
              Full PRD
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-lime/70">
                <Layers className="h-3.5 w-3.5" />
                P0 scope
              </p>
              <div className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                {[
                  "Marketing homepage + SEO metadata",
                  "12 curated storefront apps",
                  "Search, categories, sorting",
                  "App detail with inputs, outputs, cost",
                  "One-click run with preset context",
                  "Image + video studio",
                  "Visible costs and progress stages",
                  "Result actions + local library",
                  "Pricing and credit explainer",
                  "Demo auth and research page",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-2 text-[11.5px] text-white/45"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime/60" />
                    {item}
                  </p>
                ))}
              </div>

              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/30">
                  Explicit non-goals for v1
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    "train foundation models",
                    "full NLE",
                    "real-time collab",
                    "open marketplace",
                    "native mobile",
                    "audio generation",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[9.5px] text-white/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-lilac/80">
                <TrendingUp className="h-3.5 w-3.5" />
                Beta success metrics
              </p>
              <div className="mt-4 space-y-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-start gap-3 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="w-14 shrink-0 font-display text-[20px] font-semibold tracking-[-0.03em] text-lime">
                      {metric.value}
                    </span>
                    <span className="pt-0.5 text-[10.5px] leading-relaxed text-white/35">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] leading-relaxed text-white/20">
                Kill criterion: if &lt;25% of beta users complete a second
                accepted run within 14 days, revisit the thesis.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/30">
                Primary users
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ["Solo creator", "Ships 5–20 short-form assets per week. Pays for 2+ AI tools."],
                  ["Lean marketing lead", "Owns paid social, launches and brand consistency on a small team."],
                  ["Boutique studio", "Needs three visual territories before lunch and finals that pass review."],
                ].map(([name, body]) => (
                  <div key={name}>
                    <p className="text-[12px] font-medium text-white/65">{name}</p>
                    <p className="mt-0.5 text-[10.5px] leading-relaxed text-white/30">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/30">
                Production architecture
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/30 p-3.5 font-mono text-[9px] leading-relaxed text-white/40">
{`Next.js app
  → API / validation / credits
  → Postgres + Redis queue
  → Model router + adapters
  → Kling / Veo / Seedance / FLUX
  → post-process + object storage
  → CDN + signed assets`}
              </pre>
              <p className="mt-3 text-[9.5px] leading-relaxed text-white/25">
                This prototype replaces the orange stack with an in-memory job
                store and a local SVG renderer. The UI contract is designed to
                survive the migration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-y border-white/[0.06] py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">
              <span className="h-1 w-1 rounded-full bg-lime" />
              04 — Economics
            </p>
            <h2 className="display text-[34px] leading-[1.01] text-paper sm:text-[44px]">
              Transparent credits.
              <span className="text-white/30"> Enforced margin.</span>
            </h2>
            <p className="pretty mt-5 max-w-md text-[13px] leading-relaxed text-white/40">
              Every competitor uses credits; none treats cost prediction as a
              product feature. Zupona makes the rate card public, reserves credits
              atomically, refunds failed renders automatically and never
              auto-overages.
            </p>
            <div className="mt-6 space-y-2">
              {[
                "Cost shown before every render",
                "No auto-overage. Stop at zero or ask.",
                "Paid credits roll over for 60 days",
                "Failed renders refunded automatically",
                "No training on customer uploads",
                "Commercial rights on all paid plans",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-2 text-[11.5px] text-white/45"
                >
                  <Check className="h-3.5 w-3.5 text-lime/60" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                  Unit economics target
                </p>
                <Coins className="h-3.5 w-3.5 text-lime/60" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["$0.015–0.025", "revenue per credit"],
                  ["55–65%", "contribution margin"],
                  ["$0.20–0.60", "est. 5s premium video COGS"],
                  ["$0.01–0.08", "est. 2K still COGS"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-black/20 p-3"
                  >
                    <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-paper">
                      {value}
                    </p>
                    <p className="mt-1 text-[9px] leading-snug text-white/25">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] leading-relaxed text-white/20">
                Illustrative planning ranges. Every route gets a margin floor;
                prices are recalibrated weekly from provider invoices and
                accepted-asset rates.
              </p>
            </div>

            <div
              id="creator-economics"
              className="scroll-mt-24 rounded-[22px] border border-lime/20 bg-[linear-gradient(120deg,rgba(217,255,67,0.07),transparent)] p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.13em] text-lime/70">
                Creator economics
              </p>
              <p className="mt-3 font-display text-[26px] font-semibold tracking-[-0.03em] text-paper">
                70% of platform margin.
              </p>
              <p className="mt-1.5 max-w-md text-[10.5px] leading-relaxed text-white/35">
                Not 70% of gross credits — that would be subsidised by compute.
                Payouts are based on credits revenue minus inference and payment
                costs, with a 30-day payout window and manual quality review
                during the pilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <p className="eyebrow mb-4">
            <span className="h-1 w-1 rounded-full bg-lime" />
            05 — Roadmap
          </p>
          <h2 className="display max-w-2xl text-[34px] leading-[1.01] text-paper sm:text-[44px]">
            Four weeks in.
            <span className="text-white/30"> A long way to build.</span>
          </h2>

          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            {roadmap.map((item) => (
              <div
                key={item.phase}
                className={cn(
                  "relative flex flex-col rounded-[22px] border p-4",
                  item.active
                    ? "border-lime/25 bg-lime/[0.05]"
                    : "border-white/[0.08] bg-white/[0.02]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border font-display text-[10px] font-semibold",
                      item.active
                        ? "border-lime/30 bg-lime/10 text-lime"
                        : "border-white/10 text-white/30",
                    )}
                  >
                    {item.phase}
                  </span>
                  <span className="text-[8.5px] uppercase tracking-[0.1em] text-white/25">
                    {item.time}
                  </span>
                </div>
                <p className="mt-4 text-[12px] font-medium text-white/70">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[9.5px] leading-relaxed text-white/30">
                  {item.detail}
                </p>
                {item.active ? (
                  <span className="mt-3 flex items-center gap-1 text-[8.5px] uppercase tracking-[0.1em] text-lime/60">
                    <span className="h-1 w-1 rounded-full bg-lime" />
                    You are here
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-lime/70">
                <Check className="h-3.5 w-3.5" />
                Built in this prototype
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {built.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] leading-relaxed text-white/45"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-lime/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/30">
                <Minus className="h-3.5 w-3.5" />
                Simulated / not built
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {simulated.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] leading-relaxed text-white/30"
                  >
                    <Minus className="mt-0.5 h-3 w-3 shrink-0 text-white/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-6 py-6 sm:flex-row">
            <div>
              <p className="font-display text-[20px] font-semibold tracking-[-0.02em] text-paper">
                Read the full documents.
              </p>
              <p className="mt-1 text-[11px] text-white/30">
                Sources, interviews-to-run, requirement IDs, ledger design and
                migration path.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`${repo}/docs/RESEARCH.md`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[11.5px] font-medium text-white/65 transition-colors hover:bg-white/[0.08]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Research
              </a>
              <a
                href={`${repo}/docs/PRD.md`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-lime px-4 text-[11.5px] font-semibold text-ink transition-colors hover:bg-[#e7ff8c]"
              >
                <FileText className="h-3.5 w-3.5" />
                PRD
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
