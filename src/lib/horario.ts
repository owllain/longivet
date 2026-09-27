

export type ModoHorario = "abierto" | "cerrado";

export interface EstadoHorario {

  abierto: boolean;

  modo: ModoHorario;

  etiqueta: string;

  detalle: string;
}


const APERTURA_LUN_VIE = 8 * 60; // 08:00
const CIERRE_LUN_VIE = 18 * 60; // 18:00
const APERTURA_SAB = 9 * 60; // 09:00
const CIERRE_SAB = 16 * 60; // 16:00

const HORARIO_RESUMEN =
  "Consulta: lunes a viernes 8:00 a. m. – 6:00 p. m. y sábados 9:00 a. m. – 4:00 p. m.";


function horaCostaRica(now: Date): { dia: number; minutos: number } {
  // Fecha «YYYY-MM-DD» en zona America/Costa_Rica (patrón en-CA, el mismo
  // usado por el asistente de reserva: evita correcciones de zona horaria).
  const hoyCR = now.toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
  const base = new Date(`${hoyCR}T00:00:00Z`);
  const dia = base.getUTCDay(); // 0 = domingo … 6 = sábado

  // Hora/minuto del instante `now` en Costa Rica. hourCycle h23 evita «24:00».
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Costa_Rica",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const [hora, minuto] = partes.split(":").map(Number);

  return { dia, minutos: hora * 60 + minuto };
}


function proximaApertura(dia: number, minutos: number): string {
  if (dia === 0) return "lunes 8:00 a. m.";
  if (dia === 6) {
    return minutos < APERTURA_SAB ? "hoy 9:00 a. m." : "lunes 8:00 a. m.";
  }
  if (minutos < APERTURA_LUN_VIE) return "hoy 8:00 a. m.";
  // Viernes después del cierre → sábado 9:00; resto de días → mañana 8:00.
  return dia === 5 ? "mañana 9:00 a. m." : "mañana 8:00 a. m.";
}


export function estadoHorario(now: Date): EstadoHorario {
  const { dia, minutos } = horaCostaRica(now);

  if (dia === 0) return { abierto: false, modo: "cerrado", etiqueta: "Próximas consultas: lunes", detalle: HORARIO_RESUMEN };

  const esSabado = dia === 6;
  const apertura = esSabado ? APERTURA_SAB : APERTURA_LUN_VIE;
  const cierre = esSabado ? CIERRE_SAB : CIERRE_LUN_VIE;
  const cierreTexto = esSabado ? "4:00 p. m." : "6:00 p. m.";

  if (minutos >= apertura && minutos < cierre) {
    return {
      abierto: true,
      modo: "abierto",
      etiqueta: "En horario de consultas",
      detalle: `Consultas con cita hasta las ${cierreTexto}.`,
    };
  }

  return {
    abierto: false,
    modo: "cerrado",
    etiqueta: `Cerrado · abre ${proximaApertura(dia, minutos)}`,
    detalle: `${HORARIO_RESUMEN} Visitas con cita previa.`,
  };
}
