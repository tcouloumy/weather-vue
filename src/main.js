import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/weather-icons.css'
import './assets/css/weather-icons-wind.css'
import store from './store'
import { formatTemperature, degToCompass } from '@/helpers/number';
import { i18n } from './plugins/i18n'

Vue.config.productionTip = false

Vue.filter('formatTemperature', formatTemperature);
Vue.filter('degToCompass', degToCompass);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
