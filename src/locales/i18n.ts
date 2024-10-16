import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationVN from './vi/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

// i18n.changeLanguage(lng);

export default i18n;
