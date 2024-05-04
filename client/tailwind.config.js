/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ejs}"],
  safelist: [
    "bg-slate-500",
    "bg-white",
    "bg-slate-300",
    "bg-[#B8F1B0]",
    "bg-[#E8FFB1]",
    "border-[#F2F7A1]",
    "bg-[#B8F1B0]",
    "border-[#071952]",
    "backdrop-blur-sm",
    "bg-[#F3F8FF]",
    "fill-lightpurple",
    "fill-navhoverfill",
    "btn-primary-purple",
    "btn-secondary-purple",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      kode: ["Kode Mono", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      mont: ["Montserrat", "sans-serif"],
    },
    extend: {
      translate: ["group-hover"],
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        19: "4.75rem",
        22: "5.5rem",
        58: "14.5rem",
        100: "25rem",
      },
      borderWidth: {
        1: "1px",
      },
      screens: {
        xxs: "400px",
        xs: "500px",
        "3xl": "1800px",
      },
      colors: {
        bodybg: "#f8f9fa",
        lightpurple: "#9376E0",
        navbg: "#dee2ff",
        navhoverfill: "#DEE2E6",
        "primary-purple": "oklch(var(--primary-purple) / <alpha-value>)",
        "secondary-purple": "oklch(var(--secondary-purple) / <alpha-value>)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss", require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "--primary-purple": "233 100% 94%",
          "--secondary-purple": "256 63% 67%",
        },
      },
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          accent: "#9376E0",
          secondary: "#dee2ff",
          "--primary-purple": "233 100% 94%",
          "--secondary-purple": "256 63% 67%",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "--primary-purple": "233 100% 94%",
          "--secondary-purple": "256 63% 67%",
        },
      },
    ],
  },
};
