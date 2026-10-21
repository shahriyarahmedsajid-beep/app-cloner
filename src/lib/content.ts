export type GalleryItem = {
  id: string;
  title: string;
  prompt: string;
  tag: string;
  ratio: string;
  variant: number;
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Glass koi",
    prompt: "A glass koi fish swimming through clouds at golden hour, shot on 35mm",
    tag: "Motion 3",
    ratio: "4:5",
    variant: 0,
  },
  {
    id: "g2",
    title: "Chrome sneaker",
    prompt: "A chrome sneaker floating above a desert, product film, slow orbit",
    tag: "Canvas 2",
    ratio: "1:1",
    variant: 3,
  },
  {
    id: "g3",
    title: "Night market",
    prompt: "A rain-soaked night market in Osaka, neon signs, anamorphic flare",
    tag: "Cinema",
    ratio: "16:9",
    variant: 1,
  },
  {
    id: "g4",
    title: "Soft machinery",
    prompt: "Bouclé armchair shaped like a cloud, gallery lighting, warm minimalism",
    tag: "Canvas 2",
    ratio: "4:5",
    variant: 2,
  },
  {
    id: "g5",
    title: "After hours",
    prompt: "A lone figure crossing a brutalist plaza at 4am, sodium lights, film grain",
    tag: "Motion 3",
    ratio: "9:16",
    variant: 6,
  },
  {
    id: "g6",
    title: "Citrus study",
    prompt: "Liquid lime typography spelling ZUPONA, glossy, studio lighting",
    tag: "Vector",
    ratio: "1:1",
    variant: 7,
  },
  {
    id: "g7",
    title: "Low tide",
    prompt: "A quiet coastal hotel at dusk, linen curtains, long exposure sea",
    tag: "Canvas 2",
    ratio: "16:9",
    variant: 4,
  },
  {
    id: "g8",
    title: "Iris protocol",
    prompt: "An iridescent portal opening in a concrete gallery, mist, cinematic",
    tag: "Cinema",
    ratio: "4:5",
    variant: 5,
  },
];

export type Feature = {
  number: string;
  title: string;
  description: string;
  span?: "wide" | "tall";
  kicker: string;
};

export const features: Feature[] = [
  {
    number: "01",
    title: "One brief. The right model, every time.",
    description:
      "Zupona reads intent and routes each shot to the model that does it best. Stop comparing tabs and start comparing takes.",
    span: "wide",
    kicker: "Smart routing",
  },
  {
    number: "02",
    title: "Characters that survive the edit.",
    description:
      "Faces, products and wardrobes stay locked across shots, ratios and models. Continuity is the default, not a lucky accident.",
    kicker: "Memory",
  },
  {
    number: "03",
    title: "A director's chair, not a slot machine.",
    description:
      "Camera moves, lens, light and pacing are real controls. Every render tells you what it costs before you commit.",
    kicker: "Control",
  },
  {
    number: "04",
    title: "A storefront of runnable workflows.",
    description:
      "Launch UGC ads, manga pages, try-on sets and more. Every app is an inspectable workflow you can remix, not a black box.",
    span: "wide",
    kicker: "Storefront",
  },
  {
    number: "05",
    title: "Your brand, already loaded.",
    description:
      "Palettes, type, tone and guardrails travel with every prompt. Teams ship work that looks like them on the first try.",
    kicker: "Brand kit",
  },
  {
    number: "06",
    title: "Rights you can actually read.",
    description:
      "Commercial use on every paid plan. No hidden training on your uploads. Clear credit costs and no watermarks.",
    kicker: "Trust",
  },
];

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  monthly: number | null;
  annual: number | null;
  credits: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "Try the full storefront before you spend a cent.",
    monthly: 0,
    annual: 0,
    credits: "60 credits / month",
    cta: "Start free",
    features: [
      "Full storefront access",
      "720p exports",
      "1 brand kit",
      "Personal use license",
      "Community support",
    ],
  },
  {
    id: "creator",
    name: "Creator",
    blurb: "For people who publish every week.",
    monthly: 19,
    annual: 15,
    credits: "1,200 credits / month",
    cta: "Choose Creator",
    featured: true,
    features: [
      "Everything in Free",
      "1080p video + 2K stills",
      "No watermark",
      "Commercial license",
      "All models and apps",
      "Priority render queue",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    blurb: "For teams with a calendar to fill.",
    monthly: 49,
    annual: 39,
    credits: "4,000 pooled credits / month",
    cta: "Choose Studio",
    features: [
      "Everything in Creator",
      "3 seats included",
      "4K video and upscales",
      "Shared brand kits + review links",
      "1,000 API calls / month",
      "Priority support",
    ],
  },
];

export const comparisonRows: {
  label: string;
  free: string;
  creator: string;
  studio: string;
}[] = [
  { label: "Monthly credits", free: "60", creator: "1,200", studio: "4,000 pooled" },
  { label: "Max video resolution", free: "720p", creator: "1080p", studio: "4K" },
  { label: "Max still resolution", free: "1K", creator: "2K", studio: "4K" },
  { label: "Watermark", free: "On exports", creator: "None", studio: "None" },
  { label: "Commercial license", free: "No", creator: "Yes", studio: "Yes" },
  { label: "Seats", free: "1", creator: "1", studio: "3 included" },
  { label: "Brand kits", free: "1", creator: "3", studio: "Unlimited" },
  { label: "API calls", free: "—", creator: "—", studio: "1,000 / mo" },
  { label: "Render queue", free: "Standard", creator: "Priority", studio: "Highest" },
];

export const faqs = [
  {
    q: "Is Zupona a model or a studio?",
    a: "Both. Zupona is a storefront of runnable creative apps on top of a studio that routes work to the best available image and video models. You can use the curated apps or open a blank canvas and go manual.",
  },
  {
    q: "How do credits work?",
    a: "Every render shows its credit cost before you start. Image runs are typically 4–12 credits. Video runs are 8–60 credits depending on model, length and resolution. Unused credits roll over for 60 days on paid plans.",
  },
  {
    q: "Which models power the studio?",
    a: "In production, Zupona routes across leading third-party models such as Kling, Veo, Seedance, FLUX, Nano Banana and GPT Image, plus Zupona models for consistency and vector work. The demo in this repo is simulated locally and calls no external AI service.",
  },
  {
    q: "Can I use the output commercially?",
    a: "Yes on every paid plan, subject to the upstream model provider's terms. Free exports are for personal use and include a watermark. You are responsible for having rights to any reference images you upload.",
  },
  {
    q: "Do you train on my uploads?",
    a: "No. Your uploads and generations are never used to train foundation models. Brand kits stay inside your workspace, and you can delete assets at any time.",
  },
  {
    q: "Is this a real product I can buy?",
    a: "This repository is a concept build and product prototype. Billing, authentication and model calls are simulated. The included PRD and research docs describe what a production version would require.",
  },
  {
    q: "Can creators publish their own apps?",
    a: "That is the long-term plan. Verified creators will be able to publish workflows to the storefront, set their own remix terms and earn a revenue share. The first cohort opens in the Studio plan.",
  },
];

export type Persona = {
  title: string;
  audience: string;
  outcome: string;
  proof: string;
};

export const personas: Persona[] = [
  {
    title: "Ship a week of content in an afternoon.",
    audience: "Solo creators",
    outcome:
      "One brief becomes scripts, shots, edits and captions. No more stitching four subscriptions and three download folders together.",
    proof: "~6h saved per content batch",
  },
  {
    title: "Make the whole team dangerous.",
    audience: "Lean marketing teams",
    outcome:
      "Brand kits and review links keep output on-brand without a designer in every loop. Transparent credits keep finance calm.",
    proof: "1 workspace, 0 brand docs",
  },
  {
    title: "Take bigger swings, faster.",
    audience: "Studios & agencies",
    outcome:
      "Pitch three visual territories before lunch. Lock what works, then push finals through premium models and 4K finishing.",
    proof: "3× more concepts per brief",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Storefront", href: "/store" },
      { label: "Studio", href: "/studio" },
      { label: "Library", href: "/library" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Research", href: "/research" },
      { label: "Product brief", href: "/research#prd" },
      { label: "Manifesto", href: "/#manifesto" },
      { label: "Contact", href: "mailto:hello@zupona.ai" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Creator program", href: "/store#creators" },
      { label: "Brand kit", href: "/brand" },
      { label: "Model roster", href: "/#models" },
      { label: "Status", href: "/research#roadmap" },
      { label: "Changelog", href: "/research#roadmap" },
    ],
  },
];
