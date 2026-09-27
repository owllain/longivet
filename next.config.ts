import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    // La salida estática de Next necesita scripts y estilos inline.
    // Esta CSP limita orígenes y marcos; no sustituye el escape de contenido.
    const policy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.dailymotion.com https://*.dmcdn.net",
      "font-src 'self'",
      `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
      "frame-src https://www.dailymotion.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(!isDev ? ["upgrade-insecure-requests"] : []),
    ].join("; ");
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: policy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
  /* Configuración de optimización de imágenes para alta velocidad móvil (3G/4G) */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  reactStrictMode: false,
};

export default nextConfig;
