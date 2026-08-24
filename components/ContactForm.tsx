"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

type FormErrors = Partial<Record<"nombre" | "email" | "organizacion" | "segmento" | "mensaje", string>>;

type SubmitState =
  | { status: "idle"; errors?: FormErrors; message?: string }
  | { status: "submitting"; errors?: FormErrors; message?: string }
  | { status: "success"; errors?: FormErrors; message: string }
  | { status: "error"; errors?: FormErrors; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "submitting" });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    const payload = await response.json().catch(() => ({}));

    if (response.ok && payload.ok) {
      form.reset();
      setState({
        status: "success",
        message: "Gracias. Tu consulta fue enviada y te contactaremos pronto."
      });
      return;
    }

    setState({
      status: "error",
      errors: payload.errors,
      message: payload.message ?? "Revisá los campos marcados e intentá nuevamente."
    });
  }

  const submitting = state.status === "submitting";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <FormField id="nombre" label="Nombre" error={state.errors?.nombre}>
        <input id="nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" />
      </FormField>
      <FormField id="email" label="Email" error={state.errors?.email}>
        <input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" />
      </FormField>
      <FormField id="organizacion" label="Organización" error={state.errors?.organizacion}>
        <input id="organizacion" name="organizacion" placeholder="Nombre de tu organización" autoComplete="organization" />
      </FormField>
      <FormField id="segmento" label="Segmento" error={state.errors?.segmento}>
        <select id="segmento" name="segmento" defaultValue="">
          <option value="" disabled>
            Seleccioná una opción
          </option>
          <option value="empresa">Empresa</option>
          <option value="institucion_educativa">Institución educativa</option>
        </select>
      </FormField>
      <FormField id="mensaje" label="Mensaje" error={state.errors?.mensaje} wide>
        <textarea id="mensaje" name="mensaje" placeholder="Contanos brevemente tus objetivos o desafíos..." rows={5} />
      </FormField>
      <button className="submit-button" type="submit" disabled={submitting}>
        <span>{submitting ? "Enviando consulta" : "Enviar consulta"}</span>
        <span aria-hidden="true">→</span>
      </button>
      <p className={`form-status ${state.status}`} role="status" aria-live="polite">
        {state.message ?? "Tu información se utiliza solo para responder tu consulta."}
      </p>
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  wide = false,
  children
}: {
  id: string;
  label: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`form-field ${wide ? "wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="field-error">{error ?? ""}</span>
    </div>
  );
}
