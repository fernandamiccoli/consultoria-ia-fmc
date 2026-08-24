import { NextResponse } from "next/server";
import { sendContactNotification } from "../../../lib/contact-notification";
import { validateContactPayload } from "../../../lib/contact-validation";
import { createSupabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validated = validateContactPayload(body ?? {});

  if (!validated.ok) {
    if (validated.spam) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, errors: validated.errors },
      { status: 400 }
    );
  }

  try {
    const supabase = createSupabaseAdmin();
    const sourcePath = request.headers.get("referer") ?? "/";
    const userAgent = request.headers.get("user-agent") ?? null;
    const { error } = await supabase.from("contact_submissions").insert({
      ...validated.data,
      source_path: sourcePath,
      user_agent: userAgent
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: "No pudimos guardar tu consulta. Intentá nuevamente." },
        { status: 500 }
      );
    }

    await sendContactNotification({
      data: validated.data,
      sourcePath,
      userAgent
    }).catch((error: unknown) => {
      console.error("No se pudo enviar el aviso de contacto.", error);
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "El formulario todavía no está conectado. Revisá la configuración de Supabase." },
      { status: 503 }
    );
  }
}
