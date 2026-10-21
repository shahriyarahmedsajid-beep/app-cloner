import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Coins,
  Cpu,
  Sparkles,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { StoreAppCard } from "@/components/store-app-card";
import { ButtonLink } from "@/components/ui/button";
import { getStoreApp, storeApps } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return storeApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getStoreApp(slug);
  if (!app) return { title: "App not found" };
  return {
    title: app.name,
    description: app.description,
  };
}

export default async function StoreAppPage({ params }: Props) {
  const { slug } = await params;
  const app = getStoreApp(slug);
  if (!app) notFound();

  const related = storeApps
    .filter((item) => item.slug !== app.slug)
    .sort((a, b) => {
      const aSame = a.category === app.category ? 1 : 0;
      const bSame = b.category === app.category ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, 3);

  const studioHref = `/studio?app=${app.slug}&prompt=${encodeURIComponent(app.prompt)}`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-10">
        <div className="shell relative pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/30">
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            <span>/</span>
            <Link href="/store" className="transition-colors hover:text-white/60">
              Storefront
            </Link>
            <span>/</span>
            <span className="text-white/55">{app.name}</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-lime">
                  {app.category}
                </span>
                {app.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/60">
                    {app.badge}
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/50">
                  Built on {app.model}
                </span>
              </div>

              <h1 className="display mt-6 text-[46px] leading-[0.95] text-paper sm:text-[60px] md:text-[72px]">
                {app.name}
              </h1>
              <p className="mt-4 max-w-xl font-display text-[20px] leading-[1.25] tracking-[-0.02em] text-white/65 md:text-[23px]">
                {app.tagline}
              </p>
              <p className="pretty mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/45">
                {app.description}
              </p>

              <div className="mt-7 grid max-w-lg grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <Coins className="h-3.5 w-3.5 text-lime/70" />
                  <p className="mt-2 font-display text-[16px] font-medium text-paper">
                    {app.credits === 0 ? "Free" : `${app.credits} credits`}
                  </p>
                  <p className="text-[9.5px] uppercase tracking-[0.1em] text-white/30">
                    per run
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <Clock className="h-3.5 w-3.5 text-lilac/80" />
                  <p className="mt-2 font-display text-[16px] font-medium text-paper">
                    {app.runtime}
                  </p>
                  <p className="text-[9.5px] uppercase tracking-[0.1em] text-white/30">
                    typical run
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <Cpu className="h-3.5 w-3.5 text-sky/80" />
                  <p className="mt-2 truncate font-display text-[16px] font-medium text-paper">
                    {app.model}
                  </p>
                  <p className="text-[9.5px] uppercase tracking-[0.1em] text-white/30">
                    routed model
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <ButtonLink href={studioHref} size="lg" className="group">
                  <Sparkles className="h-4 w-4" />
                  Run in studio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href={`/studio?app=${app.slug}`}
                  size="lg"
                  variant="secondary"
                >
                  Start from scratch
                </ButtonLink>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-[1.45fr_1fr] gap-2">
                <ArtTile
                  variant={app.accent}
                  overlay
                  className="aspect-[4/5] rounded-[22px] border border-white/[0.08]"
                >
                  <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between">
                    <span className="rounded-md bg-black/40 px-2 py-1 text-[9px] text-white/60 backdrop-blur">
                      {app.outputs[0]}
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/60">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </ArtTile>
                <div className="grid gap-2">
                  <ArtTile
                    variant={app.accent + 2}
                    className="aspect-[4/3] rounded-[22px] border border-white/[0.08]"
                  />
                  <ArtTile
                    variant={app.accent + 5}
                    className="aspect-[4/3] rounded-[22px] border border-white/[0.08]"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#0d0f13]/95 px-4 py-3 shadow-2xl backdrop-blur">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-paper">
                    Inspectable workflow
                  </p>
                  <p className="text-[9.5px] text-white/35">
                    Edit every step before you render
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <div>
              <p className="eyebrow mb-4">
                <span className="h-1 w-1 rounded-full bg-lime" />
                What you get
              </p>
              <div className="flex flex-wrap gap-2">
                {app.outputs.map((output) => (
                  <span
                    key={output}
                    className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/60"
                  >
                    <Check className="h-3 w-3 text-lime/70" />
                    {output}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow mb-4">
                    <span className="h-1 w-1 rounded-full bg-lime" />
                    Try a prompt
                  </p>
                  <h2 className="display text-[28px] text-paper sm:text-[34px]">
                    Three directions, one click away.
                  </h2>
                </div>
                <ButtonLink
                  href={`/studio?app=${app.slug}`}
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Blank canvas
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </ButtonLink>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {app.samplePrompts.map((prompt, index) => (
                  <Link
                    key={prompt}
                    href={`/studio?app=${app.slug}&prompt=${encodeURIComponent(prompt)}`}
                    className="group flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-1.5 transition-all hover:-translate-y-0.5 hover:border-white/[0.18]"
                  >
                    <div className="relative overflow-hidden rounded-[14px]">
                      <ArtTile
                        variant={app.accent + index + 1}
                        className="aspect-square transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white/60 backdrop-blur-sm transition-colors group-hover:bg-lime group-hover:text-ink">
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <p className="line-clamp-3 px-2.5 py-3 text-[11.5px] leading-relaxed text-white/40 group-hover:text-white/60">
                      {prompt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <p className="eyebrow mb-4">
                <span className="h-1 w-1 rounded-full bg-lime" />
                How it works
              </p>
              <div className="grid gap-2.5">
                {app.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-5 rounded-[20px] border border-white/[0.07] bg-white/[0.02] p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lime/20 bg-lime/[0.07] font-display text-[11px] font-semibold text-lime">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold tracking-[-0.02em] text-paper">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/40">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[26px] border border-white/[0.1] bg-white/[0.03]">
              <div className="border-b border-white/[0.07] p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                  Ready to run
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="font-display text-[28px] font-semibold tracking-[-0.03em] text-paper">
                    {app.credits === 0 ? "Free" : `${app.credits} credits`}
                  </p>
                  <span className="mb-1 text-[10px] text-white/30">
                    per run
                  </span>
                </div>
                <ButtonLink href={studioHref} className="mt-4 w-full">
                  Open in studio
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>

              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                  Inputs you&apos;ll add
                </p>
                <ul className="mt-3 space-y-2">
                  {app.inputs.map((input) => (
                    <li
                      key={input}
                      className="flex items-center gap-2 text-[12px] text-white/55"
                    >
                      <span className="h-1 w-1 rounded-full bg-lime/60" />
                      {input}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                    Tags
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2 py-1 text-[9.5px] text-white/35"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 px-1 text-[10.5px] leading-relaxed text-white/25">
              Demo mode: this workflow is simulated locally. In production it
              would call the routed model and bill credits on completion.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-14 md:py-20">
        <div className="shell">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">
                <span className="h-1 w-1 rounded-full bg-lime" />
                Keep exploring
              </p>
              <h2 className="display text-[30px] text-paper sm:text-[38px]">
                Apps that pair well.
              </h2>
            </div>
            <ButtonLink href="/store" variant="secondary" size="sm">
              All apps
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StoreAppCard key={item.slug} app={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
