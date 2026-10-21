import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Coins, Library, Sparkles, Store } from "lucide-react";
import { StoreBrowser } from "@/components/store-browser";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Storefront",
  description:
    "Runnable creative workflows for ads, product shots, characters, manga, music videos and more. Pick an outcome, add your inputs, generate.",
};

export default function StorePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-[-50%] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(196,181,253,0.12),transparent_65%)]" />
        <div className="shell relative pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/30">
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/55">Storefront</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/10">
                  <Store className="h-3 w-3 text-lime" />
                </span>
                The app store for outcomes
              </p>
              <h1 className="display max-w-3xl text-balance text-[46px] leading-[0.95] text-paper sm:text-[62px] md:text-[76px]">
                Pick an outcome.
                <br />
                <span className="text-white/30">We&apos;ll bring the prompt.</span>
              </h1>
              <p className="pretty mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
                Every app is a real, inspectable workflow — the model, inputs,
                steps and credit cost are all visible before you run it. Start
                with a proven path, then make it yours.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              {[
                { icon: Sparkles, value: "12", label: "runnable apps" },
                { icon: Library, value: "6", label: "frontier models" },
                { icon: Coins, value: "0", label: "credits to browse" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 lg:flex lg:items-center lg:gap-3"
                >
                  <stat.icon className="hidden h-4 w-4 text-lime/60 lg:block" />
                  <p className="font-display text-[22px] font-semibold tracking-[-0.02em] text-paper">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 lg:mt-0">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="shell">
          <StoreBrowser />
        </div>
      </section>

      <section id="creators" className="pb-20 md:pb-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[linear-gradient(120deg,rgba(217,255,67,0.09),rgba(196,181,253,0.05)_55%,rgba(255,255,255,0.02))] p-7 md:p-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[36px] border-lime/[0.07]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="eyebrow mb-4">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  For creators
                </p>
                <h2 className="display max-w-xl text-[34px] leading-[1] text-paper sm:text-[44px]">
                  Built a workflow that works?
                  <span className="text-white/35"> Sell it.</span>
                </h2>
                <p className="pretty mt-4 max-w-lg text-[14px] leading-relaxed text-white/45">
                  Publish your workflow to the storefront, set your remix terms
                  and keep 70% of every credit spent. We handle billing,
                  moderation and the boring parts.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <ButtonLink href="mailto:creators@zupona.ai" className="group">
                    Apply as a creator
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </ButtonLink>
                  <ButtonLink href="/research#creator-economics" variant="secondary">
                    Read the economics
                  </ButtonLink>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "70%", label: "creator share" },
                  { value: "12", label: "launch cohort slots" },
                  { value: "0", label: "upfront cost" },
                  { value: "30d", label: "payout window" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                  >
                    <p className="font-display text-[26px] font-semibold tracking-[-0.03em] text-lime">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/35">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
