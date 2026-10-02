"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqCategories, faqItems } from "@/data/faq";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { serializeStructuredData } from "@/lib/structured-data";

const Recursos = dynamic(() => import("@/components/sections/recursos").then(m => m.Recursos), {
  loading: () => <p className="p-4 text-center text-sm text-muted-foreground">Cargando guías...</p>
});

const RecursosDescargables = dynamic(() => import("@/components/sections/recursos-descargables").then(m => m.RecursosDescargables), {
  loading: () => <p className="p-4 text-center text-sm text-muted-foreground">Cargando recursos...</p>
});

const featured = [0, 1, 3, 5, 7];
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const schema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqItems.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

export default function FaqSection() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => faqItems.map((item, index) => ({ item, index })).filter(({ item, index }) => {
    if (!expanded) return featured.includes(index);
    return (!category || item.cat === category) && normalize(`${item.q} ${item.a}`).includes(normalize(query.trim()));
  }), [expanded, query, category]);

  return (
    <section id="faq" aria-labelledby="titulo-faq" className="bg-brand-sand py-12 sm:py-16 dark:bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="titulo-faq" className="text-3xl font-extrabold text-brand-navy sm:text-4xl dark:text-foreground">Antes de agendar</h2>
          <p className="mt-3 text-muted-foreground">Las respuestas esenciales para organizar la visita de tu mascota.</p>
        </div>
        <div className="mx-auto mt-7 max-w-3xl">
          <button type="button" aria-expanded={expanded} aria-controls="faq-explorador" onClick={() => { setExpanded(!expanded); setQuery(""); setCategory(""); }} className="mb-5 inline-flex min-h-12 items-center gap-2 rounded-full border border-brand-teal/40 bg-card px-5 text-sm font-bold text-brand-teal-dark dark:text-brand-teal">
            {expanded ? "Mostrar solo las 5 esenciales" : `Ver todas las preguntas (${faqItems.length})`}
            <ChevronDown aria-hidden className={`size-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
          </button>
          <div id="faq-explorador">
            {expanded && <div className="mb-6 grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2">
              <label htmlFor="buscar-faq" className="text-sm font-semibold">Buscar una pregunta<input ref={searchRef} id="buscar-faq" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ej.: pagos, laboratorio…" className="mt-2 min-h-12 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-base" /></label>
              <label htmlFor="categoria-faq" className="text-sm font-semibold">Tema<select id="categoria-faq" value={category} onChange={event => setCategory(event.target.value)} className="mt-2 min-h-12 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-base"><option value="">Todos los temas</option>{faqCategories.map(value => <option key={value}>{value}</option>)}</select></label>
              <p role="status" className="text-sm text-muted-foreground sm:col-span-2">{results.length} {results.length === 1 ? "pregunta encontrada" : "preguntas encontradas"}</p>
            </div>}
            <Accordion type="single" collapsible className="space-y-3">
              {results.map(({ item, index }) => <AccordionItem key={index} value={`faq-${index}`} className="rounded-2xl border bg-card px-5">
                <AccordionTrigger className="min-h-14 py-4 text-left text-base font-bold text-brand-navy dark:text-foreground">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground"><p>{item.a}</p><a href={buildWhatsAppUrl(`Hola Dra. Junibeth, tengo una duda respecto a: ${item.q}`)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-teal-dark underline underline-offset-4 dark:text-brand-teal"><MessageCircle className="size-4 shrink-0" aria-hidden />Consultar con la doctora</a></AccordionContent>
              </AccordionItem>)}
            </Accordion>
            {results.length === 0 && <div className="rounded-2xl border bg-card p-6"><p>No encontramos una pregunta con esos filtros.</p><button type="button" onClick={() => { setQuery(""); setCategory(""); searchRef.current?.focus(); }} className="mt-2 inline-flex min-h-11 items-center font-semibold underline">Limpiar filtros</button></div>}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">¿Te queda alguna duda? <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-brand-teal-dark underline underline-offset-4 dark:text-brand-teal">Escríbele a la Dra. Junibeth</a></p>
          
          <div className="mt-8 space-y-4">
            <details className="rounded-2xl border bg-card p-5">
              <summary className="min-h-11 cursor-pointer content-center font-bold">Recursos descargables (PDFs)</summary>
              <RecursosDescargables />
            </details>
            <details className="rounded-2xl border bg-card p-5">
              <summary className="min-h-11 cursor-pointer content-center font-bold">Biblioteca senior: guías para cuidar en casa</summary>
              <Recursos />
            </details>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
      </div>
    </section>
  );
}
