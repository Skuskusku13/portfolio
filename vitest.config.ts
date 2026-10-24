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
      // tests/ : garde-fous hors application (Node seul), typés par tsconfig.node.json.
      include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.ts'],
      css: false,
      // Aucun mock, stub global ou variable d'environnement ne survit à un test.
      restoreMocks: true,
      unstubGlobals: true,
      unstubEnvs: true,
      coverage: {
        provider: 'v8',
        include: ['src/hooks/**', 'src/components/**', 'src/lib/**', 'src/content/**', 'src/config.ts'],
        exclude: ['**/*.test.{ts,tsx}', 'src/test/**'],
        reporter: ['text', 'html', 'lcov'],
        reportsDirectory: './coverage',
        thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
      },
    },
  }),
);
