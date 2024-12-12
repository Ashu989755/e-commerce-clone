
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../../src/languages/en.json';
import sp from '../../src/languages/sp.json';
import hi from '../../src/languages/hi.json';
import ch from '../../src/languages/ch.json';

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next)  // Passes i18n to react-i18next
  .init({
    resources: {
      en: { translation: en },
      sp: { translation: sp },
      hi: { translation: hi },
      ch: { translation: ch },
    },
    fallbackLng: 'en',  // Fallback language if detection fails
    interpolation: { escapeValue: false },
  });

export default i18n;

