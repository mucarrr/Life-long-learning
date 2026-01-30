"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALE_COOKIE = "NEXT_LOCALE";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLanguage();

  function switchTo(newLocale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale;
    router.push("/" + segments.join("/"));
  }

  return (
    <div className={cn("flex gap-1 rounded-lg border border-border bg-card-bg p-0.5", className)}>
      <button
        type="button"
        onClick={() => switchTo("tr")}
        className={cn(
          "rounded-md px-2 py-1 text-sm font-medium transition-colors",
          locale === "tr"
            ? "bg-yellow text-navy"
            : "text-navy-muted hover:bg-navy/5"
        )}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={cn(
          "rounded-md px-2 py-1 text-sm font-medium transition-colors",
          locale === "en"
            ? "bg-yellow text-navy"
            : "text-navy-muted hover:bg-navy/5"
        )}
      >
        EN
      </button>
    </div>
  );
}
