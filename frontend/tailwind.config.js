/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dsa-red': '#ec1f27',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#ec1f27',
              '&:hover': {
                color: '#dc2626',
              },
            },
          },
        },
      },
      animation: {
        morphBlob: 'morphBlob 10s ease-in-out infinite alternate',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
