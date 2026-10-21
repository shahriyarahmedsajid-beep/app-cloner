# Zupona AI

A creative storefront and studio concept for people who ship. Discover a workflow, run it with the best available model, and keep a consistent look across every asset.

Built as a complete, working frontend prototype with a simulated AI backend. No external model APIs, accounts, or payments are required.

## What is inside

- Marketing homepage with product narrative, model roster, gallery, workflow proof, pricing, testimonials, FAQ and newsletter capture.
- Storefront with 12 curated creative apps, search, category filters, sorting and detailed app pages.
- Studio for image and video generation with presets, aspect ratios, duration, model routing, visible credit costs, staged progress and result actions.
- Mock generation API that validates requests, simulates progress and returns deterministic SVG artwork.
- Local library with remix, download, delete and credit reset.
- Brand kit editor for palette, typography, tone and guardrails, with a generated directive that travels into the studio.
- Pricing page with plan comparison, credit cost table and FAQ.
- Research page summarising the competitive landscape, PRD, unit economics, creator economics and roadmap.
- Plain-language legal, privacy and credit rules for the prototype.
- Demo sign-in flow.

## Routes

| Route | Description |
| --- | --- |
| `/` | Marketing homepage |
| `/store` | App storefront with search and filters |
| `/store/[slug]` | App detail and one-click studio handoff |
| `/studio` | Image and video studio |
| `/library` | Locally saved generations |
| `/brand` | Brand kit editor and prompt directive |
| `/pricing` | Plans, credits and comparison |
| `/research` | Research, PRD summary and roadmap |
| `/legal` | Prototype terms, privacy and credits |
| `/login` | Demo authentication |
| `/api/generate` | Mock generation request |
| `/api/jobs/[id]` | Mock job status polling |
| `/api/render/[id]` | Deterministic SVG renderer |

The studio also accepts `?app=`, `?model=` and `?prompt=` query parameters.

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react
- Zod
- Fontsource: Inter and Space Grotesk

## How the demo works

- **Credits** start at 120 and are stored in `localStorage` under `zupona:credits`.
- **Library** entries are stored under `zupona:library`.
- **Brand kits** are stored under `zupona:brand` and converted into a prompt directive for the studio.
- **Generation** posts to `/api/generate`, which stores a job in server memory. The client polls `/api/jobs/[id]`; the job completes after about 3.8 seconds for video or 2.2 seconds for images.
- **Renders** are SVG gradients and shapes generated deterministically from the job ID and prompt — not output from a real model.
- **No data leaves the browser** except the prompt sent to the local mock API. Jobs disappear when the server restarts.

## Project structure

```text
src/
  app/                 Pages and API routes
    api/               Mock generate, job and render endpoints
    store/             Storefront listing and detail
    studio/            Studio page and query-param handoff
    brand/             Brand kit editor
    research/          Research and PRD summary
    legal/             Prototype legal pages
  components/          UI, marketing and studio components
  lib/
    content.ts         Pricing, FAQ, gallery and footer content
    store.ts           12 app definitions
    models.ts          Model roster, aspects and credit costs
    generation.ts      Shared job and library types
    jobs.ts            In-memory job store and simulation
docs/
  RESEARCH.md          Competitive research and market analysis
  PRD.md               Full product requirements document
```

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm start          # Serve production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Docs

- [`docs/RESEARCH.md`](docs/RESEARCH.md) — Higgsfield, InVideo, Kling and Google Flow teardown, competitive matrix, personas, gap analysis, pricing and unit economics, risks, sources.
- [`docs/PRD.md`](docs/PRD.md) — vision, scope, functional requirements, architecture, data model, API design, credit ledger, safety, analytics and roadmap.

## Limitations

This is a concept prototype. It does not call external AI models, render MP4 video, authenticate users, store data server-side, process payments, or enforce credits on a server. Those boundaries are intentional and documented in the research page and PRD.

Zupona is not affiliated with or endorsed by any company or model provider named on the site.
