import React from "react";
import type { Metadata } from "next";

import { GetBuildBySlug } from "@/lib/build/builds.server";
import BuildsStepClient from "@/components/clientPages/Builds/BuildsStepClient";

export async function generateMetadata({
  params,
}: {
  params: { build: string; step: string };
}): Promise<Metadata> {
  const buildSlug = params.build;
  const build = await GetBuildBySlug(buildSlug);

  if (!build) {
    return {
      title: "Build Not Found",
      description: "The build you are looking for does not exist.",
    };
  }
  return {
    title: `${build.name}`,
    description: `${build.oneLiner}`,
    openGraph: {
      title: build.name,
      description: build.oneLiner,
      images: [
        {
          url: build.activeImg,
          alt: `${build.name} - Build Project Faster`,
        },
      ],
      siteName: "Forge Zone",
    },
  };
}

export default async function BuildStep({
  params,
}: {
  params: { build: string; step: string };
}) {
  return <BuildsStepClient />;
}
