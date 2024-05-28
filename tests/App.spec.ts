import { mountWithVuetify } from './test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '@/App.vue';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';
import { createVuetify } from 'vuetify';

describe('App.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mountWithVuetify(App);
  });

  it('renders Notification component', () => {
    const notification = wrapper.findComponent({ name: 'Notification' });
    expect(notification.exists()).toBe(true);
  });

  it('renders HeaderComponent component', () => {
    const headerComponent = wrapper.findComponent({ name: 'HeaderComponent' });
    expect(headerComponent.exists()).toBe(true);
  });

  it('renders router-view', () => {
    const routerView = wrapper.findComponent({ name:'router-view'});
    expect(routerView.exists()).toBe(true);
  });

  it('renders v-app', () => {
    const vApp = wrapper.find('v-app');
    expect(vApp.exists()).toBe(true);
  });

  it('renders v-main', () => {
    const vMain = wrapper.find('v-main');
    expect(vMain.exists()).toBe(true);
  });
});
