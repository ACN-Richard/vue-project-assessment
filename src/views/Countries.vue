<script setup lang="ts">
import CountryLists from '../components/CountryLists.vue'
import EmptyState from '../components/EmptyState.vue'
import { useCountryStore } from '../stores/countries'

const countriesStore = useCountryStore()

console.log('countriesStore', countriesStore.isCountriesError);
</script>

<template>
  <main>
    <CountryLists v-if="!countriesStore.isCountriesError"/>
    <EmptyState :title="countriesStore?.isCountriesError" :message="'If the issue persists or if you need further assistance, feel free to reach out to our support team at support@example.com'" v-if="countriesStore.isCountriesError"/>
  </main>
</template>
