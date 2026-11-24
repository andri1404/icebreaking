import type { Config } from "tailwindcss";

// Palet hangat: kuning (energi), biru (tenang), hijau (kolaborasi)
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sun: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcc94d",
          400: "#fbb724",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        sky2: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc6fb",
          400: "#36aaf5",
          500: "#0c8ee9",
          600: "#0071c7",
          700: "#035ca3",
        },
        leaf: {
          50: "#f1faf0",
          100: "#e2f5e0",
          200: "#c7eac4",
          300: "#9cd999",
          400: "#6cc165",
          500: "#47a748",
          600: "#2f8a34",
          700: "#226e2a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        card: "0 4px 14px -4px rgb(0 0 0 / 0.12)",
        pop: "0 10px 30px -8px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
