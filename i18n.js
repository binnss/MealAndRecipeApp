import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json'; // English translations
import esTranslation from './locales/es.json'; // Spanish translations
import zhTranslation from './locales/zh.json'; // Chinese translations
import frTranslation from './locales/fr.json'; // French translations
import koTranslation from './locales/ko.json'; // Korean translations

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      zh: { translation: zhTranslation },
      fr: { translation: frTranslation },
      ko: { translation: koTranslation },
      // Add more languages as needed
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
