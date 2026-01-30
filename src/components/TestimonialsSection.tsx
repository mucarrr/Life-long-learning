"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "./ui/Section";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = t.testimonials.items;

  return (
    <Section title={t.testimonials.title} className="bg-navy/5">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <blockquote
            key={i}
            className={cn(
              "card-base border-l-4 border-yellow p-4 sm:p-6"
            )}
          >
            <p className="text-navy-muted italic">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-3 text-sm font-medium text-navy">
              — {item.name}, {item.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
