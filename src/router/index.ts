import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('@/views/HomeView.vue');
const ComparisonView = () => import('@/views/ComparisonView.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/comparacoes',
    name: 'Comparação',
    component: ComparisonView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
