// @ts-check
import pluginPrettier from 'eslint-plugin-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

const nuxtConfig = withNuxt({
  name: 'project/custom-rules',
  plugins: {
    prettier: pluginPrettier,
  },
  rules: {
    'vue/no-unused-components': 'warn',
    'vue/require-v-for-key': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        tabWidth: 2,
      },
    ],
    curly: ['error', 'all'],
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
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'never',
      },
    ],
  },
});

export default nuxtConfig.append({
  ignores: ['.nuxt/**', '.nuxt/**', '.build/**', 'dist/**'],
});
