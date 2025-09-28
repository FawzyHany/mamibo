// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'src/generated/prisma/**', // ✅ Ignore generated Prisma files
      'node_modules/**',
      '.next/**',
      'dist/**',
    ],
  },
];
