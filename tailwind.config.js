/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "strong-red": "#FF0000",
        "university-red": "#CC0000",
        "cerulean-blue": "#3B4CCA",
        "golden-yellow": "#FFDE00",
        "gold-foil": "#B3A125",
        "dark-red": "#0F0000",
        "white-yellow": "#FFFDF0"
      }
    },
  },
  plugins: [],
}

