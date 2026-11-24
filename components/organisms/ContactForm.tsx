"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";
import { contactFormEndpoint } from "@/data/contact";

type Status = "idle" | "sending" | "success" | "error" | "not-configured";

const messages: Partial<Record<Status, string>> = {
  success: "¡Gracias! Tu mensaje fue enviado.",
  error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
  "not-configured": "Formulario de ejemplo: el mensaje no se envió porque aún no hay un servicio conectado.",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactFormEndpoint) {
      setStatus("not-configured");
      return;
    }

    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Respuesta ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormField label="Nombre" htmlFor="nombre">
        <Input id="nombre" name="nombre" autoComplete="name" required placeholder="Tu nombre" />
      </FormField>
      <FormField label="Correo" htmlFor="email">
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="tu@correo.com" />
      </FormField>
      <FormField label="Mensaje" htmlFor="mensaje">
        <Textarea id="mensaje" name="mensaje" required placeholder="Tu mensaje" />
      </FormField>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar"}
      </Button>
      <p role="status" className="min-h-6 text-sm font-medium">
        {messages[status]}
      </p>
    </form>
  );
}
