import React from "react";
import type { Metadata } from "next";

import { GetBuildBySlug } from "@/lib/build/builds.server";
import Btn from "@/components/Btn";
import BuildsCongoClient from "@/components/clientPages/Builds/BuildsCongoClient";

type Params = Promise<{
  build: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
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

export default async function BuildHome({ params }: { params: Params }) {
  const { build } = await params;
  const buildSlug = String(build);
  const buildData = await GetBuildBySlug(buildSlug);

  if (!buildData) {
    return (
      <div className="mt-[5rem] h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Page
          </h2>
          <p className="text-white/70 mb-4">
            The build you are looking for does not exist or has been removed.
          </p>
          <Btn
            title="Go Back to Builds"
            className="w-fit mx-auto"
            link="/builds"
          />
        </div>
      </div>
    );
  }

  return <BuildsCongoClient buildSlug={buildSlug} />;
}
