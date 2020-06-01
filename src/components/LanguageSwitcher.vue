<template>
	<ul>
		<li v-for="lang in languages" @click="changeLanguage(lang)">
			{{ lang }}
		</li>
	</ul>
</template>

<script>

export default {
	
	name: 'LanguageSwitcher',
	data() {
		return {
			languages: ['en', 'fr']
		}
	},
	methods: {
		changeLanguage(lang) {
			this.$i18n.locale = lang;
			// Change the lang parameter in URL
			this.$router.push({path: this.$router.currentPath, params: { lang }});
			// Not ideal, but reloading the page so the externals data are re-fetched in the 
			// newly set language
			this.$router.go();
		}
	}

}
</script>

<style scoped>
</style>
