import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

const vuetify = createVuetify();
config.global.plugins = [vuetify];
