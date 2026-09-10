"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Testimonios en marquee horizontal infinito
   - Dos pistas idénticas (la segunda aria-hidden): al desplazar
     la pista -50 % el bucle es perfecto y sin saltos.
   - Pausa con hover y con foco (animation-play-state: paused).
   - Con prefers-reduced-motion: grid estático de 3 columnas sin
     marquee (detectado SSR-safe con useSyncExternalStore).
   - La lista original es legible por lectores de pantalla; el
     duplicado es decorativo (aria-hidden).
   ───────────────────────────────────────────────────────────── */

import { useSyncExternalStore } from "react";
import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/sections/reveal";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

const testimonios = [
  {
    cita:
      "Con Kiara (golden, 11 años) creíamos que ya no caminaba por «vieja». La Dra. Solís encontró artritis con dolor real y hoy vuelve a acompañarnos al parque. No tienen idea de lo que eso significa para nosotros.",
    nombre: "Familia Ureña",
    mascota: "Kiara · golden retriever, 11 años",
    estrellas: 5,
  },
  {
    cita:
      "Mi gato paniqué toda la vida en veterinarias. Con la sala felina y las feromonas, Simba se quedó dormido en la consulta. Es la primera vez en 13 años que lo veo tranquilo en una clínica.",
    nombre: "Carlos M.",
    mascota: "Simba · gato mestizo, 13 años",
    estrellas: 5,
  },
  {
    cita:
      "Nos acompañaron en lo más difícil con mimo y honestidad: nunca nos vendieron esperanza falsa, pero Rocko pasó sus últimos meses sin dolor y nos despedimos en casa. Eternamente agradecidos.",
    nombre: "Ana Gabriela R.",
    mascota: "Rocko · beagle, 15 años",
    estrellas: 5,
  },
  {
    cita:
      "A Bruno le detectaron la enfermedad renal a los 13 y pensamos que era el final. Con la dieta, los controles cada tres meses y la paciencia del equipo, hoy tiene 14 y sigue mandando en el parque de Escazú. Nos cuidaron a nosotros igual que a él.",
    nombre: "Familia Solano",
    mascota: "Bruno · schnauzer, 14 años",
    estrellas: 5,
  },
  {
    cita:
      "Miko perdía peso y maullaba de noche sin parar. Ese mismo día teníamos resultados de laboratorio y el plan para su hipertiroidismo, explicado sin tecnicismos. Verlo volver a perseguir su ratoncito a los 12 años no tiene precio.",
    nombre: "Ivannia G.",
    mascota: "Miko · gato siamés, 12 años",
    estrellas: 5,
  },
  {
    cita:
      "Dulce llevaba años con otitis que no sanaban y le dolía masticar. La odontología con sedación monitorizada y el plan para sus oídos le cambiaron la vida: duerme la noche completa y ya no se rasca de desesperación. Gracias por tanta dedicación.",
    nombre: "Randall y Priscila",
    mascota: "Dulce · cocker spaniel, 9 años",
    estrellas: 5,
  },
];

type Testimonio = (typeof testimonios)[number];

function TarjetaTestimonio({
  testigo,
  className,
}: {
  testigo: Testimonio;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/[0.12]",
        className
      )}
    >
      <Quote className="h-8 w-8 text-brand-gold" aria-hidden="true" />
      <div
        className="mt-3 flex items-center gap-1"
        role="img"
        aria-label={`Calificación: ${testigo.estrellas} de 5 estrellas`}
      >
        {Array.from({ length: testigo.estrellas }).map((_, s) => (
          <Star
            key={s}
            className="h-4 w-4 fill-brand-gold text-brand-gold"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/85">
        «{testigo.cita}»
      </blockquote>
      <figcaption className="mt-5 border-t border-white/15 pt-4">
        <p className="text-sm font-bold text-white">{testigo.nombre}</p>
        <p className="text-xs text-white/60">{testigo.mascota}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // SSR-safe: la instantánea de servidor es false → mismo HTML en servidor
  // e hidratación; luego se ajusta sin desajuste de hidratación.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  return (
    <section
      aria-labelledby="titulo-testimonios"
      className="relative overflow-hidden bg-primary py-20 md:py-24 dark:bg-brand-navy"
    >
      <div aria-hidden="true" className="patron-puntos absolute inset-0 text-white/10" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
            <Star className="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden="true" />
            4,9 / 5 · 412 reseñas verificadas
          </p>
          <h2
            id="titulo-testimonios"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Historias que nos hacen levantarnos cada mañana
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Pasa el cursor o el foco sobre las historias para pausarlas.
          </p>
        </Reveal>

        {reducedMotion ? (
          /* Preferencia reduced-motion: grid estático de 3 columnas, sin marquee */
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonios.map((t) => (
              <Reveal as="li" key={t.nombre}>
                <TarjetaTestimonio testigo={t} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-12" as="div">
            <div
              className="-mx-4 overflow-hidden sm:-mx-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
            >
              {/* Pista animada: contiene DOS copias de la lista; al recorrer
                  -50 % el segundo juego entra exactamente donde estaba el
                  primero → bucle infinito perfecto. */}
              <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                <ul
                  aria-label="Historias de familias que confían en LONGIVET"
                  className="flex gap-6 pr-6"
                >
                  {testimonios.map((t) => (
                    <li key={t.nombre} className="flex w-[22rem] max-w-[85vw] shrink-0">
                      <TarjetaTestimonio testigo={t} />
                    </li>
                  ))}
                </ul>
                {/* Duplicado decorativo: invisible para lectores de pantalla */}
                <ul aria-hidden="true" className="flex gap-6 pr-6">
                  {testimonios.map((t) => (
                    <li
                      key={`doble-${t.nombre}`}
                      className="flex w-[22rem] max-w-[85vw] shrink-0"
                    >
                      <TarjetaTestimonio testigo={t} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
