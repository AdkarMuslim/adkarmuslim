import type { MetadataRoute } from "next";

import { CANONICAL_SITE_ORIGIN } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = CANONICAL_SITE_ORIGIN;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
