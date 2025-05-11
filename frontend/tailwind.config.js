// frontend/tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // ← Register here
    require('@tailwindcss/line-clamp'), // if using other plugins
    // …other plugins…
  ],
};
