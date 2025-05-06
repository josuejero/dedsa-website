module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '*.{css,md,json}': ['prettier --write', 'git add'],
};
