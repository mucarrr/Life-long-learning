"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Content } from "@/lib/content";
import { navItems } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

function NavLinks({
  base,
  pathname,
  t,
  mobile,
}: {
  base: string;
  pathname: string;
  t: Content;
  mobile?: boolean;
}) {
  return (
    <>
      {navItems.map(({ key, href, featured }) => {
        const hrefFull = base + href;
        const isActive =
          pathname === hrefFull || (href !== "" && pathname.startsWith(hrefFull));
        return (
          <Link
            key={key}
            href={hrefFull}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
              featured && "border border-yellow bg-yellow/10 text-navy",
              !featured &&
                (isActive
                  ? "bg-navy/10 text-navy"
                  : "text-navy-muted hover:bg-navy/5 hover:text-navy"),
              mobile && "block py-3 text-base"
            )}
          >
            {t.nav[key]}
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const base = `/${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card-bg shadow-sm">
      <div className="header-inner flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href={base}
          className="hero-animate hero-animate-delay-1 relative block h-10 shrink-0 overflow-hidden rounded-sm bg-[var(--card-bg)] sm:h-12"
          style={{ width: "clamp(120px, 20vw, 200px)" }}
        >
          <Image
            src="/images/LLG.png"
            alt={t.hero.title}
            fill
            className="object-cover object-center mix-blend-multiply"
            sizes="(max-width: 640px) 120px, 200px"
            priority
          />
        </Link>

        <nav className="hero-animate hero-animate-delay-2 hidden items-center gap-1 lg:flex">
          <NavLinks base={base} pathname={pathname} t={t} />
        </nav>

        <div className="hero-animate hero-animate-delay-3 flex shrink-0 items-center gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-navy hover:bg-navy/5 lg:hidden"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card-bg px-3 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <NavLinks base={base} pathname={pathname} t={t} mobile />
          </nav>
          <div className="mt-3 border-t border-border pt-3 sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
