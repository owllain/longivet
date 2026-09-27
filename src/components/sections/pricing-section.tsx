"use client";

import { useState } from "react";
import {
  Info,
  MapPin,
  Microscope,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { site } from "@/lib/site";

interface ServicePriceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}

const consultasData: ServicePriceItem[] = [
  {
    id: "consulta-general",
    name: "Consulta Médica General a Domicilio",
    price: "₡30.000",
    description:
      "Valoración clínica completa, revisión del historial y de los cambios observados, toma de constantes vitales y prescripción de tratamiento en el hogar.",
  },
  {
    id: "consulta-geriatrica",
    name: "Consulta con Énfasis en Geriatría",
    price: "₡40.000",
    description:
      "Evaluación integral de pacientes sénior: examen osteoarticular, movilidad, manejo de dolor crónico, asesoría nutricional y pauta de calidad de vida.",
    badge: "Especialidad Senior",
    highlight: true,
  },
  {
    id: "consulta-seguimiento",
    name: "Consulta de Seguimiento / Control",
    price: "₡20.000",
    description:
      "Revisión presencial de evolución clínica para tratamientos en curso dentro de los 15 días posteriores a la primera consulta.",
  },
  {
    id: "tele-consulta",
    name: "Tele-Consulta / Seguimiento Virtual",
    price: "₡15.000",
    description:
      "Orientación médica, revisión de exámenes de control o triaje a distancia para casos no urgentes.",
  },
];

const vacunasData: ServicePriceItem[] = [
  {
    id: "vacuna-sextuple",
    name: "Vacuna Múltiple Canina (Séxtuple/Polivalente)",
    price: "₡18.000",
    description:
      "Protección contra Distemper, Parvovirus, Adenovirus, Hepatitis y Leptospirosis. Incluye revisión clínica previa e insumos.",
  },
  {
    id: "vacuna-antirrabica",
    name: "Vacuna Antirrábica",
    price: "₡12.000",
    description:
      "Inoculación anual antirrábica para perros o gatos con emisión de certificado de vacunación.",
  },
  {
    id: "vacuna-bordetella",
    name: "Vacuna contra Tos de Perreras (Bordetella)",
    price: "₡15.000",
    description:
      "Protección respiratoria recomendada para convivencia comunitaria o estadías en guarderías.",
  },
  {
    id: "vacuna-triple-felina",
    name: "Vacuna Triple Felina",
    price: "₡18.000",
    description:
      "Prevención de Rinotraqueítis, Calicivirus y Panleucopenia felina.",
  },
  {
    id: "vacuna-felv",
    name: "Vacuna contra Leucemia Felina (FeLV)",
    price: "₡18.000",
    description:
      "Profilaxis orientada a felinos con acceso al exterior o convivencia mixta.",
  },
  {
    id: "paquete-canino",
    name: "Paquete Preventivo Anual Canino",
    price: "₡28.000",
    description:
      "Aplicación combinada de Vacuna Múltiple + Vacuna Antirrábica en la misma visita.",
    badge: "Paquete Ahorro",
    highlight: true,
  },
  {
    id: "paquete-felino",
    name: "Paquete Preventivo Anual Felino",
    price: "₡35.000",
    description:
      "Aplicación combinada de Triple Felina + Leucemia Felina + Antirrábica en la misma visita.",
    badge: "Paquete Ahorro",
    highlight: true,
  },
];

const laboratorioData: ServicePriceItem[] = [
  {
    id: "lab-hemograma",
    name: "Hemograma Completo",
    price: "₡22.000",
    description:
      "Conteo de glóbulos rojos, blancos, plaquetas e índices plaquetarios/eritrocitarios; detección de anemia e infecciones.",
  },
  {
    id: "lab-quimica-basica",
    name: "Química Sanguínea Básica",
    price: "₡28.000",
    description:
      "Evaluación de función renal y hepática estándar (Urea, Creatinina, ALT).",
  },
  {
    id: "lab-perfil-geriatrico",
    name: "Perfil Bioquímico Completo (Geriátrico)",
    price: "₡48.000",
    description:
      "Panel integral multiorgánico (Riñón, Hígado, Glucosa, Proteínas totales, Electrolitos), ideal para monitoreo en adultos mayores.",
    badge: "Panel Senior Recomendado",
    highlight: true,
  },
  {
    id: "lab-urianalisis",
    name: "Urianálisis Completo",
    price: "₡15.000",
    description:
      "Análisis físico-químico de orina y evaluación microscópica de sedimento (detección de cristales, bacterias y daño renal).",
  },
  {
    id: "lab-coprologico",
    name: "Coprológico / Análisis de Heces",
    price: "₡10.000",
    description:
      "Detección directa y por flotación de parásitos gastrointestinales comunes.",
  },
  {
    id: "lab-snap-4dx",
    name: "Test Rápido Serológico Canino (Snap 4Dx)",
    price: "₡30.000",
    description:
      "Detección rápida de enfermedades transmitidas por garrapatas (Ehrlichia, Anaplasma, Lyme) y Gusano del Corazón (Dirofilaria).",
  },
  {
    id: "lab-snap-fiv-felv",
    name: "Test Rápido Felino (FIV / FeLV)",
    price: "₡38.000",
    description:
      "Descarte serológico en sangre de Virus de Inmunodeficiencia Felina (SIDA) y Leucemia Viral Felina.",
  },
  {
    id: "lab-citologia",
    name: "Citología Básica y Frotis de Piel",
    price: "₡14.000",
    description:
      "Toma de muestra cutánea o auricular para evaluación de levaduras, bacterias y células inflamatorias.",
  },
];


export function PricingSection() {
  const [activeTab, setActiveTab] = useState<string>("consultas");

  return (
    <section
      id="tarifas"
      aria-labelledby="titulo-tarifas"
      className="relative overflow-hidden py-20 md:py-24"
    >
      {/* Fondo decorativo sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-teal-soft/20 to-transparent dark:via-muted/20"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Encabezado de la sección */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal-soft/80 px-4 py-1.5 text-xs font-semibold text-brand-teal-dark dark:border-brand-teal/20 dark:bg-brand-teal/15 dark:text-brand-teal-soft sm:text-sm">
            <MapPin className="h-4 w-4" aria-hidden />
            Medicina veterinaria a domicilio · Cartago y San José, Costa Rica
          </div>

          <h2
            id="titulo-tarifas"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            Tarifas de atención <span className="texto-marca">veterinaria a domicilio</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Atención clínica profesional con el máximo confort en tu hogar.
            Diagnóstico, vacunas y chequeos geriátricos con dedicación y sin el estrés del traslado.
          </p>

        </Reveal>

        {/* Pestañas con Shadcn Tabs */}
        <Reveal delay={0.15} className="mt-12">
          <Tabs
            defaultValue="consultas"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Lista de pestañas accesible y responsiva */}
            <div className="flex justify-center">
              <TabsList className="grid h-auto w-full max-w-2xl grid-cols-3 rounded-2xl border border-border/80 bg-muted/70 p-1 backdrop-blur-sm dark:bg-muted/40">
                <TabsTrigger
                  value="consultas"
                  className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold sm:gap-2 sm:text-sm"
                >
                  <Stethoscope className="h-4 w-4 text-brand-teal shrink-0" aria-hidden />
                  <span>Consultas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="vacunas"
                  className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold sm:gap-2 sm:text-sm"
                >
                  <Syringe className="h-4 w-4 text-brand-teal shrink-0" aria-hidden />
                  <span>Vacunas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="laboratorio"
                  className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold sm:gap-2 sm:text-sm"
                >
                  <Microscope className="h-4 w-4 text-brand-teal shrink-0" aria-hidden />
                  <span>Laboratorio</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Pestaña 1: Consultas */}
            <TabsContent value="consultas" className="mt-8 focus-visible:outline-none">
              <PricingCard
                title="Consultas a Domicilio"
                subtitle="Atención clínica personalizada para cada paciente, en la comodidad del hogar, evitando el estrés de desplazarse."
                icon={<Stethoscope className="h-5 w-5 text-brand-teal-dark dark:text-brand-teal-soft" />}
                items={consultasData}
                colHeaderName="Servicio"
                colHeaderDetail="Detalle del Servicio"
              />
            </TabsContent>

            {/* Pestaña 2: Vacunas */}
            <TabsContent value="vacunas" className="mt-8 focus-visible:outline-none">
              <PricingCard
                title="Vacunación e Inmunización"
                subtitle="Protocolos preventivos con biológicos de alta calidad. Incluyen revisión clínica del paciente previo a la inoculación."
                icon={<Syringe className="h-5 w-5 text-brand-teal-dark dark:text-brand-teal-soft" />}
                items={vacunasData}
                colHeaderName="Vacuna / Protocolo"
                colHeaderDetail="Especificaciones"
              />
            </TabsContent>

            {/* Pestaña 3: Laboratorio */}
            <TabsContent value="laboratorio" className="mt-8 focus-visible:outline-none">
              <PricingCard
                title="Exámenes de Diagnóstico y Laboratorio"
                subtitle="Toma de muestras en el hogar con manejo suave y respetuoso. Entrega de resultados coordinada según los estudios solicitados."
                icon={<Microscope className="h-5 w-5 text-brand-teal-dark dark:text-brand-teal-soft" />}
                items={laboratorioData}
                colHeaderName="Examen de Diagnóstico"
                colHeaderDetail="Aplicación Clínica y Componentes"
              />
            </TabsContent>
          </Tabs>
        </Reveal>

        {/* Nota al pie y garantías */}
        <Reveal delay={0.25} className="mt-8">
          <div className="rounded-2xl border border-dashed border-border/80 bg-muted/30 p-5 text-xs text-muted-foreground sm:text-sm">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                <span>
                  <strong>Información de cobertura:</strong> Las visitas a domicilio se realizan en el área de
                  Cartago, San José y zonas cercanas previa confirmación de agenda. Tratamientos o medicamentos adicionales se cotizan de forma transparente antes de su aplicación.
                </span>
              </div>
              <a
                href="#agendar"
                className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-teal-dark hover:underline dark:text-brand-teal-soft"
              >
                <span>Preparar mensaje de cita</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingCard({
  title,
  subtitle,
  icon,
  items,
  colHeaderName,
  colHeaderDetail,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: ServicePriceItem[];
  colHeaderName: string;
  colHeaderDetail: string;
}) {
  return (
    <Card className="border border-border/80 bg-card shadow-sm transition-all duration-300 hover:shadow-md dark:border-border/60 dark:bg-card">
      <CardHeader className="border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-teal-soft dark:bg-brand-teal/20">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-brand-navy dark:text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {subtitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="divide-y sm:hidden">{items.map(item => <li key={item.id} className="p-5"><div className="flex items-start justify-between gap-3"><h4 className="font-bold">{item.name}</h4><span className="shrink-0 font-bold text-brand-teal-dark dark:text-brand-teal">{item.price}</span></div><p className="mt-2 text-sm text-muted-foreground">{item.description}</p></li>)}</ul>
        {/* Tabla responsiva usando el componente shadcn Table */}
        <div className="hidden overflow-x-auto sm:block">
          <Table className="min-w-[640px] sm:min-w-full">
            <TableHeader className="bg-brand-navy text-white">
              <TableRow className="border-b border-border/60 hover:bg-transparent">
                <TableHead className="w-[32%] py-3.5 pl-6 text-center text-base font-bold text-white">
                  {colHeaderName}
                </TableHead>
                <TableHead className="w-[43%] py-3.5 text-center text-base font-bold text-white">
                  {colHeaderDetail}
                </TableHead>
                <TableHead className="w-[15%] py-3.5 text-center text-base font-bold text-white">
                  Precio
                </TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => {


                return (
                  <TableRow
                    key={item.id}
                    className={`transition-colors hover:bg-muted/40 dark:hover:bg-muted/20 ${
                      item.highlight
                        ? "bg-brand-teal-soft/30 dark:bg-brand-teal/5 font-normal"
                        : index % 2 === 1
                        ? "bg-muted/15 dark:bg-muted/5"
                        : ""
                    }`}
                  >
                    {/* Nombre del servicio con posibles badges */}
                    <TableCell className="py-4 pl-6 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="font-semibold text-brand-navy dark:text-foreground">
                          {item.name}
                        </div>
                        {item.badge && (
                          <div className="flex items-center gap-1">
                            <Badge
                              variant="secondary"
                              className="h-5 gap-1 bg-brand-teal/15 text-[10px] font-semibold text-brand-teal-dark dark:bg-brand-teal/25 dark:text-brand-teal-soft"
                            >
                              <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
                              {item.badge}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Detalle o especificación clínica con wrap para no forzar scroll infinito */}
                    <TableCell className="py-4 align-top">
                      <p className="max-w-md whitespace-normal text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item.description}
                      </p>
                    </TableCell>

                    {/* Precio del servicio */}
                    <TableCell className="py-4 text-right align-top whitespace-nowrap">
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-base font-bold text-brand-navy sm:text-lg dark:text-brand-teal-soft">
                          {item.price}
                        </span>

                      </div>
                    </TableCell>


                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
