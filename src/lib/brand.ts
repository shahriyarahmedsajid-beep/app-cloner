export type FontPairId =
  | "grotesk-inter"
  | "inter-inter"
  | "grotesk-grotesk"
  | "serif-inter"
  | "mono-inter";

export type BrandKit = {
  name: string;
  tagline: string;
  palette: [string, string, string, string];
  fontPair: FontPairId;
  tone: string;
  guardrails: string;
  lockConsistency: boolean;
  updatedAt: number;
};

export type FontPair = {
  id: FontPairId;
  label: string;
  display: string;
  body: string;
};

export const BRAND_KEY = "zupona:brand";

export const fontPairs: FontPair[] = [
  {
    id: "grotesk-inter",
    label: "Space Grotesk + Inter",
    display: '"Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "inter-inter",
    label: "Inter + Inter",
    display: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "grotesk-grotesk",
    label: "Space Grotesk + Space Grotesk",
    display: '"Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif',
    body: '"Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "serif-inter",
    label: "Editorial serif + Inter",
    display: 'Georgia, "Times New Roman", serif',
    body: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "mono-inter",
    label: "Monospace + Inter",
    display: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
    body: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  },
];

export const tonePresets = [
  "Precise, quiet, confident. Short sentences. No hype.",
  "Warm, playful, direct. Speak like a smart friend.",
  "Bold, high-contrast, editorial. Make a statement.",
  "Technical, calm, factual. Show the evidence.",
];

export const defaultBrandKit: BrandKit = {
  name: "Zupona Studio",
  tagline: "Your imagination, with a ship date.",
  palette: ["#D9FF43", "#C4B5FD", "#FFB38A", "#F5F3EC"],
  fontPair: "grotesk-inter",
  tone: "Precise, quiet, confident. Short sentences. No hype.",
  guardrails:
    "No neon gradients. No competitor logos. Keep faces and products consistent across every shot.",
  lockConsistency: true,
  updatedAt: 0,
};

export function getFontPair(id: FontPairId) {
  return fontPairs.find((pair) => pair.id === id) ?? fontPairs[0];
}

export function isHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value);
}

export function brandPrompt(kit: BrandKit) {
  const lines = [
    `Create a launch visual for ${kit.name || "the brand"}.`,
    kit.tagline ? `Brand line: ${kit.tagline}` : "",
    `Use the palette ${kit.palette.join(", ")} with ${getFontPair(kit.fontPair).label.toLowerCase()} typography.`,
    kit.tone ? `Tone: ${kit.tone}` : "",
    kit.guardrails ? `Avoid: ${kit.guardrails}` : "",
    kit.lockConsistency
      ? "Keep characters, products and visual language consistent across every frame."
      : "",
  ];
  return lines.filter(Boolean).join(" ");
}

export function loadBrandKit(): BrandKit | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(BRAND_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<BrandKit>;
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.palette) || parsed.palette.length !== 4) return null;
    if (!parsed.palette.every((color) => typeof color === "string" && isHexColor(color))) {
      return null;
    }
    return {
      ...defaultBrandKit,
      ...parsed,
      palette: parsed.palette as [string, string, string, string],
      fontPair: fontPairs.some((pair) => pair.id === parsed.fontPair)
        ? (parsed.fontPair as FontPairId)
        : defaultBrandKit.fontPair,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return null;
  }
}

export function saveBrandKit(kit: BrandKit) {
  const next = { ...kit, updatedAt: Date.now() };
  try {
    window.localStorage.setItem(BRAND_KEY, JSON.stringify(next));
  } catch {
    // Local storage may be unavailable.
  }
  return next;
}
