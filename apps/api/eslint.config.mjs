// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import boundaries from 'eslint-plugin-boundaries';
import eslintPluginImport from 'eslint-plugin-import';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'prisma.config.ts',
      'dist',
      'node_modules',
      'dist/**/*.ts',
      'dist/**',
      "**/*.mjs",
      "**/*.js"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      boundaries,
      import: eslintPluginImport,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
      },
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
      'boundaries/elements': [
        { type: 'apps', pattern: 'apps/backend/src/apps', mode: 'folder' },
        { type: 'shared', pattern: 'apps/backend/src/types', mode: 'folder' },
        { type: 'shared', pattern: 'apps/backend/src/utils', mode: 'folder' },
        { type: 'shared', pattern: 'apps/backend/src/pipes', mode: 'folder' },
        { type: 'shared', pattern: 'apps/backend/src/docs', mode: 'folder' },
        { type: 'infra', pattern: 'apps/backend/src/infra', mode: 'folder' },
        {
          type: 'domain',
          pattern: 'apps/backend/src/modules/*/domain',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'application',
          pattern: 'apps/backend/src/modules/*/application',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'infrastructure',
          pattern: 'apps/backend/src/modules/*/infrastructure',
          mode: 'folder',
          capture: ['module'],
        },
        {
          type: 'interfaces',
          pattern: 'apps/backend/src/modules/*/interfaces',
          mode: 'folder',
          capture: ['module'],
        },
        { type: 'test', pattern: '**/*.{spec,test}.{ts,tsx,js,jsx}' },
        { type: 'test', pattern: '**/__tests__/**' },
      ],
    },
    rules: {
      'boundaries/no-unknown': 'error',
      'boundaries/no-private': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
            ['object', 'type'],
          ],
          pathGroups: [
            { pattern: '@core/**', group: 'internal', position: 'before' },
            { pattern: '@media/**', group: 'internal', position: 'before' },
            { pattern: '@storage/**', group: 'internal', position: 'before' },
            { pattern: '@transcription/**', group: 'internal', position: 'before' },
            { pattern: '@reports/**', group: 'internal', position: 'before' },
            { pattern: '@http/**', group: 'internal', position: 'before' },
            { pattern: '@shared/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          semi: true,
          tabWidth: 2,
          endOfLine: 'auto',
        },
      ],
    },
  },
);
