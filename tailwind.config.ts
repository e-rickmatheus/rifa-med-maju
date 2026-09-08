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
        navy: {
          950: "#040b17",
          900: "#07162c",
          850: "#0b203e",
          800: "#0e294f",
          700: "#173b6f",
          600: "#225295",
        },
        gold: {
          100: "#fbf6e8",
          200: "#f5e8c3",
          300: "#edd392",
          400: "#e0b852",
          500: "#cda02a",
          600: "#af811c",
          700: "#8c6217",
        },
        cream: {
          50: "#fffefb",
          100: "#fdfbf5",
          200: "#f7f2e4",
          300: "#ede2cb",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(205, 160, 42, 0.25)",
        "gold-lg": "0 10px 30px -4px rgba(205, 160, 42, 0.35)",
        navy: "0 10px 30px -4px rgba(7, 22, 44, 0.4)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f5e8c3 0%, #e0b852 50%, #cda02a 100%)",
        "gold-metallic": "linear-gradient(90deg, #dfbe58 0%, #fbf6e8 30%, #cda02a 70%, #af811c 100%)",
        "navy-gradient": "linear-gradient(180deg, #07162c 0%, #0b203e 50%, #07162c 100%)",
        "cream-gradient": "linear-gradient(180deg, #ffffff 0%, #fdfbf5 50%, #f7f2e4 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
