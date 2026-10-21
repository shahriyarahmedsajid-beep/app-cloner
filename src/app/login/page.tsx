import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Enter the Zupona studio demo.",
};

type SearchParams = { plan?: string | string[] };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const planId = Array.isArray(params.plan) ? params.plan[0] : params.plan;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
      <div className="shell relative grid min-h-[calc(100vh-68px)] gap-12 py-12 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-16">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to home
          </Link>
          <LoginForm planId={planId} />
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto max-w-[480px]">
            <div className="overflow-hidden rounded-[30px] border border-white/[0.1] bg-white/[0.03] p-2 shadow-[0_60px_120px_-50px_rgba(0,0,0,1)]">
              <ArtTile
                variant={3}
                overlay
                className="aspect-[4/5] rounded-[22px]"
              >
                <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/55 backdrop-blur">
                    <span className="h-1 w-1 rounded-full bg-lime" />
                    Zupona ID
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] text-white/45 backdrop-blur">
                    <Lock className="h-2.5 w-2.5" />
                    private
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5 z-10">
                  <p className="font-display text-[26px] leading-[1.06] tracking-[-0.03em] text-paper">
                    “The studio is the product. The models are just the paint.”
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.13em] text-white/35">
                    Zupona design principle 01
                  </p>
                </div>
              </ArtTile>
            </div>

            <div className="absolute -left-10 top-1/3 w-44 rotate-[-4deg] rounded-2xl border border-white/[0.1] bg-[#0e1014]/95 p-3.5 shadow-2xl backdrop-blur">
              <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                Workspace
              </p>
              <p className="mt-1.5 text-[11.5px] font-medium text-white/70">
                Personal studio
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="text-[9px] text-white/35">60 credits ready</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-5 rotate-[3deg] rounded-2xl border border-white/[0.1] bg-[#0e1014]/95 p-4 shadow-2xl backdrop-blur">
              {["Storefront access", "Private library", "Commercial exports"].map(
                (item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 py-1 text-[10.5px] text-white/50"
                  >
                    <Check className="h-3 w-3 text-lime/70" />
                    {item}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
