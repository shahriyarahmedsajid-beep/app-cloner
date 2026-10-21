import type { Metadata } from "next";
import { Studio, type StudioPreset } from "@/components/studio";
import { getStoreApp } from "@/lib/store";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Direct image and video models in one canvas. Write a brief, pick a route and generate. Demo runs locally.",
};

type SearchParams = {
  app?: string | string[];
  prompt?: string | string[];
  model?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const appSlug = first(params.app);
  const app = appSlug ? getStoreApp(appSlug) : undefined;
  const queryPrompt = first(params.prompt);
  const model = first(params.model);

  const preset: StudioPreset = app
    ? {
        slug: app.slug,
        name: app.name,
        category: app.category,
        credits: app.credits,
        model: app.model,
        prompt: app.prompt,
      }
    : null;

  const initialPrompt = (queryPrompt ?? app?.prompt ?? "").slice(0, 1200);

  return (
    <Studio initialPrompt={initialPrompt} initialModelId={model} preset={preset} />
  );
}
