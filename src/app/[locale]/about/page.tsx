import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const a = t.aboutPage;

  return (
    <Section className="pb-6 sm:pb-10">
      <>
        {/* 1. Founder's Message – vurgulu not benzeri container */}
        <div
            className="rounded-xl border-l-4 border-yellow bg-yellow/5 px-4 py-5 sm:px-6 sm:py-6"
            role="note"
          >
            <h2 className="section-title mb-4">{a.founderTitle}</h2>
            <div className="space-y-4 text-foreground/90">
              {a.founderParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 2. & 3. İki metin kartı: My Therapeutic Approaches (sol) | Who I Work With (sağ) */}
          <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
            <article className="card-base flex flex-col p-5 sm:p-6">
              <h3 className="section-title mb-4">{a.therapeuticTitle}</h3>
              <ul className="flex flex-1 flex-col gap-4">
                {a.therapeuticItems.map((item, i) => (
                  <li key={i}>
                    <h4 className="font-semibold text-navy sm:text-lg">{item.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
            <article className="card-base flex flex-col p-5 sm:p-6">
              <h3 className="section-title mb-4">{a.whoTitle}</h3>
              <ul className="flex flex-1 flex-col gap-4">
                {a.whoItems.map((item, i) => (
                  <li key={i}>
                    <h4 className="font-semibold text-navy sm:text-lg">{item.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* 4. Key Focus Areas */}
          <div className="mt-10 lg:mt-14">
            <h3 className="section-title section-header">{a.focusTitle}</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {a.focusItems.map((item, i) => (
                <li key={i} className="card-base p-4 sm:p-5">
                  <h4 className="font-semibold text-navy sm:text-lg">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
      </>
    </Section>
  );
}
