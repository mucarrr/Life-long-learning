import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function EducationalServicePage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const s = t.servicesPage.educational;
  const locale = params.locale;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{s.title}</h1>
      <p className="text-foreground/90 mb-8">{s.intro}</p>

      <div className="space-y-8">
        <article className="card-base p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
            <section className="min-w-0">
              <h2 className="font-semibold text-navy text-lg mb-3">{s.age4_11.title}</h2>
              <p className="text-foreground/90 mb-3">{s.age4_11.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age4_11.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="pinned-note max-w-[320px] lg:self-end" role="note">
              <p className="text-foreground/90 text-sm leading-relaxed">{s.age4_11.focus}</p>
            </section>
          </div>
        </article>

        <article className="card-base p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
            <section className="min-w-0">
              <h2 className="font-semibold text-navy text-lg mb-3">{s.age11_18.title}</h2>
              <p className="text-foreground/90 mb-3">{s.age11_18.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age11_18.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="pinned-note max-w-[320px] lg:self-end" role="note">
              <p className="text-foreground/90 text-sm leading-relaxed">{s.age11_18.focus}</p>
            </section>
          </div>
        </article>

        <article className="card-base p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
            <section className="min-w-0">
              <h2 className="font-semibold text-navy text-lg mb-3">{s.age18_25.title}</h2>
              <p className="text-foreground/90 mb-3">{s.age18_25.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age18_25.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="pinned-note max-w-[320px] lg:self-end" role="note">
              <p className="text-foreground/90 text-sm leading-relaxed">{s.age18_25.focus}</p>
            </section>
          </div>
        </article>
      </div>

      <p className="text-foreground/90 mt-6">{s.onlineNote}</p>
      <p className="mt-4 text-foreground/90">
        📩{" "}
        <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
          {s.cta}
        </Link>
      </p>
    </Section>
  );
}
