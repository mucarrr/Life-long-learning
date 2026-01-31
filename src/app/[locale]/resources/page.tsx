import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { ResourceCards } from "@/components/ResourceCards";

export default function ResourcesPage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const r = t.resources;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{t.nav.resources}</h1>
      <p className="text-foreground/90 mb-10 max-w-2xl">{r.intro}</p>

      <section className="mb-12">
        <h2 className="font-semibold text-navy text-lg mb-4">{r.presentationsTitle}</h2>
        <ResourceCards r={r} items={r.presentations} gridCols="lg:grid-cols-4" />
      </section>

      <section>
        <h2 className="font-semibold text-navy text-lg mb-4">{r.articlesTitle}</h2>
        <ResourceCards r={r} items={r.articles} gridCols="sm:grid-cols-2" />
      </section>
    </Section>
  );
}
