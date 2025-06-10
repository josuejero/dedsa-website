// frontend/.eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@next/next/no-async-client-component': 'warn',
    '@next/next/no-img-element': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: { browser: true, node: true, es6: true },
};
