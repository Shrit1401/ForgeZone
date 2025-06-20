import VisionClient from "@/components/clientPages/Vision/VisionClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vision - Forge Zone",
  description:
    "A home for the ones who build—apps, beats, dreams. Not just tech, but anything true.",
  openGraph: {
    title: "Vision - Forge Zone",
    description:
      "A home for the ones who build—apps, beats, dreams. Not just tech, but anything true.",
    images: [
      {
        url: "/vision/cover.png",
        alt: "Forge Zone Vision - Build Project Faster",
      },
    ],
    siteName: "Forge Zone",
  },
};

const VisionPage = () => {
  return <VisionClient />;
};

export default VisionPage;
