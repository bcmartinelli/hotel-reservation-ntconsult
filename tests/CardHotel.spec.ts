import { flushPromises } from '@vue/test-utils';
import CardHotel from '@/components/CardHotel.vue';
import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from './test-utils';
import { useBookingStore } from '@/store/booking';
import router from '@/router';
import { Hotel } from '@/types';


describe('CardHotel.vue', () => {
  let wrapper: any;
  let bookingStore: any;
  const hotel: Hotel = {
    id: 1,
    name: 'Test Hotel',
    country: 'Test Country',
    image: 'test.jpg',
    rating: 4.5,
    price: 1234.56,
  };

  const selectedHotels: Array<Hotel> = [];

  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  })

  beforeEach(() => {
    wrapper = mountWithVuetify(CardHotel, {
      props: {
        hotel,
        selectedHotels
      },
    });
    bookingStore = useBookingStore();
    vi.spyOn(bookingStore, 'setHotel');
  });


  it('should renders the all elements in the template ', () => {
    const title = wrapper.find('v-card-title');
    const subtitle = wrapper.find('v-card-subtitle span');
    const rating = wrapper.find('v-rating');
    const price = wrapper.find('.text-body-2');

    const img = wrapper.find('v-img');
    expect(title.text()).toBe(hotel.name);
    expect(subtitle.text()).toBe(hotel.country);
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(`images/mocks/${hotel.image}`);
    expect(rating.exists()).toBe(true);
    expect(wrapper.find('.text-grey').text()).toBe(hotel.rating.toString());
    expect(price.exists()).toBe(true);
    expect(price.text()).toBe('1.234,56');
  });

  it('should opens modal on button click', async () => {
    const button = wrapper.find('v-btn');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    await flushPromises();
    expect(wrapper.vm.isModalOpen).toBe(true);
  });

  it('should sets hotel to null when modal is closed', async () => {
    expect(bookingStore.setHotel).not.toHaveBeenCalledWith(null);

    wrapper.vm.openModal();
    await flushPromises();
    expect(wrapper.vm.isModalOpen).toBe(true);
    expect(bookingStore.setHotel).toHaveBeenCalledWith(hotel);

    wrapper.vm.updateIsModalOpen(false);
    await flushPromises();

    expect(bookingStore.setHotel).toHaveBeenCalledWith(null);

  });

  it('should emits update-selected-hotels when checkbox is clicked', async () => {
    expect(wrapper.vm.localSelectedHotels).toEqual([]);

    const checkbox = wrapper.find('v-checkbox');
    await checkbox.trigger('click');
    wrapper.vm.localSelectedHotels = [hotel];
    await flushPromises();

    expect(wrapper.emitted('update-selected-hotels')).toBeTruthy();
    expect(wrapper.emitted('update-selected-hotels')[0]).toEqual([{
      selected: [hotel],
      hotel
    }]);
  });
});
