"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clapperboard,
  Coins,
  Copy,
  Dices,
  Download,
  Image as ImageIcon,
  Loader2,
  Lock,
  Music2,
  Palette,
  Plus,
  RefreshCw,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";
import { Button } from "@/components/ui/button";
import { brandPrompt, loadBrandKit, type BrandKit } from "@/lib/brand";
import {
  CREDITS_KEY,
  LIBRARY_KEY,
  type PublicJob,
  type SavedGeneration,
} from "@/lib/generation";
import {
  aspects,
  costFor,
  generationModels,
  getModel,
  getModelByShortName,
  promptIdeas,
  STARTING_CREDITS,
  type AspectId,
  type GenerationMode,
} from "@/lib/models";
import type { AppCategory } from "@/lib/store";
import { cn, formatCredits } from "@/lib/utils";

export type StudioPreset = {
  slug: string;
  name: string;
  category: AppCategory;
  credits: number;
  model: string;
  prompt: string;
} | null;

const stageLabels = [
  "Reading the brief",
  "Writing the shot list",
  "Routing to the best model",
  "Rendering frames",
];

function aspectValue(aspect: AspectId) {
  return aspect.replace(":", " / ");
}

export function Studio({
  initialPrompt,
  initialModelId,
  preset,
}: {
  initialPrompt: string;
  initialModelId?: string;
  preset: StudioPreset;
}) {
  const presetModel = preset ? getModelByShortName(preset.model) : undefined;
  const initialModel =
    (initialModelId ? getModel(initialModelId) : undefined) ??
    presetModel ??
    getModel("zupona-motion-3")!;

  const [mode, setMode] = useState<GenerationMode>(initialModel.mode);
  const [modelId, setModelId] = useState(initialModel.id);
  const [prompt, setPrompt] = useState(initialPrompt.slice(0, 1200));
  const [aspect, setAspect] = useState<AspectId>(
    initialModel.mode === "video" ? "9:16" : "1:1",
  );
  const [duration, setDuration] = useState<5 | 10>(5);
  const [credits, setCredits] = useState(STARTING_CREDITS);
  const [hydrated, setHydrated] = useState(false);
  const [job, setJob] = useState<PublicJob | null>(null);
  const [library, setLibrary] = useState<SavedGeneration[]>([]);
  const [brand, setBrand] = useState<BrandKit | null>(null);
  const [useBrand, setUseBrand] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const handled = useRef<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const models = useMemo(
    () => generationModels.filter((model) => model.mode === mode),
    [mode],
  );
  const selectedModel = getModel(modelId) ?? models[0] ?? generationModels[0];
  const cost = costFor(selectedModel, duration);
  const processing = job?.status === "processing";
  const busy = submitting || processing;

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

  const activeJobId = job?.id;
  const activeJobStatus = job?.status;

  useEffect(() => {
    if (!activeJobId || activeJobStatus === "completed") return;

    let active = true;

    const tick = async () => {
      try {
        const response = await fetch(`/api/jobs/${activeJobId}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Job unavailable");
        const next = (await response.json()) as PublicJob;
        if (!active) return;
        setJob((current) =>
          current && current.id === next.id ? next : current,
        );
        setError(null);
      } catch {
        if (active) {
          setError("The demo renderer stopped responding. Try another run.");
        }
      }
    };

    const interval = window.setInterval(tick, 650);
    tick();

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [activeJobId, activeJobStatus]);

  useEffect(() => {
    if (
      !job ||
      job.status !== "completed" ||
      !job.resultUrl ||
      handled.current.has(job.id)
    ) {
      return;
    }

    handled.current.add(job.id);
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

    setLibrary((current) =>
      [saved, ...current.filter((item) => item.id !== saved.id)].slice(0, 24),
    );
    setNotice("Render complete. Saved to your local library.");
  }, [job]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function switchMode(next: GenerationMode) {
    if (next === mode) return;
    const first = generationModels.find((model) => model.mode === next);
    if (!first) return;
    setMode(next);
    setModelId(first.id);
    setAspect(next === "video" ? "9:16" : "1:1");
    setDuration(5);
    setError(null);
  }

  function selectModel(nextId: string) {
    const next = getModel(nextId);
    if (!next) return;
    setModelId(nextId);
    if (next.mode === "image" && !["1:1", "4:5"].includes(aspect)) {
      setAspect("1:1");
    }
    setError(null);
  }

  function surprise() {
    const options = promptIdeas.filter((idea) => idea !== prompt);
    const next = options[Math.floor(Math.random() * options.length)];
    setPrompt(next);
    textareaRef.current?.focus();
  }

  function enhance() {
    if (!prompt.trim()) {
      surprise();
      return;
    }
    const suffix = "cinematic lighting, subtle film grain, high detail";
    if (prompt.toLowerCase().includes("cinematic lighting")) return;
    setPrompt(`${prompt.trim().replace(/[,\s]+$/, "")}, ${suffix}`.slice(0, 1200));
  }

  async function generate() {
    const trimmed = prompt.trim();
    if (trimmed.length < 3) {
      setError("Write a few more words so the studio has something to direct.");
      textareaRef.current?.focus();
      return;
    }
    if (cost > credits) {
      setError(
        `You need ${cost - credits} more demo credits for this run. Reset them from the Library.`,
      );
      return;
    }

    setSubmitting(true);
    setError(null);
    setNotice(null);

    const directive = brand && useBrand ? brandPrompt(brand) : "";
    const finalPrompt =
      directive && !trimmed.includes(directive)
        ? `${trimmed} ${directive}`.slice(0, 1200).trim()
        : trimmed;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          modelId: selectedModel.id,
          aspect,
          duration,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not start this render.");
      }
      setJob(data as PublicJob);
      setCredits((current) => Math.max(0, current - (data as PublicJob).credits));
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function startNew() {
    setJob(null);
    setError(null);
    setCopied(false);
  }

  function loadSaved(item: SavedGeneration) {
    handled.current.add(item.id);
    setJob({
      id: item.id,
      prompt: item.prompt,
      modelId: item.modelId,
      modelName: item.modelName,
      mode: item.mode,
      aspect: item.aspect,
      duration: item.duration,
      credits: item.credits,
      status: "completed",
      progress: 100,
      resultUrl: item.resultUrl,
      createdAt: item.createdAt,
      etaSeconds: 0,
    });
    setMode(item.mode);
    setModelId(item.modelId);
    setPrompt(item.prompt);
    setAspect(item.aspect);
    setDuration(item.duration === 10 ? 10 : 5);
    setError(null);
    setCopied(false);
  }

  async function copyPrompt() {
    const text = job?.prompt ?? prompt;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setNotice("Prompt copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotice("Clipboard access is blocked in this browser.");
    }
  }

  function download() {
    if (!job?.resultUrl) return;
    const anchor = document.createElement("a");
    anchor.href = job.resultUrl;
    anchor.download = `zupona-${job.id}.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setNotice("Downloaded your frame (demo SVG).");
  }

  const progress = job?.progress ?? 0;
  const stage =
    stageLabels[
      Math.min(stageLabels.length - 1, Math.floor(progress / 26))
    ] ?? stageLabels[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-8 pb-7">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="shell relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/30">
              <Link href="/" className="transition-colors hover:text-white/60">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/55">Studio</span>
            </div>
            <h1 className="display mt-3 text-[42px] leading-none text-paper sm:text-[52px]">
              Studio<span className="text-lime">.</span>
            </h1>
            <p className="mt-2.5 max-w-lg text-[13px] text-white/40">
              One calm canvas for images and motion. Every render is simulated
              locally in this demo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 text-[12px] font-medium text-white/65">
              <Coins className="h-3.5 w-3.5 text-lime/80" />
              {formatCredits(credits)} credits
            </span>
            <span className="flex h-9 items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.07] px-3.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-lime/80">
              <span className="h-1 w-1 animate-pulse rounded-full bg-lime" />
              Demo mode
            </span>
          </div>
        </div>
      </section>

      <section className="shell py-6 md:py-8">
        {preset ? (
          <div className="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-lilac/15 bg-lilac/[0.045] px-4 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lilac/15 text-lilac">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <p className="text-[11.5px] text-white/50">
              <span className="font-medium text-white/75">{preset.name}</span>{" "}
              workflow loaded — edit anything before you render.
            </p>
            <Link
              href={`/store/${preset.slug}`}
              className="ml-auto flex items-center gap-1 text-[10.5px] text-white/35 transition-colors hover:text-white/70"
            >
              View workflow
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        ) : null}

        <div className="grid gap-3 lg:grid-cols-[370px_minmax(0,1fr)] xl:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[26px] border border-white/[0.09] bg-white/[0.025]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/40">
                Generate
              </p>
              <span className="text-[9.5px] text-white/25">
                costs update live
              </span>
            </div>

            <div className="space-y-5 p-4">
              <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("image")}
                  className={cn(
                    "flex h-8 items-center justify-center gap-1.5 rounded-lg text-[10.5px] font-medium transition-colors",
                    mode === "image"
                      ? "bg-white/10 text-paper"
                      : "text-white/35 hover:text-white/60",
                  )}
                >
                  <ImageIcon className="h-3 w-3" />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("video")}
                  className={cn(
                    "flex h-8 items-center justify-center gap-1.5 rounded-lg text-[10.5px] font-medium transition-colors",
                    mode === "video"
                      ? "bg-white/10 text-paper"
                      : "text-white/35 hover:text-white/60",
                  )}
                >
                  <Clapperboard className="h-3 w-3" />
                  Video
                </button>
                <button
                  type="button"
                  disabled
                  className="flex h-8 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg text-[10.5px] font-medium text-white/20"
                  title="Audio is coming next"
                >
                  <Music2 className="h-3 w-3" />
                  Audio
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35">
                    Model
                  </p>
                  <span className="text-[9px] text-white/20">
                    {mode === "video" ? "3 video routes" : "3 image routes"}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {models.map((model) => {
                    const selected = model.id === modelId;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => selectModel(model.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors",
                          selected
                            ? "border-lime/30 bg-lime/[0.06]"
                            : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.15]",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-3 w-3 shrink-0 items-center justify-center rounded-full border",
                            selected ? "border-lime" : "border-white/20",
                          )}
                        >
                          {selected ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-[11.5px] font-medium text-white/75">
                              {model.name}
                            </span>
                            {model.featured ? (
                              <span className="rounded bg-white/[0.07] px-1 py-0.5 text-[7.5px] uppercase tracking-[0.08em] text-white/40">
                                Flagship
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-0.5 block truncate text-[9px] text-white/30">
                            {model.tagline}
                          </span>
                        </span>
                        <span className="shrink-0 text-[9.5px] text-white/35">
                          {costFor(model, 5)}
                          <span className="text-white/20"> cr</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[selectedModel.resolution, selectedModel.latency, selectedModel.poweredBy].map(
                    (detail) => (
                      <span
                        key={detail}
                        className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1.5 py-1 text-[8.5px] text-white/30"
                      >
                        {detail}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="studio-prompt"
                    className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35"
                  >
                    Prompt
                  </label>
                  <span className="text-[9px] text-white/20">
                    {prompt.length}/1200
                  </span>
                </div>
                <textarea
                  id="studio-prompt"
                  ref={textareaRef}
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value.slice(0, 1200))}
                  rows={5}
                  placeholder="A glass koi swimming through clouds at golden hour…"
                  className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-black/25 p-3 text-[12px] leading-relaxed text-white/75 placeholder:text-white/20 transition-colors focus:border-white/20"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={surprise}
                      className="flex h-7 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 text-[9.5px] text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                    >
                      <Dices className="h-3 w-3" />
                      Surprise me
                    </button>
                    <button
                      type="button"
                      onClick={enhance}
                      className="flex h-7 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 text-[9.5px] text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                    >
                      <Wand2 className="h-3 w-3" />
                      Enhance
                    </button>
                  </div>
                  <span className="flex items-center gap-1 text-[8.5px] text-white/20">
                    <Lock className="h-2.5 w-2.5" />
                    private
                  </span>
                </div>
              </div>

              {brand ? (
                <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime/10 text-lime">
                        <Palette className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[10.5px] font-medium text-white/65">
                          Brand kit · {brand.name || "Untitled"}
                        </p>
                        <p className="text-[9px] text-white/30">
                          {useBrand
                            ? "Palette, tone and continuity appended to this prompt"
                            : "Not applied to this render"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={useBrand}
                      aria-label={`Apply ${brand.name || "brand"} kit to this prompt`}
                      onClick={() => setUseBrand((value) => !value)}
                      className={cn(
                        "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
                        useBrand
                          ? "border-lime/40 bg-lime/30"
                          : "border-white/10 bg-white/[0.06]",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all",
                          useBrand
                            ? "left-[19px] bg-lime"
                            : "left-[3px] bg-white/40",
                        )}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/brand"
                  className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                >
                  <span className="flex items-center gap-2.5">
                    <Palette className="h-3.5 w-3.5 text-lime/60" />
                    <span>
                      <span className="block text-[10.5px] font-medium text-white/55">
                        Set up a brand kit
                      </span>
                      <span className="block text-[9px] text-white/25">
                        Palette, tone and continuity for every render
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/25" />
                </Link>
              )}

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35">
                  Aspect ratio
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                  {aspects.map((item) => {
                    const selected = item.id === aspect;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAspect(item.id)}
                        className={cn(
                          "flex h-[42px] flex-col items-center justify-center gap-1 rounded-lg transition-colors",
                          selected
                            ? "bg-white/10 text-paper"
                            : "text-white/30 hover:text-white/55",
                        )}
                      >
                        <span
                          className={cn(
                            "rounded-[3px] border",
                            item.width > item.height ? "w-5" : "w-3",
                            item.width > item.height ? "h-3" : "h-4",
                            selected ? "border-lime/70" : "border-white/25",
                          )}
                        />
                        <span className="text-[8.5px]">{item.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {mode === "video" ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35">
                    Length
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-white/[0.07] bg-black/20 p-1">
                    {[5, 10].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDuration(value as 5 | 10)}
                        className={cn(
                          "flex h-8 items-center justify-center gap-2 rounded-lg text-[10px] transition-colors",
                          duration === value
                            ? "bg-white/10 text-paper"
                            : "text-white/30 hover:text-white/55",
                        )}
                      >
                        {value}s
                        <span className="text-[8.5px] text-white/25">
                          {costFor(selectedModel, value)} cr
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-xl border border-white/[0.07] bg-black/25 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] text-white/35">Per run</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-paper">
                    <Coins className="h-3 w-3 text-lime/70" />
                    {cost} credits
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[9.5px] text-white/25">
                    Balance after
                  </span>
                  <span className="text-[9.5px] text-white/35">
                    {formatCredits(Math.max(0, credits - cost))}
                  </span>
                </div>
              </div>

              {error ? (
                <div className="flex items-start gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.06] p-3 text-[10.5px] leading-relaxed text-red-200/80">
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

              <Button
                onClick={() => void generate()}
                disabled={busy}
                className="w-full"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {processing ? `Rendering · ${progress}%` : "Starting render…"}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-[9.5px] font-semibold">
                      {cost} cr
                    </span>
                  </>
                )}
              </Button>

              <p className="text-center text-[8.5px] leading-relaxed text-white/20">
                Demo mode. No external AI is called.{" "}
                <Link href="/library" className="underline underline-offset-2">
                  Reset credits
                </Link>
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/45">
                  Canvas
                </h2>
                <span className="text-[10px] text-white/20">
                  / {job ? (processing ? "rendering" : "latest frame") : "empty"}
                </span>
              </div>
              {job ? (
                <div className="flex flex-wrap items-center gap-2 text-[9.5px] text-white/25">
                  <span>{job.modelName}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                  <span>{job.aspect}</span>
                  {job.mode === "video" ? (
                    <>
                      <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                      <span>{job.duration}s</span>
                    </>
                  ) : null}
                  <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                  <span>{job.credits} cr</span>
                </div>
              ) : null}
            </div>

            <div className="mt-2 rounded-[26px] border border-white/[0.09] bg-[#090b0d] p-2">
              {!job ? (
                <div className="grid overflow-hidden rounded-[20px] border border-white/[0.06] bg-[radial-gradient(circle_at_70%_20%,rgba(196,181,253,0.06),transparent_55%)] md:grid-cols-[1.08fr_0.92fr]">
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/35">
                      <Sparkles className="h-2.5 w-2.5 text-lime/60" />
                      Canvas empty
                    </span>
                    <h3 className="display mt-5 text-[32px] leading-[1.02] text-paper sm:text-[38px]">
                      Start with a hunch.
                      <br />
                      <span className="text-white/25">Leave with a frame.</span>
                    </h3>
                    <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-white/35">
                      Write a prompt, pick a route and press generate. Or borrow
                      one of these starters.
                    </p>
                    <div className="mt-5 space-y-1.5">
                      {promptIdeas.slice(0, 3).map((idea) => (
                        <button
                          key={idea}
                          type="button"
                          onClick={() => {
                            setPrompt(idea);
                            textareaRef.current?.focus();
                          }}
                          className="group flex w-full items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left transition-colors hover:border-white/[0.15] hover:bg-white/[0.035]"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-lime/50" />
                          <span className="truncate text-[10.5px] text-white/40 group-hover:text-white/60">
                            {idea}
                          </span>
                          <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 text-white/20 group-hover:text-white/50" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative hidden min-h-[320px] p-4 md:block">
                    <div className="absolute left-6 top-10 w-[52%] rotate-[-4deg] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                      <ArtTile variant={2} className="aspect-[4/5]" />
                    </div>
                    <div className="absolute bottom-8 right-4 w-[48%] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                      <ArtTile variant={1} className="aspect-square" />
                    </div>
                    <div className="absolute right-[40%] top-4 rounded-full border border-lime/20 bg-lime/10 px-2.5 py-1 text-[8.5px] text-lime/80 backdrop-blur">
                      Preview
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[20px] bg-[#0a0c0f] p-3 md:p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {processing ? (
                        <span className="flex items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.06] px-2.5 py-1 text-[9.5px] font-medium text-lime/80">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Rendering
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.06] px-2.5 py-1 text-[9.5px] font-medium text-lime/80">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </span>
                      )}
                      <span className="hidden text-[9.5px] text-white/25 sm:inline">
                        {processing
                          ? `about ${job.etaSeconds}s left`
                          : new Date(job.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </span>
                    </div>
                    <span className="text-[9px] text-white/25">
                      {job.mode === "video"
                        ? `${job.duration}s · 1080p`
                        : "2K still"}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <div
                      className={cn(
                        "relative w-full overflow-hidden rounded-2xl border border-white/[0.08]",
                        job.aspect === "9:16" && "max-w-[350px]",
                        job.aspect === "4:5" && "max-w-[470px]",
                        job.aspect === "1:1" && "max-w-[560px]",
                      )}
                      style={{ aspectRatio: aspectValue(job.aspect) }}
                    >
                      {processing ? (
                        <>
                          <ArtTile
                            variant={selectedModel.accent}
                            className="absolute inset-0 h-full w-full"
                          />
                          <div className="absolute inset-0 bg-ink/70 backdrop-blur-[3px]" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/30">
                              <Loader2 className="h-6 w-6 animate-spin text-lime" />
                              <span className="absolute -bottom-6 text-[9.5px] text-white/35">
                                {progress}%
                              </span>
                            </div>
                            <div className="mt-4 text-center">
                              <p className="text-[12px] font-medium text-white/70">
                                {stage}
                              </p>
                              <p className="mt-1 text-[9.5px] text-white/25">
                                {job.modelName} · {job.aspect}
                              </p>
                            </div>
                            <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-lime transition-[width] duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </>
                      ) : job.resultUrl ? (
                        <Image
                          src={job.resultUrl}
                          alt={job.prompt}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 700px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </div>

                  {job.status === "completed" ? (
                    <>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <Button variant="secondary" size="sm" onClick={download}>
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => void copyPrompt()}>
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-lime" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          Copy prompt
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => void generate()}
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          Run again
                        </Button>
                        <Button variant="ghost" size="sm" onClick={startNew}>
                          <Plus className="h-3.5 w-3.5" />
                          New canvas
                        </Button>
                      </div>
                      <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                        <p className="line-clamp-2 text-[10.5px] leading-relaxed text-white/35">
                          {job.prompt}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-lime" />
                      <p className="text-[9.5px] text-white/30">
                        Zupona is storyboarding, routing and rendering. The
                        result is generated locally for this demo.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {library.length > 0 ? (
              <div className="mt-5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/45">
                      Recent runs
                    </h2>
                    <span className="text-[9px] text-white/20">local only</span>
                  </div>
                  <Link
                    href="/library"
                    className="flex items-center gap-1 text-[10px] text-white/30 transition-colors hover:text-white/65"
                  >
                    Open library
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {library.slice(0, 8).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => loadSaved(item)}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] text-left"
                      title={item.prompt}
                    >
                      <Image
                        src={item.resultUrl}
                        alt={item.prompt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, 200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute inset-x-2 bottom-2 z-10">
                        <p className="truncate text-[9px] font-medium text-white/65">
                          {item.modelName}
                        </p>
                        <p className="truncate text-[8px] text-white/30">
                          {item.prompt}
                        </p>
                      </div>
                      <span className="absolute right-2 top-2 z-10 rounded-full bg-black/40 p-1 text-white/50 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
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
