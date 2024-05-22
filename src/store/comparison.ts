import { Hotel } from '@/types';
import { defineStore } from 'pinia';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    selectedHotels: [] as Hotel[],
  }),
  actions: {
    setSelectedHotels(hotels: Hotel[]) {
      this.selectedHotels = hotels;
    },
  },
});
