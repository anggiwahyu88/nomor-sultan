/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6c55f9",
        secondary: "#6c7afa",
        dark: "#645F88",
      },
    },
  },
  plugins: [],
};
