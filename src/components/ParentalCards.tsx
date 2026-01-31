"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Modal } from "@/components/ui/Modal";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ParentalContent = Content["servicesPage"]["parental"];

const CARD_IMAGES = [
  "/images/holistic1.jpg",
  "/images/aileokulu2.PNG",
  "/images/oyun2.jpg",
] as const;

type ProgramKey = "holistic" | "familySchool" | "filial";

const PROGRAM_KEYS: ProgramKey[] = ["holistic", "familySchool", "filial"];

function truncateIntro(intro: string, maxLen = 140) {
  if (intro.length <= maxLen) return intro;
  const cut = intro.slice(0, maxLen).lastIndexOf(" ");
  return (cut > 0 ? intro.slice(0, cut) : intro.slice(0, maxLen)) + "…";
}

export function ParentalCards({
  s,
  locale,
}: {
  s: ParentalContent;
  locale: Locale;
}) {
  const [modalProgram, setModalProgram] = useState<ProgramKey | null>(null);

  return (
    <Section className="pb-10 sm:pb-16">
      <h1 className="section-title section-header">{s.title}</h1>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-0">
        {PROGRAM_KEYS.map((key, i) => {
          const program = s[key];
          const title = s.programList[i];
          const intro = program.intro;
          const shortDesc = truncateIntro(intro);
          const image = CARD_IMAGES[i];

          return (
            <li key={key}>
              <article
                role="button"
                tabIndex={0}
                onClick={() => setModalProgram(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setModalProgram(key);
                  }
                }}
                className="card-base overflow-hidden h-full flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full shrink-0 bg-navy-muted/10">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
                  <h2 className="font-semibold text-navy text-lg mb-2">{title}</h2>
                  <p className="text-foreground/90 text-sm flex-1 mb-4 line-clamp-3">
                    {shortDesc}
                  </p>
                  <span className="text-yellow hover:underline text-sm font-medium text-left">
                    {s.seeDetails}
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {modalProgram && (
        <Modal
          open={!!modalProgram}
          onClose={() => setModalProgram(null)}
          title={
            modalProgram === "holistic"
              ? s.holistic.title
              : modalProgram === "familySchool"
                ? s.familySchool.title
                : s.filial.title
          }
        >
          <div className="text-center">
            {modalProgram === "holistic" && (
              <HolisticModalContent s={s.holistic} locale={locale} />
            )}
            {modalProgram === "familySchool" && (
              <FamilySchoolModalContent s={s.familySchool} />
            )}
            {modalProgram === "filial" && (
              <FilialModalContent s={s.filial} locale={locale} />
            )}
          </div>
        </Modal>
      )}
    </Section>
  );
}

function HolisticModalContent({
  s,
  locale,
}: {
  s: ParentalContent["holistic"];
  locale: Locale;
}) {
  return (
    <>
      <p className="text-foreground/90 mb-6">{s.intro}</p>
      <p className="font-semibold text-navy text-sm mb-2">{s.keyAreasTitle}</p>
      <ul className="list-disc list-inside space-y-1.5 mb-6">
        {s.keyAreas.map((item, i) => (
          <li key={i} className="text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
      <div className="pinned-note max-w-[320px] mx-auto p-4 rounded-lg bg-foreground/5 mb-6 text-center" role="note">
        <p className="text-foreground/90 text-sm leading-relaxed">{s.delivery}</p>
      </div>
      <p className="text-foreground/90">
        📩{" "}
        <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
          {s.cta}
        </Link>
      </p>
    </>
  );
}

function FamilySchoolModalContent({
  s,
}: {
  s: ParentalContent["familySchool"];
}) {
  return (
    <>
      <p className="text-foreground/90 mb-6">{s.intro}</p>
      <p className="font-semibold text-navy text-sm mb-2">{s.keyTopicsTitle}</p>
      <ul className="list-disc list-inside space-y-1.5 mb-6">
        {s.keyTopics.map((item, i) => (
          <li key={i} className="text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
      <div className="pinned-note max-w-[320px] mx-auto p-4 rounded-lg bg-foreground/5 text-center" role="note">
        <p className="text-foreground/90 text-sm leading-relaxed">
          📺 {s.youtubeNote}
        </p>
      </div>
    </>
  );
}

function FilialModalContent({
  s,
  locale,
}: {
  s: ParentalContent["filial"];
  locale: Locale;
}) {
  return (
    <>
      <p className="text-foreground/90 mb-6">{s.intro}</p>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        {s.parentsSupport.map((item, i) => (
          <li key={i} className="text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
      <p className="font-semibold text-navy text-sm mb-2">
        {s.childrenOpportunityIntro}
      </p>
      <ul className="list-disc list-inside space-y-1.5 mb-6">
        {s.childrenOpportunity.map((item, i) => (
          <li key={i} className="text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
      <div className="pinned-note max-w-[320px] mx-auto p-4 rounded-lg bg-foreground/5 mb-6 text-center" role="note">
        <p className="text-foreground/90 text-sm leading-relaxed">{s.closing}</p>
      </div>
      <p className="text-foreground/90">
        📩{" "}
        <Link href={`/${locale}/contact`} className="text-yellow hover:underline">
          {s.cta}
        </Link>
      </p>
    </>
  );
}
