import { Clock, Mail, Map, MapPin, MessageCircle, Navigation, Phone, Siren } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";
import { OpenNowBadge } from "@/components/sections/open-now-badge";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="titulo-contacto" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Información principal */}
          <Reveal className="lg:col-span-2">
            <div className="grid h-full gap-6 md:grid-cols-2">
              <div className="rounded-3xl border bg-card p-7">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-brand-navy dark:text-foreground">
                  <MapPin className="h-5 w-5 text-brand-teal" aria-hidden />
                  Visítanos
                </h3>
                <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">{site.legalName}</strong>
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region},{" "}
                  {site.address.countryName}
                  <br />
                  Código postal {site.address.postalCode}
                </address>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${site.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal-dark focus-visible:outline-2 dark:text-foreground"
                    aria-label="Abrir la ubicación de LONGIVET en Google Maps"
                  >
                    <Map className="h-4 w-4" aria-hidden />
                    Google Maps
                  </a>
                  <a
                    href={`https://waze.com/ul?q=${site.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal-dark focus-visible:outline-2 dark:text-foreground"
                    aria-label="Abrir la ruta hacia LONGIVET en Waze"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Waze
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border bg-card p-7">
                <h3 className="flex flex-wrap items-center gap-2 text-lg font-extrabold text-brand-navy dark:text-foreground">
                  <Clock className="h-5 w-5 text-brand-teal" aria-hidden />
                  Horarios de consulta
                  <OpenNowBadge className="ml-auto" />
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                      <dt className="font-semibold text-foreground">{h.days}</dt>
                      <dd className="text-right text-muted-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 rounded-xl bg-brand-teal-soft p-3 text-xs leading-relaxed text-accent-foreground">
                  Las urgencias se atienden todos los días del año mediante la
                  línea de guardia.
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="grid gap-3 sm:grid-cols-3">
                  <a
                    href={site.phoneHref}
                    className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border bg-card px-4 text-sm font-bold text-brand-navy transition hover:border-brand-teal focus-visible:outline-2 dark:text-foreground"
                    aria-label={`Llamar al ${site.phone}`}
                  >
                    <Phone className="h-4 w-4 text-brand-teal" aria-hidden />
                    {site.phone}
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border bg-card px-4 text-sm font-bold text-brand-navy transition hover:border-brand-teal focus-visible:outline-2 dark:text-foreground"
                    aria-label="Escribir a LONGIVET por WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-emerald" aria-hidden />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border bg-card px-4 text-sm font-bold text-brand-navy transition hover:border-brand-teal focus-visible:outline-2 dark:text-foreground"
                    aria-label={`Enviar correo a ${site.email}`}
                  >
                    <Mail className="h-4 w-4 text-brand-gold" aria-hidden />
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tarjeta de urgencias */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border-2 border-brand-coral/50 bg-brand-coral/5 p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral">
                <Siren className="h-6 w-6 text-white" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-brand-coral">
                ¿Es una urgencia?
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">
                No uses el formulario: llámanos directamente. Evaluamos el caso
                por teléfono en menos de 2 minutos y te guiamos durante el
                traslado (respiración, temperatura, inmovilización).
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span aria-hidden>•</span> Dificultad respiratoria o colapso
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>•</span> Convulsiones o inconsciencia
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>•</span> No orina, abdomen distendido
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>•</span> Intoxicación o traumatismo fuerte
                </li>
              </ul>
              <a
                href={site.emergencyPhoneHref}
                className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-coral px-6 text-base font-extrabold text-white shadow-lg shadow-brand-coral/30 transition hover:bg-brand-coral-dark focus-visible:outline-2"
                aria-label={`Llamar ahora mismo a la línea de urgencias al ${site.emergencyPhone}`}
              >
                <Phone className="h-5 w-5" aria-hidden />
                {site.emergencyPhone}
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Línea de guardia activa 24/7 · 365 días
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
