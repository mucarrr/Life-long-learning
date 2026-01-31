import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";

/** Dikey: 1,2,5,6. Yatay: 3,4. Sıra: [D][D][D] / [Y][Y] / [D][D][D] – 8 slot, 6 görsel (1,2 tekrarlanır) */
const GALLERY_PORTRAIT = [
  "/images/Educational1.jpg",
  "/images/Educational2.jpg",
  "/images/Educational5.jpg",
  "/images/Educational6.jpg",
];
const GALLERY_LANDSCAPE = [
  "/images/Educational3.jpg",
  "/images/Educational4.jpg",
];

export default function EducationalServicePage({
  params,
}: {
  params: { locale: Locale };
}) {
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
              <h2 className="font-semibold text-navy text-lg mb-3">
                {s.age4_11.title}
              </h2>
              <p className="text-foreground/90 mb-3">{s.age4_11.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age4_11.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section
              className="pinned-note max-w-[320px] lg:self-end"
              role="note"
            >
              <p className="text-foreground/90 text-sm leading-relaxed">
                {s.age4_11.focus}
              </p>
            </section>
          </div>
        </article>

        <article className="card-base p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
            <section className="min-w-0">
              <h2 className="font-semibold text-navy text-lg mb-3">
                {s.age11_18.title}
              </h2>
              <p className="text-foreground/90 mb-3">{s.age11_18.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age11_18.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section
              className="pinned-note max-w-[320px] lg:self-end"
              role="note"
            >
              <p className="text-foreground/90 text-sm leading-relaxed">
                {s.age11_18.focus}
              </p>
            </section>
          </div>
        </article>

        <article className="card-base p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
            <section className="min-w-0">
              <h2 className="font-semibold text-navy text-lg mb-3">
                {s.age18_25.title}
              </h2>
              <p className="text-foreground/90 mb-3">{s.age18_25.intro}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {s.age18_25.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
            <section
              className="pinned-note max-w-[320px] lg:self-end"
              role="note"
            >
              <p className="text-foreground/90 text-sm leading-relaxed">
                {s.age18_25.focus}
              </p>
            </section>
          </div>
        </article>
      </div>

      <p className="text-foreground/90 mt-6">{s.onlineNote}</p>
      <p className="mt-4 text-foreground/90">
        📩{" "}
        <Link
          href={`/${locale}/contact`}
          className="text-yellow hover:underline"
        >
          {s.cta}
        </Link>
      </p>

      {/* Galeri: [D][D][D] / [Y][Y] / [D][D][D] – speech sayfası görsel kart stili */}
      <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          {/* Satır 1: 3 dikey – priority ile hemen yükle, grid hücresi boyutu sabit */}
          <div className="grid grid-cols-3 gap-4 sm:gap-5">
            {[GALLERY_PORTRAIT[0], GALLERY_PORTRAIT[1], GALLERY_PORTRAIT[2]].map(
              (src, i) => (
                <figure
                  key={`r1-${i}-${src}`}
                  className="group relative min-w-0 overflow-hidden rounded-2xl bg-[var(--border)] shadow-sm transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-amber-500/30"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      unoptimized
                      priority={i === 0}
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </figure>
              )
            )}
          </div>
          {/* Satır 2: 2 yatay */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {GALLERY_LANDSCAPE.map((src, i) => (
              <figure
                key={`r2-${i}-${src}`}
                className="group relative min-w-0 overflow-hidden rounded-2xl bg-[var(--border)] shadow-sm transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-amber-500/30"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
