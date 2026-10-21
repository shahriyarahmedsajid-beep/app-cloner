import { getJob } from "@/lib/jobs";

type Palette = {
  bg: [string, string, string];
  glowA: string;
  glowB: string;
  orb: [string, string, string, string, string];
  ring: string;
};

const palettes: Palette[] = [
  {
    bg: ["#1a0d09", "#0b0807", "#08080a"],
    glowA: "#ff7a45",
    glowB: "#ffcf7a",
    orb: ["#fff4dc", "#ffb078", "#ff6a3d", "#6d1f2f", "#1a0b12"],
    ring: "#ffc496",
  },
  {
    bg: ["#0d0b17", "#09080e", "#08080a"],
    glowA: "#7c5cff",
    glowB: "#5ad1ff",
    orb: ["#f4eaff", "#b79bff", "#7051ff", "#241c66", "#0d0a1f"],
    ring: "#b9a6ff",
  },
  {
    bg: ["#0a1310", "#080b0a", "#07080a"],
    glowA: "#d9ff43",
    glowB: "#16c79a",
    orb: ["#fbffe3", "#e5ff8a", "#b7e825", "#225c37", "#07130d"],
    ring: "#dcff82",
  },
  {
    bg: ["#121316", "#0a0b0d", "#08090a"],
    glowA: "#f5f3ec",
    glowB: "#5a6bff",
    orb: ["#ffffff", "#d9dce4", "#8e96a8", "#3a4054", "#0b0d13"],
    ring: "#ecf0ff",
  },
  {
    bg: ["#1b0f0c", "#0d0908", "#09080a"],
    glowA: "#ffb38a",
    glowB: "#ff5a5f",
    orb: ["#fff0de", "#ffc6a2", "#ff8c66", "#7d2b3c", "#1c0c12"],
    ring: "#ffcdb4",
  },
  {
    bg: ["#071319", "#071015", "#07090b"],
    glowA: "#66e0ff",
    glowB: "#2f6bff",
    orb: ["#eefcff", "#a6eeff", "#45b6ff", "#173f96", "#06101f"],
    ring: "#a0e6ff",
  },
  {
    bg: ["#121212", "#0a0a0a", "#070708"],
    glowA: "#f5f3ec",
    glowB: "#ff4d3d",
    orb: ["#ffffff", "#c9c9c6", "#77797c", "#27282c", "#09090b"],
    ring: "#ffffff",
  },
  {
    bg: ["#141703", "#0c0d05", "#08090a"],
    glowA: "#d9ff43",
    glowB: "#9dff00",
    orb: ["#ffffff", "#f2ffb3", "#d9ff43", "#5d7d0a", "#0d1403"],
    ring: "#d9ff43",
  },
];

const sizes: Record<string, [number, number]> = {
  "1:1": [1024, 1024],
  "4:5": [960, 1200],
  "16:9": [1280, 720],
  "9:16": [720, 1280],
};

function hash(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), 1 | result);
    result =
      (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function renderSvg(job: {
  id: string;
  prompt: string;
  aspect: string;
}): string {
  const random = mulberry32(hash(`${job.id}:${job.prompt}`));
  const palette = palettes[Math.floor(random() * palettes.length)];
  const [width, height] = sizes[job.aspect] ?? sizes["1:1"];
  const min = Math.min(width, height);
  const max = Math.max(width, height);

  const orbX = width * (0.32 + random() * 0.36);
  const orbY = height * (0.3 + random() * 0.3);
  const orbRadius = min * (0.24 + random() * 0.1);
  const glowRadius = max * (0.5 + random() * 0.22);
  const blur = min * 0.09;
  const tilt = -34 + random() * 68;
  const grid = 28 + Math.round(random() * 12);

  const glowAX = width * random();
  const glowAY = height * random() * 0.5;
  const glowBX = width * (0.4 + random() * 0.6);
  const glowBY = height * (0.55 + random() * 0.45);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.bg[0]}"/>
      <stop offset="0.55" stop-color="${palette.bg[1]}"/>
      <stop offset="1" stop-color="${palette.bg[2]}"/>
    </linearGradient>
    <radialGradient id="glow-a" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${palette.glowA}" stop-opacity="0.8"/>
      <stop offset="0.6" stop-color="${palette.glowA}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${palette.glowA}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-b" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${palette.glowB}" stop-opacity="0.6"/>
      <stop offset="0.65" stop-color="${palette.glowB}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${palette.glowB}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb" cx="32%" cy="26%" r="80%">
      <stop offset="0" stop-color="${palette.orb[0]}"/>
      <stop offset="0.18" stop-color="${palette.orb[1]}"/>
      <stop offset="0.46" stop-color="${palette.orb[2]}"/>
      <stop offset="0.78" stop-color="${palette.orb[3]}"/>
      <stop offset="1" stop-color="${palette.orb[4]}"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="48%" r="72%">
      <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.6"/>
    </radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.65"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="${blur.toFixed(1)}"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.24"/>
      </feComponentTransfer>
    </filter>
    <pattern id="grid" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">
      <path d="M ${grid} 0 L 0 0 0 ${grid}" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <circle cx="${glowAX.toFixed(0)}" cy="${glowAY.toFixed(0)}" r="${glowRadius.toFixed(0)}" fill="url(#glow-a)" filter="url(#soft)" opacity="0.85"/>
  <circle cx="${glowBX.toFixed(0)}" cy="${glowBY.toFixed(0)}" r="${(glowRadius * 0.8).toFixed(0)}" fill="url(#glow-b)" filter="url(#soft)" opacity="0.8"/>

  <g transform="rotate(${tilt.toFixed(1)} ${orbX.toFixed(0)} ${orbY.toFixed(0)})">
    <ellipse cx="${orbX.toFixed(0)}" cy="${orbY.toFixed(0)}" rx="${(orbRadius * 1.55).toFixed(0)}" ry="${(orbRadius * 1.25).toFixed(0)}" fill="none" stroke="${palette.ring}" stroke-opacity="0.34" stroke-width="1.4"/>
    <ellipse cx="${orbX.toFixed(0)}" cy="${orbY.toFixed(0)}" rx="${(orbRadius * 1.9).toFixed(0)}" ry="${(orbRadius * 1.55).toFixed(0)}" fill="none" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1"/>
  </g>

  <circle cx="${orbX.toFixed(0)}" cy="${orbY.toFixed(0)}" r="${orbRadius.toFixed(0)}" fill="url(#orb)"/>
  <ellipse cx="${(orbX - orbRadius * 0.22).toFixed(0)}" cy="${(orbY - orbRadius * 0.34).toFixed(0)}" rx="${(orbRadius * 0.38).toFixed(0)}" ry="${(orbRadius * 0.22).toFixed(0)}" fill="#ffffff" opacity="0.2" filter="url(#soft)"/>

  <path d="M ${(width * 0.06).toFixed(0)} ${(height * 0.78).toFixed(0)} L ${(width * 0.94).toFixed(0)} ${(height * 0.2).toFixed(0)}" stroke="url(#streak)" stroke-width="${(orbRadius * 0.45).toFixed(0)}" opacity="0.14" filter="url(#soft)"/>

  <circle cx="${(width * (0.1 + random() * 0.8)).toFixed(0)}" cy="${(height * (0.1 + random() * 0.8)).toFixed(0)}" r="${(min * 0.05).toFixed(0)}" fill="none" stroke="${palette.ring}" stroke-opacity="0.22" stroke-width="1"/>

  <rect width="${width}" height="${height}" fill="url(#vignette)"/>
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.5"/>
</svg>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const job = getJob(id);

  if (!job) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(renderSvg(job), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
