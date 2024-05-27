import { mount, type ComponentMountingOptions, type VueWrapper } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import router from '@/router';

const vuetify = createVuetify();

export const mountWithVuetify = (
  component: any,
  options?: ComponentMountingOptions<any>
): VueWrapper => {
  return mount(component, {
    ...options,
    global: {
      plugins: [
        vuetify,
        createPinia(),
        router,
        ...(options?.global?.plugins || []),
      ],
    },
  });
};
