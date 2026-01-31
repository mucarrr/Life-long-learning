"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "./ui/Section";

export function PlaceholderPage() {
  const { t } = useLanguage();

  return (
    <Section title={t.placeholder.title} className="min-h-[50vh] flex items-center">
      <p className="text-foreground/80">{t.placeholder.text}</p>
    </Section>
  );
}
