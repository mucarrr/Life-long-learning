"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  formName: string;
  formEmail: string;
  formMessage: string;
  formSubjectPrefix: string;
  submitLabel: string;
};

export function ContactForm({
  formName,
  formEmail,
  formMessage,
  formSubjectPrefix,
  submitLabel,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${formSubjectPrefix}: ${name.trim() || "-"}`
    );
    const body = encodeURIComponent(
      [
        message.trim() || "-",
        "",
        "---",
        `Name: ${name.trim() || "-"}`,
        `Email: ${email.trim() || "-"}`,
      ].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-foreground">
          {formName}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-foreground",
            "focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
          )}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-foreground">
          {formEmail}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-foreground",
            "focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
          )}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-foreground">
          {formMessage}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={cn(
            "w-full resize-y rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-foreground",
            "focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
          )}
        />
      </div>
      <button
        type="submit"
        className="btn-base w-full rounded-lg bg-yellow px-6 py-3 text-lg font-medium text-navy hover:bg-yellow-light focus:ring-2 focus:ring-yellow-muted focus:ring-offset-2 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}
