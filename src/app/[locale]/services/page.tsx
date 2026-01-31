import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function ServicesIndexPage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const nav = t.nav;
  const sub = nav.servicesSub;
  const locale = params.locale;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{nav.services}</h1>
      <p className="text-foreground/90 mb-8 max-w-2xl">
        {locale === "en"
          ? "Explore our services below. Each program is delivered with a focus on individual needs and evidence-based practice."
          : "Hizmetlerimizi aşağıdan inceleyebilirsiniz. Her program bireysel ihtiyaçlar ve kanıta dayalı uygulama odağıyla sunulmaktadır."}
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href={`/${locale}/services/speech`}
            className="card-base block p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-semibold text-navy">{sub.speech}</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/services/educational`}
            className="card-base block p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-semibold text-navy">{sub.educational}</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/services/parental`}
            className="card-base block p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-semibold text-navy">{sub.parental}</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/services/seminars`}
            className="card-base block p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-semibold text-navy">{sub.seminars}</span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
