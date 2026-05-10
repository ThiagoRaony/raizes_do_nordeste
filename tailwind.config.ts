/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          terra: '#C75B3A',
          'terra-dark': '#A34528',
          'terra-light': '#E07A5F',
          areia: '#F4E4C1',
          'areia-dark': '#E8D5A8',
          coqueiro: '#2D6A4F',
          'coqueiro-dark': '#1B4D3A',
          'coqueiro-light': '#4A9E78',
          mar: '#1D4E6F',
          'mar-dark': '#123B55',
          'mar-light': '#2E6B94',
          creme: '#FFF9F0',
          'creme-warm': '#FDF6EC',
          grafite: '#2D2D2D',
          'grafite-light': '#4A4A4A',
          'grafite-muted': '#6B6B6B',
        },
        fontFamily: {
          display: ['"DM Sans"', 'sans-serif'],
          body: ['"Inter"', 'sans-serif'],
          serif: ['"Cormorant Garamond"', 'serif'],
          script: ['"Great Vibes"', 'cursive'],
        },
      },
    },
    plugins: [],
  }
