import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import Forecast from '../views/Forecast.vue'

Vue.use(VueRouter)

	const routes = [
	{
		path: '/',
		name: 'Search',
		component: Search
	},
	{
		path: '/forecast/:locationString',
		name: 'Forecast',
		component: Forecast
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
