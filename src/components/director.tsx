"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Coins,
  Download,
  Film,
  Globe2,
  Layers,
  Loader2,
  Lock,
  Package,
  Palette,
  RefreshCw,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { Button } from "@/components/ui/button";
import { brandPrompt, loadBrandKit, type BrandKit } from "@/lib/brand";
import {
  campaignObjectives,
  compileCampaign,
  continuityLocks,
  DEFAULT_DIRECTOR_BRIEF,
  directorBudgets,
  type CampaignObjective,
  type ContinuityLockId,
  type DirectorBrief,
} from "@/lib/director";
import {
  CREDITS_KEY,
  LIBRARY_KEY,
  type PublicJob,
  type SavedGeneration,
} from "@/lib/generation";
import { aspects, STARTING_CREDITS } from "@/lib/models";
import { cn, formatCredits } from "@/lib/utils";

const lockIcons: Record<ContinuityLockId, LucideIcon> = {
  product: Package,
  character: UserRound,
  brand: Palette,
  world: Globe2,
};

const riskStyles = {
  low: "border-lime/20 bg-lime/[0.07] text-lime/80",
  medium: "border-amber-300/20 bg-amber-300/[0.07] text-amber-200/80",
  high: "border-peach/20 bg-peach/[0.07] text-peach/80",
} as const;

function briefSignature(brief: DirectorBrief) {
  return JSON.stringify({
    ...brief,
    brief: brief.brief.trim(),
    locks: [...brief.locks].sort(),
  });
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function Director() {
  const [draft, setDraft] = useState<DirectorBrief>(DEFAULT_DIRECTOR_BRIEF);
  const [compiledBrief, setCompiledBrief] =
    useState<DirectorBrief>(DEFAULT_DIRECTOR_BRIEF);
  const [credits, setCredits] = useState(STARTING_CREDITS);
  const [library, setLibrary] = useState<SavedGeneration[]>([]);
  const [brand, setBrand] = useState<BrandKit | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [jobs, setJobs] = useState<Record<string, PublicJob>>({});
  const [rendering, setRendering] = useState(false);
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const renderToken = useRef(0);

  const plan = useMemo(() => compileCampaign(compiledBrief), [compiledBrief]);
  const dirty = briefSignature(draft) !== briefSignature(compiledBrief);
  const approvedCount = plan.shots.filter((shot) => approved.has(shot.id)).length;
  const completedCount = plan.shots.filter(
    (shot) => jobs[shot.id]?.status === "completed",
  ).length;
  const allApproved = approvedCount === plan.shots.length;
  const spendRatio = Math.min(
    100,
    Math.round((plan.totalCredits / Math.max(1, plan.budget)) * 100),
  );
  const activeObjective =
    campaignObjectives.find((objective) => objective.id === draft.objective) ??
    campaignObjectives[0];

  useEffect(() => {
    try {
      const storedCredits = window.localStorage.getItem(CREDITS_KEY);
      if (storedCredits !== null) {
        const parsed = Number(storedCredits);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
        if (Number.isFinite(parsed) && parsed >= 0) setCredits(parsed);
      }

      const storedLibrary = window.localStorage.getItem(LIBRARY_KEY);
      if (storedLibrary) {
        const parsed = JSON.parse(storedLibrary);
        if (Array.isArray(parsed)) {
          setLibrary(parsed.slice(0, 24) as SavedGeneration[]);
        }
      }

      const storedBrand = loadBrandKit();
      if (storedBrand) setBrand(storedBrand);
    } catch {
      // Local storage can be unavailable in private browsing.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CREDITS_KEY, String(credits));
    } catch {
      // Ignore storage failures.
    }
  }, [credits, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
    } catch {
      // Ignore storage failures.
    }
  }, [library, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    return () => {
      renderToken.current += 1;
    };
  }, []);

  function chooseObjective(objective: CampaignObjective) {
    const next = campaignObjectives.find((item) => item.id === objective);
    setDraft((current) => ({
      ...current,
      objective,
      aspect: next?.aspect ?? current.aspect,
    }));
  }

  function toggleLock(lock: ContinuityLockId) {
    setDraft((current) => ({
      ...current,
      locks: current.locks.includes(lock)
        ? current.locks.filter((item) => item !== lock)
        : [...current.locks, lock],
    }));
  }

  function recompile() {
    const brief = draft.brief.trim();
    if (brief.length < 20) {
      setError("Give the director a little more to work with — at least 20 characters.");
      return;
    }

    const next = { ...draft, brief };
    renderToken.current += 1;
    setCompiledBrief(next);
    setDraft(next);
    setJobs({});
    setRendering(false);
    setApproved(new Set());
    setError(null);
    setNotice("Campaign compiled. The cost envelope is held for this plan.");
  }

  function toggleApproval(id: string) {
    setApproved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllApprovals() {
    setApproved(
      allApproved ? new Set() : new Set(plan.shots.map((shot) => shot.id)),
    );
  }

  function downloadPlan() {
    const payload = {
      demo: true,
      generatedAt: new Date().toISOString(),
      plan,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zupona-director-${plan.id}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setNotice("Production plan downloaded.");
  }

  async function watchRender(
    initial: Record<string, PublicJob>,
    token: number,
  ) {
    let snapshot = initial;
    const deadline = Date.now() + 20_000;

    while (token === renderToken.current) {
      const pending = Object.entries(snapshot).filter(
        ([, job]) => job.status !== "completed",
      );
      if (!pending.length) break;
      if (Date.now() > deadline) {
        throw new Error("The demo renderer timed out. Try compiling again.");
      }

      await wait(550);

      const updates = await Promise.all(
        pending.map(async ([shotId, job]) => {
          const response = await fetch(`/api/jobs/${job.id}`, {
            cache: "no-store",
          });
          if (!response.ok) throw new Error("A board frame stopped responding.");
          return [shotId, (await response.json()) as PublicJob] as const;
        }),
      );

      if (token !== renderToken.current) return;
      snapshot = { ...snapshot, ...Object.fromEntries(updates) };
      setJobs(snapshot);
    }

    if (token !== renderToken.current) return;

    const completed = plan.shots.flatMap((shot) => {
      const job = snapshot[shot.id];
      if (!job || job.status !== "completed" || !job.resultUrl) return [];
      const saved: SavedGeneration = {
        id: job.id,
        prompt: job.prompt,
        modelName: job.modelName,
        modelId: job.modelId,
        mode: job.mode,
        aspect: job.aspect,
        duration: job.duration,
        credits: job.credits,
        createdAt: job.createdAt,
        resultUrl: job.resultUrl,
      };
      return [saved];
    });

    if (completed.length === plan.shots.length) {
      setLibrary((current) =>
        [
          ...completed,
          ...current.filter(
            (item) => !completed.some((saved) => saved.id === item.id),
          ),
        ].slice(0, 24),
      );
      setNotice(`Board rendered. ${completed.length} frames saved to your library.`);
    }

    setRendering(false);
  }

  async function renderPlan() {
    if (dirty) {
      setError("Recompile the brief before rendering this board.");
      return;
    }
    if (!hydrated) return;
    if (credits < plan.totalCredits) {
      setError(
        `You need ${plan.totalCredits - credits} more demo credits. Reset them from the Library.`,
      );
      return;
    }

    const token = ++renderToken.current;
    const directive = brand ? brandPrompt(brand) : "";
    setRendering(true);
    setJobs({});
    setApproved(new Set());
    setError(null);
    setNotice(null);

    try {
      const entries = await Promise.all(
        plan.shots.map(async (shot) => {
          const finalPrompt = directive
            ? `${shot.prompt} ${directive}`.slice(0, 1200)
            : shot.prompt;
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: finalPrompt,
              modelId: shot.modelId,
              aspect: shot.aspect,
              duration: shot.duration,
            }),
          });
          const data = (await response.json()) as PublicJob & { error?: string };
          if (!response.ok) {
            throw new Error(data.error ?? "Could not start the board.");
          }
          return [shot.id, data] as const;
        }),
      );

      if (token !== renderToken.current) return;

      const next: Record<string, PublicJob> = {};
      for (const [shotId, job] of entries) next[shotId] = job;

      setJobs(next);
      setCredits((current) => Math.max(0, current - plan.totalCredits));
      await watchRender(next, token);
    } catch (caught) {
      if (token !== renderToken.current) return;
      setRendering(false);
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong while rendering the board.",
      );
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-8 pb-7">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-25" />
        <div className="pointer-events-none absolute -right-24 top-[-160px] h-80 w-80 rounded-full bg-lime/[0.06] blur-[90px]" />
        <div className="shell relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/35">
              <Link href="/" className="transition-colors hover:text-white/65">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Director</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="display text-[42px] leading-none text-paper sm:text-[52px]">
                Director<span className="text-lime">.</span>
              </h1>
              <span className="flex items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-lime/85">
                <Sparkles className="h-2.5 w-2.5" />
                Campaign compiler
              </span>
            </div>
            <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-white/50">
              One brief becomes a costed, continuity-locked production plan. You
              approve the route before a single frame is rendered.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 text-[12px] font-medium text-white/70">
              <Coins className="h-3.5 w-3.5 text-lime/80" />
              {formatCredits(credits)} credits
            </span>
            <span className="flex h-9 items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.07] px-3.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-lime/80">
              <span className="h-1 w-1 animate-pulse rounded-full bg-lime" />
              Demo mode
            </span>
            <Link
              href="/library"
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 text-[11px] text-white/55 transition-colors hover:border-white/20 hover:text-paper"
            >
              Library
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-6 md:py-8">
        <div className="grid gap-3 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[26px] border border-white/[0.09] bg-white/[0.025] lg:sticky lg:top-[84px] lg:self-start">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/45">
                The brief
              </p>
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-white/35">
                <span
                  className={cn(
                    "h-1 w-1 rounded-full",
                    dirty ? "bg-amber-300/80" : "bg-lime",
                  )}
                />
                {dirty ? "Edited" : "Compiled"}
              </span>
            </div>

            <div className="space-y-5 p-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">
                    Outcome
                  </p>
                  <span className="text-[9px] text-white/30">
                    {activeObjective.kicker}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {campaignObjectives.map((objective) => {
                    const active = draft.objective === objective.id;
                    return (
                      <button
                        key={objective.id}
                        type="button"
                        onClick={() => chooseObjective(objective.id)}
                        className={cn(
                          "rounded-xl border px-2.5 py-2 text-left transition-colors",
                          active
                            ? "border-lime/35 bg-lime/[0.07]"
                            : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.16]",
                        )}
                      >
                        <span
                          className={cn(
                            "block text-[10.5px] font-medium",
                            active ? "text-paper" : "text-white/65",
                          )}
                        >
                          {objective.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[8.5px] text-white/35">
                          {objective.kicker}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="director-brief"
                    className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45"
                  >
                    Brief
                  </label>
                  <span className="text-[9px] text-white/30">
                    {draft.brief.length}/1200
                  </span>
                </div>
                <textarea
                  id="director-brief"
                  value={draft.brief}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      brief: event.target.value.slice(0, 1200),
                    }))
                  }
                  rows={5}
                  placeholder="What are we making, for whom, and what should it feel like?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-black/25 p-3 text-[12px] leading-relaxed text-white/75 placeholder:text-white/25 transition-colors focus:border-white/20"
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[8.5px] text-white/30">
                    Plain language is enough.
                  </span>
                  <button
                    type="button"
                    onClick={() => setDraft(DEFAULT_DIRECTOR_BRIEF)}
                    className="text-[9px] text-white/35 transition-colors hover:text-white/65"
                  >
                    Reset example
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">
                    Budget envelope
                  </p>
                  <span className="text-[9px] text-white/30">hard cap</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                  {directorBudgets.map((value) => {
                    const active = draft.budget === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setDraft((current) => ({ ...current, budget: value }))
                        }
                        className={cn(
                          "flex h-8 items-center justify-center gap-1 rounded-lg text-[10px] transition-colors",
                          active
                            ? "bg-white/10 text-paper"
                            : "text-white/35 hover:text-white/60",
                        )}
                      >
                        {value}
                        <span className="text-[8.5px] text-white/30">cr</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[8.5px] text-white/30">
                  Routes downgrade before the plan breaks the cap.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">
                  Master aspect
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                  {aspects.map((item) => {
                    const active = draft.aspect === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setDraft((current) => ({
                            ...current,
                            aspect: item.id,
                          }))
                        }
                        className={cn(
                          "flex h-[42px] flex-col items-center justify-center gap-1 rounded-lg transition-colors",
                          active
                            ? "bg-white/10 text-paper"
                            : "text-white/35 hover:text-white/60",
                        )}
                      >
                        <span
                          className={cn(
                            "rounded-[3px] border",
                            item.width > item.height ? "h-3 w-5" : "h-4 w-3",
                            active ? "border-lime/70" : "border-white/25",
                          )}
                        />
                        <span className="text-[8.5px]">{item.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/45">
                    Continuity ledger
                  </p>
                  <span className="text-[9px] text-white/30">
                    {draft.locks.length}/4 locked
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {continuityLocks.map((lock) => {
                    const Icon = lockIcons[lock.id];
                    const active = draft.locks.includes(lock.id);
                    return (
                      <button
                        key={lock.id}
                        type="button"
                        aria-pressed={active}
                        title={lock.detail}
                        onClick={() => toggleLock(lock.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors",
                          active
                            ? "border-lime/25 bg-lime/[0.055]"
                            : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.16]",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
                            active ? "text-lime/80" : "text-white/30",
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block truncate text-[10px]",
                              active ? "text-white/75" : "text-white/50",
                            )}
                          >
                            {lock.short}
                          </span>
                          <span className="block truncate text-[8px] text-white/30">
                            {lock.detail}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "flex h-3 w-3 shrink-0 items-center justify-center rounded-full border",
                            active
                              ? "border-lime/50 bg-lime/20"
                              : "border-white/15",
                          )}
                        >
                          {active ? (
                            <Check className="h-2 w-2 text-lime" />
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {brand ? (
                <Link
                  href="/brand"
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5 transition-colors hover:border-white/20"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime">
                      <Palette className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[10.5px] font-medium text-white/70">
                        Brand kit · {brand.name || "Untitled"}
                      </span>
                      <span className="block truncate text-[8.5px] text-white/35">
                        Applied to every frame at render
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-white/30" />
                </Link>
              ) : (
                <Link
                  href="/brand"
                  className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                >
                  <span className="flex items-center gap-2.5">
                    <Palette className="h-3.5 w-3.5 text-lime/60" />
                    <span>
                      <span className="block text-[10.5px] font-medium text-white/60">
                        Add a brand kit
                      </span>
                      <span className="block text-[8.5px] text-white/30">
                        Palette, tone and guardrails travel with the brief
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/25" />
                </Link>
              )}

              {dirty ? (
                <div className="flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-2.5 text-[9.5px] leading-relaxed text-amber-100/75">
                  <RefreshCw className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>
                    The brief changed. Compile again to update the contract and
                    route ledger.
                  </span>
                </div>
              ) : null}

              <Button onClick={recompile} className="w-full">
                <Sparkles className="h-4 w-4" />
                {dirty ? "Compile changes" : "Compile campaign"}
              </Button>

              <p className="text-center text-[8.5px] leading-relaxed text-white/30">
                Demo compiler. Routes and costs are simulated locally; no
                external model is called.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {error ? (
              <div className="mb-2 flex items-start gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.06] p-3 text-[10.5px] leading-relaxed text-red-200/80">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  aria-label="Dismiss error"
                  className="text-red-200/40 hover:text-red-200/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : null}

            <div className="relative overflow-hidden rounded-[26px] bg-paper p-5 text-ink md:p-6">
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[36px] border-ink/[0.035]" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-lime/35 blur-[80px]" />

              <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
                    Outcome contract / {plan.id}
                  </p>
                  <h2 className="display mt-2 text-[32px] leading-none tracking-[-0.04em] text-ink sm:text-[38px]">
                    {plan.title}
                  </h2>
                  <p className="mt-1.5 text-[10.5px] text-ink/50">
                    {plan.objectiveLabel} · {plan.shots.length} beats ·{" "}
                    {plan.aspect} master
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-ink px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-paper">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  {plan.adjusted ? "Budget routed" : "Plan held"}
                </span>
              </div>

              <p className="relative mt-4 max-w-2xl text-[12.5px] leading-relaxed text-ink/65">
                {plan.brief}
              </p>

              <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Budget cap", value: `${plan.budget} cr` },
                  { label: "Planned spend", value: `${plan.totalCredits} cr` },
                  { label: "Continuity", value: `${plan.continuity}%` },
                  { label: "Video runtime", value: `${plan.runtimeSeconds}s` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-ink/10 bg-white/35 px-3 py-2.5"
                  >
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative mt-3 rounded-xl border border-ink/10 bg-white/35 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/45">
                    Cost envelope
                  </span>
                  <span className="text-[9px] text-ink/50">
                    {plan.totalCredits} / {plan.budget} cr · {plan.headroom}{" "}
                    headroom
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-ink transition-[width] duration-500"
                    style={{ width: `${spendRatio}%` }}
                  />
                </div>
                <p className="mt-2 text-[9px] text-ink/45">{plan.routeSummary}</p>
              </div>

              <div className="relative mt-3 flex flex-wrap gap-1.5">
                {plan.contract.map((term) => (
                  <span
                    key={term}
                    className="flex items-center gap-1 rounded-full border border-ink/10 bg-white/30 px-2 py-1 text-[8.5px] text-ink/55"
                  >
                    <Check className="h-2.5 w-2.5 text-ink/40" />
                    {term}
                  </span>
                ))}
              </div>

              <div className="relative mt-5 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
                <Button
                  variant="dark"
                  onClick={() => void renderPlan()}
                  disabled={dirty || rendering || !hydrated}
                >
                  {rendering ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Film className="h-4 w-4" />
                  )}
                  {rendering
                    ? `Rendering ${completedCount}/${plan.shots.length}`
                    : "Render storyboard"}
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-paper/80">
                    {plan.totalCredits} cr
                  </span>
                </Button>
                <Button
                  variant="outlineLight"
                  onClick={downloadPlan}
                  size="md"
                >
                  <Download className="h-4 w-4" />
                  Plan JSON
                </Button>
                <Button
                  variant="outlineLight"
                  onClick={toggleAllApprovals}
                  size="md"
                >
                  <Check className="h-4 w-4" />
                  {allApproved ? "Unapprove" : "Approve"} {approvedCount}/
                  {plan.shots.length}
                </Button>
                {rendering ? (
                  <span className="ml-auto flex items-center gap-2 text-[9px] text-ink/45">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-ink/50" />
                    {completedCount === plan.shots.length
                      ? "Saving frames"
                      : "Local demo renderer"}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-3 px-1">
              <div>
                <p className="eyebrow">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  Storyboard
                </p>
                <h2 className="display mt-1.5 text-[25px] text-paper">
                  The contact sheet.
                </h2>
              </div>
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.1em] text-white/35">
                <span>
                  {completedCount === plan.shots.length && completedCount > 0
                    ? "Mock frames · local"
                    : "Preview · render to fill"}
                </span>
                <Link
                  href="/studio"
                  className="flex items-center gap-1 text-white/45 transition-colors hover:text-white/75"
                >
                  Studio
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {plan.shots.map((shot, index) => {
                const job = jobs[shot.id];
                const shotRendering = job && job.status !== "completed";
                const previewUrl =
                  job?.status === "completed" ? job.resultUrl : undefined;

                return (
                  <article
                    key={shot.id}
                    className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-1.5 transition-colors hover:border-white/[0.16]"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-ink"
                      style={{
                        aspectRatio: plan.aspect.replace(":", " / "),
                      }}
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt={shot.prompt}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 220px"
                          className="object-cover"
                        />
                      ) : (
                        <ArtTile
                          variant={(index * 3 + 2) % 8}
                          className="absolute inset-0 h-full w-full"
                        />
                      )}

                      <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black/85 via-black/5 to-black/20" />

                      <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5">
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/15 bg-black/45 px-1 font-mono text-[8px] text-white/70 backdrop-blur">
                          0{index + 1}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] backdrop-blur",
                            riskStyles[shot.risk],
                          )}
                        >
                          {shot.risk}
                        </span>
                      </div>

                      {previewUrl ? (
                        <span className="absolute right-2 top-2 z-10 rounded-full border border-white/15 bg-black/45 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.08em] text-white/55 backdrop-blur">
                          Demo frame
                        </span>
                      ) : null}

                      {shotRendering ? (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-ink/65 backdrop-blur-[2px]">
                          <Loader2 className="h-4 w-4 animate-spin text-lime" />
                          <span className="text-[9px] text-white/55">
                            {job?.progress ?? 0}%
                          </span>
                        </div>
                      ) : null}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 pt-10">
                        <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-lime/85">
                          {shot.beat}
                        </p>
                        <p className="mt-0.5 font-display text-[13px] font-medium tracking-[-0.01em] text-paper">
                          {shot.title}
                        </p>
                      </div>
                    </div>

                    <div className="px-1 pb-0.5 pt-2">
                      <div className="flex items-center justify-between gap-2 text-[8.5px]">
                        <span className="truncate text-white/60">
                          {shot.modelName}
                        </span>
                        <span className="shrink-0 text-white/40">
                          {shot.credits} cr
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[8.5px] leading-relaxed text-white/35">
                        {shot.direction}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <section className="mt-6 overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.02]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-white/50">
                    Route ledger
                  </p>
                  <p className="mt-1 text-[9.5px] text-white/35">
                    Every model choice, cost and trade-off stays inspectable.
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[8.5px] text-white/40">
                  <Layers className="h-2.5 w-2.5" />
                  {plan.shots.length} decisions
                </span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {plan.shots.map((shot, index) => {
                  const approvedShot = approved.has(shot.id);
                  return (
                    <div
                      key={shot.id}
                      className="grid gap-2 px-4 py-3 md:grid-cols-[34px_minmax(0,1.35fr)_minmax(0,0.8fr)_auto] md:items-center"
                    >
                      <span className="hidden font-mono text-[9px] text-white/25 md:block">
                        0{index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[11px] font-medium text-white/75">
                            {shot.beat} · {shot.title}
                          </p>
                          {shot.adjusted ? (
                            <span className="rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-1.5 py-0.5 text-[7px] uppercase tracking-[0.08em] text-amber-200/80">
                              Budget fit
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-1 text-[9px] text-white/35">
                          {shot.rationale}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[10px] text-white/60">
                          {shot.modelName}
                        </p>
                        <p className="mt-0.5 truncate text-[8.5px] text-white/30">
                          {shot.routeSource} · {shot.resolution} ·{" "}
                          {shot.mode === "video" ? `${shot.duration}s` : "still"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:justify-end">
                        <span className="text-[9.5px] text-white/40">
                          {shot.credits} cr
                        </span>
                        <button
                          type="button"
                          aria-pressed={approvedShot}
                          onClick={() => toggleApproval(shot.id)}
                          className={cn(
                            "flex h-7 items-center gap-1 rounded-full border px-2.5 text-[8.5px] font-medium transition-colors",
                            approvedShot
                              ? "border-lime/30 bg-lime/10 text-lime/85"
                              : "border-white/[0.09] bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white/70",
                          )}
                        >
                          {approvedShot ? (
                            <Check className="h-2.5 w-2.5" />
                          ) : null}
                          {approvedShot ? "Approved" : "Approve"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.07] px-4 py-3 text-[9px] text-white/35">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-lime/60" />
                  {plan.continuity}% continuity confidence
                </span>
                <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                <span>{plan.headroom} credits headroom</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-lime/60" />
                  {approvedCount}/{plan.shots.length} approved
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>

      {notice ? (
        <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/[0.12] bg-[#111318]/95 py-2.5 pl-3.5 pr-2.5 text-[11px] text-white/75 shadow-2xl backdrop-blur-xl">
          <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
          {notice}
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
            className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-white/35 hover:bg-white/[0.06] hover:text-white/70"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}
    </>
  );
}
