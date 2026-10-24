/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL publique de l'API de contact (POST JSON), inlinée au build. Absente en dev sans .env. */
  readonly VITE_MAILER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
