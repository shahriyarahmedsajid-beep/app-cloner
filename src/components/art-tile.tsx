import { cn } from "@/lib/utils";

type Palette = {
  base: string;
  glowA: string;
  glowB: string;
  orb: string;
  rim: string;
  veil: string;
};

const palettes: Palette[] = [
  {
    base: "linear-gradient(145deg, #1a0d09 0%, #0b0807 58%, #08080a 100%)",
    glowA: "radial-gradient(circle, #ff7a45 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #ffcf7a 0%, transparent 66%)",
    orb: "radial-gradient(circle at 32% 26%, #fff4dc 0%, #ffb078 20%, #ff6a3d 46%, #6d1f2f 74%, #1a0b12 100%)",
    rim: "rgba(255, 196, 150, 0.42)",
    veil: "rgba(255, 106, 61, 0.2)",
  },
  {
    base: "linear-gradient(145deg, #0d0b17 0%, #09080e 58%, #08080a 100%)",
    glowA: "radial-gradient(circle, #7c5cff 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #5ad1ff 0%, transparent 66%)",
    orb: "radial-gradient(circle at 30% 24%, #f4eaff 0%, #b79bff 24%, #7051ff 48%, #241c66 76%, #0d0a1f 100%)",
    rim: "rgba(185, 166, 255, 0.45)",
    veil: "rgba(124, 92, 255, 0.24)",
  },
  {
    base: "linear-gradient(145deg, #0a1310 0%, #080b0a 58%, #07080a 100%)",
    glowA: "radial-gradient(circle, #d9ff43 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #16c79a 0%, transparent 64%)",
    orb: "radial-gradient(circle at 32% 26%, #fbffe3 0%, #e5ff8a 20%, #b7e825 46%, #225c37 76%, #07130d 100%)",
    rim: "rgba(220, 255, 130, 0.4)",
    veil: "rgba(217, 255, 67, 0.16)",
  },
  {
    base: "linear-gradient(145deg, #121316 0%, #0a0b0d 58%, #08090a 100%)",
    glowA: "radial-gradient(circle, #f5f3ec 0%, transparent 62%)",
    glowB: "radial-gradient(circle, #5a6bff 0%, transparent 64%)",
    orb: "radial-gradient(circle at 30% 22%, #ffffff 0%, #d9dce4 18%, #8e96a8 40%, #3a4054 66%, #0b0d13 100%)",
    rim: "rgba(236, 240, 255, 0.5)",
    veil: "rgba(120, 140, 255, 0.16)",
  },
  {
    base: "linear-gradient(145deg, #1b0f0c 0%, #0d0908 58%, #09080a 100%)",
    glowA: "radial-gradient(circle, #ffb38a 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #ff5a5f 0%, transparent 64%)",
    orb: "radial-gradient(circle at 30% 26%, #fff0de 0%, #ffc6a2 22%, #ff8c66 46%, #7d2b3c 76%, #1c0c12 100%)",
    rim: "rgba(255, 205, 180, 0.4)",
    veil: "rgba(255, 140, 102, 0.18)",
  },
  {
    base: "linear-gradient(145deg, #071319 0%, #071015 58%, #07090b 100%)",
    glowA: "radial-gradient(circle, #66e0ff 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #2f6bff 0%, transparent 66%)",
    orb: "radial-gradient(circle at 32% 26%, #eefcff 0%, #a6eeff 20%, #45b6ff 46%, #173f96 76%, #06101f 100%)",
    rim: "rgba(160, 230, 255, 0.42)",
    veil: "rgba(70, 190, 255, 0.18)",
  },
  {
    base: "linear-gradient(145deg, #121212 0%, #0a0a0a 58%, #070708 100%)",
    glowA: "radial-gradient(circle, #f5f3ec 0%, transparent 62%)",
    glowB: "radial-gradient(circle, #ff4d3d 0%, transparent 58%)",
    orb: "radial-gradient(circle at 30% 25%, #ffffff 0%, #c9c9c6 19%, #77797c 44%, #27282c 74%, #09090b 100%)",
    rim: "rgba(255, 255, 255, 0.26)",
    veil: "rgba(255, 77, 61, 0.14)",
  },
  {
    base: "linear-gradient(145deg, #141703 0%, #0c0d05 58%, #08090a 100%)",
    glowA: "radial-gradient(circle, #d9ff43 0%, transparent 68%)",
    glowB: "radial-gradient(circle, #9dff00 0%, transparent 62%)",
    orb: "radial-gradient(circle at 32% 26%, #ffffff 0%, #f2ffb3 18%, #d9ff43 42%, #5d7d0a 74%, #0d1403 100%)",
    rim: "rgba(217, 255, 67, 0.38)",
    veil: "rgba(217, 255, 67, 0.2)",
  },
];

const layouts = [
  { orb: "left-[26%] top-[18%] h-[62%] w-[62%]", tilt: "-14deg", ring: "inset-[9%]" },
  { orb: "right-[8%] top-[20%] h-[68%] w-[68%]", tilt: "22deg", ring: "inset-[14%]" },
  { orb: "left-[12%] top-[30%] h-[64%] w-[64%]", tilt: "8deg", ring: "inset-[6%]" },
  { orb: "left-[30%] top-[6%] h-[72%] w-[72%]", tilt: "-30deg", ring: "inset-[16%]" },
  { orb: "right-[18%] bottom-[6%] h-[66%] w-[66%]", tilt: "34deg", ring: "inset-[10%]" },
  { orb: "left-[22%] top-[24%] h-[58%] w-[58%]", tilt: "-8deg", ring: "inset-[12%]" },
  { orb: "right-[24%] top-[14%] h-[62%] w-[62%]", tilt: "16deg", ring: "inset-[8%]" },
  { orb: "left-[34%] top-[26%] h-[56%] w-[56%]", tilt: "-22deg", ring: "inset-[14%]" },
];

export function ArtTile({
  variant = 0,
  className,
  children,
  overlay,
}: {
  variant?: number;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}) {
  const index = ((variant % palettes.length) + palettes.length) % palettes.length;
  const palette = palettes[index];
  const layout = layouts[index];

  return (
    <div
      className={cn(
        "grain relative isolate overflow-hidden bg-ink",
        className,
      )}
      style={{ background: palette.base }}
    >
      <div
        className="absolute -left-[18%] -top-[22%] h-[92%] w-[92%] rounded-full opacity-70 blur-3xl"
        style={{ background: palette.glowA }}
      />
      <div
        className="absolute -bottom-[26%] right-[-20%] h-[88%] w-[88%] rounded-full opacity-60 blur-3xl"
        style={{ background: palette.glowB }}
      />
      <div
        className={cn(
          "absolute rounded-full shadow-[inset_-22px_-28px_60px_rgba(0,0,0,0.55),inset_10px_12px_28px_rgba(255,255,255,0.16)]",
          layout.orb,
        )}
        style={{ background: palette.orb }}
      />
      <div
        className={cn("absolute rounded-full border", layout.ring)}
        style={{ borderColor: palette.rim, transform: `rotate(${layout.tilt})` }}
      />
      <div
        className="absolute left-[12%] top-[8%] h-[24%] w-[70%] -rotate-[24deg] rounded-full opacity-25 blur-2xl"
        style={{ background: "linear-gradient(90deg, transparent, #ffffff, transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 120%, ${palette.veil}, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/[0.03]" />
      {overlay ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />
      ) : null}
      {children}
    </div>
  );
}
