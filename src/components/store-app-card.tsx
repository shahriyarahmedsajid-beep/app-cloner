import Link from "next/link";
import { ArrowUpRight, Coins, Sparkles } from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import type { StoreApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StoreAppCard({
  app,
  className,
  large = false,
}: {
  app: StoreApp;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/store/${app.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-2 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.045] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[19px]">
        <ArtTile
          variant={app.accent}
          overlay
          className={cn(
            "transition-transform duration-700 group-hover:scale-[1.025]",
            large ? "aspect-[5/3]" : "aspect-[4/3]",
          )}
        >
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
            <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75 backdrop-blur-md">
              {app.category}
            </span>
            {app.badge ? (
              <span className="rounded-full border border-lime/25 bg-lime/15 px-2.5 py-1 text-[10px] font-semibold text-lime backdrop-blur-md">
                {app.badge}
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-1.5 text-[10.5px] font-medium text-white/55">
            <Sparkles className="h-3 w-3 text-lime/80" />
            {app.model}
          </div>
        </ArtTile>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[17px] font-semibold tracking-[-0.02em] text-paper">
            {app.name}
          </h3>
          <span className="mt-0.5 flex shrink-0 items-center gap-1 text-[11px] font-medium text-white/35">
            <Coins className="h-3 w-3" />
            {app.credits === 0 ? "Free" : app.credits}
          </span>
        </div>
        <p className="pretty mt-1.5 text-[12.5px] leading-relaxed text-white/40">
          {app.tagline}
        </p>
      </div>
    </Link>
  );
}
