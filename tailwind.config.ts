import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
          muted: "#334155",
        },
        yellow: {
          DEFAULT: "#ca8a04",
          light: "#eab308",
          muted: "#a16207",
        },
        border: "var(--border)",
        "card-bg": "var(--card-bg)",
      },
    },
  },
  plugins: [],
};
export default config;
