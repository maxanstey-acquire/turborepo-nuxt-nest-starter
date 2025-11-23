// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseConfig } from '../../eslint.base.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default baseConfig({
  tsconfigPath: './tsconfig.json',
  tsconfigRootDir: __dirname,
  ignores: ['dist/**', 'node_modules', 'eslint.config.mjs'],
});
