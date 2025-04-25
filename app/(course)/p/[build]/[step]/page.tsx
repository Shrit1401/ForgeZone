import React from "react";
import type { Metadata } from "next";

import { GetBuildBySlug } from "@/lib/build/builds.server";
import Btn from "@/components/Btn";
import BuildsStepClient from "@/components/clientPages/Builds/BuildsStepClient";

type Props = {
  params: {
    build: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function BuildStep({ params }: Props) {
  return <BuildsStepClient />;
}
