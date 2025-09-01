/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { // You need to define custom fonts under the 'fontFamily' key
        ralewayM: ['RalewayM', 'sans-serif'],
        ralewayL: ['RalewayL', 'sans-serif'],
        ralewaySb: ['RalewaySb', 'sans-serif'],
        ralewayB: ['RalewayB', 'sans-serif'],
        ralewayR: ['RalewayR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};