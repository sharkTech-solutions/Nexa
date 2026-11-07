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
        deep: "#05070B",
        primaryBg: "#080B11",
        surface: "#0E131F",
        surfaceElevated: "#141B2B",
        blueBrand: {
          DEFAULT: "#0066FF",
          hover: "#1A75FF",
          soft: "rgba(0, 102, 255, 0.12)",
        },
        skyBrand: "#38BDF8",
        emeraldBrand: {
          DEFAULT: "#10B981",
          soft: "rgba(16, 185, 129, 0.12)",
        },
        amberBrand: "#F59E0B",
        slateDim: "#64748B",
        textTitle: "#FFFFFF",
        textBody: "#E2E8F0",
        textMuted: "#94A3B8",
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'SF Mono'",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
