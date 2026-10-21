import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Every completed demo run, saved locally in your browser. Remix, download or clean up your library.",
};

export default function LibraryPage() {
  return <LibraryView />;
}
