import type { ContactPayload } from "./contact-validation";

const notificationTo = "fernandamiccoli@bue.edu.ar";
const notificationSubject = "contacto desde web de consultoria";
const fallbackNotificationFrom = "Consultoria IA FMC <onboarding@resend.dev>";

const segmentLabels: Record<ContactPayload["segmento"], string> = {
  empresa: "Empresa",
  institucion_educativa: "Institución educativa"
};

type ContactNotificationInput = {
  data: ContactPayload;
  sourcePath: string;
  userAgent: string | null;
};

export function buildContactNotificationEmail({
  data,
  sourcePath,
  userAgent
}: ContactNotificationInput) {
  const segmento = segmentLabels[data.segmento];
  const text = [
    "Nueva consulta recibida desde la web de Consultoría IA FMC.",
    "",
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Organización: ${data.organizacion}`,
    `Segmento: ${segmento}`,
    "",
    "Mensaje:",
    data.mensaje,
    "",
    `Origen: ${sourcePath}`,
    `Navegador: ${userAgent ?? "No disponible"}`
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b1012; line-height: 1.55;">
      <h1 style="font-size: 22px; margin: 0 0 18px;">Nueva consulta desde la web</h1>
      <p style="margin: 0 0 20px;">Llegó una consulta para Consultoría IA FMC.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 620px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Nombre</td><td>${escapeHtml(data.nombre)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Organización</td><td>${escapeHtml(data.organizacion)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Segmento</td><td>${escapeHtml(segmento)}</td></tr>
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 24px 0 8px;">Mensaje</h2>
      <p style="white-space: pre-line; margin: 0 0 24px;">${escapeHtml(data.mensaje)}</p>
      <p style="color: #6f7773; font-size: 13px; margin: 0;">Origen: ${escapeHtml(sourcePath)}</p>
      <p style="color: #6f7773; font-size: 13px; margin: 4px 0 0;">Navegador: ${escapeHtml(userAgent ?? "No disponible")}</p>
    </div>
  `;

  return {
    from: process.env.RESEND_FROM_EMAIL ?? fallbackNotificationFrom,
    to: notificationTo,
    subject: notificationSubject,
    html,
    text,
    reply_to: data.email
  };
}

export async function sendContactNotification(input: ContactNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildContactNotificationEmail(input))
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "No se pudo leer el detalle del error.");
    console.error("Resend no pudo enviar el aviso de contacto.", {
      status: response.status,
      body: errorBody
    });
  }

  return { ok: response.ok, skipped: false };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
