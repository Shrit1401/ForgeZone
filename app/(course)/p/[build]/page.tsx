import React from "react";
import type { Metadata } from "next";

// import { GetBuildBySlug } from "@/lib/build/builds.server";
import BuildInitalClient from "@/components/clientPages/Builds/BuildInitalClient";

type Params = Promise<{
  build: string;
}>;

// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const { build } = await params;
//   const buildSlug = String(build);
//   const buildData = await GetBuildBySlug(buildSlug);

//   if (!buildData) {
//     return {
//       title: "Build Not Found",
//       description: "The build you are looking for does not exist.",
//     };
//   }
//   return {
//     title: `${buildData.name}`,
//     description: `${buildData.oneLiner}`,
//     openGraph: {
//       title: buildData.name,
//       description: buildData.oneLiner,
//       images: [
//         {
//           url: buildData.activeImg,
//           alt: `${buildData.name} - Build Project Faster`,
//         },
//       ],
//       siteName: "Forge Zone",
//     },
//   };
// }

export default async function BuildHome({ params }: { params: Params }) {
  const { build } = await params;
  const buildSlug = String(build);
  return <BuildInitalClient buildSlug={buildSlug} />;
}
