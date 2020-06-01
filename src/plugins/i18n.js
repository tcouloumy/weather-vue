import Vue from 'vue';
import VueI18 from 'vue-i18n';
import en from '@/lang/en.json';

Vue.use(VueI18);
export const i18n = new VueI18({
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en }
})