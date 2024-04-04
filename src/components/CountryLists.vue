<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountryStore } from '../stores/countries'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const countriesStore = useCountryStore()
const countries: any = ref([])
const currentCountry: any = ref();
const showModal = ref(false);

const handleCountryData = (name) => {
  countriesStore.fetchCountryByName(name)
}

onMounted(async () => {
  await countriesStore.fetchCountries()
  countries.value = countriesStore.countries
})
</script>

<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-10" @close="showModal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-center">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ countriesStore.countryByName[0]?.name?.common }}</DialogTitle>
                    <div class="mt-2">
                      <img width="100%" :src="countriesStore.countryByName[0]?.flags.png" alt="">
                      <p class="mt-4 text-sm">Languages:</p>
                      <span class="text-xs mr-4" v-for="language in countriesStore.countryByName[0]?.languages">{{ language }}</span>

                      <p class="mt-4 text-sm">Currency:</p>
                      <span class="text-xs mr-4" v-for="currency in countriesStore.countryByName[0]?.currencies">{{ currency.name }}</span>

                      <p class="mt-4 text-sm">Borders:</p>
                      <span class="text-xs mr-4" v-for="border in countriesStore.countryByName[0]?.borders">{{ border }}</span>

                      <p class="mt-4 text-sm">Capital:</p>
                      <span class="text-xs mr-4" v-for="capital in countriesStore.countryByName[0]?.capital">{{ capital }}</span>

                      <p class="mt-4 text-sm">Continents:</p>
                      <span class="text-xs mr-4" v-for="continent in countriesStore.countryByName[0]?.continents">{{ continent }}</span>
                    </div>
                  </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="showModal = false" ref="cancelButtonRef">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="country in countries" :key="country.area" @click="handleCountryData(country.name.common), showModal = true" class="flex justify-between gap-x-6 py-5 cursor-pointer group-hover hover:bg-gray-100 p-6">
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
