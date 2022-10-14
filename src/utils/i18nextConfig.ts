import { LanguageDetector } from 'i18next-http-middleware';
import i18next from 'i18next';
import { en, es } from '../config/index.js';

function i18nextConfig() {
  i18next
    .use(LanguageDetector)
    .init({
      preload: ['en', 'es'],
      supportedLngs: ['en', 'es'],
      lng: 'es',
      debug: true,
      resources: { en: { translation: en }, es: { translation: es } },
    });
}

export default i18nextConfig;
