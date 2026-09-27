"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Instagram, Maximize2, X } from "lucide-react";
import { gallerySlides } from "@/data/gallery";
import { site } from "@/lib/site";

export default function ShowcaseGallery() {
  const viewport = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const total = gallerySlides.length;
  function goTo(index: number) {
    const track = viewport.current;
    const card = cards.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const controlClass = "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-accent disabled:opacity-35 disabled:cursor-not-allowed";

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="overflow-hidden bg-brand-sand py-12 sm:py-16 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-dark dark:text-brand-teal">Vidas que acompañamos</p>
            <h2 id="titulo-galeria" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Pequeñas historias.<br /><span className="text-brand-teal-dark dark:text-brand-teal">Grandes compañeros.</span></h2>
            <p id="galeria-ayuda" className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">Conoce a algunos de nuestros pacientes y lo que hace único su cuidado. Desliza para descubrir sus historias.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Paciente anterior" className={controlClass}><ArrowLeft aria-hidden /></button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Paciente siguiente" className={controlClass}><ArrowRight aria-hidden /></button>
          </div>
        </div>

        <div ref={viewport} role="region" aria-roledescription="carrusel" aria-label="Historias de nuestros pacientes" aria-describedby="galeria-ayuda" tabIndex={0}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
          onScroll={event => { const track = event.currentTarget; let nearest = 0; let distance = Infinity; cards.current.forEach((card, index) => { if (!card) return; const delta = Math.abs(card.offsetLeft - track.scrollLeft); if (delta < distance) { nearest = index; distance = delta; } }); setActive(nearest); }}
          onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); goTo(event.key === "Home" ? 0 : event.key === "End" ? total - 1 : Math.max(0, Math.min(total - 1, active + (event.key === "ArrowRight" ? 1 : -1)))); }}>
          {gallerySlides.map((slide, index) => {
            const [name, title] = slide.title.split(" · ");
            return (
              <article key={slide.id} ref={element => { cards.current[index] = element; }} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${total}: ${name}`} className="flex min-w-0 basis-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card sm:basis-[65%] lg:basis-[42%]">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button type="button" aria-label={`Ampliar imagen de ${name}`} className="group relative block w-full overflow-hidden bg-brand-navy-deep text-left">
                      <div className="relative aspect-[4/3] sm:aspect-[3/2]"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 500px" draggable={false} className="object-cover object-[50%_30%]" /></div>
                      <span className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" aria-hidden />
                      <span className="absolute bottom-5 left-5 text-3xl font-extrabold tracking-tight text-white sm:left-6 sm:text-4xl">{name}</span>
                      <span className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white group-hover:bg-black/70"><Maximize2 className="size-5" aria-hidden /></span>
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/80" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-[91] flex max-h-[94dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-4"><Dialog.Title className="text-lg font-bold">{slide.title}</Dialog.Title><Dialog.Close aria-label="Cerrar imagen ampliada" className={controlClass}><X aria-hidden /></Dialog.Close></div>
                      <div className="relative h-[55dvh] min-h-40 shrink-0"><Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 90vw, 850px" className="object-contain" /></div>
                      <Dialog.Description className="text-sm leading-relaxed text-muted-foreground">{slide.description}</Dialog.Description>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-dark dark:text-brand-teal">{slide.tag}</p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{slide.description}</p>
                  <span aria-hidden className="mt-6 block h-0.5 w-10 rounded-full bg-brand-teal" />
                </div>
              </article>
            );
          })}
          <div aria-hidden className="basis-[calc(12%-1.25rem)] shrink-0 sm:basis-[calc(35%-1.5rem)] lg:basis-[calc(58%-1.5rem)]" />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p aria-live="polite" aria-atomic="true" className="sr-only">Paciente {active + 1} de {total}: {gallerySlides[active].title}</p>
            <span aria-hidden className="text-xs font-semibold tabular-nums text-muted-foreground">0{active + 1} / 0{total}</span>
            <div className="flex">{gallerySlides.map((slide, index) => <button key={slide.id} type="button" aria-label={`Ver historia de ${slide.title.split(" · ")[0]}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} className="flex h-11 w-9 items-center px-1"><span className={`h-1 w-full rounded-full ${active === index ? "bg-brand-teal-dark dark:bg-brand-teal" : "bg-border"}`} /></button>)}</div>
          </div>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-teal-dark underline underline-offset-4 dark:text-brand-teal"><Instagram className="size-4" aria-hidden />Más historias en Instagram</a>
        </div>
      </div>
    </section>
  );
}
