import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Medicina Veterinaria Geriátrica en Costa Rica`,
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
    "veterinaria Escazú",
    "clínica veterinaria Costa Rica",
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
        url: "/images/hero-senior-dog.png",
        width: 1344,
        height: 768,
        alt: "Veterinaria de LONGIVET examinando a un perro golden retriever senior en la clínica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Medicina Veterinaria Geriátrica`,
    description: site.description,
    images: ["/images/hero-senior-dog.png"],
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
  "@id": `${site.url}/#clinica`,
  name: `${site.name} · ${site.legalName}`,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/hero-senior-dog.png`,
  priceRange: "₡₡",
  isAcceptingNewPatients: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: 9.9321, longitude: -84.1303 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  availableService: [
    { "@type": "MedicalTherapy", name: "Medicina geriátrica y chequeos senior 7+" },
    { "@type": "MedicalProcedure", name: "Manejo integral del dolor y rehabilitación" },
    { "@type": "DiagnosticProcedure", name: "Laboratorio clínico y radiología digital" },
    { "@type": "MedicalProcedure", name: "Odontología veterinaria" },
  ],
  medicalSpecialty: ["VeterinaryInternalMedicine", "VeterinaryPainManagement"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "412" },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
