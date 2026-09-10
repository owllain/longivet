import {
  BookOpen,
  Cat,
  Clock3,
  HeartHandshake,
  House,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

const guias = [
  {
    icon: Cat,
    etiqueta: "Felinos",
    lectura: "4 min de lectura",
    titulo: "7 señales de dolor que tu gato esconde (y casi nadie nota)",
    parrafos: {
      intro: "Los gatos no se quejan: en la naturaleza, mostrar debilidad es peligro. Por eso el dolor felino casi siempre se disfraza de «cambios pequeños de conducta» que, bien leídos, son un grito silencioso.",
      cierre: "Si reconoces dos o más de estas señales, agenda una valoración: en gatos senior, la mayoría de estas conductas tienen causa física tratable (artrosis, dolor dental, enfermedad renal).",
    },
    lista: [
      "Dejó de subir a lugares altos (sofá, repisa, cama).",
      "Duerme en sitios nuevos, más bajos o escondidos.",
      "Se acicala menos: pelaje grasoso, con nudos o enmarañado.",
      "Reacciona mal al tocarlo en una zona específica.",
      "Come con menos entusiasmo o deja las croquetas secas (dolor dental).",
      "Se esconde más de lo que ya es natural en él.",
      "Cambia de postura en la caja de arena o tiene «accidentes».",
    ],
  },
  {
    icon: House,
    etiqueta: "Movilidad",
    lectura: "5 min de lectura",
    titulo: "Adaptar la casa para un perro con artrosis: 9 cambios simples",
    parrafos: {
      intro: "La artrosis no tiene cura, pero el entorno puede devolverle meses de vida cómoda. Estos cambios son de bajo costo y efecto comprobado en nuestros pacientes del Programa Senior:",
      cierre: "Nuestro equipo de rehabilitación evalúa tu casa contigo (presencial o con fotos por WhatsApp) y prioriza los cambios según el estado articular de tu compañero.",
    },
    lista: [
      "Cama ortopédica de espuma viscoelástica, baja y sin bordes.",
      "Alfombras o cintas antideslizantes en pisos lisos.",
      "Rampas con bordes hacia el sofá, la cama y el auto.",
      "Comederos y bebederos elevados a la altura del pecho.",
      "Arenero con entrada baja y arena suave (para gatos senior).",
      "Reducir el uso de escaleras: reorganiza sus zonas favoritas a un solo piso.",
      "Uñas cortas y almohadillas revisadas cada 3–4 semanas.",
      "Calor suave en articulaciones (cama térmica o manta en época lluviosa).",
      "Peso ideal: la medida número uno contra la artrosis. Pídelo en cada chequeo.",
    ],
  },
  {
    icon: HeartHandshake,
    etiqueta: "Cuidado paliativo",
    lectura: "6 min de lectura",
    titulo: "¿Cómo saber si la calidad de vida de mi mascota sigue siendo buena?",
    parrafos: {
      intro: "Es la pregunta más difícil que nos hacen los tutores, y merece una respuesta honesta y sin culpa. Usamos la escala HHHHHM, validada internacionalmente para acompañar esta decisión:",
      cierre: "Nadie debe tomar esta decisión solo ni a las 3 a. m. Nuestro equipo de cuidado paliativo acompaña con consultas de calidad de vida, control de síntomas y, cuando llegue el momento, una despedida digna en casa o en clínica.",
    },
    lista: [
      "Hurt — ¿Está libre de dolor con (o a pesar de) su medicación?",
      "Hunger — ¿Come con gusto y mantiene su peso?",
      "Hydration — ¿Bebe agua y se mantiene hidratado?",
      "Hygiene — ¿Consigue asearse y hacer sus necesidades con dignidad?",
      "Happiness — ¿Tiene momentos de alegría propios cada día?",
      "Mobility — ¿Se mueve por su cuenta sin sufrimiento evidente?",
    ],
  },
];

export function Recursos() {
  return (
    <section
      id="recursos"
      aria-labelledby="titulo-recursos"
      className="py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-4 py-1.5 text-sm font-semibold text-brand-navy dark:text-brand-gold">
            <BookOpen className="h-4 w-4" aria-hidden />
            Biblioteca senior
          </p>
          <h2
            id="titulo-recursos"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            Guías prácticas para tutores de{" "}
            <span className="texto-marca">veteranos</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            El conocimiento también es medicina: tres lecturas cortas escritas
            por nuestro equipo clínico, con lo que realmente funciona en casa.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid items-start max-w-6xl gap-6 md:grid-cols-3">
          {guias.map((g, i) => (
            <Reveal key={g.titulo} delay={i * 0.08}>
              <article className="flex flex-col rounded-3xl border bg-card transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3 p-6 pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-teal-soft">
                    <g.icon className="h-5 w-5 text-brand-teal-dark" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-teal-dark dark:text-brand-teal">
                      {g.etiqueta}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" aria-hidden />
                      {g.lectura}
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="px-6 pb-6">
                  <AccordionItem value="guia" className="border-0">
                    <AccordionTrigger className="mt-4 rounded-xl py-2 text-left text-base font-bold leading-snug text-brand-navy hover:no-underline hover:text-brand-teal-dark dark:text-foreground dark:hover:text-brand-teal">
                      {g.titulo}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                        <p>{g.parrafos.intro}</p>
                        <ul className="space-y-2 rounded-2xl bg-muted/60 p-4">
                          {g.lista.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span
                                aria-hidden
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p>{g.parrafos.cierre}</p>
                        <a
                          href={site.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand-teal-dark underline-offset-4 hover:underline dark:text-brand-teal"
                          aria-label={`Preguntar por WhatsApp sobre: ${g.titulo}`}
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden />
                          ¿Dudas? Escríbenos por WhatsApp
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
