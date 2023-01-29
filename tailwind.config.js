/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");
const trainColors = require("./train-colors");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: trainColors.colors,
      keyframes: {
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        spin: "spin 0.7s cubic-bezier(0.210, 0.750, 0.285, 0.835) ",
      },
    },
  },
  plugins: [
    addDynamicIconSelectors()
  ],
};
