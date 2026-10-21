export type AppCategory = "Video" | "Image" | "Social" | "Commerce" | "Brand";

export type StoreApp = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  credits: number;
  runtime: string;
  model: string;
  accent: number;
  featured?: boolean;
  badge?: string;
  outputs: string[];
  inputs: string[];
  prompt: string;
  samplePrompts: string[];
  steps: { title: string; detail: string }[];
  tags: string[];
};

export const categories: AppCategory[] = [
  "Video",
  "Image",
  "Social",
  "Commerce",
  "Brand",
];

export const storeApps: StoreApp[] = [
  {
    slug: "ugc-ad-lab",
    name: "UGC Ad Lab",
    tagline: "One product. Nine scroll-stopping ad variants.",
    description:
      "Drop in a product, a hook and an audience. UGC Ad Lab writes the script, casts a consistent creator, shoots the b-roll and cuts nine native-feeling variants ready for paid social.",
    category: "Social",
    credits: 24,
    runtime: "~90 seconds",
    model: "Motion 3",
    accent: 0,
    featured: true,
    badge: "Best seller",
    outputs: ["9:16 video", "Hooked captions", "Hook variants", "Thumbnail"],
    inputs: ["Product photos", "Landing page URL", "Audience notes"],
    prompt:
      "A 28-year-old ceramicist demonstrates a matte clay mug in a sunlit studio, handheld camera, natural speech, warm neutrals",
    samplePrompts: [
      "Skincare founder reacts to a before/after in her bathroom mirror, morning light, honest tone",
      "A cyclist unboxes a lightweight helmet on a city sidewalk, quick cuts, energetic",
      "A dad tests a leak-proof lunchbox while packing school snacks, kitchen counter, playful",
    ],
    steps: [
      {
        title: "Add the product",
        detail: "Upload photos or paste a URL. We pull the key claims and brand tone.",
      },
      {
        title: "Pick a creator",
        detail: "Choose from 40+ consistent UGC personas or bring your own face.",
      },
      {
        title: "Get nine edits",
        detail: "Every variant gets a different hook, pacing and caption angle.",
      },
    ],
    tags: ["UGC", "Paid social", "TikTok", "Reels"],
  },
  {
    slug: "product-studio",
    name: "Product Studio",
    tagline: "A full photo studio for the price of a coffee.",
    description:
      "Turn a phone snapshot into a campaign-ready product shot. Switch backgrounds, relight, add water, glass or human hands without reshooting a thing.",
    category: "Commerce",
    credits: 8,
    runtime: "~25 seconds",
    model: "Canvas 2",
    accent: 3,
    featured: true,
    outputs: ["4K packshot", "Lifestyle scene", "Transparent PNG", "Ad crops"],
    inputs: ["Product photo", "Background reference", "Brand palette"],
    prompt:
      "A frosted glass skincare bottle on wet travertine, harsh Mediterranean sun, hard shadow, editorial product photography",
    samplePrompts: [
      "A ceramic espresso cup on folded linen, steam, warm morning window light",
      "A chrome headphone floating above rippling water, studio gradient backdrop",
      "A perfume bottle half-buried in pale sand, long shadows, campaign still",
    ],
    steps: [
      {
        title: "Upload a photo",
        detail: "Any angle works. The model reconstructs edges and materials.",
      },
      {
        title: "Direct the scene",
        detail: "Describe light, surface and mood, or pick a preset.",
      },
      {
        title: "Export everywhere",
        detail: "Get a packshot, lifestyle cut and social crops in one run.",
      },
    ],
    tags: ["Product", "E-commerce", "Packshot", "Shopify"],
  },
  {
    slug: "character-reel",
    name: "Character Reel",
    tagline: "The same face, wardrobe and vibe in every shot.",
    description:
      "Build a character once, then direct them through a whole story. Use a locked identity across images and video without sticky drift or melted hands.",
    category: "Video",
    credits: 30,
    runtime: "~2 minutes",
    model: "Portrait",
    accent: 1,
    featured: true,
    badge: "New",
    outputs: ["Character sheet", "5-shot sequence", "Continuity notes"],
    inputs: ["3 reference images", "Character brief", "Scene list"],
    prompt:
      "A quiet courier with silver-streaked hair, oversized olive jacket, crossing a rain-soaked night market, cinematic 35mm",
    samplePrompts: [
      "An elderly botanist in a waxed canvas coat, sunlit greenhouse, gentle expression",
      "A teenage street dancer with braids and a varsity jacket, rooftop at dusk",
      "A noir detective with a weathered face and a camel trench, foggy pier",
    ],
    steps: [
      {
        title: "Define the identity",
        detail: "Upload references or generate a character from a written brief.",
      },
      {
        title: "Storyboard the beats",
        detail: "Describe each shot. Wardrobe and face stay locked.",
      },
      {
        title: "Review continuity",
        detail: "A contact sheet highlights any drift before you render.",
      },
    ],
    tags: ["Character", "Consistency", "Story", "Film"],
  },
  {
    slug: "manga-frames",
    name: "Manga Frames",
    tagline: "Panels, pacing and linework that hold together.",
    description:
      "Turn a script into a full manga page. Consistent character designs, correct reading order, speech bubbles and halftone rendered in one pass.",
    category: "Image",
    credits: 10,
    runtime: "~35 seconds",
    model: "Canvas 2",
    accent: 6,
    featured: true,
    outputs: ["Page layout", "Individual panels", "Bubble-ready PNGs"],
    inputs: ["Short script", "Character sheet", "Tone references"],
    prompt:
      "A lone samurai pauses at a torii gate in the rain, high-contrast ink, screentone, dramatic low angle",
    samplePrompts: [
      "Two rival chefs face off across a neon kitchen, exaggerated expressions, speed lines",
      "A girl and her robot walk through a flooded city, quiet wide panel, soft inks",
      "A detective discovers a glowing clue in a dark archive, noir lighting, dense hatching",
    ],
    steps: [
      {
        title: "Write the beat",
        detail: "A paragraph is enough. The agent breaks it into panels.",
      },
      {
        title: "Lock the cast",
        detail: "Upload designs once and reuse them across pages.",
      },
      {
        title: "Letter and export",
        detail: "Bubbles, SFX and print-ready exports are generated with the page.",
      },
    ],
    tags: ["Manga", "Comics", "Storyboard", "Illustration"],
  },
  {
    slug: "podcast-clips",
    name: "Podcast Clips",
    tagline: "Find the moment. Cut the clip. Post it everywhere.",
    description:
      "Upload an episode and get the strongest 30 seconds, reframed for vertical, with animated captions, speaker labels and a title that earns the click.",
    category: "Social",
    credits: 18,
    runtime: "~70 seconds",
    model: "Motion Fast",
    accent: 4,
    outputs: ["9:16 clips", "Burn-in captions", "Hook titles", "Description"],
    inputs: ["Audio or video", "Guest names", "Tone preference"],
    prompt:
      "Warm studio podcast set, two speakers, shallow depth of field, subtle camera push-in on the punchline",
    samplePrompts: [
      "Founder interview, minimal concrete studio, soft window light, intimate",
      "Comedy duo, colorful set, fast zoom on reaction, high energy",
      "Solo host, bookshelf backdrop, warm lamp light, calm authority",
    ],
    steps: [
      {
        title: "Upload the episode",
        detail: "Video, audio or a link. We transcribe and index every beat.",
      },
      {
        title: "Pick the hooks",
        detail: "Review ranked moments with rationale and suggested titles.",
      },
      {
        title: "Publish the set",
        detail: "Export vertical clips, captions and descriptions in one download.",
      },
    ],
    tags: ["Podcast", "Captions", "Shorts", "Repurposing"],
  },
  {
    slug: "virtual-try-on",
    name: "Virtual Try-On",
    tagline: "Every body. Every size. Zero reshoots.",
    description:
      "Put your garment on a diverse set of virtual models and keep fabric, fit and drape believable. Built for lookbooks and e-commerce PDPs.",
    category: "Commerce",
    credits: 12,
    runtime: "~40 seconds",
    model: "Portrait",
    accent: 2,
    outputs: ["Model try-on", "Lookbook set", "PDP crops", "Size notes"],
    inputs: ["Garment flat-lay", "Model direction", "Background"],
    prompt:
      "An olive linen overshirt on a model in a white cyclorama, softbox lighting, natural drape, full-body editorial",
    samplePrompts: [
      "A knit cardigan on a model in a sunlit apartment, lived-in styling, film grain",
      "A tailored blazer on a model against a warm concrete wall, hard afternoon light",
      "Swimwear on a model at a pool edge, bright specular highlights, editorial",
    ],
    steps: [
      {
        title: "Upload the garment",
        detail: "Flat-lay, ghost mannequin or existing product shot.",
      },
      {
        title: "Choose the cast",
        detail: "Select body types, poses and settings that fit the drop.",
      },
      {
        title: "Check the details",
        detail: "Zoom into seams and prints before exporting the set.",
      },
    ],
    tags: ["Fashion", "Try-on", "E-commerce", "Lookbook"],
  },
  {
    slug: "motion-poster",
    name: "Motion Poster",
    tagline: "Make a still image breathe.",
    description:
      "Turn a poster, artwork or product still into a seamless loop with controllable parallax, atmosphere and a cinema-grade color finish.",
    category: "Video",
    credits: 14,
    runtime: "~50 seconds",
    model: "Motion 3",
    accent: 7,
    outputs: ["6s loop", "Poster still", "Square and vertical crops"],
    inputs: ["Still image", "Motion direction", "Loop type"],
    prompt:
      "A brutalist concrete tower at dusk, slow parallax push, drifting fog, tiny windows flickering on, seamless loop",
    samplePrompts: [
      "A vintage racing poster, dust motes, slow camera drift, grain",
      "A floating island illustration, clouds moving, birds crossing frame",
      "A cocktail product shot, condensation, ice shifting, shallow focus",
    ],
    steps: [
      {
        title: "Bring a frame",
        detail: "Upload art or generate a base image in the studio.",
      },
      {
        title: "Set the motion",
        detail: "Choose parallax, atmosphere, light sweeps and loop length.",
      },
      {
        title: "Export the loop",
        detail: "Download a silent MP4 or GIF sized for every placement.",
      },
    ],
    tags: ["Cinemagraph", "Loop", "Poster", "Motion"],
  },
  {
    slug: "logo-forge",
    name: "Logo Forge",
    tagline: "Identity directions in minutes, not weeks.",
    description:
      "Explore distinct identity territories with wordmarks, marks, palettes and mockups. Everything is exportable as clean SVG for your design team to refine.",
    category: "Brand",
    credits: 6,
    runtime: "~20 seconds",
    model: "Vector",
    accent: 5,
    outputs: ["SVG marks", "Wordmarks", "Palette", "Mockups"],
    inputs: ["Brand name", "Category", "Three references"],
    prompt:
      "A geometric wordmark for a climate tech company called VERDANT, sturdy sans, tiny leaf cut, ink black on bone",
    samplePrompts: [
      "A friendly bakery identity called CRUMB, soft serif, warm butter yellow",
      "A fintech mark called NORTH, sharp angles, electric blue on near-black",
      "A record label called LOW TIDE, wavy custom lettering, dusty pink",
    ],
    steps: [
      {
        title: "Brief the brand",
        detail: "Name, category and a few references are enough to start.",
      },
      {
        title: "Explore territories",
        detail: "Get three distinct directions, not twelve variations of one.",
      },
      {
        title: "Export clean files",
        detail: "Download SVG, PNG and a one-page usage sheet.",
      },
    ],
    tags: ["Logo", "Identity", "Branding", "SVG"],
  },
  {
    slug: "interior-swap",
    name: "Interior Swap",
    tagline: "Restyle a room without moving a sofa.",
    description:
      "Keep architecture and camera angle intact while changing materials, furniture and light. Perfect for real estate, hospitality and design concepts.",
    category: "Image",
    credits: 9,
    runtime: "~30 seconds",
    model: "Canvas 2",
    accent: 4,
    featured: true,
    outputs: ["Restyled render", "Before/after", "Material board"],
    inputs: ["Room photo", "Style direction", "Fixed elements"],
    prompt:
      "A sunlit living room with limewashed walls, low travertine table, bouclé chair, warm minimalism, wide angle",
    samplePrompts: [
      "A brutalist loft with a caramel leather sofa and brushed steel kitchen",
      "A coastal bedroom with pale oak, linen and morning haze",
      "A maximalist dining room with oxblood walls, vintage brass and candlelight",
    ],
    steps: [
      {
        title: "Upload the room",
        detail: "One wide shot is enough. Mark what must stay.",
      },
      {
        title: "Choose a direction",
        detail: "Describe the mood or pick from curated design styles.",
      },
      {
        title: "Compare and refine",
        detail: "Generate variations and keep a material board for clients.",
      },
    ],
    tags: ["Interior", "Real estate", "Architecture", "Render"],
  },
  {
    slug: "music-video-builder",
    name: "Music Video Builder",
    tagline: "Beat-synced visuals for the whole track.",
    description:
      "Upload a track, define a visual world and let the agent cut shots to the beat. Consistent characters, lyric moments and a final 4K sequence.",
    category: "Video",
    credits: 40,
    runtime: "~3 minutes",
    model: "Cinema",
    accent: 0,
    outputs: ["Beat-cut sequence", "4K master", "Vertical cut", "Cover art"],
    inputs: ["Audio track", "Artist references", "Visual direction"],
    prompt:
      "A dreamlike desert performance at night, chrome fabric, lens flares, slow dolly, visual album aesthetic",
    samplePrompts: [
      "Neon garage performance, wet floor reflections, handheld energy",
      "Soft-focus forest with bioluminescent flowers, ethereal slow motion",
      "Rooftop at golden hour, 16mm grain, candid performance moments",
    ],
    steps: [
      {
        title: "Upload the track",
        detail: "We map tempo, sections and lyric timestamps automatically.",
      },
      {
        title: "Set the world",
        detail: "Choose locations, looks and the artist's visual references.",
      },
      {
        title: "Cut to the beat",
        detail: "Review the edit, swap shots and export in every ratio.",
      },
    ],
    tags: ["Music", "Beat sync", "Artist", "4K"],
  },
  {
    slug: "faceless-shorts",
    name: "Faceless Shorts",
    tagline: "A week of shorts from one idea.",
    description:
      "Research a niche, write ten scripts, voice them and produce vertical b-roll without ever showing a face. Built for faceless channels and brand accounts.",
    category: "Social",
    credits: 16,
    runtime: "~60 seconds",
    model: "Motion Fast",
    accent: 7,
    outputs: ["10 scripts", "Voiceover", "Assembled shorts", "Posting plan"],
    inputs: ["Niche", "Tone", "Reference accounts"],
    prompt:
      "Moody aerial shots of a storm over the ocean, tiny sailboat, voiceover-driven documentary style, slow zooms",
    samplePrompts: [
      "Cozy slow-living scenes, linen, pour-over coffee, calm narration",
      "Retro tech history, CRT monitors, archival-style b-roll, punchy narration",
      "Space facts, nebula timelapses, clean typography, cinematic sound design",
    ],
    steps: [
      {
        title: "Pick a niche",
        detail: "Describe the channel and we research what is working now.",
      },
      {
        title: "Approve scripts",
        detail: "Ten tight scripts with hooks, payoffs and a clear point of view.",
      },
      {
        title: "Render the week",
        detail: "Voiced, captioned and assembled. Export all ten at once.",
      },
    ],
    tags: ["Faceless", "YouTube", "Automation", "Voice"],
  },
  {
    slug: "brand-kit",
    name: "Brand Kit",
    tagline: "A shared brain for everything you make.",
    description:
      "Upload your logo, palette, type and tone once. Every app, prompt and render in Zupona automatically respects it, across your whole team.",
    category: "Brand",
    credits: 0,
    runtime: "Set up once",
    model: "All models",
    accent: 3,
    badge: "Free",
    outputs: ["Brand tokens", "Prompt guardrails", "Shared assets"],
    inputs: ["Logo", "Colors", "Fonts", "Tone guide"],
    prompt:
      "Apply our brand: ink black, bone, electric lime, neo-grotesk type, dry confident tone, no gradients",
    samplePrompts: [
      "Apply the summer campaign palette to a product launch image",
      "Write a launch caption in our voice, no emojis",
      "Check this render against our brand guidelines",
    ],
    steps: [
      {
        title: "Add the basics",
        detail: "Logo, colors, fonts and a few words about how you sound.",
      },
      {
        title: "Connect the studio",
        detail: "Brand tokens are injected into every prompt automatically.",
      },
      {
        title: "Share with the team",
        detail: "Every seat works from the same source of truth.",
      },
    ],
    tags: ["Brand", "Teams", "Guardrails", "Free"],
  },
];

export function getStoreApp(slug: string) {
  return storeApps.find((app) => app.slug === slug);
}

export const featuredApps = storeApps.filter((app) => app.featured);
