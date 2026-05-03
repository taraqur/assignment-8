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
        "on-background": "#161d1f",
        "on-primary": "#ffffff",
        "surface": "#f4fafd",
        "primary": "#a53b22",
        "primary-container": "#ff7e5f",
        "on-primary-container": "#721702",
        "on-surface-variant": "#57423d",
        "secondary": "#895121",
        "tertiary": "#00677d",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "sm": "12px",
        "md": "24px",
        "lg": "48px",
        "xl": "80px",
        "base": "8px",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
