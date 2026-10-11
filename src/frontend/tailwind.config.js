import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        cream: "oklch(0.965 0.004 250)",
        sand: "oklch(0.915 0.012 235)",
        espresso: "oklch(0.205 0.014 255)",
        cocoa: "oklch(0.44 0.135 245)",
        clay: "oklch(0.44 0.135 245)",
        "clay-dark": "oklch(0.36 0.12 245)",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        elevated: "var(--shadow-elevated)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "rivet-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "rivet-pulse": "rivet-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
