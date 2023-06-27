/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: { dark: "#45719E", light: "#A9C4DD", bg: "#F2F6FA" },
      },
    },
    fontFamily: {
      Indie: ["Indie Flower", "cursive"],
    },
  },
  plugins: [],
};
