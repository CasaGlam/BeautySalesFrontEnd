/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:{
    extend:{
      colors: {
        primary: "#feb4a6",
        secondary: {
          100: "#1E1F25",
          900: "#131517",
        }
      }
    },
  },
  plugins: [],
}