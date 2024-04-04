import axios from 'axios'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    isCountriesLoading: false,
    isCountriesError: null,

    countryByName: {},
    loading: false,
    error: null
  }),
  actions: {
    async fetchCountries() {
      this.isCountriesLoading = true
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        this.countries = response.data
      } catch (error: any) {
        console.log('error', error);
        this.isCountriesError = error.message
      } finally {
        this.isCountriesLoading = false
      }
    },
    async fetchCountryByName(name: string) {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      this.countryByName = response.data
    }
  }
})