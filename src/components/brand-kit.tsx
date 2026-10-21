"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Lock,
  Palette,
  RotateCcw,
  Sparkles,
  Type,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  brandPrompt,
  defaultBrandKit,
  fontPairs,
  getFontPair,
  isHexColor,
  loadBrandKit,
  saveBrandKit,
  tonePresets,
  type BrandKit,
  type FontPairId,
} from "@/lib/brand";
import { cn } from "@/lib/utils";

const labelClass =
  "text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/30";

const inputClass =
  "w-full rounded-xl border border-white/[0.09] bg-black/25 px-3.5 py-2.5 text-[13px] text-paper placeholder:text-white/25 transition-colors focus:border-lime/50";

function isLightColor(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const channel = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b) > 0.55;
}

export function BrandKitEditor() {
  const router = useRouter();
  const [kit, setKit] = useState<BrandKit>(defaultBrandKit);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadBrandKit();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
      setKit(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveBrandKit(kit);
  }, [kit, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function update<K extends keyof BrandKit>(key: K, value: BrandKit[K]) {
    setKit((current) => ({ ...current, [key]: value }));
  }

  function updateColor(index: number, value: string) {
    if (!isHexColor(value)) return;
    setKit((current) => {
      const palette = [...current.palette] as BrandKit["palette"];
      palette[index] = value.toUpperCase();
      return { ...current, palette };
    });
  }

  function reset() {
    if (!window.confirm("Reset this brand kit to the Zupona defaults?")) return;
    setKit({ ...defaultBrandKit, updatedAt: Date.now() });
    setNotice("Brand kit reset to defaults.");
  }

  async function copy(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(message);
    } catch {
      setNotice("Clipboard access is blocked in this browser.");
    }
  }

  function openStudio() {
    const saved = saveBrandKit(kit);
    setKit(saved);
    router.push(
      `/studio?prompt=${encodeURIComponent(brandPrompt(saved))}&model=zupona-canvas-2`,
    );
  }

  const fontPair = getFontPair(kit.fontPair);
  const ink = isLightColor(kit.palette[0]) ? "#0a0b05" : "#f5f3ec";
  const buttonBackground = isLightColor(kit.palette[0])
    ? "rgba(7, 8, 10, 0.88)"
    : "rgba(245, 243, 236, 0.92)";
  const buttonInk = isLightColor(kit.palette[0]) ? "#f5f3ec" : "#0a0b05";
  const directive = brandPrompt(kit);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 md:pt-20">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-[-60%] h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,255,67,0.1),transparent_65%)]" />
        <div className="shell relative pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-white/30">
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/55">Brand kit</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow mb-4">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/10">
                  <Palette className="h-3 w-3 text-lime" />
                </span>
                Consistency is a feature
              </p>
              <h1 className="display max-w-2xl text-balance text-[44px] leading-[0.95] text-paper sm:text-[58px] md:text-[68px]">
                Every render,
                <br />
                <span className="text-white/30">on brand.</span>
              </h1>
              <p className="pretty mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/45">
                Define your palette, type, tone and guardrails once. Zupona
                turns them into a brand directive you can attach to any prompt,
                so the next frame already sounds and looks like you.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "1", label: "kit per browser" },
                { value: "0", label: "credits to set up" },
                { value: "Local", label: "demo storage" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3"
                >
                  <p className="font-display text-[20px] font-semibold tracking-[-0.02em] text-paper">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-10 md:py-14">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="space-y-3">
            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    <Sparkles className="h-3.5 w-3.5 text-lime/70" />
                    Identity
                  </p>
                  <p className="mt-1 text-[11px] text-white/30">
                    The words every prompt starts from.
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.07] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-lime/75">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  {hydrated ? "Auto-saved" : "Loading"}
                </span>
              </div>

              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="brand-name" className={labelClass}>
                    Brand name
                  </label>
                  <input
                    id="brand-name"
                    value={kit.name}
                    maxLength={48}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Your brand"
                    className={cn(inputClass, "mt-2")}
                  />
                </div>
                <div>
                  <label htmlFor="brand-tagline" className={labelClass}>
                    One-line promise
                  </label>
                  <textarea
                    id="brand-tagline"
                    value={kit.tagline}
                    rows={2}
                    maxLength={140}
                    onChange={(event) => update("tagline", event.target.value)}
                    placeholder="What do you help people do?"
                    className={cn(inputClass, "mt-2 resize-none")}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                <Palette className="h-3.5 w-3.5 text-lime/70" />
                Palette
              </p>
              <p className="mt-1 text-[11px] text-white/30">
                Four colors are passed into every render.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {kit.palette.map((color, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/[0.08] bg-black/20 p-2"
                  >
                    <label
                      htmlFor={`brand-color-${index}`}
                      className="block cursor-pointer overflow-hidden rounded-xl border border-white/[0.08]"
                      style={{ background: color }}
                    >
                      <input
                        id={`brand-color-${index}`}
                        type="color"
                        value={color}
                        onChange={(event) => updateColor(index, event.target.value)}
                        className="h-16 w-full cursor-pointer opacity-0"
                        aria-label={`Palette color ${index + 1}`}
                      />
                    </label>
                    <div className="mt-2 flex items-center justify-between gap-1 px-1">
                      <span className="font-mono text-[9px] uppercase text-white/40">
                        {color}
                      </span>
                      <button
                        type="button"
                        onClick={() => copy(color, `Copied ${color}.`)}
                        aria-label={`Copy ${color}`}
                        className="text-white/25 transition-colors hover:text-white/70"
                      >
                        <Copy className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                <Type className="h-3.5 w-3.5 text-lime/70" />
                Type & voice
              </p>

              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="brand-font" className={labelClass}>
                    Type pairing
                  </label>
                  <select
                    id="brand-font"
                    value={kit.fontPair}
                    onChange={(event) =>
                      update("fontPair", event.target.value as FontPairId)
                    }
                    className={cn(inputClass, "mt-2")}
                  >
                    {fontPairs.map((pair) => (
                      <option key={pair.id} value={pair.id}>
                        {pair.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brand-tone" className={labelClass}>
                    Tone of voice
                  </label>
                  <textarea
                    id="brand-tone"
                    value={kit.tone}
                    rows={2}
                    maxLength={220}
                    onChange={(event) => update("tone", event.target.value)}
                    className={cn(inputClass, "mt-2 resize-none")}
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tonePresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => update("tone", preset)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[9.5px] transition-colors",
                          kit.tone === preset
                            ? "border-lime/30 bg-lime/10 text-lime"
                            : "border-white/[0.08] bg-white/[0.02] text-white/35 hover:text-white/60",
                        )}
                      >
                        {preset.split(".")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="brand-guardrails" className={labelClass}>
                    Guardrails
                  </label>
                  <textarea
                    id="brand-guardrails"
                    value={kit.guardrails}
                    rows={2}
                    maxLength={240}
                    onChange={(event) => update("guardrails", event.target.value)}
                    className={cn(inputClass, "mt-2 resize-none")}
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-3.5">
                  <input
                    type="checkbox"
                    checked={kit.lockConsistency}
                    onChange={(event) =>
                      update("lockConsistency", event.target.checked)
                    }
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-lime"
                  />
                  <span>
                    <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-white/70">
                      <Lock className="h-3 w-3 text-lime/60" />
                      Lock characters and products
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-relaxed text-white/35">
                      Adds a continuity instruction to every prompt so faces,
                      packaging and visual language survive the whole sequence.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={openStudio} className="group">
                <Wand2 className="h-4 w-4" />
                Open studio with brand
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => copy(directive, "Brand directive copied.")}
              >
                <Copy className="h-4 w-4" />
                Copy directive
              </Button>
              <Button variant="ghost" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.025] p-2.5">
              <div className="mb-2.5 flex items-center justify-between px-2 pt-1">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  Live preview
                </p>
                <span className="flex items-center gap-1.5 text-[9px] text-white/25">
                  <span className="h-1 w-1 rounded-full bg-lime/70" />
                  Updates as you type
                </span>
              </div>

              <div
                className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[20px] p-6"
                style={{
                  background: `linear-gradient(150deg, ${kit.palette[0]} 0%, ${kit.palette[1]} 100%)`,
                  color: ink,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full"
                  style={{ background: kit.palette[2], opacity: 0.75 }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
                    style={{ background: "rgba(7,8,10,0.16)" }}
                  >
                    Brand system 01
                  </span>
                  <span className="font-mono text-[9px] opacity-60">2026</span>
                </div>

                <div className="relative">
                  <p
                    className="text-[clamp(2rem,4.4vw,2.9rem)] font-semibold leading-[0.94] tracking-[-0.045em]"
                    style={{ fontFamily: fontPair.display }}
                  >
                    {kit.name || "Your brand"}
                  </p>
                  <p
                    className="mt-3 max-w-[19rem] text-[12.5px] leading-relaxed opacity-80"
                    style={{ fontFamily: fontPair.body }}
                  >
                    {kit.tagline || "A one-line promise goes here."}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[10px] font-semibold"
                    style={{ background: buttonBackground, color: buttonInk }}
                  >
                    Make the first frame
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex gap-1.5">
                    {kit.palette.map((color, index) => (
                      <span
                        key={index}
                        className="h-4 w-4 rounded-full border border-black/15"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[8.5px] uppercase tracking-[0.14em] opacity-50"
                    style={{ fontFamily: fontPair.body }}
                  >
                    {kit.lockConsistency ? "Continuity locked" : "Continuity off"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  Brand directive
                </p>
                <span className="rounded-full border border-white/[0.07] bg-black/20 px-2 py-0.5 text-[8.5px] text-white/25">
                  {directive.length} chars
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-white/40">
                {directive}
              </p>
            </div>

            <div className="mt-3 rounded-[22px] border border-lime/15 bg-lime/[0.045] p-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime/70">
                <Sparkles className="h-3 w-3" />
                How it travels
              </p>
              <p className="mt-2 text-[10.5px] leading-relaxed text-white/35">
                The demo keeps your kit in this browser and prepends it to the
                prompt when you open the studio. In production it would be
                account-scoped and applied server-side to every app, prompt and
                render.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[26px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(217,255,67,0.06),rgba(255,255,255,0.02)_60%)] p-6 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="eyebrow mb-3">
              <span className="h-1 w-1 rounded-full bg-lime" />
              Next step
            </p>
            <h2 className="display text-[28px] leading-[1.02] text-paper sm:text-[34px]">
              Put the kit to work.
            </h2>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-white/40">
              Start from a storefront workflow and your brand directive travels
              with it. No account, no upload, no training.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={openStudio}>
              <Wand2 className="h-4 w-4" />
              Open the studio
            </Button>
            <Link
              href="/store"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-[13.5px] font-semibold text-paper transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              Browse apps
              <ArrowRight className="h-4 w-4" />
            </Link>
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
