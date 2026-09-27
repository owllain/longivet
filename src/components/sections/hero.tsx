import Image from "next/image";
import { HeartPulse, Sparkles } from "lucide-react";
import { WhatsappIcon } from "@/components/layout/mobile-sticky-bar";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";



export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-inicio"
      className="relative overflow-hidden"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 md:pt-16 md:pb-24 lg:grid-cols-2 lg:gap-8">
        {/* Columna de mensaje */}
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              <Sparkles className="h-4 w-4" aria-hidden />
              Cuidado especializado para mascotas mayores
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="titulo-inicio"
              className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-brand-navy sm:text-5xl xl:text-6xl dark:text-foreground"
            >
              Medicina geriátrica veterinaria <span className="texto-marca">a domicilio</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Ayudamos a tu mascota mayor a vivir con más comodidad: detección temprana, manejo del dolor y cuidado personalizado en tu hogar, en Cartago y San José.
            </p>
          </Reveal>

          {/* Contacto directo y tarifas */}
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={site.whatsappHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-teal-dark px-4 text-sm font-bold text-white shadow-lg shadow-brand-teal/25 transition hover:bg-brand-teal focus-visible:outline-2 sm:h-14 sm:px-7 sm:text-base"
              >
                <WhatsappIcon className="h-5 w-5" />
                Agendar por WhatsApp
              </a>
              <a href="#tarifas" className="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-brand-navy underline decoration-brand-teal/40 underline-offset-4 hover:decoration-current dark:text-foreground">Ver tarifas</a>
            </div>
          </Reveal>

        </div>

        {/* Columna visual */}
        <Reveal delay={0.15} className="relative">

          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border">
            <Image
              src="/images/asset (1).png"
              alt="Dra. Junibeth González Ramírez acompañando a un paciente"
              width={1114}
              height={1411}
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] max-h-[580px] w-full object-cover object-top"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-navy/25 via-transparent to-transparent" />
          </div>

          {/* Tarjeta de atención senior */}
          <div className="absolute -top-4 left-2 max-w-[calc(100%-1rem)] rounded-2xl bg-card p-3.5 shadow-xl ring-1 ring-border sm:left-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal-soft">
                <HeartPulse className="h-5 w-5 text-brand-teal-dark" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-navy dark:text-foreground">
                  Chequeo geriátrico 7+
                </p>
                <p className="max-w-52 text-xs text-muted-foreground">Atención y seguimiento especializado para cada paciente</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
