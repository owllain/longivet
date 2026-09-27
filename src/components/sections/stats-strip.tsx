"use client";

import { Heart, Instagram, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";
import { WhatsappIcon } from "@/components/layout/mobile-sticky-bar";

export function StatsStrip() {
  return (
    <section
      aria-label="Comunidad de apoyo y cuidado geriátrico"
      className="relative overflow-hidden bg-gradient-to-r from-brand-navy-deep via-brand-navy to-[#124252] py-10 text-white shadow-inner"
    >
      <div
        aria-hidden
        className="patron-puntos absolute inset-0 text-white/5 pointer-events-none"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Mensaje de apoyo a la vejez animal */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <Sparkles className="size-3.5" aria-hidden />
                Honramos sus años dorados
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Sus años dorados, con el cuidado que merecen en casa
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                La vejez merece dignidad, adaptación y cariño. Llevamos la atención geriátrica hasta tu hogar y acompañamos a tu familia con un plan de cuidado pensado para cada paciente.
              </p>

              {/* Pilares de apoyo */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15">
                  <Heart className="size-3.5 text-rose-300" aria-hidden />
                  Empatía y confort
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15">
                  <ShieldCheck className="size-3.5 text-brand-emerald" aria-hidden />
                  Manejo del dolor
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15">
                  <Sparkles className="size-3.5 text-brand-gold" aria-hidden />
                  Bienestar integral
                </span>
              </div>
            </Reveal>
          </div>

          {/* Tarjetas de comunidad: Instagram y WhatsApp */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {/* Tarjeta WhatsApp */}
            <Reveal delay={0.1}>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir WhatsApp para orientación geriátrica personalizada"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-950/50 hover:shadow-xl hover:shadow-emerald-950/40 focus-visible:outline-white"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/40 transition group-hover:scale-110">
                      <WhatsappIcon className="size-6 text-emerald-400" />
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                      Contacto directo
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Hablemos de tu próxima visita
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">
                    Cuéntanos la edad de tu mascota y tu zona. La Dra. Junibeth coordinará contigo la atención a domicilio.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-300 group-hover:underline">
                  <MessageCircle className="size-3.5" aria-hidden />
                  Iniciar conversación
                </div>
              </a>
            </Reveal>

            {/* Tarjeta Instagram */}
            <Reveal delay={0.2}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Instagram para seguir la comunidad de cuidado senior"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-pink-500/30 bg-pink-950/25 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-pink-400/60 hover:bg-pink-950/40 hover:shadow-xl hover:shadow-pink-950/30 focus-visible:outline-white"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400 ring-1 ring-pink-400/40 transition group-hover:scale-110">
                      <Instagram className="size-6 text-pink-400" aria-hidden />
                    </span>
                    <span className="rounded-full bg-pink-500/20 px-2.5 py-0.5 text-[11px] font-bold text-pink-300">
                      @paquito_zagua
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    Comunidad en Instagram
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">
                    Acompaña a nuestra comunidad y conoce las historias detrás de nuestros pacientes.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-pink-300 group-hover:underline">
                  <Instagram className="size-3.5" aria-hidden />
                  Seguir comunidad
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
