import { describe, expect, it } from "vitest";
import { buildContactNotificationEmail } from "../lib/contact-notification";

describe("buildContactNotificationEmail", () => {
  it("prepara el aviso para la casilla definida por FMC", () => {
    const email = buildContactNotificationEmail({
      data: {
        nombre: "Fernanda",
        email: "fernanda@ejemplo.com",
        organizacion: "Colegio Norte",
        segmento: "institucion_educativa",
        mensaje: "Queremos ordenar una estrategia institucional de IA."
      },
      sourcePath: "https://consultoria-ia-fmc.vercel.app/#contacto",
      userAgent: "Vitest"
    });

    expect(email.to).toBe("fernandamiccoli@bue.edu.ar");
    expect(email.subject).toBe("contacto desde web de consultoria");
    expect(email.html).toContain("Colegio Norte");
    expect(email.text).toContain("Institución educativa");
  });
});
