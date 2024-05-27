import { describe, it, expect, beforeEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { createApp } from 'vue';
import App from '../src/App.vue';
import router from '../src/router';
import { createPinia } from 'pinia';
import { mountWithVuetify } from './test-utils';
import vuetify from '../src/plugins/vuetify';
import '../src/utils/mockApi';
import '@mdi/font/css/materialdesignicons.css';

describe('Main Application', () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp(App);
    app.use(createPinia());
    app.use(vuetify);
    app.use(router);
  });

  it('should mounts the app without errors', async () => {
    const  wrapper = mountWithVuetify(App, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();
    await flushPromises();

    expect(wrapper.exists()).toBe(true);
  });
});
