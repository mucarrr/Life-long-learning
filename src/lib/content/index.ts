import type { Locale } from "../i18n";
import { tr } from "./tr";
import { en } from "./en";

export const content = { tr, en } as const;
export type Content = typeof tr;

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}
