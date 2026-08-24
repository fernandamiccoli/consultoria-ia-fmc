import { describe, expect, it } from "vitest";
import { validateContactPayload } from "../lib/contact-validation";

describe("validateContactPayload", () => {
  it("normaliza una consulta válida para guardarla", () => {
    const result = validateContactPayload({
      nombre: "  Fernanda  ",
      email: "FERNANDA@EJEMPLO.COM ",
      organizacion: "  Colegio Norte ",
      segmento: "institucion_educativa",
      mensaje: " Queremos definir una estrategia institucional de IA. ",
      website: ""
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({
        nombre: "Fernanda",
        email: "fernanda@ejemplo.com",
        organizacion: "Colegio Norte",
        segmento: "institucion_educativa",
        mensaje: "Queremos definir una estrategia institucional de IA."
      });
    }
  });

  it("rechaza un email inválido con un mensaje en español", () => {
    const result = validateContactPayload({
      nombre: "Fernanda",
      email: "correo-invalido",
      organizacion: "FMC",
      segmento: "empresa",
      mensaje: "Necesitamos priorizar oportunidades."
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("Ingresá un email válido.");
    }
  });

  it("rechaza segmentos que no pertenezcan a la propuesta", () => {
    const result = validateContactPayload({
      nombre: "Fernanda",
      email: "fernanda@ejemplo.com",
      organizacion: "FMC",
      segmento: "otro",
      mensaje: "Necesitamos acompañamiento."
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.segmento).toBe("Elegí empresa o institución educativa.");
    }
  });

  it("marca como spam los envíos con honeypot completo", () => {
    const result = validateContactPayload({
      nombre: "Fernanda",
      email: "fernanda@ejemplo.com",
      organizacion: "FMC",
      segmento: "empresa",
      mensaje: "Necesitamos acompañamiento.",
      website: "https://spam.example"
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.spam).toBe(true);
    }
  });
});
