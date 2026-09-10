import Image from "next/image";
import { CalendarCheck, HeartPulse, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

const microStats = [
  { value: "+12", label: "años de experiencia" },
  { value: "8.500+", label: "pacientes atendidos" },
  { value: "4,9", label: "estrellas (412 reseñas)", icon: true },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-inicio"
      className="relative overflow-hidden"
    >
      {/* Fondos decorativos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-brand-teal-soft/80 blur-3xl dark:bg-brand-teal/10" />
        <div className="absolute top-64 -left-40 h-[380px] w-[380px] rounded-full bg-brand-sand-deep/80 blur-3xl dark:bg-brand-navy-deep/20" />
        <div className="patron-puntos absolute top-24 left-1/2 hidden h-72 w-72 text-brand-teal/20 lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 md:pt-16 md:pb-24 lg:grid-cols-2 lg:gap-8">
        {/* Columna de mensaje */}
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              <Sparkles className="h-4 w-4" aria-hidden />
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="titulo-inicio"
              className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-brand-navy sm:text-5xl xl:text-6xl dark:text-foreground"
            >
              Longevidad, salud y cariño para la{" "}
              <span className="texto-marca">edad dorada</span> de tu mascota
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Medicina geriátrica basada en evidencia: detección temprana, manejo
              experto del dolor y planes de cuidado pensados para que tus mejores
              años juntos sean también los más cómodos.
            </p>
          </Reveal>

          {/* Ruta dual (Ley de Hick): planificar vs. urgencia */}
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#agendar"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-teal-dark px-7 text-base font-bold text-white shadow-lg shadow-brand-teal/25 transition hover:bg-brand-teal focus-visible:outline-2"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden />
                Agendar cita
              </a>
              <a
                href={site.emergencyPhoneHref}
                aria-label={`Llamar ahora a urgencias 24/7 al ${site.emergencyPhone}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-brand-coral bg-card px-7 text-base font-bold text-brand-coral transition hover:bg-brand-coral hover:text-white dark:bg-transparent"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Urgencias 24/7
              </a>
            </div>
          </Reveal>

          {/* Indicadores de confianza */}
          <Reveal delay={0.32}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6">
              {microStats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex items-center gap-1.5 text-xl font-extrabold text-brand-navy dark:text-foreground">
                    {s.value}
                    {s.icon && (
                      <Star
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                        aria-hidden
                      />
                    )}
                  </dd>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Columna visual */}
        <Reveal delay={0.15} className="relative">
          <div aria-hidden className="absolute -top-10 -right-10 h-40 w-40 rotate-12 rounded-[2rem] bg-brand-teal-soft/80 md:h-56 md:w-56" />
          <div aria-hidden className="absolute -bottom-12 -left-12 h-44 w-44 -rotate-6 rounded-[2rem] bg-brand-sand-deep/80 md:h-64 md:w-64" />

          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border">
            <Image
              src="/images/hero-senior-dog.png"
              alt="Veterinaria de LONGIVET examinando con delicadeza a un golden retriever senior de hocico canoso en la mesa de consulta"
              width={1344}
              height={768}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-navy/25 via-transparent to-transparent" />
          </div>

          {/* Tarjetas flotantes */}
          <div className="absolute -top-4 -left-2 animate-[floaty_6s_ease-in-out_infinite] rounded-2xl bg-card/95 p-3.5 shadow-xl ring-1 ring-border backdrop-blur sm:left-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal-soft">
                <HeartPulse className="h-5 w-5 text-brand-teal-dark" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-navy dark:text-foreground">
                  Chequeo geriátrico 7+
                </p>
                <p className="text-xs text-muted-foreground">Plan personalizado por especie</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 right-2 animate-[floaty_7s_ease-in-out_infinite_reverse] rounded-2xl bg-card/95 p-3.5 shadow-xl ring-1 ring-border backdrop-blur sm:right-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/20">
                <ShieldCheck className="h-5 w-5 text-brand-gold" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-navy dark:text-foreground">
                  Dolor bajo control
                </p>
                <p className="text-xs text-muted-foreground">Protocolos libres de estrés</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
