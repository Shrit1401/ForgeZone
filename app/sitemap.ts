import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_NEXT || "http://localhost:3000";
// TODO - add builds and notes to the sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { url: "", priority: 1.0 },
    { url: "builds", priority: 0.9 },
    { url: "notes", priority: 0.9 },
    { url: "profile", priority: 0.8 },
    { url: "work", priority: 0.8 },
    { url: "privacy", priority: 0.3 },
    { url: "tos", priority: 0.3 },
    { url: "start", priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/${route.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
