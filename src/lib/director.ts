import {
  costFor,
  generationModels,
  getModel,
  type AspectId,
  type GenerationMode,
} from "@/lib/models";

export type CampaignObjective = "launch" | "ugc" | "drop" | "series";

export type ContinuityLockId = "product" | "character" | "brand" | "world";

export type DirectorBrief = {
  brief: string;
  objective: CampaignObjective;
  budget: number;
  aspect: AspectId;
  locks: ContinuityLockId[];
};

export type DirectorShot = {
  id: string;
  beat: string;
  title: string;
  direction: string;
  prompt: string;
  modelId: string;
  modelName: string;
  mode: GenerationMode;
  aspect: AspectId;
  duration: 5 | 10;
  credits: number;
  resolution: string;
  latency: string;
  routeSource: string;
  rationale: string;
  alternate: string;
  risk: "low" | "medium" | "high";
  lockNotes: string[];
  adjusted?: boolean;
};

export type DirectorPlan = {
  id: string;
  title: string;
  objective: CampaignObjective;
  objectiveLabel: string;
  brief: string;
  aspect: AspectId;
  budget: number;
  shots: DirectorShot[];
  totalCredits: number;
  headroom: number;
  continuity: number;
  runtimeSeconds: number;
  contract: string[];
  routeSummary: string;
  adjusted: boolean;
};

type BeatTemplate = {
  beat: string;
  title: string;
  direction: string;
  modelId: string;
  duration: 5 | 10;
  rationale: string;
  alternate: string;
  risk: "low" | "medium" | "high";
  focus: ContinuityLockId;
};

type ObjectiveTemplate = {
  id: CampaignObjective;
  label: string;
  kicker: string;
  description: string;
  title: string;
  aspect: AspectId;
  beats: BeatTemplate[];
};

export const campaignObjectives: ObjectiveTemplate[] = [
  {
    id: "launch",
    label: "Launch film",
    kicker: "From object to desire",
    description: "A five-beat product story with a hook, hero, human proof and a close.",
    title: "The Quiet Launch",
    aspect: "4:5",
    beats: [
      {
        beat: "Hook",
        title: "Cold open",
        direction:
          "Open on a tactile detail in natural window light. No logo in the first beat; make the material do the work.",
        modelId: "zupona-motion-fast",
        duration: 5,
        rationale: "A cheap, fast draft tests the opening beat before premium motion spend.",
        alternate: "Zupona Motion 3 for a more filmic opener.",
        risk: "low",
        focus: "product",
      },
      {
        beat: "Hero",
        title: "The object",
        direction:
          "Place the product in a lived-in environment with room for type on the left. One clear hero angle, no clutter.",
        modelId: "zupona-canvas-2",
        duration: 5,
        rationale: "Canvas 2 holds product edges and label type better than a motion route.",
        alternate: "Zupona Portrait when the product is worn or held.",
        risk: "medium",
        focus: "product",
      },
      {
        beat: "Proof",
        title: "In use",
        direction:
          "A real person uses the product in the same light and location. One small, unposed gesture; no staged smile.",
        modelId: "zupona-motion-3",
        duration: 5,
        rationale: "Motion 3 keeps the human beat natural without losing the product silhouette.",
        alternate: "Zupona Motion Fast for a cheaper draft of the action.",
        risk: "high",
        focus: "character",
      },
      {
        beat: "Detail",
        title: "The detail",
        direction:
          "Macro study of material, seam and surface. The object must still read as the same product from the hero frame.",
        modelId: "zupona-portrait",
        duration: 5,
        rationale: "Portrait is strongest on material fidelity and close-up identity.",
        alternate: "Zupona Canvas 2 if the detail is a flat graphic.",
        risk: "medium",
        focus: "product",
      },
      {
        beat: "Close",
        title: "The return",
        direction:
          "Return to the wide scene with the product in place and a single line of campaign copy. Hold the final frame.",
        modelId: "zupona-cinema",
        duration: 5,
        rationale: "The closing frame earns the premium route: it is the one people remember.",
        alternate: "Zupona Motion 3 to save credits without changing the composition.",
        risk: "low",
        focus: "world",
      },
    ],
  },
  {
    id: "ugc",
    label: "UGC ad set",
    kicker: "Native, not polished",
    description: "A creator-led five-beat ad: hook, demo, reaction, proof and call to action.",
    title: "Proof in Motion",
    aspect: "9:16",
    beats: [
      {
        beat: "Hook",
        title: "The hook",
        direction:
          "A creator speaks directly to camera about the problem this product solves. Handheld, imperfect, immediate.",
        modelId: "zupona-motion-fast",
        duration: 5,
        rationale: "The hook needs speed and volume, not a premium finish.",
        alternate: "Zupona Motion 3 if the first read is too flat.",
        risk: "medium",
        focus: "character",
      },
      {
        beat: "Demo",
        title: "The demo",
        direction:
          "The creator uses the product in a real room. Show one concrete benefit, not a feature list.",
        modelId: "zupona-motion-fast",
        duration: 5,
        rationale: "A fast route keeps the demo loose and native-feeling.",
        alternate: "Zupona Motion 3 for a cleaner product interaction.",
        risk: "medium",
        focus: "product",
      },
      {
        beat: "Reaction",
        title: "The reaction",
        direction:
          "A close, unposed reaction after the first use. Keep the same face, wardrobe and light direction.",
        modelId: "zupona-portrait",
        duration: 5,
        rationale: "Portrait preserves the creator's identity across the cut.",
        alternate: "Zupona Canvas 2 for a still reaction insert.",
        risk: "high",
        focus: "character",
      },
      {
        beat: "Proof",
        title: "The proof",
        direction:
          "Cut to the product in the same environment, matching light and palette. Show the claim, not a slogan.",
        modelId: "zupona-canvas-2",
        duration: 5,
        rationale: "A still product cut keeps the ad legible and inexpensive.",
        alternate: "Zupona Portrait for a hand-held proof shot.",
        risk: "low",
        focus: "product",
      },
      {
        beat: "CTA",
        title: "The ask",
        direction:
          "The creator holds the product and delivers the call to action. Leave clean space for captions and a button.",
        modelId: "zupona-motion-3",
        duration: 5,
        rationale: "The CTA needs natural motion and a stable face before export.",
        alternate: "Zupona Motion Fast for a hook-only test.",
        risk: "low",
        focus: "character",
      },
    ],
  },
  {
    id: "drop",
    label: "Product drop",
    kicker: "Tension, then reveal",
    description: "A tight four-beat drop: tease, reveal, texture and a loopable motion poster.",
    title: "Drop Day",
    aspect: "4:5",
    beats: [
      {
        beat: "Tease",
        title: "The shadow",
        direction:
          "A dark, tactile close-up before the reveal. Show shape and material, not the full product.",
        modelId: "zupona-canvas-2",
        duration: 5,
        rationale: "A still tease is cheap to iterate and easy to art-direct.",
        alternate: "Zupona Portrait for a human hand in frame.",
        risk: "low",
        focus: "product",
      },
      {
        beat: "Reveal",
        title: "The reveal",
        direction:
          "Full product reveal against the campaign environment. Simple composition, ownable color, no props for the sake of props.",
        modelId: "zupona-canvas-2",
        duration: 5,
        rationale: "Canvas 2 keeps packaging copy and edges clean at 2K.",
        alternate: "Zupona Cinema for a moving reveal.",
        risk: "medium",
        focus: "brand",
      },
      {
        beat: "Texture",
        title: "Material study",
        direction:
          "Macro material study: water, light or fabric interacting with the product. Keep the color system intact.",
        modelId: "zupona-portrait",
        duration: 5,
        rationale: "Portrait is the best route for tactile detail and surface realism.",
        alternate: "Zupona Canvas 2 for a graphic texture panel.",
        risk: "medium",
        focus: "product",
      },
      {
        beat: "Loop",
        title: "The loop",
        direction:
          "A seamless product loop for a motion poster. Slow camera move, no cuts, final frame matches the first.",
        modelId: "zupona-motion-3",
        duration: 5,
        rationale: "Motion 3 handles a controlled loop without a premium cinema spend.",
        alternate: "Zupona Cinema for a longer hero loop.",
        risk: "low",
        focus: "world",
      },
    ],
  },
  {
    id: "series",
    label: "Character series",
    kicker: "A world that repeats",
    description: "A five-beat episodic opener with a recurring lead, world rules and a cliffhanger.",
    title: "Open Loop",
    aspect: "16:9",
    beats: [
      {
        beat: "World",
        title: "The world",
        direction:
          "A wide establishing frame that sets the world and its rules. One strong light source, one clear horizon.",
        modelId: "zupona-cinema",
        duration: 10,
        rationale: "The establishing beat carries the most atmosphere; premium route is justified.",
        alternate: "Zupona Motion 3 for a shorter teaser.",
        risk: "medium",
        focus: "world",
      },
      {
        beat: "Lead",
        title: "The lead",
        direction:
          "Introduce the recurring lead in wardrobe that will survive every shot. Neutral expression, direct eyeline.",
        modelId: "zupona-portrait",
        duration: 5,
        rationale: "Portrait locks the face before any motion is generated.",
        alternate: "Zupona Canvas 2 for a wide character frame.",
        risk: "high",
        focus: "character",
      },
      {
        beat: "Turn",
        title: "The turn",
        direction:
          "The lead interacts with the story object or idea. Clear action, simple camera, one readable emotion.",
        modelId: "zupona-motion-3",
        duration: 5,
        rationale: "Motion 3 balances performance and continuity for the action beat.",
        alternate: "Zupona Motion Fast for a board draft.",
        risk: "high",
        focus: "character",
      },
      {
        beat: "Close-up",
        title: "The close-up",
        direction:
          "An emotional close-up that keeps the same face, wardrobe and light direction as the previous beats.",
        modelId: "zupona-portrait",
        duration: 5,
        rationale: "A second Portrait frame reinforces identity across the sequence.",
        alternate: "Zupona Canvas 2 for a stylized insert.",
        risk: "medium",
        focus: "character",
      },
      {
        beat: "Cliffhanger",
        title: "The threshold",
        direction:
          "End on a question, object or threshold that leads to the next episode. Hold the frame longer than feels comfortable.",
        modelId: "zupona-motion-fast",
        duration: 5,
        rationale: "A fast, simple final beat leaves budget for the next episode.",
        alternate: "Zupona Motion 3 for a more cinematic hold.",
        risk: "low",
        focus: "world",
      },
    ],
  },
];

export const continuityLocks: {
  id: ContinuityLockId;
  label: string;
  short: string;
  detail: string;
  prompt: string;
  icon: "product" | "character" | "brand" | "world";
}[] = [
  {
    id: "product",
    label: "Product truth",
    short: "Product",
    detail: "Shape, material, label and logo stay identical.",
    prompt:
      "Continuity lock: keep the product silhouette, material, label and logo exactly consistent with the reference.",
    icon: "product",
  },
  {
    id: "character",
    label: "Cast identity",
    short: "Cast",
    detail: "Same face, wardrobe and expression range.",
    prompt:
      "Continuity lock: keep the same cast member, face, age, wardrobe and expression range across every frame.",
    icon: "character",
  },
  {
    id: "brand",
    label: "Brand system",
    short: "Brand",
    detail: "Palette, typography and tone applied to prompts.",
    prompt:
      "Continuity lock: apply the workspace brand palette, typography and tone. No off-brand colors or decorative gradients.",
    icon: "brand",
  },
  {
    id: "world",
    label: "World grammar",
    short: "World",
    detail: "Location, light direction and lens language.",
    prompt:
      "Continuity lock: preserve the location grammar, light direction, lens language and production design across shots.",
    icon: "world",
  },
];

export const directorBudgets = [60, 120, 240] as const;

export const DEFAULT_DIRECTOR_BRIEF: DirectorBrief = {
  brief:
    "Launch a refillable ceramic coffee cup for design-conscious remote workers. Warm, tactile, quiet confidence. Avoid coffee-shop clichés.",
  objective: "launch",
  budget: 120,
  aspect: "4:5",
  locks: ["product", "brand", "character"],
};

const downgradeMap: Record<string, string> = {
  "zupona-cinema": "zupona-motion-3",
  "zupona-motion-3": "zupona-motion-fast",
  "zupona-portrait": "zupona-canvas-2",
};

function hashString(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function planId(input: DirectorBrief) {
  const signature = [
    input.brief.trim().toLowerCase(),
    input.objective,
    input.budget,
    input.aspect,
    [...input.locks].sort().join(","),
  ].join("|");
  return `ZP-${hashString(signature).toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}

function sanitizeBrief(brief: string) {
  return brief.replace(/\s+/g, " ").trim();
}

function buildPrompt(
  brief: string,
  direction: string,
  activeLocks: ContinuityLockId[],
) {
  const lockPrompts = continuityLocks
    .filter((lock) => activeLocks.includes(lock.id))
    .map((lock) => lock.prompt);

  return [brief, direction, ...lockPrompts].join(" ").slice(0, 1200);
}

function fallbackModel() {
  return generationModels[0];
}

export function compileCampaign(input: DirectorBrief): DirectorPlan {
  const brief = sanitizeBrief(input.brief) || DEFAULT_DIRECTOR_BRIEF.brief;
  const objective =
    campaignObjectives.find((item) => item.id === input.objective) ??
    campaignObjectives[0];
  const activeLocks = input.locks.filter((lock) =>
    continuityLocks.some((item) => item.id === lock),
  );

  const shots: DirectorShot[] = objective.beats.map((beat, index) => {
    const model = getModel(beat.modelId) ?? fallbackModel();
    const lock = continuityLocks.find((item) => item.id === beat.focus);
    const focusedLockActive = activeLocks.includes(beat.focus);
    const prompt = buildPrompt(brief, beat.direction, activeLocks);

    return {
      id: `${objective.id}-${index + 1}`,
      beat: beat.beat,
      title: beat.title,
      direction: beat.direction,
      prompt,
      modelId: model.id,
      modelName: model.name,
      mode: model.mode,
      aspect: input.aspect,
      duration: beat.duration,
      credits: costFor(model, model.mode === "image" ? 5 : beat.duration),
      resolution: model.resolution,
      latency: model.latency,
      routeSource: model.poweredBy,
      rationale: beat.rationale,
      alternate: beat.alternate,
      risk: focusedLockActive ? (beat.risk === "high" ? "medium" : "low") : "high",
      lockNotes: lock && focusedLockActive ? [lock.detail] : [],
    };
  });

  let adjusted = false;

  for (let index = shots.length - 1; index >= 0; index -= 1) {
    let total = shots.reduce((sum, shot) => sum + shot.credits, 0);
    while (total > input.budget) {
      const shot = shots[index];
      const cheaperId = downgradeMap[shot.modelId];
      if (!cheaperId) break;

      const cheaper = getModel(cheaperId);
      if (!cheaper) break;

      const previousName = shot.modelName;
      shot.modelId = cheaper.id;
      shot.modelName = cheaper.name;
      shot.mode = cheaper.mode;
      shot.credits = costFor(cheaper, cheaper.mode === "image" ? 5 : shot.duration);
      shot.resolution = cheaper.resolution;
      shot.latency = cheaper.latency;
      shot.routeSource = cheaper.poweredBy;
      shot.rationale = `Budget fit: ${previousName} → ${cheaper.name} keeps the campaign under ${input.budget} credits. ${shot.rationale}`;
      shot.adjusted = true;
      adjusted = true;
      total = shots.reduce((sum, item) => sum + item.credits, 0);
    }
  }

  const totalCredits = shots.reduce((sum, shot) => sum + shot.credits, 0);
  const activeShotCount = shots.length;
  const continuity = Math.min(
    97,
    Math.max(58, 68 + activeLocks.length * 6 + (input.objective === "drop" ? 4 : 0)),
  );
  const runtimeSeconds = shots.reduce(
    (sum, shot) => sum + (shot.mode === "video" ? shot.duration : 0),
    0,
  );
  const routeCount = new Set(shots.map((shot) => shot.modelName)).size;

  return {
    id: planId(input),
    title: objective.title,
    objective: objective.id,
    objectiveLabel: objective.label,
    brief,
    aspect: input.aspect,
    budget: input.budget,
    shots,
    totalCredits,
    headroom: Math.max(0, input.budget - totalCredits),
    continuity,
    runtimeSeconds,
    contract: [
      `${activeShotCount} storyboard beats`,
      `${input.aspect} master`,
      `Budget cap ${input.budget} credits`,
      "No auto-overage",
      "Costs held for this plan",
    ],
    routeSummary: `${routeCount} routes · ${totalCredits} credits reserved · ${Math.max(0, input.budget - totalCredits)} headroom`,
    adjusted,
  };
}

export function getContinuityLock(id: ContinuityLockId) {
  return continuityLocks.find((lock) => lock.id === id);
}
