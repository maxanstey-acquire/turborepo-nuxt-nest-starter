// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import { baseConfig } from '../../eslint.base.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  ...baseConfig({
    tsconfigPath: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ignores: ['dist/**', 'node_modules', 'eslint.config.mjs'],
  }),
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
  },
  {
    rules: {
      // Enforce extensionless imports across contracts outputs.
      'import/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
      ],
    },
  },
);
