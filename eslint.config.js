// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Modern ESLint + TypeScript configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ Next.js compat config
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // ✅ Your ignores (merged)
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/generated/prisma/**',
    ],
  },

  // ✅ Custom rules to change error -> warn
  {
    rules: {
      // Next.js <Link> wrapper rule
      '@next/next/link-passhref': 'warn',

      // Accessibility rules about raw ' in JSX
      'jsx-a11y/no-invalid-aria-props': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      // Add any other related jsx-a11y rules here as needed

      // Example: allow raw quotes in JSX by warning instead of error
      'react/no-unescaped-entities': 'warn',
    },
  },
];
