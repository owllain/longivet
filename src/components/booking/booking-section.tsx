"use client";
import { useState, type FormEvent } from "react";
import { CalendarCheck, ChevronDown, Home, MessageCircle, UserRound, PawPrint, Clock3 } from "lucide-react";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { appointmentServices, buildAppointmentMessage, validateAppointment } from "@/lib/booking";

const control = "mt-2 block min-h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-brand-teal";

export default function BookingSection() {
  const [messageUrl, setMessageUrl] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const problem = validateAppointment(data);
    setError(problem);
    if (problem) return;
    const url = buildWhatsAppUrl(buildAppointmentMessage(data));
    setMessageUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <section id="agendar" aria-labelledby="titulo-agendar" className="bg-brand-sand py-20 dark:bg-card">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-brand-teal-dark dark:text-brand-teal">Tu próxima visita, paso a paso</p>
          <h2 id="titulo-agendar" className="mt-3 text-3xl font-extrabold sm:text-4xl">Agendar una visita a domicilio</h2>
          <p className="mt-4 text-muted-foreground">Escribe directamente a la Dra. Junibeth por WhatsApp para coordinar la visita. Cuéntale sobre tu mascota y la zona donde necesitas la atención.</p>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-teal-dark px-6 font-bold text-white"><MessageCircle className="size-5" aria-hidden />Agendar cita por WhatsApp</a>
        </div>
        <ol className="my-8 grid gap-4 sm:grid-cols-3">
          {[
            { Icon: MessageCircle, title: "1. Cuéntanos sobre tu mascota", text: "Envía tu mensaje y la zona donde necesitas la visita." },
            { Icon: CalendarCheck, title: "2. Coordinamos contigo", text: "Recibirás un mensaje por parte de la doctora para la logística de la atención requerida." },
            { Icon: Home, title: "3. Atención en tu hogar", text: "La doctora confirma contigo la fecha, el horario y las indicaciones para la visita." },
          ].map(({ Icon, title, text }) => <li key={title} className="rounded-2xl border bg-card p-5"><Icon className="mb-3 size-6 text-brand-teal" aria-hidden /><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></li>)}
        </ol>
        <details className="group rounded-3xl border bg-card shadow-sm">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl p-5 font-bold focus-visible:outline-2 focus-visible:outline-brand-teal sm:p-6 [&::-webkit-details-marker]:hidden">
            ¿Prefieres contarnos los detalles antes de escribir?
            <ChevronDown className="size-5 shrink-0 text-brand-teal transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
          </summary>
        <form onSubmit={submit} onChange={() => { setMessageUrl(""); setError(""); }} className="min-w-0 overflow-hidden rounded-b-3xl border-t bg-card">
          <div className="border-b bg-brand-navy px-6 py-7 text-white sm:px-8"><h3 className="text-2xl font-extrabold">Preparemos su próxima visita</h3><p className="mt-2 text-sm text-white/80">Un poco sobre ustedes nos ayuda a organizar una atención más cercana. Los campos con * son obligatorios.</p></div>
          <div className="space-y-7 p-5 sm:p-8">
            <fieldset className="min-w-0 rounded-2xl border bg-background p-5 sm:p-6"><legend className="flex items-center gap-2 px-2 text-lg font-bold"><UserRound className="size-5 text-brand-teal" aria-hidden />01 · Sobre ti</legend><div className="grid gap-5 sm:grid-cols-2">
              <label className="min-w-0 text-sm font-semibold">Tu nombre *<input className={control} name="tutor" autoComplete="name" required maxLength={100} placeholder="¿Cómo te llamas?" /></label>
              <label className="min-w-0 text-sm font-semibold">Zona de la visita *<input className={control} name="zone" placeholder="Cantón y distrito" required maxLength={160} /></label>
            </div><p className="mt-3 text-xs text-muted-foreground">Atendemos en Cartago, San José y zonas cercanas, previa consulta de cobertura.</p></fieldset>
            <fieldset className="min-w-0 rounded-2xl border bg-background p-5 sm:p-6"><legend className="flex items-center gap-2 px-2 text-lg font-bold"><PawPrint className="size-5 text-brand-teal" aria-hidden />02 · Tu mascota</legend><div className="grid gap-5 sm:grid-cols-2">
              <label className="min-w-0 text-sm font-semibold">Nombre de tu mascota *<input className={control} name="pet" required maxLength={100} placeholder="El nombre de tu compañero" /></label>
              <label className="min-w-0 text-sm font-semibold">Especie y edad (opcional)<input className={control} name="speciesAge" placeholder="Ej.: perro, 10 años" maxLength={100} /></label>
              <label className="min-w-0 text-sm font-semibold sm:col-span-2">¿Qué necesita tu mascota? (opcional)<select className={control} name="service" defaultValue=""><option value="">Prefiero comentarlo con la doctora</option>{appointmentServices.map(service => <option key={service}>{service}</option>)}</select></label>
            </div></fieldset>
            <fieldset className="min-w-0 rounded-2xl border bg-background p-5 sm:p-6"><legend className="flex items-center gap-2 px-2 text-lg font-bold"><Clock3 className="size-5 text-brand-teal" aria-hidden />03 · Día y horario</legend>
              <p id="preferencias-ayuda" className="mb-5 text-sm text-muted-foreground">Indica tu preferencia, si ya la tienes. La doctora confirmará la disponibilidad por WhatsApp.</p><div className="grid min-w-0 gap-5 sm:grid-cols-2">
                <label className="min-w-0 text-sm font-semibold">Día preferido (opcional)<input className={control} type="date" name="date" aria-describedby="preferencias-ayuda" /></label>
                <label className="min-w-0 text-sm font-semibold">Hora preferida (opcional)<input className={control} type="time" name="time" aria-describedby="preferencias-ayuda" /></label>
              </div><p className="mt-3 text-xs text-muted-foreground">Lun–vie: 8 a. m.–6 p. m. · Sábados: 9 a. m.–4 p. m.</p>
              <fieldset className="mt-6 min-w-0 border-t pt-5"><legend className="pr-2 text-sm font-bold">Si ese espacio no está disponible</legend><div className="grid gap-5 sm:grid-cols-2">
                <label className="min-w-0 text-sm font-semibold">Franja alternativa<select className={control} name="alternateTime" defaultValue="Sin preferencia"><option>Sin preferencia</option><option>Mañana</option><option>Tarde</option><option>Noche</option></select></label>
                <label className="min-w-0 text-sm font-semibold">Días alternativos<select className={control} name="alternateDays" defaultValue="Sin preferencia"><option>Sin preferencia</option><option>Entresemana</option><option>Fin de semana</option></select></label>
              </div><p className="mt-3 text-xs text-muted-foreground">Las preferencias se consultan con la doctora y no garantizan atención fuera del horario. Las visitas de fin de semana se coordinan para el sábado.</p></fieldset>
            </fieldset>
            <label className="block text-sm font-semibold">Algo más que debamos saber (opcional)<textarea className={control} rows={3} name="notes" maxLength={1200} placeholder="Cuéntanos lo que consideres importante para la visita." /></label>
            <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" required name="consent" className="mt-1 size-5 shrink-0 accent-teal-700" /><span>Autorizo el uso de estos datos para coordinar la atención de mi mascota y he leído la <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="font-semibold underline">política de privacidad</a>.</span></label>
            <div className="rounded-2xl bg-brand-teal-soft p-5 text-accent-foreground"><p className="text-sm">Abriremos WhatsApp con tu mensaje preparado. Revísalo y pulsa enviar para que la doctora lo reciba.</p><button className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-teal-dark px-5 font-bold text-white sm:w-auto" type="submit"><MessageCircle className="size-5 shrink-0" aria-hidden />Continuar en WhatsApp</button></div>
            {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
            {messageUrl && <div role="status" className="rounded-xl border border-brand-teal/30 p-4"><p className="font-bold">Tu mensaje está preparado.</p><p className="mt-1 text-sm">Tu cita quedará acordada cuando la doctora confirme contigo.</p><a href={messageUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-bold underline">Abrir el mensaje en WhatsApp</a></div>}
          </div>
        </form>
        </details>
      </div>
    </section>
  );
}
