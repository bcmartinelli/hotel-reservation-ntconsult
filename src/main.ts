import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vuetify from '@/plugins/vuetify';
import '@/utils/mockApi';
import '@/styles/global.scss';

import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount('#app');
