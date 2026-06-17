import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff", 100: "#d9f1ff", 200: "#bce7ff", 300: "#8ed8ff",
          400: "#59c0ff", 500: "#33a3ff", 600: "#1b82f5", 700: "#146ae1",
          800: "#1756b6", 900: "#194b8f", 950: "#142e57",
        },
        accent: {
          50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
          400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
          800: "#065f46", 900: "#064e3b",
        },
        ink: {
          50: "#f6f7f9", 100: "#eceef2", 200: "#d4d9e2", 300: "#aeb7c7",
          400: "#828fa6", 500: "#62708a", 600: "#4c5871", 700: "#3e485c",
          800: "#363e4e", 900: "#0f1729", 950: "#080d18",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(16,24,40,0.08), 0 4px 24px -4px rgba(16,24,40,0.06)",
        glow: "0 0 0 1px rgba(27,130,245,0.1), 0 8px 30px -8px rgba(27,130,245,0.35)",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
