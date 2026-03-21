import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B5E20",
        },
        accent: {
          DEFAULT: "#D4A843",
        },
        card: {
          DEFAULT: "#111827",
        },
        bg: {
          DEFAULT: "#0a0a1a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.45)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
