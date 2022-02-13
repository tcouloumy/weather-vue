<!-- LanguageSwitcher.vue -->
<!-- Changes the locale depending on the clicked supported language -->

<template>
  <ul>
    <li v-for="lang in languages">
      <a
        href="#"
        :class="{ 'active': isActive(lang) }"
        @click="changeLanguage(lang)"
      >
        <img :src="require('@/assets/images/'+lang+'.png')">
      </a>
    </li>
  </ul>
</template>

<script>

import { SUPPORTED_LANGUAGES } from '../constants/language';

export default {

  name: 'LanguageSwitcher',
  data() {
    return {
      languages: SUPPORTED_LANGUAGES
    };
  },
  methods: {
    /**
    * Change current locale and reload the page
    * @param {String} lang Locale to set
    */
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      // Change the lang parameter in URL
      this.$router.push({ path: this.$router.currentPath, params: { lang } });
    },

    /**
    * Return true if lang is the current locale, false otherwise
    * @param {String} lang Locale to check
    */
    isActive(lang) {
      return this.$i18n.locale === lang;
    }
  }
};
</script>

<style lang="scss" scoped>

ul {

  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
    margin-right: 10px;

    a {
      &:not(.active) {
        opacity: .3;
      }

      img {
        height: 12px;
      }
    }
  }
}

</style>
