"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Heart, Quote } from "lucide-react";

// Fragmentos de los testimonios compartidos por sus familias.
const stories = [
  {
    name: "Ivannia G.",
    pet: "Miko · gato siamés, 12 años",
    quote: "Miko perdía peso y maullaba de noche sin parar. […] Verlo volver a perseguir su ratoncito a los 12 años no tiene precio.",
  },
  {
    name: "Randall y Priscila",
    pet: "Dulce · cocker spaniel, 9 años",
    quote: "Dulce llevaba años con otitis que no sanaban y le dolía masticar. La odontología con sedación monitorizada y el plan para sus oídos le cambiaron la vida: duerme la noche completa y ya no se rasca de desesperación. Gracias por tanta dedicación.",
  },
  {
    name: "Carlos M.",
    pet: "Simba · gato mestizo, 13 años",
    quote: "[…] Simba se quedó dormido en la consulta. Es la primera vez en 13 años que lo veo tranquilo […].",
  },
];

export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function goTo(index: number) {
    const element = viewport.current;
    if (!element) return;
    const next = (index + stories.length) % stories.length;
    element.scrollTo({
      left: next * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }
  return (
    <section aria-labelledby="titulo-historias" className="bg-[#0d3b66] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">En palabras de sus familias</p>
          <h2 id="titulo-historias" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Historias que nos hacen levantarnos cada mañana</h2>
        </div>
        <div role="region" aria-roledescription="carrusel" aria-label="Testimonios de las familias" className="mx-auto mt-10 max-w-5xl">
          <p id="historias-ayuda" className="mb-5 text-center text-sm text-white/70">Cada familia, una historia. Desliza o usa las flechas para descubrirlas.</p>
          <div ref={viewport} tabIndex={0} aria-describedby="historias-ayuda"
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl border border-white/20 bg-white/[0.07] shadow-2xl shadow-black/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
            onScroll={event => {
              const element = event.currentTarget;
              setActive(Math.max(0, Math.min(stories.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
            }}
            onKeyDown={event => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              goTo(event.key === "Home" ? 0 : event.key === "End" ? stories.length - 1 : active + (event.key === "ArrowRight" ? 1 : -1));
            }}>
            {stories.map((story, index) => (
              <figure key={story.pet} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${stories.length}: ${story.name}`} className="grid w-full min-w-0 shrink-0 snap-center snap-always content-center gap-6 p-6 sm:p-10 md:grid-cols-[1fr_2fr] md:gap-10">
                <figcaption className="flex flex-col justify-center border-b border-white/15 pb-6 md:border-r md:border-b-0 md:pr-8 md:pb-0">
                  <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-gold"><Heart className="size-6" aria-hidden /></span>
                  <p className="text-xl font-bold">{story.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{story.pet}</p>
                </figcaption>
                <div className="min-w-0 self-center">
                  <Quote className="mb-4 size-9 text-brand-gold" aria-hidden />
                  <blockquote className="text-base leading-relaxed text-white/95 sm:text-lg lg:text-xl">«{story.quote}»</blockquote>
                </div>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-between">
            <p className="text-sm tabular-nums text-white/70" aria-live="polite" aria-atomic="true">Historia {active + 1} de {stories.length}</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => goTo(active - 1)} aria-label="Historia anterior" className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-brand-gold"><ArrowLeft className="size-5" aria-hidden /></button>
              {stories.map((story, index) => <button key={story.pet} type="button" aria-label={`Ver historia de ${story.name}`} aria-current={index === active ? "true" : undefined} onClick={() => goTo(index)} className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-gold"><span className={`h-2 rounded-full transition-all motion-reduce:transition-none ${active === index ? "w-7 bg-brand-gold" : "w-2 bg-white/40"}`} /></button>)}
              <button type="button" onClick={() => goTo(active + 1)} aria-label="Historia siguiente" className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-brand-gold"><ArrowRight className="size-5" aria-hidden /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
