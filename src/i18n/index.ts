import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations from JSON files
import en from './locales/en.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;