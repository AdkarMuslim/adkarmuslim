import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  // glob واسع: يغطي lib وغيره، ويتجنّب فقدان كلاسات على Linux/Vercel (حساسية المسارات)
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    /**
     * lg الافتراضي 1024px — متصفحات «عرض سطح المكتب» على الهاتف تعطي غالباً ~980px
     * فيبقى الشريط السفلي والهيدر المحمول. 900px يفعّل واجهة الديسكتوب عند هاد العرض.
     */
    screens: {
      sm: "640px",
      md: "768px",
      lg: "900px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
