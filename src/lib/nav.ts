export type NavKey = Exclude<
  keyof typeof import("@/lib/content/tr").tr.nav,
  "servicesSub"
>;

export const navItems: { key: NavKey; href: string; featured?: boolean }[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "erasmus", href: "/erasmus", featured: true },
  { key: "resources", href: "/resources" },
  { key: "collaborations", href: "/collaborations" },
  { key: "contact", href: "/contact" },
];
