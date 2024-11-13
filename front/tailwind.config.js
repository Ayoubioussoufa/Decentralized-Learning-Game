/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'gold': '#C8AA6E',
        'gray2': '#A2A0B1',
      },
      screens: {
        xs: '540px', // Custom xs breakpoint at 540px
      },
    },
  },
  plugins: [],
}

