import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import HearderComponent from '@/components/Header.vue';
import { createVuetify } from 'vuetify';
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Home', component: HearderComponent }],
});

describe('Header.vue', () => {
  it('renders the app bar and checks the title and link', async () => {
    const vuetify = createVuetify();
    const wrapper = mount(HearderComponent, {
      global: {
        plugins: [vuetify, router],
      },
    });

    expect(wrapper.exists()).toBe(true);

    const routerLink = wrapper.find('a');
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.text()).toContain('NT');
    expect(routerLink.text()).toContain('Hotel Booking');

    expect(routerLink.attributes('href')).toBe('/');

    await routerLink.trigger('click');
    await router.isReady();
    expect(router.currentRoute.value.path).toBe('/');
  });
});
