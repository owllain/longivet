import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";
import type { ReactNode } from "react";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className="min-h-screen bg-background">
    <header className="border-b bg-card"><div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5"><Link href="/" aria-label="Volver al inicio de LONGEVET"><Logo /></Link><Link href="/" className="inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-bold">Volver al inicio</Link></div></header>
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <p className="text-sm font-semibold text-brand-teal-dark dark:text-brand-teal">LONGEVET · Actualizado el 27 de septiembre de 2026</p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h1><p className="mt-5 text-lg text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-8 text-base leading-relaxed [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-muted-foreground [&_a]:underline">{children}</div>
      <div className="mt-10 rounded-2xl border bg-card p-6"><h2 className="font-bold">Contacto para consultas o solicitudes</h2><p className="mt-2 text-sm text-muted-foreground">Dra. Junibeth González Ramírez · Colegiada #002640</p><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-teal-dark dark:text-brand-teal">WhatsApp: {site.phone}</a></div>
    </main>
    <footer className="border-t px-5 py-6"><nav aria-label="Información legal" className="mx-auto flex max-w-3xl flex-wrap gap-6 text-sm"><Link href="/privacidad">Política de privacidad</Link><Link href="/terminos">Términos de atención</Link><Link href="/">Inicio</Link></nav></footer>
  </div>;
}
