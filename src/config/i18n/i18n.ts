import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';
import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';

export const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

// export const selectedLanguage = (lang: string) => {
//   // if (lang) {
//   //   I18n.locale = lang;
//   //   moment.locale(lang);
//   // } else if (Array.isArray(locales)) {
//   //   I18n.locale = locales[0].languageCode;
//   // }
// };
I18n.locale = 'fr';
I18n.fallbacks = true;
I18n.translations = {
  es,
  en,
  fr,
};

export default I18n;
