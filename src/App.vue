<template>
	<div id="app" >
		<div class="siimple-navbar">
			<LanguageSwitcher />
		</div>
		<div class="siimple-content siimple-content--large siimple--bg-light">
			<router-view/>
		</div>
	</div>
</template>

<script>

import LanguageSwitcher from './components/LanguageSwitcher.vue';

export default {
	name: 'App',
	components: {
		LanguageSwitcher
	},
	beforeCreate() {
		// Initialising the store
		this.$store.dispatch('initialiseStore');
		// Suscribing to store changes to update local storage
		this.$store.subscribe((mutation, state) => {
			localStorage.setItem('favoriteLocation', JSON.stringify(state.favoriteLocation));
		});
	}
}

</script>

<style>

* {
	outline: none;
}

html {
	min-height: 100%;
}

body {
	background: linear-gradient(#e9eff5, 10%, #dde5ee);;
}

body .siimple--bg-light {
	background-color: transparent !important;
}

.siimple-navbar > ul {
	float: right;
}

</style>
