import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from '../../test-utils';
import router from '@/router';
import { useBookingStore } from '@/store/booking';
import BookingForm from '@/components/forms/BookingForm.vue';
import { flushPromises } from '@vue/test-utils';

describe('BookingForm.vue', () => {
  let wrapper: any;
  let bookingStore: any;
  const hotel = {
    id: 1,
    name: 'Test Hotel',
    image: 'test.jpg',
    price: 1234.56,
  };

  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  })

  beforeEach(() => {
    wrapper = mountWithVuetify(BookingForm, {
      props: {
        isOpen: true,
      }
    });
    bookingStore = useBookingStore();
    bookingStore.setHotel(hotel)

    vi.spyOn(bookingStore, 'setHotel');
    vi.spyOn(bookingStore, 'bookRoom');
  });

  it('should renders form fields correctly', () => {
    expect(wrapper.find('#name').exists()).toBe(true);
    expect(wrapper.find('#contact').exists()).toBe(true);
    expect(wrapper.find('#paymentMethod').exists()).toBe(true);
  });

  it('should validates required fields', async () => {
    wrapper.vm.formData.name = '';
    wrapper.vm.formData.contact = '';
    wrapper.vm.formData.paymentMethod = null;
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('v-btn[type="submit"]');
    await submitButton.trigger('click');

    await flushPromises();

    expect(wrapper.find('#name').value).toBe(undefined);
    expect(wrapper.find('#contact').value).toBe(undefined);
    expect(wrapper.find('#paymentMethod').value).toBe(undefined);
  });

  it('should calls submitBookRoom method on form submission', async () => {
    wrapper.vm.formData.name = 'Usuário teste';
    wrapper.vm.formData.contact = '123456789';
    wrapper.vm.formData.paymentMethod = 'Crédito';
    wrapper.vm.formValid = true;
    await wrapper.vm.$nextTick();

    const form = wrapper.find('v-form');
    await form.trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.vm.formValid).toBe(true);
    expect(bookingStore.bookRoom).toHaveBeenCalledWith(wrapper.vm.formData);
  });

  it('should emits update:isOpen when dialog is closed', async () => {
    wrapper.vm.localIsOpen = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:isOpen')).toBeTruthy();
    expect(wrapper.emitted('update:isOpen')[0]).toEqual([false]);
  });

  it('should displays hotel details correctly', () => {
    const hotelName = wrapper.find('.text-h5').text();
    const hotelPrice = wrapper.find('v-chip').text();
    expect(hotelName).toContain('Test Hotel');
    expect(hotelPrice).toContain('1.234,56');
  });

  it('shouldc change localIsOpen when props isOpen change', async () => {
    wrapper.setProps({isOpen: false});
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.localIsOpen).toBe(false)
  });
});
