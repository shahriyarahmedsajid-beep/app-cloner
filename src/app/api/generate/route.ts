import { NextResponse } from "next/server";
import { z } from "zod";
import { createJob, toPublicJob } from "@/lib/jobs";
import { aspects, costFor, getModel } from "@/lib/models";

const requestSchema = z.object({
  prompt: z.string().trim().min(3, "Write at least a few words.").max(1200),
  modelId: z.string().min(1),
  aspect: z.enum(["1:1", "4:5", "16:9", "9:16"]),
  duration: z.union([z.literal(5), z.literal(10)]).default(5),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a valid JSON body." },
      { status: 400 },
    );
  }

  const parsed = requestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { prompt, modelId, duration } = parsed.data;
  const aspect = parsed.data.aspect;
  const model = getModel(modelId);

  if (!model) {
    return NextResponse.json({ error: "Unknown model." }, { status: 400 });
  }

  if (!aspects.some((item) => item.id === aspect)) {
    return NextResponse.json({ error: "Unsupported aspect ratio." }, { status: 400 });
  }

  const resolvedDuration = model.mode === "image" ? 5 : duration;

  const job = createJob({
    prompt,
    modelId: model.id,
    modelName: model.name,
    mode: model.mode,
    aspect,
    duration: resolvedDuration,
    credits: costFor(model, resolvedDuration),
  });

  return NextResponse.json(toPublicJob(job), { status: 201 });
}
