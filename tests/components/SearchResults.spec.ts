import { flushPromises } from '@vue/test-utils';
import CardHotel from '@/components/CardHotel.vue';
import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from '../test-utils';
import { useComparisonStore } from '@/store/comparison';
import router from '@/router';
import { Hotel } from '@/types';
import SearchResults from '@/components/SearchResults.vue';


describe('SearchResults.vue', () => {
  let wrapper: any;
  let comparisonStore: any;
  const hotels: Array<Hotel> = [
    { id: 1, image: '', name: 'Hotel A', country: 'Brazil', rating: 4.8, price: 300 },
    { id: 2, image: '', name: 'Hotel B', country: 'USA', rating: 4.2, price: 150 },
    { id: 3, image: '', name: 'Hotel C', country: 'Canada', rating: 4.5, price: 200 },
    { id: 4, image: '', name: 'Hotel D', country: 'Mexico', rating: 4.1, price: 100 },
  ];

  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  })

  beforeEach(() => {
    wrapper = mountWithVuetify(SearchResults, {
      props: {
        hotels
      },
    });
    comparisonStore = useComparisonStore();
    vi.spyOn(comparisonStore, 'setSelectedHotels');
    vi.spyOn(router, 'push');
  });


  it('should renders hotel cards', () => {
    const hotelCards = wrapper.findAllComponents(CardHotel);
    expect(hotelCards.length).toBe(hotels.length);
  });

  it('should sorts hotels by rating by default', async () => {
    const sortedByRating = hotels.slice().sort((a, b) => b.rating - a.rating);
    const hotelCards = wrapper.findAllComponents(CardHotel);
    hotelCards.forEach((card: any, index: number) => {
      expect(card.props('hotel')).toEqual(sortedByRating[index]);
    });
  });

  it('should changes sort criteria and sorts hotels by country', async () => {
    wrapper.vm.sortCriteria = 'country';
    await wrapper.vm.$nextTick();
    const sortedByPrice = hotels.slice().sort((a, b) => a.country.localeCompare(b.country));
    const hotelCards = wrapper.findAllComponents(CardHotel);
    hotelCards.forEach((card: any, index: number) => {
      expect(card.props('hotel')).toEqual(sortedByPrice[index]);
    });
  });

  it('should changes sort criteria and sorts hotels by lowest-price', async () => {
    wrapper.vm.sortCriteria = 'lowest-price';
    await wrapper.vm.$nextTick();
    const sortedByPrice = hotels.slice().sort((a, b) => a.price - b.price);
    const hotelCards = wrapper.findAllComponents(CardHotel);
    hotelCards.forEach((card: any, index: number) => {
      expect(card.props('hotel')).toEqual(sortedByPrice[index]);
    });
  });

  it('should changes sort criteria and sorts hotels by biggest-price', async () => {
    wrapper.vm.sortCriteria = 'biggest-price';
    await wrapper.vm.$nextTick();
    const sortedByPrice = hotels.slice().sort((a, b) => b.price - a.price);
    const hotelCards = wrapper.findAllComponents(CardHotel);
    hotelCards.forEach((card: any, index: number) => {
      expect(card.props('hotel')).toEqual(sortedByPrice[index]);
    });
  });

  it('should changes sort criteria and sorts hotels by undefined', async () => {
    wrapper.vm.sortCriteria = 'default';
    await wrapper.vm.$nextTick();
    const hotelCards = wrapper.findAllComponents(CardHotel);
    hotelCards.forEach((card: any, index: number) => {
      expect(card.props('hotel')).toEqual(hotels[index]);
    });
  });

  it('should updates selected hotels and emits event', async () => {
    const hotel = hotels[0];
    const cardHotel = wrapper.findComponent(CardHotel);
    await cardHotel.vm.$emit('update-selected-hotels', { selected: [hotel], hotel });

    expect(wrapper.vm.selectedHotels).toContainEqual(hotel);

    await cardHotel.vm.$emit('update-selected-hotels', { selected: [], hotel });
    expect(wrapper.vm.selectedHotels).not.toContainEqual(hotel);
  });

  it('should navigates to comparison page when compare button is clicked', async () => {
    expect(router.push).toBeCalledTimes(0)
    wrapper.vm.selectedHotels = [hotels[0], hotels[1]];
    await wrapper.vm.$nextTick();

    const compareButton = wrapper.find('.btn-fab');
    await compareButton.trigger('click');
    expect(comparisonStore.setSelectedHotels).toHaveBeenCalledWith([hotels[0], hotels[1]]);
    expect(router.push).toBeCalledTimes(1)
  });
});
