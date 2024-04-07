/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      gap: {
        '11': '10%',
      },
      flex: {
        '50' : '50%'
      }
    }
  },
  plugins: [],
}

