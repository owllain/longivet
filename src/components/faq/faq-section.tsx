"use client";

import { useMemo, useRef, useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  ClipboardList,
  CreditCard,
  HeartPulse,
  HelpCircle,
  MessageCircle,
  Search,
  SearchX,
  Sparkles,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faqCategories,
  faqItems,
  type FaqCategory,
  type FaqItem,
} from "@/data/faq";
import { cn } from "@/lib/utils";
import { Recursos } from "@/components/sections/recursos";
import { site } from "@/lib/site";

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const CATEGORIA_DESTACADAS = "★ Más consultadas";

type CategoriaFiltro = typeof CATEGORIA_DESTACADAS | FaqCategory | "Todas";

const iconosCategoria: Record<string, LucideIcon> = {
  [CATEGORIA_DESTACADAS]: Sparkles,
  "Citas y horarios": CalendarClock,
  "Geriatría: cuándo y por qué": HeartPulse,
  "Servicios y especialidades": Stethoscope,
  "Precios y pagos": CreditCard,
  "Antes de tu visita": ClipboardList,
};

// Top 5 preguntas esenciales más consultadas por tutores
const indicesDestacadas = [0, 1, 3, 5, 7];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: `Preguntas frecuentes · ${site.name}`,
  inLanguage: "es-CR",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
} as const;

const sugerenciasBusqueda = [
  "Precios",
  "Artritis y dolor",
  "Primera cita",
  "Chequeo senior",
  "Laboratorio",
];

const LIMITE_INICIAL_PREGUNTAS = 5;

export default function FaqSection() {
  const [consulta, setConsulta] = useState("");
  const [categoria, setCategoria] = useState<CategoriaFiltro>(CATEGORIA_DESTACADAS);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtro inteligente según búsqueda y categoría activa
  const resultados = useMemo(() => {
    const termino = normalizar(consulta.trim());

    if (termino) {
      return faqItems
        .map((item, indice) => ({ item, indice }))
        .filter(({ item }) =>
          normalizar(`${item.q} ${item.a} ${item.cat}`).includes(termino)
        );
    }

    if (categoria === CATEGORIA_DESTACADAS) {
      return indicesDestacadas.map((idx) => ({
        item: faqItems[idx] as FaqItem,
        indice: idx,
      }));
    }

    if (categoria === "Todas") {
      return faqItems.map((item, indice) => ({ item, indice }));
    }

    return faqItems
      .map((item, indice) => ({ item, indice }))
      .filter(({ item }) => item.cat === categoria);
  }, [consulta, categoria]);

  // Lista recortada para UX limpia y sin saturación visual
  const preguntasVisibles = useMemo(() => {
    if (consulta.trim() || mostrarTodas) {
      return resultados;
    }
    return resultados.slice(0, LIMITE_INICIAL_PREGUNTAS);
  }, [resultados, consulta, mostrarTodas]);

  const limpiarBusqueda = () => {
    setConsulta("");
    inputRef.current?.focus();
  };

  const seleccionarSugerencia = (sugerencia: string) => {
    setConsulta(sugerencia);
    setMostrarTodas(true);
  };

  // Categorías principales para la barra de pestañas (excluyendo "Urgencias" ya que no se presta el servicio)
  const tabsDisponibles: CategoriaFiltro[] = [
    CATEGORIA_DESTACADAS,
    "Citas y horarios",
    "Geriatría: cuándo y por qué",
    "Servicios y especialidades",
    "Precios y pagos",
    "Antes de tu visita",
  ];

  return (
    <section
      id="faq"
      aria-labelledby="titulo-faq"
      className="bg-brand-sand py-16 sm:py-20 md:py-24 dark:bg-background"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal-soft px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal-dark dark:bg-accent dark:text-accent-foreground">
            <HelpCircle className="size-3.5" aria-hidden />
            Centro de Ayuda y Preguntas Frecuentes
          </p>
          <h2
            id="titulo-faq"
            className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white sm:text-4xl md:text-5xl"
          >
            Todo lo que necesitas saber
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Respuestas claras y fundamentadas a las dudas más comunes sobre la atención, citas y bienestar geriátrico.
          </p>
        </div>

        {/* Barra de búsqueda interactiva */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              ref={inputRef}
              id="buscar-faq"
              type="text"
              autoComplete="off"
              value={consulta}
              onChange={(e) => {
                setConsulta(e.target.value);
                setMostrarTodas(true);
              }}
              placeholder="Busca por palabra clave: artritis, precios, chequeo, primera cita…"
              className="h-12 rounded-full border-border bg-card pl-11 pr-11 text-sm sm:text-base shadow-sm focus-visible:ring-brand-teal"
            />
            {consulta.length > 0 && (
              <button
                type="button"
                onClick={limpiarBusqueda}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>

          {/* Sugerencias rápidas de búsqueda */}
          {!consulta && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">Sugerencias:</span>
              {sugerenciasBusqueda.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => seleccionarSugerencia(sug)}
                  className="rounded-full border border-border/80 bg-card px-2.5 py-0.5 font-medium transition hover:border-brand-teal hover:text-brand-teal dark:bg-card/60"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pestañas de categorías estilizadas (solo si no hay búsqueda activa) */}
        {!consulta && (
          <div
            role="tablist"
            aria-label="Categorías de preguntas frecuentes"
            className="scrollbar-fina mt-8 flex snap-x gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
          >
            {tabsDisponibles.map((cat) => {
              const Icono = iconosCategoria[cat] || HelpCircle;
              const activa = categoria === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activa}
                  type="button"
                  onClick={() => {
                    setCategoria(cat);
                    setMostrarTodas(false);
                  }}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all",
                    activa
                      ? "border-brand-teal-dark bg-brand-teal-dark text-white shadow-md shadow-brand-teal-dark/20 dark:border-brand-teal dark:bg-brand-teal dark:text-brand-navy-deep"
                      : "border-border bg-card text-foreground hover:border-brand-teal hover:text-brand-teal dark:bg-card/70"
                  )}
                >
                  <Icono className="size-4" aria-hidden="true" />
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Contador de estado */}
        <p aria-live="polite" className="mt-6 text-center text-xs text-muted-foreground">
          {consulta ? (
            <>
              Se encontraron <strong className="text-foreground">{resultados.length}</strong> {resultados.length === 1 ? "resultado" : "resultados"} para &quot;{consulta}&quot;
            </>
          ) : (
            <>
              Mostrando {preguntasVisibles.length} de {resultados.length} preguntas en {categoria}
            </>
          )}
        </p>

        {/* Acordeón de preguntas */}
        {preguntasVisibles.length > 0 ? (
          <div className="mx-auto mt-6 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {preguntasVisibles.map(({ item, indice }) => (
                <AccordionItem
                  key={`${item.q}-${indice}`}
                  value={`faq-${indice}`}
                  className="rounded-2xl border border-border/80 bg-card px-5 shadow-xs transition-colors hover:border-brand-teal/40 dark:bg-card/80"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-bold text-brand-navy hover:no-underline dark:text-foreground">
                    <span className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <span>{item.q}</span>
                      {item.cat && (
                        <Badge
                          variant="outline"
                          className="hidden shrink-0 border-brand-teal/30 bg-brand-teal-soft/60 text-[10px] font-semibold text-brand-teal-dark sm:inline-flex dark:bg-accent dark:text-accent-foreground"
                        >
                          {item.cat}
                        </Badge>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    <p>{item.a}</p>
                    <div className="mt-3.5 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">¿Esta información te fue útil?</span>
                      <a
                        href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                          `Hola Dra. Junibeth, tengo una duda respecto a: ${item.q}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-brand-teal-dark hover:underline dark:text-brand-teal"
                      >
                        <MessageCircle className="size-3.5 text-brand-emerald" />
                        Preguntarle a la Dra. Junibeth
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Botón de ver más preguntas (Progressive Disclosure) */}
            {!consulta && resultados.length > LIMITE_INICIAL_PREGUNTAS && (
              <div className="mt-6 text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMostrarTodas(!mostrarTodas)}
                  className="rounded-full border-brand-teal/30 bg-card px-6 py-2 text-xs sm:text-sm font-bold text-brand-navy shadow-xs hover:border-brand-teal hover:bg-brand-teal-soft hover:text-brand-teal-dark dark:text-foreground dark:hover:bg-accent"
                >
                  {mostrarTodas ? (
                    "Mostrar menos preguntas"
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Ver {resultados.length - LIMITE_INICIAL_PREGUNTAS} preguntas más de esta categoría
                      <ChevronDown className="size-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Estado sin resultados */
          <div className="mx-auto mt-8 max-w-md rounded-3xl border bg-card p-8 text-center shadow-xs">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-teal-soft dark:bg-accent">
              <SearchX className="size-6 text-brand-teal-dark dark:text-accent-foreground" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-brand-navy dark:text-white">
              No encontramos una pregunta con ese término
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Puedes consultarnos directamente y te respondemos en pocos minutos.
            </p>
            <Button
              asChild
              className="mt-5 rounded-full bg-brand-teal-dark px-5 text-xs font-bold text-white hover:bg-brand-teal dark:bg-brand-teal dark:text-brand-navy-deep"
            >
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-1.5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        )}

        {/* Tarjeta de soporte final */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-brand-teal/20 bg-gradient-to-br from-card via-card to-brand-teal-soft/30 p-6 sm:p-8 text-center shadow-md dark:from-card dark:to-accent/20">
          <h3 className="text-xl font-extrabold text-brand-navy sm:text-2xl dark:text-white">
            ¿Tienes una consulta específica sobre tu mascota?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Cada compañero de cuatro patas es único. Escríbenos o agenda una consulta geriátrica para evaluar su salud de forma integral.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full bg-brand-teal-dark px-6 font-bold text-white hover:bg-brand-teal">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">Agendar valoración</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-brand-teal/30 bg-card px-6 font-bold hover:bg-brand-teal-soft">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-1.5 text-brand-emerald" />
                Escribir a WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* JSON-LD Schema para Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
        <Recursos />
      </div>
    </section>
  );
}
