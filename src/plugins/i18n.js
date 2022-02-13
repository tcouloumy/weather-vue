import Vue from 'vue';
import VueI18 from 'vue-i18n';
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '../constants/language';
import en from '../lang/en.json';
import fr from '../lang/fr.json';

Vue.use(VueI18);

export const i18n = new VueI18({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { en, fr }
});

export default i18n;
