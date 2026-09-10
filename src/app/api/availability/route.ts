/* ─────────────────────────────────────────────────────────────
   LONGIVET · API de disponibilidad
   GET /api/availability?date=YYYY-MM-DD
   → { ok: true, closed: true,  taken: [] }            (domingo)
   → { ok: true, closed: false, taken: ["08:00", ...] } (franja tomada)
   ───────────────────────────────────────────────────────────── */

import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Fecha de hoy en Costa Rica con formato YYYY-MM-DD (en-CA). */
function hoyCostaRica(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date") ?? "";

    if (!FECHA_RE.test(date)) {
      return NextResponse.json(
        { ok: false, error: "Fecha inválida: usa el formato YYYY-MM-DD." },
        { status: 400 },
      );
    }

    if (date < hoyCostaRica()) {
      return NextResponse.json(
        { ok: false, error: "No se puede consultar una fecha pasada." },
        { status: 400 },
      );
    }

    // Domingo cerrado. Se parsea al mediodía UTC para que la zona horaria
    // no corra el día hacia atrás.
    const diaSemana = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (diaSemana === 0) {
      return NextResponse.json({ ok: true, closed: true, taken: [] });
    }

    const reservas = await db.appointment.findMany({
      where: { date, status: { not: "CANCELADA" } },
      select: { timeSlot: true },
    });

    return NextResponse.json({
      ok: true,
      closed: false,
      taken: reservas.map((reserva) => reserva.timeSlot),
    });
  } catch (error) {
    console.error("[api/availability] Error al consultar disponibilidad:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos verificar la disponibilidad. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
