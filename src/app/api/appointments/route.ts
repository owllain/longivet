/* ─────────────────────────────────────────────────────────────
   LONGIVET · API de reservas
   POST /api/appointments
   → 201 { ok: true, code, appointment: { date, timeSlot, service, petName, tutorName } }
   → 400 { ok: false, error: 'Datos inválidos', fieldErrors }
   → 409 { ok: false, error: 'Lo sentimos, esa franja acaba de ser reservada…' }
   ───────────────────────────────────────────────────────────── */

import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/lib/db";
import { appointmentSchema, generarCodigo } from "@/lib/booking";

export const dynamic = "force-dynamic";

const MENSAJE_FRANJA_OCUPADA = "Lo sentimos, esa franja acaba de ser reservada. Elige otro horario.";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null);

    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const campo = issue.path.join(".") || "form";
        if (!fieldErrors[campo]) fieldErrors[campo] = issue.message;
      }
      return NextResponse.json({ ok: false, error: "Datos inválidos", fieldErrors }, { status: 400 });
    }

    const datos = parsed.data;

    // La franja debe estar libre (única por date+timeSlot, salvo canceladas).
    const existente = await db.appointment.findUnique({
      where: { date_timeSlot: { date: datos.date, timeSlot: datos.timeSlot } },
      select: { status: true },
    });
    if (existente && existente.status !== "CANCELADA") {
      return NextResponse.json({ ok: false, error: MENSAJE_FRANJA_OCUPADA }, { status: 409 });
    }

    const datosCita = {
      petName: datos.petName,
      species: datos.species,
      breed: datos.breed ? datos.breed : null,
      ageYears: datos.ageYears,
      service: datos.service,
      preferredVet: datos.preferredVet,
      date: datos.date,
      timeSlot: datos.timeSlot,
      tutorName: datos.tutorName,
      email: datos.email,
      phone: datos.phone,
      notes: datos.notes ? datos.notes : null,
      status: "CONFIRMADA",
    };

    // Se crean (o reactivan) con reintento ante colisión del código único.
    let cita: { code: string; date: string; timeSlot: string; service: string; petName: string; tutorName: string } | null =
      null;
    for (let intento = 0; intento < 3 && !cita; intento++) {
      try {
        const registro = existente
          ? // La franja estaba cancelada: la restricción única es (date, timeSlot),
            // así que se reutiliza el registro existente con un código nuevo.
            await db.appointment.update({
              where: { date_timeSlot: { date: datos.date, timeSlot: datos.timeSlot } },
              data: { ...datosCita, code: generarCodigo() },
            })
          : await db.appointment.create({
              data: { ...datosCita, code: generarCodigo() },
            });
        cita = {
          code: registro.code,
          date: registro.date,
          timeSlot: registro.timeSlot,
          service: registro.service,
          petName: registro.petName,
          tutorName: registro.tutorName,
        };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002" &&
          !String(error.meta?.target ?? "").match(/date|timeSlot/)
        ) {
          // Colisión de «code»: se reintenta con un código nuevo (hasta 3 veces).
          continue;
        }
        throw error;
      }
    }

    if (!cita) {
      return NextResponse.json(
        { ok: false, error: "No pudimos generar tu código de confirmación. Intenta de nuevo." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, code: cita.code, appointment: cita }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      String(error.meta?.target ?? "").match(/date|timeSlot/)
    ) {
      // Alguien tomó la franja durante la carrera de escritura.
      return NextResponse.json({ ok: false, error: MENSAJE_FRANJA_OCUPADA }, { status: 409 });
    }
    console.error("[api/appointments] Error al crear la reserva:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos registrar tu reserva. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
