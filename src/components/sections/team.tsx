import Image from "next/image";
import { Award, CheckCircle2, GraduationCap, HeartHandshake, IdCard, Quote } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const equipoColaborador = [
  {
    iniciales: "JG",
    nombre: "Dra. Junibeth González Ramírez",
    cargo: "Doctora Veterinaria con enfasis en Geriatría",
    credenciales: [
      "Diplomado en Geriatría para animales domesticos",
      "Protocolos Fear Free y analgesia multimodal del dolor crónico",
    ],
    registro: "CMVCR",
    gradiente: "from-brand-navy to-brand-teal",
  },
  {
    iniciales: "JG",
    nombre: "Dra. Junibeth González Ramírez",
    cargo: "Dirección Clínica y Acompañamiento Senior",
    credenciales: [
      "Evaluación integral geriátrica, movilidad y calidad de vida",
      "Planes personalizados de nutrición y cuidados paliativos",
    ],
    registro: "CMVCR",
    gradiente: "from-brand-teal-dark to-brand-navy",
  },
];

export function Team() {
  return (
    <section id="equipo" aria-labelledby="titulo-equipo" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-accent-foreground dark:bg-accent">
            <GraduationCap className="h-4 w-4" aria-hidden />
            Sobre la Dirección Médica y Enfoque
          </p>
          <h2
            id="titulo-equipo"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            Vocación y rigor para la <span className="texto-marca">edad dorada</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conoce la visión y liderazgo médico detrás de cada protocolo, diagnóstico y plan de bienestar geriátrico.
          </p>
        </Reveal>

        {/* ── Tarjeta Destacada ABOUT: Dra. Junibeth González con main-logo.jpeg ── */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl ring-1 ring-black/5 transition-all hover:shadow-2xl">
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
              {/* Logo principal oficial */}
              <div className="flex justify-center lg:col-span-5">
                <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border-2 border-brand-teal/20 bg-[#FAF7F2] p-3 shadow-xl ring-4 ring-brand-teal/10">
                  <Image
                    src="/images/main-logo.jpeg"
                    alt="Dra. Junibeth González Ramírez — Doctora Veterinaria con enfasis en Geriatría"
                    width={500}
                    height={500}
                    priority
                    className="size-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              {/* Información About de la Dra. Junibeth */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal-dark dark:text-brand-teal">
                  <Award className="size-3.5" aria-hidden />
                  Fundadora & Dirección Clínica
                </div>
                <h3 className="mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl lg:text-4xl dark:text-foreground">
                  Dra. Junibeth González Ramírez
                </h3>
                <p className="mt-1 text-base font-bold text-brand-teal-dark dark:text-brand-teal">
                  Doctora Veterinaria con enfasis en Geriatría
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Dedicada con profunda vocación al acompañamiento integral de perros y gatos en su etapa senior. Nuestro modelo de atención conjuga el rigor diagnóstico, el alivio del dolor crónico y una calidez empática que transforma la experiencia médica tanto para la mascota como para su familia.
                </p>

                {/* Puntos clave */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-accent/40 p-3.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
                    <div className="text-xs">
                      <strong className="block font-bold text-foreground">Manejo Compasivo del Dolor</strong>
                      <span className="text-muted-foreground">Analgesia multimodal para artritis y columna</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-accent/40 p-3.5">
                    <HeartHandshake className="mt-0.5 size-4 shrink-0 text-brand-teal" aria-hidden />
                    <div className="text-xs">
                      <strong className="block font-bold text-foreground">Protocolos Fear Free</strong>
                      <span className="text-muted-foreground">Espacios de baja ansiedad adaptados al paciente mayor</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <IdCard className="size-4 text-brand-gold" aria-hidden />
                    Médica Veterinaria Colegiada
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="size-4 text-brand-teal" aria-hidden />
                    Diplomado en Geriatría para animales domesticos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Especialistas de apoyo */}
        <div className="mt-12">
          <h4 className="text-center text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Equipo médico de apoyo especializado
          </h4>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {equipoColaborador.map((m, i) => (
              <Reveal as="li" key={`${m.nombre}-${i}`} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl">
                  <Quote
                    aria-hidden
                    className="absolute -top-3 -right-3 h-20 w-20 text-brand-teal-soft transition group-hover:scale-110"
                  />
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.gradiente} text-lg font-extrabold text-white shadow-lg`}
                    role="img"
                    aria-label={`Perfil de ${m.nombre}`}
                  >
                    {m.iniciales}
                  </span>
                  <h5 className="mt-4 text-xl font-extrabold text-brand-navy dark:text-foreground">
                    {m.nombre}
                  </h5>
                  <p className="mt-1 text-sm font-bold text-brand-teal-dark dark:text-brand-teal">
                    {m.cargo}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {m.credenciales.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                    <IdCard className="h-4 w-4 text-brand-gold" aria-hidden />
                    Colegiada N.º {m.registro}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
