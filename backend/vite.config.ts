import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './src/index.ts',
        redisClient: './src/redisClient.ts',
      },
    },
  },
  server: {
    port: 3000,
  },
});
