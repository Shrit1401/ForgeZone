import React from "react";
import type { Metadata } from "next";

import { GetBuildBySlug } from "@/lib/build/builds.server";
import BuildsStepClient from "@/components/clientPages/Builds/BuildsStepClient";

type Props = {
  params: {
    build: string;
    step: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { build } = await params;
  const buildSlug = String(build);
  const buildData = await GetBuildBySlug(buildSlug);

  if (!buildData) {
    return {
      title: "Build Not Found",
      description: "The build you are looking for does not exist.",
    };
  }
  return {
    title: `${buildData.name}`,
    description: `${buildData.oneLiner}`,
    openGraph: {
      title: buildData.name,
      description: buildData.oneLiner,
      images: [
        {
          url: buildData.activeImg,
          alt: `${buildData.name} - Build Project Faster`,
        },
      ],
      siteName: "Forge Zone",
    },
  };
}

export default async function BuildHome({ params }: Props) {
  const { build } = await params;
  const { step } = await params;

  const buildSlug = String(build);
  const stepSlug = String(step);
  return <BuildsStepClient buildSlug={buildSlug} stepSlug={stepSlug} />;
}
