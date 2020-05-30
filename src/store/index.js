import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		favoriteLocation: []
	},
	mutations: {
		ADD_FAVORITE(state, payload) {
			state.favoriteLocation.push(payload);
		},
		// REMOVE_FAVORITE(state, payload) {
		// 	state.favoriteLocation.filter(location, index) => 
		// }

		// state.favoritesFilm.filter((item, index) => index !== filmIndex)
	},
	actions: {
		toggleFavorite(context, location) {
		// 	if (amount >= 0) {
				context.commit('ADD_FAVORITE', location)
		// 	} else {
		// 		context.commit('REMOVE_FAVORITE', amount)
		// 	}
		}
	}
})
