import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Inicio y páginas legales; las anclas no son páginas independientes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${site.url}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terminos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
