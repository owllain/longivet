/* ─────────────────────────────────────────────────────────────
   LONGIVET · Estado de apertura en vivo (America/Costa_Rica)
   ─────────────────────────────────────────────────────────────
   Fuente de verdad de los horarios: site.hours (src/lib/site.ts).
   site.hours guarda TEXTO de presentación («8:00 a. m. – 6:00 p. m.»),
   no estructuras computables, así que las constantes de abajo reflejan
   EXACTAMENTE esos valores y quedan documentadas:
     - Lunes a viernes: 8:00 a. m. – 6:00 p. m.   (site.hours[0])
     - Sábados:         9:00 a. m. – 2:00 p. m.   (site.hours[1])
     - Domingos:        guardia telefónica y urgencias (site.hours[2])
   ⚠️ Si se edita site.hours, actualizar estas constantes.

   Función PURA: `estadoHorario(now)` no usa el reloj por sí misma.
   Los componentes deben llamarla desde el CLIENTE (useEffect) con la
   fecha actual para no romper la hidratación.
   ───────────────────────────────────────────────────────────── */

export type ModoHorario = "abierto" | "guardia" | "cerrado";

export interface EstadoHorario {
  /** Hay atención presencial en este instante. */
  abierto: boolean;
  /** Tono para la UI: verde (abierto), ámbar (guardia dominical) o rojo suave. */
  modo: ModoHorario;
  /** Texto corto para el badge («Abierto ahora», «Cerrado · abre …», …). */
  etiqueta: string;
  /** Contexto adicional para title/lectores de pantalla. */
  detalle: string;
}

/* Minutos desde medianoche (espejo exacto de site.hours). */
const APERTURA_LUN_VIE = 8 * 60; // 08:00
const CIERRE_LUN_VIE = 18 * 60; // 18:00
const APERTURA_SAB = 9 * 60; // 09:00
const CIERRE_SAB = 14 * 60; // 14:00

const HORARIO_RESUMEN =
  "Consulta: lunes a viernes 8:00 a. m. – 6:00 p. m. y sábados 9:00 a. m. – 2:00 p. m.";

/** Día de la semana (0 = domingo) y minutos transcurridos, en Costa Rica. */
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

/** Próxima apertura en texto natural, según el día y la hora actual. */
function proximaApertura(dia: number, minutos: number): string {
  if (dia === 0) return "lunes 8:00 a. m.";
  if (dia === 6) {
    return minutos < APERTURA_SAB ? "hoy 9:00 a. m." : "lunes 8:00 a. m.";
  }
  if (minutos < APERTURA_LUN_VIE) return "hoy 8:00 a. m.";
  // Viernes después del cierre → sábado 9:00; resto de días → mañana 8:00.
  return dia === 5 ? "mañana 9:00 a. m." : "mañana 8:00 a. m.";
}

/**
 * Determina el estado de apertura de la clínica en el instante `now`.
 * - Lun–vie 8:00–18:00 y sáb 9:00–14:00 → abierto.
 * - Domingo → «cerrado» con matiz de guardia telefónica (24/7 de urgencias).
 * - Fuera de franja → cerrado con indicación de la próxima apertura.
 */
export function estadoHorario(now: Date): EstadoHorario {
  const { dia, minutos } = horaCostaRica(now);

  // Domingo: guardia telefónica y urgencias (site.hours[2]).
  if (dia === 0) {
    return {
      abierto: false,
      modo: "guardia",
      etiqueta: "Guardia telefónica activa",
      detalle:
        "Domingo con guardia telefónica y urgencias. La consulta regular abre lunes 8:00 a. m.",
    };
  }

  const esSabado = dia === 6;
  const apertura = esSabado ? APERTURA_SAB : APERTURA_LUN_VIE;
  const cierre = esSabado ? CIERRE_SAB : CIERRE_LUN_VIE;
  const cierreTexto = esSabado ? "2:00 p. m." : "6:00 p. m.";

  if (minutos >= apertura && minutos < cierre) {
    return {
      abierto: true,
      modo: "abierto",
      etiqueta: "Abierto ahora",
      detalle: `Cerramos hoy a las ${cierreTexto} · Urgencias por teléfono las 24 h.`,
    };
  }

  return {
    abierto: false,
    modo: "cerrado",
    etiqueta: `Cerrado · abre ${proximaApertura(dia, minutos)}`,
    detalle: `${HORARIO_RESUMEN} Urgencias por teléfono las 24 h, todos los días del año.`,
  };
}
