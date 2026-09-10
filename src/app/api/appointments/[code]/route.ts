/* ─────────────────────────────────────────────────────────────
   LONGIVET · API de consulta/gestión de una cita por código
   GET   /api/appointments/[code]  → 200 { ok, appointment }
                                   → 404 { ok: false, error }
   PATCH /api/appointments/[code]  body { action: "cancelar" }
                                   → 200 { ok: true, appointment }
                                   → 409 (ya cancelada / ya atendida)
   ───────────────────────────────────────────────────────────── */

import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/* El código es la única credencial de la cita (modelo «boarding pass»).
   Normalizamos formato: mayúsculas, guion opcional, sin espacios. */
function normalizarCodigo(entrada: string): string {
  const limpio = entrada.trim().toUpperCase().replace(/\s+/g, "");
  const sinGuion = limpio.startsWith("LV-") ? limpio.slice(3) : limpio;
  return `LV-${sinGuion}`;
}

/* Campos públicos seguros: sin email/teléfono completos (se enmascaran). */
function seleccionPublica(cita: {
  code: string;
  petName: string;
  species: string;
  service: string;
  preferredVet: string | null;
  date: string;
  timeSlot: string;
  tutorName: string;
  email: string;
  phone: string;
  status: string;
  notes: string | null;
}) {
  const [usuario, dominio = ""] = cita.email.split("@");
  const emailEnmascarado =
    usuario.length <= 2
      ? `${usuario[0] ?? "•"}••@${dominio}`
      : `${usuario.slice(0, 2)}${"•".repeat(Math.min(usuario.length - 2, 4))}@${dominio}`;
  const digitos = cita.phone.replace(/\D/g, "");
  const phoneEnmascarado =
    digitos.length >= 4 ? `${"•".repeat(Math.max(digitos.length - 4, 0))}${digitos.slice(-4)}` : "••••";

  return {
    code: cita.code,
    petName: cita.petName,
    species: cita.species,
    service: cita.service,
    preferredVet: cita.preferredVet,
    date: cita.date,
    timeSlot: cita.timeSlot,
    tutorName: cita.tutorName,
    status: cita.status,
    emailMasked: emailEnmascarado,
    phoneMasked: phoneEnmascarado,
  };
}

type Params = { params: Promise<{ code: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { code } = await params;
    const codigo = normalizarCodigo(code);

    if (!/^LV-[A-Z2-9]{6}$/.test(codigo)) {
      return NextResponse.json(
        { ok: false, error: "El formato del código no es válido. Usa el formato LV-XXXXXX." },
        { status: 400 },
      );
    }

    const cita = await db.appointment.findUnique({
      where: { code: codigo },
      select: {
        code: true,
        petName: true,
        species: true,
        service: true,
        preferredVet: true,
        date: true,
        timeSlot: true,
        tutorName: true,
        email: true,
        phone: true,
        status: true,
        notes: true,
      },
    });

    if (!cita) {
      return NextResponse.json(
        {
          ok: false,
          error: "No encontramos una cita con ese código. Revisa e intenta de nuevo, o escríbenos por WhatsApp.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, appointment: seleccionPublica(cita) });
  } catch (error) {
    console.error("[api/appointments/:code] Error GET:", error);
    return NextResponse.json(
      { ok: false, error: "Tuvimos un problema al consultar tu cita. Intenta de nuevo." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { code } = await params;
    const codigo = normalizarCodigo(code);

    if (!/^LV-[A-Z2-9]{6}$/.test(codigo)) {
      return NextResponse.json(
        { ok: false, error: "El formato del código no es válido. Usa el formato LV-XXXXXX." },
        { status: 400 },
      );
    }

    const body: unknown = await request.json().catch(() => null);
    const action = (body as { action?: unknown } | null)?.action;
    if (action !== "cancelar") {
      return NextResponse.json(
        { ok: false, error: "Acción no reconocida." },
        { status: 400 },
      );
    }

    const cita = await db.appointment.findUnique({
      where: { code: codigo },
      select: { code: true, status: true },
    });

    if (!cita) {
      return NextResponse.json(
        { ok: false, error: "No encontramos una cita con ese código." },
        { status: 404 },
      );
    }

    if (cita.status === "CANCELADA") {
      return NextResponse.json(
        { ok: false, error: "Esta cita ya estaba cancelada." },
        { status: 409 },
      );
    }

    if (cita.status === "ATENDIDA") {
      return NextResponse.json(
        { ok: false, error: "Esta cita ya fue atendida y no puede cancelarse." },
        { status: 409 },
      );
    }

    const actualizada = await db.appointment.update({
      where: { code: codigo },
      data: { status: "CANCELADA" },
      select: {
        code: true,
        petName: true,
        species: true,
        service: true,
        preferredVet: true,
        date: true,
        timeSlot: true,
        tutorName: true,
        email: true,
        phone: true,
        status: true,
        notes: true,
      },
    });

    return NextResponse.json({ ok: true, appointment: seleccionPublica(actualizada) });
  } catch (error) {
    console.error("[api/appointments/:code] Error PATCH:", error);
    return NextResponse.json(
      { ok: false, error: "Tuvimos un problema al cancelar tu cita. Intenta de nuevo o llámanos." },
      { status: 500 },
    );
  }
}
