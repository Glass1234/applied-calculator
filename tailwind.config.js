/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ["SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}