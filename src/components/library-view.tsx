"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Coins,
  Download,
  ImageOff,
  RotateCcw,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  CREDITS_KEY,
  LIBRARY_KEY,
  type SavedGeneration,
} from "@/lib/generation";
import { STARTING_CREDITS } from "@/lib/models";
import { formatCredits } from "@/lib/utils";

export function LibraryView() {
  const [items, setItems] = useState<SavedGeneration[]>([]);
  const [credits, setCredits] = useState(STARTING_CREDITS);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedLibrary = window.localStorage.getItem(LIBRARY_KEY);
      if (storedLibrary) {
        const parsed = JSON.parse(storedLibrary);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
        if (Array.isArray(parsed)) setItems(parsed as SavedGeneration[]);
      }
      const storedCredits = window.localStorage.getItem(CREDITS_KEY);
      if (storedCredits !== null) {
        const parsed = Number(storedCredits);
        if (Number.isFinite(parsed) && parsed >= 0) setCredits(parsed);
      }
    } catch {
      // Local storage may be unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function persist(next: SavedGeneration[], nextCredits = credits) {
    setItems(next);
    setCredits(nextCredits);
    try {
      window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(next));
      window.localStorage.setItem(CREDITS_KEY, String(nextCredits));
    } catch {
      // Ignore storage errors.
    }
  }

  function resetCredits() {
    persist(items, STARTING_CREDITS);
    setNotice(`Demo credits reset to ${STARTING_CREDITS}.`);
  }

  function clearLibrary() {
    if (items.length === 0) return;
    if (!window.confirm("Clear every saved run in this browser?")) return;
    persist([], credits);
    setNotice("Library cleared. Credits untouched.");
  }

  function removeItem(id: string) {
    persist(items.filter((item) => item.id !== id));
    setNotice("Run removed.");
  }

  function download(item: SavedGeneration) {
    const anchor = document.createElement("a");
    anchor.href = item.resultUrl;
    anchor.download = `zupona-${item.id}.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-8 pb-8">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-lilac/[0.06] blur-[80px]" />
        <div className="shell relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/30">
              <Link href="/" className="transition-colors hover:text-white/60">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/55">Library</span>
            </div>
            <h1 className="display mt-3 text-[42px] leading-none text-paper sm:text-[52px]">
              Library<span className="text-lime">.</span>
            </h1>
            <p className="mt-2.5 max-w-xl text-[13px] text-white/40">
              Every completed run is saved in this browser. Nothing is uploaded,
              and nothing leaves your device.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 text-[12px] font-medium text-white/65">
              <Coins className="h-3.5 w-3.5 text-lime/80" />
              {formatCredits(credits)} credits
            </span>
            <Button variant="secondary" size="sm" onClick={resetCredits}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset demo credits
            </Button>
            <Button variant="ghost" size="sm" onClick={clearLibrary}>
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>
        </div>
      </section>

      <section className="shell py-8 md:py-10">
        {hydrated && items.length > 0 ? (
          <div className="mb-6 grid grid-cols-3 gap-2">
            {[
              { value: items.length, label: "saved runs" },
              {
                value: items.reduce((total, item) => total + item.credits, 0),
                label: "credits spent",
              },
              {
                value: new Set(items.map((item) => item.modelName)).size,
                label: "models used",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
              >
                <p className="font-display text-[24px] font-semibold tracking-[-0.03em] text-paper">
                  {formatCredits(stat.value)}
                </p>
                <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.11em] text-white/30">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {!hydrated ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-[340px] animate-pulse rounded-[24px] border border-white/[0.06] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="relative overflow-hidden rounded-[30px] border border-dashed border-white/[0.12] px-6 py-20 text-center">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-lime/[0.05] blur-[70px]" />
            <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <ImageOff className="h-5 w-5 text-white/30" />
            </span>
            <h2 className="relative mt-5 font-display text-[24px] font-semibold tracking-[-0.02em] text-paper">
              No runs yet.
            </h2>
            <p className="relative mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-white/35">
              Make your first frame in the studio or start from a storefront
              workflow. It will show up here automatically.
            </p>
            <div className="relative mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <ButtonLink href="/studio">
                <Sparkles className="h-4 w-4" />
                Open the studio
              </ButtonLink>
              <ButtonLink href="/store" variant="secondary">
                Browse the storefront
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-2 transition-colors hover:border-white/[0.16]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[17px] bg-black/30">
                  <Image
                    src={item.resultUrl}
                    alt={item.prompt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1.5">
                    <span className="rounded-full border border-white/15 bg-black/35 px-2 py-0.5 text-[8.5px] font-medium uppercase tracking-[0.08em] text-white/60 backdrop-blur">
                      {item.mode}
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/35 px-2 py-0.5 text-[8.5px] text-white/50 backdrop-blur">
                      {item.aspect}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove this run"
                    className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/45 opacity-0 backdrop-blur transition-all hover:text-red-200 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/35">
                      {item.modelName}
                    </p>
                    <p className="text-[9px] text-white/25">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="line-clamp-2 mt-1.5 min-h-[34px] text-[12px] leading-relaxed text-white/55">
                    {item.prompt}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
                    <Link
                      href={`/studio?prompt=${encodeURIComponent(item.prompt)}&model=${encodeURIComponent(item.modelId)}`}
                      className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] text-[10px] font-medium text-white/55 transition-colors hover:border-white/20 hover:text-white/80"
                    >
                      <Wand2 className="h-3 w-3" />
                      Remix
                    </Link>
                    <button
                      type="button"
                      onClick={() => download(item)}
                      aria-label="Download SVG"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-white/45 transition-colors hover:border-white/20 hover:text-white/80"
                    >
                      <Download className="h-3 w-3" />
                    </button>
                    <span className="flex items-center gap-1 px-1 text-[9px] text-white/25">
                      <Coins className="h-2.5 w-2.5" />
                      {item.credits}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <p className="text-[10px] leading-relaxed text-white/25">
            Stored with localStorage for this demo. In production, the library is
            account-scoped, backed up and versioned.
          </p>
          <Link
            href="/studio"
            className="flex shrink-0 items-center gap-1 text-[10px] text-white/35 transition-colors hover:text-white/70"
          >
            Keep creating
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {notice ? (
        <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/[0.12] bg-[#111318]/95 py-2.5 pl-3.5 pr-2.5 text-[11px] text-white/70 shadow-2xl backdrop-blur-xl">
          <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
          {notice}
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
            className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-white/30 hover:bg-white/[0.06] hover:text-white/70"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}
    </>
  );
}
