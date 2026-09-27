import { ClipboardList, Home, MessageCircle, BadgeCheck, GraduationCap } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site";

export function TrustOverview() {
  return (
    <section aria-label="Tu veterinaria y la experiencia de sus pacientes" className="border-y bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-lg font-bold text-brand-navy dark:text-foreground">Dra. Junibeth González Ramírez</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><BadgeCheck className="size-5 text-brand-teal-dark dark:text-brand-teal" aria-hidden />Colegiada #002640</li>
            <li className="flex items-center gap-2"><GraduationCap className="size-5 text-brand-teal-dark dark:text-brand-teal" aria-hidden />Diplomado en Geriatría</li>
            <li>+6 años de experiencia</li>
          </ul>
          <a href="#equipo" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-brand-teal-dark underline underline-offset-4 dark:text-brand-teal">Conoce a tu veterinaria</a>
        </div>
        <figure className="border-l-2 border-brand-teal pl-5">
          <blockquote className="text-base leading-relaxed">«Verlo volver a perseguir su ratoncito a los 12 años no tiene precio.»</blockquote>
          <figcaption className="mt-2 text-sm text-muted-foreground">Ivannia G. · familia de Miko</figcaption>
          <a href="#historias" className="mt-1 inline-flex min-h-11 items-center text-sm font-bold text-brand-teal-dark underline underline-offset-4 dark:text-brand-teal">Leer las historias de las familias</a>
        </figure>
      </div>
    </section>
  );
}

export function VisitOverview() {
  const steps = [
    { Icon: MessageCircle, title: "Antes: coordinamos contigo", text: "Comparte tu cantón, distrito y el motivo de consulta. La doctora confirma cobertura, presupuesto, horario y cómo preparar la visita." },
    { Icon: Home, title: "Durante: valoramos a tu mascota", text: "La consulta se realiza en un espacio tranquilo de tu hogar. La doctora revisa los antecedentes y los cambios que has observado para valorar sus necesidades." },
    { Icon: ClipboardList, title: "Después: acordamos su cuidado", text: "Conversamos sobre las indicaciones y los siguientes pasos. Si necesita exámenes o seguimiento, se coordinan contigo y se cotizan según el servicio o plan elegido." },
  ];
  return (
    <section id="visita" aria-labelledby="titulo-visita" className="bg-brand-teal-soft/50 py-12 sm:py-16 dark:bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="titulo-visita" className="text-3xl font-extrabold text-brand-navy sm:text-4xl dark:text-foreground">Así es una visita en casa</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Atención cercana, con cada paso explicado y acordado contigo.</p>
        <ol className="mt-7 grid gap-5 md:grid-cols-3">
          {steps.map(({ Icon, title, text }, index) => <li key={title} className="rounded-2xl border bg-card p-6"><div className="mb-4 flex items-center gap-3 text-brand-teal-dark dark:text-brand-teal"><Icon className="size-6" aria-hidden /><span className="text-sm font-bold">0{index + 1}</span></div><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></li>)}
        </ol>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Cartago, San José y zonas cercanas.</strong> Consulta si tu ubicación implica un costo adicional de traslado. Confirma el total antes de acordar la cita. Pagos por SINPE Móvil o transferencia.</p>
          <a href={buildWhatsAppUrl("Hola Dra. Junibeth, quisiera confirmar cobertura y el costo total de una visita, incluido el traslado si corresponde. Mi cantón y distrito son: ")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-brand-teal-dark px-5 py-3 text-center text-sm font-bold text-white">Consultar cobertura y costo</a>
        </div>
      </div>
    </section>
  );
}
