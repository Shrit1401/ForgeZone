import VisionClient from "@/components/clientPages/Vision/VisionClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "A home for the ones who build—apps, beats, dreams. Not just tech, but anything true.",
  openGraph: {
    title: "Vision",
    description:
      "A home for the ones who build—apps, beats, dreams. Not just tech, but anything true.",
    images: [
      {
        url: "https://i.postimg.cc/gkzCKP4k/image.png",
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
