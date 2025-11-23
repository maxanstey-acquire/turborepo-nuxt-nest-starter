// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import eslintPluginImport from 'eslint-plugin-import';

/**
 * Shared TypeScript + import + prettier config.
 * Call from each workspace and pass its tsconfig + ignores.
 */
export const baseConfig = ({
  tsconfigPath = './tsconfig.json',
  tsconfigRootDir = process.cwd(),
  ignores = [],
  extraGlobals = {},
  useImportPlugin = true,
} = {}) =>
  tseslint.config(
    { ignores },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettierRecommended,
    {
      plugins: useImportPlugin ? { import: eslintPluginImport } : {},
      languageOptions: {
        globals: { ...globals.node, ...extraGlobals },
        parserOptions: {
          project: [tsconfigPath],
          tsconfigRootDir,
          sourceType: 'module',
        },
      },
      rules: {
        ...(useImportPlugin
          ? {
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
                    { pattern: '@/**', group: 'internal', position: 'before' },
                    { pattern: '@app/**', group: 'internal', position: 'before' },
                  ],
                  pathGroupsExcludedImportTypes: ['builtin'],
                  alphabetize: { order: 'asc', caseInsensitive: true },
                  'newlines-between': 'never',
                },
              ],
            }
          : {}),
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        curly: ['error', 'all'],
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
