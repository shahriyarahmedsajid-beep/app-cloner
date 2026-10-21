import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Coins,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { PricingPlans } from "@/components/pricing-plans";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { comparisonRows, faqs, plans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent credits, commercial rights and no watermark on paid plans. Compare Zupona Free, Creator and Studio.",
};

const examples = [
  { label: "Motion 3 · 5s video", credits: 18, cost: "≈ $0.23" },
  { label: "Canvas 2 · 2K image", credits: 6, cost: "≈ $0.08" },
  { label: "UGC Ad Lab · 9 exports", credits: 24, cost: "≈ $0.30" },
  { label: "Cinema · 10s 4K", credits: 60, cost: "≈ $0.75" },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-[-50%] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,255,67,0.1),transparent_65%)]" />
        <div className="shell relative pb-12 text-center md:pb-16">
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/40">
            <Coins className="h-3 w-3 text-lime/70" />
            Credits, not mystery tokens
          </p>
          <h1 className="display mx-auto mt-7 max-w-3xl text-balance text-[48px] leading-[0.95] text-paper sm:text-[64px] md:text-[76px]">
            Pricing that doesn&apos;t
            <br />
            <span className="text-white/30">need a decoder.</span>
          </h1>
          <p className="pretty mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
            One balance for every model, app and export. See the cost before
            every render, keep unused credits for 60 days and get commercial
            rights on every paid plan.
          </p>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <PricingPlans />
        <p className="mt-5 text-center text-[10.5px] text-white/25">
          Prices in USD. The demo does not process payments. Annual savings shown
          against monthly billing.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-y border-white/[0.06] py-5 text-[10.5px] text-white/35">
          {[
            "Commercial license on paid plans",
            "No watermark on paid plans",
            "No training on your uploads",
            "Cancel anytime",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-lime/60" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="credits" className="scroll-mt-24 border-y border-white/[0.06] py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-5">
              <span className="h-1 w-1 rounded-full bg-lime" />
              What a credit buys
            </p>
            <h2 className="display text-[36px] leading-[1] text-paper sm:text-[44px]">
              One currency.
              <br />
              <span className="text-white/30">No fine print.</span>
            </h2>
            <p className="pretty mt-5 max-w-md text-[13.5px] leading-relaxed text-white/45">
              A credit is a unit of render time. Costs differ because a 10-second
              4K shot takes far more compute than a 2K still. You always see the
              exact number before you press generate.
            </p>
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <p className="flex items-center gap-2 text-[11px] font-medium text-white/55">
                <Sparkles className="h-3.5 w-3.5 text-lime/70" />
                At the annual Creator rate — $15 / 1,200 credits
              </p>
              <div className="mt-3 space-y-2">
                {examples.map((example) => (
                  <div
                    key={example.label}
                    className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-2 text-[11px] last:border-0 last:pb-0"
                  >
                    <span className="text-white/40">{example.label}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-white/30">{example.credits} cr</span>
                      <span className="w-14 text-right font-medium text-white/65">
                        {example.cost}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[26px] border border-white/[0.09] bg-white/[0.02]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-[12px]">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-[0.1em] text-white/30">
                    <th className="px-5 py-4 font-medium">Included</th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={
                          plan.featured
                            ? "bg-lime/[0.05] px-5 py-4 font-medium text-lime/80"
                            : "px-5 py-4 font-medium text-white/45"
                        }
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="px-5 py-3.5 text-white/40">{row.label}</td>
                      <td className="px-5 py-3.5 text-white/55">{row.free}</td>
                      <td className="bg-lime/[0.03] px-5 py-3.5 text-white/75">
                        {row.creator}
                      </td>
                      <td className="px-5 py-3.5 text-white/55">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[linear-gradient(120deg,rgba(196,181,253,0.07),rgba(255,255,255,0.02)_55%,rgba(217,255,67,0.06))] p-7 md:p-11">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-white/[0.035]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lilac">
                  <Building2 className="h-4.5 w-4.5" />
                </span>
                <h2 className="display mt-5 text-[30px] leading-[1.02] text-paper sm:text-[38px]">
                  Built for teams with a
                  <span className="text-white/35"> content calendar.</span>
                </h2>
                <p className="pretty mt-3 max-w-lg text-[13px] leading-relaxed text-white/40">
                  Enterprise adds pooled credits across unlimited seats, SSO,
                  custom model routing, an audit log, a 99.9% SLA and a private
                  review space. Talk to a human.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-white/30">
                  {[
                    "SSO / SCIM",
                    "Custom routing",
                    "99.9% SLA",
                    "Invoicing",
                  ].map((feature) => (
                    <span key={feature} className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-lime/60" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5">
                <ButtonLink href="mailto:hello@zupona.ai" size="lg" className="group">
                  Talk to sales
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href="/research#pricing" variant="secondary">
                  Read the unit economics
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Credits FAQ"
              title={
                <>
                  Fair questions.
                  <br />
                  <span className="text-white/30">Straight answers.</span>
                </>
              }
            />
            <div className="mt-7 space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  text: "Unused paid credits roll over for 60 days. They do not vanish at midnight.",
                },
                {
                  icon: InfinityIcon,
                  text: "You can top up without changing plans, or let your balance run out. No auto-overage.",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-lime/60" />
                  <p className="text-[11.5px] leading-relaxed text-white/40">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/research#prd"
              className="link-underline mt-5 inline-flex items-center gap-1 text-[11px] text-white/35"
            >
              The complete billing spec
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="shell pb-20">
        <div className="flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-6 py-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-[20px] font-semibold tracking-[-0.02em] text-paper">
              Try it before you pick a plan.
            </p>
            <p className="mt-1 text-[11.5px] text-white/35">
              60 free credits. No card. The whole demo runs locally.
            </p>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="/studio">
              Open the studio
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/store" variant="secondary">
              Browse apps
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
