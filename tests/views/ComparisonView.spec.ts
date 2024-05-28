import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from '../test-utils';
import { useComparisonStore } from '@/store/comparison';
import router from '@/router';
import { Hotel } from '@/types';
import ComparisonView from '@/views/ComparisonView.vue';
import CardHotel from '@/components/CardHotel.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing'


describe('ComparisonView.vue', () => {
  let wrapper: any;
  let comparisonStore: any;

  beforeAll(async () => {
    router.push('/comparacoes');
    await router.isReady();
  })

  it('should displays message when no hotels are selected', () => {
    wrapper = mountWithVuetify(ComparisonView);

    expect(wrapper.find('.text-h5').text()).toBe('Compare entre suas escolhas');
    expect(wrapper.find('h2').text()).toBe('Ops! Sem hotéis selecionados');
  });

  it('should displays selected hotels correctly', async () => {
   const hotels = [
      { id: 1, name: 'Hotel A', price: 160, rating: 4.5, country: 'Brasil', image: 'hotel_a.jpg' },
      { id: 2, name: 'Hotel B', price: 200, rating: 4.0, country: 'Argentina',  image: 'hotel_b.jpg',}
    ];
    wrapper = mountWithVuetify(ComparisonView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              comparison: {
                selectedHotels: hotels
              }
            }
          })
        ]
      }
    });

    comparisonStore = useComparisonStore();

    expect(comparisonStore.selectedHotels.length).toBe(2);
    expect(comparisonStore.selectedHotels[0].name).toBe('Hotel A');

    const hotelCards = wrapper.findAllComponents({ name: 'CardHotel' });
    expect(hotelCards.length).toBe(2);
    expect(hotelCards[0].props('hotel')).toEqual(wrapper.vm.selectedHotels[0]);
    expect(hotelCards[1].props('hotel')).toEqual(wrapper.vm.selectedHotels[1]);
  });
});
