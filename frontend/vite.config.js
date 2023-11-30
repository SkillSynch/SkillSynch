import { defineConfig } from 'vitest/config';

// vite test config for react
export default defineConfig({
  test: {
    environment: 'jsdom',
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true,
  },
});
