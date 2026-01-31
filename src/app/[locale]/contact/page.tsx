import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_SOCIAL_ICONS,
} from "@/lib/contact";

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = getContent(params.locale);
  const c = t.contactPage;

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
        {/* Sol: başlık + açıklama + mail + location + other contacts ikonları */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {c.introTitle}
            </h2>
            <p className="mt-2 text-sm text-foreground opacity-80 sm:text-base">
              {c.introText}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-foreground">
                {c.emailLabel}
              </span>
              <p className="mt-1">
                <a
                  href={CONTACT_MAILTO}
                  className="text-foreground opacity-80 hover:text-navy hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">
                {c.locationLabel}
              </span>
              <p className="mt-1 text-foreground opacity-80">
                {c.locationValue}
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">
              {c.otherContactsLabel}
            </span>
            <div className="mt-3 flex gap-2">
              {CONTACT_SOCIAL_ICONS.map(({ href, label, icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity ${className}`}
                  aria-label={label}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Sağ: sadece form */}
        <div className="rounded-xl border border-border bg-card-bg p-6 shadow-sm sm:p-8">
          <ContactForm
            formName={c.formName}
            formEmail={c.formEmail}
            formMessage={c.formMessage}
            formSubjectPrefix={c.formSubjectPrefix}
            submitLabel={c.submitLabel}
          />
        </div>
      </div>
    </Section>
  );
}
