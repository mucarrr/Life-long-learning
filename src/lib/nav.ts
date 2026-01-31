export type NavKey = Exclude<
  keyof typeof import("@/lib/content/tr").tr.nav,
  "servicesSub" | "aboutSub" | "publicationsSub"
>;

export type NavItem = {
  key: NavKey;
  href: string;
  featured?: boolean;
  children?: { key: keyof typeof import("@/lib/content/tr").tr.nav.aboutSub | keyof typeof import("@/lib/content/tr").tr.nav.servicesSub; href: string }[];
};

export const navItems: NavItem[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  {
    key: "services",
    href: "/services",
    children: [
      { key: "speech", href: "/services/speech" },
      { key: "educational", href: "/services/educational" },
      { key: "parental", href: "/services/parental" },
      { key: "seminars", href: "/services/seminars" },
    ],
  },
  { key: "erasmus", href: "/erasmus", featured: true },
  { key: "resources", href: "/resources" },
  { key: "collaborations", href: "/collaborations" },
  { key: "contact", href: "/contact" },
];
