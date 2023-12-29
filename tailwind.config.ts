import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-neue-haas-grotesk)"],
        mono: ["var(--font-helvetica-monospaced)"],
      },
      colors: {
        "ex-blue": "rgb(var(--color-blue) / <alpha-value>)",
        "ex-grey": "rgb(var(--color-grey) / <alpha-value>)",
        "ex-light-grey": "rgb(var(--color-light-grey) / <alpha-value>)",
        "ex-red": "rgb(var(--color-red) / <alpha-value>)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
