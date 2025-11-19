import { resolve } from 'node:path';
import { defineNuxtConfig } from 'nuxt/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const projectRoot = resolve(__dirname, '..', '..');
const rootTsconfig = resolve(projectRoot, 'tsconfig.base.json');

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  devServer: {
    host: 'localhost',
    port: 4200,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  css: ['./src/assets/scss/app.scss'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL ?? 'http://localhost:3100',
    },
  },
  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [
      tsconfigPaths({
        projects: [rootTsconfig],
      }),
    ],
  },
});
