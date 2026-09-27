import { CheckCircle2, CalendarCheck } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site";

export const seniorPlans = [
  { name: "Senior Integral", description: "Mascotas que necesitan complementar su valoración con estudios de laboratorio indicados por la doctora.", price: 95000, regular: 110000, services: ["Consulta geriátrica integral", "Hemograma completo", "Perfil bioquímico geriátrico"], note: "Estudios según la indicación de la doctora. Entrega de resultados coordinada.", featured: false },
  { name: "Senior Esencial", description: "Mascotas que comienzan su cuidado senior y necesitan una valoración con control de evolución.", price: 50000, regular: 60000, services: ["Consulta geriátrica integral", "Consulta de seguimiento"], note: "Control dentro de los 15 días posteriores a la primera consulta.", featured: true },
  { name: "Senior Acompañamiento", description: "Familias que buscan seguimiento presencial y un espacio adicional de consulta virtual.", price: 65000, regular: 75000, services: ["Consulta geriátrica integral", "Consulta de seguimiento", "Seguimiento virtual"], note: "Control presencial dentro de los 15 días posteriores a la primera consulta.", featured: false },
];
const money = (value: number) => "₡" + value.toLocaleString("es-CR");
export function SeniorProgram() {
  return (
    <section id="programa-senior" aria-labelledby="titulo-planes" className="bg-brand-sand py-12 sm:py-16 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-teal-dark dark:text-brand-teal">Cuidado continuo, con ahorro</p>
          <h2 id="titulo-planes" className="mt-3 text-3xl font-extrabold sm:text-4xl">Planes para su edad dorada</h2>
          <p className="mt-4 text-muted-foreground">Elige un conjunto de atenciones pensado para tu mascota. Un precio por paquete, sin mensualidades ni cobros automáticos.</p>
        </div>
        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {seniorPlans.map(plan => (
            <article key={plan.name} className={`relative flex flex-col rounded-3xl border p-7 ${plan.featured ? "border-brand-teal bg-[#0d3b66] text-white shadow-xl ring-1 ring-brand-teal lg:-translate-y-3" : "border-border bg-card text-foreground"}`}>
              {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gold px-4 py-1 text-xs font-extrabold text-[#0d3b66]">EL MÁS ELEGIDO</span>}
              <h3 className="text-2xl font-extrabold">{plan.name}</h3>
              <p className={`mt-3 min-h-24 text-sm leading-relaxed ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}><span className={`mb-1 block text-xs font-bold uppercase tracking-wider ${plan.featured ? "text-brand-gold" : "text-brand-teal-dark dark:text-brand-teal"}`}>Pensado para</span>{plan.description}</p>
              <p className="mt-6 text-sm"><span className="sr-only">Precio por separado: </span><del>{money(plan.regular)}</del> por separado</p>
              <p className={`mt-1 text-4xl font-extrabold ${plan.featured ? "text-brand-gold" : "text-brand-navy dark:text-foreground"}`}>{money(plan.price)}<span className={`ml-1 text-sm font-normal ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}>/paquete</span></p>
              <p className={`mt-3 self-start rounded-full px-3 py-1 text-sm font-bold ${plan.featured ? "bg-white/10 text-brand-gold" : "bg-brand-teal-soft dark:bg-accent text-accent-foreground"}`}>Ahorras {money(plan.regular - plan.price)}</p>
              <ul className="my-7 flex-1 space-y-4">{plan.services.map(service => <li key={service} className="flex gap-3 text-sm"><CheckCircle2 className={`size-5 shrink-0 ${plan.featured ? "text-brand-gold" : "text-brand-teal"}`} aria-hidden />{service}</li>)}</ul>
              <p className={`mb-6 min-h-12 text-xs leading-relaxed ${plan.featured ? "text-white/75" : "text-muted-foreground"}`}>{plan.note}</p>
              <a href={buildWhatsAppUrl(`Hola Dra. Junibeth, quiero consultar por el plan ${plan.name} de ${money(plan.price)} a domicilio.`)} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 font-bold ${plan.featured ? "border-brand-gold bg-brand-gold text-[#0d3b66]" : "border-brand-teal text-brand-teal-dark dark:text-brand-teal"}`}><CalendarCheck className="size-5" aria-hidden />Consultar este plan<span className="sr-only"> {plan.name}</span></a>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-muted-foreground">Medicamentos y atenciones adicionales se cotizan por separado. La doctora confirma cobertura y pertinencia del plan antes de coordinar.</p>
      </div>
    </section>
  );
}
