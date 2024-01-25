/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.{html,js,templ,go}",
    "./templates/common/**/*.{html,js,templ,go}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Press Start 2P"],
    },
  },
  plugins: [],
};