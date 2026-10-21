import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Coins,
  Layers,
  Lock,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { FaqAccordion } from "@/components/faq-accordion";
import { HeroDemo } from "@/components/hero-demo";
import { Marquee } from "@/components/marquee";
import { PricingPlans } from "@/components/pricing-plans";
import { SectionHeading } from "@/components/section-heading";
import { StoreAppCard } from "@/components/store-app-card";
import { ButtonLink } from "@/components/ui/button";
import { faqs, features, gallery, personas } from "@/lib/content";
import { compileCampaign, DEFAULT_DIRECTOR_BRIEF } from "@/lib/director";
import { modelMarquee } from "@/lib/models";
import { featuredApps, storeApps } from "@/lib/store";
import { cn } from "@/lib/utils";

const directorPreview = compileCampaign({
  ...DEFAULT_DIRECTOR_BRIEF,
  budget: 60,
});

const principles = [
  {
    title: "The workflow is the product.",
    body: "A model is an ingredient. The outcome — the ad, the episode, the drop — is what you actually buy.",
  },
  {
    title: "Transparent by default.",
    body: "Every render shows its cost before it starts. No coins, no expiry traps, no surprise watermarks.",
  },
  {
    title: "Consistency is a feature.",
    body: "Characters, products and brand systems persist across shots and models. Continuity should not be luck.",
  },
  {
    title: "Creators get paid.",
    body: "Storefront creators keep the majority of every credit spent on their workflows. We publish the split.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,255,67,0.09),transparent_65%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-[940px] text-center">
            <Link
              href="/store"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] py-1.5 pl-2 pr-3.5 text-[11.5px] text-white/55 backdrop-blur transition-colors hover:border-white/20 hover:text-white/80"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-lime/15 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-lime">
                <Sparkles className="h-2.5 w-2.5" />
                New
              </span>
              Storefront v1 — 12 runnable apps
              <ArrowUpRight className="h-3 w-3 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <h1 className="display mt-7 text-balance text-[clamp(3.1rem,9vw,7rem)] leading-[0.95] text-paper md:mt-9">
              Your imagination,
              <br />
              <span className="text-gradient">with a ship date.</span>
            </h1>

            <p className="pretty mx-auto mt-6 max-w-[560px] text-balance text-[15px] leading-relaxed text-white/55 md:mt-8 md:text-[17px]">
              Zupona is the creative storefront and studio that turns a brief into
              finished images, video and ads — across every model worth using, in
              one calm canvas.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row md:mt-9">
              <ButtonLink href="/studio" size="lg" className="group w-full sm:w-auto">
                Open the studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink
                href="/store"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Browse the storefront
              </ButtonLink>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10.5px] uppercase tracking-[0.12em] text-white/30">
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-lime/70" />
                60 free credits
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-lime/70" />
                No card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-lime/70" />
                Demo runs locally
              </span>
            </div>
          </div>

          <HeroDemo />
        </div>
      </section>

      <section id="models" className="mt-16 border-y border-white/[0.06] py-7">
        <div className="shell mb-5 flex items-center justify-between gap-4">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-white/30">
            Routed across the models you already trust
          </p>
          <p className="hidden text-[10.5px] text-white/25 sm:block">
            One brief · the right engine per shot
          </p>
        </div>
        <Marquee items={modelMarquee} />
      </section>

      <section className="relative py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="01 — The storefront"
            title={
              <>
                Don&apos;t start from
                <br />
                <span className="text-white/30">a blank prompt.</span>
              </>
            }
            description="Start from an outcome. Every app is a complete, inspectable workflow with the model, inputs and credit cost already baked in. Open one, add your product, and go."
            action={
              <ButtonLink href="/store" variant="secondary" className="group">
                All {storeApps.length} apps
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            }
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredApps.slice(0, 4).map((app) => (
              <StoreAppCard key={app.slug} app={app} />
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/10 text-lime">
                <Layers className="h-4 w-4" />
              </span>
              <p className="text-[12.5px] text-white/45">
                UGC ads, product studio, manga, music videos, try-on and more.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/30">
              <Coins className="h-3.5 w-3.5" />
              Free–40 credits per run · priced up front
            </div>
          </div>
        </div>
      </section>

      <section
        id="manifesto"
        className="relative overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent)]"
      >
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-lilac/[0.07] blur-[100px]" />
        <div className="shell relative grid gap-12 py-20 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5">
              <span className="h-1 w-1 rounded-full bg-lime" />
              02 — Manifesto
            </p>
            <h2 className="display text-balance text-[40px] leading-[0.98] text-paper sm:text-[52px] md:text-[62px]">
              Another model
              <br />
              is not
              <br />
              <span className="text-white/25">a product.</span>
            </h2>
            <p className="pretty mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
              The last two years gave us magic engines and terrible workflows.
              Twelve tabs, five subscriptions, credits that evaporate before a
              usable take. Zupona is a bet that the next great creative tool is
              not another model — it is the room where the work gets finished.
            </p>
            <ButtonLink
              href="/research"
              variant="ghost"
              className="mt-6 -ml-3"
            >
              <BookOpen className="h-4 w-4" />
              Read the product brief
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>

          <div className="space-y-2.5">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="group relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04] md:p-7"
              >
                <div className="flex items-start gap-5">
                  <span className="mt-1 font-display text-[12px] font-medium text-lime/60">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-paper md:text-[21px]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-white/40">
                      {principle.body}
                    </p>
                  </div>
                </div>
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/[0.04] transition-transform duration-500 group-hover:scale-125" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="03 — One canvas"
            title={
              <>
                Built for the messy
                <br className="hidden sm:block" /> middle of making.
              </>
            }
            description="Briefs, references, models, edits and exports stop living in separate tabs. Zupona is the surface where the whole production stays in view."
          />

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.number}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.15] md:p-7",
                  feature.span === "wide" && "lg:col-span-2",
                )}
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime/[0.035] blur-2xl transition-colors duration-500 group-hover:bg-lime/[0.07]" />
                <div className="relative flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    {feature.kicker}
                  </span>
                  <span className="font-display text-[11px] text-white/20">
                    {feature.number}
                  </span>
                </div>

                <h3 className="relative mt-8 max-w-lg font-display text-[23px] font-semibold leading-[1.08] tracking-[-0.03em] text-paper md:text-[26px]">
                  {feature.title}
                </h3>
                <p className="pretty relative mt-3 max-w-md text-[13.5px] leading-relaxed text-white/40">
                  {feature.description}
                </p>

                {index === 0 ? (
                  <div className="relative mt-7 grid grid-cols-[1fr_auto_1.4fr] items-center gap-2 rounded-2xl border border-white/[0.06] bg-black/25 p-2">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
                      <p className="text-[8.5px] uppercase tracking-[0.12em] text-white/25">
                        Brief
                      </p>
                      <p className="mt-1 text-[10.5px] leading-snug text-white/55">
                        Product film, 9:16, cinematic
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-white/20" />
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        ["Motion 3", true],
                        ["Cinema", false],
                        ["Canvas 2", false],
                        ["Portrait", false],
                      ].map(([label, active]) => (
                        <span
                          key={String(label)}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-[9px]",
                            active
                              ? "border-lime/30 bg-lime/10 text-lime"
                              : "border-white/[0.07] bg-white/[0.02] text-white/35",
                          )}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {index === 3 ? (
                  <div className="relative mt-7 flex gap-2">
                    {[
                      { name: "UGC Ad Lab", variant: 0 },
                      { name: "Product Studio", variant: 3 },
                      { name: "Manga Frames", variant: 6 },
                    ].map((app) => (
                      <div
                        key={app.name}
                        className="w-1/3 overflow-hidden rounded-xl border border-white/[0.07]"
                      >
                        <ArtTile variant={app.variant} className="aspect-[4/3]" />
                        <p className="truncate px-2 py-2 text-[8.5px] text-white/45">
                          {app.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5">
              <span className="h-1 w-1 rounded-full bg-lime" />
              04 — The loop
            </p>
            <h2 className="display text-balance text-[40px] leading-[0.99] text-paper sm:text-[48px] md:text-[56px]">
              Brief it.
              <br />
              Direct it.
              <br />
              <span className="text-white/25">Ship it.</span>
            </h2>
            <p className="pretty mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/45">
              Three deliberate steps, no tab hopping. The agent handles the
              plumbing so you can stay in the part only you can do.
            </p>
            <ButtonLink href="/studio" className="mt-7 group">
              Try the loop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-lime/40 via-white/10 to-transparent" />
            <div className="space-y-3">
              {[
                {
                  step: "01",
                  title: "Brief it",
                  body: "Describe the outcome in plain language. Paste a product URL, upload references or start from a storefront app.",
                  detail: "A glass koi swimming through clouds, product film, 9:16",
                },
                {
                  step: "02",
                  title: "Direct it",
                  body: "The agent writes the shot list, picks the model, locks characters and shows the full credit bill before anything renders.",
                  detail: "4 shots · Motion 3 + Canvas 2 · 42 credits",
                },
                {
                  step: "03",
                  title: "Ship it",
                  body: "Compare takes, nudge the cut, then export every ratio — or push the winner straight into a storefront app for variants.",
                  detail: "Export 9:16 · 1:1 · 16:9 · subtitled",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative flex gap-5 rounded-[22px] border border-white/[0.08] bg-ink-soft p-5 transition-colors hover:border-white/[0.15] md:gap-6 md:p-6"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime/25 bg-lime/10 font-display text-[11px] font-semibold text-lime">
                    {item.step}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-paper">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white/40">
                      {item.body}
                    </p>
                    <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-lg border border-white/[0.06] bg-black/30 px-2.5 py-1.5">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-lime/60" />
                      <span className="truncate font-mono text-[9.5px] text-white/35">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="05 — Recently rendered"
            title={
              <>
                Not moodboards.
                <br />
                <span className="text-white/30">Finished frames.</span>
              </>
            }
            description="A small sample of what the studio can make. Every frame below links back to a runnable prompt — remix it in one click."
            action={
              <ButtonLink href="/studio" variant="secondary" className="group">
                <Wand2 className="h-4 w-4" />
                Open the canvas
              </ButtonLink>
            }
          />

          <div className="mt-10 columns-2 gap-3 md:columns-3">
            {gallery.map((item) => (
              <Link
                key={item.id}
                href={`/studio?prompt=${encodeURIComponent(item.prompt)}&model=${encodeURIComponent(
                  item.tag === "Canvas 2"
                    ? "zupona-canvas-2"
                    : item.tag === "Cinema"
                      ? "zupona-cinema"
                      : item.tag === "Vector"
                        ? "zupona-vector"
                        : "zupona-motion-3",
                )}`}
                className="group relative mb-3 block break-inside-avoid overflow-hidden rounded-[22px] border border-white/[0.08]"
              >
                <ArtTile
                  variant={item.variant}
                  className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                >
                  <div style={{ aspectRatio: item.ratio.replace(":", " / ") }} />
                </ArtTile>
                <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[8.5px] uppercase tracking-[0.1em] text-white/55 backdrop-blur-sm">
                      {item.tag}
                    </span>
                    <p className="mt-1.5 font-display text-[15px] font-medium tracking-[-0.01em] text-paper">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/35">
                      {item.prompt}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/60 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/60 blur-[90px]" />
        <div className="shell relative">
          <SectionHeading
            tone="light"
            eyebrow="06 — Built for"
            title={
              <>
                One studio.
                <br />
                Three kinds of ambitious.
              </>
            }
            description="Whether you are the whole team or one person in a very large one, the job is the same: make something undeniable, faster."
          />

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {personas.map((persona, index) => (
              <div
                key={persona.title}
                className="group relative overflow-hidden rounded-[26px] border border-ink/10 bg-white/40 p-6 transition-colors hover:bg-white/70 md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                    {persona.audience}
                  </span>
                  <span className="font-display text-[11px] font-medium text-ink/25">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                  {persona.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
                  {persona.outcome}
                </p>
                <div className="mt-7 flex items-center gap-2 border-t border-ink/10 pt-4 text-[11px] font-medium text-ink/45">
                  <Zap className="h-3.5 w-3.5" />
                  {persona.proof}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="07 — Pricing"
            title={
              <>
                Credits you can see.
                <br />
                <span className="text-white/30">Costs you can predict.</span>
              </>
            }
            description="No mystery token math. Every plan tells you exactly what a render costs, and every paid plan includes a commercial license."
            className="mb-10"
          />
          <PricingPlans compact />
          <p className="mt-6 text-center text-[11.5px] text-white/30">
            Need something larger?{" "}
            <Link href="mailto:hello@zupona.ai" className="link-underline text-white/55">
              Talk to us about Enterprise
            </Link>
            {" · "}
            <Link href="/pricing" className="link-underline text-white/55">
              See the full comparison
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">
              <span className="h-1 w-1 rounded-full bg-lime" />
              08 — Questions
            </p>
            <h2 className="display text-[38px] leading-[1.02] text-paper sm:text-[44px]">
              The honest
              <br />
              answers.
            </h2>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/40">
              Still curious? The full product brief covers architecture, unit
              economics, safety and the roadmap.
            </p>
            <ButtonLink href="/research" variant="secondary" className="mt-6">
              <BookOpen className="h-4 w-4" />
              Read the research
            </ButtonLink>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[34px] bg-lime px-6 py-14 text-ink md:rounded-[44px] md:px-14 md:py-20">
          <div className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full border-[40px] border-ink/[0.06]" />
          <div className="pointer-events-none absolute -bottom-36 right-24 h-72 w-72 rounded-full bg-white/30 blur-[80px]" />
          <div className="relative max-w-3xl">
            <p className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/50">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Ready when you are
            </p>
            <h2 className="display mt-6 text-balance text-[46px] leading-[0.94] text-ink sm:text-[60px] md:text-[76px]">
              Stop collecting tools.
              <br />
              Start shipping work.
            </h2>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink/60 md:text-[15px]">
              Open the studio, remix a proven app and make the first frame in
              under a minute. 60 credits are on the house.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href="/studio" size="lg" variant="dark" className="group">
                Open the studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/store" size="lg" variant="outlineLight">
                Browse the storefront
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] font-medium text-ink/45">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                No card. No training on your uploads.
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3" />
                Demo mode — everything runs locally
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
