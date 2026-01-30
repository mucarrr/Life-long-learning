export type Locale = "tr" | "en";
export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "en";

export function isValidLocale(l: string): l is Locale {
  return locales.includes(l as Locale);
}
