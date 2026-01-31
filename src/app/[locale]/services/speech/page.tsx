import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";

const THERAPY_IMAGES = [
  { src: "/images/terapi1.jpg", alt: "Online terapi oturumu" },
  { src: "/images/terapi2.jpg", alt: "Çocuklarla online eğitim" },
  { src: "/images/terapi3.jpg", alt: "Ekran üzerinden terapi" },
] as const;

export default function SpeechServicePage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const s = t.servicesPage.speech;
  const locale = params.locale;

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{s.title}</h1>
      <p className="text-foreground/90 mb-6">{s.intro}</p>

      {/* Uzmanlık alanları – tam genişlik */}
      <h2 className="font-semibold text-navy mb-2">{s.expertiseTitle}</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-foreground/90 mb-8">
        {s.expertiseItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

    

      <div className="grid gap-8 lg:grid-cols-[1fr,minmax(320px,480px)] lg:gap-10 lg:items-start">
        {/* Sol: terapi notu, online başlık, CTA */}
        <div>
          <p className="text-foreground/90 mb-6">{s.therapyNote}</p>
          <h2 className="font-semibold text-navy mb-3">{s.onlineTitle}</h2>
          <p className="text-foreground/90 mb-6">{s.onlineIntro}</p>
          <p className="text-foreground/90">
            📩{" "}
            <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
              {s.cta}
            </Link>
          </p>
        </div>
        {/* Sağ: raptiye notu */}
        <div className="pinned-note lg:sticky lg:top-6" role="note">
          <div className="space-y-4 text-foreground/90">
            {s.onlinePoints.map((point, i) => (
              <p key={i} className="text-sm leading-relaxed sm:text-base">
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
        {/* Terapi / eğitim ekran görselleri – tam genişlik */}
        <div className="my-16 sm:mb-12" aria-label="Online terapi görselleri">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {THERAPY_IMAGES.map((img, i) => (
            <figure
              key={img.src}
              className="group relative overflow-hidden rounded-2xl bg-[var(--border)] shadow-sm transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-amber-500/30"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
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
