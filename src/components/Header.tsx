"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Content } from "@/lib/content";
import { navItems, type NavItem } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

function getSubLabel(
  t: Content,
  parentKey: NavItem["key"],
  childKey: string
): string {
  if (parentKey === "about") return t.nav.aboutSub[childKey as keyof typeof t.nav.aboutSub];
  if (parentKey === "services") return t.nav.servicesSub[childKey as keyof typeof t.nav.servicesSub];
  return "";
}

function NavLinks({
  base,
  pathname,
  t,
  mobile,
  openDropdown,
  setOpenDropdown,
  expandedMobile,
  toggleExpandedMobile,
}: {
  base: string;
  pathname: string;
  t: Content;
  mobile?: boolean;
  openDropdown: string | null;
  setOpenDropdown: (k: string | null) => void;
  expandedMobile: Set<string>;
  toggleExpandedMobile: (k: string) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobile) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setOpenDropdown(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobile, setOpenDropdown]);

  return (
    <>
      {navItems.map((item) => {
        const hrefFull = base + item.href;
        const isActive =
          pathname === hrefFull || (item.href !== "" && pathname.startsWith(base + item.href));
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = mobile ? expandedMobile.has(item.key) : openDropdown === item.key;

        if (hasChildren && mobile) {
          return (
            <div key={item.key} className="flex flex-col gap-0">
              <button
                type="button"
                onClick={() => toggleExpandedMobile(item.key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium transition-colors",
                  isActive ? "bg-navy/10 text-foreground" : "text-foreground/70 hover:bg-navy/5 hover:text-foreground"
                )}
                aria-expanded={isOpen}
              >
                {t.nav[item.key]}
                <svg
                  className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && item.children && (
                <div className="ml-3 flex flex-col border-l border-border pl-2">
                  {item.children.map((child) => {
                    const childHrefFull = base + child.href;
                    const isChildActive = pathname === childHrefFull || pathname.startsWith(childHrefFull);
                    return (
                      <Link
                        key={child.key}
                        href={childHrefFull}
                        className={cn(
                          "rounded-md px-2 py-2 text-sm transition-colors",
                          isChildActive ? "bg-navy/10 text-foreground font-medium" : "text-foreground/70 hover:bg-navy/5 hover:text-foreground"
                        )}
                      >
                        {getSubLabel(t, item.key, child.key)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        if (hasChildren && !mobile) {
          return (
            <div
              key={item.key}
              ref={openDropdown === item.key ? dropdownRef : undefined}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  item.featured && "border border-yellow bg-yellow/10 text-navy",
                  !item.featured &&
                    (isActive
                      ? "bg-navy/10 text-foreground"
                      : "text-foreground/70 hover:bg-navy/5 hover:text-foreground")
                )}
                aria-expanded={openDropdown === item.key}
                aria-haspopup="true"
              >
                {t.nav[item.key]}
                <svg
                  className={cn("ml-0.5 inline-block h-3.5 w-3.5 shrink-0 transition-transform", isOpen && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && item.children && (
                <div className="absolute left-0 top-full z-50 mt-0.5 min-w-[200px] rounded-lg border border-border bg-card-bg py-1 shadow-lg">
                  {item.children.map((child) => {
                    const childHrefFull = base + child.href;
                    const isChildActive = pathname === childHrefFull || pathname.startsWith(childHrefFull);
                    return (
                      <Link
                        key={child.key}
                        href={childHrefFull}
                        onClick={() => setOpenDropdown(null)}
                        className={cn(
                          "block whitespace-nowrap px-3 py-2 text-sm transition-colors",
                          isChildActive ? "bg-navy/10 font-medium text-foreground" : "text-foreground/70 hover:bg-navy/5 hover:text-foreground"
                        )}
                      >
                        {getSubLabel(t, item.key, child.key)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.key}
            href={hrefFull}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
              item.featured && "border border-yellow bg-yellow/10 text-navy",
              !item.featured &&
                (isActive
                  ? "bg-navy/10 text-foreground"
                  : "text-foreground/70 hover:bg-navy/5 hover:text-foreground"),
              mobile && "block py-3 text-base"
            )}
          >
            {t.nav[item.key]}
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<Set<string>>(new Set());

  const toggleExpandedMobile = (key: string) => {
    setExpandedMobile((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card-bg shadow-sm">
      <div className="header-inner flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href={base}
          className="hero-animate hero-animate-delay-1 relative block h-10 shrink-0 overflow-hidden rounded-sm bg-[var(--card-bg)] sm:h-12"
          style={{ width: "clamp(120px, 20vw, 200px)" }}
        >
          <Image
            src="/images/LLG.backup.png"
            alt={t.hero.title}
            fill
            className="object-cover object-center mix-blend-multiply"
            sizes="(max-width: 640px) 120px, 200px"
            priority
          />
        </Link>

        <nav className="hero-animate hero-animate-delay-2 hidden items-center gap-1 lg:flex">
          <NavLinks
            base={base}
            pathname={pathname ?? ""}
            t={t}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            expandedMobile={expandedMobile}
            toggleExpandedMobile={toggleExpandedMobile}
          />
        </nav>

        <div className="hero-animate hero-animate-delay-3 flex shrink-0 items-center gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-foreground hover:bg-navy/5 lg:hidden"
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
            <NavLinks
              base={base}
              pathname={pathname ?? ""}
              t={t}
              mobile
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              expandedMobile={expandedMobile}
              toggleExpandedMobile={toggleExpandedMobile}
            />
          </nav>
          <div className="mt-3 border-t border-border pt-3 sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
