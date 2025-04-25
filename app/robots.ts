import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/privacy", "/d", "/auth-awesome", "/*.json$"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_NEXT}/sitemap.xml`,
  };
}
