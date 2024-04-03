/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:{
    extend:{
      colors: {
        primary: "#b37367",
        secondary: {
          100: "#2c2c2c",
          900: "#525252",
        }
      }
    },
  },
  plugins: [],
}