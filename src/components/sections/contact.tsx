import { Clock, MessageCircle, Home } from "lucide-react";
import { site } from "@/lib/site";
import { OpenNowBadge } from "@/components/sections/open-now-badge";
export function Contact() {
  return <section id="contacto" aria-labelledby="titulo-contacto" className="py-16"><div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2">
    <div className="rounded-3xl border bg-card p-6 sm:p-8"><Home className="size-7 text-brand-teal" aria-hidden /><h2 id="titulo-contacto" className="mt-4 text-2xl font-bold">El cuidado llega a tu hogar</h2><p className="mt-3 text-muted-foreground">{site.coverage}. Comparte tu cantón y distrito para coordinar la visita.</p><p className="mt-3 text-sm text-muted-foreground">Atención a domicilio con cita, coordinada directamente con la Dra. Junibeth.</p><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-teal-dark px-5 font-bold text-white"><MessageCircle className="size-5" aria-hidden />Consultar cobertura</a></div>
    <div className="rounded-3xl border bg-card p-6 sm:p-8"><h3 className="flex items-center gap-2 text-xl font-bold"><Clock className="size-6 text-brand-teal" aria-hidden />Horarios de consulta</h3><div className="mt-4"><OpenNowBadge /></div><dl className="mt-5 space-y-4">{site.hours.map(h => <div key={h.days} className="flex flex-wrap justify-between gap-2 border-b pb-3 text-sm"><dt className="font-semibold">{h.days}</dt><dd className="text-muted-foreground">{h.time}</dd></div>)}</dl><p className="mt-4 text-sm text-muted-foreground">Fecha y hora sujetas a coordinación por WhatsApp.</p></div>
  </div></section>;
}
