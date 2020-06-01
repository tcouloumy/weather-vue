import Search from '@/views/Search.vue';
import Forecast from '@/views/Forecast.vue';
import { SUPPORTED_LANGUAGES } from '@/constants/language'
import { i18n } from '@/plugins/i18n';

export default [{
	path: '/:lang',
	component: {
		template: '<router-view></router-view>'
	},
	beforeEnter(to, from, next) {
		
		const lang = to.params.lang;

		// TODO : do not hardcode possible languages
		if (!SUPPORTED_LANGUAGES.includes(lang)) return next('en');
		if (i18n.locale === lang) return next();

		// Async load of translation file
		import('@/lang/'+lang+'.json').then((locales) => {
			i18n.setLocaleMessage(lang, locales.default || locales);
			i18n.locale = lang;
			return next();
		})

	},
	children: [{
		path: '',
		name: 'Search',
		component: Search
	},
	{
		path: 'forecast/:locationString',
		name: 'Forecast',
		component: Forecast
	}]
}]