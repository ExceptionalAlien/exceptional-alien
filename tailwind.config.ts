import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-neue-haas-grotesk)"],
        mono: ["var(--font-helvetica-monospaced)"],
      },
      colors: {
        "ex-blue": "var(--color-blue)",
        "ex-grey": "var(--color-grey)",
        "ex-light-grey": "var(--color-light-grey)",
        "ex-red": "var(--color-red)",
      },
    },
  },
  plugins: [],
};
export default config;
