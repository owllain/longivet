"use client";

import Image from "next/image";
import {
  Clock,
  Coffee,
  Instagram,
  Music2,
  Phone,
} from "lucide-react";

import { WhatsappIcon } from "@/components/layout/mobile-sticky-bar";
import { navLinks, site } from "@/lib/site";

const serviciosPie = [
  { label: "Geriatría y medicina senior", href: "#servicios" },
  { label: "Manejo del dolor y movilidad", href: "#servicios" },
  { label: "Medicina interna", href: "#servicios" },
  { label: "Medicina preventiva", href: "#servicios" },
  { label: "Diagnóstico por imagen", href: "#servicios" },
  { label: "Laboratorio clínico", href: "#servicios" },
  { label: "Odontología veterinaria", href: "#servicios" },
  { label: "Cuidado paliativo y duelo", href: "#servicios" },
] as const;

const explorarPie = [
  ...navLinks,
  { label: "Contacto y horarios", href: "#contacto" },
] as const;

const distintivos = ["Colegiada #002640", "Diplomado en Geriatría", "+6 años de experiencia"] as const;

const redesSociales = [
  { label: "Instagram de LONGIVET", href: site.social.instagram, Icon: Instagram },
  { label: "TikTok de LONGIVET", href: site.social.tiktok, Icon: Music2 },
] as const;

const enlacePie =
  "relative inline-flex min-h-11 items-center py-1 text-sm font-medium text-white/80 transition-colors hover:text-white hover:underline underline-offset-4 focus-visible:outline-white";

const tituloColumna =
  "text-xs font-bold uppercase tracking-[0.16em] text-brand-gold";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden bg-brand-navy-deep text-white"
    >
      {/* ── Capas diagonales adaptadas a modo claro y oscuro (sin luces bruscas) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div
          className="absolute inset-0 bg-brand-navy dark:bg-[#071726]"
          style={{ clipPath: "polygon(0 0, 82% 0, 66% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 bg-brand-teal-dark dark:bg-[#0f2e3d]"
          style={{ clipPath: "polygon(0 0, 56% 0, 42% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 bg-brand-teal-soft/40 dark:bg-transparent"
          style={{ clipPath: "polygon(0 0, 30% 0, 18% 100%, 0 100%)" }}
        />
      </div>

      {/* ── Contenido Principal Compacto a lo ancho ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          {/* Columna 1 · Misión y Sello distintivo (Tarjeta Certificada) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-brand-navy/10 bg-brand-sand/95 p-5 sm:p-6 text-brand-navy shadow-lg ring-1 ring-black/5 backdrop-blur-sm dark:border-brand-gold/25 dark:bg-[#0c1f33] dark:text-white">
              <div className="flex items-center gap-4">
                {/* Sello oficial alter-logo */}
                <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-full border-2 border-brand-gold bg-[#FAF7F2] p-1 shadow-xl ring-4 ring-brand-gold/45 transition-transform hover:scale-105">
                  <Image
                    src="/images/alter-logo.jpeg"
                    alt="Sello oficial Dra. Junibeth González Ramírez"
                    width={160}
                    height={160}
                    className="size-full rounded-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <h3 className="mt-1 text-base sm:text-lg font-extrabold tracking-tight text-brand-navy dark:text-white">
                    Dra. Junibeth González
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-dark dark:text-brand-gold/90">
                    Medicina Geriátrica Veterinaria
                  </p>
                  <p className="mt-1 text-xs text-brand-navy/75 dark:text-slate-300">
                    Cuidamos su bienestar durante sus años senior con evidencia, empatía y dedicación personalizada.
                  </p>
                </div>
              </div>

              <ul
                aria-label="Distintivos de LONGIVET"
                className="mt-3.5 flex flex-wrap gap-2 pt-3 border-t border-brand-navy/10 dark:border-white/10"
              >
                {distintivos.map((distintivo) => (
                  <li
                    key={distintivo}
                    className="rounded-full border border-brand-navy/15 bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-brand-navy shadow-xs dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                  >
                    {distintivo}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna 2 · Servicios */}
          <nav aria-label="Servicios" className="lg:col-span-2 sm:col-span-6">
            <h3 className={tituloColumna}>Servicios</h3>
            <ul className="mt-2.5 space-y-1">
              {serviciosPie.map((servicio) => (
                <li key={servicio.label}>
                  <a href={servicio.href} className={enlacePie}>
                    {servicio.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3 · Explora */}
          <nav aria-label="Explorar el sitio" className="lg:col-span-2 sm:col-span-6">
            <h3 className={tituloColumna}>Explora</h3>
            <ul className="mt-2.5 space-y-1">
              {explorarPie.map((enlace) => (
                <li key={enlace.label}>
                  <a href={enlace.href} className={enlacePie}>
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 4 · Contacto y horarios */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className={tituloColumna}>Contacto & Horarios</h3>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <Phone className="size-3.5 text-brand-gold shrink-0" aria-hidden />
                  <a href={site.phoneHref} className="hover:underline hover:text-white">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <WhatsappIcon className="size-3.5 text-brand-emerald shrink-0" />
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[11px] text-white/70">
                  <Clock className="size-3.5 text-brand-gold shrink-0" aria-hidden />
                  <span>Lun–Vie 8:00 a. m.–6:00 p. m. | Sáb 9:00 a. m.–4:00 p. m.</span>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <ul aria-label="Redes sociales" className="flex gap-2">
                {redesSociales.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (se abre en una pestaña nueva)`}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand-navy focus-visible:outline-white"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>


            </div>
          </div>
        </div>
      </div>

      {/* ── Barra inferior legal con créditos ── */}
      <div className="relative z-10 border-t border-white/15 bg-black/15">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-white/70">
          {/* Copyright desplazado hacia la derecha */}
          <p className="sm:ml-8 sm:pl-4 font-medium text-white/80">
            © 2026 {site.legalName} · Atención a domicilio
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
            <li>
              <a
                href="/privacidad"
                className="underline-offset-4 transition-colors hover:text-white hover:underline cursor-pointer"
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                href="/terminos"
                className="underline-offset-4 transition-colors hover:text-white hover:underline cursor-pointer"
              >
                Términos de atención
              </a>
            </li>
          </ul>

          {/* Crédito: Hecho con café por Ing. Enrique Cascante */}
          <p className="inline-flex items-center gap-1.5 text-xs text-white/80">
            Hecho con
            <Coffee
              aria-hidden="true"
              className="size-4 text-amber-400 shrink-0"
            />
            por{" "}
            <a
              href="https://www.linkedin.com/in/enrique-cascante/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white transition-colors hover:text-brand-gold hover:underline underline-offset-4"
            >
              Ing. Enrique Cascante
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
