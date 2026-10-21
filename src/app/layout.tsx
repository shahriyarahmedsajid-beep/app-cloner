import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://zupona.ai"),
  title: {
    default: "Zupona AI — The creative storefront and studio",
    template: "%s — Zupona AI",
  },
  description:
    "Zupona is the creative storefront and studio that turns a brief into finished images, video and ads across every model worth using.",
  keywords: [
    "AI video generator",
    "AI image generator",
    "creative studio",
    "AI storefront",
    "UGC ads",
    "AI filmmaking",
  ],
  openGraph: {
    title: "Zupona AI — The creative storefront and studio",
    description:
      "Discover runnable creative workflows, direct the best models and ship work that looks finished.",
    type: "website",
    siteName: "Zupona AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zupona AI — The creative storefront and studio",
    description:
      "Discover runnable creative workflows, direct the best models and ship work that looks finished.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-paper">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
