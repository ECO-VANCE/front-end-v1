import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "icon-dash-nao-selecionado": "url('/icon-dash-nao-selecionado.svg')",
        "icon-dash-selecionado": "url('/icon-dash-selecionado.svg')",
        "icon-energy_fonts-nao-selecionado": "url('/icon-energy_fonts-nao-selecionado.svg')",
        "icon-energy_fonts-selecionado": "url('/icon-energy_fonts-selecionado.svg')",
        "icon-project-nao-selecionado": "url('/icon-project-nao-selecionado.svg')",
        "icon-project-selecionado": "url('/icon-project-selecionado.svg')",
        "icon-logout": "url('/icon-logout.svg')",
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
      colors: {
        bg_black_1: "#131315",
        bg_black_2: "#131414",
        bg_gray: "#2c2c30",
        border_gray: "#2c2c30",
        bg_table_gray: "#1c1c21",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }: PluginAPI) {
      addBase({
        ":root": {
          "--tw-color-1": theme("colors.bg_black_1"),
          "--tw-color-2": theme("colors.bg_black_2"),
          "--tw-color-3": theme("colors.border_gray"),
          "--tw-color-4": theme("colors.bg_table_gray"),
        },
        "*": {
          margin: "0",
          padding: "0",
          "text-decoration": "none",
          "font-family": '"Inter", sans-serif',
          "font-style": "normal",
        },
      });
    },
  ],
};

export default config;
