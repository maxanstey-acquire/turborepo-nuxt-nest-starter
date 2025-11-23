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
    ignores: ['dist/**', 'node_modules', 'generated/**', 'eslint.config.mjs'],
  }),
  {
    rules: {
      // Allow extensionless imports so tsc-alias can rewrite to .js at emit time.
      'import/extensions': 'off',
    },
  },
);
