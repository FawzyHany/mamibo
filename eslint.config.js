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
];
