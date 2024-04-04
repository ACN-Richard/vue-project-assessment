import axios from 'axios'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchCountries() {
      this.loading = true
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        this.countries = response.data
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})