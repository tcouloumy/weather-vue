import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/weather-icons.css'
import './assets/css/weather-icons-wind.css'
import store from './store'
import { i18n } from './plugins/i18n'
import formatTimestamp from '@/filters/formatTimestamp'
import formatTemperature from '@/filters/formatTemperature'

Vue.config.productionTip = false

Vue.filter('formatTemperature', formatTemperature);
Vue.filter('formatTimestamp', formatTimestamp);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
