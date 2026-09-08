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
        // Deep Navy (#0A1A32) as the new Black
        navy: {
          DEFAULT: "#0A1A32",
          950: "#060F1F",
          900: "#0A1A32",
          850: "#0E2242",
          800: "#132D56",
          700: "#1D3E74",
          600: "#2B569E",
        },
        // Pearl Off-White (#F5F4F0) as the luxury background
        pearl: {
          DEFAULT: "#F5F4F0",
          50: "#FAF9F6",
          100: "#F5F4F0",
          200: "#EAE7DF",
          300: "#DDD8CD",
          400: "#CCC5B5",
        },
        // Primary Action Blue
        primaryBlue: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
          light: "#DBEAFE",
        },
        // Sophisticated Emerald Green (#2D7D66)
        emerald: {
          DEFAULT: "#2D7D66",
          50: "#F2F8F6",
          100: "#E3F1EC",
          600: "#2D7D66",
          700: "#246552",
          800: "#1A493B",
        },
        // Antique Gold (#C0B283) - muted, prestigious accent
        antique: {
          DEFAULT: "#C0B283",
          100: "#F7F5EE",
          200: "#EBE6D7",
          300: "#DDD5BE",
          400: "#CFC3A0",
          500: "#C0B283",
          600: "#A89865",
          700: "#8B7D4F",
        },
      },
      fontFamily: {
        serif: ["Lora", "Playfair Display", "Merriweather", "Georgia", "serif"],
        sans: ["Montserrat", "Open Sans", "Lato", "system-ui", "-apple-system", "sans-serif"],
        display: ["Playfair Display", "Lora", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
