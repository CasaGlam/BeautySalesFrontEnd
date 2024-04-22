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
          100: "#ffffff",
          900: "#e7eaf3",
        },
        texto: {
          100: "#000",
          900: "#fff"
        }
      }
    },
  },
  plugins: [],
}