"use client";

import { useState } from "react";
import { ArrowRight, Check, Minus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingPlans({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors",
              !annual
                ? "bg-white/10 text-paper"
                : "text-white/40 hover:text-white/70",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors",
              annual
                ? "bg-white/10 text-paper"
                : "text-white/40 hover:text-white/70",
            )}
          >
            Annual
            <span className="rounded-full bg-lime/15 px-1.5 py-0.5 text-[9px] font-semibold text-lime">
              −20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-[26px] border p-6 transition-colors md:p-7",
                plan.featured
                  ? "border-lime/35 bg-[linear-gradient(160deg,rgba(217,255,67,0.09),rgba(255,255,255,0.02)_55%)]"
                  : "border-white/[0.09] bg-white/[0.025] hover:border-white/[0.16]",
              )}
            >
              {plan.featured ? (
                <div className="absolute right-5 top-5 rounded-full bg-lime px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink">
                  Most popular
                </div>
              ) : null}

              <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-paper">
                {plan.name}
              </p>
              <p className="mt-2 min-h-[42px] max-w-[240px] text-[12.5px] leading-relaxed text-white/40">
                {plan.blurb}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="display text-[44px] leading-none text-paper">
                  ${price}
                </span>
                <span className="mb-1 text-[12px] text-white/35">
                  {price === 0 ? "forever" : "/ month"}
                </span>
              </div>
              <p className="mt-2 h-4 text-[10.5px] text-white/30">
                {price === 0
                  ? "No card required"
                  : annual
                    ? "billed annually"
                    : "billed monthly"}
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="text-[12px] font-medium text-white/65">
                  {plan.credits}
                </span>
              </div>

              <ButtonLink
                href={`/login?plan=${plan.id}`}
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-5 w-full"
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>

              <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
                {plan.features
                  .slice(0, compact ? 4 : plan.features.length)
                  .map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[12.5px] text-white/50"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime/70" />
                      {feature}
                    </li>
                  ))}
                {compact && plan.features.length > 4 ? (
                  <li className="flex items-center gap-2.5 text-[12.5px] text-white/30">
                    <Minus className="h-3.5 w-3.5" />
                    and more
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
