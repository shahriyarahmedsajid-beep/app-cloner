import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route does not exist. Head back to the studio or storefront.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-68px)] items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,255,67,0.08),transparent_65%)]" />

      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.13em] text-white/40">
            <Compass className="h-3 w-3 text-lime/70" />
            Error 404
          </span>

          <p className="display mt-8 text-[92px] leading-none text-lime/15 sm:text-[130px]">
            404
          </p>
          <h1 className="display -mt-4 text-balance text-[40px] leading-[0.98] text-paper sm:text-[54px]">
            This frame
            <br />
            <span className="text-white/30">does not exist.</span>
          </h1>
          <p className="pretty mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-white/45">
            The route may have moved, or the link was never rendered. Pick a
            direction and keep shipping.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <ButtonLink href="/studio" size="lg" className="group w-full sm:w-auto">
              <Sparkles className="h-4 w-4" />
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

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-[11.5px] text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3 w-3" />
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
