export const segmentOptions = ["empresa", "institucion_educativa"] as const;

export type Segmento = (typeof segmentOptions)[number];

export type ContactPayloadInput = {
  nombre?: unknown;
  email?: unknown;
  organizacion?: unknown;
  segmento?: unknown;
  mensaje?: unknown;
  website?: unknown;
};

export type ContactPayload = {
  nombre: string;
  email: string;
  organizacion: string;
  segmento: Segmento;
  mensaje: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Partial<Record<keyof ContactPayload, string>>; spam?: boolean };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(input: ContactPayloadInput): ContactValidationResult {
  if (clean(input.website)) {
    return { ok: false, errors: {}, spam: true };
  }

  const nombre = clean(input.nombre);
  const email = clean(input.email).toLowerCase();
  const organizacion = clean(input.organizacion);
  const segmento = clean(input.segmento);
  const mensaje = clean(input.mensaje);
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  if (!nombre) errors.nombre = "Ingresá tu nombre.";
  if (!emailPattern.test(email)) errors.email = "Ingresá un email válido.";
  if (!organizacion) errors.organizacion = "Ingresá el nombre de tu organización.";
  if (!segmentOptions.includes(segmento as Segmento)) {
    errors.segmento = "Elegí empresa o institución educativa.";
  }
  if (mensaje.length < 12) {
    errors.mensaje = "Contanos brevemente qué necesitás.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      nombre,
      email,
      organizacion,
      segmento: segmento as Segmento,
      mensaje
    }
  };
}
