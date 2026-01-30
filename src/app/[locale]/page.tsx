import Image from "next/image";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const SERVICE_IMAGES = [
  "https://picsum.photos/seed/speech/800/500",
  "https://picsum.photos/seed/educational/800/500",
  "https://picsum.photos/seed/parental/800/500",
  "https://picsum.photos/seed/seminars/800/500",
];

const SERVICES = [
  { key: "speech" as const, image: SERVICE_IMAGES[0] },
  { key: "educational" as const, image: SERVICE_IMAGES[1] },
  { key: "parental" as const, image: SERVICE_IMAGES[2] },
  { key: "seminars" as const, image: SERVICE_IMAGES[3] },
] as const;

export default function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const t = getContent(params.locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/hero/1920/1080"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container-narrow relative z-10 py-10 sm:py-16 lg:py-20">
          <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:mt-4 sm:text-lg">
            {t.hero.tagline}
          </p>
          <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
            {t.hero.subtitle}
          </p>
          {t.hero.enQuote && (
            <p className="mt-3 max-w-2xl text-xs italic text-white/70 sm:mt-4 sm:text-sm">
              {t.hero.enQuote}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              href={`/${params.locale}/erasmus`}
              variant="primary"
              size="lg"
              className="w-full bg-yellow text-navy hover:bg-yellow-light sm:w-auto"
            >
              {t.cta.erasmus}
            </Button>
            <Button
              href={`/${params.locale}/contact`}
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
            >
              {t.cta.contact}
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section title={t.intro.title} subtitle={t.intro.text} />

      {/* Services */}
      <Section title={t.services.title} className="bg-navy/5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ key, image }) => (
            <Card
              key={key}
              title={t.services[key]}
              href={`/${params.locale}/services`}
              image={image}
            />
          ))}
        </div>
      </Section>

      {/* Erasmus+ CTA (featured) */}
      <Section className="bg-navy text-white">
        <div className="rounded-xl border-2 border-yellow bg-navy-light/80 p-4 text-center sm:p-6 lg:p-8">
          <span className="inline-block rounded-full bg-yellow px-3 py-1 text-xs font-medium text-navy sm:text-sm">
            {t.erasmus.badge}
          </span>
          <h2 className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">{t.erasmus.title}</h2>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Training Courses & Workshops · Past & Ongoing Projects
          </p>
          <Button
            href={`/${params.locale}/erasmus`}
            variant="primary"
            size="lg"
            className="mt-4 w-full bg-yellow text-navy hover:bg-yellow-light sm:mt-6 sm:w-auto"
          >
            {t.erasmus.cta}
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <TestimonialsSection />
    </>
  );
}
