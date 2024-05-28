import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from '@/components/Header.vue';
import { describe, expect, it, beforeEach } from 'vitest';
import { mountWithVuetify } from '../test-utils';
import router from '@/router';


describe('Header.vue', () => {
  beforeEach(async () => {
    router.push('/');
    await router.isReady();
  });

  it('should renders the app bar and checks the title and link', async () => {
    const wrapper = mountWithVuetify(HeaderComponent, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);

    const routerLink = wrapper.find('a');
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.text()).toContain('NT');
    expect(routerLink.text()).toContain('Hotel Booking');

    expect(routerLink.attributes('href')).toBe('/');

    await routerLink.trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/');
  });
});
