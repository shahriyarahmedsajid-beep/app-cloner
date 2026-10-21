import {
  ChevronRight,
  Coins,
  Film,
  Lock,
  Play,
  Sparkles,
  Wand2,
} from "lucide-react";
import { ArtTile } from "@/components/art-tile";

const frames = [
  { variant: 0, label: "Frame 01", ratio: "9:16" },
  { variant: 4, label: "Frame 02", ratio: "9:16" },
  { variant: 1, label: "Frame 03", ratio: "9:16" },
];

export function HeroDemo() {
  return (
    <div className="relative mx-auto mt-14 max-w-[1080px] md:mt-20">
      <div className="pointer-events-none absolute -inset-x-10 top-0 h-52 rounded-full bg-lime/[0.06] blur-[100px]" />

      <div className="relative rounded-[30px] border border-white/[0.09] bg-white/[0.035] p-1.5 shadow-[0_50px_140px_-50px_rgba(0,0,0,1)] backdrop-blur-xl md:p-2.5">
        <div className="overflow-hidden rounded-[23px] border border-white/[0.07] bg-[#0a0c0f]">
          <div className="flex h-11 items-center justify-between gap-3 border-b border-white/[0.06] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] text-white/35">
              <span className="hidden sm:inline">Studio</span>
              <ChevronRight className="hidden h-3 w-3 sm:block" />
              <span className="text-white/55">Untitled flow</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <span className="hidden items-center gap-1 sm:flex">
                <span className="h-1 w-1 rounded-full bg-lime" />
                Draft saved
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-lilac to-sky text-[9px] font-bold text-ink">
                Z
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.93fr_1.07fr]">
            <div className="flex flex-col border-b border-white/[0.06] p-4 md:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  New generation
                </p>
                <span className="flex items-center gap-1.5 rounded-full border border-lime/20 bg-lime/[0.07] px-2 py-1 text-[9.5px] font-medium text-lime/85">
                  <span className="h-1 w-1 animate-pulse-soft rounded-full bg-lime" />
                  Agent on
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.09] bg-black/25 p-3.5">
                <p className="text-[13px] leading-relaxed text-white/75 md:text-[13.5px]">
                  A glass koi fish swimming through clouds at golden hour, slow
                  orbit, shot on 35mm, cinematic haze
                  <span className="ml-0.5 inline-block h-3.5 w-[1.5px] translate-y-0.5 animate-pulse bg-lime" />
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["35mm", "Golden hour", "Slow orbit"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[9.5px] text-white/45"
                    >
                      {chip}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 rounded-full border border-dashed border-white/15 px-2 py-1 text-[9.5px] text-white/30">
                    <Wand2 className="h-2.5 w-2.5" />
                    Enhance
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime/10 text-lime">
                    <Film className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-white/75">
                      Zupona Motion 3
                    </p>
                    <p className="text-[9px] text-white/30">Video · 1080p</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 rotate-90 text-white/25" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.12em] text-white/30">
                    Aspect
                  </p>
                  <div className="mt-1.5 flex gap-1 rounded-lg border border-white/[0.07] bg-black/20 p-1">
                    {["1:1", "4:5", "16:9", "9:16"].map((ratio) => (
                      <span
                        key={ratio}
                        className={
                          ratio === "9:16"
                            ? "flex-1 rounded-md bg-white/10 py-1 text-center text-[9px] font-medium text-paper"
                            : "flex-1 rounded-md py-1 text-center text-[9px] text-white/30"
                        }
                      >
                        {ratio}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.12em] text-white/30">
                    Duration
                  </p>
                  <div className="mt-1.5 flex gap-1 rounded-lg border border-white/[0.07] bg-black/20 p-1">
                    {["5s", "10s"].map((duration) => (
                      <span
                        key={duration}
                        className={
                          duration === "5s"
                            ? "flex-1 rounded-md bg-white/10 py-1 text-center text-[9px] font-medium text-paper"
                            : "flex-1 rounded-md py-1 text-center text-[9px] text-white/30"
                        }
                      >
                        {duration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-lime text-[12px] font-semibold text-ink">
                <Sparkles className="h-3.5 w-3.5" />
                Generate 4 frames
                <span className="ml-1 flex items-center gap-1 rounded-full bg-black/10 px-2 py-0.5 text-[9.5px] font-medium">
                  <Coins className="h-2.5 w-2.5" />
                  18
                </span>
              </div>
            </div>

            <div className="bg-[#090b0d] p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-white/65">
                    Output
                    <span className="ml-2 text-[9.5px] font-normal text-white/25">
                      4 frames · 9:16
                    </span>
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9px] text-white/40">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-lime" />
                  Rendering 3/4
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                {frames.map((frame) => (
                  <div
                    key={frame.label}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.07]"
                  >
                    <ArtTile
                      variant={frame.variant}
                      className="aspect-[4/5] md:aspect-square"
                    />
                    <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between">
                      <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[8.5px] text-white/60 backdrop-blur-sm">
                        {frame.label}
                      </span>
                      {frame.variant === 0 ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                          <Play className="h-2.5 w-2.5 fill-current" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}

                <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] md:aspect-square">
                  <div className="absolute inset-0 animate-pulse-soft bg-[radial-gradient(circle_at_50%_40%,rgba(217,255,67,0.12),transparent_60%)]" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                    <span className="font-display text-[11px] font-semibold text-lime">
                      82%
                    </span>
                    <svg
                      className="absolute inset-0 -rotate-90"
                      viewBox="0 0 40 40"
                      aria-hidden="true"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="rgba(217,255,67,0.18)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="#D9FF43"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="113"
                        strokeDashoffset="20"
                      />
                    </svg>
                  </div>
                  <p className="relative mt-2 text-[8.5px] uppercase tracking-[0.14em] text-white/30">
                    Rendering
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                <p className="text-[9px] text-white/30">
                  Continuity locked across all 4 frames
                </p>
                <span className="flex items-center gap-1 text-[9px] text-lime/70">
                  <Lock className="h-2.5 w-2.5" />
                  Zupona ID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -left-8 bottom-28 hidden items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#0e1014]/90 px-4 py-3 shadow-2xl backdrop-blur-xl xl:flex">
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-7 w-7 rounded-full border-2 border-[#0e1014]"
              style={{
                background: [
                  "linear-gradient(135deg,#ffb38a,#ff5a5f)",
                  "linear-gradient(135deg,#c4b5fd,#7051ff)",
                  "linear-gradient(135deg,#d9ff43,#16c79a)",
                ][i],
              }}
            />
          ))}
        </div>
        <div>
          <p className="text-[11px] font-medium text-paper">Character locked</p>
          <p className="text-[9.5px] text-white/35">Across image + video</p>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-9 top-36 hidden rotate-2 items-center gap-2.5 rounded-2xl border border-lime/20 bg-[#0e1014]/90 px-4 py-3 shadow-2xl backdrop-blur-xl xl:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime/15 text-lime">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-[11px] font-medium text-paper">Auto-routed</p>
          <p className="text-[9.5px] text-white/35">Best model for this shot</p>
        </div>
      </div>
    </div>
  );
}
