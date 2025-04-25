import { Metadata } from "next";

export const HomeMetadata: Metadata = {
  title: {
    default: "Forge Zone",
    template: "%s ~ Forge Zone",
  },

  description:
    "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

  openGraph: {
    title: "Forge Zone",
    description:
      "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

    images: [
      {
        url: "./opengraph/opengraph-home.png",
        width: 1200,
        height: 720,
        alt: "Forge Zone - Dare to Dream, Dare To Build.",
      },
    ],
  },

  keywords: [
    "forge zone",
    "build real projects",
    "web development projects",
    "ai ml projects",
    "learn by building",
    "coding for college students",
    "developer community",
    "project based learning",
    "self-paced dev courses",
    "build in public",
  ],

  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon/black-icon.png",
        href: "/favicon/black-icon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon/white-icon.png",
        href: "/favicon/white-icon.png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Forge Zone",
    description:
      "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

    creator: "@forgezone",
  },
};

export const BuildMetadata: Metadata = {
  title: "Builds",

  openGraph: {
    title: "Forge Zone",
    description:
      "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

    images: [
      {
        url: "./opengraph/opengraph-builds.png",
        width: 1200,
        height: 720,
        alt: "Forge Zone - Dare to Dream, Dare To Build.",
      },
    ],
  },
};

export const AuthenticationMetadata: Metadata = {
  title: "Start",

  openGraph: {
    title: "Forge Zone",
    description:
      "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

    images: [
      {
        url: "./opengraph/opengraph-start.png",
        width: 1200,
        height: 720,
        alt: "Forge Zone - Dare to Dream, Dare To Build.",
      },
    ],
  },
};

export const NotesMetadeta: Metadata = {
  title: "Notes",

  openGraph: {
    title: "Forge Zone",
    description:
      "A playground for developers to build real projects, explore AI and webß dev, and grow by doing—not just watching.",

    images: [
      {
        url: "./opengraph/opengraph-notes.png",
        width: 1200,
        height: 720,
        alt: "Forge Zone - Dare to Dream, Dare To Build.",
      },
    ],
  },
};
