import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function ParentalServicePage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const s = t.servicesPage.parental;
  const locale = params.locale;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{s.title}</h1>
      <ul className="mb-8 space-y-2 text-foreground/90">
        {s.programList.map((item, i) => (
          <li key={i}>🔹 {item}</li>
        ))}
      </ul>

      <article className="card-base p-5 sm:p-6 mb-8">
        <h2 className="font-semibold text-navy text-lg mb-3">{s.holistic.title}</h2>
        <p className="text-foreground/90 mb-6">{s.holistic.intro}</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
          <section className="min-w-0">
            <p className="font-semibold text-navy text-sm mb-2">{s.holistic.keyAreasTitle}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {s.holistic.keyAreas.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="pinned-note max-w-[320px] lg:self-end" role="note">
            <p className="text-foreground/90 text-sm leading-relaxed">{s.holistic.delivery}</p>
          </section>
        </div>
        <p className="text-foreground/90 mt-6">
          📩{" "}
          <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
            {s.holistic.cta}
          </Link>
        </p>
      </article>

      <article className="card-base p-5 sm:p-6 mb-8">
        <h2 className="font-semibold text-navy text-lg mb-3">{s.familySchool.title}</h2>
        <p className="text-foreground/90 mb-6">{s.familySchool.intro}</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
          <section className="min-w-0">
            <p className="font-semibold text-navy text-sm mb-2">{s.familySchool.keyTopicsTitle}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {s.familySchool.keyTopics.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="pinned-note max-w-[320px] lg:self-end" role="note">
            <p className="text-foreground/90 text-sm leading-relaxed">📺 {s.familySchool.youtubeNote}</p>
          </section>
        </div>
      </article>

      <article className="card-base p-5 sm:p-6">
        <h2 className="font-semibold text-navy text-lg mb-3">{s.filial.title}</h2>
        <p className="text-foreground/90 mb-6">{s.filial.intro}</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
          <section className="min-w-0">
            <ul className="list-disc pl-5 space-y-1.5 mb-4">
              {s.filial.parentsSupport.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="font-semibold text-navy text-sm mb-2">{s.filial.childrenOpportunityIntro}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {s.filial.childrenOpportunity.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="pinned-note max-w-[320px] lg:self-end" role="note">
            <p className="text-foreground/90 text-sm leading-relaxed">{s.filial.closing}</p>
          </section>
        </div>
        <p className="text-foreground/90 mt-6">
          📩{" "}
          <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
            {s.filial.cta}
          </Link>
        </p>
      </article>
    </Section>
  );
}
