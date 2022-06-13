/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '4': '[index] 16px [first] 4fr [var1] 2fr [var2] 2fr [var3] 3fr [last] minmax(120px,1fr)',
        'artists': '[index] 2% [first] 23% [var1] 15% [var2] 30% [last] 20%'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
