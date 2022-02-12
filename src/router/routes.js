import Search from '../views/Search.vue';
import ForecastDetails from '../views/ForecastDetails.vue';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/language';
import { i18n } from '../plugins/i18n';

export default [{
  path: '/',
  redirect: `/${DEFAULT_LANGUAGE}`
}, {
  path: '/:lang',
  component: {
    template: '<router-view></router-view>'
  },
  beforeEnter(to, from, next) {
    const { lang } = to.params;

    if (!SUPPORTED_LANGUAGES.includes(lang)) return next('en');
    if (i18n.locale === lang) return next();

    // Async load of translation file
    import(`@/lang/${lang}.json`)
      .then((locales) => {
        i18n.setLocaleMessage(lang, locales.default || locales);
        i18n.locale = lang;

        return next();
      });

    return null;
  },
  children: [{
    path: '',
    name: 'Search',
    component: Search
  },
  {
    path: 'forecast/:locationString',
    name: 'Forecast',
    component: ForecastDetails
  }]
}
];
