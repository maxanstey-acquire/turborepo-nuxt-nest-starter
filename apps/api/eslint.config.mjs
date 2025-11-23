// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import boundaries from 'eslint-plugin-boundaries';
import eslintPluginImport from 'eslint-plugin-import';
import { baseConfig } from '../../eslint.base.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  ...baseConfig({
    tsconfigPath: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    ignores: [
      'eslint.config.mjs',
      'prisma.config.ts',
      'dist',
      'node_modules',
      '**/*.mjs',
      '**/*.js',
    ],
    extraGlobals: {
      ...globals.jest,
    },
  }),
  {
    plugins: {
      boundaries,
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.eslint.json'],
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        },
      },
      'boundaries/ignore': ['@app/**', '@orpc/**', '@nestjs/**'],
      'boundaries/elements': [
        {
          type: 'domain',
          pattern: 'src/modules/*/domain',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'application',
          pattern: 'src/modules/*/application',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'interface',
          pattern: 'src/modules/*/*.controller.ts',
          mode: 'file',
          capture: ['module'],
        },
        {
          type: 'infrastructure',
          pattern: 'src/modules/*/infrastructure',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'shared',
          pattern: 'src/shared/**',
          mode: 'folder',
        },
        { type: 'test', pattern: '**/*.{spec,test}.{ts,tsx,js,jsx}' },
        { type: 'test', pattern: '**/__tests__/**' },
      ],
    },
    rules: {
      'boundaries/no-unknown': 'off',
      'boundaries/no-private': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'domain', allow: ['domain'] },
            { from: 'application', allow: ['domain', 'application', 'shared'] },
            {
              from: 'infrastructure',
              allow: ['application', 'domain', 'shared'],
            },
            {
              from: 'interface',
              allow: ['application', 'shared'],
            },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
    },
  },
);
