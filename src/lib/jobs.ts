import type { PublicJob } from "@/lib/generation";
import type { AspectId, GenerationMode } from "@/lib/models";

export type Job = {
  id: string;
  prompt: string;
  modelId: string;
  modelName: string;
  mode: GenerationMode;
  aspect: AspectId;
  duration: number;
  credits: number;
  createdAt: number;
  delay: number;
};

type JobStore = Map<string, Job>;

const globalStore = globalThis as typeof globalThis & {
  __zuponaJobs?: JobStore;
};

const jobs: JobStore = (globalStore.__zuponaJobs ??= new Map());

export function createJob(
  input: Omit<Job, "id" | "createdAt" | "delay">,
): Job {
  const job: Job = {
    ...input,
    id: `z_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`,
    createdAt: Date.now(),
    delay: input.mode === "video" ? 3800 : 2200,
  };

  jobs.set(job.id, job);

  if (jobs.size > 250) {
    const oldest = jobs.keys().next().value;
    if (oldest) jobs.delete(oldest);
  }

  return job;
}

export function getJob(id: string) {
  return jobs.get(id);
}

export function toPublicJob(job: Job): PublicJob {
  const elapsed = Date.now() - job.createdAt;
  const completed = elapsed >= job.delay;
  const rawProgress = Math.min(99, Math.round((elapsed / job.delay) * 100));

  return {
    id: job.id,
    prompt: job.prompt,
    modelId: job.modelId,
    modelName: job.modelName,
    mode: job.mode,
    aspect: job.aspect,
    duration: job.duration,
    credits: job.credits,
    status: completed ? "completed" : "processing",
    progress: completed ? 100 : Math.max(4, rawProgress),
    resultUrl: completed ? `/api/render/${job.id}` : undefined,
    createdAt: job.createdAt,
    etaSeconds: Math.max(0, Math.ceil((job.delay - elapsed) / 1000)),
  };
}
