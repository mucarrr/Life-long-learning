import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./src/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  let locale: string = defaultLocale;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const geo = (request as NextRequest & { geo?: { country?: string } }).geo;
    const country = geo?.country;
    if (country === "TR") {
      locale = "tr";
    } else {
      const acceptLang = request.headers.get("accept-language");
      const preferred = acceptLang?.split(",")[0]?.split("-")[0]?.toLowerCase();
      if (preferred === "tr") locale = "tr";
      else if (preferred === "en") locale = "en";
    }
  }

  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  const res = NextResponse.redirect(newUrl);
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon|icons|fonts).*)"],
};
