import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

export default function SeminarsServicePage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const s = t.servicesPage.seminars;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{s.title}</h1>
      <p className="text-foreground/90 mb-4">{s.pastEventsNote}</p>
      <h2 className="font-semibold text-navy mb-3">{s.highlightsTitle}</h2>
      <ul className="space-y-2">
        {s.highlights.map((item, i) => (
          <li key={i} className="card-base px-4 py-3 text-foreground/90">
            {item.title}
          </li>
        ))}
      </ul>
    </Section>
  );
}
