import type { AspectId, GenerationMode } from "@/lib/models";

export type JobStatus = "processing" | "completed";

export type PublicJob = {
  id: string;
  prompt: string;
  modelId: string;
  modelName: string;
  mode: GenerationMode;
  aspect: AspectId;
  duration: number;
  credits: number;
  status: JobStatus;
  progress: number;
  resultUrl?: string;
  createdAt: number;
  etaSeconds: number;
};

export type SavedGeneration = {
  id: string;
  prompt: string;
  modelName: string;
  modelId: string;
  mode: GenerationMode;
  aspect: AspectId;
  duration: number;
  credits: number;
  createdAt: number;
  resultUrl: string;
};

export const CREDITS_KEY = "zupona:credits";
export const LIBRARY_KEY = "zupona:library";
