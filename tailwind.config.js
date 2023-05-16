/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "var(--primary)",
        secondary : "var(--secondary)",
        grayText : "var(--grayText)",
        dark : "var(--dark)",
        pure : "var(--pure)" ,
        primaryHover : "var(--primaryHover)"
      }
    },
  },
  plugins: [],
}
