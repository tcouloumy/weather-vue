import Vue from 'vue';
import Vuex from 'vuex';
import { areEquals } from '@/helpers/location';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		favoriteLocation: []
	},
	mutations: {
		ADD_FAVORITE(state, payload) {
			state.favoriteLocation.push(payload);
		},
		REMOVE_FAVORITE(state, payload) {
			state.favoriteLocation = state.favoriteLocation.filter((item, index) => !areEquals(item, payload));
		},
		SORT_FAVORITE(state, sortKey) {
			state.favoriteLocation.sort((a, b) => {
				if (a.locality < b.locality) {
					return -1;
				}
				if (a.locality > b.locality) {
					return 1;
				}
				return 0;
			})
		}
	},
	actions: {
		/**
		* Initialise store with local storage data if it exists
		* @param {Object} context Current store context
		*/
		initialiseStore(context) {
			if (localStorage.getItem('favoriteLocation')) {
				Object.assign(context.state.favoriteLocation, JSON.parse(localStorage.getItem('favoriteLocation')))
			}
		},

		/**
		* Add a location to the favorite it doesn't exists, removes if it does
		* @param {Object} context Current store context
		* @param {Object} location Location object payload
		*/
		toggleFavorite(context, location) {
			if (context.state.favoriteLocation.findIndex(item => areEquals(item, location)) !== -1) {
				context.commit('REMOVE_FAVORITE', location);
			}
			else {
				context.commit('ADD_FAVORITE', location);
				context.commit('SORT_FAVORITE', location);
			}
		}
	}
})
