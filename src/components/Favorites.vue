<template>
	<div class="favorites">
		<h2 class="siimple--my-0">{{$t('favorites.title')}}</h2>
		<p class="siimple-small siimple--mt-0">{{$t('favorites.updated_at')}} xxx</p>

		<ul>
			<li v-for="location in favoriteLocation">
				<FavoriteTab v-bind:location="location" />
			</li>
		</ul>
	</div>
</template>

<script>

import { mapState } from 'vuex';
import FavoriteTab from './FavoriteTab.vue';
import { locationToString } from './../helpers/location';

export default {
	
	name: 'Favorites',
	components: {
		FavoriteTab
	},
	computed: {
		...mapState(['favoriteLocation'])
	},
	mounted() {
		console.log(this.$i18n.locale);
	}
}
</script>

<style scoped>

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

li {
	display: inline-block;
}

</style>
