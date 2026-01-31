import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ParentalCards } from "@/components/ParentalCards";

export default function ParentalServicePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const t = getContent(params.locale);
  const s = t.servicesPage.parental;
  const locale = params.locale;

  return <ParentalCards s={s} locale={locale} />;
}
