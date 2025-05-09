module.exports = {
  // Run ESLint on JS/TS files
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],

  // Run Prettier on CSS, MD, and JSON files
  '*.{css,md,json}': ['prettier --write'],

  // Add TypeScript type checking for TS files
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
