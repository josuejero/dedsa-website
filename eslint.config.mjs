// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginNext from '@next/eslint-plugin-next';

// Restore `__dirname` in ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// **Pass `recommendedConfig: true`** whenever you extend `eslint:recommended`.
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true,
});

export default [
  // 1. ESLint’s built-in “recommended” rules + React’s recommended rules
  ...compat.extends('eslint:recommended', 'plugin:react/recommended'),

  // 2. React plugin rules
  {
    plugins: { react: pluginReact },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },

  // 3. React Hooks plugin rules
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // 4. Next.js plugin rules
  {
    plugins: { next: pluginNext },
    rules: {
      'next/core-web-vitals': 'error',
    },
  },
];
