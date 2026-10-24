import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

/**
 * Tests unitaires et de composants : Vitest + React Testing Library sous jsdom.
 * La couverture ne cible que le code applicatif (hooks et composants), seuil 80 %.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      css: false,
      coverage: {
        provider: 'v8',
        include: ['src/hooks/**', 'src/components/**'],
        exclude: ['**/*.test.{ts,tsx}', 'src/test/**'],
        reporter: ['text', 'html', 'lcov'],
        reportsDirectory: './coverage',
      },
    },
  }),
);
