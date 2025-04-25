import { MetadataRoute } from "next";
import db from "@/lib/db";

const baseUrl = process.env.NEXT_PUBLIC_NEXT || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const builds = await db.singleProject.findMany({
    select: {
      projectSlug: true,
      steps: {
        select: {
          stepItems: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  const notes = await db.note.findMany({
    select: {
      slug: true,
      createdAt: true,
    },
  });

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

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}/${route.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  let buildRoutes: MetadataRoute.Sitemap = [];

  builds.forEach((build) => {
    buildRoutes.push({
      url: `${baseUrl}/p/${build.projectSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });

    buildRoutes.push({
      url: `${baseUrl}/p/${build.projectSlug}/congo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    });

    build.steps.forEach((step) => {
      step.stepItems.forEach((item) => {
        buildRoutes.push({
          url: `${baseUrl}/p/${build.projectSlug}/${item.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      });
    });
  });

  const noteRoutes = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...buildRoutes, ...noteRoutes];
}
