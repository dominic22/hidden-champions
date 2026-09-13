const path = require("path");
const { heroui } = require("@heroui/react");

// @heroui/theme is not always hoisted to the top-level node_modules (npm may
// nest it under @heroui/react). Resolve its real location so Tailwind can scan
// the component class names; otherwise HeroUI components render unstyled.
function herouiThemeContent() {
  try {
    const themePkg = require.resolve("@heroui/theme/package.json", {
      paths: [path.dirname(require.resolve("@heroui/react"))],
    });
    return path.join(path.dirname(themePkg), "dist/**/*.{js,mjs}");
  } catch (e) {
    return "./node_modules/**/@heroui/theme/dist/**/*.{js,mjs}";
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", herouiThemeContent()],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Warm interior / lighting inspired palette (see moodboard)
        cream: "#FBF3EC",
        sand: "#F6E7DA",
        peach: "#F7D8C4",
        sage: "#D2E1C4",
        butter: "#F6E7A6",
        sky: "#C9DEEE",
        terracotta: {
          50: "#FDF0EA",
          100: "#F9D8C9",
          200: "#F3B49B",
          300: "#EC8B65",
          400: "#E4622F",
          500: "#D9401E",
          600: "#B93216",
          700: "#932711",
          800: "#6E1D0D",
          900: "#4A1308",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FBF3EC",
            foreground: "#3A2418",
            primary: {
              50: "#FDF0EA",
              100: "#F9D8C9",
              200: "#F3B49B",
              300: "#EC8B65",
              400: "#E4622F",
              500: "#D9401E",
              600: "#B93216",
              700: "#932711",
              800: "#6E1D0D",
              900: "#4A1308",
              DEFAULT: "#D9401E",
              foreground: "#FFFFFF",
            },
            focus: "#D9401E",
          },
        },
      },
    }),
  ],
};
