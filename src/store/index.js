import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

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
			state.favoriteLocation = state.favoriteLocation.filter((item, index) => !_.isEqual(item, payload));
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
			if (context.state.favoriteLocation.findIndex(item => _.isEqual(item, location)) !== -1) {
				context.commit('REMOVE_FAVORITE', location);
			}
			else {
				context.commit('ADD_FAVORITE', location);
			}
		}
	}
})
