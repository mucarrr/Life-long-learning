import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

const HERO_IMAGE = "/images/seminer4.jpg";
const GALLERY = [
  "/images/seminer1.jpg",
  "/images/seminer2.jpg",
  "/images/seminer3.jpg",
  "/images/seminer5.jpg",
];

export default function SeminarsServicePage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const s = t.servicesPage.seminars;

  return (
    <Section className="pb-10 sm:pb-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-10 lg:items-start">
        <div className="min-w-0">
          <h1 className="section-title section-header">{s.title}</h1>
          <h2 className="font-semibold text-navy mb-3">{s.highlightsTitle}</h2>
          <ul className="space-y-2">
            {s.highlights.map((item, i) => (
              <li key={i} className="card-base px-4 py-3 text-foreground/90">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative w-full max-w-[280px] mx-auto lg:max-w-none lg:sticky lg:top-6 shrink-0 lg:-rotate-[5deg] overflow-hidden rounded-xl border-2 border-amber-700/90 bg-[var(--border)] shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(161,98,7,0.25)]">
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              unoptimized
              priority
              sizes="(max-width: 1023px) 280px, 320px"
              className="object-cover"
            />
          </div>
        </figure>
      </div>

      <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-foreground/10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {GALLERY.map((src, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-[var(--border)] shadow-sm transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-amber-500/30"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
