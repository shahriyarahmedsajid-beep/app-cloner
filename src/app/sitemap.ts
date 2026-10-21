import type { MetadataRoute } from "next";
import { storeApps } from "@/lib/store";

const baseUrl = "https://zupona.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/store", priority: 0.9 },
    { path: "/studio", priority: 0.8 },
    { path: "/brand", priority: 0.7 },
    { path: "/pricing", priority: 0.8 },
    { path: "/research", priority: 0.6 },
    { path: "/library", priority: 0.5 },
    { path: "/login", priority: 0.4 },
    { path: "/legal", priority: 0.3 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...storeApps.map((app) => ({
      url: `${baseUrl}/store/${app.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
