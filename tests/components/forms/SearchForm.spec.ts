import { describe, expect, it, beforeEach, beforeAll, vi } from 'vitest';
import { mountWithVuetify } from '../../test-utils';
import router from '@/router';
import SearchForm from '@/components/forms/SearchForm.vue';
import { useSearchStore } from '@/store/search';

describe('SearchForm.vue', () => {
  let wrapper: any;
  let searchStore: any;

  beforeAll(async () => {
    router.push('/');
    await router.isReady();
  })

  beforeEach(() => {
    wrapper = mountWithVuetify(SearchForm);
    searchStore = useSearchStore();

    vi.spyOn(searchStore, 'setCriteria');
    vi.spyOn(searchStore, 'fetchHotels');
  });

  it('should renders form fields correctly', () => {
    expect(wrapper.find('#destination').exists()).toBe(true);
    expect(wrapper.find('#checkInDate').exists()).toBe(true);
    expect(wrapper.find('#checkOutDate').exists()).toBe(true);
    expect(wrapper.find('#rooms').exists()).toBe(true);
    expect(wrapper.find('#guests').exists()).toBe(true);
  });

  it('should validates required fields', async () => {
    wrapper.vm.formData.destination = '';
    wrapper.vm.formData.checkInDate = '';
    wrapper.vm.formData.checkOutDate = '';
    wrapper.vm.formData.rooms = '';
    wrapper.vm.formData.guests = '';
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('v-btn');
    await submitButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#destination').element.value).toBe(undefined);
    expect(wrapper.find('#checkInDate').element.value).toBe(undefined);
    expect(wrapper.find('#checkOutDate').element.value).toBe(undefined);
    expect(wrapper.find('#rooms').element.value).toBe(undefined);
    expect(wrapper.find('#guests').element.value).toBe(undefined);
  });

  it('should calls searchHotels method on form submission', async () => {
    vi.spyOn(wrapper.vm, 'searchHotels');
    wrapper.vm.formData.destination = 'Brasil';
    wrapper.vm.formData.checkInDate = '2023-06-15';
    wrapper.vm.formData.checkOutDate = '2023-06-20';
    wrapper.vm.formData.rooms = 2;
    wrapper.vm.formData.guests = 4;
    wrapper.vm.formValid = true
    await wrapper.vm.$nextTick();

    const form = wrapper.find('v-form');
    await form.trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.searchHotels).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.formValid).toBe(true);
    expect(searchStore.setCriteria).toHaveBeenCalledWith(wrapper.vm.formData);
    expect(searchStore.fetchHotels).toHaveBeenCalled();
  });
});
