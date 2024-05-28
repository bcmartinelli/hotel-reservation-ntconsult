import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    coverage: {
      exclude: [
        'src/main.ts',
        'src/plugins/vuetify.ts',
        'src/utils/mockApi.js'
      ]
    }
  },
});
