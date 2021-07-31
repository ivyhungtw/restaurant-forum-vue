import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
