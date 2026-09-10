import Image from "next/image";
import { BadgeCheck, CalendarCheck, Cat, Dog, Info, PawPrint } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const criteriosSenior = [
  {
    icon: Dog,
    texto: "Perros pequeños y medianos: a partir de los 7 años",
  },
  {
    icon: PawPrint,
    texto: "Perros grandes y gigantes: a partir de los 5 años",
  },
  {
    icon: Cat,
    texto: "Gatos: a partir de los 10 años (¡pero revisiones desde los 7!)",
  },
];

const planes = [
  {
    nombre: "Senior Esencial",
    precio: "₡29.900",
    periodo: "/mes",
    desc: "El cuidado básico bien hecho para empezar la etapa senior con pie derecho.",
    features: [
      "Chequeo geriátrico semestral",
      "1 vacuna anual incluida",
      "Perfil básico de laboratorio (1 vez al año)",
      "5 % de descuento en farmacia",
    ],
    destacado: false,
  },
  {
    nombre: "Senior Integral",
    precio: "₡49.900",
    periodo: "/mes",
    desc: "Nuestro plan insignia: prevención activa y detección temprana todo el año.",
    features: [
      "Todo lo del plan Esencial",
      "Perfil geriátrico de laboratorio 2 veces al año",
      "Evaluación de movilidad y dolor trimestral",
      "10 % de descuento en farmacia y alimento",
      "Teleconsulta de seguimiento incluida",
    ],
    destacado: true,
  },
  {
    nombre: "Senior Áureo",
    precio: "₡79.900",
    periodo: "/mes",
    desc: "Cuidado de Time de lujo para compañeros con necesidades avanzadas.",
    features: [
      "Todo lo del plan Integral",
      "Sesión mensual de fisioterapia o láser",
      "1 visita a domicilio al mes",
      "Prioridad en agenda y hospitalización",
      "15 % de descuento en todo el catálogo",
    ],
    destacado: false,
  },
];

export function SeniorProgram() {
  return (
    <section
      id="programa-senior"
      aria-labelledby="titulo-programa"
      className="relative overflow-hidden bg-brand-sand py-20 md:py-24 dark:bg-background"
    >
      <div
        aria-hidden
        className="patron-puntos absolute top-10 right-8 hidden h-64 w-64 text-brand-teal/15 lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-semibold text-accent-foreground ring-1 ring-border">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            Programa LONGIVET 7+
          </p>
          <h2
            id="titulo-programa"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            El programa de salud para la <span className="texto-marca">edad dorada</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Membresías mensuales sin contratos forzosos: medicina preventiva
            programada que alarga y mejora los años de vida de tu compañero.
          </p>
        </Reveal>

        {/* ¿Cuándo es senior? */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-5">
          <Reveal className="relative lg:col-span-2">
            <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-border">
              <Image
                src="/images/senior-comfort.png"
                alt="Perro labrador senior descansando plácidamente en una cama ortopédica en un hogar luminoso"
                width={1152}
                height={864}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl bg-card p-4 shadow-lg ring-1 ring-border">
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                <span>
                  <strong className="text-brand-navy dark:text-foreground">
                    ¿Cuándo es «senior» mi mascota?
                  </strong>{" "}
                  Depende de su especie y tamaño:
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ul className="grid gap-3">
              {criteriosSenior.map((c) => (
                <li
                  key={c.texto}
                  className="flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border transition hover:ring-brand-teal/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal-soft">
                    <c.icon className="h-5 w-5 text-brand-teal-dark" aria-hidden />
                  </span>
                  <p className="font-semibold text-brand-navy dark:text-foreground">{c.texto}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl border border-brand-gold/40 bg-brand-gold/10 p-4 text-sm leading-relaxed text-foreground">
              <strong>Recomendación clínica:</strong> a partir de la edad senior,
              las revisiones deben ser <strong>cada 6 meses</strong>. Muchas
              enfermedades (riñón, corazón, artritis) avanzan en silencio y solo
              se detectan con laboratorio y exploración especializada.
            </p>
          </Reveal>
        </div>

        {/* Planes */}
        <ul className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {planes.map((p, i) => (
            <Reveal as="li" key={p.nombre} delay={i * 0.08} className={p.destacado ? "lg:-my-3" : ""}>
              <div
                className={
                    p.destacado
                      ? "relative flex h-full flex-col rounded-3xl bg-primary p-7 text-white shadow-2xl ring-2 ring-brand-teal dark:bg-brand-navy"
                      : "relative flex h-full flex-col rounded-3xl bg-card p-7 ring-1 ring-border transition hover:shadow-lg"
                  }
                >
                  {p.destacado && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-xs font-extrabold tracking-wide text-brand-navy uppercase">
                      El más elegido
                    </span>
                  )}
                  <h3
                    className={
                      p.destacado
                        ? "text-xl font-extrabold text-white"
                        : "text-xl font-extrabold text-brand-navy dark:text-foreground"
                    }
                  >
                    {p.nombre}
                  </h3>
                  <p
                    className={
                      p.destacado
                        ? "mt-1 text-sm text-white/70"
                        : "mt-1 text-sm text-muted-foreground"
                    }
                  >
                    {p.desc}
                  </p>
                  <p className="mt-5 flex items-baseline gap-1">
                    <span
                      className={
                        p.destacado
                          ? "text-4xl font-extrabold text-brand-gold"
                          : "text-4xl font-extrabold text-brand-navy dark:text-foreground"
                      }
                    >
                      {p.precio}
                    </span>
                    <span className={p.destacado ? "text-white/60" : "text-muted-foreground"}>
                      {p.periodo}
                    </span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <BadgeCheck
                          className={p.destacado ? "mt-0.5 h-4 w-4 shrink-0 text-brand-gold" : "mt-0.5 h-4 w-4 shrink-0 text-brand-teal"}
                          aria-hidden
                        />
                        <span className={p.destacado ? "text-white/85" : "text-muted-foreground"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#agendar"
                    className={
                      p.destacado
                        ? "mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gold text-sm font-extrabold text-brand-navy transition hover:brightness-105 focus-visible:outline-2"
                        : "mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-teal text-sm font-extrabold text-brand-teal-dark transition hover:bg-brand-teal-dark hover:text-white focus-visible:outline-2 dark:text-brand-teal dark:hover:text-white"
                    }
                    aria-label={`Empezar con el plan ${p.nombre}`}
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden />
                    Empezar ahora
                  </a>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Sin contratos forzosos · Pausa o cancela cuando quieras · Precios en colones, IVA incluido
        </p>
      </div>
    </section>
  );
}
