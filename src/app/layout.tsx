import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/lib/site";
import { serializeStructuredData } from "@/lib/structured-data";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Geriatría veterinaria`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "veterinaria geriátrica",
    "veterinario para mascotas senior",
    "geriatría canina",
    "geriatría felina",
    "manejo del dolor mascotas",
    "rehabilitación veterinaria",
    "veterinaria a domicilio Cartago",
    "atención veterinaria a domicilio",
    "cuidado mascotas mayores",
    "medicina preventiva senior",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Longevidad y bienestar para tu mascota senior`,
    description: site.description,
    images: [
      {
        url: "/images/asset%20(1).png",
        width: 1114,
        height: 1411,
        alt: "Medicina geriátrica veterinaria a domicilio con la Dra. Junibeth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Medicina Veterinaria Geriátrica`,
    description: site.description,
    images: ["/images/asset%20(1).png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/images/tab-logo.png", type: "image/png" },
    ],
    apple: "/images/tab-logo.png",
    shortcut: "/icon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "healthcare",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1622" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${site.url}/#servicio`,
  name: `${site.name} · ${site.legalName}`,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/images/asset%20(1).png`,
  priceRange: "₡₡",
  isAcceptingNewPatients: true,
  areaServed: [ { "@type": "AdministrativeArea", name: "Cartago, Costa Rica" }, { "@type": "AdministrativeArea", name: "San José, Costa Rica" } ],
  sameAs: [site.social.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],
  availableService: [
    { "@type": "MedicalTherapy", name: "Medicina geriátrica y chequeos senior 7+" },
    { "@type": "MedicalProcedure", name: "Manejo integral del dolor y rehabilitación" },
    { "@type": "DiagnosticProcedure", name: "Toma de muestras para laboratorio" },
    { "@type": "MedicalProcedure", name: "Odontología veterinaria" },
  ],
  medicalSpecialty: ["VeterinaryInternalMedicine", "VeterinaryPainManagement"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans antialiased bg-background text-foreground`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(jsonLd) }}
        />
      </body>
    </html>
  );
}
