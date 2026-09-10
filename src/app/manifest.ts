import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Manifest PWA-lite: instalable en el teléfono del tutor con icono
   de marca, colores de la paleta oficial y nombre es-CR. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2", // brand-sand
    theme_color: "#0d3b66", // brand-navy
    lang: "es-CR",
    categories: ["health", "animals", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
