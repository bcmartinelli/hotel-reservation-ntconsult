import { defineStore } from 'pinia';
import axios from 'axios';
import { Hotel, SearchCriteria } from '@/types';

export const useSearchStore = defineStore('search', {
  state: () => ({
    criteria: {} as SearchCriteria,
    hotels: [] as Hotel[],
  }),
  actions: {
    setCriteria(criteria: SearchCriteria) {
      this.criteria = criteria;
    },
    async fetchHotels() {
      try {
        const response = await axios.get('/api/hotels', {
          params: this.criteria,
        });
        this.hotels = response.data;
      } catch (error) {
        console.error('Error fetching hotels', error);
      }
    },
  },
});
