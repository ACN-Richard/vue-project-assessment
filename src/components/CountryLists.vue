<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="country in countries" :key="country.area" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="country.flags.svg" alt="" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ country.name.common }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ country.region }}</p>
        </div>
      </div>
      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Population</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ country.population.toLocaleString() }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountryStore } from '../stores/countries'

const countriesStore = useCountryStore()
const countries: any = ref([])

onMounted(async () => {
  await countriesStore.fetchCountries()
  countries.value = countriesStore.countries
})
</script>
