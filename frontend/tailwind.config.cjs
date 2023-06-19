/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          dark: 'var(--color-text-dark)',
          light: 'var(--color-text-light)',
          'gray-dark': 'var(--color-text-gray-dark)',
          'gray-light': 'var(--color-text-gray-light)',
          main: 'var(--color-main)',
          primary: 'var(--color-primary)',
          white: 'var(--color-text-white)',
          black: 'var(--color-text-black)',
          red: 'var(--color-text-red)',
          green: 'var(--color-text-green)',
          gray: 'var(--color-text-gray)',
          gray500: 'var(--color-text-gray-500)',
        },
      },
      backgroundColor: {
        skin: {
          dark: 'var(--color-background-dark)',
          light: 'var(--color-background-light)',
          main: 'var(--color-main)',
          black: 'var(--color-background-black)',
          white: 'var(--color-background-white)',
          button: 'var(--color-button)',
          primary: 'var(--color-primary)',
          gray: 'var(--color-background-gray)',
          bar: 'var(--color-background-bar-gray)',
          infobox: 'var(--color-background-infobox)',
          'purple-light': 'var(--color-background-purple-light)',
          'purple-dark': 'var(--color-background-purple-dark)',
          'box-light': 'var(--color-background-box-light)',
        },
      },
      padding: {
        skin: {
          navbar: 'var(--pl-navbar)',
        },
      },
      fontFamily: {
        Lobster: ['Lobster'],
      },
    },
    // screens: {
    //   '2xl': { max: '1500px' },
    //   // => @media (max-width: 1500px) { ... }
    //
    //   xl: { max: '1300px' },
    //   // => @media (max-width: 1300px) { ... }
    //
    //   lg: { max: '800px' },
    //   // => @media (max-width: 800px) { ... }
    //
    //   md: { max: '600px' },
    //   // => @media (max-width: 600px) { ... }
    //
    //   sm: { max: '350px' },
    //   // => @media (max-width: 350px) { ... }
    // },
  },
  plugins: [],
}
