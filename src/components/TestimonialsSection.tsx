"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const { t } = useLanguage();
  const items = t.testimonials.items;
  const duplicated = [...items, ...items];

  return (
    <section className="section-padding w-full overflow-hidden bg-navy/5 px-4">
      <header className="section-header text-center sm:text-left">
        <div className="container-narrow">
          <h2 className="section-title">{t.testimonials.title}</h2>
        </div>
      </header>
      <div className="w-full overflow-hidden">
        <div className="testimonials-track flex w-max gap-4 px-4">
          {duplicated.map((item, i) => (
            <blockquote
              key={i}
              className={cn(
                "card-base testimonials-zoom flex-shrink-0 border-l-4 border-yellow p-4 sm:p-6",
                "w-[280px] sm:w-[320px]"
              )}
              style={{ animationDelay: `${(i % items.length) * 0.15}s` }}
            >
              <p className="text-foreground/80 italic">
                {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-3 text-sm font-medium text-foreground">
                — {item.name}
                {item.role ? ` — ${item.role}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
