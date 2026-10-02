import { FileText, Download } from "lucide-react";

const recursos = [
  {
    nombre: "Guía de Monitoreo en Casa",
    archivo: "Guía de Monitoreo en Casa.pdf",
    tamano: "7.8 MB",
    descripcion: "Aprende a monitorear la salud de tu mascota desde casa.",
  },
  {
    nombre: "Protocolo de Exámenes Geriátricos",
    archivo: "Protocolo de Exámenes Geriátricos.pdf",
    tamano: "2.5 MB",
    descripcion: "Conoce los exámenes recomendados para mascotas mayores.",
  },
  {
    nombre: "Escala de Calidad de Vida Geriátrica",
    archivo: "escala_calidad_vida_geriatrica.pdf",
    tamano: "1.3 MB",
    descripcion: "Herramienta para evaluar el bienestar de tu compañero.",
  },
];

export function RecursosDescargables() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recursos.map((recurso) => (
        <a
          key={recurso.archivo}
          href={`/recursos/${encodeURIComponent(recurso.archivo)}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-xl border bg-background p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:hover:border-brand-teal"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-brand-teal/10 p-2 text-brand-teal-dark dark:text-brand-teal">
              <FileText className="size-6" />
            </div>
            <div>
              <h4 className="font-bold text-brand-navy dark:text-foreground">
                {recurso.nombre}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {recurso.descripcion}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs font-semibold text-brand-teal-dark dark:text-brand-teal">
            <span className="text-muted-foreground">{recurso.tamano}</span>
            <span className="flex items-center gap-1 group-hover:underline">
              <Download className="size-4" />
              Descargar
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
