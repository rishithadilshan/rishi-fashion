/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#eef6f6',
          100: '#d7e9e9',
          200: '#b2d5d4',
          300: '#89bfbd',
          400: '#6bafad',
          500: '#5a9c9a',
          600: '#4a807e',
          700: '#3c6867',
          800: '#2c4d4c',
          900: '#1c3231',
        },
        cream: '#f7f3ef',
        clay: '#c0392b',
        gold: '#c8952e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
