/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Custom Delaware DSA colors
      colors: {
        'dsa-red': '#ec1f27', // Primary DSA red color
        'dsa-black': '#231f20', // DSA black color
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
