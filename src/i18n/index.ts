import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import tw from './tw.json';
import vn from './vn.json';
import mm from './mm.json';
import id from './id.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { translation: en },
      tw: { translation: tw },
      vn: { translation: vn },
      mm: { translation: mm },
      id: { translation: id },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
