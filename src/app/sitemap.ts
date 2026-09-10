import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Sitemap del sitio de una sola página.
   Los anclas (#servicios, #faq…) no son URLs independientes, así que
   el sitemap solo expone la raíz con prioridad máxima. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
