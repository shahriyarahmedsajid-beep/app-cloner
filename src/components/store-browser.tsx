"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { StoreAppCard } from "@/components/store-app-card";
import { categories, type AppCategory, storeApps } from "@/lib/store";
import { cn } from "@/lib/utils";

type Filter = "All" | AppCategory;
type Sort = "featured" | "price-low" | "price-high" | "name";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Fewest credits" },
  { id: "price-high", label: "Most credits" },
  { id: "name", label: "A–Z" },
];

export function StoreBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const list = storeApps.filter((app) => {
      const inCategory = category === "All" || app.category === category;
      const inSearch =
        !q ||
        [app.name, app.tagline, app.description, app.model, ...app.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inCategory && inSearch;
    });

    return list.sort((a, b) => {
      if (sort === "price-low") return a.credits - b.credits;
      if (sort === "price-high") return b.credits - a.credits;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, deferredQuery, sort]);

  const countFor = (filter: Filter) =>
    filter === "All"
      ? storeApps.length
      : storeApps.filter((app) => app.category === filter).length;

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-3 md:flex-row md:items-center">
        <div className="flex h-10 flex-1 items-center gap-2.5 rounded-full border border-white/[0.08] bg-black/20 px-4 transition-colors focus-within:border-white/25">
          <Search className="h-4 w-4 shrink-0 text-white/30" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps, outcomes, models…"
            aria-label="Search storefront apps"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-paper placeholder:text-white/25"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-white/30 transition-colors hover:text-white/70"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="relative flex h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-4">
          <SlidersHorizontal className="h-3.5 w-3.5 text-white/30" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            aria-label="Sort apps"
            className="h-full cursor-pointer appearance-none bg-transparent pr-4 text-[12px] text-white/60"
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id} className="bg-ink">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(["All", ...categories] as Filter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11.5px] font-medium transition-colors",
              category === item
                ? "border-lime/30 bg-lime/10 text-lime"
                : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70",
            )}
          >
            {item}
            <span
              className={cn(
                "text-[9px]",
                category === item ? "text-lime/50" : "text-white/20",
              )}
            >
              {countFor(item)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/30">
          {filtered.length} {filtered.length === 1 ? "app" : "apps"}
        </p>
        {category !== "All" || query ? (
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="text-[11px] text-white/35 underline-offset-4 hover:text-white/70 hover:underline"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <StoreAppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-[26px] border border-dashed border-white/[0.1] py-20 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            <Search className="h-4 w-4 text-white/30" />
          </span>
          <p className="mt-4 font-display text-[18px] text-white/70">
            No apps match that yet.
          </p>
          <p className="mt-1.5 text-[12.5px] text-white/35">
            Try a broader search, or{" "}
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="text-lime/80 underline underline-offset-4"
            >
              clear everything
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
