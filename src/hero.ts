// hero.ts
import { heroui } from "@heroui/theme";
// or import from theme package if you are using individual packages.
// import { heroui } from "@heroui/theme";
export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          50: "#FDFDE0",
          100: "#FBFBB2",
          200: "#F7F77A",
          300: "#F3F342",
          400: "#EFEF1A",
          500: "#EBEB3E",
          600: "#4a4a1a",
          700: "#333310",
          800: "#1a1a0a",
          900: "#0d0d05",
          DEFAULT: "#EBEB3E",
          foreground: "#1a1a1a",
        },
      },
    },
  },
});
