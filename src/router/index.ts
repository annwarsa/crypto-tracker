import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
