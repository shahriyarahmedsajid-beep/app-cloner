import type { Metadata } from "next";
import { BrandKitEditor } from "@/components/brand-kit";

export const metadata: Metadata = {
  title: "Brand kit",
  description:
    "Define your palette, type, tone and guardrails once. Zupona applies them to every prompt and render in the demo studio.",
};

export default function BrandPage() {
  return <BrandKitEditor />;
}
