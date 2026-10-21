import type { Metadata } from "next";
import { Director } from "@/components/director";

export const metadata: Metadata = {
  title: "Director",
  description:
    "Turn one brief into a costed, continuity-locked campaign plan. Compile the board, inspect every route and render the demo storyboard.",
};

export default function DirectorPage() {
  return <Director />;
}
