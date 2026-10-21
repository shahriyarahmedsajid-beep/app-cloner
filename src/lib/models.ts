export type GenerationMode = "image" | "video";

export type GenerationModel = {
  id: string;
  name: string;
  shortName: string;
  mode: GenerationMode;
  tagline: string;
  description: string;
  credit5s: number;
  credit10s: number;
  resolution: string;
  latency: string;
  accent: number;
  poweredBy: string;
  featured?: boolean;
};

export const generationModels: GenerationModel[] = [
  {
    id: "zupona-motion-3",
    name: "Zupona Motion 3",
    shortName: "Motion 3",
    mode: "video",
    tagline: "Cinematic motion with native audio.",
    description:
      "Our default video model for ads, character shots and short films. Strong camera control, convincing physics and clean audio.",
    credit5s: 18,
    credit10s: 32,
    resolution: "1080p",
    latency: "~45s",
    accent: 0,
    poweredBy: "Kling 3.0 · Veo 3.1",
    featured: true,
  },
  {
    id: "zupona-motion-fast",
    name: "Zupona Motion Fast",
    shortName: "Motion Fast",
    mode: "video",
    tagline: "Drafts in seconds, not minutes.",
    description:
      "A fast, inexpensive model for testing hooks and camera moves before committing to a final render.",
    credit5s: 8,
    credit10s: 14,
    resolution: "720p",
    latency: "~12s",
    accent: 4,
    poweredBy: "Seedance 2.0 Fast",
  },
  {
    id: "zupona-cinema",
    name: "Zupona Cinema",
    shortName: "Cinema",
    mode: "video",
    tagline: "Filmic scenes up to 30 seconds.",
    description:
      "A premium route for hero films, product reveals and dialogue scenes. Built for 4K finishing and longer takes.",
    credit5s: 34,
    credit10s: 60,
    resolution: "4K",
    latency: "~2m",
    accent: 1,
    poweredBy: "Veo 3.1 · Seedance 2.5",
  },
  {
    id: "zupona-canvas-2",
    name: "Zupona Canvas 2",
    shortName: "Canvas 2",
    mode: "image",
    tagline: "Editorial images that get type right.",
    description:
      "Reliable composition, readable text and clean product renders. The workhorse for campaigns, packaging and web.",
    credit5s: 6,
    credit10s: 6,
    resolution: "2K",
    latency: "~10s",
    accent: 3,
    poweredBy: "GPT Image 2 · Nano Banana Pro",
    featured: true,
  },
  {
    id: "zupona-portrait",
    name: "Zupona Portrait",
    shortName: "Portrait",
    mode: "image",
    tagline: "Keep the same face in every frame.",
    description:
      "Trained on your references to preserve identity, wardrobe and expression across an entire campaign.",
    credit5s: 9,
    credit10s: 9,
    resolution: "2K",
    latency: "~18s",
    accent: 2,
    poweredBy: "FLUX 2 Pro · Zupona ID",
  },
  {
    id: "zupona-vector",
    name: "Zupona Vector",
    shortName: "Vector",
    mode: "image",
    tagline: "Flat graphics, logos and icon sets.",
    description:
      "Editable vector-style output for brand systems, pitch decks and product UI. Clean edges, no AI mush.",
    credit5s: 4,
    credit10s: 4,
    resolution: "Vector",
    latency: "~8s",
    accent: 5,
    poweredBy: "Zupona Vector Engine",
  },
];

export function getModel(id: string) {
  return generationModels.find((model) => model.id === id);
}

export function getModelByShortName(name: string) {
  return generationModels.find(
    (model) => model.shortName === name || model.name === name,
  );
}

export function costFor(model: GenerationModel, duration: number) {
  if (model.mode === "image") return model.credit5s;
  return duration > 5 ? model.credit10s : model.credit5s;
}

export const aspects = [
  { id: "1:1", label: "Square", width: 1, height: 1 },
  { id: "4:5", label: "Portrait", width: 4, height: 5 },
  { id: "16:9", label: "Landscape", width: 16, height: 9 },
  { id: "9:16", label: "Vertical", width: 9, height: 16 },
] as const;

export type AspectId = (typeof aspects)[number]["id"];

export function getAspect(id: string) {
  return aspects.find((aspect) => aspect.id === id) ?? aspects[0];
}

export const STARTING_CREDITS = 120;

export const modelMarquee = [
  "Kling 3.0",
  "Veo 3.1",
  "Seedance 2.5",
  "Nano Banana Pro",
  "FLUX 2",
  "GPT Image 2",
  "Sora 2",
  "Runway",
  "MiniMax H3",
  "Luma Ray 3",
  "Ideogram 4",
  "Suno",
];

export const promptIdeas = [
  "A glass koi fish swimming through clouds at golden hour, shot on 35mm",
  "Editorial portrait of a dancer mid-spin, hard flash, deep red backdrop",
  "A chrome sneaker floating above a desert, product film, slow orbit",
  "Tiny astronaut tending a glowing garden on a coin, macro photography",
  "A brutalist library at dusk, volumetric light, anamorphic lens flare",
  "Liquid lime typography spelling ZUPONA, glossy, studio lighting",
  "A rainy Tokyo alley with a single red umbrella, cinematic still",
  "A paper-cut mountain range, layered pastel colors, soft studio light",
];
