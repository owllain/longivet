"use client";

import {
  ArrowRight,
  Bone,
  Brain,
  HeartHandshake,
  Hourglass,
  Microscope,
  ScanLine,
  Smile,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import {
  EVENTO_PRESELECCION_SERVICIO,
  servicioReservableDeCatalogo,
} from "@/lib/booking";

/**
 * Preselecciona el servicio en el asistente de reserva (#agendar).
 * El ancla «#agendar» mantiene la semántica de enlace (navegación y teclado);
 * el scroll suave lo aporta `scroll-behavior: smooth` de globals.css.
 */
function preseleccionarServicio(serviceId: string) {
  window.dispatchEvent(
    new CustomEvent(EVENTO_PRESELECCION_SERVICIO, {
      detail: { serviceId },
    }),
  );
}

const servicios = [
  {
    icon: Hourglass,
    titulo: "Geriatría y medicina senior",
    desc: "Chequeos integrales 7+, detección temprana de enfermedades crónicas y planes de longevidad personalizados.",
    destacado: true,
  },
  {
    icon: Bone,
    titulo: "Manejo del dolor y movilidad",
    desc: "Protocolos multimodales para artritis y displasia: analgesia, fisioterapia y adaptaciones en casa.",
  },
  {
    icon: Stethoscope,
    titulo: "Medicina interna",
    desc: "Diagnóstico y tratamiento de patologías Cardíacas, renales, hepáticas y endocrinas del adulto mayor.",
  },
  {
    icon: Syringe,
    titulo: "Medicina preventiva",
    desc: "Vacunación, desparasitación y controles anuales ajustados al sistema inmune de cada edad.",
  },
  {
    icon: ScanLine,
    titulo: "Diagnóstico por imagen",
    desc: "Radiografía digital de alta resolución y ultrasonido con interpretación en la misma consulta.",
  },
  {
    icon: Microscope,
    titulo: "Laboratorio clínico",
    desc: "Perfil geriátrico completo con resultados el mismo día: hemograma, bioquímica y función tiroidea.",
  },
  {
    icon: Smile,
    titulo: "Odontología veterinaria",
    desc: "Profilaxis y extracciones con sedación monitorizada, clave contra el dolor crónico bucal.",
  },
  {
    icon: HeartHandshake,
    titulo: "Cuidado paliativo y duelo",
    desc: "Acompañamiento compasivo, control de síntomas y despedida digna para toda la familia.",
  },
];

export function Services() {
  return (
    <section id="servicios" aria-labelledby="titulo-servicios" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <Brain className="h-4 w-4" aria-hidden />
            Especialidades con enfoque gerontológico
          </p>
          <h2
            id="titulo-servicios"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            Servicios pensados para el <span className="texto-marca">cuerpo que envejece</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada servicio integra tecnología de diagnóstico con el manejo del
            confort: porque a mayor edad, cada detalle importa.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => {
            const servicioId = servicioReservableDeCatalogo(s.titulo);
            return (
              <Reveal as="li" key={s.titulo} delay={(i % 4) * 0.07}>
                <article
                  className={
                    s.destacado
                      ? "group relative flex h-full flex-col rounded-3xl border-2 border-brand-teal bg-card p-6 shadow-lg shadow-brand-teal/10 transition hover:-translate-y-1 hover:shadow-xl"
                      : "group relative flex h-full flex-col rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-lg"
                  }
                >
                  {s.destacado && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand-teal-dark px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                      Nuestra especialidad
                    </span>
                  )}
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal-soft transition group-hover:scale-105">
                    <s.icon className="h-6 w-6 text-brand-teal-dark" aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy dark:text-foreground">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <a
                    href="#agendar"
                    onClick={
                      servicioId
                        ? () => preseleccionarServicio(servicioId)
                        : undefined
                    }
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-brand-teal-dark focus-visible:outline-2 dark:text-brand-teal"
                    aria-label={`Agendar ${s.titulo.toLowerCase()} y continuar con la reserva`}
                  >
                    Agendar
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
